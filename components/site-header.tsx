'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '../lib/site';
import { useUI } from './ui-context';

/**
 * Primary navigation. Escape-to-close and scroll lock come from UIProvider; this
 * component owns the focus behaviour the overlay needs to be keyboard-usable:
 * focus moves into the panel on open, is trapped while open, and returns to the
 * toggle on close.
 */
export function SiteHeader({ active }: { active?: string }) {
  const { menuOpen, setMenuOpen, setContactOpen } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!menuOpen || !panel) return;

    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      // Wrap at both ends so Tab cannot reach the page behind the overlay.
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener('keydown', onKeyDown);
    return () => {
      panel.removeEventListener('keydown', onKeyDown);
      toggleRef.current?.focus();
    };
  }, [menuOpen]);

  const closeAnd = (fn?: () => void) => () => {
    setMenuOpen(false);
    fn?.();
  };

  const panelLink =
    'font-display text-[2.4rem] uppercase leading-none tracking-[.06em] text-[#f5f5f2] transition-colors duration-200 hover:text-rv focus-visible:text-rv';

  return (
    <>
      {/* Keyboard users land here first — the nav repeats on every page */}
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1300] focus:rounded focus:bg-red focus:px-4 focus:py-2 focus:text-[.8rem] focus:font-bold focus:uppercase focus:tracking-[.1em] focus:text-white"
      >
        Skip to content
      </a>

      {/* ── Mobile panel ── */}
      <div
        id="mobile-nav"
        ref={panelRef}
        className={`fixed inset-0 z-[790] flex flex-col items-center justify-center gap-6 bg-[rgba(6,6,6,.97)] backdrop-blur-xl transition-[opacity,visibility] duration-300 lg:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <Link href="/" onClick={closeAnd()} className={panelLink}>
          Home
        </Link>
        {NAV_LINKS.map((l) => (
          <Link key={l.label} href={l.href} onClick={closeAnd()} className={panelLink}>
            {l.label}
          </Link>
        ))}
        <button type="button" onClick={closeAnd(() => setContactOpen(true))} className={`${panelLink} cursor-pointer`}>
          Contact
        </button>
        <button
          type="button"
          onClick={closeAnd(() => setContactOpen(true))}
          className="mt-2 inline-flex h-[52px] items-center gap-2 rounded bg-red px-8 text-[.8rem] font-bold uppercase tracking-[.1em] text-white transition-colors duration-200 hover:bg-rv active:scale-[.97] touch-manipulation"
        >
          Book a Consultation
        </button>
      </div>

      {/* ── Header ── */}
      <header
        className={`fixed inset-x-0 top-0 z-[800] border-b border-transparent transition-[background-color,border-color] duration-300 ${
          scrolled ? 'border-[rgba(229, 9, 32,.14)] bg-[rgba(6,6,6,.88)] backdrop-blur-xl' : ''
        }`}
      >
        <div className="mx-auto flex h-[74px] max-w-shell items-center justify-between gap-6 px-6 md:px-10">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[.8rem] font-bold uppercase tracking-[.14em]"
            aria-label="Yuvraj Raulji — home"
          >
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-full border border-[rgba(229, 9, 32,.32)] text-[.7rem] font-bold text-rv"
            >
              YR
            </span>
            Yuvraj Raulji
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                aria-current={active === l.label ? 'page' : undefined}
                className={`nav-link text-[.74rem] font-semibold uppercase tracking-[.1em] transition-colors duration-200 hover:text-[#f5f5f2] ${
                  active === l.label ? 'text-[#f5f5f2]' : 'text-[rgba(245, 245, 242,.60)]'
                }`}
              >
                {l.label}
              </Link>
            ))}
            {/* Tailwind preflight resets text-transform on <button>, so uppercase is explicit */}
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="nav-link cursor-pointer border-0 bg-transparent p-0 text-[.74rem] font-semibold uppercase tracking-[.1em] text-[rgba(245, 245, 242,.60)] transition-colors duration-200 hover:text-[#f5f5f2]"
            >
              Contact
            </button>
          </nav>

          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="hidden h-10 items-center gap-[7px] whitespace-nowrap rounded bg-red px-5 text-[.72rem] font-bold uppercase tracking-[.1em] text-white transition-all duration-200 hover:-translate-y-px hover:bg-rv hover:shadow-[0_10px_36px_rgba(229, 9, 32,.32)] active:scale-[.96] lg:inline-flex touch-manipulation"
          >
            Consultation →
          </button>

          <button
            ref={toggleRef}
            type="button"
            className="flex h-10 w-10 flex-col justify-center gap-[5px] p-2 lg:hidden touch-manipulation"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span aria-hidden="true" className={`hbg-line ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
            <span aria-hidden="true" className={`hbg-line ${menuOpen ? 'opacity-0' : ''}`} />
            <span aria-hidden="true" className={`hbg-line ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>
    </>
  );
}
