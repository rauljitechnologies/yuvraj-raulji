import type { ReactNode } from 'react';

/**
 * The small shared parts of the homepage design canvas.
 *
 * All server components. Nothing here holds state or reads the DOM, so none of
 * it ships JavaScript: the homepage's only client boundary is the scroll-reveal
 * wrapper in components/ui/reveal.tsx.
 */

/**
 * The section eyebrow: the section name, set small and letterspaced.
 *
 * The canvas put a red ordinal in front of the name and this component used to
 * render it from a `no` prop. The ordinals are gone from the page, so the prop
 * is gone with them rather than left accepting a value nothing draws.
 */
export function SectionLabel({
  children,
  tone = 'dark',
  className = '',
}: {
  children: ReactNode;
  /** `light` is for the two white-ground sections, which invert the name colour. */
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <span
        className={`font-mono text-[11px] font-medium uppercase leading-none tracking-[0.3em] ${
          tone === 'light' ? 'text-ground/55' : 'text-ink/55'
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/**
 * The YR monogram. Two strokes: the Y in the foreground colour, the R in the
 * accent, which is how the canvas draws it in the header and the footer.
 *
 * `title` is omitted deliberately when the mark sits inside a link that already
 * carries its own accessible name, so a screen reader does not read the brand
 * twice.
 */
export function Monogram({
  size = 34,
  className = '',
  rStroke = 'var(--accent)',
  yStroke = 'currentColor',
  label,
}: {
  size?: number;
  className?: string;
  rStroke?: string;
  yStroke?: string;
  label?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={`block shrink-0 ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path
        d="M10 20 L32 52 M54 20 L32 52 M32 52 L32 84"
        stroke={yStroke}
        strokeWidth="8"
        strokeLinecap="square"
      />
      <path
        d="M66 20 H80 A13 13 0 0 1 80 46 H66 M78 46 L92 84"
        stroke={rStroke}
        strokeWidth="8"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** A bordered capability chip. Used in the systems cards and the case study. */
export function Tag({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <span
      className={`font-mono text-[11px] font-medium uppercase leading-none tracking-[0.12em] px-3.5 py-2.5 border ${
        tone === 'light' ? 'border-ground/20 text-ground/80' : 'border-ink/15 text-ink/60'
      }`}
    >
      {children}
    </span>
  );
}

/**
 * The underlined text link with a trailing arrow that closes most sections.
 * The border is the hover target, so it is on the element itself rather than a
 * pseudo-element, and it transitions colour only (no layout shift).
 *
 * `relative` is load-bearing and has nothing to do with the look. Tailwind's
 * `sr-only` is `position:absolute`, so an off-screen label inside one of these
 * links resolves its containing block to the nearest positioned ancestor. In
 * the work rail there was none, so the label escaped the rail's own
 * `overflow-x:auto`, landed at its static position roughly 1600px into the
 * document, and gave the whole page 1250px of horizontal scroll on a phone
 * that nothing was drawn in. Positioning the link contains it.
 */
export function RuleLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`relative inline-flex items-center gap-2.5 font-manrope text-[11px] font-bold uppercase leading-none tracking-[0.2em] border-b border-ink/30 pb-2.5 pt-2.5 transition-colors duration-200 hover:border-accent ${className}`}
    >
      {children}
    </a>
  );
}

/**
 * Primary (filled) and secondary (outlined) calls to action.
 *
 * `external` is for the buttons that leave the site, which on this page is the
 * WhatsApp one. It adds the tab target, the `rel` that goes with it, and an
 * off-screen note, because a button labelled "Book a 30-minute consultation"
 * that silently opens a messaging app is a promise the label did not make.
 */
export function Cta({
  href,
  children,
  variant = 'solid',
  tone = 'dark',
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'accent';
  /** Which ground the button sits on, which flips the outline colours. */
  tone?: 'dark' | 'light';
  /** Where the link goes, named for a reader who cannot see the target. */
  external?: string;
}) {
  /* `relative` for the same reason as RuleLink: it is the containing block for
     the `sr-only` note below, which is absolutely positioned. */
  const base =
    'relative inline-flex max-w-full items-center justify-center gap-3 text-center font-manrope text-xs font-bold uppercase leading-none tracking-[0.16em] px-6 py-[18px] sm:px-8 sm:py-5 transition-[background-color,color,border-color,transform] duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0';

  const skin =
    variant === 'accent'
      ? 'bg-accent text-white hover:bg-accent-bright'
      : variant === 'solid'
        ? tone === 'light'
          ? 'bg-ground text-white hover:bg-accent'
          : 'bg-white text-ground hover:bg-accent hover:text-white'
        : tone === 'light'
          ? 'border border-ground/25 text-ground hover:border-accent'
          : 'border border-ink/25 text-ink hover:border-accent';

  return (
    <a
      href={href}
      className={`${base} ${skin}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {external ? <span className="sr-only"> (opens {external} in a new tab)</span> : null}
    </a>
  );
}

/**
 * The "available" pill: a blinking dot and a line of mono text.
 * The dot is decorative, so the status is carried by the text, not the colour.
 */
export function StatusPill({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 border border-ink/15 px-4 py-3">
      <span
        aria-hidden="true"
        className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent animate-yr-blink"
      />
      <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.18em] text-ink/70 whitespace-nowrap">
        {children}
      </span>
    </div>
  );
}

/**
 * The infinite capability ticker under the hero.
 *
 * The list is rendered twice inside a `w-max` flex track and the keyframe
 * travels exactly -50%, so the second copy lands where the first started and
 * the loop has no visible seam. The whole thing is `aria-hidden`: it is the
 * same set of terms the Expertise section lists as real text, and a screen
 * reader should not have to sit through it twice.
 */
export function Marquee({ items }: { items: readonly string[] }) {
  const row = (
    <div className="flex gap-12 font-mono text-xs font-medium uppercase leading-none tracking-[0.22em] text-ink/55">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-12 whitespace-nowrap">
          {item}
          <span className="text-accent">·</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className="relative mt-14 overflow-hidden border-y border-ink/10 py-5 sm:mt-[88px]"
    >
      <div className="flex w-max gap-12 animate-yr-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
