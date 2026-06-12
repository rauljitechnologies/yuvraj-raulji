# 🌐 Domain Setup — yuvrajraulji.com

Two good free options. **Vercel is recommended** — it gives clean URLs
(`yuvrajraulji.com/blog` instead of `/blog.html`), automatic SSL, and a global CDN.

---

## ⭐ Option A — Vercel (recommended, ~10 minutes)

### 1. Push the site to GitHub
```bash
cd "~/Documents/New project"
git init
git add .
git commit -m "Portfolio website"
# create the repo on GitHub first (e.g. yuvrajraulji-website), then:
git remote add origin https://github.com/<your-username>/yuvrajraulji-website.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to **https://vercel.com** → sign up with your **GitHub** account
2. **Add New → Project** → Import `yuvrajraulji-website`
3. Framework preset: **Other** · Build command: *(empty)* · Output dir: *(empty)*
4. **Deploy** — site is live on `something.vercel.app` in ~30 seconds
   *(the included `vercel.json` already enables clean URLs + security headers)*

### 3. Connect the domain
1. Vercel → your project → **Settings → Domains** → add `yuvrajraulji.com`
2. Also add `www.yuvrajraulji.com` → choose **Redirect to yuvrajraulji.com**
3. Vercel shows you the DNS records — add them at your domain registrar
   (GoDaddy / Hostinger / Namecheap — wherever you bought the domain):

| Type  | Name / Host | Value                  |
|-------|-------------|------------------------|
| A     | `@`         | `76.76.21.21`          |
| CNAME | `www`       | `cname.vercel-dns.com` |

> Registrar path is similar everywhere: **Domain list → DNS / Manage DNS →
> Add record**. Delete any old A/CNAME records for `@` and `www` first
> (especially registrar "parking" records).

### 4. Wait + verify
- DNS usually propagates in 5–30 minutes (can take up to 24h)
- Vercel issues the **SSL certificate automatically** — `https://yuvrajraulji.com` ✅
- Every future `git push` redeploys the site automatically

---

## Option B — GitHub Pages (also free)

1. Push the code to GitHub (same as step 1 above)
2. Repo → **Settings → Pages** → Source: `main` branch, `/ (root)` → Save
3. In **Custom domain** enter `yuvrajraulji.com` → Save
   *(the included `CNAME` file keeps this setting across deploys)*
4. Tick **Enforce HTTPS** (appears after DNS verifies)
5. At your registrar add:

| Type  | Name / Host | Value                       |
|-------|-------------|-----------------------------|
| A     | `@`         | `185.199.108.153`           |
| A     | `@`         | `185.199.109.153`           |
| A     | `@`         | `185.199.110.153`           |
| A     | `@`         | `185.199.111.153`           |
| CNAME | `www`       | `<your-username>.github.io` |

> Note: on GitHub Pages URLs keep `.html` (`/blog.html`). The `blog/<slug>/`
> folders still give clean article URLs. Vercel's clean URLs are nicer.

---

## After the domain is live — final checklist

| ✅ | Task |
|----|------|
| ☐ | Open `https://yuvrajraulji.com` — site loads with the padlock (SSL) |
| ☐ | `https://www.yuvrajraulji.com` redirects to the non-www domain |
| ☐ | `https://yuvrajraulji.com/blog/magento2-checkout-optimization` opens the article (clean URL) |
| ☐ | **Google Search Console** → https://search.google.com/search-console → Add property `yuvrajraulji.com` (Domain) → verify via the DNS TXT record it gives you |
| ☐ | Search Console → **Sitemaps** → submit `https://yuvrajraulji.com/sitemap.xml` (already created, 24 URLs) |
| ☐ | Re-deploy the Apps Script lead API if not done, and paste the URL into `window.LEAD_ENDPOINT` in `index.html` |
| ☐ | Quick DNS check anytime: https://dnschecker.org → enter `yuvrajraulji.com` |

**Files already prepared in this project:** `vercel.json` (clean URLs, headers),
`CNAME` (GitHub Pages), `robots.txt`, `sitemap.xml` (home + blog + 22 articles).
