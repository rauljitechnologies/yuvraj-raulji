'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SCENES, UNIVERSE_NAV } from '../../lib/universe';
import { useUI } from '../ui-context';
import { useUniverse } from './provider';

/**
 * Minimal transparent navigation that turns to dark glass once the journey
 * starts, plus a thin progress rail showing how far through the world the
 * visitor has travelled.
 *
 * The enquiry modal is the existing one: it is already wired to a live lead
 * endpoint and already handles focus trapping and validation, and replacing a
 * working form with a prettier broken one would be a downgrade.
 */
export function UniverseNav() {
  const { active, scrollTo } = useUniverse();
  const { setContactOpen } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const rail = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      if (rail.current) {
        rail.current.style.transform = `scaleX(${Math.min(window.scrollY / max, 1)})`;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Focus management for the mobile overlay: focus in on open, wrap Tab inside
  // it, return focus to the toggle on close.
  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;

    const items = () => Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    items()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const list = items();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('is-locked');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('is-locked');
      toggleRef.current?.focus();
    };
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    setOpen(false);
    scrollTo(href);
  };

  const activeId = SCENES[active];

  return (
    <>
      <a href="#hero" className="u-skip">
        Skip to content
      </a>

      <header className={`u-nav ${scrolled ? 'is-solid' : ''}`}>
        <div className="u-nav-inner">
          <Link href="/" className="u-logo" aria-label="Yuvraj Raulji, home">
            <span className="u-logo-mark" aria-hidden="true">
              YR
            </span>
            <span className="u-logo-text">Yuvraj Raulji</span>
          </Link>

          <nav aria-label="Primary" className="u-nav-links">
            {UNIVERSE_NAV.map((l) => {
              const isCurrent = l.href === `#${activeId}`;
              return l.href.startsWith('#') ? (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={go(l.href)}
                  aria-current={isCurrent ? 'true' : undefined}
                  className={`u-nav-link ${isCurrent ? 'is-active' : ''}`}
                >
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} href={l.href} className="u-nav-link">
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <button type="button" className="u-nav-cta" onClick={() => setContactOpen(true)}>
            Let’s talk <span aria-hidden="true">→</span>
          </button>

          <button
            ref={toggleRef}
            type="button"
            className="u-burger"
            aria-expanded={open}
            aria-controls="universe-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" data-open={open} />
            <span aria-hidden="true" data-open={open} />
          </button>
        </div>

        <span className="u-rail" aria-hidden="true">
          <span ref={rail} className="u-rail-fill" />
        </span>
      </header>

      <div id="universe-menu" ref={panelRef} className="u-menu" data-open={open} aria-hidden={!open}>
        {UNIVERSE_NAV.map((l) =>
          l.href.startsWith('#') ? (
            <a key={l.label} href={l.href} onClick={go(l.href)} className="u-menu-link">
              {l.label}
            </a>
          ) : (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="u-menu-link">
              {l.label}
            </Link>
          ),
        )}
        <button
          type="button"
          className="u-menu-cta"
          onClick={() => {
            setOpen(false);
            setContactOpen(true);
          }}
        >
          Let’s talk →
        </button>
      </div>
    </>
  );
}
