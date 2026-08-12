'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { WORK_METRICS, WORK_SLIDES } from '../../lib/site';

const pad = (n: number) => String(n).padStart(2, '0');

export function Work() {
  const [ws, setWs] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setWs((i) => (i + 1) % WORK_SLIDES.length), 6000);
  }, []);

  useEffect(() => {
    play();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [play]);

  const go = (i: number) => {
    setWs((i + WORK_SLIDES.length) % WORK_SLIDES.length);
    play();
  };

  return (
    <section id="work" className="relative overflow-hidden bg-bg flex flex-col" style={{ minHeight: '100vh' }}>
      {/* Full-bleed backgrounds */}
      <div className="absolute inset-0" aria-hidden="true">
        {WORK_SLIDES.map((s, i) => (
          <div
            key={s.title}
            className={`absolute inset-0 transition-all duration-[1400ms] ease-[cubic-bezier(.19,1,.22,1)] ${
              i === ws ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.08]'
            }`}
          >
            {/* Real <img> rather than a CSS background: these are owned project
                covers, and a background-image is invisible to image search and
                carries no alt text. */}
            <img
              src={s.img}
              alt={`${s.title} — ${s.cat}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(96deg,rgba(6,6,6,.86) 0%,rgba(6,6,6,.34) 46%,transparent 100%),linear-gradient(180deg,rgba(6,6,6,.60) 0%,transparent 24%,transparent 70%,rgba(6,6,6,.86) 100%)',
          }}
        />
      </div>

      <div className="relative z-[2] max-w-shell mx-auto px-10 w-full flex-1 flex flex-col" style={{ paddingTop: 108, paddingBottom: 34 }}>
        <div className="flex items-end justify-between gap-8 flex-wrap mb-[clamp(20px,3vh,44px)] reveal">
          <div>
            <p className="sec-kicker inline-flex items-center gap-[10px] text-[.68rem] font-semibold tracking-[.22em] uppercase text-rv mb-[10px]">
              Impact Architecture
            </p>
            <h2 className="font-bebas uppercase tracking-[.03em] leading-[.94]" style={{ fontSize: 'clamp(2rem,4.2vw,3.6rem)' }}>
              Selected Projects &amp; Digital Commerce Experience
            </h2>
          </div>
          <p className="hidden lg:block max-w-[340px] text-[rgba(244,244,244,.60)] text-[.94rem] leading-[1.7]">
            Cinematic case studies built around strategy, measurement, and premium execution.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-[clamp(20px,4vw,70px)]">
          {/* Slide content */}
          <div className="relative w-full" style={{ minHeight: 'clamp(280px,38vh,420px)' }}>
            {WORK_SLIDES.map((s, i) => (
              <div
                key={s.title}
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-[750ms] ease-[cubic-bezier(.19,1,.22,1)] ${
                  i === ws ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-7 pointer-events-none'
                }`}
              >
                <p className="sec-kicker inline-flex items-center gap-[10px] text-[.68rem] font-bold tracking-[.22em] uppercase text-rv mb-4">
                  {s.cat}
                </p>
                <h3
                  className="font-bebas uppercase tracking-[.03em] leading-[.95] mb-5 max-w-[14ch]"
                  style={{ fontSize: 'clamp(2.4rem,5.2vw,4.6rem)' }}
                >
                  {s.title}
                </h3>
                <p className="text-[rgba(244,244,244,.62)] leading-[1.76] max-w-[480px] mb-8" style={{ fontSize: 'clamp(.92rem,1.2vw,1.04rem)' }}>
                  {s.desc}
                </p>
                <div>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener"
                    className="btn-arr inline-flex items-center gap-2 h-[50px] px-7 rounded bg-red text-white border border-red text-[.74rem] font-bold tracking-[.10em] uppercase whitespace-nowrap no-underline transition-all hover:bg-rv hover:border-rv hover:shadow-[0_16px_48px_rgba(200,16,46,.32)] hover:-translate-y-[2px] active:scale-[.95] touch-manipulation"
                  >
                    View Case Study
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Big digit */}
          <div
            className="relative hidden md:block select-none pr-[clamp(0px,1.5vw,28px)]"
            aria-hidden="true"
            style={{ animation: 'fl 7s ease-in-out infinite' }}
          >
            <div className="absolute -inset-14 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(200,16,46,.16) 0%,transparent 65%)' }} />
            <div className="relative overflow-hidden" style={{ fontSize: 'clamp(9rem,18vw,20rem)', width: '1.18em', height: '.86em' }}>
              {WORK_SLIDES.map((s, i) => (
                <span
                  key={s.title}
                  className={`ws-digit absolute inset-0 text-right transition-all duration-[850ms] ease-[cubic-bezier(.19,1,.22,1)] ${
                    i === ws ? 'translate-y-0 opacity-100' : i < ws ? '-translate-y-[72%] opacity-0' : 'translate-y-[72%] opacity-0'
                  }`}
                >
                  {pad(i + 1)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-6 flex-wrap pt-[clamp(16px,2.5vh,30px)] border-t border-[rgba(255,255,255,.08)] mt-[clamp(16px,2.5vh,30px)] reveal">
          <div className="flex items-center gap-3">
            <button className="ws-arrow" onClick={() => go(ws - 1)} aria-label="Previous project">
              ←
            </button>
            <button className="ws-arrow" onClick={() => go(ws + 1)} aria-label="Next project">
              →
            </button>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-[7px]">
              {WORK_SLIDES.map((s, i) => (
                <button
                  key={s.title}
                  className={`ws-bar ${i === ws ? 'on' : ''}`}
                  style={{ width: 26 }}
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <span className="font-bebas text-[1.1rem] tracking-[.12em] text-[rgba(244,244,244,.50)] whitespace-nowrap">
              <span className="text-rv">{pad(ws + 1)}</span>
              &nbsp;/&nbsp;
              <span>{pad(WORK_SLIDES.length)}</span>
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-9">
            {WORK_METRICS.map((m) => (
              <div key={m.label} className="flex items-baseline gap-[10px]">
                <span className="font-bebas text-rv text-[1.7rem] leading-none tracking-[.02em]">
                  <span data-count={m.count}>0</span>
                  {m.suffix}
                </span>
                <span className="text-[.64rem] font-semibold tracking-[.14em] uppercase text-[rgba(244,244,244,.55)]">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
