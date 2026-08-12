# Yuvraj Raulji — Design System (MASTER)

**Global source of truth.** Page-specific overrides live in `./pages/<page>.md` and win over
this file. Everything here is implemented in `app/globals.css` (tokens), `tailwind.config.ts`
(token → utility mapping), `lib/motion.ts` (motion variants) and `components/ui/*` (primitives).

> Generated with the UI/UX Pro Max methodology (`--design-system --variance 6 --motion 6
> --density 3`). **The generator's palette recommendation was rejected**: it returned a
> light-mode monochrome + blue-accent system (`#FAFAFA` bg, `#2563EB` accent), which
> contradicts the brief's mandated near-black + crimson direction. Its *structural* guidance
> (spacious density, Expo-out easing, staggered reveals, no-pure-black rule) is adopted.

---

## 1. Identity

**Yuvraj Raulji** — E-commerce & Digital Transformation Consultant · Technology Strategist.
Personal brand, not an agency and not a developer portfolio. Language is first person
(consultant / strategist / architect / advisor), never "our team" or "our services".

The design language must read as: **engineering, precision, strategy, commerce,
transformation, authority.** Not flashy, gimmicky, gaming, generic-AI, or generic-agency.

---

## 2. Color tokens

Dark-first. There is no light mode — the palette is committed.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#060606` | Page ground |
| `--surface` | `#0d0d0d` | Section bands, cards |
| `--surface-elevated` | `#141414` | Raised cards, modals, popovers |
| `--border` | `rgba(255,255,255,.08)` | Hairline dividers, card edges |
| `--border-strong` | `rgba(255,255,255,.16)` | Interactive/secondary button edges |
| `--text` | `#f4f4f4` | Body and headings — 18:1 on `--bg` |
| `--text-secondary` | `rgba(244,244,244,.72)` | Supporting copy — ~9:1 |
| `--text-muted` | `rgba(244,244,244,.58)` | Labels, meta — ~6.2:1 |
| `--text-faint` | `rgba(244,244,244,.42)` | ~3.6:1 — **decorative / large text only** |
| `--accent` | `#c8102e` | Crimson. Fills, borders, large display text |
| `--accent-bright` | `#e8192c` | Hover, and **all small accent text** |
| `--accent-soft` | `rgba(200,16,46,.12)` | Tints, glows, grid lines |
| `--focus` | `#e8192c` | Focus ring (2px, 2px offset) |
| `--success` / `--warning` / `--error` | `#22c55e` / `#f5a524` / `#e8192c` | State only |

### Contrast rules — measured, not assumed

- `--accent` (`#c8102e`) on `--bg` is **3.44:1**. That fails WCAG AA for body text. It is
  legal only for large text (≥24px, or ≥18.66px bold), borders, icons and fills.
- `--accent-bright` (`#e8192c`) on `--bg` is **4.89:1** — the only accent safe for small text.
- White on `--accent` fill is **5.88:1** — primary buttons pass.
- `--text-faint` is below 4.5:1 by design. Never use it for anything a user must read.

Red is an accent, never the interface. Never rely on color alone to carry meaning.

---

## 3. Typography

| Role | Family | Notes |
|---|---|---|
| Display (H1, H2, stats) | Bebas Neue (`--font-bebas`) | Uppercase, tracking `.02–.06em`, leading `.92–1.0` |
| Body / UI / forms | Space Grotesk (`--font-grotesk`) | Base 16px minimum, line-height 1.6–1.76 |

Type scale (`clamp()`, fluid): `--fs-display` 2.8→5rem · `--fs-h2` 2→3.25rem · `--fs-h3`
1.25→1.6rem · `--fs-body-lg` 1.02rem · `--fs-body` 1rem · `--fs-sm` .875rem ·
`--fs-label` .7rem (uppercase, tracking `.16em`).

Never set display faces on paragraph copy. Never drop body text below 16px.

---

## 4. Space, radii, shadows, layout

- **Spacing** (density 3 / spacious): `--space-1` 4px through `--space-16` 96px, plus
  `--section-y: clamp(88px, 10vw, 160px)` for vertical section rhythm.
- **Radii**: `--r-sm` 4px · `--r-md` 8px · `--r-lg` 14px · `--r-full` 999px. Restrained —
  no pill-shaped everything, no oversized rounded cards.
- **Shadows**: `--shadow-card`, `--shadow-lifted`, `--shadow-accent` (crimson glow, used
  sparingly on primary CTA hover only).
- **Container**: `--container` 1400px, gutter `clamp(20px, 4vw, 48px)`.
- **Breakpoints**: 360 / 390 / 430 (mobile) · 768 / 834 (tablet) · 1024 / 1280 / 1440 (desktop).
  Mobile-first. Never allow horizontal scroll.

---

## 5. Motion system

Two libraries, strictly divided — never both on the same interaction:

- **Motion (Framer Motion, `motion/react`)** — entrances, staggers, reveals, nav, modals,
  hover/tap states, layout transitions. Everything React-state-driven.
- **Anime.js v4** — SVG path drawing, technical-diagram choreography, number counters,
  timeline sequences. Imperative, non-React-state animation only.

### Three levels (never make everything level 3)

| Level | Use | Duration |
|---|---|---|
| 1 — micro | Button/card hover, icon shift, border transition | 150–250ms |
| 2 — component | Card stagger, tabs, nav, modal, stats | 250–500ms |
| 3 — storytelling | Hero entrance, architecture sequence, scroll narrative | 500–1500ms |

Easing is one family: `--ease-out` `cubic-bezier(.16,1,.3,1)` (Expo-out) for entrances,
`--ease-inout` `cubic-bezier(.65,0,.35,1)` for state changes. Do not invent new curves.

Animate `transform` and `opacity` only. Never animate `width`/`height`/`top`/`left` in a
loop. Variants are centralized in `lib/motion.ts` — components import, never redefine.

**`prefers-reduced-motion: reduce` collapses every variant to an opacity-only fade and
disables decorative loops. Content and functionality are never hidden behind motion.**

---

## 6. Components

Primitives in `components/ui/`: `Container`, `Section`, `SectionHeading`, `Eyebrow`,
`Button`, `Card`, `Badge`, `Reveal`. Compose these — do not re-implement spacing, borders,
focus rings or motion per section.

Rules: 44×44px minimum touch targets · visible focus ring on every interactive element ·
icon-only buttons carry `aria-label` · hover is never the only signal · one SVG icon system
(no emoji, no mixed libraries) · every section provides WHAT / WHY / HOW / PROOF / CTA.

---

## 7. Accessibility (priority 1, non-negotiable)

Semantic HTML · one `<h1>` per page · no skipped heading levels · keyboard reachable in
DOM order · `:focus-visible` ring never removed · descriptive `alt` · labelled form fields
with inline errors · reduced-motion honored · no meaning by color alone.
