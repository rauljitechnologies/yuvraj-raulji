'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CTA_LABEL, NAV } from '../../lib/brand';
import { useUI } from '../ui-context';
import { HEADER_CTA_CLASS } from '../header-cta';
import { Wordmark } from '../wordmark';

/**
 * Primary navigation, for every route.
 *
 * Three destinations and one action, which is the whole navigation. Nothing
 * called Services, Technology, Projects or Contact: a personal site with a
 * services menu is a company site with a photograph on it, and every item that
 * earns a slot here costs the other three some of the reader's attention.
 *
 * Transparent over the top of the page and opaque once it has moved, so a hero
 * reads full bleed without a headline ever running under an unreadable bar. The
 * scroll listener is passive and only ever flips one boolean.
 *
 * ── Contrast switching ─────────────────────────────────────────────────────
 *
 * The page alternates black and paper sections, so a bar with one fixed colour
 * is unreadable over half of it. Rather than infer the ground from scroll
 * depth, which breaks the moment a section's height changes, an
 * IntersectionObserver is given a one-pixel band at the bar's own lower edge
 * and told to watch every `.yr-paper` section. Whichever section is crossing
 * that band is the one under the bar; if it is paper, the bar goes paper. Both
 * states are the same token swap the sections use, so the wordmark, the links,
 * the CTA border and the burger all invert together with no per-element
 * classes and no second set of styles to keep in sync.
 *
 * This costs no scroll work: the observer fires only on the two frames where a
 * boundary actually crosses the band.
 *
 * Focus handling on the mobile panel: focus moves in on open, is trapped while
 * open, and returns to the toggle on close. Scroll lock and Escape come from
 * UIProvider. `inert` takes the closed panel out of both the tab order and the
 * accessibility tree, which `aria-hidden` alone would not do.
 */
export function SiteNav({ active }: { active?: string }) {
  const { menuOpen, setMenuOpen, setContactOpen } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [onPaper, setOnPaper] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Which ground is under the bar. Re-queried per route: the App Router can
     keep this component mounted across a navigation, and the previous page's
     sections are gone by then. */
  useEffect(() => {
    const papers = Array.from(document.querySelectorAll<HTMLElement>('.yr-paper'));
    if (!papers.length) {
      setOnPaper(false);
      return;
    }

    let io: IntersectionObserver | null = null;

    /* The bar is 68px on phones and 78px from `md`, and the band has to sit at
       its lower edge, so the observer is rebuilt on resize rather than reading
       a layout value once at mount. */
    const attach = () => {
      io?.disconnect();
      const bar = window.innerWidth >= 768 ? 78 : 68;
      const below = Math.max(0, window.innerHeight - bar - 1);
      const crossing = new Set<Element>();

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) crossing.add(entry.target);
            else crossing.delete(entry.target);
          }
          setOnPaper(crossing.size > 0);
        },
        { rootMargin: `-${bar}px 0px -${below}px 0px` },
      );

      papers.forEach((section) => io?.observe(section));
    };

    attach();
    window.addEventListener('resize', attach);
    return () => {
      io?.disconnect();
      window.removeEventListener('resize', attach);
    };
  }, [pathname]);

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

  return (
    <>
      {/* Keyboard users land here first. The nav repeats on every page, so
          without this every page costs several tabs before the content. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1300] focus:bg-accent focus:px-4 focus:py-2 focus:text-[.72rem] focus:font-bold focus:uppercase focus:tracking-[.14em] focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`yr-scope yr-nav fixed inset-x-0 top-0 z-header ${
          scrolled ? 'yr-nav--solid' : ''
        } ${onPaper ? 'yr-nav--light' : ''}`}
      >
        <nav
          aria-label="Primary"
          className="yr-shell flex h-[68px] items-center justify-between gap-6 md:h-[78px]"
        >
          {/*
            Wordmark. This used to be the name alone, on the argument that the
            site is one long case for the name meaning something and a mark
            would be the single place it got abbreviated away. Yuvraj asked for
            YR alongside it on 26 Aug 2026, so the name is still there in full
            and the initials sit in front of it rather than instead of it.
            Shared with the homepage header via components/wordmark.tsx.
          */}
          <Link
            href="/"
            aria-label="Yuvraj Raulji, home"
            className="shrink-0 transition-opacity duration-200 hover:opacity-70"
          >
            <Wordmark size="sm" />
          </Link>

          <ul className="hidden items-center gap-10 lg:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active === item.label ? 'page' : undefined}
                  className={`text-[.66rem] font-semibold uppercase tracking-[.2em] transition-colors duration-200 hover:text-ink ${
                    active === item.label ? 'text-ink' : 'text-ink-muted'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              /*
                `max-sm:hidden`, not `hidden sm:inline-flex`: the shared class
                already sets `inline-flex`, and two bare display utilities on
                one element are decided by Tailwind's output order rather than
                by the order written here. A media-query variant always wins
                over the base utility, so this cannot flip.
              */
              className={`max-sm:hidden ${HEADER_CTA_CLASS}`}
            >
              {CTA_LABEL}
            </button>

            <button
              ref={toggleRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-nav-panel"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid h-11 w-11 place-items-center border border-line text-ink transition-colors duration-200 hover:border-accent lg:hidden"
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

      {/* ── Mobile panel ── full screen, one destination per line ── */}
      <div
        id="site-nav-panel"
        ref={panelRef}
        className={`yr-scope fixed inset-0 z-[790] flex flex-col justify-center gap-2 bg-[rgba(5,5,5,.98)] px-gutter transition-[opacity,visibility] duration-300 lg:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        inert={!menuOpen}
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            aria-current={active === item.label ? 'page' : undefined}
            className={`yr-display yr-display--2 border-b border-line py-item transition-colors duration-200 hover:text-accent-bright ${
              active === item.label ? 'text-accent-bright' : 'text-ink'
            }`}
          >
            {item.label}
          </Link>
        ))}
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            setContactOpen(true);
          }}
          className="yr-btn yr-btn--primary mt-block self-start"
        >
          {CTA_LABEL}
        </button>
      </div>
    </>
  );
}
