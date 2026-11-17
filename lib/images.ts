/**
 * Responsive image helpers.
 *
 * ── The bug this exists to prevent ────────────────────────────────────────
 *
 * Case covers and article covers both ship three cuts: a 640, a 960 and the
 * full file. Almost nothing used them. Six render sites across the site wrote
 * a `sizes` attribute with no `srcSet` beside it, which is worse than it
 * looks: `sizes` is inert without `srcSet`, so the browser ignored the hint
 * entirely and every phone downloaded the full-size file. It is a silent bug,
 * because the page renders correctly and simply costs more than it should.
 *
 * Measured on the exported output: /work/ covers went from 1,131 KB to 193 KB
 * on a phone, and the eight article covers from 943 KB to 147 KB.
 *
 * ── The naming contract ───────────────────────────────────────────────────
 *
 * A source at `name.webp` must have `name-640.webp`, `name-960.webp` and
 * `name-1280.webp` beside it. That is the convention the generated cuts
 * already followed, and it is why this can be a pure string function rather
 * than a manifest.
 *
 * It is also checked. scripts/check-links.mjs resolves every `src` and every
 * `srcSet` candidate in the exported HTML against `out/`, so an image added
 * without its cuts fails the build rather than falling back silently in a
 * browser months later.
 */

/**
 * Builds a `srcSet` for an image that has 640, 960 and 1280 cuts beside it.
 *
 * `intrinsicWidth` is the real pixel width of the source, and it has to be
 * right: it is the width descriptor the browser picks against, so a wrong
 * value makes it choose the wrong cut. Case covers are 1920, article covers
 * are 1600.
 *
 * ── Why 1280 was added ────────────────────────────────────────────────────
 *
 * The set was 640, 960 and the full file, and the gap between the last two is
 * where every high-DPR phone fell through. `sizes` on these covers is 92vw, so
 * a 412px phone lays the image out at 370 CSS pixels; at DPR 2.625 that is 971
 * device pixels, the 960 cut misses by eleven, and the browser correctly jumps
 * to the full 1920px file. Eleven pixels of shortfall cost 341KB on
 * /work/marketplace/ and 257KB on the heaviest article.
 *
 * Measured under Slow 4G and 4x CPU on the exported site, that made the cover
 * the Largest Contentful Paint at 2960ms for /work/marketplace/ and 2704ms for
 * /insights/ai-ecommerce-revenue-2026/, the only two routes of 89 outside the
 * good band.
 *
 * 1280 rather than a tighter fit because it is the next sensible step and it
 * covers DPR 2 up to a 640px box as well. The cuts were generated from the
 * `.jpg` masters where those exist and from the full `.webp` where they do not.
 *
 * Re-encoding the four heaviest covers was tried first and rejected: at q72 the
 * worst of them still came out at 277KB against a 353KB master, so the source
 * photographs are simply noisy rather than badly encoded, and compressing
 * harder would have cost visible quality to save little. Serving a right-sized
 * cut costs nothing.
 */
export function responsiveSrcSet(src: string, intrinsicWidth: number): string {
  const base = src.replace(/\.webp$/, '');
  return (
    `${base}-640.webp 640w, ${base}-960.webp 960w, ` +
    `${base}-1280.webp 1280w, ${src} ${intrinsicWidth}w`
  );
}

/** Case study covers. 1920px sources. */
export const coverSrcSet = (src: string) => responsiveSrcSet(src, 1920);

/** Article covers. 1600px sources. */
export const articleSrcSet = (src: string) => responsiveSrcSet(src, 1600);
