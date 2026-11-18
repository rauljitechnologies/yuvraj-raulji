/**
 * ═══════════════════════════════════════════════════════════════
 *  YUVRAJ RAULJI : WEBSITE LEAD API  (Google Apps Script)
 * ═══════════════════════════════════════════════════════════════
 *  On every form submission this:
 *    1. Scores the lead, so triage is not a reading exercise
 *    2. Saves it to a Google Sheet (auto-created on first run)
 *    3. Emails you the details, band first
 *    4. Sends the sender a confirmation in this site's voice
 *
 *  ONE-TIME SETUP: see SETUP-GUIDE.md
 *
 *  ── The thing this file cannot fix ─────────────────────────────
 *  A dead endpoint is a DEPLOYMENT problem, not a code problem. If
 *  the /exec URL answers 302 to accounts.google.com, no edit here
 *  changes that. Fix it under Deploy > Manage deployments by
 *  EDITING the existing deployment (never creating a new one, which
 *  issues a new URL) and setting access to Anyone.
 * ═══════════════════════════════════════════════════════════════
 */

const CONFIG = {
  OWNER_EMAIL:      'toyuvrajraulji@gmail.com',
  OWNER_PHONE:      '+91 98983 34731',
  OWNER_WHATSAPP:   '919898334731',            // digits only, for wa.me links
  BRAND_NAME:       'Yuvraj Raulji',
  /* This string is not decoration: it is printed twice in the confirmation
     email every new lead receives, so it is the first positioning statement a
     prospect reads. It has to match `ROLE` in lib/identity.ts, which is the
     single source for every positioning string the site renders.

     It has now been wrong twice. It said "Full Stack E-commerce Developer & AI
     Consultant", which used two words the brand does not use. It was corrected
     to "eCommerce, AI & Technology Consultant", which matched the site at the
     time. The site then repositioned from consulting to freelance client work
     and `ROLE` changed; this did not, so every confirmation email since has
     opened by describing the recipient's new contact as a consultant while the
     page they just left called him a freelance developer. */
  BRAND_TAGLINE:    'Freelance eCommerce Developer & Technology Professional',
  /* www, not the apex. The apex 308s to www, so every link in every
     confirmation email was costing a redirect. */
  SITE_URL:         'https://www.yuvrajraulji.com',
  /* No em dash. This name is user-visible on the Drive file. */
  SPREADSHEET_NAME: 'Yuvraj Raulji Website Leads',
  SHEET_TAB:        'Leads',
  /* Taken from --accent-rgb / --accent-bright-rgb in app/globals.css. These
     were #c8102e and #e8192c, neither of which is a colour on the site, so
     every email was branded in a red the visitor had not just been looking at. */
  BRAND_RED:        '#D71920',
  BRAND_RED_HOVER:  '#EE2A34'
};

/* The columns the sheet carries. Order matters: appendLead_ writes positionally
   and ensureHeaders_ reconciles an existing sheet against this list, so adding
   a field here is the only change needed to start capturing it. */
const COLUMNS = [
  'Date', 'Funnel', 'Band', 'Score', 'Name', 'Email', 'Phone', 'Company', 'Website',
  'Country', 'Role', 'Platform', 'Timeline', 'Budget', 'Service', 'Message', 'Page', 'Status'
];

/* ── Web app entry points ─────────────────────────────────── */

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};

    // Honeypot: bots fill hidden fields; humans never see them
    if (p.hp) return jsonOut_({ ok: true });

    const lead = {
      date:     new Date(),
      /* Which form produced this. It is 'project' on everything the site now
         sends: there is one form, rendered on /contact/, at the foot of the
         homepage and in the enquiry modal. The column stays because the sheet
         has rows from when there were two funnels, 'recruiter' and 'project',
         and a column that explains its own history is worth more than one
         fewer column. Empty means the older enquiry modal. */
      funnel:   clean_(p.funnel, 20),
      name:     clean_(p.name, 120),
      email:    clean_(p.email, 160),
      phone:    clean_(p.phone, 40),
      company:  clean_(p.company, 120),
      /* The single highest-value field on the form. One paste tells you the
         platform, the scale and usually the problem, before you read a word of
         the message. Captured whether or not the form sends it yet. */
      website:  clean_(p.website, 300),
      /* Captured, not scored. The site is aimed at the USA, the UK, the UAE
         and Europe, so it is tempting to weight it, but a score is a triage
         order and down-ranking a real buyer for being somewhere unexpected is
         a judgement this field cannot support. It answers "what time is it
         where they are", which is what the reply needs. */
      country:  clean_(p.country, 80),
      role:     clean_(p.role, 80),
      platform: clean_(p.platform, 80),
      timeline: clean_(p.timeline, 80),
      budget:   clean_(p.budget, 80),
      service:  clean_(p.service, 80) || 'Not specified',
      message:  clean_(p.message, 4000),
      page:     clean_(p.page, 300)
    };

    if (!lead.name || !lead.email || !lead.message) {
      return jsonOut_({ ok: false, error: 'Missing required fields' });
    }

    const scored = scoreLead_(lead);
    lead.score = scored.score;
    lead.band  = scored.band;
    lead.why   = scored.why;

    appendLead_(lead);

    // Emails must never block the lead from being saved
    try { sendOwnerEmail_(lead);  } catch (err) { logError_('ownerEmail', err); }
    try { sendClientEmail_(lead); } catch (err) { logError_('clientEmail', err); }

    return jsonOut_({ ok: true });
  } catch (err) {
    logError_('doPost', err);
    return jsonOut_({ ok: false, error: String(err) });
  }
}

