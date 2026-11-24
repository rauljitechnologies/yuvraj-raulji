/**
 * Testimonials and the booking link. Both are placeholders, deliberately.
 */

export type Testimonial = {
  id: string;
  /** Empty while `placeholder` is true. */
  quote: string;
  name: string;
  role: string;
  /**
   * True until a real, attributable quote replaces it. The section renders a
   * visible TODO while any card is still a placeholder, so an unfinished
   * testimonial wall cannot quietly read as a finished one.
   */
  placeholder: boolean;
};

/**
 * Three slots, no invented content.
 *
 * A fabricated quote attributed to a named person at a named company is a
 * false statement about a real third party, and CONTENT-PRINCIPLES.md
 * section 1 rules it out. So these carry no quotes and no names: the card
 * renders the SHAPE of a testimonial with its slots visibly empty.
 *
 * To fill one: write the real quote, name and role, and set
 * `placeholder: false`.
 */
export const TESTIMONIALS: readonly Testimonial[] = [
  { id: 't1', quote: '', name: '', role: '', placeholder: true },
  { id: 't2', quote: '', name: '', role: '', placeholder: true },
  { id: 't3', quote: '', name: '', role: '', placeholder: true },
];

/**
 * The booking destination for "Book a 30-min call".
 *
 * ── Why this is not a Calendly URL yet ────────────────────────────────────
 *
 * The brief asks for a Calendly link and no Calendly account is named
 * anywhere in the repo, so there is no URL to put here. Inventing one gives
 * the page's primary call to action a 404, which is worse than not having the
 * integration: the one thing a closing CTA cannot do is fail.
 *
 * So it falls back to /contact/, which is a real page with a real form, and
 * the card renders a TODO until a URL is set. When the account exists, set
 * `href` to it and `external` and `todo` take care of themselves.
 *
 * Note for whoever wires it up: the event name stays
 * `consultation_cta_click`, NOT `consultation_booked`. See the GA4 note in
 * app/layout.tsx — a click means a reader wanted to book, and counting that
 * as a booking hides the number worth seeing.
 */
const CALENDLY_URL = '' as string;

export const BOOKING_URL = {
  href: CALENDLY_URL || '/contact/',
  external: Boolean(CALENDLY_URL),
  todo: !CALENDLY_URL,
};
