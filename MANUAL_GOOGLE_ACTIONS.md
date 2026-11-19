# Manual actions, for you to complete

Everything in this file needs the Google interfaces or your DNS, and **none of
it has been done**. It is not claimed as complete anywhere in this branch.

Order matters only in one place: deploy first, then validate the 404 fixes.

---

## 1. GA4: mark the key events

Admin, then **Events**, then **Key events**. Today only the default `purchase`
is marked, and it has no data, which is why every report shows 0 conversions.

| Event | Mark as key event? | Why |
| --- | --- | --- |
| `generate_lead` | **Yes** | The one real outcome: a form submission the lead endpoint confirmed |
| `whatsapp_click` | Your call, recommended | On this site a WhatsApp tap is a real contact, not a step toward one |
| `email_click` | Your call | Same reasoning, lower volume |
| `phone_click` | Your call | Same |
| `contact_cta_click` | **No** | Top of funnel. Marking it turns every button click into a "conversion" and hides the real number |
| `consultation_cta_click` | **No** | There is no booking destination yet, so a click means someone wanted to book and could not. Counting it would hide exactly the number worth watching |
| Everything else | **No** | |

Steps:

1. Open the property `yuvrajmagentoexpert` (account "Yuvraj Raulji -GA4").
2. Admin, then Events. `generate_lead` is listed because the property has
   received one in the last 28 days.
3. Toggle **Mark as key event**.
4. Repeat for `whatsapp_click`, `email_click` and `phone_click` if you want
   them counted.

Two things to know: a key event counts from the moment you mark it and does not
backfill, and GA4 can take up to 24 hours to show it in standard reports.

---

## 2. GA4: register the custom dimensions

Without this, the parameters arrive but cannot be broken down in any report.
Admin, then **Custom definitions**, then **Create custom dimension**, scope
**Event** for all of them.

| Dimension name | Event parameter | What it answers |
| --- | --- | --- |
| Funnel | `funnel` | Which funnel produced the enquiry |
| Service selected | `service_selected` | Which service enquirers pick |
| Form location | `form_location` | Whether enquiries come from `/contact/`, the homepage or the modal |
| CTA text | `cta_text` | Which wording gets clicked |
| Destination | `destination` | Where a tracked click was going |
| Error type | `error_type` | Why a submission failed |

`form_location` is new in this branch. The other five already arrive.

GA4 allows 50 event-scoped custom dimensions, so there is no pressure to
choose between these.

---

## 3. GA4: two settings the audit flagged

- **Data retention.** Admin, then Data settings, then Data retention. The
  default is 2 months; set it to **14 months**. The audit could not read the
  current value.
- **Internal traffic.** Admin, then Data streams, then the web stream, then
  Configure tag settings, then Define internal traffic. Add your own IP, then
  turn on the Internal Traffic filter under Data settings, then Data filters.
  This is what stops your own visits inflating the numbers.
- **Stream name** (cosmetic). It is still `yuvrajmagentoexpert`, from the old
  positioning. Renaming it changes nothing in the data.

---

## 4. Search Console: request indexing for `/about/` and `/contact/`

Both are "Discovered, currently not indexed". Both return 200, are in the
sitemap, are self-canonical and are not blocked by robots.txt. The in-content
links added in this branch help, but the direct request is the decisive step.

1. Open the property `https://www.yuvrajraulji.com/`.
2. Paste `https://www.yuvrajraulji.com/about/` into URL Inspection.
3. Click **Request indexing**. Repeat for `https://www.yuvrajraulji.com/contact/`.
4. Do the same for `https://www.yuvrajraulji.com/wordpress/maintenance/`, the
   third page in that group.

There is a daily quota on indexing requests. Three URLs is well inside it.

---

## 5. Search Console: validate the 404 fixes (after deploy)

Do this **after** the branch is merged and deployed, not before. Validating
against a site that still 404s restarts the clock.

1. Confirm the redirects are live. The exact `curl` commands are in
   `REDIRECT_TEST_REPORT.md`, section 3.
2. Search Console, then Pages, then **Not found (404)**.
3. Click **Validate fix**.

Google re-crawls over days, not minutes. The 12% of crawl requests hitting 404s
should fall as it works through them.

---

## 6. DNS: the Domain property (optional)

A Domain property covers `http`, the apex and every subdomain in one place.
The current property is URL-prefix only.

1. Search Console, then Add property, then **Domain**, then enter
   `yuvrajraulji.com`.
2. Google gives a TXT record, in the shape `google-site-verification=...`.
3. Add it at your DNS provider as a TXT record on the root (`@`), then click
   Verify. Propagation is usually minutes.

Adding it does not disturb the existing property or its data, and GA4 stays
linked to the property it is already linked to.

---

## 7. What is not worth doing yet

**Core Web Vitals.** Search Console says "not enough usage data in the last 90
days" for both mobile and desktop, which is a traffic problem rather than a
performance one. Until field data exists, lab data is the only signal.

One correction to the audit on this point. It lists three.js, GSAP and Lenis
as reasons to watch mobile LCP and INP. They are in `package.json` and they
are imported by nothing: no shipped chunk contains a single reference to any
of them. They have been removed from the manifest, which changes no bytes in
the browser because none were ever sent.

What the browser does load, measured from the export rather than estimated,
is in `SEO_FIXES_REPORT.md` section 6, along with the 35% cut made to the
article pages and the next lever if more is needed.
