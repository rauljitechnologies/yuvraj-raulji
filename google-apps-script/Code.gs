/**
 * ═══════════════════════════════════════════════════════════════
 *  YUVRAJ RAULJI — WEBSITE LEAD API  (Google Apps Script)
 * ═══════════════════════════════════════════════════════════════
 *  What this does on every form submission:
 *    1. Saves the lead to a Google Sheet  (auto-created on first run)
 *    2. Emails the lead details to you    (toyuvrajraulji@gmail.com)
 *    3. Sends a branded confirmation email to the client
 *
 *  ONE-TIME SETUP → see SETUP-GUIDE.md (5 minutes)
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
  SPREADSHEET_NAME: 'Yuvraj Raulji — Website Leads',
  SHEET_TAB:        'Leads',
  BRAND_RED:        '#c8102e',
  BRAND_RED_HOVER:  '#e8192c'
};

/* ── Web app entry points ─────────────────────────────────── */

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};

    // Honeypot — bots fill hidden fields; humans never see them
    if (p.hp) return jsonOut_({ ok: true });

    const lead = {
      date:    new Date(),
      name:    String(p.name    || '').trim().slice(0, 120),
      email:   String(p.email   || '').trim().slice(0, 160),
      phone:   String(p.phone   || '').trim().slice(0, 40),
      service: String(p.service || 'Not specified').trim().slice(0, 80),
      message: String(p.message || '').trim().slice(0, 4000),
      page:    String(p.page    || '').trim().slice(0, 300)
    };

    if (!lead.name || !lead.email || !lead.message) {
      return jsonOut_({ ok: false, error: 'Missing required fields' });
    }

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

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.export === 'csv') return exportCsv_(p.key);
  return jsonOut_({ ok: true, service: 'YR Lead API', time: new Date().toISOString() });
}

/* ── CSV export — download all leads as a .csv file ────────
   URL:  <web-app-url>?export=csv&key=<your-secret-key>
   The key is auto-generated; testSetup() prints it.        */
