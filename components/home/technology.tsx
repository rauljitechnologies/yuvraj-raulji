'use client';

import { TECH_GROUPS, type TechIcon } from '../../lib/site';
import { Container, SectionHeading } from '../ui';
import { Reveal, RevealGroup, RevealItem } from '../ui/reveal';
import { useUI } from '../ui-context';

/**
 * §17 Technology & Architecture. Migrated to the design tokens.
 *
 * Beyond swapping inline rgba() for token classes, this fixes the small-text
 * accent colours. globals.css states the rule plainly: #e50920 is 3.44:1 and is
 * for large text, fills and borders only — #f0263c is the only accent safe for
 * small text. The group subtitle, level badge, count strip and CTA were all
 * setting #e50920 at 55–70% opacity at .58–.66rem, well under 3:1. They now use
 * `text-accent-bright` at full opacity; #e50920 survives only in borders,
 * fills and the icon strokes, where it is allowed.
 */

const svgProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function Icon({ name }: { name: TechIcon }) {
  switch (name) {
    case 'cart':
      return (
        <svg {...svgProps}>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.97-1.67l1.38-9.32H6" />
        </svg>
      );
    case 'activity':
      return (
        <svg {...svgProps}>
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case 'code':
      return (
        <svg {...svgProps}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...svgProps}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      );
    case 'bars':
      return (
        <svg {...svgProps}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 'orbit':
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
        </svg>
      );
  }
}

export function Technology() {
  const { setContactOpen } = useUI();

  return (
    <section
      id="technology"
      aria-labelledby="technology-title"
      className="relative overflow-hidden bg-surface py-section"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%,rgba(229, 9, 32,.06),transparent)' }} />

      <Container className="relative z-[1]">
        <Reveal className="mb-[clamp(48px,7vw,80px)] grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_minmax(280px,.55fr)]">
          <SectionHeading
            id="technology-title"
            eyebrow="Technology"
            title={<>E-commerce Technology &amp; Architecture</>}
            className="max-w-none"
          />
          <p className="text-body-lg leading-[1.8] text-ink-secondary">
            A living technology layer connecting commerce platforms, cloud infrastructure, AI automation, and high-performance experiences.
          </p>
        </Reveal>

        <RevealGroup as="ul" className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3" each={0.05}>
          {TECH_GROUPS.map((g) => (
            <RevealItem
              key={g.title + g.sub}
              as="li"
              className="tc-card group relative overflow-hidden rounded-lg border border-line bg-elevated px-7 pb-[26px] pt-7 transition-[border-color,background-color] duration-300 hover:border-accent/30 hover:bg-accent/5"
            >
              <div
                aria-hidden="true"
                className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-accent/25 bg-accent/10 text-accent"
                  >
                    <Icon name={g.icon} />
                  </div>
                  <div>
                    <h3 className="font-display text-[1.05rem] uppercase leading-none tracking-[.08em] text-ink">{g.title}</h3>
                    <p className="mt-[3px] text-[.65rem] font-bold uppercase tracking-[.22em] text-accent-bright">{g.sub}</p>
                  </div>
                </div>
                <span className="rounded-full border border-accent/25 px-[9px] py-1 text-[.62rem] font-bold uppercase tracking-[.20em] text-accent-bright">
                  {g.level}
                </span>
              </div>

              <ul className="flex flex-col border-t border-line">
                {g.items.map((it, i) => (
                  <li
                    key={it.label}
                    className={`flex items-center gap-3 py-[10px] ${i < g.items.length - 1 ? 'border-b border-line' : ''}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-[5px] w-[5px] shrink-0 rounded-full ${it.strong ? 'bg-accent' : 'bg-accent/50'}`}
                    />
                    <span className={`text-[.86rem] ${it.strong ? 'text-ink-secondary' : 'text-ink-muted'}`}>{it.label}</span>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Count strip */}
        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-md border border-line bg-white/[.02] px-6 py-5">
          <div className="flex items-center gap-[10px]">
            <span
              aria-hidden="true"
              className="h-[6px] w-[6px] shrink-0 rounded-full bg-accent-bright"
              style={{ boxShadow: '0 0 0 0 rgba(240, 38, 60,.5)', animation: 'avP 1.6s infinite' }}
            />
            <span className="text-[.58rem] font-bold uppercase tracking-[.22em] text-ink-muted">
              30+ Technologies · 6 Core Disciplines · 9+ Years Hands-On
            </span>
          </div>
          <button
            onClick={() => setContactOpen(true)}
            className="inline-flex h-[38px] cursor-pointer items-center gap-2 rounded-sm border border-accent/30 bg-transparent px-5 text-[.66rem] font-bold uppercase tracking-[.12em] text-accent-bright transition-[background-color,border-color] duration-200 hover:border-accent/55 hover:bg-accent/10"
          >
            Discuss Your Tech Stack &nbsp;→
          </button>
        </Reveal>
      </Container>
    </section>
  );
}
