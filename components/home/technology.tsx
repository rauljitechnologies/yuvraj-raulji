'use client';

import { TECH_GROUPS, type TechIcon } from '../../lib/site';
import { useUI } from '../ui-context';

const svgProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: '#c8102e',
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
    <section id="technology" className="relative overflow-hidden bg-bg2" style={{ padding: 'clamp(80px,10vw,140px) 0' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%,rgba(200,16,46,.06),transparent)' }} />

      <div className="relative z-[1] max-w-shell mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(280px,.55fr)] gap-10 items-end mb-[clamp(48px,7vw,80px)] reveal">
          <div>
            <p className="sec-kicker inline-flex items-center gap-[10px] text-[.68rem] font-semibold tracking-[.22em] uppercase text-rv mb-[10px]">
              Command Center
            </p>
            <h2 className="font-bebas uppercase tracking-[.03em] leading-[.94]" style={{ fontSize: 'clamp(2.2rem,5.5vw,4.8rem)' }}>
              E-commerce Technology &amp; Architecture
            </h2>
          </div>
          <p className="text-[rgba(244,244,244,.55)]" style={{ fontSize: 'clamp(.92rem,1.2vw,1.06rem)', lineHeight: 1.8 }}>
            A living technology layer connecting commerce platforms, cloud infrastructure, AI automation, and high-performance experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 reveal">
          {TECH_GROUPS.map((g) => (
            <div
              key={g.title + g.sub}
              className="tc-card group relative overflow-hidden rounded-lg border border-[rgba(255,255,255,.07)] bg-[rgba(255,255,255,.025)] transition-all duration-300 hover:border-[rgba(200,16,46,.28)] hover:bg-[rgba(200,16,46,.04)]"
              style={{ padding: '28px 28px 26px' }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c8102e] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      border: '1px solid rgba(200,16,46,.25)',
                      background: 'rgba(200,16,46,.08)',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={g.icon} />
                  </div>
                  <div>
                    <p className="font-bebas uppercase tracking-[.08em] text-[1.05rem] leading-none text-[rgba(244,244,244,.88)]">{g.title}</p>
                    <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(200,16,46,.55)', marginTop: 3 }}>
                      {g.sub}
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '.62rem',
                    fontWeight: 700,
                    letterSpacing: '.20em',
                    textTransform: 'uppercase',
                    padding: '4px 9px',
                    border: '1px solid rgba(200,16,46,.25)',
                    borderRadius: 20,
                    color: 'rgba(200,16,46,.60)',
                  }}
                >
                  {g.level}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid rgba(255,255,255,.06)' }}>
                {g.items.map((it, i) => (
                  <div
                    key={it.label}
                    className={`flex items-center gap-3 py-[10px] ${i < g.items.length - 1 ? 'border-b border-[rgba(255,255,255,.05)]' : ''}`}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: it.strong ? '#c8102e' : 'rgba(200,16,46,.45)', flexShrink: 0 }} />
                    <span style={{ fontSize: '.86rem', color: it.strong ? 'rgba(244,244,244,.75)' : 'rgba(244,244,244,.50)' }}>{it.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Count strip */}
        <div
          className="reveal"
          style={{
            marginTop: 40,
            padding: '20px 24px',
            border: '1px solid rgba(255,255,255,.06)',
            borderRadius: 8,
            background: 'rgba(255,255,255,.02)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e8192c', flexShrink: 0, boxShadow: '0 0 0 0 rgba(232,25,44,.5)', animation: 'avP 1.6s infinite' }} />
            <span style={{ fontSize: '.58rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(244,244,244,.40)' }}>
              30+ Technologies · 6 Core Disciplines · 9+ Years Hands-On
            </span>
          </div>
          <button
            onClick={() => setContactOpen(true)}
            className="inline-flex items-center gap-2 h-[38px] px-5 rounded border border-[rgba(200,16,46,.30)] bg-transparent text-[rgba(200,16,46,.70)] text-[.66rem] font-bold tracking-[.12em] uppercase cursor-pointer transition-all duration-200 hover:bg-[rgba(200,16,46,.10)] hover:text-rv hover:border-[rgba(200,16,46,.55)]"
          >
            Discuss Your Tech Stack &nbsp;→
          </button>
        </div>
      </div>
    </section>
  );
}