/**
 * GET is the health check the monitoring depends on.
 *
 * A correctly deployed web app answers this 200 with JSON. A deployment whose
 * access has drifted answers 302 to accounts.google.com instead, which is
 * exactly the failure that went unnoticed for days. Point an uptime monitor at
 * this URL and alert on anything that is not 200 with ok:true.
 */
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.export === 'csv') return exportCsv_(p.key);
  return jsonOut_({
    ok: true,
    service: 'YR Lead API',
    version: 3,
    time: new Date().toISOString()
  });
}

/* ── Lead scoring ─────────────────────────────────────────────
   Advisory only. Nothing is rejected and nothing is thrown away:
   a short message from a real Head of eCommerce outranks a long
   one from a researcher, and any rule keyed on message length
   would get that backwards. The band decides reply order, not
   whether there is a reply.

   ── Why this was rewritten ──────────────────────────────────
   It scored six fields: website, company, role, timeline,
   platform and budget. The site's form now sends two of them.
   Role, platform, timeline and website were `<select>` and URL
   inputs on the nine-field forms, and those forms are gone: the
   brief fixes the enquiry at name, email, company or website,
   project requirements and budget.

   Run against what the five-field form can actually send, the
   old function produced this:

     NURTURE       3   enterprise lead, budget, long brief
     NURTURE       2   company and budget, ordinary message
     UNSCORED      0   real buyer, no company, no budget
     LOW PRIORITY  1   company given, short message

   Two things are wrong there. HOT and QUALIFIED were
   unreachable, because the surviving fields cap the score at 3
   against a HOT threshold of 7. And the last row is the exact
   outcome the paragraph above says must never happen: a real
   business, banded as low priority, because the form stopped
   asking the questions the scoring reads.

   ── What it reads instead ───────────────────────────────────
   The signals did not disappear with the selects. They moved
   into the message, because that is where a buyer puts them
   when nothing asks: "we are on Magento 2", "we need this live
   before March", "I am the head of ecommerce here". So the
   platform, urgency and seniority rules now match against the
   message rather than against a field that is always empty.

   The email domain is new, and it is the one signal every lead
   carries: the address is required, so a company domain scores
   on every submission while a free provider scores nothing.

   Nothing here is thrown away when a legacy row is rescored.
   The four old fields are still read if they are present, so
   the rows already in the sheet score the way they always did.
   ───────────────────────────────────────────────────────────── */

/* ── Matching, and why two kinds of it ───────────────────────────────────────
   `has_` is a plain substring test. It is correct for the role, budget and
   service fields, because those arrived from fixed `<select>` lists and a
   substring of a known option cannot be anything else.

   It is NOT correct against a free-text message, and the first draft of this
   rewrite got that wrong in a way worth recording: matched as substrings,
   'cto' hits inside "sector" and "factory", and 'md' hits inside any word that
   happens to contain those two letters. A buyer writing "we sell into the
   retail sector" would have scored as a decision maker.

   So anything matched against the message goes through `hasWord_`, which
   anchors each term on word boundaries. The cost of that is inflections:
   \burgent\b does not match "urgently", so the variants are listed out below
   rather than being produced by a clever pattern. A list anyone can read and
   audit is worth more here than a regex that is shorter.
   ─────────────────────────────────────────────────────────────────────────── */

/* Matched against the role field as substrings (legacy rows), and against the
   message with word boundaries. 'cto' stays: an inbound message can describe
   the sender that way, and this string is never rendered on the site, so the
   prohibited-title rule in lib/identity.ts does not reach it. */
