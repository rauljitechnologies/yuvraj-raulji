'use client';

import dynamic from 'next/dynamic';
import { useUI } from './ui-context';

/**
 * The enquiry modal, loaded the first time it is opened and not before.
 *
 * ── Why this wrapper exists ──────────────────────────────────────────────
 *
 * `components/contact-modal.tsx` is a client component that pulls in the
 * project form and its validation. Built, that is a 448 KB chunk, and it was
 * fetched as an `async` script on EVERY page including the homepage, where
 * Lighthouse measured it 99.97% unused: the modal is closed until someone
 * asks for it, so effectively none of that code ran on a first visit. It was
 * the single largest item in the homepage's "reduce unused JavaScript" list,
 * ahead of Motion and react-dom.
 *
 * Gating the mount on `contactOpen` is what makes the split real. A bare
 * `dynamic()` import still resolves on mount, so the chunk would be fetched
 * on first paint anyway, just on a second connection; the condition is what
 * defers the request to the click.
 *
 * ── Why the dynamic import lives here and not at the mount site ──────────
 *
 * `components/chrome/page.tsx` is a server component, and per
 * node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md a server
 * component dynamically importing a client component does NOT get automatic
 * code splitting, and `ssr: false` is only honoured inside a client
 * component. So the boundary has to be a client component, which is this
 * file: four lines of state, instead of the form and its validator.
 *
 * `ssr: false` because a closed modal has nothing to prerender. It also keeps
 * the dialog markup out of all 94 exported HTML files, which is where it was
 * costing document bytes for no benefit.
 */
const ContactModalImpl = dynamic(
  () => import('./contact-modal').then((m) => ({ default: m.ContactModal })),
  { ssr: false },
);

export function ContactModalLazy() {
  const { contactOpen } = useUI();

  /*
   * Once opened it stays mounted. Unmounting on close would throw the chunk's
   * module instance away and re-run the form's setup on every reopen, and a
   * reader who closes the modal to check a detail and opens it again is the
   * common path, not the rare one.
   */
  if (!contactOpen) return null;
  return <ContactModalImpl />;
}
