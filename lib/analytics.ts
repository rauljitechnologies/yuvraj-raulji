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
 * ── Why gtag and not dataLayer ──────────────────────────────────────────────
 *
 * This pushed a plain object to `dataLayer` and deferred the choice, on the
 * reasoning that the layout loads a GTM container as well as gtag.js so a push
 * would reach GA4 through whichever path was live. The comment said the
 * decision was waiting on an audit of the container for a duplicate GA4 tag.
 *
 * That audit has now been done, and the answer is the bad one. The container
 * at GTM-TNKVWXJ5 contains no GA4 tag: its published JavaScript does not
 * mention the measurement ID anywhere. Blocking gtag.js and leaving GTM in
 * place produces zero GA4 hits; blocking GTM and leaving gtag.js produces the
 * full set. gtag.js is doing all of the measurement and the container fires
 * nothing.
 *
 * Which means the two formats are not interchangeable and this file was using
 * the wrong one. `dataLayer.push({ event, ... })` is GTM's object format, and
 * gtag.js ignores it: gtag reads the array-like entries its own `gtag()`
 * shim pushes. Verified against the live tag, flushing on pagehide so nothing
 * was lost to batching:
 *
 *   dataLayer.push({ event: 'dl_test_event' })   ->  reached GA4: false
 *   gtag('event', 'gtag_test_event', {...})      ->  reached GA4: true
 *
 * So every `generate_lead` and every `form_error` this module has recorded has
 * gone nowhere. On a site whose entire objective is enquiries, the conversion
 * count was structurally zero, and the irony is specific: the note above
 * explains that measuring the outcome is what makes a dead lead endpoint
 * visible, and the measurement itself was dead the same way.
 *
 * It now calls `gtag()` when it is there, which is the live path. The
 * `dataLayer` push is kept as the fallback for when it is not, so a future
 * GTM-only setup still receives these events and development stays a no-op.
 *
 * One thing to know before changing the tags: if a GA4 tag is ever added to
 * the container, the standalone gtag.js in app/layout.tsx has to come out at
 * the same time, or page views double-count. That is true independently of
 * this file.
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
    /** The shim defined by the gtag.js snippet in app/layout.tsx. */
    gtag?: (command: 'event', name: string, params?: Params) => void;
  }
}

/**
 * Records one event.
 *
 * Safe to call before the tag has loaded, on the server, and with the tag
 * blocked. Undefined and empty parameters are stripped so an unset field never
 * reaches GA4 as the string "undefined".
 *
 * `gtag` is defined synchronously by the inline snippet in app/layout.tsx,
 * before gtag.js itself arrives, and it queues into `dataLayer` until the
 * library loads. So calling it early is safe and nothing is lost; what is not
 * safe is pushing GTM's object format and expecting gtag to read it.
 */
export function track(event: string, params: Params = {}): void {
  if (typeof window === 'undefined') return;
  const clean: Params = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') clean[k] = v;
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, clean);
    return;
  }

  /* No gtag on the page. Fall back to the container's format rather than
     dropping the event, so a setup that runs GTM alone still receives it. */
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...clean });
}
