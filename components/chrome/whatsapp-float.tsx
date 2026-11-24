'use client';

import { useEffect, useState } from 'react';
import { CONTACT } from '../../lib/contact';

/**
 * The one floating button: WhatsApp, bottom-right, every page, every width.
 *
 * ══════════════════════════════════════════════════════════════════════════
 * WHAT THIS REPLACED
 * ══════════════════════════════════════════════════════════════════════════
 *
 * `components/chrome/mobile-cta.tsx`, which was a full-width bar pinned to
 * the bottom of the viewport on phones only, holding two actions: a red
 * "Discuss Your Project" link and a 76px WhatsApp square beside it.
 *
 * Three things were wrong with it against this brief:
 *
 *   It was a bar, not a button, and it was two actions where the brief asks
 *   for one. The primary action it carried is the hero's primary action and
 *   the header's primary action, so it was the third copy of the same link.
 *
 *   It was `md:hidden`, so above 768px there was no persistent way to start a
 *   conversation at all once the reader had scrolled past the hero.
 *
 *   WhatsApp was the secondary half of it, a 76px icon square at the end of a
 *   red bar, which is the least prominent position in the component.
 *
 * ── And the floating PDF button ──────────────────────────────────────────
 *
 * There was never one. The brief asks for it to be removed; section 5 of
 * REDESIGN_AUDIT.md records the three ways that was verified (no `fixed
 * bottom-*` element in the source, no `.pdf` href and one `class="fixed"` in
 * the exported `out/index.html`, and a git history showing a *static*
 * "Download Resume" button removed from the hero some time ago).
 *
 * The CV link it asks to relocate is already where it asks for it: in the
 * header's More menu (`MORE_NAV`, lib/brand.ts), in the footer, and on
 * /resume/ where the file itself is gated on `resumeAvailable()`.
 *
 * ══════════════════════════════════════════════════════════════════════════
 * "NEVER OVERLAPPING CONTENT ON MOBILE"
 * ══════════════════════════════════════════════════════════════════════════
 *
 * A fixed element in the corner of a phone always overlaps something, so this
 * is handled in three parts rather than hoped about.
 *
 * 1. IT RESERVES ITS OWN SPACE. While mounted, the body carries
 *    `padding-bottom` of the button's height plus its inset. So the last line
 *    of every page can be scrolled clear of it, which is the thing a floating
 *    button normally gets wrong: it permanently hides the final paragraph and
 *    the footer's bottom row. The padding is removed with the component.
 *
 * 2. IT GETS OUT OF THE WAY OF A FORM. An IntersectionObserver was the
 *    obvious tool and is the wrong one here, and the reason is recorded in
 *    the component this replaces: the enquiry modal renders on every interior
 *    route and while closed its form is `visibility: hidden` but still laid
 *    out, 1144px tall, at the top of the viewport. IntersectionObserver only
 *    skips `display: none`, so it reported that form as permanently on
 *    screen. This measures in the scroll handler instead, which reads the
 *    live state including visibility, and `checkVisibility()` is called WITH
 *    its options because bare it also ignores `visibility: hidden`.
 *
 *    A form on screen means the reader is already doing the thing this button
 *    exists to cause, so the button hides.
 *
 * 3. IT RESPECTS THE SAFE AREA. `bottom` is `calc(24px +
 *    env(safe-area-inset-bottom))`, so on a phone with a home indicator the
 *    button sits above it rather than under it.
 *
 * ══════════════════════════════════════════════════════════════════════════
 * APPEARANCE
 * ══════════════════════════════════════════════════════════════════════════
 *
 * 56px circle, which clears the 44px touch minimum with room for the glyph.
 * Filled in the primary red with a white mark: 5.88:1, so the icon passes the
 * 3:1 non-text contrast requirement with margin.
 *
 * Not WhatsApp green. Section 32 of BRAND-DESIGN-GUIDELINE.md allows black,
 * white and red, the mark is recognised by its shape rather than its colour,
 * and a third-party brand green in the corner of all 89 pages would be the
 * most conspicuous possible way to break that rule.
 *
 * The accessible name says it opens a new tab, because it does.
 */

/* 56px button + 24px inset. The body reserves this much so nothing is
   permanently covered. */
const RESERVE = 80;

export function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false);

  /* Hide while a visible form is on screen. See part 2 of the note above for
     why this measures rather than observes. */
  useEffect(() => {
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

    let frame = 0;
    const measure = () => {
      frame = 0;
      const onScreen = Array.from(document.querySelectorAll('form')).some((el) => {
        if (!visible(el)) return false;
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
      });
      setHidden(onScreen);
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

  /* Padding on the element that scrolls, not on the button, so the page's own
     last line clears it. Set once on mount rather than per state change: the
     button only hides over a form, and a form on screen is not a moment to
     reflow the page it is in. */
  useEffect(() => {
    document.body.style.paddingBottom = `${RESERVE}px`;
    return () => {
      document.body.style.paddingBottom = '';
    };
  }, []);

  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      data-event="whatsapp_click"
      aria-label="Message me on WhatsApp (opens in a new tab)"
      /* `fixed right-6` with the safe-area-aware bottom. z-sticky, which is
         below the header and below the modal: a floating button must never be
         on top of an open overlay. */
      className={`fixed right-6 z-sticky grid h-[56px] w-[56px] place-items-center rounded-full bg-accent text-white shadow-lifted transition-[opacity,transform] duration-200 hover:bg-accent-deep motion-reduce:transition-none ${
        hidden ? 'pointer-events-none scale-90 opacity-0' : 'scale-100 opacity-100'
      }`}
      style={{ bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7a9.82 9.82 0 0 0-7-2.92zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.03 0 1.2.87 2.36.99 2.52.12.17 1.72 2.62 4.16 3.67.58.25 1.03.4 1.39.52.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28z" />
      </svg>
    </a>
  );
}
