# Homepage

The homepage is nine sections composed in `app/page.tsx`. Everything it renders
lives in this directory; everything it says lives in `lib/home.ts`.

Positioning is **eCommerce Consultant & Digital Commerce Architect**. That exact
string is exported as `ROLE` from `lib/home.ts` and is the only job title used
anywhere: the hero eyebrow, the Person schema `jobTitle`, and the About page all
read it from there. Four different titles were previously in circulation across
two pages, which is the fastest way to stop a search engine resolving an entity.

## Where things are

| Concern | File |
| --- | --- |
| Copy, section order, disciplines, problems, case studies | `lib/home.ts` |
| Styles | `app/home.css` (all classes `yr-` prefixed) |
| Metadata and structured data | `app/page.tsx`, `lib/schema.ts` |

Adding a discipline, a problem or a case study means editing `lib/home.ts` and
nothing else. Adding a section means adding it to `SECTIONS` in `lib/home.ts`
and to the `<main>` in `app/page.tsx`; the running-head number and label come
from that array, so the nine stay in step on their own.

## Three sections are deliberately absent

The brief this page was built to asked for eleven sections. Three are not here,
and their absence is the design rather than an omission to be tidied up later:

| Missing | Why | Unblocks when |
| --- | --- | --- |
| Long-form founder statement | `POSITION` carries Yuvraj's own philosophy line, which is his, but it is a position and not a story | He writes 150 to 200 words in the first person |
| Featured case-study narrative | The manufacturer platform is the only engagement with a published outcome, and the reasoning behind it is recorded nowhere | He supplies the problem, the decision and the cost |
| Testimonials | The four on file attribute to "Growth-Focused Business" and "Enterprise Client" | One named, attributable quote with permission |

`CONTENT-PRINCIPLES.md` §1 treats writing around a gap like these as the one
unrecoverable error, and a buyer evaluating a platform decision reads an
invented outcome as a reason to stop reading.

The same rule governs the Selected Work cards: `outcome` is optional on
`WorkItem`, and five of the six render with no outcome row because the record
states no measured result for them. Fill the field in and the row appears.

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

## Three conventions worth knowing

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

**An arbitrary value may not contain a space.** `text-[rgba(245, 245, 242,.6)]`
is split on whitespace before Tailwind ever sees it, so no rule is emitted and
the element silently inherits its colour instead. 110 of these were live across
the site, including the whole muted-text hierarchy in the header, footer and
About page. Write `text-[rgba(245,245,242,.6)]`, or better, use the token
utilities: `text-ink-secondary`, `text-ink-muted`, `text-ink-faint`.

## Photography

The design is built around real photographs of Yuvraj. None are generated and no
stock person is ever substituted: a section with no real photograph for its slot
renders a typographic layout that is finished in its own right. See
type instead. The slot list and shot direction were in
`public/assets/founder/README.md`, which was removed along with the unserved
assets: it documented a build-time resolver (`lib/founder-photos.ts`) that
never existed in this repository, and it was itself publicly fetchable at
`/assets/founder/README.md`.

The hero currently falls back to `public/assets/yuvraj-raulji.jpg`, which is
400x400 and is being displayed at up to 420px. A larger frame-filling portrait
dropped in as `hero-portrait.*` is picked up automatically. The same 400px square
is why the Twitter card is `summary` rather than `summary_large_image`; a
1200x630 asset changes that one line in `app/page.tsx`.

## Typefaces

The site is set in **Manrope** (`--font-sans`), with **JetBrains Mono** for
labels, eyebrows and numerals. One sans face across every page.

That was not always true. The homepage was built in Manrope while the rest of
the site read Inter for body copy and Space Grotesk for the chrome, so the
header and footer were set in a different typeface from the page they sat on,
and a third face rendered wherever neither had an opinion. This paragraph used
to claim Bebas Neue and Inter, which by then described no template on the site.

Manrope is variable across 200-800, which is what this design leans on: 200 for
a display line and 700 for the emphasis half of a heading, out of one file.
Nothing has to pin a weight to avoid synthesis, which is the constraint the
single-cut face used to impose on every display rule.

That standing recommendation, to move display to a face with a real weight
range because a heading system that cannot vary weight has only size to work
with, is now met and closed.

## Motion

There is no WebGL, no scroll library and no canvas here. The only scroll-linked
value on the page is the hero parallax offset; everything else is an
`IntersectionObserver` firing once (`Rise`, `Lines`, `InView` in `motion.tsx`) or
plain CSS. Every animated element has a reduced-motion path, and the looping
decorations are switched off outright under `prefers-reduced-motion`.

The credibility figures are plain text, not counters. A number that animates up
from zero reads as a marketing device and is unreadable for its first second, on
the one section whose entire job is to be believed.

All four figures are the confirmed record: `lib/site.ts` carries a note dated
12 Aug 2026 confirming **9+ years** and **50+ projects**, and the Nxtby
employment entry evidences the 500K+ SKU and 1M+ monthly-user figures. 9+ counts
professional commerce work; the 2014 entry in the timeline is when the first
builds happened, which is why the stat is labelled "Years in commerce" rather
than "in technology". Do not restate this as twelve.

Two things are deliberately absent, per standing direction: there is no custom
cursor, and no button or card moves under the pointer on hover. Hover states
change colour and draw rules; they do not chase the pointer.

## Reviewing it in a browser

Entry animations start at `opacity: 0`. In a backgrounded or automated tab
`requestAnimationFrame` is throttled and they stall part-way, which looks like a
rendering bug and is not one. To settle the page for a screenshot, inject:

```css
.home [style*="opacity"] { opacity: 1 !important; transform: none !important }
.home .yr-linemask > span { transform: none !important; opacity: 1 !important }
```

`!important` beats motion's inline styles.

## Building

`.next` is root-owned in this checkout, and `next build` writes `.next/trace`
regardless of `distDir`, so `NEXT_DIST_DIR` alone does not get you a build. Copy
the tree somewhere writable, symlink `node_modules`, and build there.
