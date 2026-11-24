# COPY_CHANGES.md

Every text change proposed, before/after. **Nothing in this file has been
applied.** Waiting on your approval.

Branch `redesign-v2`, on top of `dff78b4`. The structural, design-system and
QA work is committed and does not depend on any of this; these are the copy
edits from the brief's "tighten copy" and "8+ years" items.

---

## The rules being applied

| Rule | Source |
|---|---|
| Every section intro: max 2 sentences | brief, "Tighten copy" |
| Every card description: max 20 words | brief, "Tighten copy" |
| "9+ years" becomes "8+ years" | brief, "career started 2018" |
| No new claims, no em-dashes | `CONTENT-PRINCIPLES.md` |

Word counts below are measured on the rendered homepage, not on the source
string, so a label that renders in two places is counted where it renders.

---

## 1. Section intros — audited, no change needed

All six homepage section intros are already within two sentences. Listed so
you can see they were checked rather than skipped.

| § | Intro | Sentences |
|---|---|---|
| 3 Selected work | "Three builds, and the decision inside each one. The interesting part was the choice made before the code." | 2 |
| 4 Services | "Seventeen services, each with its own page covering what gets built and what it is not. These six are asked for most." | 2 |
| 5 Problems I solve | "These are the symptoms businesses arrive with. Each one is a technology problem with a commercial cost." | 2 |
| 7 Process | "Five steps, in this order, on every engagement. The first two are the ones most projects skip." | 2 |
| 8 Insights | "Written for the people who have to choose a platform, approve a budget or defend a technical call." | 1 |
| 9 FAQ | "The six that come up every time. Eight more, including scope, timelines and what happens after launch, are on the FAQ page." | 2 |

**Proposed: no change.**

Also already within the cap and unchanged: the six **Problems I solve** notes
(11–18 words) and the five **Process** step bodies (14–19 words).

---

## 2. Card descriptions over 20 words

### 2a. A design decision I need you to agree to

The strings on these cards are **shared with other pages**:

- `project.challenge` is the homepage card text, the `<PageHero>` lede on
  each `/work/<slug>/` case study, and the `description` of the case study's
  schema node.
- `sp.lede` is the homepage card text and the `<PageHero>` lede on each of
  the 17 `/services/<slug>/` pages.

Cutting them to 20 words would shorten 20 interior page heroes to fit a
homepage grid cell. A hero lede wants two sentences; a card wants a glance.

**So I propose adding a short `card` field used only by the homepage grid,
and leaving the long version in place as the page hero.** Every proposed
short version below is the existing first clause, trimmed — no new claims,
and nothing is deleted.

If you would rather have one string in both places, say so and I will apply
the short version everywhere instead.

### 2b. Selected work (§3) — 3 cards

| Card | Before | w | After | w |
|---|---|---|---|---|
| fashion-d2c | "A fast-growing fashion brand whose storefront had to keep getting faster while the catalogue and traffic behind it kept moving." | 20 | *unchanged — exactly at the cap* | 20 |
| plant-store | "An online plant store selling a product that is fragile, seasonal and hard to photograph, to customers who abandon at any friction in the buy." | 25 | "An online plant store selling a fragile, seasonal product to customers who abandon at the first friction." | 17 |
| sports-nutrition | "Sports nutrition is a category where authenticity is the purchase decision and delivery speed is the repeat one. The storefront has to carry both." | 24 | "A category where authenticity decides the first purchase and delivery speed decides the repeat. The storefront carries both." | 18 |

### 2c. Services (§4) — 6 cards

In each case the proposal is the lede's **first sentence**. The second
sentence is what pushes it over, and it is the sentence that earns its place
on the service page rather than in a grid cell.

| Card | Before | w | After | w |
|---|---|---|---|---|
| Magento Development | "Custom module development, multi-store architecture, B2B workflows and the performance work that follows. Nine years on the platform, most of it on stores where the catalogue size is the architecture problem." | 31 | "Custom modules, multi-store architecture, B2B workflows and the performance work that follows." | 12 |
| Shopify Development | "Custom theme architecture, private apps, checkout extensibility and app consolidation. The work that starts when the store is working and the stack around it is not." | 26 | "Custom theme architecture, private apps, checkout extensibility and app consolidation." | 10 |
| Headless Commerce | "Decoupled storefronts on Next.js and React over GraphQL, built for the cases that justify them. The honest version of this service includes telling you when it does not." | 28 | "Decoupled storefronts on Next.js and React over GraphQL, built for the cases that justify them." | 15 |
| Generative AI | "Retrieval-augmented assistants, catalogue content at scale and workflow automation, grounded in your own data. Certified with IBM and AcceleratorX in November 2026, and deliberately scoped to where it earns its place." | 31 | "Retrieval-augmented assistants, catalogue content at scale and workflow automation, grounded in your own data." | 14 |
| eCommerce Development | "A complete eCommerce build, from choosing the platform to the handover. For a business launching its first store, or replacing one that has stopped keeping up." | 26 | "A complete eCommerce build, from choosing the platform to the handover." | 11 |
| Maintenance & Support | "Patching, upgrades, monitoring and the occasional thing that breaks at a bad time. For a store that works and needs to keep working, without a developer on payroll." | 28 | "Patching, upgrades, monitoring and the occasional thing that breaks at a bad time." | 13 |

