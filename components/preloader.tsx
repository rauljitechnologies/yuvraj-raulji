'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Port of the #ldr overlay + its inline progress script. The counter animates
 * 0→100 over 1s and the whole overlay lifts away at 1.5s, matching the original
 * setTimeout in the root x-init.
 */
export function Preloader({ tagline = 'E-commerce & Digital Transformation' }: { tagline?: string }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
    const hide = setTimeout(() => setGone(true), 1500);

    if (reduced) {
      setPct(100);
      return () => clearTimeout(hide);
    }

    const t0 = performance.now();
    const DUR = 1000;
    let raf = 0;
    const tick = (n: number) => {
      const k = Math.min((n - t0) / DUR, 1);
      setPct(Math.round((1 - Math.pow(1 - k, 3)) * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      clearTimeout(hide);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      id="ldr"
      className={`fixed inset-0 z-[1200] bg-[#020202] transition-all duration-[900ms] overflow-hidden ${
        gone ? 'opacity-0 translate-y-[-100%] invisible' : ''
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(.76,0,.24,1)' }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 55% 60% at 50% 58%,rgba(229, 9, 32,.13),transparent 72%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundImage:
              'linear-gradient(rgba(229, 9, 32,.30) 1px,transparent 1px),linear-gradient(90deg,rgba(229, 9, 32,.30) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <span className="ldr-meta absolute top-7 left-7">Yuvraj Raulji</span>
      <span className="ldr-meta absolute top-7 right-7">Portfolio · 2026</span>
      <span className="ldr-meta absolute bottom-7 left-7 hidden sm:block">Vadodara, India</span>
      <div
        className="absolute bottom-7 right-7 font-display text-rv"
        style={{ fontSize: '1.5rem', letterSpacing: '.10em', lineHeight: 1 }}
      >
        <span>{String(pct).padStart(2, '0')}</span>
        <span style={{ color: 'rgba(240, 38, 60,.50)' }}>%</span>
      </div>

      <div className="absolute inset-0 grid place-items-center px-6">
        <div className="text-center">
          <div className="overflow-hidden">
            <div
              className="ldr-word font-display"
              style={{
                fontSize: 'clamp(3.4rem,10vw,7.5rem)',
                lineHeight: 0.92,
                letterSpacing: '.04em',
                color: '#f5f5f2',
                animationDelay: '.10s',
              }}
            >
              YUVRAJ
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className="ldr-word font-display"
              style={{
                fontSize: 'clamp(3.4rem,10vw,7.5rem)',
                lineHeight: 0.92,
                letterSpacing: '.04em',
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(240, 38, 60,.90)',
                animationDelay: '.22s',
              }}
            >
              RAULJI
            </div>
          </div>
          <div
            className="mx-auto mt-8 relative overflow-hidden"
            style={{ width: 'min(300px,58vw)', height: '1px', background: 'rgba(255,255,255,.10)' }}
          >
            <div
              ref={barRef}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${pct}%`,
                background: 'linear-gradient(90deg,#e50920,#f0263c)',
                boxShadow: '0 0 16px rgba(240, 38, 60,.60)',
              }}
            />
          </div>
          <p className="ldr-meta mt-5" style={{ color: 'rgba(245, 245, 242,.34)' }}>
            {tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
