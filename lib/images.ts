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
 * A source at `name.webp` must have `name-640.webp` and `name-960.webp`
 * beside it. That is the convention the generated cuts already followed, and
 * it is why this can be a pure string function rather than a manifest.
 *
 * It is also checked. scripts/check-links.mjs resolves every `src` and every
 * `srcSet` candidate in the exported HTML against `out/`, so an image added
 * without its cuts fails the build rather than falling back silently in a
 * browser months later.
 */

/**
 * Builds a `srcSet` for an image that has 640 and 960 cuts beside it.
 *
 * `intrinsicWidth` is the real pixel width of the source, and it has to be
 * right: it is the width descriptor the browser picks against, so a wrong
 * value makes it choose the wrong cut. Case covers are 1920, article covers
 * are 1600.
 */
export function responsiveSrcSet(src: string, intrinsicWidth: number): string {
  const base = src.replace(/\.webp$/, '');
  return `${base}-640.webp 640w, ${base}-960.webp 960w, ${src} ${intrinsicWidth}w`;
}

/** Case study covers. 1920px sources. */
export const coverSrcSet = (src: string) => responsiveSrcSet(src, 1920);

/** Article covers. 1600px sources. */
export const articleSrcSet = (src: string) => responsiveSrcSet(src, 1600);
