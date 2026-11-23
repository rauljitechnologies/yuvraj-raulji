# Redesign v2 — Pre-change Audit

Branch: `redesign-v2`. No code changed at the time this file was written.
Stack: Next.js 16.3.2 (App Router, `output: 'export'`, `trailingSlash: true`,
`images: { unoptimized: true }`), React 19.2, Tailwind CSS 3.4.19, Motion 13.

---

## 1. Homepage sections, in render order

Entry point: `app/page.tsx`. All twenty sections are server components.
Nineteen of them live in one 2,000-line file, `components/homepage-sections/sections.tsx`.

| # | In page | Component | File | `<section id>` | Ground |
|---|---------|-----------|------|----------------|--------|
| — | — | `SiteNav` | `components/chrome/nav.tsx` | (`<header>`) | dark, translucent |
| 1 | `<Hero />` | `Hero` | `components/homepage-sections/hero.tsx:26` | `top` | dark |
| 2 | `<Problems />` | `Problems` | `components/homepage-sections/sections.tsx:201` | `problems` | dark |
| 3 | `<Credibility />` | `Credibility` | `components/homepage-sections/sections.tsx:125` | `credibility` | light `#f5f3ee` |
| 4 | `<About />` | `About` | `components/homepage-sections/sections.tsx:832` | `about` | light `#f5f3ee` |
| 5 | `<Services />` | `Services` | `components/homepage-sections/sections.tsx:1219` | `services` | dark `#050505` |
| 6 | `<SelectedWork />` | `SelectedWork` | `components/homepage-sections/sections.tsx:454` | `work` | dark (inherited) |
| 7 | `<RemoteWork />` | `RemoteWork` | `components/homepage-sections/sections.tsx:1470` | `remote` | light `#f5f3ee` |
| 8 | `<Capabilities />` | `Capabilities` | `components/homepage-sections/sections.tsx:275` | `expertise` | light `#f5f3ee` |
| 9 | `<Ecosystem />` | `Ecosystem` | `components/homepage-sections/sections.tsx:676` | `technology` | light `#f5f3ee` |
| 10 | `<AiCommerce />` | `AiCommerce` | `components/homepage-sections/sections.tsx:559` | `ai` | dark + red glow |
| 11 | `<Why />` | `Why` | `components/homepage-sections/sections.tsx:377` | `why` | **solid accent red** |
| 12 | `<WhyWorkWithMe />` | `WhyWorkWithMe` | `components/homepage-sections/sections.tsx:1150` | `why-me` | dark `#050505` |
| 13 | `<Approach />` | `Approach` | `components/homepage-sections/sections.tsx:753` | `approach` | dark |
| 14 | `<ProfessionalExperience />` | `ProfessionalExperience` | `components/homepage-sections/sections.tsx:1302` | `experience` | light `#f5f3ee` |
| 15 | `<Certification />` | `Certification` | `components/homepage-sections/sections.tsx:1389` | `certification` | dark `#050505` |
| 16 | `<TechnologyPartner />` | `TechnologyPartner` | `components/homepage-sections/sections.tsx:912` | `technology-partner` | dark |
| 17 | `<Insights />` | `Insights` | `components/homepage-sections/sections.tsx:988` | `insights` | dark |
| 18 | `<Faq />` | `Faq` | `components/homepage-sections/sections.tsx:1051` | `faq` | light `#f5f3ee` |
| 19 | `<Contact />` | `Contact` | `components/homepage-sections/sections.tsx:1590` | `contact` | dark `#050505` |
| — | — | `SiteFooter` | `components/chrome/footer.tsx` | (`<footer>`) | dark |
| — | — | `MobileCta` | `components/chrome/mobile-cta.tsx` | fixed bar, `md:hidden` | dark |

Plus one non-section element: the infinite tech **marquee**, rendered as the last
child *inside* the hero (`Marquee` in `components/homepage-sections/primitives.tsx:300`,
called from `hero.tsx` at the end).

### Payload per section

