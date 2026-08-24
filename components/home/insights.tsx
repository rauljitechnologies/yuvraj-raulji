import Link from 'next/link';
import { INSIGHT_CARDS } from '../../lib/site';

const pad = (n: number) => String(n).padStart(2, '0');

export function Insights() {
  return (
    <section
      id="insights"
      className="relative overflow-hidden bg-bg2 flex flex-col justify-center"
      style={{ minHeight: '100vh', padding: 'clamp(96px,12vh,130px) 0 clamp(48px,6vh,80px)' }}
    >
      <div className="max-w-shell mx-auto px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(280px,.55fr)] gap-10 items-end mb-[clamp(32px,5vh,60px)] reveal">
          <div>
            <p className="sec-kicker inline-flex items-center gap-[10px] text-[.68rem] font-semibold tracking-[.22em] uppercase text-rv mb-[10px]">
              Insights
            </p>
            <h2 className="font-display uppercase tracking-[.03em] leading-[.94]" style={{ fontSize: 'clamp(2.2rem,5.5vw,4.8rem)' }}>
              Future Signals: E-commerce, Technology &amp; AI
            </h2>
          </div>
          <div>
            <p className="text-[rgba(245,245,242,.60)] mb-5" style={{ fontSize: 'clamp(.92rem,1.2vw,1.06rem)', lineHeight: 1.74 }}>
              Editorial perspectives on the forces reshaping commerce, enterprise technology, and AI-powered operations.
            </p>
            <Link
              href="/blog"
              className="btn-arr inline-flex items-center gap-2 h-[42px] px-5 rounded border border-[rgba(229,9,32,.36)] text-rv text-[.70rem] font-bold tracking-[.12em] uppercase no-underline transition-all hover:bg-red hover:border-red hover:text-white hover:-translate-y-px touch-manipulation"
            >
              View All Insights
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border border-[rgba(255,255,255,.08)] rounded-xl overflow-hidden gap-px bg-[rgba(255,255,255,.08)] reveal">
          {INSIGHT_CARDS.map((p, i) => (
            <Link
              key={p.t}
              href="/blog"
              className="group relative min-h-[225px] p-6 bg-bg2 grid content-between gap-4 no-underline text-inherit overflow-hidden transition-all duration-300 hover:bg-[rgba(229,9,32,.06)] hover:-translate-y-1 touch-manipulation"
            >
              <span
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#f0263c] via-[#e50920] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                aria-hidden="true"
              />
              <span className="flex items-start justify-between gap-3">
                <span className="text-[.66rem] font-bold tracking-[.22em] uppercase text-rv">{pad(i + 1)}</span>
                <svg
                  className="w-[16px] h-[16px] text-rv opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
              <span className="block">
                <h3
                  className="font-display uppercase tracking-[.03em] leading-[1.12] transition-colors duration-300 group-hover:text-white"
                  style={{ fontSize: 'clamp(1.08rem,1.5vw,1.58rem)' }}
                >
                  {p.t}
                </h3>
                <span className="flex items-center gap-2 mt-3 text-[.62rem] font-bold tracking-[.16em] uppercase">
                  <span className="text-[rgba(240,38,60,.80)]">{p.c}</span>
                  <span className="w-[3px] h-[3px] rounded-full bg-[rgba(245,245,242,.25)]" aria-hidden="true" />
                  <span className="text-[rgba(245,245,242,.40)] transition-colors duration-300 group-hover:text-[rgba(245,245,242,.65)]">{p.m}</span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