const DECISION_ROLES = ['owner', 'co-owner', 'ceo', 'managing director', 'md',
  'director', 'head of ecommerce', 'head of e-commerce', 'ecommerce manager',
  'technology lead', 'tech lead', 'cto', 'coo', 'founder', 'co-founder',
  'proprietor', 'partner', 'agency'];

/* The platforms the site sells against. Named in the message, this is the
   single most useful thing a first enquiry can contain: it says which of the
   service pages the work belongs to before anyone has replied.

   Inflections and spellings listed rather than stemmed, per the note above:
   'magento' and 'magento2' are both written by real people. */
const PLATFORM_WORDS = ['magento', 'magento2', 'adobe commerce', 'shopify',
  'shopify plus', 'woocommerce', 'woo', 'wordpress', 'headless', 'next.js',
  'nextjs', 'react', 'reactjs', 'bigcommerce', 'prestashop', 'opencart',
  'salesforce commerce', 'commercetools', 'erp', 'crm'];

/* Urgency, in the words a buyer writes rather than the bands a select offered.
   Both inflections of each stem, because the word boundary will not add them. */
const URGENCY_WORDS = ['asap', 'urgent', 'urgently', 'this month', 'next month',
  'this week', 'next week', 'deadline', 'launch', 'launching', 'go live',
  'golive', 'peak season', 'black friday', 'immediately', 'as soon as',
  'time sensitive', 'time-sensitive'];

/* A budget that is an answer rather than a figure. The form invites this on
   purpose, so it scores: a buyer who says "not sure" is being honest, and
   banding that below a buyer who invented a number would reward the guess. */
const VAGUE_BUDGET = ['not sure', 'unsure', 'no idea', 'tbd', 'to be decided',
  'dont know', "don't know", 'do not know', 'flexible', 'open', 'no budget yet'];

/* Free mailbox providers. Anything else is treated as a company domain. */
const FREE_MAIL = ['gmail.', 'googlemail.', 'yahoo.', 'ymail.', 'hotmail.',
  'outlook.', 'live.', 'msn.', 'icloud.', 'me.com', 'mac.com', 'aol.',
  'proton.', 'protonmail.', 'gmx.', 'zoho.', 'mail.com', 'mail.ru', 'yandex.',
  'qq.com', '163.com', '126.com', 'rediffmail.', 'inbox.', 'fastmail.'];

/* Job approaches and vendor spam. Tightened twice. 'resume' alone used to be
   here and this site has a /resume/ page, so "I saw your resume page" from a
   real buyer matched a job pattern. And these are word-matched, not substring
   matched, because 'hire me' as a substring hits "hire merchants" and
   'backlink' misses "backlinks" without its own entry. */
const LOW_SIGNALS = ['looking for a job', 'looking for work', 'job opportunity',
  'job opening', 'my resume', 'my cv', 'resume attached', 'cv attached',
  'internship', 'hire me', 'guest post', 'guest posting', 'link building',
  'seo services', 'web design services', 'we can increase your traffic',
  'backlink', 'backlinks', 'increase your ranking', 'increase your rankings'];

/* Substring. For the fixed-option fields only; see the note above. */
function has_(hay, list) {
  return list.some(function (w) { return hay.indexOf(w) > -1; });
}

/**
 * Is this email domain a free mailbox provider?
 *
 * ── Why this is not has_() ────────────────────────────────────────────────
 *
 * It was. FREE_MAIL contains 'me.com', and a substring test reads 'acme.com'
 * as iCloud, so every buyer at acme.com lost the two points for writing from
 * a company address. The same hit 'mail.com' inside 'yourmail.com' and
 * 'live.' inside 'olive.io'.
 *
 * That is the costliest place in this function for a false positive: the
 * address is the one required field, so this rule scores every single
 * enquiry, and it is the same substring mistake that put 'cto' inside
 * "sector" and "factory" before free text was word-boundary matched.
 *
 * The list is written in two shapes and each is matched as it is meant:
 *
 *   'gmail.'  a provider label, so it matches gmail.com and gmail.co.uk,
 *             at the start of the domain or at a dot boundary inside it
 *   'me.com'  a complete domain, so it matches me.com and mail.me.com and
 *             nothing that merely ends in those letters
 */
function isFreeMail_(domain) {
  return FREE_MAIL.some(function (w) {
    if (w.charAt(w.length - 1) === '.') {
      return domain.indexOf(w) === 0 || domain.indexOf('.' + w) > -1;
    }
    return domain === w || domain.slice(-(w.length + 1)) === '.' + w;
  });
}

/* Word-boundary. For anything matched against free text.

   Apps Script runs modern V8, so a RegExp built per call is fine at this
   volume; the alternative is caching compiled patterns in module scope, and a
   handful of submissions a day does not earn that complexity. Each term is
   escaped, so '.' in 'next.js' and '-' in 'co-founder' are literal. */
