import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * ══════════════════════════════════════════════════════════════════════════
 * THE DESIGN SYSTEM COMPONENTS
 * ══════════════════════════════════════════════════════════════════════════
 *
 * Four required parts — `Section`, `Container`, `Eyebrow`, `SectionHeading` —
 * plus `Card`, `Prose` and `Button`, which are the three things every section
 * on the homepage needed and was otherwise inventing per section.
 *
 * All server components. No state, no effects, no DOM reads, so none of this
 * reaches the client bundle; the animated wrappers are in
 * components/homepage-sections/rv.tsx and create their client boundary there.
 *
 * ── The contract ──────────────────────────────────────────────────────────
 *
 * A section built out of these NEVER writes:
 *
 *   its own vertical padding        `Section` owns it, from one token
 *   its own horizontal gutters      `Container` owns them, from one token
 *   its own max width               `Container` owns it, 1200px
 *   a font family                   the three roles, from the token set
 *   a font size                     the six scale steps
 *   a colour                        the role tokens, which invert by band
 *   a card radius, border, padding  `Card` owns all three
 *
 * It writes layout: a grid, a column count, a gap from the eight-step scale,
 * and the content. That is the whole surface area.
 *
 * Before this the nineteen homepage sections each carried their own container
 * string (`mx-auto max-w-[1440px] px-5 sm:px-6 md:px-8 lg:px-12`, repeated
 * verbatim or near-verbatim twenty-three times), four different section
 * paddings, two heading class constants, and 38 distinct ad-hoc vertical
 * spacing values between them.
 */

/* ══════════════════════════════════════════════════════════════════════════
   SECTION
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * One section band: the ground it sits on and the air above and below it.
 *
 * ── THE BACKGROUND ALTERNATION RULE ───────────────────────────────────────
 *
 * The homepage is nine sections and the grounds go:
 *
 *   1  Hero                 DARK
 *   2  Proof strip          DARK
 *   3  Selected work        LIGHT
 *   4  Services             DARK
 *   5  Problems I solve     LIGHT
 *   6  About + experience   DARK
 *   7  Process              LIGHT
 *   8  Insights             DARK
 *   9  FAQ + contact        LIGHT
 *
 * The rule, stated once so it is checkable rather than remembered:
 *
 *   Sections 1 and 2 are both dark, because they are one opening unit: the
 *   hero makes the claim and the proof strip evidences it, and a band
 *   boundary between them would split a single argument in half.
 *
 *   From section 3 the ground strictly alternates, starting LIGHT. So for
 *   n >= 3, the ground is LIGHT when n is odd and DARK when n is even.
 *
 * Why alternate at all: the previous page ran dark, dark, light, light,
 * dark, light, light, light, dark, red, dark, dark, light, dark, dark,
 * dark, light, dark — which is not a rhythm, it is the residue of nineteen
 * sections each deciding locally. Two adjacent light bands read as one
 * section twice as long, and the red band in the middle read as a different
 * website. The rhythm is what tells a reader how far down the page they are.
 *
 * `tone="light"` sets `.theme-light`, which re-declares the ground, the ink,
 * the hairline and the small-text red on this subtree only. A child writes
 * `bg-ground`, `text-ink` and `border-line` and gets the right side of the
 * inversion without knowing which band it is in. That is why there is no
 * `tone` prop anywhere below this component.
 *
 * ── The padding ───────────────────────────────────────────────────────────
 *
 * `py-section` and nothing else: 64px on a phone, 96px from md, declared
 * once as `--section-py` in app/globals.css. There is no `tall` variant and
 * no `compact` variant. A section that needs more air gets it from the
 * spacing inside it, which is content, not chrome.
 */
export function Section({
  id,
  children,
  labelledBy,
  tone = 'dark',
  className = '',
}: {
  /** The in-page anchor. Every section on the homepage has one. */
  id?: string;
  children: ReactNode;
  /** The id of the section's own heading, for `aria-labelledby`. */
  labelledBy?: string;
  /** Which ground. See the alternation rule above; never chosen locally. */
  tone?: 'dark' | 'light';
  /** Layout only. Never padding, never a colour. */
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative py-section ${
        tone === 'light' ? 'theme-light bg-ground text-ink' : 'bg-ground text-ink'
      } ${className}`}
    >
      {children}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CONTAINER
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * The one container: `max-w-[1200px]`, `px-6` on a phone, `px-8` from md.
 *
 * Both numbers are tokens (`--container`, `--container-px`), so the width and
 * the gutter are a single edit. There were three widths on the site before
 * this (1400px declared twice in CSS, 1440px written into the markup
 * twenty-three times) and two gutter scales.
 *
 * `w-full` matters: without it a flex or grid parent sizes this to its
 * content and the `mx-auto` does nothing.
 */
export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-shell px-gutter ${className}`}>{children}</div>;
}