| Section | Items | Source |
|---|---|---|
| Credibility | 5 stats | `CAREER_STATS` → `STATS` (`lib/career.ts:197`, `lib/homepage.ts:198`) |
| Problems | 9 | `PROBLEMS` (`lib/homepage.ts:492`) |
| Services | 10 featured of 17 service pages | `FEATURED_SERVICE_PAGES` (`lib/service-pages.ts:3028`) |
| SelectedWork | 6 case studies | `PROJECTS` (`lib/homepage.ts:293`) |
| Capabilities | 4 | `CAPABILITIES` (`lib/homepage.ts:554`) |
| Ecosystem | 5 groups / 32 items | `ECOSYSTEM` (`lib/homepage.ts:670`) |
| AiCommerce | 3 tracks | `AI_TRACKS` (`lib/homepage.ts:370`) |
| WhyWorkWithMe | 9 reasons | `WHY_WORK_WITH_ME` (`lib/homepage.ts:226`) |
| Approach | 5 steps | `APPROACH` (`lib/homepage.ts:616`) |
| ProfessionalExperience | 4 rows (5 career roles, 2 merged) | `CAREER` (`lib/career.ts:81`) |
| Insights | 3 posts | `POSTS` (`lib/posts.ts`) |
| Faq | 14 questions | `FAQS` (`lib/homepage.ts:392`) |

**Count: 19 sections + hero marquee.** The brief wants 9.

---

## 2. Fonts, colours, spacing

### 2a. Fonts loaded

All via `next/font/google` in `app/layout.tsx:2`, self-hosted at build time.

| Face | Declared | Subsets / weights | CSS variable | Aliases |
|---|---|---|---|---|
| **Manrope** | `app/layout.tsx:58` | `latin`, variable 200–800 | `--font-sans` | `--font-display`, `--font-body`, `--font-manrope` all alias it (`app/globals.css:31-33`); Tailwind `font-display`, `font-body`, `font-manrope`, `font-bebas`, `font-grotesk` all resolve to it |
| **Newsreader** | `app/layout.tsx:97` | `latin`, variable 200–800, normal only | `--font-serif` | Tailwind `font-serif`; `.yr-display` in `app/home.css:227` |
| **JetBrains Mono** | `app/layout.tsx:103` | `latin`, weights `400`, `500` | `--font-mono` | Tailwind `font-mono` |