function hasWord_(hay, list) {
  const alt = list
    .map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); })
    .join('|');
  return new RegExp('\\b(?:' + alt + ')\\b', 'i').test(hay);
}

function scoreLead_(lead) {
  let score = 0;
  const why = [];

  const msg  = (lead.message || '').toLowerCase();
  const mail = (lead.email || '').toLowerCase();
  const svc  = (lead.service || '').toLowerCase();
  const hay  = msg + ' ' + svc;

  /* ── What the form asks for ──────────────────────────────── */

  /* One field holds a company name or a store URL. Either is the same signal:
     there is a business behind this. `website` is read too, for the rows in the
     sheet from when it was its own field. */
  if (lead.company || lead.website) { score += 2; why.push('business named'); }

  /* Service, required on the form and a real selection again.

     It sent the constant 'Project enquiry' while the five-field form was live,
     which is why the previous rewrite read it for spam patterns only. A named
     service is a buyer who knows what they are asking for; 'Other' is a buyer
     who has something to say that the list did not cover, which is weaker
     signal but not none. */
  if (svc && svc !== 'not specified' && svc !== 'project enquiry') {
    if (svc === 'other') { score += 1; why.push('service: other'); }
    else { score += 2; why.push('service named'); }
  }

  if (lead.budget) {
    if (has_(lead.budget.toLowerCase(), VAGUE_BUDGET)) {
      score += 1; why.push('budget open');
    } else {
      score += 2; why.push('budget given');
    }
  }

  /* The address is required, so this scores every lead one way or the other. */
  const at = mail.lastIndexOf('@');
  if (at > -1) {
    const domain = mail.slice(at + 1);
    if (!isFreeMail_(domain)) { score += 2; why.push('company domain'); }
  }

  /* Detail is effort, and effort correlates with intent. Two tiers rather than
     one, because the gap between a paragraph and a brief is real. */
  if (msg.length > 600)      { score += 2; why.push('detailed brief'); }
  else if (msg.length > 200) { score += 1; why.push('detailed message'); }

  /* ── What the message carries, now that nothing asks ─────── */

  if (hasWord_(msg, PLATFORM_WORDS)) { score += 2; why.push('platform named'); }
  if (hasWord_(msg, URGENCY_WORDS))  { score += 1; why.push('urgency stated'); }

  /* Seniority, from the role field on a legacy row or from the message on a
     current one. Scored once either way, and matched differently in each case:
     substring against a known select option, word boundary against free text. */
  const role = (lead.role || '').toLowerCase();
  const senior = role ? has_(role, DECISION_ROLES) : hasWord_(msg, DECISION_ROLES);
  if (senior) { score += 2; why.push('decision maker'); }

  /* ── Timeline ────────────────────────────────────────────── */

  /* Matched against what the form now sends, which is not what this read
     before: the options are "As soon as possible", "Within 1 month", "1 to 3
     months", "3 months or later" and "Just exploring". The old rules looked
     for 'now' and '6 month', so "As soon as possible", the most urgent answer
     on the list, fell through to the generic +1 and scored the same as a
     distant one.

     "Just exploring" scores nothing on purpose. It is the one answer that is
     weaker than leaving the field blank, and giving it the "timeline given"
     point would rank an admitted browser above a buyer who skipped an
     optional select. Legacy values from older rows still match. */
  const tl = (lead.timeline || '').toLowerCase();
  if (tl.indexOf('exploring') > -1) {
    why.push('just exploring');
  } else if (tl.indexOf('as soon as') > -1 || tl.indexOf('asap') > -1 ||
             tl.indexOf('now') > -1 || tl.indexOf('within 1 month') > -1 ||
             tl.indexOf('1 to 3 month') > -1 || tl.indexOf('1-3 month') > -1) {
    score += 3; why.push('near timeline');
  } else if (tl.indexOf('3 month') > -1 || tl.indexOf('6 month') > -1) {
    score += 2; why.push('timeline set');
  } else if (tl) {
    score += 1; why.push('timeline given');
  }

  /* ── Legacy select, still read if a row has one ──────────── */

  if (lead.platform && lead.platform.toLowerCase().indexOf('not sure') === -1) {
    score += 1; why.push('platform selected');
  }

  // Obvious non-business contact. Still saved, still emailed, replied to last.
  if (hasWord_(hay, LOW_SIGNALS)) {
    return { score: score, band: 'LOW PRIORITY', why: 'matched a job or vendor pattern' };
  }

  /* Nothing scored at all. That is a thin enquiry, not a weak business, and the
     band says which: a 20-word message from a free address with no company and
     no budget gives the triage nothing to work with, and calling it LOW
     PRIORITY would be a judgement the enquiry does not support. */
  if (score === 0) {
    return {
      score: score,
      band: 'UNSCORED',
      why: 'nothing in the enquiry to score on'
    };
  }

  /* Thresholds against a ceiling of 18 on the nine-field form: business named
     2, service 2, budget 2, company domain 2, timeline 3, detail 2, platform
     2, urgency 1, seniority 2.

     Recalibrated because the form grew, not because the bands were wrong. The
     previous numbers were set against a ceiling of 13, and leaving them there
     would have promoted every band by roughly one as soon as the new fields
     started arriving: HOT would have become the ordinary case, which is the
     same failure as the UNSCORED-everything it replaced, pointing the other
     way.

     Calibrated against shapes, as before. An ordinary serious enquiry is a
     business with a service, a budget, a company address and a timeline:
     2+2+2+2+3 = 11, and that is QUALIFIED. HOT needs detail or platform or
     seniority on top of it, so it starts at 14. */
  const band = score >= 14 ? 'HOT'
             : score >= 8  ? 'QUALIFIED'
             : score >= 2  ? 'NURTURE'
             : 'LOW PRIORITY';

  return { score: score, band: band, why: why.join(', ') };
}

