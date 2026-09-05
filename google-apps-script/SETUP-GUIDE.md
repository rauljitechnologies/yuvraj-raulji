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

The endpoint lives in `lib/site.ts`, not in any HTML file:

```ts
export const LEAD_ENDPOINT =
  'https://script.google.com/macros/s/<deployment-id>/exec';
```

Change it only if the deployment URL changed. Editing an existing deployment
keeps the URL, which is why Step 5 is the one to use.

## Step 5 — FIXING A DEAD ENDPOINT (read this one)

On 4 Sep 2026 the live endpoint was found returning `302` to
`accounts.google.com`, which means the deployment's access had drifted away from
"Anyone". Every enquiry submitted from the website was being discarded, and the
browser's CORS check turned it into a `TypeError: Failed to fetch`.

`appsscript.json` in this folder already declares `ANYONE_ANONYMOUS`, but that
only applies to deployments pushed with clasp. A deployment created or edited in
the web UI uses whatever the UI has set, so the UI is the source of truth here.

**Repair it without changing the URL:**

1. Open the Apps Script project
2. **Deploy → Manage deployments**
3. Click the pencil ✏️ on the active deployment. **Do not create a new
   deployment**, because that issues a new URL and the site would need a code
   change to match
4. Set **Who has access** to **Anyone**
5. Set **Version** to **New version**
6. **Deploy**

**Then verify from a terminal, not from a browser.** A browser is signed in to
Google and will appear to work even when anonymous requests do not:

```sh
curl -sI "https://script.google.com/macros/s/<deployment-id>/exec" | head -1
```

`HTTP/2 200` means it is fixed. `HTTP/2 302` means access is still restricted
and the form is still discarding every lead.

Last, submit a real enquiry through the website and confirm it reaches both the
sheet and your inbox. The site reports failure honestly now, so a submission
that fails will say so rather than showing a false success.

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
