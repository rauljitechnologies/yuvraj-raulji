/**
 * The contact details, on their own.
 *
 * ── Why this is not in lib/site.ts ─────────────────────────────────────────
 *
 * It was, and lib/site.ts is 880 lines of page copy and service data that
 * imports POSTS on top of that. Four client components need `CONTACT` and
 * nothing else from it: the mobile call to action, the contact modal, the
 * project form and the article aside. Importing one constant from that module
 * pulled the whole module into the browser bundle on every route.
 *
 * Measured on 19 Nov 2026, before this split: 1,108 KB of JavaScript on the
 * homepage and 1,686 KB on an article, 317 KB and 487 KB gzipped. The Search
 * Console audit found Core Web Vitals had no field data yet, so this is the
 * lab-side half of that: the bytes are known even when the timings are not.
 *
 * lib/site.ts re-exports this, so every server-side import of `CONTACT` from
 * there still resolves and nothing had to be rewritten across 90 pages.
 */
export const LEAD_ENDPOINT =
  'https://script.google.com/macros/s/AKfycby7S2OHkpqvM_HdKdivemmw6PGeYkKnH98eH7mw57iZ1gQyb_vENtxoUouQgu6aoK1WRg/exec';

export const CONTACT = {
  email: 'toyuvrajraulji@gmail.com',
  phoneDisplay: '+91 9898 334 731',
  phoneE164: '+919898334731',
  whatsapp: 'https://wa.me/919898334731?text=Hi%20Yuvraj%2C%20I%27d%20like%20to%20discuss%20a%20project.',
  linkedin: 'https://www.linkedin.com/in/yuvraj-raulji/',
  instagram: 'https://www.instagram.com/iamyuvrajraulji',
  facebook: 'https://www.facebook.com/iamyuvrajraulji',
  location: 'Vadodara, Gujarat, India',
} as const;