Three families, four woff2 groups. `font-display: swap` on all three.
There is no Plus Jakarta Sans and no Inter loaded today (Inter was removed in an
earlier consolidation; `app/layout.tsx`'s comment block still describes it).

`font-family` is re-declared literally in **26 places** across
`app/globals.css` (11×) and `app/home.css` (12×), plus 3 Tailwind config stacks —
each repeating the `var(--font-x), Manrope, system-ui, sans-serif` chain.

### 2b. Colours

**Tokens (`app/globals.css:36-116`, dark scope):**

| Token | Value | Role |
|---|---|---|
| `--bg` | `#050505` | page ground |
| `--surface` | `#0a0a0a` | bands, cards |
| `--surface-elevated` | `#101010` | modals, popovers |
| `--border` | `#202020` | hairline |
| `--border-strong` | `#2e2e2e` | interactive edges |
| `--text` | `#f5f3ee` | body / headings |
| `--text-secondary` | `rgba(245,243,238,.74)` | — |
| `--text-muted` | `#929292` | — |
| `--text-faint` | `rgba(245,243,238,.5)` | — |
| `--accent` | `#d71920` | primary red |
| `--accent-bright` | `#ee2a34` | small accent text |
| `--accent-deep` | `#8f1016` | pressed |
| `--accent-soft` | `rgba(215,25,32,.1)` | — |
| `--error` | `#ee2a34` | — |
| `--focus` | `#ee2a34` | focus ring |

**A second, inverted palette** re-declares nine of the same token names in
`.yr-paper` (`app/home.css:938-968`): `--bg: #ffffff`, `--surface: #f7f7f5`,
`--border: #e5e5e5`, `--border-strong: #d0d0d0`, `--text: #050505`,
`--text-muted: #565656`, `--accent-bright: #a30f15`, `--accent-deep: #7c0c11`.

**Every distinct hex in the source tree** (`app/`, `components/`, `lib/`, `design-system/`):

| Hex | Uses | Where / why |
|---|---|---|
| `#f5f3ee` | 13 | `--text` and **hardcoded 8× as the light band ground** `bg-[#f5f3ee]` in `sections.tsx` |
| `#050505` | 13 | `--bg`, `body { background }`, and hardcoded 4× as `bg-[#050505]` in `sections.tsx` |
| `#ee2a34` | 9 | `--accent-bright`, `--error`, `--focus` |
| `#d71920` | 7 | `--accent` |
| `#111` | 7 | image placeholder ground, `bg-[#111]`, 6 files |
| `#fff` / `#ffffff` | 9 | `::selection`, button text, `.yr-paper --bg` |
| `#000` | 3 | shadow stops |
| `#0d0d0d` | 4 | **off-palette** — `app/globals.css:755, 1175, 1193` + MASTER.md |
| `#a30f15` | 4 | `.yr-paper --accent-bright` |
| `#2e2e2e` | 2 | `--border-strong` |
| `#202020` | 2 | `--border` |
| `#929292` | 2 | `--text-muted` |
| `#8f1016` | 2 | `--accent-deep` |
| `#0a0a0a` | 3 | `--surface` |
| `#d0d0d0` | 2 | `.yr-paper --border-strong` |
| `#565656` | 2 | `.yr-paper --text-muted` |
| `#f7f7f5` | 1 | `.yr-paper --surface` |
| `#e5e5e5` | 1 | `.yr-paper --border` |
| `#7c0c11` | 1 | `.yr-paper --accent-deep` |
| `#ff8a96` | 1 | **off-palette** — `app/globals.css:1463` |
| `#101010` | 1 | `--surface-elevated` |
| `#c8102e` | 2 | docs only (`design-system/.../MASTER.md`) — the brief's primary, never shipped |
| `#e8192c`, `#f4f4f4`, `#141414`, `#060606`, `#fafafa`, `#2563eb`, `#22c55e`, `#f5a524`, `#434343`, `#e5e7eb` | 1–4 | docs/comments only (`MASTER.md` is stale vs. the shipped tokens) |

Plus **77 raw `rgba()` literals** in CSS and arbitrary Tailwind values
(`rgba(255,255,255,.045)`, `rgba(5,5,5,.82)`, `rgba(6,6,6,0.8)`,
`rgba(215,25,32,0.13)` …), none routed through a token.

**Problem:** `design-system/yuvraj-raulji/MASTER.md` disagrees with the shipped
tokens on 9 of 15 values. It is the nominal source of truth and is stale.

### 2c. Distinct vertical padding / margin values on sections

**Section padding tokens**

| Token | Value | Read by |
|---|---|---|
| `--pad-y` | `clamp(60px, 10.5vw, 176px)` | `py-pad`, `.yr-section` |
| `--pad-y-tall` | `clamp(84px, 15vw, 248px)` | `py-pad-tall`, `.yr-section--tall` |
| `--section-y` | `clamp(88px, 10vw, 160px)` | `spacing.section` (Tailwind) — unused by homepage |

**Actual vertical padding applied per homepage section wrapper**

| Section | Vertical padding |
|---|---|
| Hero | `pt-[128px] sm:pt-[140px]` + `.yr-hero` lg override (`app/home.css`) |
| Credibility | `py-14 sm:py-16 lg:py-20` ← **the one section not on the token** |
| Problems, Capabilities, Why, SelectedWork, AiCommerce, Ecosystem, Approach, Insights, Faq | `py-pad` (via `SECTION_Y`) |
| About, TechnologyPartner, WhyWorkWithMe, Services, ProfessionalExperience, Certification, RemoteWork, Contact | `py-pad` (literal) |

So two rhythms: 9 distinct px steps (56/64/80 from Credibility) versus the clamp.

**Semantic margin scale (`app/globals.css:148-165`)** — 8 clamps, exposed as Tailwind spacing keys:

| Key | Value | Uses in `sections.tsx` |
|---|---|---|
| `hair` | `clamp(6px, .5vw, 8px)` | — |
| `tight` | `clamp(12px, 1.2vw, 18px)` | — |
| `item` | `clamp(18px, 1.9vw, 28px)` | `mt-item` ×5 |
| `block` | `clamp(28px, 3.2vw, 46px)` | `mt-block` ×17, `mb-block` ×16 |
| `head` | `clamp(40px, 4.6vw, 68px)` | `mb-head` ×8, `mt-head` ×2 |
| `grid` | `clamp(52px, 6vw, 90px)` | `mt-grid` ×1, `mb-grid` ×1 |
| `tail` | `clamp(40px, 4.6vw, 64px)` | — |
| `card` | `clamp(26px, 2.6vw, 40px)` | — |

**Ad-hoc numeric vertical values also in use in `sections.tsx`** (every one a
one-off outside the semantic scale):

`py-1.5 py-2.5 py-3.5 py-4 py-5 py-6 py-8 py-9 py-11 py-14 py-16 py-20 py-[18px] py-[38px]`
`pt-1.5 pt-2 pt-3.5 pt-5 pt-10`
`pb-0.5 pb-7 pb-8 pb-10`
`mt-1.5 mt-2 mt-2.5 mt-3 mt-4 mt-5 mt-6 mt-28 mt-[7px] mt-[120px] mt-auto`
`mb-1.5 mb-2.5 mb-4 mb-5`

**= 38 distinct ad-hoc vertical values**, on top of the 8-step semantic scale and
the 3 section tokens. `mt-[120px]` and `mt-28` are the two largest offenders.

**Container width** is `max-w-[1440px]` with `px-5 sm:px-6 md:px-8 lg:px-12`
(`SHELL`, `sections.tsx:85`), but `--container` in globals.css says `1400px` and
`--shell` in home.css says `1400px`. Three container widths, two gutter scales
(`--gutter: clamp(20px,4vw,48px)` vs `--gut: clamp(20px,4.4vw,64px)`).

---

## 3. The header: why it is 110px tall, and why the nav overflows below 1200px

File: **`components/chrome/nav.tsx`** (exported as `SiteNav`; `components/site-header.tsx`
is a one-line re-export shim kept for older imports).

### Why 110px

The header is a `fixed` element made of **three stacked strips**, and from `md`
up two of them are visible:

```
components/chrome/nav.tsx:146   <header class="fixed inset-x-0 top-0 ... border-b border-ink/10">
components/chrome/nav.tsx:157     div.hidden.md:block   border-b  ──┐  availability strip
components/chrome/nav.tsx:158       div h-[30px]                    │  30px + 1px border = 31px
components/chrome/nav.tsx:174     div h-[68px] md:h-[78px]        ──┤  the bar: 78px from md
                                  <header> border-b               ──┘  1px
components/chrome/nav.tsx:231     nav.md:hidden (34px)               phone row, hidden from md
```

**31 + 78 + 1 = 110px** at `md` and above. That is the measured height.

Under `md` it is a different 110: the availability strip is hidden, the bar is
`h-[68px]`, and the condensed scrolling link row underneath is 34px of padded
11px text plus a 1px top border — 68 + 34 + 1 + 1 ≈ 104px.

Two side effects of the three-strip construction:

- `html { scroll-padding-top }` is declared **twice and inconsistently**:
  `app/globals.css:287` sets `112px` / `96px` at `md`, and `app/home.css:42`
  sets `calc(102px + var(--sp-block))` / `calc(78px + var(--sp-block))`.
  home.css loads second, so it wins: the real offset is ~130px mobile / ~106px
  desktop, neither of which equals 110px.
- the hero compensates with hardcoded `pt-[128px] sm:pt-[140px]`
  (`hero.tsx:36`) rather than reading the header height.

### Why the nav overflows below 1200px

`components/chrome/nav.tsx:179-185` renders the desktop nav at `md:flex`, i.e.
from **768px**, with **8 top-level items** from `NAV` (`lib/brand.ts:132`):

> About · Experience · Work · Services▾ · Expertise · Insights · Resources▾ · How we work

The row's intrinsic width at `md` (12px uppercase text, `tracking-[0.1em]`,
`md:gap-[18px]`, two 8px chevrons) is roughly:

