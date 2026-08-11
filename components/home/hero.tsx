'use client';

import { useEffect, useState } from 'react';
import { HERO_CHIPS, HERO_STATS, MARQUEE_ITEMS, ROTATING_ITEMS } from '../../lib/site';
import { useUI } from '../ui-context';

const chipCls =
  'hchip absolute inline-flex items-center gap-[7px] h-[34px] px-[13px] rounded-full border border-[rgba(200,16,46,.38)] bg-[rgba(6,6,6,.82)] backdrop-blur-xl text-[.66rem] font-semibold tracking-[.10em] uppercase text-[rgba(244,244,244,.88)]';

function MarqueeRun() {
  return (
    <span className="inline-flex items-center gap-7 px-7 text-[.68rem] font-semibold tracking-[.16em] uppercase text-[rgba(244,244,244,.36)] whitespace-nowrap">
      {MARQUEE_ITEMS.map((t) => (
        <span key={t} className="inline-flex items-center gap-7">
          {t} <em className="not-italic text-rv">·</em>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const { setContactOpen } = useUI();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ROTATING_ITEMS.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-bg">
      <canvas id="heroC" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 0% 50%,rgba(200,16,46,.18) 0%,transparent 100%),radial-gradient(ellipse 30% 40% at 100% 80%,rgba(140,8,22,.14) 0%,transparent 100%)',
        }}
      />

      <div
        className="hero-grid absolute inset-0 pointer-events-none opacity-[.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,16,46,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(200,16,46,.08) 1px,transparent 1px)',
          backgroundSize: '70px 70px',
        }}
        aria-hidden="true"
      />

      {/* Portrait */}
      <div className="hero-portrait absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden pointer-events-none hidden md:block" aria-hidden="true">
        <div className="w-full h-full" style={{ background: "url('/assets/yuvraj-raulji.jpg') center top/cover no-repeat" }} />
        <div className="absolute inset-0 z-[2]">
          {HERO_CHIPS.map((c) => (
            <div key={c.label} className={`${chipCls} ${c.pos}`} style={{ animation: 'chipF 6s ease-in-out infinite' }}>
              {c.label}
            </div>
          ))}
        </div>
      </div>

      {/* Left column */}
      <div
        className="relative z-[2] flex-1 flex items-center w-full md:w-1/2"
        style={{ padding: '120px clamp(24px,3vw,48px) 56px clamp(40px,4.5vw,80px)' }}
      >
        <div className="w-full">
          <h1
            className="font-bebas flex items-baseline gap-[.22em] whitespace-nowrap mb-5 uppercase tracking-[.06em] leading-[.92]"
            style={{ fontSize: 'clamp(2.8rem,5vw,5rem)' }}
            aria-label="Yuvraj Raulji"
          >
            <span className="ln">
              <span>Yuvraj</span>
            </span>
            <span className="ln">
              <span style={{ animationDelay: '.12s' }}>Raulji</span>
            </span>
          </h1>

          <p className="hero-role flex items-center gap-[10px] text-[.70rem] font-bold tracking-[.24em] uppercase text-[rgba(244,244,244,.48)] mb-3">
            Specialising In
          </p>

          {/* Rotator */}
          <div
            className="relative font-bebas text-rv uppercase tracking-[.03em] overflow-hidden w-full"
            style={{ fontSize: 'clamp(1.7rem,3.6vw,2.9rem)', minHeight: 'clamp(52px,5.5vw,68px)', marginBottom: 14 }}
          >
            {ROTATING_ITEMS.map((item, i) => (
              <span
                key={item}
                className={`absolute top-0 left-0 w-full leading-[1.12] transition-all duration-500 ${
                  i === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center gap-[7px] mb-7">
            {ROTATING_ITEMS.map((item, i) => (
              <button
                key={item}
                onClick={() => setIdx(i)}
                className="rounded-full transition-all duration-300 focus:outline-none"
                style={
                  i === idx
                    ? { width: 22, height: 5, background: '#e8192c', boxShadow: '0 0 8px rgba(232,25,44,.50)' }
                    : { width: 5, height: 5, background: 'rgba(244,244,244,.20)' }
                }
                aria-label={item}
              />
            ))}
          </div>

          <p className="text-[1.02rem] text-[rgba(244,244,244,.60)] leading-[1.76] max-w-[520px] mb-8">
            Crafting luxury digital brand identities and high-performance e-commerce architectures — Magento 2, Shopify, and bespoke AI-powered commerce systems built for brands that refuse to be ordinary.
          </p>

          <div className="flex items-center flex-wrap gap-3 mb-11">
            <button
              onClick={() => setContactOpen(true)}
              className="btn-arr inline-flex items-center gap-2 h-[52px] px-7 rounded bg-red text-white border border-red text-[.76rem] font-bold tracking-[.10em] uppercase whitespace-nowrap transition-all hover:bg-rv hover:border-rv hover:shadow-[0_16px_48px_rgba(200,16,46,.32)] hover:-translate-y-[2px] active:scale-[.95] touch-manipulation"
            >
              Begin Your Project
            </button>
            <a
              href="#work"
              className="btn-arr inline-flex items-center gap-2 h-[52px] px-7 rounded bg-transparent text-[#f4f4f4] border border-[rgba(255,255,255,.22)] text-[.76rem] font-bold tracking-[.10em] uppercase whitespace-nowrap transition-all hover:border-[rgba(200,16,46,.32)] hover:shadow-[0_16px_48px_rgba(200,16,46,.12)] hover:-translate-y-[2px] active:scale-[.95] touch-manipulation"
            >
              View Work
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-stretch border border-[rgba(255,255,255,.08)] rounded overflow-hidden">
            {HERO_STATS.map((s, i) => (
              <div
                key={s.label}
                className={`flex-1 px-[18px] py-[16px] text-center ${
                  i < HERO_STATS.length - 1 ? 'border-r border-[rgba(255,255,255,.08)]' : ''
                }`}
              >
                <strong className="block font-bebas text-rv leading-none tracking-[.04em]" style={{ fontSize: 'clamp(1.5rem,2.4vw,2.1rem)' }}>
                  {s.value}
                </strong>
                <span className="block mt-1 text-[.72rem] font-semibold tracking-[.12em] uppercase text-[rgba(244,244,244,.60)]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#expertise"
        className="scroll-h absolute z-[2] bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[7px] text-[.60rem] font-semibold tracking-[.24em] uppercase text-[rgba(244,244,244,.36)] pb-14"
        aria-label="Scroll to expertise"
      >
        Scroll
      </a>

      {/* Marquee */}
      <div className="relative z-[2] border-t border-[rgba(255,255,255,.08)] bg-[rgba(6,6,6,.90)] overflow-hidden py-[13px]" aria-hidden="true">
        <div className="marquee-track">
          <MarqueeRun />
          <MarqueeRun />
        </div>
      </div>
    </section>
  );
}