/* ── CSV export ───────────────────────────────────────────────
   URL:  <web-app-url>?export=csv&key=<secret>
   testSetup() prints the key. */

function exportCsv_(key) {
  const want = PropertiesService.getScriptProperties().getProperty('CSV_KEY');
  if (!want || key !== want) {
    return ContentService.createTextOutput('Forbidden: invalid key')
      .setMimeType(ContentService.MimeType.TEXT);
  }
  const ss = getOrCreateSpreadsheet_();
  const sheet = ss.getSheetByName(CONFIG.SHEET_TAB) || ss.getSheets()[0];
  const csv = sheet.getDataRange().getValues().map(function (row) {
    return row.map(function (c) {
      c = String(c).replace(/"/g, '""');
      return /[",\n]/.test(c) ? '"' + c + '"' : c;
    }).join(',');
  }).join('\r\n');
  return ContentService.createTextOutput(csv)
    .setMimeType(ContentService.MimeType.CSV)
    .downloadAsFile('yuvrajraulji-leads.csv');
}

function ensureCsvKey_() {
  const props = PropertiesService.getScriptProperties();
  let key = props.getProperty('CSV_KEY');
  if (!key) {
    key = Utilities.getUuid().replace(/-/g, '');
    props.setProperty('CSV_KEY', key);
  }
  return key;
}

/* ── Google Sheet ─────────────────────────────────────────── */

function getOrCreateSpreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  const savedId = props.getProperty('SPREADSHEET_ID');

  if (savedId) {
    try { return SpreadsheetApp.openById(savedId); } catch (err) { /* deleted, recreate */ }
  }

  const ss = SpreadsheetApp.create(CONFIG.SPREADSHEET_NAME);
  ss.getSheets()[0].setName(CONFIG.SHEET_TAB);
  props.setProperty('SPREADSHEET_ID', ss.getId());

  MailApp.sendEmail({
    to: CONFIG.OWNER_EMAIL,
    subject: 'Lead sheet created: ' + CONFIG.SPREADSHEET_NAME,
    htmlBody: 'Your website lead sheet was auto-created.<br><br>' +
              '<a href="' + ss.getUrl() + '"><b>Open the lead sheet</b></a><br><br>' +
              'Every new form submission is added here automatically.'
  });

  return ss;
}

/**
 * Reconciles row 1 against COLUMNS.
 *
 * The sheet predates the qualifying fields, so an existing one has eight
 * columns and rows already in it. Rewriting only the header preserves that
 * history: old rows simply have empty cells under the new columns. Idempotent,
 * so it is safe to call on every write.
 */
function ensureHeaders_(sheet) {
  const width = COLUMNS.length;
  const current = sheet.getLastColumn() > 0
    ? sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), width)).getValues()[0]
    : [];

  let matches = true;
  for (let i = 0; i < width; i++) {
    if (String(current[i] || '') !== COLUMNS[i]) { matches = false; break; }
  }
  if (matches) return;

  sheet.getRange(1, 1, 1, width).setValues([COLUMNS])
    .setBackground(CONFIG.BRAND_RED)
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontSize(11);
  sheet.setFrozenRows(1);
  /* Indices are positions in COLUMNS and they all moved by one when 'Funnel'
     was inserted at position 2. They are listed in full here, including the
     ones at their default width, so the next insertion is obviously a
     renumbering job rather than a silent off-by-one that widens the wrong
     column. */
  sheet.setColumnWidth(1, 150);   // Date
  sheet.setColumnWidth(2, 90);    // Funnel
  sheet.setColumnWidth(3, 110);   // Band
  sheet.setColumnWidth(4, 60);    // Score
  sheet.setColumnWidth(9, 240);   // Website
  sheet.setColumnWidth(15, 420);  // Message
  sheet.setColumnWidth(16, 220);  // Page
}

