'use client';

import { useEffect, useState } from 'react';
import { CONTACT } from '../../lib/site';

/**
 * The sticky contact bar, phones only.
 *
 * ── Why this is allowed to exist when the floating button was not ─────────
 *
 * A floating WhatsApp button was considered and rejected, because it covers
 * content for the full length of every page and the page is the argument. The
 * brief asks for a sticky mobile CTA anyway, and the objection was never to
 * persistence as such, it was to covering a page a reader is still reading.
 *
 * So this is persistent and still never does that:
 *
 *   It does not appear until the reader has scrolled a full viewport, so the
 *   opening screen, which is where the hero's own calls to action are, is
 *   never covered by a second copy of them.
 *
 *   It hides again whenever a contact form or the footer is on screen, via
 *   an IntersectionObserver. Offering "Discuss your project" over the top of
 *   the form that does exactly that is a bar competing with the conversion it
 *   exists to cause.
 *
 *   The body carries bottom padding while it is shown, so the last lines of a
 *   page can always be scrolled clear of it. A bar that permanently hides the
 *   final paragraph is the thing the original objection described.
 *
 * ── Why phones only ──────────────────────────────────────────────────────
 *
 * Above 768px the header is in view the whole way down and already carries
 * the call to action, so a second one is redundant rather than helpful.
 */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const phone = window.matchMedia('(max-width: 767px)');
    if (!phone.matches) return;

    /*
      An IntersectionObserver was the obvious tool here and it was the wrong
      one. The enquiry modal renders on every interior route, and while closed
      its form is `visibility: hidden` but still laid out, 1144px tall, at the
      top of the viewport. IntersectionObserver only skips `display: none`, so
      it reported that form as on screen on every page, permanently, and the
      bar never appeared once.

      Measuring in a scroll handler reads the live state instead, visibility
      included, and the cost is a getBoundingClientRect on two or three
      elements inside a frame that already had one.
    */
    /*
      `checkVisibility()` with no arguments does NOT count `visibility:
      hidden`: by default it only reports `display: none` and
      content-visibility. Called bare it returned true for the closed modal's
      form, which is the exact element this has to discount, so the options
      are not optional here.
    */
    const visible = (el: Element) => {
      const c = el as { checkVisibility?: (o: Record<string, boolean>) => boolean };
      if (typeof c.checkVisibility === 'function') {
        return c.checkVisibility({
          visibilityProperty: true,
          opacityProperty: true,
          contentVisibilityAuto: true,
        });
      }
      const cs = getComputedStyle(el);
      return cs.visibility !== 'hidden' && cs.display !== 'none' && cs.opacity !== '0';
    };

    const blocked = () =>
      Array.from(document.querySelectorAll('form, footer')).some((el) => {
        if (!visible(el)) return false;
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
      });

    let frame = 0;
    const measure = () => {
      frame = 0;
      setShow(window.scrollY > window.innerHeight && !blocked());
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Padding on the element that scrolls, not on the bar, so the page's own
     last line clears it. Removed with the bar. */
  useEffect(() => {
    document.body.style.paddingBottom = show ? '68px' : '';
    return () => {
      document.body.style.paddingBottom = '';
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex items-stretch gap-px border-t border-line bg-ground/95 backdrop-blur md:hidden"
      /* Not a <nav> or a landmark: it is two links that exist elsewhere on
         every page, so announcing it as a region would add a landmark a
         screen-reader user has to step past on each one. */
    >
      <a
        href="/contact/"
        data-event="contact_cta_click"
        className="flex h-[60px] flex-1 items-center justify-center bg-accent px-4 font-display text-[.68rem] font-bold uppercase leading-none tracking-[.16em] text-white"
      >
        Discuss Your Project
      </a>
      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener"
        data-event="whatsapp_click"
        aria-label="Message me on WhatsApp (opens in a new tab)"
        className="flex h-[60px] w-[76px] shrink-0 items-center justify-center bg-ink/10 text-ink"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7a9.82 9.82 0 0 0-7-2.92zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.03 0 1.2.87 2.36.99 2.52.12.17 1.72 2.62 4.16 3.67.58.25 1.03.4 1.39.52.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28z" />
        </svg>
      </a>
    </div>
  );
}