| | px |
|---|---|
| 8 labels, 12px / 0.1em tracking | ~620 |
| 7 gaps × 18px | 126 |
| 2 chevrons + 1.5 gaps | 28 |
| **nav subtotal** | **~774** |
| Wordmark (`components/wordmark.tsx`) | ~150 |
| WhatsApp square (`sm:inline-flex`, 42px) | 42 |
| `CTA_LABEL` "Let's Connect" button | ~150 |
| 3 flex gaps (16–24px) | ~56 |
| gutters `md:px-8` | 64 |
| **total** | **~1236px** |

So the bar needs about **1236px** and every item is `shrink-0 whitespace-nowrap`
(`LINK_BASE`, `nav.tsx:68`). Below roughly 1200px the flex row cannot shrink,
`justify-between` has no slack left, and the children run past the container:
the CTA is clipped at the right edge or the nav collides with the wordmark.
At `lg` the gap grows to 24px and the type to 13px, which makes it worse, not
better; the `xl:gap-[30px]` step at 1280 is the first width where it genuinely fits.

There is **no hamburger at any width**. The fallback from `md` down is the
horizontal scroller at `nav.tsx:231`, which renders `NAV_FLAT` — all 8 top-level
items *plus* both dropdowns' 14 children = **22 links** in one scrolling row.

