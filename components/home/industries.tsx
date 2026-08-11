'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { INDUSTRIES } from '../../lib/site';

const pad = (n: number) => String(n).padStart(2, '0');

export function Industries() {
  const [ind, setInd] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setInd((i) => (i + 1) % INDUSTRIES.length), 3200);
  }, []);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  useEffect(() => {
    play();
    return stop;
  }, [play, stop]);

  return (
    <section
      className="relative overflow-hidden bg-bg flex flex-col justify-center"
      style={{ minHeight: '100vh', padding: 'clamp(96px,12vh,130px) 0 clamp(40px,6vh,70px)' }}
    >
      <canvas id="netC" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-shell mx-auto px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(280px,.55fr)] gap-10 items-end mb-[clamp(28px,4vh,52px)] reveal">
          <div>
            <p className="sec-kicker inline-flex items-center gap-[10px] text-[.68rem] font-semibold tracking-[.22em] uppercase text-rv mb-[10px]">
              Global Industries
            </p>
            <h2 className="font-bebas uppercase tracking-[.03em] leading-[.94]" style={{ fontSize: 'clamp(2.2rem,5.5vw,4.8rem)' }}>
              Industries &amp; Brands
            </h2>
          </div>
          <p className="text-[rgba(244,244,244,.60)]" style={{ fontSize: 'clamp(.92rem,1.2vw,1.06rem)', lineHeight: 1.74 }}>
            Delivering enterprise commerce, SEO, server optimization, and AI automation across 12+ industries — from D2C brands to large-scale B2B enterprises.
          </p>
        </div>
      </div>

      <div className="relative w-full">
        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(320px,.78fr)_1.22fr] gap-[clamp(24px,3vw,56px)] items-stretch reveal"
          style={{ paddingLeft: 'max(40px, calc((100vw - 1400px) / 2 + 40px))' }}
        >
          {/* List */}
          <div className="flex flex-col justify-center order-2 lg:order-1 pr-10 lg:pr-0">
            {INDUSTRIES.map((it, i) => (
              <button
                key={it.t}
                type="button"
                className={`ind-it ${i === ind ? 'on' : ''}`}
                onMouseEnter={() => {
                  stop();
                  setInd(i);
                }}
                onMouseLeave={play}
                onClick={() => {
                  setInd(i);
                  play();
                }}
              >
                <span className="ind-num">{pad(i + 1)}</span>
                <span className="ind-name">{it.t}</span>
                <svg className="ind-a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            ))}
          </div>

          {/* Showcase */}
          <div
            className="relative rounded-l-2xl overflow-hidden border border-r-0 border-[rgba(255,255,255,.10)] order-1 lg:order-2 shadow-[0_40px_120px_rgba(0,0,0,.55)]"
            style={{ minHeight: 'clamp(340px,56vh,620px)' }}
            aria-hidden="true"
          >
            {INDUSTRIES.map((it, i) => (
              <div
                key={it.t}
                className={`absolute inset-0 transition-all duration-[1100ms] ease-[cubic-bezier(.19,1,.22,1)] ${
                  i === ind ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.07]'
                }`}
              >
                <div className="absolute inset-0" style={{ background: `url('${it.img}') center/cover` }} />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg,rgba(6,6,6,.66) 0%,rgba(6,6,6,.18) 32%,rgba(6,6,6,.30) 58%,rgba(6,6,6,.96) 100%),linear-gradient(90deg,rgba(6,6,6,.60),transparent 52%)',
                  }}
                />
              </div>
            ))}

            {/* Counter */}
            <div className="absolute top-0 right-0 pt-5 pr-7 pb-8 pl-12" style={{ background: 'radial-gradient(ellipse at top right,rgba(6,6,6,.55),transparent 72%)' }}>
              <div className="relative overflow-hidden" style={{ fontSize: 'clamp(4.2rem,7vw,7rem)', width: '1.28em', height: '.88em' }}>
                {INDUSTRIES.map((it, i) => (
                  <span
                    key={it.t}
                    className={`ws-digit absolute inset-0 text-right transition-all duration-[700ms] ease-[cubic-bezier(.19,1,.22,1)] ${
                      i === ind ? 'translate-y-0 opacity-100' : i < ind ? '-translate-y-[75%] opacity-0' : 'translate-y-[75%] opacity-0'
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                ))}
              </div>
              <p className="text-right font-bebas text-[1rem] tracking-[.14em] text-[rgba(244,244,244,.55)] mt-1">/ 08</p>
            </div>

            {/* Caption */}
            <div className="absolute left-0 right-0 bottom-0 px-[clamp(22px,3vw,40px)] pt-[clamp(20px,3vw,38px)] pb-[clamp(40px,4.5vw,58px)]">
              {INDUSTRIES.map((it, i) => (
                <div
                  key={it.t}
                  className={`transition-all duration-[650ms] ease-[cubic-bezier(.19,1,.22,1)] ${
                    i === ind
                      ? 'opacity-100 translate-y-0 delay-150 relative'
                      : 'opacity-0 translate-y-5 absolute inset-x-[clamp(22px,3vw,40px)] bottom-[clamp(40px,4.5vw,58px)] pointer-events-none'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    {it.d.split('·').map((tag) => (
                      <span key={tag} className="ind-chip">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bebas uppercase tracking-[.03em] leading-[.95] mb-4" style={{ fontSize: 'clamp(2.2rem,4vw,3.8rem)' }}>
                    {it.t}
                  </h3>
                  <p className="text-[rgba(244,244,244,.78)] leading-[1.72] max-w-[520px]" style={{ fontSize: 'clamp(.92rem,1.15vw,1.05rem)' }}>
                    {it.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Progress segments */}
            <div className="absolute bottom-[18px] left-[clamp(22px,3vw,40px)] right-[clamp(22px,3vw,40px)] flex items-center gap-[6px]">
              {INDUSTRIES.map((it, i) => (
                <span key={it.t} className={`ind-seg ${i === ind ? 'on' : i < ind ? 'done' : ''}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
