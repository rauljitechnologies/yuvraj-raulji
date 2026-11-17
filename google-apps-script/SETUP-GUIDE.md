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

## Step 5: DEPLOYING A CHANGE, AND FIXING A DEAD ENDPOINT (read this one)

Both are now one command, run from the repository root:

```sh
npm run lead-api:deploy
```

It pushes this folder, creates a version, moves the live deployment onto it and
then verifies the live URL. It never creates a deployment, so the `/exec` URL
cannot drift away from `LEAD_ENDPOINT` in `lib/site.ts`.

To check the endpoint without deploying anything:

```sh
npm run lead-api:check
```

The probe posts `hp=probe`, which is the honeypot branch: `doPost` returns
`{"ok":true}` before writing a row or sending mail, so it creates no lead and
can run as often as you like, including from cron.

### What was actually wrong, twice

**4 Sep 2026.** The live endpoint returned `302` to `accounts.google.com`. Every
enquiry was discarded and the browser's CORS check turned it into a
`TypeError: Failed to fetch`.

**17 Nov 2026.** It returned `401` on POST. The manifest on the server read:

```json
"executeAs": "USER_ACCESSING",
"access": "ANYONE"
```

Both halves were wrong, and neither is obvious in the UI. `ANYONE` is what the
UI calls **"Anyone with a Google Account"**, not "Anyone"; the setting this
needs is `ANYONE_ANONYMOUS`. And `USER_ACCESSING` means "Execute as: User
accessing the web app", which makes every caller sign in before the script runs
at all. A visitor filling in a contact form is not going to sign in to Google.

`appsscript.json` in this folder has carried the correct pair all along:

```json
"executeAs": "USER_DEPLOYING",
"access": "ANYONE_ANONYMOUS"
```

The catch is the one the old version of this guide only half stated: that file
governs the deployment **only once it has been pushed with clasp**. A deployment
created in the web UI keeps the UI's settings until a pushed manifest replaces
them. `npm run lead-api:deploy` is that push, which is why it is the repair and
not just the release.

The same deploy had been skipped for the code, too. `Code.gs` was rewritten on
17 Nov and the deployment sat on version 5, so every lead was still being scored
by the function the rewrite had replaced.

### If the push is refused

`User has not enabled the Apps Script API` means the account switch is off:
enable it at **https://script.google.com/home/usersettings** and retry. It takes
a minute or two to propagate.

### Reading the result of a POST by hand

A healthy POST answers `302` with a `Location` on `script.googleusercontent.com`
which is where the body is. That is success, not a sign-in redirect, and this
guide and the check script both used to misread it. `curl -L` turns the POST
into a GET and reports a `405` that means nothing; fetch the `Location` instead:

```sh
URL=$(grep -o "https://script.google.com/macros/s/[^']*" lib/site.ts | head -1)
LOC=$(curl -s -D - -o /dev/null -X POST -d 'hp=probe' "$URL" \
      | awk 'tolower($1)=="location:"{print $2}' | tr -d '\r')
curl -s "$LOC"      # {"ok":true}
```

A `Location` on `accounts.google.com` is the real failure.

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
| After editing Code.gs | `npm run lead-api:deploy` (pushes, versions, redeploys in place and verifies; same URL keeps working) |
| Email limit | Free Gmail: ~100 recipients/day via Apps Script — plenty for leads |
| Spam protection | Hidden honeypot field silently drops bot submissions |
| If LEAD_ENDPOINT is empty | The form safely falls back to opening the visitor's email app (old behaviour) |
