'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { HOME_NAV } from '../../lib/home';
import { useUI } from '../ui-context';

/**
 * Homepage navigation.
 *
 * Transparent over the hero and opaque once the page has moved, so the hero
 * reads full-bleed without the headline ever running under an unreadable bar.
 * The scroll listener is passive and only ever flips one boolean.
 *
 * Focus handling on the mobile panel mirrors components/site-header.tsx: focus
 * moves in on open, is trapped while open, and returns to the toggle on close.
 * The scroll lock and Escape handling come from UIProvider.
 */
export function HomeNav() {
  const { menuOpen, setMenuOpen, setContactOpen } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  const wordmark = (
    <Link
      href="/"
      className="font-display text-[.82rem] uppercase tracking-[.2em] text-ink transition-colors duration-200 hover:text-accent-bright"
    >
      Yuvraj<span className="text-accent">.</span>Raulji
    </Link>
  );

  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1300] focus:bg-accent focus:px-4 focus:py-2 focus:text-[.72rem] focus:font-bold focus:uppercase focus:tracking-[.14em] focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-header transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? 'border-b border-[var(--rule)] bg-[rgba(5,5,5,.86)] backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav aria-label="Primary" className="yr-shell flex h-[68px] items-center justify-between gap-6 md:h-[76px]">
          {wordmark}

          <ul className="hidden items-center gap-9 lg:flex">
            {HOME_NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[.68rem] font-semibold uppercase tracking-[.18em] text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="hidden h-[42px] items-center border border-[var(--rule-strong)] px-5 text-[.66rem] font-bold uppercase tracking-[.16em] text-ink transition-colors duration-200 hover:border-accent hover:text-accent-bright sm:inline-flex"
            >
              Let&rsquo;s talk
            </button>

            <button
              ref={toggleRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="home-nav-panel"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid h-11 w-11 place-items-center border border-[var(--rule)] text-ink transition-colors duration-200 hover:border-accent lg:hidden"
            >
              <span aria-hidden="true" className="relative block h-[10px] w-[18px]">
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ${
                    menuOpen ? 'top-[5px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ${
                    menuOpen ? 'top-[5px] -rotate-45' : 'top-[9px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile panel ── */}
      <div
        id="home-nav-panel"
        ref={panelRef}
        className={`fixed inset-0 z-[790] flex flex-col justify-center gap-2 bg-[rgba(5,5,5,.98)] px-gutter transition-[opacity,visibility] duration-300 lg:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        /* `inert` takes the whole panel out of the tab order and the
           accessibility tree while it is closed, which is what a
           visibility-animated overlay needs; aria-hidden alone would leave the
           links focusable. */
        inert={!menuOpen}
      >
        {HOME_NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="yr-display yr-display--3 border-b border-[var(--rule)] py-item text-ink transition-colors duration-200 hover:text-accent-bright"
          >
            {item.label}
          </a>
        ))}
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            setContactOpen(true);
          }}
          className="yr-btn yr-btn--primary mt-block self-start"
        >
          Let&rsquo;s talk
        </button>
      </div>
    </>
  );
}
