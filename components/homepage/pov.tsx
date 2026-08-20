'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { POV, SECTIONS } from '../../lib/home';
import { ArrowIcon } from '../ui/icons';
import { Lines, Rise } from './motion';
import { Marker, Section, Shell } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'pov')!;

/**
 * Point of view.
 *
 * A horizontal rail, because these are five separate positions rather than one
 * argument, and reading them side by side is closer to how they are meant to be
 * taken than stacking them into a list.
 *
 * The rail is a native scroll container with scroll-snap. Nothing here captures
 * the wheel or moves the page, so trackpad, touch, Shift+wheel, the scrollbar
 * and Tab all behave exactly as they do anywhere else. The two buttons are an
 * addition for mouse users on wide screens, not the only way to move.
 */
export function Pov() {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    // 8px of slack, because sub-pixel widths mean scrollLeft rarely lands
    // exactly on the maximum.
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    // One card plus its gap, capped so it never overshoots the viewport width.
    const step = Math.min(el.clientWidth * 0.8, 460);
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const arrowCls =
    'grid h-11 w-11 place-items-center border border-[var(--rule-strong)] text-ink transition-colors duration-200 hover:border-accent hover:text-accent-bright disabled:pointer-events-none disabled:opacity-30';

  return (
    <Section id="pov" labelledBy="pov-title">
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <div className="flex flex-wrap items-end justify-between gap-8">
          <Lines as="h2" id="pov-title" lines={['My point', 'of view']} softFrom={1} />

          <Rise delay={0.2} className="hidden gap-2 md:flex">
            <button type="button" onClick={() => nudge(-1)} disabled={atStart} aria-label="Previous statement" className={arrowCls}>
              <ArrowIcon size={16} className="rotate-180" />
            </button>
            <button type="button" onClick={() => nudge(1)} disabled={atEnd} aria-label="Next statement" className={arrowCls}>
              <ArrowIcon size={16} />
            </button>
          </Rise>
        </div>
      </Shell>

      {/* Full-bleed rail. It sits outside the shell so cards can run to the
          screen edge, and reinstates the gutter as its own padding. */}
      <div
        ref={railRef}
        className="yr-rail mt-grid"
        tabIndex={0}
        role="group"
        aria-label="Point of view statements, scroll horizontally"
      >
        {POV.map((item, i) => (
          <article
            key={item.statement}
            className="yr-card group w-[min(84vw,440px)] justify-between"
          >
            <div>
              <span aria-hidden="true" className="yr-card__num">
                {String(i + 1).padStart(2, '0')} / {String(POV.length).padStart(2, '0')}
              </span>

              <p className="mt-item font-display text-[length:var(--hd-quote)] leading-[1.16] tracking-[-.01em] text-ink">
                {item.statement}
              </p>

              <p className="yr-note mt-item">{item.context}</p>
            </div>

            <Link
              href={item.href}
              className="yr-link mt-block self-start"
              /* The statement is the context this link needs; without it the
                 accessible name is five identical "Read the case" links. */
              aria-label={`${item.cta}: ${item.statement}`}
            >
              {item.cta}
              <ArrowIcon className="yr-btn__arrow" size={14} />
            </Link>
          </article>
        ))}

        {/* Trailing spacer so the last card can snap clear of the right edge. */}
        <span aria-hidden="true" className="block w-px shrink-0" />
      </div>
    </Section>
  );
}