---

## 4. The work / case-study carousel and its visible horizontal scrollbar

File: **`components/homepage-sections/sections.tsx:454`**, `SelectedWork()`.
The rail is the `<ul>` at **line 476**:

```jsx
<ul className="flex list-none gap-4 overflow-x-auto px-5 pb-10 pt-2
               [scroll-snap-type:x_mandatory] sm:gap-6 sm:px-6 md:px-8 lg:px-12">
```

Each of the 6 `<li>` is `flex-[0_0_min(300px,82vw)]`, widening to
`sm:flex-[0_0_clamp(300px,34vw,480px)]`.

**Why the scrollbar is visible:** this is the only `overflow-x-auto` scroller on
the site that does not suppress its own scrollbar.

- `app/globals.css:1495` defines `.scrollbar-hide`
- `app/home.css:663` and `:677` define `.yr-rail` and `.yr-scroll-x`, both with
  `scrollbar-width: none` + `::-webkit-scrollbar { display: none }`
- `components/chrome/nav.tsx:231` inlines the same three declarations on the phone row

The `<ul>` uses **none of them**. With `overflow-x: auto` and content wider than
the box, the UA paints its own scrollbar. On macOS it appears on scroll and
fades; on Windows/Linux Chrome and on any OS with "always show scrollbars" it is
a permanent ~15px bar directly under the cards and **above** the `pb-10`, so it
sits inside the section rather than at the page edge. Below it, line 544 prints a
literal `Scroll →` hint, which is the acknowledgement that the pattern needs
explaining.

Secondary issues with the same element:

- `[scroll-snap-type:x_mandatory]` is set on the rail but there are no scroll
  buttons, no `aria-roledescription`, and no keyboard affordance — it is a
  touch/trackpad-only control holding 6 of the page's most important links.
- Cards are `aspect-[4/3]` images, not the 16:9 the brief asks for.
- The rail's `px-5 … lg:px-12` is applied to the scroll container itself, so the
  right-hand padding collapses at the end of the scroll (a known
  `overflow-x` + `padding-right` behaviour) and the last card ends flush.
- `RuleLink` carries a `relative` class whose entire purpose, per its own comment
  (`primitives.tsx:155-163`), is to stop an `sr-only` label inside this rail
  escaping `overflow-x` and giving the page 1250px of phantom horizontal scroll.
  That bug class is still latent anywhere else in the rail.

---

## 5. The floating PDF button

**There is no floating PDF button in this codebase.** Verified three ways:

1. **Source** — every `position: fixed` element in `app/` and `components/`:

   | File | Element |
   |---|---|
   | `components/chrome/nav.tsx:146` | the header |
   | `components/chrome/mobile-cta.tsx:114` | the mobile CTA bar, `md:hidden` |
   | `components/contact-modal.tsx:104` | the enquiry modal overlay |
   | `components/insights/article-aside.tsx:240` | reading-progress bar, article routes only |

   No `fixed bottom-*` floating action button of any kind.

2. **Built output** — `out/index.html` contains exactly one `class="fixed …"`
   (the header) and no `href` ending in `.pdf`.

3. **Git history** — the hero used to carry a *static* "Download Resume" button
   gated on `resumeAvailable()`. It was removed; the comment at
   `components/homepage-sections/hero.tsx:7-10` records the removal and why.