/* ══════════════════════════════════════════════════════════════════════════
   EYEBROW
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * The section kicker: a red hairline dash and a line of mono small-caps.
 *
 * This is the ONLY place the mono face is allowed to set type, and the only
 * place on the site that goes below the 14px floor: 12px, uppercase, tracked
 * 0.15em, exactly as specified. The tracking and the size both come from the
 * `text-eyebrow` scale step rather than being written here, so there is one
 * eyebrow on the site and not one per section.
 *
 * A `<p>`, not a heading. It reads like a kicker but it is not a level in the
 * document outline, and promoting it would put a heading above the h1 in the
 * hero and break the heading order the brief asks to fix.
 *
 * The dash is `aria-hidden`: it is a graphic, and a screen reader announcing
 * it would read the section name with a stray mark in front of it.
 *
 * `decorative` hides the whole thing from assistive technology, for the one
 * case where the section's `<h2>` says the same words — then the eyebrow is
 * the visual treatment of a name the heading already carries, and announcing
 * both reads the section name twice.
 */
export function Eyebrow({
  children,
  className = '',
  decorative = false,
}: {
  children: ReactNode;
  className?: string;
  decorative?: boolean;
}) {
  return (
    <p
      aria-hidden={decorative ? 'true' : undefined}
      className={`m-0 flex items-center gap-3 font-mono text-eyebrow font-medium uppercase text-ink-muted ${className}`}
    >
      <span aria-hidden="true" className="h-px w-6 shrink-0 bg-accent" />
      {children}
    </p>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SECTION HEADING
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * Eyebrow, heading and intro, as one block with one rhythm.
 *
 * Every section on the homepage opened with these three elements and each one
 * spaced them differently: `mb-block` then `mb-head` in eleven sections,
 * `mb-4` then `mt-item` in three, and `mb-grid` in two. The gaps are fixed
 * here — 16px eyebrow to heading, 24px heading to intro, and the gap to the
 * content below belongs to the caller, because only the caller knows whether
 * what follows is a grid or a paragraph.
 *
 * ── The heading ───────────────────────────────────────────────────────────
 *
 * `h2` by default and `h3` where a section nests one. Never `h1`: there is
 * exactly one h1 on the page and it is the hero's, which is the heading-order
 * requirement in the brief. `as` is a closed union rather than `ElementType`
 * on purpose — a bare `ElementType` cannot be resolved to a single call
 * signature against the augmented global JSX namespace in this repo.
 *
 * `text-h2` carries its own line height (1.1) and tracking, so a call site
 * cannot set a heading at the body line height by forgetting one.
 *
 * `emphasis` is the one piece of expression kept from the old system: the
 * second half of a heading set in the heavier weight, which is how this site
 * has always drawn a heading. It takes a node, so a section can put a word in
 * the accent if it has a reason to.
 *
 * ── The intro ─────────────────────────────────────────────────────────────
 *
 * `max-w-measure-md` is 55ch, not the 65ch the brief caps prose at. 65ch is
 * the ceiling for a body column a reader reads top to bottom; a section intro
 * is scanned, and two sentences set at 65ch under a 44px heading reads as a
 * paragraph the reader is being asked to study. The 65ch cap is on `Prose`
 * below, which is where a real body column goes.
 */
export function SectionHeading({
  id,
  eyebrow,
  children,
  emphasis,
  intro,
  as: Tag = 'h2',
  className = '',
}: {
  id?: string;
  eyebrow?: ReactNode;
  /** The first half of the heading, in the light weight. */
  children: ReactNode;
  /** The second half, in the heavy weight. Optional. */
  emphasis?: ReactNode;
  /** The section intro. Two sentences, maximum. */
  intro?: ReactNode;
  as?: 'h2' | 'h3';
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <Tag id={id} className="m-0 max-w-measure-sm font-heading text-h2 font-medium text-ink">
        {children}
        {emphasis ? (
          <>
            {' '}
            <span className="font-extrabold">{emphasis}</span>
          </>
        ) : null}
      </Tag>
      {intro ? (
        <p className="m-0 mt-6 max-w-measure-md font-body text-body text-ink-secondary">{intro}</p>
      ) : null}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PROSE
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * A body column, capped at the brief's 65ch measure.
 *
 * `max-w-measure` is `65ch`, and it is `ch` rather than a pixel width because
 * `ch` is face-relative: the cap stays 65 characters when the body face
 * changes, which is the whole point of specifying a measure in characters.
 */
export function Prose({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`m-0 max-w-measure font-body text-body text-ink-secondary ${className}`}>
      {children}
    </p>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CARD
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * One card. Same radius, same border, same padding, every time.
 *
 *   radius    8px, from `--radius`. Every `rounded-*` name in the config
 *             resolves to it, so the three names left in the templates
 *             cannot produce three different cards.
 *   border    one hairline, `--border`, which inverts with the band.
 *   padding   `p-6 md:p-8` — 24px then 32px, exactly as specified.
 *
 * ── Equal heights in a row ────────────────────────────────────────────────
 *
 * `h-full` plus `flex flex-col`. In a CSS grid every cell already stretches
 * to the tallest in its row, but only the GRID ITEM does: a card that is the
 * grid item's child collapses to its content and leaves a gap under the short
 * ones. `h-full` makes the card fill the cell it was given, and the column
 * flex is what lets a card push its link to the bottom with `mt-auto` so the
 * links across a row line up instead of floating at three different heights.
 *
 * ── The hover state ───────────────────────────────────────────────────────
 *
 * `interactive` is opt-in and means the whole card does something. It moves
 * the border to the primary red and lifts the card 2px. Both are cheap
 * properties (border-color and transform), and the lift is dropped under
 * `prefers-reduced-motion`.
 *
 * It is opt-in because a hover state on a card that is not a link is a
 * promise the card cannot keep: six of the old homepage's card grids had a
 * hover treatment and three of them were not clickable.
 */
export function Card({
  children,
  className = '',
  interactive = false,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  as?: 'div' | 'li' | 'article';
}) {
  return (
    <Tag
      className={`relative flex h-full flex-col rounded border border-line bg-surface p-6 transition-[border-color,transform] duration-200 ease-out md:p-8 ${
        interactive
          ? 'hover:border-accent focus-within:border-accent hover:-translate-y-[2px] motion-reduce:hover:translate-y-0'
          : ''
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   BUTTON
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * The two calls to action: a filled primary and a text link.
 *
 * `primary` is the red fill. White on `#C8102E` measures 5.88:1, so it passes
 * AA, which is why the primary button is a fill and not an outline — the
 * outlined variants on the old page measured 1.98:1 on their border, which is
 * present in the DOM and effectively not drawn.
 *
 * `text` is the secondary action: an underlined label with a trailing arrow,
 * no box. The brief asks for one primary button and one text link per
 * section, so there is no third variant to reach for.
 *
 * ── Size ─────────────────────────────────────────────────────────────────
 *
 * 48px minimum height and `text-small` (14px), which is the type floor. The
 * old buttons were 12px uppercase at 0.16em tracking, below the floor.
 *
 * ── Routing ──────────────────────────────────────────────────────────────
 *
 * `<Link>` for a path, `<a>` for a fragment, a `mailto:`, a `tel:` or
 * anything with a scheme — `<Link>` has nothing to prefetch for any of those.
 * `external` supplies the wording for the off-screen note, because a button
 * that opens a new tab should say so in its accessible name.
 */
export function Button({
  href,
  children,
  variant = 'primary',
  external,
  className = '',
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'text';
  /** Names the destination for a reader who cannot see it opens a new tab. */
  external?: string;
  className?: string;
  'data-event'?: string;
  'aria-label'?: string;
}) {
  const base =
    'relative inline-flex min-h-[48px] items-center justify-center gap-2 font-body text-small font-semibold transition-[background-color,color,border-color] duration-200';
  const skin =
    variant === 'primary'
      ? 'rounded bg-accent px-6 text-white hover:bg-accent-deep'
      : 'border-b border-ink/40 pb-1 text-ink hover:border-accent hover:text-accent-bright';
  const cls = `${base} ${skin} ${className}`;

  const inner = (
    <>
      {children}
      {external ? <span className="sr-only"> (opens {external} in a new tab)</span> : null}
    </>
  );

  if (href.startsWith('/') && !external) {
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {inner}
    </a>
  );
}
