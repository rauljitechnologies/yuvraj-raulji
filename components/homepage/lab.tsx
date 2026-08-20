'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';
import { LAB, LAB_TRACKS, SECTIONS } from '../../lib/home';
import { EASE_OUT } from '../../lib/motion';
import { Lines, Rise } from './motion';
import { Marker, Section, Shell, Tag, TextLink } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'lab')!;

/**
 * The learning lab.
 *
 * Implemented as a real tabs widget rather than four divs that respond to
 * clicks: roles, aria-selected, aria-controls and roving tabindex are all
 * present, and Home/End/Arrow keys move between tracks the way a keyboard user
 * expects. The vertical orientation is declared, so the Up/Down keys are the
 * ones that move on desktop.
 *
 * Nothing in this section claims expertise, certification or authority. It
 * says what is being studied, which is the only claim the record supports.
 */
export function Lab() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const next = (i + LAB_TRACKS.length) % LAB_TRACKS.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number | undefined> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: LAB_TRACKS.length - 1,
    };
    const next = map[e.key];
    if (next === undefined) return;
    e.preventDefault();
    focusTab(next);
  };

  const track = LAB_TRACKS[active];

  return (
    <Section id="lab" labelledBy="lab-title">
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1.05fr_.95fr]">
          <Lines
            as="h2"
            id="lab-title"
            lines={LAB.headline}
            softFrom={1}
            className="max-w-[17ch]"
          />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[46ch]">{LAB.body}</p>
          </Rise>
        </div>

        <div className="mt-grid grid gap-px bg-[var(--rule)] lg:grid-cols-[minmax(220px,.34fr)_1fr]">
          {/* ── Track list ── */}
          <div
            role="tablist"
            aria-label="Learning tracks"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="yr-scroll-x flex bg-bg lg:flex-col lg:overflow-visible"
          >
            {LAB_TRACKS.map((t, i) => {
              const selected = i === active;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  role="tab"
                  id={`lab-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`lab-panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`group relative flex min-h-[64px] flex-1 items-center gap-4 whitespace-nowrap px-6 text-left transition-colors duration-300 lg:min-h-[86px] ${
                    selected ? 'bg-[rgba(255,255,255,.03)]' : 'hover:bg-[rgba(255,255,255,.015)]'
                  }`}
                >
                  {/* Selection marker: a rule on the leading edge, vertical on
                      desktop and horizontal under the label on mobile. */}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent transition-transform duration-400 lg:bottom-auto lg:top-0 lg:h-full lg:w-[2px] lg:origin-top ${
                      selected ? 'scale-x-100 lg:scale-y-100' : 'scale-x-0 lg:scale-y-0'
                    }`}
                  />
                  <span
                    className={`font-display text-[.7rem] tracking-[.16em] transition-colors duration-300 ${
                      selected ? 'text-accent-bright' : 'text-ink-faint'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display text-[.95rem] uppercase tracking-[.08em] transition-colors duration-300 ${
                      selected ? 'text-ink' : 'text-ink-muted group-hover:text-ink'
                    }`}
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Panel ── */}
          <div className="bg-bg p-card">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={track.id}
                role="tabpanel"
                id={`lab-panel-${track.id}`}
                aria-labelledby={`lab-tab-${track.id}`}
                tabIndex={0}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduced ? 0.01 : 0.34, ease: EASE_OUT }}
                className="flex h-full min-h-[240px] flex-col justify-between gap-block outline-none"
              >
                <p className="text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.65] text-ink-secondary">
                  {track.summary}
                </p>

                <ul className="flex flex-wrap gap-2">
                  {track.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Rise delay={0.1} className="mt-tail">
          <TextLink href={LAB.cta.href}>{LAB.cta.label}</TextLink>
        </Rise>
      </Shell>
    </Section>
  );
}
