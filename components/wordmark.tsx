/**
 * The wordmark, for every header on the site.
 *
 * Set in type, not drawn. Yuvraj asked for the mark to be the name and nothing
 * else on 26 Aug 2026: the SVG monogram is gone, and so is the
 * "AI | BUSINESS | ECOMMERCE" line that used to sit under the name in the
 * homepage header. The positioning still appears in the footer, in the hero
 * eyebrow and in the metadata, which is where a reader meets it in context
 * rather than as a subtitle on a logo.
 *
 * Why YR is two colours. The retired monogram drew the Y in the foreground and
 * the R in the accent, and that is the one piece of it worth keeping, so the
 * same split is done with a coloured span. It costs no markup, it scales with
 * the type instead of with a viewBox, and it stays inside the black, white and
 * red that section 32 of BRAND-DESIGN-GUIDELINE.md allows.
 *
 * A server component with no state. Both headers render it, so the two agree by
 * construction rather than by two people remembering to keep them in step,
 * which is how they drifted apart in the first place.
 */
export function Wordmark({
  /** `sm` is the interior-page bar, which is shorter than the homepage one. */
  size = 'md',
}: {
  size?: 'sm' | 'md';
}) {
  /*
   * Both sizes step down under `sm`. Measured on the homepage bar, the lockup
   * plus the CTA needed a 368px viewport, which clears an iPhone 14 at 390 and
   * overflows a 360px Android. Most of that width is letter-spacing, so the
   * small step mainly gives the tracking back rather than shrinking the type
   * much; it brings the requirement under 340px.
   */
  const initials =
    size === 'sm' ? 'text-[13px] sm:text-[15px]' : 'text-[15px] sm:text-[17px]';
  const name =
    size === 'sm'
      ? 'text-[.68rem] tracking-[.12em] sm:text-[.78rem] sm:tracking-[.2em]'
      : 'text-[11px] tracking-[.12em] sm:text-[13px] sm:tracking-[.2em]';

  return (
    <span className="inline-flex items-center gap-2 sm:gap-2.5">
      {/*
        aria-hidden because the link that wraps this carries the full name as
        its accessible name. Without it a screen reader announces "Y R Yuvraj
        Raulji", and the initials are read as two letters rather than as a mark.
      */}
      <span
        aria-hidden="true"
        className={`font-display font-bold leading-none tracking-[-0.01em] ${initials}`}
      >
        <span className="text-ink">Y</span>
        <span className="text-accent-bright">R</span>
      </span>

      <span aria-hidden="true" className="h-[13px] w-px shrink-0 bg-ink/30" />

      <span className={`font-display font-medium uppercase leading-none text-ink ${name}`}>
        Yuvraj Raulji
      </span>
    </span>
  );
}
