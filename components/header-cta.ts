/**
 * The header call to action, shared by both navigation bars.
 *
 * One class string rather than one component, because the two bars need
 * different elements: the homepage anchors to its own #contact section, which
 * is a real form further down that page, while every interior route has no such
 * section and opens the enquiry modal from a button. Sharing the element would
 * mean forcing one of those into the wrong behaviour; sharing the styling gets
 * the consistency without that.
 *
 * Filled accent, not outlined. Section 21 of BRAND-DESIGN-GUIDELINE.md asks for
 * one clear primary conversion per page, and the two bars disagreed: the
 * homepage had the filled treatment and every other route had a hairline
 * outline, so the same action looked primary on one page and secondary on the
 * next. The filled one wins.
 *
 * Set in the display face so it matches the wordmark next to it on both bars.
 *
 * The fixed height is what actually makes the two agree. The homepage bar is
 * padded and the interior bar is a fixed 68/78px, so a button sized by its own
 * padding lands at a different height in each; pinning the height means it does
 * not.
 */
export const HEADER_CTA_CLASS =
  'inline-flex h-[42px] shrink-0 items-center bg-accent px-5 font-display text-[.64rem] font-bold uppercase leading-none tracking-[.18em] text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-bright motion-reduce:hover:translate-y-0 lg:h-[46px] lg:px-[26px] lg:text-[.68rem]';