function appendLead_(lead) {
  const ss = getOrCreateSpreadsheet_();
  const sheet = ss.getSheetByName(CONFIG.SHEET_TAB) || ss.getSheets()[0];
  ensureHeaders_(sheet);
  /* Blanks are written as empty, not as a dash. A dash is a value, and it makes
     "not asked" indistinguishable from "asked and left blank" in the sheet. */
  sheet.appendRow([
    Utilities.formatDate(lead.date, Session.getScriptTimeZone(), 'dd MMM yyyy HH:mm'),
    lead.funnel, lead.band, lead.score, lead.name, lead.email, lead.phone,
    lead.company, lead.website, lead.country, lead.role, lead.platform, lead.timeline,
    lead.budget, lead.service, lead.message, lead.page, 'New'
  ]);
}

/* ── Email to YOU ─────────────────────────────────────────── */

/**
 * The rows the five-field form can fill, always shown, plus the rows only an
 * older submission has, shown only when they have something in them.
 *
 * The table listed all fourteen unconditionally, so every email from the
 * current form carried "Role: Not given", "Platform: Not given", "Timeline:
 * Not given", "Website: Not given" and "Phone: Not given" every time. Five
 * rows of nothing, on every lead, for fields the site stopped asking for:
 * that is not a record of what is missing, it is noise between you and the
 * message.
 *
 * Company and Budget stay unconditional even when empty, because those two
 * ARE on the current form and their absence is a fact about the enquiry worth
 * seeing at a glance.
 */
function sendOwnerEmail_(lead) {
  const rows = [
    ['Funnel',   lead.funnel ? esc_(lead.funnel) : 'general'],
    ['Band',     esc_(lead.band) + ' (' + lead.score + ') ' +
                 '<span style="color:#999">' + esc_(lead.why) + '</span>'],
    ['Name',     esc_(lead.name)],
    ['Email',    link_('mailto:' + esc_(lead.email), esc_(lead.email))],
    ['Company',  lead.company ? esc_(lead.company) : 'Not given'],
    ['Budget',   lead.budget   ? esc_(lead.budget)   : 'Not given']
  ];

  /* Only if present. These are the fields the nine-field forms collected. */
  if (lead.website)  rows.push(['Website',  link_(esc_(href_(lead.website)), esc_(lead.website))]);
  if (lead.phone)    rows.push(['Phone',    link_('tel:' + esc_(lead.phone), esc_(lead.phone))]);
  if (lead.role)     rows.push(['Role',     esc_(lead.role)]);
  if (lead.platform) rows.push(['Platform', esc_(lead.platform)]);
  if (lead.country) rows.push(['Country', esc_(lead.country)]);
  if (lead.timeline) rows.push(['Timeline', esc_(lead.timeline)]);

  rows.push(['About', esc_(lead.service)]);
  rows.push(['Page',  lead.page ? esc_(lead.page) : 'Not given']);
  rows.push(['Date',  Utilities.formatDate(lead.date, Session.getScriptTimeZone(), 'dd MMM yyyy, HH:mm')]);

  const html = emailShell_(
    'New lead: ' + esc_(lead.name),
    '<p style="margin:0 0 18px;font-size:14px;color:#444;line-height:1.6">' +
      'Scored <b>' + esc_(lead.band) + '</b>. The band sets reply order, not whether there is a reply.' +
    '</p>' +
    detailsTable_(rows) +
    '<p style="margin:22px 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;font-weight:bold">Message</p>' +
    '<div style="background:#faf7f7;border-left:3px solid ' + CONFIG.BRAND_RED + ';padding:14px 18px;border-radius:0 8px 8px 0;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap">' +
      esc_(lead.message) +
    '</div>' +
    '<table cellpadding="0" cellspacing="0" style="margin:26px 0 4px"><tr>' +
      '<td>' + btn_('mailto:' + esc_(lead.email) + '?subject=' +
        encodeURIComponent('Re: your enquiry, ' + CONFIG.BRAND_NAME),
        'Reply', CONFIG.BRAND_RED) + '</td>' +
      (lead.phone
        ? '<td style="padding-left:10px">' + btn_(waLink_(lead.phone), 'WhatsApp', '#1ebe57') + '</td>'
        : '') +
    '</tr></table>'
  );

  MailApp.sendEmail({
    to: CONFIG.OWNER_EMAIL,
    replyTo: lead.email,
    /* Band first: the subject line is the triage surface in a phone inbox. */
    subject: '[' + lead.band + '] New lead: ' + lead.name +
             (lead.service !== 'Not specified' ? ', ' + lead.service : ''),
    htmlBody: html
  });
}