function exportCsv_(key) {
  const want = PropertiesService.getScriptProperties().getProperty('CSV_KEY');
  if (!want || key !== want) {
    return ContentService.createTextOutput('Forbidden — invalid key').setMimeType(ContentService.MimeType.TEXT);
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

/* ── Google Sheet (auto-generated, one time) ──────────────── */

function getOrCreateSpreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  const savedId = props.getProperty('SPREADSHEET_ID');

  if (savedId) {
    try { return SpreadsheetApp.openById(savedId); } catch (err) { /* deleted — recreate */ }
  }

  const ss = SpreadsheetApp.create(CONFIG.SPREADSHEET_NAME);
  const sheet = ss.getSheets()[0];
  sheet.setName(CONFIG.SHEET_TAB);

  const headers = ['Date', 'Name', 'Email', 'Phone', 'Service', 'Message', 'Page', 'Status'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground(CONFIG.BRAND_RED)
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontSize(11);
  sheet.setFrozenRows(1);
  sheet.setColumnWidths(1, 1, 150);   // Date
  sheet.setColumnWidths(2, 2, 180);   // Name, Email
  sheet.setColumnWidths(4, 1, 130);   // Phone
  sheet.setColumnWidths(5, 1, 200);   // Service
  sheet.setColumnWidths(6, 1, 420);   // Message
  sheet.setColumnWidths(7, 1, 220);   // Page
  sheet.setColumnWidths(8, 1, 100);   // Status

  props.setProperty('SPREADSHEET_ID', ss.getId());

  // Tell the owner where the sheet lives (one time)
  MailApp.sendEmail({
    to: CONFIG.OWNER_EMAIL,
    subject: '✅ Lead sheet created — ' + CONFIG.SPREADSHEET_NAME,
    htmlBody: 'Your website lead sheet was auto-created.<br><br>' +
              '<a href="' + ss.getUrl() + '"><b>Open the lead sheet →</b></a><br><br>' +
              'Every new form submission will be added here automatically.'
  });

  return ss;
}

function appendLead_(lead) {
  const ss = getOrCreateSpreadsheet_();
  const sheet = ss.getSheetByName(CONFIG.SHEET_TAB) || ss.getSheets()[0];
  sheet.appendRow([
    Utilities.formatDate(lead.date, Session.getScriptTimeZone(), 'dd MMM yyyy HH:mm'),
    lead.name, lead.email, lead.phone || '—', lead.service, lead.message, lead.page || '—', 'New'
  ]);
}

/* ── Email to YOU (lead notification) ─────────────────────── */

function sendOwnerEmail_(lead) {
  const waLink = lead.phone
    ? 'https://wa.me/' + lead.phone.replace(/[^0-9]/g, '')
    : 'https://wa.me/' + CONFIG.OWNER_WHATSAPP;

  const html =
  emailShell_(
    '🔥 New Lead — ' + esc_(lead.name),
    '<p style="margin:0 0 18px;font-size:14px;color:#444;line-height:1.6">A new inquiry just arrived from your website.</p>' +
    detailsTable_([
      ['Name',    esc_(lead.name)],
      ['Email',   '<a href="mailto:' + esc_(lead.email) + '" style="color:' + CONFIG.BRAND_RED + '">' + esc_(lead.email) + '</a>'],
      ['Phone',   lead.phone ? '<a href="tel:' + esc_(lead.phone) + '" style="color:' + CONFIG.BRAND_RED + '">' + esc_(lead.phone) + '</a>' : '—'],
      ['Service', esc_(lead.service)],
      ['Page',    lead.page ? esc_(lead.page) : '—'],
      ['Date',    Utilities.formatDate(lead.date, Session.getScriptTimeZone(), 'dd MMM yyyy, HH:mm')]
    ]) +
    '<p style="margin:22px 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;font-weight:bold">Message</p>' +
    '<div style="background:#faf7f7;border-left:3px solid ' + CONFIG.BRAND_RED + ';padding:14px 18px;border-radius:0 8px 8px 0;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap">' + esc_(lead.message) + '</div>' +
    '<table cellpadding="0" cellspacing="0" style="margin:26px 0 4px"><tr>' +
    '<td><a href="mailto:' + esc_(lead.email) + '?subject=' + encodeURIComponent('Re: Your inquiry — ' + CONFIG.BRAND_NAME) + '" style="display:inline-block;background:' + CONFIG.BRAND_RED + ';color:#fff;text-decoration:none;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;padding:12px 22px;border-radius:6px">Reply Now</a></td>' +
    (lead.phone ? '<td style="padding-left:10px"><a href="' + waLink + '" style="display:inline-block;background:#1ebe57;color:#fff;text-decoration:none;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;padding:12px 22px;border-radius:6px">WhatsApp</a></td>' : '') +
    '</tr></table>'
  );

  MailApp.sendEmail({
    to: CONFIG.OWNER_EMAIL,
    replyTo: lead.email,
    subject: '🔥 New Lead: ' + lead.name + (lead.service !== 'Not specified' ? ' — ' + lead.service : ''),
    htmlBody: html
  });
}

/* ── Confirmation email to the CLIENT ─────────────────────── */

function sendClientEmail_(lead) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return;

  const html =
  emailShell_(
    'Thank You, ' + esc_(firstName_(lead.name)) + '!',
    '<p style="margin:0 0 16px;font-size:14px;color:#444;line-height:1.75">' +
      'Your message has been received — thank you for reaching out. I personally review every inquiry and will get back to you ' +
      '<b style="color:#111">within 24 hours</b>.</p>' +
    '<p style="margin:0 0 22px;font-size:14px;color:#444;line-height:1.75">Here is a copy of what you sent:</p>' +
    detailsTable_([
      ['Service',  esc_(lead.service)],
      ['Message',  '<span style="white-space:pre-wrap">' + esc_(lead.message.slice(0, 600)) + (lead.message.length > 600 ? '…' : '') + '</span>']
    ]) +
    '<p style="margin:24px 0 10px;font-size:14px;color:#444;line-height:1.75">Need a faster answer? Call or WhatsApp me directly:</p>' +
    '<table cellpadding="0" cellspacing="0" style="margin:0 0 8px"><tr>' +
    '<td><a href="tel:+919898334731" style="display:inline-block;background:' + CONFIG.BRAND_RED + ';color:#fff;text-decoration:none;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;padding:12px 22px;border-radius:6px">📞 ' + CONFIG.OWNER_PHONE + '</a></td>' +
    '<td style="padding-left:10px"><a href="https://wa.me/' + CONFIG.OWNER_WHATSAPP + '" style="display:inline-block;background:#1ebe57;color:#fff;text-decoration:none;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;padding:12px 22px;border-radius:6px">WhatsApp</a></td>' +
    '</tr></table>'
  );

  MailApp.sendEmail({
    to: lead.email,
    replyTo: CONFIG.OWNER_EMAIL,
    subject: '✅ Received your inquiry — ' + CONFIG.BRAND_NAME + ' will reply within 24 hours',
    htmlBody: html,
    name: CONFIG.BRAND_NAME
  });
}

/* ── Shared branded email shell ───────────────────────────── */

function emailShell_(heading, bodyHtml) {
  return '' +
  '<div style="margin:0;padding:28px 14px;background:#f1f1f1;font-family:Arial,Helvetica,sans-serif">' +
    '<table cellpadding="0" cellspacing="0" align="center" style="max-width:600px;width:100%;margin:0 auto">' +
      // Header
      '<tr><td style="background:#0a0a0a;border-radius:12px 12px 0 0;padding:26px 32px;border-bottom:3px solid ' + CONFIG.BRAND_RED + '">' +
        '<table cellpadding="0" cellspacing="0"><tr>' +
          '<td style="width:44px;height:44px;border:1px solid ' + CONFIG.BRAND_RED + ';border-radius:50%;text-align:center;vertical-align:middle;color:' + CONFIG.BRAND_RED_HOVER + ';font-weight:bold;font-size:15px">YR</td>' +
          '<td style="padding-left:14px">' +
            '<div style="color:#ffffff;font-size:16px;font-weight:bold;letter-spacing:1px">' + CONFIG.BRAND_NAME.toUpperCase() + '</div>' +
            '<div style="color:#888;font-size:10px;letter-spacing:2px;text-transform:uppercase;padding-top:3px">' + CONFIG.BRAND_TAGLINE + '</div>' +
          '</td>' +
        '</tr></table>' +
      '</td></tr>' +
      // Body
      '<tr><td style="background:#ffffff;padding:32px">' +
        '<h1 style="margin:0 0 18px;font-size:22px;color:#111;letter-spacing:.5px">' + heading + '</h1>' +
        bodyHtml +
      '</td></tr>' +
      // Footer
      '<tr><td style="background:#0a0a0a;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center">' +
        '<div style="color:#777;font-size:11px;line-height:1.9">' +
          CONFIG.BRAND_NAME + ' · ' + CONFIG.BRAND_TAGLINE + '<br>' +
          '<a href="mailto:' + CONFIG.OWNER_EMAIL + '" style="color:' + CONFIG.BRAND_RED_HOVER + ';text-decoration:none">' + CONFIG.OWNER_EMAIL + '</a>' +
          ' &nbsp;·&nbsp; <a href="tel:+919898334731" style="color:' + CONFIG.BRAND_RED_HOVER + ';text-decoration:none">' + CONFIG.OWNER_PHONE + '</a><br>' +
          '<a href="' + CONFIG.SITE_URL + '" style="color:#999;text-decoration:none">' + CONFIG.SITE_URL.replace('https://', '') + '</a> · Vadodara, Gujarat, India' +
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

function esc_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function firstName_(name) {
  return String(name).trim().split(/\s+/)[0] || 'there';
}

function logError_(where, err) {
  console.error(where + ': ' + (err && err.stack ? err.stack : err));
}

/* ── ONE-TIME TEST — run this manually once after pasting ───
   Authorizes permissions, auto-creates the Google Sheet,
   and sends test emails so you can verify everything works. */
function testSetup() {
  const lead = {
    date: new Date(),
    name: 'Test Lead',
    email: CONFIG.OWNER_EMAIL,
    phone: '+91 98983 34731',
    service: 'Magento 2 Development',
    message: 'This is a test lead from testSetup(). If you received this, your lead system is working perfectly. 🎉',
    page: CONFIG.SITE_URL + '/#contact'
  };
  appendLead_(lead);
  sendOwnerEmail_(lead);
  sendClientEmail_(lead);
  const csvKey = ensureCsvKey_();
  const url = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID')).getUrl();
  console.log('✅ All good! Lead sheet: ' + url);
  console.log('📥 CSV download (after deploying): <web-app-url>?export=csv&key=' + csvKey);
}
