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
     prospect reads. It said "Full Stack E-commerce Developer & AI Consultant",
     which is the wrong positioning and uses two words the brand does not use.
     It now matches the site exactly. */
  BRAND_TAGLINE:    'eCommerce, AI & Technology Consultant',
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
  'Date', 'Band', 'Score', 'Name', 'Email', 'Phone', 'Company', 'Website',
  'Role', 'Platform', 'Timeline', 'Budget', 'Service', 'Message', 'Page', 'Status'
];

/* ── Web app entry points ─────────────────────────────────── */

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};

    // Honeypot: bots fill hidden fields; humans never see them
    if (p.hp) return jsonOut_({ ok: true });

    const lead = {
      date:     new Date(),
      name:     clean_(p.name, 120),
      email:    clean_(p.email, 160),
      phone:    clean_(p.phone, 40),
      company:  clean_(p.company, 120),
      /* The single highest-value field on the form. One paste tells you the
         platform, the scale and usually the problem, before you read a word of
         the message. Captured whether or not the form sends it yet. */
      website:  clean_(p.website, 300),
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
   whether there is a reply. */

const DECISION_ROLES = ['owner', 'ceo', 'managing director', 'md', 'director',
  'head of ecommerce', 'head of e-commerce', 'cto', 'coo', 'agency'];

const LOW_SIGNALS = ['looking for a job', 'job opportunity', 'resume', 'cv attached',
  'internship', 'hire me', 'guest post', 'link building', 'seo services',
  'we can increase your traffic', 'backlink'];

function scoreLead_(lead) {
  let score = 0;
  const why = [];
  const hay = (lead.message + ' ' + lead.service).toLowerCase();

  if (lead.website)  { score += 2; why.push('site given'); }
  if (lead.company)  { score += 1; why.push('company given'); }

  const role = lead.role.toLowerCase();
  if (role && DECISION_ROLES.some(function (r) { return role.indexOf(r) > -1; })) {
    score += 2; why.push('decision maker');
  }

  const tl = lead.timeline.toLowerCase();
  if (tl.indexOf('now') > -1 || tl.indexOf('1 month') > -1 || tl.indexOf('3 month') > -1) {
    score += 3; why.push('near timeline');
  } else if (tl.indexOf('6 month') > -1) {
    score += 2; why.push('timeline set');
  } else if (tl) {
    score += 1; why.push('timeline given');
  }

  if (lead.platform && lead.platform.toLowerCase().indexOf('not sure') === -1) {
    score += 1; why.push('platform named');
  }
  if (lead.budget) { score += 1; why.push('budget band given'); }
  if (lead.message.length > 120) { score += 1; why.push('detailed message'); }

  // Obvious non-business contact. Still saved, still emailed, replied to last.
  if (LOW_SIGNALS.some(function (s) { return hay.indexOf(s) > -1; })) {
    return { score: score, band: 'LOW PRIORITY', why: 'matched a job or vendor pattern' };
  }

  /* If the form sent none of the qualifying fields, there is nothing to score
     on, and calling that "LOW PRIORITY" would libel every good lead the current
     form produces. Say so instead: UNSCORED means the form needs the fields,
     not that the enquiry is weak. */
  const asked = lead.website || lead.company || lead.role ||
                lead.platform || lead.timeline || lead.budget;
  if (!asked) {
    return {
      score: score,
      band: 'UNSCORED',
      why: 'form did not send the qualifying fields'
    };
  }

  const band = score >= 7 ? 'HOT'
             : score >= 4 ? 'QUALIFIED'
             : score >= 2 ? 'NURTURE'
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
  sheet.setColumnWidth(1, 150);   // Date
  sheet.setColumnWidth(2, 110);   // Band
  sheet.setColumnWidth(3, 60);    // Score
  sheet.setColumnWidth(8, 240);   // Website
  sheet.setColumnWidth(14, 420);  // Message
  sheet.setColumnWidth(15, 220);  // Page
}

function appendLead_(lead) {
  const ss = getOrCreateSpreadsheet_();
  const sheet = ss.getSheetByName(CONFIG.SHEET_TAB) || ss.getSheets()[0];
  ensureHeaders_(sheet);
  /* Blanks are written as empty, not as a dash. A dash is a value, and it makes
     "not asked" indistinguishable from "asked and left blank" in the sheet. */
  sheet.appendRow([
    Utilities.formatDate(lead.date, Session.getScriptTimeZone(), 'dd MMM yyyy HH:mm'),
    lead.band, lead.score, lead.name, lead.email, lead.phone, lead.company,
    lead.website, lead.role, lead.platform, lead.timeline, lead.budget,
    lead.service, lead.message, lead.page, 'New'
  ]);
}

/* ── Email to YOU ─────────────────────────────────────────── */

function sendOwnerEmail_(lead) {
  const rows = [
    ['Band',     esc_(lead.band) + ' (' + lead.score + ') ' +
                 '<span style="color:#999">' + esc_(lead.why) + '</span>'],
    ['Name',     esc_(lead.name)],
    ['Email',    link_('mailto:' + esc_(lead.email), esc_(lead.email))],
    ['Phone',    lead.phone ? link_('tel:' + esc_(lead.phone), esc_(lead.phone)) : 'Not given'],
    ['Company',  lead.company ? esc_(lead.company) : 'Not given'],
    ['Website',  lead.website ? link_(esc_(href_(lead.website)), esc_(lead.website)) : 'Not given'],
    ['Role',     lead.role     ? esc_(lead.role)     : 'Not given'],
    ['Platform', lead.platform ? esc_(lead.platform) : 'Not given'],
    ['Timeline', lead.timeline ? esc_(lead.timeline) : 'Not given'],
    ['Budget',   lead.budget   ? esc_(lead.budget)   : 'Not given'],
    ['About',    esc_(lead.service)],
    ['Page',     lead.page ? esc_(lead.page) : 'Not given'],
    ['Date',     Utilities.formatDate(lead.date, Session.getScriptTimeZone(), 'dd MMM yyyy, HH:mm')]
  ];

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
  const lead = {
    date: new Date(),
    name: 'Test Lead',
    email: CONFIG.OWNER_EMAIL,
    phone: '9898334731',
    company: 'Test Commerce Ltd',
    website: 'example.com',
    role: 'Head of eCommerce',
    platform: 'Magento 2',
    timeline: 'Within 3 months',
    budget: 'Not disclosed',
    service: 'A replatforming or migration',
    message: 'Test lead from testSetup(). If this arrived, the sheet, the scoring and both emails are working.',
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
