# Homepage

The homepage is twelve sections composed in `app/page.tsx`. Everything it
renders lives in this directory; everything it says lives in `lib/home.ts`.

## Where things are

| Concern | File |
| --- | --- |
| Copy, section order, case studies, POV, content taxonomy | `lib/home.ts` |
| Photography resolution at build time | `lib/founder-photos.ts` |
| Styles | `app/home.css` (all classes `yr-` prefixed) |
| Metadata and structured data | `app/page.tsx`, `lib/schema.ts` |

Adding a case study, a POV statement or a learning track means editing
`lib/home.ts` and nothing else. Adding a section means adding it to `SECTIONS`
in `lib/home.ts` and to the `<main>` in `app/page.tsx`; the running-head number
and label come from that array, so the twelve stay in step on their own.

## Spacing

Vertical rhythm is a named scale, not a per-component judgement call. The steps
are defined once in `app/globals.css` and exposed to Tailwind as spacing keys, so
you write `mt-item` / `gap-y-block` / `mt-grid` rather than `mt-4` / `mt-8`:

| Step | Job |
| --- | --- |
| `hair` | a label to the value it labels |
| `tight` | inside a single thought |
| `item` | between elements of one card |
| `block` | between blocks in a column |
| `head` | a heading group to the content it introduces |
| `grid` | a section intro to its grid or list |
| `tail` | a grid to the link that follows it |
| `card` | card interior padding |

Every step is a `clamp()`, so the whole page compresses on a phone and opens up
on a desktop by the same ratio the type does. Section padding comes from
`--pad-y`, or `--pad-y-tall` via `<Section tall>` for a section carrying a single
idea. A raw numeric step (`mt-1`) is for optical correction only, such as
nudging an icon onto a text baseline.

**Never put `margin` on a class in `app/home.css`.** That file loads after the
Tailwind utilities and `.yr-note` has the same specificity as `.mt-item`, so a
margin declared there silently beats every spacing utility written onto that
element. This is not hypothetical: `margin: 0` on `.yr-display`, `.yr-lede` and
`.yr-note` was killing eleven gaps at once and was the reason the page read as
though it had no rhythm. Preflight already zeroes those margins; the declarations
were redundant as well as harmful.

## Two conventions worth knowing

**The `yr-` class prefix is not decorative.** Tailwind owns `h-*` for height and
generates a utility for every key in `theme.spacing`. `spacing.section` exists in
`tailwind.config.ts`, so a class called `.h-section` is also a real height
utility and the two definitions fight, silently. `yr-` cannot collide with
anything Tailwind emits.

**Arbitrary font sizes that reference a custom property need the type hint.**
`text-[var(--hd-quote)]` compiles to nothing, because Tailwind cannot tell
whether a bare `var()` is a length or a colour and drops the utility rather than
guess. Write `text-[length:var(--hd-quote)]`. A `clamp()` containing a unit is
inferred correctly and needs no hint.

## Photography

The design is built around real photographs of Yuvraj. None are generated and no
stock person is ever substituted: `lib/founder-photos.ts` checks
`public/assets/founder/` at build time, and a section with no file for its slot
renders a typographic layout that is finished in its own right. See
`public/assets/founder/README.md` for the slot list and the shot direction.

## Typefaces

This page sets display type in **Space Grotesk** (`font-display`). The interior
pages still set theirs in **Bebas Neue** (`font-bebas`), which is a condensed
poster face and cannot carry the wide tracked uppercase lines this design is
built on.

Two display faces on one site is a transitional state, not the destination.
Either roll Space Grotesk out to `/about` and `/blog` and retire Bebas, or bring
this page back to Bebas. Leaving it as it is means the homepage and the rest of
the site do not look like the same brand.

## Motion

There is no WebGL, no scroll library and no canvas here. The only scroll-linked
value on the page is the hero parallax offset; everything else is an
`IntersectionObserver` firing once (`Rise`, `Lines`, `InView` in `motion.tsx`) or
plain CSS. Every animated element has a reduced-motion path, and the looping
decorations are switched off outright under `prefers-reduced-motion`.

Two things are deliberately absent, per standing direction: there is no custom
cursor, and no button or card moves under the pointer on hover. Hover states
change colour and draw rules; they do not chase the pointer.

## Reviewing it in a browser

Entry animations start at `opacity: 0`. In a backgrounded or automated tab
`requestAnimationFrame` is throttled and they stall part-way, which looks like a
rendering bug and is not one. To settle the page for a screenshot, inject:

```css
.home [style*="opacity"] { opacity: 1 !important }
.home .yr-linemask > span { transform: none !important; opacity: 1 !important }
```

`!important` beats motion's inline styles.
