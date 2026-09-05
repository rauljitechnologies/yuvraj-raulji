/**
 * Conversion tracking.
 *
 * ── Why this file exists ────────────────────────────────────────────────────
 *
 * Until Sep 2026 the site measured pageviews and nothing else. A search of the
 * codebase found three `gtag` calls, all of them inside the base configuration
 * snippet in the root layout, and no event handler anywhere. Every enquiry,
 * every call to action, every WhatsApp tap and every phone tap was invisible.
 *
 * That is how a dead lead endpoint survived: with a submission event in place,
 * a form that never once reported success would have been obvious the same
 * week. Measuring the outcome is what makes the failure visible, which is why
 * `form_error` below is tracked as deliberately as `generate_lead`.
 *
 * ── Why dataLayer and not gtag ──────────────────────────────────────────────
 *
 * The layout loads a GTM container as well as gtag.js. Pushing to `dataLayer`
 * reaches GA4 through the container without this module needing to know which
 * of the two paths is live, which matters because one of them is scheduled to
 * be removed once the container has been audited for a duplicate GA4 tag. A
 * push is also a no-op rather than a crash when neither has loaded, which is
 * the case in development and for any visitor blocking the tag.
 */

export type LeadEvent =
  /** A submission the endpoint confirmed. Marked as a conversion in GA4. */
  | 'generate_lead'
  /** A submission that could not be confirmed. Not a conversion; alert on it. */
  | 'form_error';

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Records one event.
 *
 * Safe to call before the tag has loaded, on the server, and with the tag
 * blocked: `dataLayer` is created if absent and the push is dropped by nobody.
 * Undefined parameters are stripped so an unset field never reaches GA4 as the
 * string "undefined".
 */
export function track(event: string, params: Params = {}): void {
  if (typeof window === 'undefined') return;
  const clean: Params = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') clean[k] = v;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...clean });
}
