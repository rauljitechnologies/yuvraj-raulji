# SEO fixes report

**Scope:** Phase 3 of the GA4 and Search Console audit dated 19 November 2026.
Branch `seo/ga4-audit-remediation`.

The audit's numbers behind this work: 8.13K impressions and 24 clicks in 16
months, a 0.3% average CTR, four pages ranking on page one with zero clicks,
and one article carrying 61% of all impressions at position 26.

No ranking, testimonial, client name or result is claimed anywhere in these
changes.

---

## 1. Titles and descriptions

### `/magento/upgrade/` (position 5.6, 64 impressions, 0 clicks)

| | Before | After |
| --- | --- | --- |
| Title | Magento 2 Upgrade Services \| Yuvraj Raulji (42) | Magento 2 Upgrade Services \| Rehearsed and Reversible (53) |
| Description | 146 chars, a list of what is included | 153 chars, the same work framed as the risk it removes |

The old title said what the page is and nothing about why to open it. A buyer
searching for upgrade services has usually deferred one because the last one
hurt, so the promise that matters is a rehearsed path and a written rollback,
both of which the page already delivers.

### `/hire/` (position 8.0, 28 impressions, 0 clicks)

| | Before | After |
| --- | --- | --- |
| Title | Hire Yuvraj Raulji \| Your Technology Partner (44) | Hire an eCommerce Developer and Consultant \| Yuvraj Raulji (58) |
| Description | "Work directly with Yuvraj Raulji as your technology partner…" (152) | "Work directly with one senior developer across Magento, Shopify, headless and AI. A written scope and a figure before you commit. No agency, no middle layer." (157) |

"Hire Yuvraj Raulji" only works for someone who already knows the name, and
nobody arriving on a non-brand query does. The name moves to the suffix where
it still earns the brand click.

### `/shopify/` (position 8.5, 28 impressions, 0 clicks)

Title unchanged: it already matches the query it ranks for and carries the
page's primary keyword. The description now leads with where the work moves the
number and keeps the honest boundary ("including when the platform is wrong"),
which is the differentiator against every agency result around it.

### `/nextjs/` (position 9.1, 27 impressions, 0 clicks)

| | Before | After |
| --- | --- | --- |
| Title | Next.js Consultant \| Yuvraj Raulji (34) | Next.js Consultant for Commerce Storefronts \| Yuvraj Raulji (59) |

The primary keyword stays first and the intent is added behind it. 34
characters was leaving half the SERP line unused.

### `/insights/magento2-seo-technical-audit/` (position 26.2, 4,969 impressions)

| | Before | After |
| --- | --- | --- |
| Title | Magento 2 SEO: The Complete Technical Audit Guide 2026 (54) | Magento 2 SEO Audit: The Complete Technical Guide (2026) (56) |
| Description | 125 chars | 145 chars, with Core Web Vitals added |

The queries this page ranks for are "magento seo audit", "magento website
audit", "magento site audit" and "magento 2 technical audit". The exact phrase
now leads the title. The visible H1 is unchanged: the shorter form is set as
`seoTitle`, which the post model already supports.

All five are inside the SERP limits: every title 60 characters or fewer, every
description 160 or fewer, verified against the exported HTML.

---

## 2. An FAQ on the article that carries the impressions

`lib/article-faqs.ts` is new: authored FAQs keyed by article slug, read by the
article template when they exist. Five questions are written for
`magento2-seo-technical-audit` and no others.

- The questions are the ones the ranking queries imply: what an audit checks,
  why Magento needs its own, which problems are most common, whether an SEO
  extension is needed, and how a technical audit differs from a site audit.
- They render as visible text in a new Questions section, and only then is
  `FAQPage` added to the page's JSON-LD graph. Markup without matching visible
  content is a structured-data violation rather than a free win, which is the
  rule `faqNode` in `lib/schema.ts` already states.
- No answer states a price, a turnaround or a result. `/ecommerce-audit/`
  deliberately states no price, and an FAQ is not the place to invent one.

Verified in the exported page: one `FAQPage` node, five questions, and the same
five rendered as text. No other article emits one.

---

## 3. Internal links to `/about/` and `/contact/`

Both are "Discovered, currently not indexed". The audit confirmed both return
200, are in the sitemap, are self-canonical and are not blocked: Google simply
has not crawled them.

They were already linked from the header and footer of all 89 pages, so there
is no link gap to close in the usual sense. What they had no instance of was an
**in-content** link, which a crawler weighs differently from boilerplate:

- The article byline name is now a link to `/about/`. That is also what an
  author block is supposed to carry, and it strengthens the author entity on
  all eight articles.
- The article closing call to action gains **Discuss Your Project** pointing at
  `/contact/`, beside the existing audit and insights links. It is the step a
  reader who finished the piece is closest to taking.

**This does not index the pages by itself.** The decisive action is a URL
Inspection request, which is manual and is written up in
`MANUAL_GOOGLE_ACTIONS.md`.

---

## 4. Reviewed and deliberately not changed

| Page | Decision |
| --- | --- |
| `/about/` | Title and description are accurate and inside the limits. Its problem is crawling, not copy |
| `/contact/` | Same. The title already carries the hire intent and the description already names WhatsApp, email and the form |
| `/shopify/` title | Already matches its query and primary keyword |
| Article H1s | Unchanged. Only the `<title>` was shortened, through `seoTitle` |
| US-focused pricing and case studies (audit item 11) | Not done. It is a commercial decision about what to publish, not a code fix |

---

## 5. Checks

`tsc --noEmit` clean. `eslint` clean, with the eight pre-existing `<img>`
warnings. `npm run build` clean: 90 pages, 87 in the sitemap, prohibited titles
clean, redirects checked, every internal link and image source resolved.

Canonicals re-verified across the exported site: 87 pages, each self-canonical
on `https://www.yuvrajraulji.com` with a trailing slash, 0 mismatches. The only
pages without one are `/404/` and `/_not-found/`, which robots.txt disallows.