### What actually floats, and what actually links to the PDF

**Floating / fixed on the homepage:** one element, `MobileCta`
(`components/chrome/mobile-cta.tsx`). It is a full-width **bottom bar**, phones
only (`md:hidden`), holding two actions: a red "Discuss Your Project" link and a
76px WhatsApp square. It appears only after one viewport of scroll and hides
itself whenever a `<form>` or the `<footer>` is on screen, and it sets
`document.body.style.paddingBottom = '68px'` while shown.

That is close to the brief's "one WhatsApp button bottom-right" but is not it:
it is a two-action bar, not a button, it is absent above 768px, and the WhatsApp
action is the secondary half of it.

**The CV / PDF links** that do exist — all static, in-flow:

| Location | Link |
|---|---|
| `lib/brand.ts:156-164` → nav "Resources" dropdown | Resume → `/resume/` |
| `components/chrome/footer.tsx` | Resume → `/resume/` |
| `app/resume/page.tsx` | the actual PDF, gated on `resumeAvailable()` (`lib/resume-file.ts`) |

The GA4 click delegate in `app/layout.tsx` fires `resume_download` on any
`href` matching `/\.pdf(\?|$)/i`, so the tracking for a PDF link exists and
currently only fires from `/resume/`.

**Conclusion for the redesign:** the "remove the floating PDF button" step is a
no-op. The actionable items are (a) reduce `MobileCta` to a single
bottom-right WhatsApp button that does not overlap content on mobile, and
(b) keep the CV reachable from the nav and footer — which it already is.

---

## Cross-cutting findings that affect the rest of the brief

1. **`overflow-x` is suppressed, not solved.** `app/layout.tsx:131` puts
   `overflow-x-hidden` on `<body>` and `app/page.tsx:117` puts
   `[overflow-x:clip]` on the homepage wrapper. Both hide horizontal overflow
   rather than preventing it, so `document.scrollWidth` can exceed
   `clientWidth` without a visible scrollbar. Any overflow check has to measure
   `scrollWidth` with those two classes temporarily off, or measure the
   children.

2. **Two competing CSS systems.** `app/globals.css` (1,515 lines, ported from
   three static HTML mockups) and `app/home.css` (1,310 lines, the `yr-*`
   editorial system). Both declare `scroll-padding-top`, both declare container
   widths, both declare `font-family` chains, and `.yr-paper` re-declares the
   whole palette. 2,825 lines of CSS for 89 routes.

3. **`design-system/yuvraj-raulji/MASTER.md` is stale** and names `#c8102e` —
   the brief's primary — as `--accent`, which no shipped code uses.

4. **Three fixed-height assumptions on the header** (112/96 in globals.css,
   102+/78+ in home.css, 128/140 in the hero) will all need to become one
   `--header-h` token.

5. **JSON-LD.** `brandHomeSchema()` (`lib/schema-brand.ts:115`) emits
   `faqNode('/', FAQS)` from the same 14-item `FAQS` array the section renders.
   Trimming the section to 6 questions must trim the schema array *or* keep the
   schema reading the full array while the section slices it — the first is
   correct (schema must describe the page), so the other 8 move to `/faq/` with
   their own `FAQPage` node.

6. **GA4** is a raw delegated click listener in `app/layout.tsx` keyed on
   `href` patterns and a `data-event` attribute, not on classes. Restructuring
   markup is safe as long as `href`s and `data-event` values survive.

7. **`9+ years` appears in 9 source locations** (`lib/identity.ts:142,192`,
   `lib/brand.ts:227`, `lib/career.ts:199`, `lib/site.ts:152,161`,
   `lib/homepage.ts:229`, `lib/about.ts:40`, `lib/resume.ts:63`,
   `lib/schema-brand.ts:65`) while `CAREER_START_YEAR = 2018`
   (`lib/career.ts:164`) makes the true figure 8. The record and the claim
   disagree today.

8. **Routes that do not yet exist** and are named as move targets:
   `/ai/`, `/how-we-work/`, `/faq/`. Existing near-neighbours are
   `/ai-automation/`, `/ai-commerce/`, `/ai-search/` and `/remote-collaboration/`.
   `/services/`, `/about/` and `/expertise/` all exist.
