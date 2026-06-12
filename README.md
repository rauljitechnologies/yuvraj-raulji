# Yuvraj Raulji — Portfolio & Blog

Luxury portfolio website for **yuvrajraulji.com** — Full Stack E-commerce Developer & AI Consultant.

## Pages
- `index.html` — home (services, work, technology, contact popup)
- `blog.html` — blog listing (22 articles, live category filters)
- `blog-detail.html` — article page (`?slug=...`)
- `blog/<slug>/` — clean-URL redirects for every article

## Run locally
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Lead system
Contact form → Google Apps Script → Google Sheet + email notifications.
Setup: `google-apps-script/SETUP-GUIDE.md` (one-time, 5 min), then paste the
Web App URL into `window.LEAD_ENDPOINT` in `index.html`.

## Deploy
See `DOMAIN-SETUP.md` — Vercel (recommended, clean URLs via `vercel.json`)
or GitHub Pages (`CNAME` included). `robots.txt` + `sitemap.xml` ready.