**Note on the Magento card.** Its second sentence contains "Nine years on
the platform". Dropping the sentence from the card removes one of the year
claims in §3 below; the sentence survives on `/services/magento-development/`
and is corrected there to "Eight years".

### 2d. Not card descriptions, and not being cut

- **The six FAQ answers (§9).** 40–90 words each. They are answers, not card
  descriptions, and they are the `acceptedAnswer.text` of the FAQPage schema.
  Cutting them to 20 words would strip the schema of the thing that makes it
  eligible for a rich result. Out of scope unless you say otherwise.
- **The insights cards (§8).** Category, title and date only — no
  description to cut.
- **The About timeline (§6).** Role, employer, period. No descriptions.

---

## 3. "9+ years" to "8+ years"

`CAREER_START_YEAR` is already `2018` in `lib/career.ts`. The figure beside
it said `9+`, and the comment there records the disagreement explicitly:
*"the record starts in 2018 and the figure the brief states is 9+ years"*.
2026 − 2018 = 8, so the record and the figure agree after this change.

### 3a. Visible copy

| File | Before | After |
|---|---|---|
| `lib/career.ts` `CAREER_STATS[0].value` | `9+` | `8+` |
| `lib/identity.ts:192` | "…with **9+ years** across Magento 2 and Adobe Commerce…" | "…with **8+ years** across…" |
| `lib/schema-brand.ts:65` | "…Technology Consultant, **9+ years** across Magento 2…" | "…**8+ years** across…" |
| `lib/about.ts:40` | "**9+ years** building and scaling eCommerce platforms…" | "**8+ years** building and scaling…" |
| `lib/resume.ts:63` | "The full record: **9+ years** across Magento 2…" | "The full record: **8+ years** across…" |
| `lib/homepage.ts:222` | "**9+ years** of practical development experience" | "**8+ years** of practical development experience" |
| `lib/expertise.ts:148` | "…from **nine years** of Magento and Shopify builds." | "…from **eight years** of…" |
| `lib/expertise.ts:153` | "I have sat on both sides of that line for **nine years**…" | "…for **eight years**…" |
| `lib/services/magento.ts:22` | "Magento 2 consulting from **nine years** of multi-store delivery…" | "…from **eight years** of…" |
| `lib/service-pages.ts:1141` | "The commerce platform experience underneath it is the part with **nine years** behind it." | "…with **eight years** behind it." |
| `lib/service-pages.ts:2957` | "The **nine years** and the fifty-plus projects are in the commerce engineering…" | "The **eight years** and the fifty-plus projects…" |
| `lib/service-pages.ts` `magento-development.lede` | "**Nine years** on the platform, most of it on stores…" | "**Eight years** on the platform, most of it on stores…" |
| `lib/service-pages.ts` `ai-ecommerce-development.lede` | "**Nine years** of commerce engineering underneath…" | "**Eight years** of commerce engineering underneath…" |

The first row is the one on the homepage: the **Years Experience** tile in
the §2 stat strip reads `8+` after this.

### 3b. Code comments, same change

Not rendered, but they state the figure and would contradict the copy.

| File | Before |
|---|---|
| `lib/career.ts:156` | "…the year the 9+ years is counted from." |
| `lib/career.ts:160` | "…the figure the brief states is 9+ years…" |
| `lib/about.ts:35` | "…the start year and the nine years from…" |
| `lib/homepage.ts:203` | "The brief supplies nine labels: \"9+ years of practical development…\"" |
| `app/experience/page.tsx:47` | "Two views of the same nine years…" |

### 3c. One thing I need to flag

`lib/hire.ts:34` reads:

> "The verified record supports nine years from the first Magento role in **2016**"

That is inconsistent with `CAREER_START_YEAR = 2018` already in the repo —
it is a leftover from before the CV was reconciled, and it is the only place
still naming 2016. Proposed: "The verified record supports eight years from
the first Magento role in 2018."

Flagging rather than quietly fixing, because it is a claim about your history
and not a word count.

### 3d. Out of scope, listed for completeness

`components/homepage/README.md:146` cites a 12 Aug 2026 document "confirming
**9+ years** and **50+ projects**". That is a record of what an external
document says, so changing it would misquote the source. Left alone.

---

## 4. Summary

| | Count |
|---|---|
| Section intros changed | 0 (all already compliant) |
| Card descriptions shortened | 8 |
| New short `card` fields added | 8 |
| Interior page ledes left intact | 20 |
| Visible "9+ / nine years" corrected | 13 |
| Comments corrected | 5 |
| Factual inconsistency flagged | 1 (`lib/hire.ts`, 2016) |

---

## Please confirm

1. **The shared-string approach** — a short `card` field for the homepage,
   long `lede` kept on the interior pages. Or one string everywhere?
2. **The 8+ years change** — your brief said "Change this line if you want
   to keep 9+", so this is the decision point. 8+ is what the 2018 start
   supports.
3. **`lib/hire.ts`'s 2016** — correct it to 2018 as proposed?
4. **The FAQ answers** — leave them at full length (my recommendation, the
   schema depends on them), or cut them too?

Say "apply" and I will make these changes, rerun the build, the link check,
the four-width QA sweep and Lighthouse, then commit and push.