/* ── Confirmation to the SENDER ───────────────────────────────
   In the site's voice. It read "Thank You, Name!" over "I personally
   review every inquiry", which is the generic agency register the
   rest of the site deliberately avoids, and it was the first
   one-to-one contact a prospect had. CONTENT-PRINCIPLES rules that
   copy out everywhere else; it should not survive here because it
   happens to live in a different repository folder. */

function sendClientEmail_(lead) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return;

  const html = emailShell_(
    'Your message reached me, ' + esc_(firstName_(lead.name)),
    '<p style="margin:0 0 16px;font-size:14px;color:#444;line-height:1.75">' +
      'It is in my inbox rather than a queue. I read every enquiry myself and reply within ' +
      '<b style="color:#111">24 hours</b> on IST business days. If it turns out to be a bad fit, ' +
      'I will tell you that rather than quote for it.' +
    '</p>' +
    '<p style="margin:0 0 22px;font-size:14px;color:#444;line-height:1.75">' +
      'A copy of what you sent, so you have it:' +
    '</p>' +
    detailsTable_([
      ['About',   esc_(lead.service)],
      ['Message', '<span style="white-space:pre-wrap">' +
                  esc_(lead.message.slice(0, 600)) +
                  (lead.message.length > 600 ? '...' : '') + '</span>']
    ]) +
    '<p style="margin:24px 0 10px;font-size:14px;color:#444;line-height:1.75">' +
      'Thought of the detail you left out after hitting send? Reply to this email and it comes ' +
      'straight to me. If it is quicker to talk:' +
    '</p>' +
    '<table cellpadding="0" cellspacing="0" style="margin:0 0 8px"><tr>' +
      '<td>' + btn_('tel:+919898334731', CONFIG.OWNER_PHONE, CONFIG.BRAND_RED) + '</td>' +
      '<td style="padding-left:10px">' +
        btn_('https://wa.me/' + CONFIG.OWNER_WHATSAPP, 'WhatsApp', '#1ebe57') + '</td>' +
    '</tr></table>'
  );

  MailApp.sendEmail({
    to: lead.email,
    replyTo: CONFIG.OWNER_EMAIL,
    subject: 'Your enquiry reached ' + CONFIG.BRAND_NAME + ', reply within 24 hours',
    htmlBody: html,
    name: CONFIG.BRAND_NAME
  });
}

/* ── Shared branded email shell ───────────────────────────── */

function emailShell_(heading, bodyHtml) {
  return '' +
  '<div style="margin:0;padding:28px 14px;background:#f1f1f1;font-family:Arial,Helvetica,sans-serif">' +
    '<table cellpadding="0" cellspacing="0" align="center" style="max-width:600px;width:100%;margin:0 auto">' +
      '<tr><td style="background:#0a0a0a;border-radius:12px 12px 0 0;padding:26px 32px;border-bottom:3px solid ' + CONFIG.BRAND_RED + '">' +
        '<table cellpadding="0" cellspacing="0"><tr>' +
          '<td style="width:44px;height:44px;border:1px solid ' + CONFIG.BRAND_RED + ';border-radius:50%;text-align:center;vertical-align:middle;color:' + CONFIG.BRAND_RED_HOVER + ';font-weight:bold;font-size:15px">YR</td>' +
          '<td style="padding-left:14px">' +
            '<div style="color:#ffffff;font-size:16px;font-weight:bold;letter-spacing:1px">' + CONFIG.BRAND_NAME.toUpperCase() + '</div>' +
            '<div style="color:#888;font-size:10px;letter-spacing:2px;text-transform:uppercase;padding-top:3px">' + CONFIG.BRAND_TAGLINE + '</div>' +
          '</td>' +
        '</tr></table>' +
      '</td></tr>' +
      '<tr><td style="background:#ffffff;padding:32px">' +
        '<h1 style="margin:0 0 18px;font-size:22px;color:#111;letter-spacing:.5px">' + heading + '</h1>' +
        bodyHtml +
      '</td></tr>' +
      '<tr><td style="background:#0a0a0a;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center">' +
        '<div style="color:#777;font-size:11px;line-height:1.9">' +
          CONFIG.BRAND_NAME + ' &middot; ' + CONFIG.BRAND_TAGLINE + '<br>' +
          '<a href="mailto:' + CONFIG.OWNER_EMAIL + '" style="color:' + CONFIG.BRAND_RED_HOVER + ';text-decoration:none">' + CONFIG.OWNER_EMAIL + '</a>' +
          ' &nbsp;&middot;&nbsp; <a href="tel:+919898334731" style="color:' + CONFIG.BRAND_RED_HOVER + ';text-decoration:none">' + CONFIG.OWNER_PHONE + '</a><br>' +
          '<a href="' + CONFIG.SITE_URL + '" style="color:#999;text-decoration:none">' + CONFIG.SITE_URL.replace('https://', '') + '</a> &middot; Vadodara, Gujarat, India' +
        '</div>' +
      '</td></tr>' +
    '</table>' +
  '</div>';
}

