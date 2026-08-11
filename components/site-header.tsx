'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CONTACT, NAV_LINKS } from '../lib/site';
import { useUI } from './ui-context';

/** Header + mobile menu. Replaces the Alpine `navScrolled` / `menuOpen` scope. */
export function SiteHeader({ active }: { active?: string }) {
  const { menuOpen, setMenuOpen, setContactOpen } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Mobile Menu ── */}
      <div
        className={`fixed inset-0 z-[790] bg-[rgba(6,6,6,.97)] backdrop-blur-xl flex flex-col items-center justify-center gap-7 transition-all duration-[320ms] ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-hidden={!menuOpen}
      >
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="font-bebas text-[2.8rem] tracking-[.06em] uppercase transition-colors hover:text-rv active:text-rv"
        >
          Home
        </Link>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="font-bebas text-[2.8rem] tracking-[.06em] uppercase transition-colors hover:text-rv active:text-rv"
          >
            {l.label}
          </Link>
        ))}
        <button
          onClick={() => {
            setMenuOpen(false);
            setContactOpen(true);
          }}
          className="font-bebas text-[2.8rem] tracking-[.06em] uppercase transition-colors hover:text-rv active:text-rv bg-transparent border-0 text-left cursor-pointer"
        >
          Contact
        </button>
        <a
          href={`mailto:${CONTACT.email}?subject=Strategic+Consultation`}
          onClick={() => setMenuOpen(false)}
          className="inline-flex items-center gap-2 h-[52px] px-8 rounded bg-red text-white text-[.80rem] font-bold tracking-[.10em] uppercase active:bg-rv active:scale-[.97] transition-all touch-manipulation"
        >
          Book Consultation →
        </a>
      </div>

      {/* ── Nav ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[800] border-b border-transparent transition-all duration-[280ms] ${
          scrolled ? 'bg-[rgba(6,6,6,.88)] border-[rgba(200,16,46,.14)] backdrop-blur-xl' : ''
        }`}
      >
        <div className="max-w-shell mx-auto px-6 md:px-10 h-[74px] flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-[10px] text-[.80rem] font-bold tracking-[.14em] uppercase">
            <span className="w-8 h-8 grid place-items-center border border-[rgba(200,16,46,.32)] rounded-full text-rv text-[.70rem] font-bold">
              YR
            </span>
            Yuvraj Raulji
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-[.74rem] font-semibold tracking-[.10em] uppercase text-[rgba(244,244,244,.60)]">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`nav-link ${active === l.label ? 'text-[#f4f4f4]' : ''}`}
              >
                {l.label}
              </Link>
            ))}
            {/* `uppercase` is explicit: Tailwind preflight resets text-transform
                on <button>, so it would not inherit it from the <nav>. */}
            <button
              onClick={() => setContactOpen(true)}
              className="nav-link bg-transparent border-0 p-0 cursor-pointer uppercase tracking-[.10em]"
            >
              Contact
            </button>
          </nav>

          <button
            onClick={() => setContactOpen(true)}
            className="hidden lg:inline-flex items-center gap-[7px] h-10 px-5 rounded bg-red text-white text-[.72rem] font-bold tracking-[.10em] uppercase whitespace-nowrap transition-all hover:bg-rv hover:shadow-[0_10px_36px_rgba(200,16,46,.32)] hover:-translate-y-px active:scale-[.96] touch-manipulation"
          >
            Consultation →
          </button>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 p-2 touch-manipulation"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            <span className={`hbg-line ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
            <span className={`hbg-line ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`hbg-line ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>
    </>
  );
}
