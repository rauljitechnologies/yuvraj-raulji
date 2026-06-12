# 🚀 Lead System — One-Time Setup (5 minutes)

Every contact-form submission will then automatically:
1. ✅ Save the lead to a Google Sheet (created for you automatically)
2. ✅ Email the lead details to **toyuvrajraulji@gmail.com**
3. ✅ Send a branded confirmation email to the client (with your phone **+91 98983 34731** and WhatsApp button)

---

## Step 1 — Create the Apps Script

1. Make sure you are logged into Google as **toyuvrajraulji@gmail.com**
2. Open **https://script.new** (creates a new Apps Script project)
3. Delete the default code in the editor
4. Copy **everything** from `Code.gs` (in this folder) and paste it in
5. Click the project name (top-left, "Untitled project") → rename to **YR Lead API** → Save (Cmd+S)

## Step 2 — Authorize + auto-create the Sheet (one time)

1. In the toolbar dropdown, select the function **`testSetup`** → click **Run**
2. Google will ask for permissions → **Review permissions** → choose your account
   → "Google hasn't verified this app" → **Advanced** → **Go to YR Lead API (unsafe)** → **Allow**
   *(it's your own script — this is normal)*
3. When it finishes:
   - 📊 The Google Sheet **"Yuvraj Raulji — Website Leads"** is created in your Drive automatically
   - 📧 You receive a test lead email + a test confirmation email
   - The sheet link is also emailed to you

## Step 3 — Deploy as a Web App

1. Click **Deploy → New deployment**
2. Click the gear ⚙️ next to "Select type" → choose **Web app**
3. Settings:
   - Description: `lead api`
   - Execute as: **Me (toyuvrajraulji@gmail.com)**
   - Who has access: **Anyone**
4. Click **Deploy** → copy the **Web app URL** (ends with `/exec`)

## Step 4 — Paste the URL into the website

1. Open `index.html`
2. Near the top (in `<head>`) find:
   ```html
   <script>window.LEAD_ENDPOINT = "";</script>
   ```
3. Paste your Web App URL between the quotes:
   ```html
   <script>window.LEAD_ENDPOINT = "https://script.google.com/macros/s/XXXX/exec";</script>
   ```
4. Save. **Done — your lead software is live.** 🎉

---

## Test it

Open the website → click **Consultation** → fill the form → Send.
Within seconds you should see:
- A new row in the **Leads** sheet
- A "🔥 New Lead" email in your inbox
- The client (the email you typed) receives the confirmation email

## Good to know

| Topic | Detail |
|---|---|
| Sheet location | Google Drive → "Yuvraj Raulji — Website Leads" (also linked in the setup email) |
| Change phone/email/branding | Edit the `CONFIG` block at the top of `Code.gs` |
| After editing Code.gs | **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy** (same URL keeps working) |
| Email limit | Free Gmail: ~100 recipients/day via Apps Script — plenty for leads |
| Spam protection | Hidden honeypot field silently drops bot submissions |
| If LEAD_ENDPOINT is empty | The form safely falls back to opening the visitor's email app (old behaviour) |