function detailsTable_(rows) {
  return '<table cellpadding="0" cellspacing="0" style="width:100%;border:1px solid #eee;border-radius:8px;border-collapse:separate;overflow:hidden">' +
    rows.map(function (r, i) {
      return '<tr style="background:' + (i % 2 ? '#fff' : '#fafafa') + '">' +
        '<td style="padding:11px 16px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#999;font-weight:bold;width:110px;vertical-align:top;border-bottom:1px solid #f0f0f0">' + r[0] + '</td>' +
        '<td style="padding:11px 16px;font-size:14px;color:#222;line-height:1.6;border-bottom:1px solid #f0f0f0">' + r[1] + '</td>' +
      '</tr>';
    }).join('') +
  '</table>';
}

/* ── Helpers ──────────────────────────────────────────────── */

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function clean_(v, max) {
  return String(v || '').trim().slice(0, max);
}

function esc_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function link_(href, text) {
  return '<a href="' + href + '" style="color:' + CONFIG.BRAND_RED + '">' + text + '</a>';
}

function btn_(href, label, bg) {
  return '<a href="' + href + '" style="display:inline-block;background:' + bg +
    ';color:#fff;text-decoration:none;font-size:12px;font-weight:bold;letter-spacing:1px;' +
    'text-transform:uppercase;padding:12px 22px;border-radius:6px">' + label + '</a>';
}

/** Adds a scheme so a pasted "example.com" is a working link, not a relative one. */
function href_(url) {
  return /^https?:\/\//i.test(url) ? url : 'https://' + url;
}

/**
 * A wa.me link needs a country code. A bare Indian 10-digit mobile was being
 * sent through as-is, producing a link to a number that does not exist.
 */
function waLink_(phone) {
  let d = String(phone).replace(/[^0-9]/g, '');
  if (d.length === 10) d = '91' + d;
  else if (d.length === 11 && d.charAt(0) === '0') d = '91' + d.slice(1);
  return 'https://wa.me/' + d;
}

function firstName_(name) {
  return String(name).trim().split(/\s+/)[0] || 'there';
}

function logError_(where, err) {
  console.error(where + ': ' + (err && err.stack ? err.stack : err));
}

/* ── ONE-TIME TEST: run manually once after pasting ───────────
   Authorizes permissions, creates or migrates the sheet, and
   sends both emails so you can verify the whole path. */

function testSetup() {
  /* The shape the five-field form actually sends: name, email, company or
     website, project requirements, budget, plus the funnel and page the client
     adds. It used to set role, platform, timeline, website and phone as well,
     which meant the one test of this path exercised five fields that can no
     longer arrive and scored on rules the live form never reaches. */
  const lead = {
    date: new Date(),
    funnel: 'project',
    name: 'Test Lead',
    email: CONFIG.OWNER_EMAIL,
    phone: '',
    company: 'Test Commerce Ltd',
    website: '',
    role: '',
    platform: '',
    timeline: '',
    budget: '8,000 to 12,000 USD',
    service: 'Project enquiry',
    message: 'Test lead from testSetup(). We are on Magento 2 and need the catalogue architecture reviewed before peak season. If this arrived, the sheet, the scoring and both emails are working.',
    page: CONFIG.SITE_URL + '/contact/'
  };
  const scored = scoreLead_(lead);
  lead.score = scored.score; lead.band = scored.band; lead.why = scored.why;

  appendLead_(lead);
  sendOwnerEmail_(lead);
  sendClientEmail_(lead);

  const csvKey = ensureCsvKey_();
  const url = SpreadsheetApp
    .openById(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID')).getUrl();
  console.log('Scored ' + lead.band + ' (' + lead.score + '): ' + lead.why);
  console.log('Lead sheet: ' + url);
  console.log('CSV download (after deploying): <web-app-url>?export=csv&key=' + csvKey);
}
