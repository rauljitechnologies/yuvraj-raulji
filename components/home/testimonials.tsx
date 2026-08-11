'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TESTIMONIALS } from '../../lib/site';

export function Testimonials() {
  const [tq, setTq] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setTq((i) => (i + 1) % TESTIMONIALS.length), 5000);
  }, []);

  useEffect(() => {
    play();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [play]);

  const go = (i: number) => {
    setTq((i + TESTIMONIALS.length) % TESTIMONIALS.length);
    play();
  };

  return (
    <section
      className="relative overflow-hidden bg-bg flex flex-col justify-center"
      style={{ minHeight: '100vh', padding: 'clamp(96px,12vh,130px) 0 clamp(40px,6vh,70px)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%,rgba(200,16,46,.10) 0%,transparent 100%),radial-gradient(ellipse 40% 40% at 85% 90%,rgba(140,8,22,.10) 0%,transparent 100%)',
        }}
      />

      <div className="relative max-w-shell mx-auto px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(280px,.55fr)] gap-10 items-end mb-[clamp(28px,4vh,56px)] reveal">
          <div>
            <p className="sec-kicker inline-flex items-center gap-[10px] text-[.68rem] font-semibold tracking-[.22em] uppercase text-rv mb-[10px]">
              Testimonials
            </p>
            <h2 className="font-bebas uppercase tracking-[.03em] leading-[.94]" style={{ fontSize: 'clamp(2.2rem,5.5vw,4.8rem)' }}>
              Trusted Signal
            </h2>
          </div>
          <p className="text-[rgba(244,244,244,.60)]" style={{ fontSize: 'clamp(.92rem,1.2vw,1.06rem)', lineHeight: 1.74 }}>
            A technology partner for organizations that value precision, premium execution, and measurable transformation.
          </p>
        </div>

        <div className="relative text-center reveal" style={{ minHeight: 'clamp(300px,40vh,440px)' }}>
          <span
            className="tst-mark absolute left-1/2 -translate-x-1/2 -top-[clamp(20px,3vh,40px)] pointer-events-none"
            aria-hidden="true"
            style={{ fontSize: 'clamp(11rem,22vw,20rem)' }}
          >
            &ldquo;
          </span>

          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.n}
              className={`flex flex-col items-center justify-center transition-all duration-[700ms] ease-[cubic-bezier(.19,1,.22,1)] m-0 ${
                i === tq ? 'opacity-100 translate-y-0 delay-150 relative' : 'opacity-0 translate-y-6 absolute inset-0 pointer-events-none'
              }`}
              style={{ minHeight: 'inherit' }}
            >
              <div className="flex items-center gap-[6px] mb-7" aria-label="5 star rating">
                {[0, 1, 2, 3, 4].map((s) => (
                  <svg key={s} className="w-[15px] h-[15px] text-rv" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
                  </svg>
                ))}
              </div>

              <blockquote
                className="font-medium text-[rgba(244,244,244,.92)] max-w-[880px] mx-auto mb-9 m-0"
                style={{ fontSize: 'clamp(1.25rem,2.4vw,2.05rem)', lineHeight: 1.5, letterSpacing: '.005em' }}
              >
                {t.q}
              </blockquote>

              <figcaption className="flex items-center justify-center gap-4">
                <span className="tst-ava" aria-hidden="true">
                  {t.m}
                </span>
                <span className="text-left">
                  <span className="block font-bebas text-[1.15rem] tracking-[.08em] uppercase text-[#f4f4f4] leading-tight">{t.n}</span>
                  <span className="block text-[.68rem] font-semibold tracking-[.18em] uppercase text-[rgba(232,25,44,.85)] mt-[3px]">{t.r}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="flex items-center justify-center gap-7 mt-[clamp(20px,3vh,40px)] reveal">
          <button className="ws-arrow" onClick={() => go(tq - 1)} aria-label="Previous testimonial">
            ←
          </button>
          <div className="flex items-center gap-[6px]">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.n}
                type="button"
                className={`ind-seg tst-seg ${i === tq ? 'on' : i < tq ? 'done' : ''}`}
                onClick={() => go(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button className="ws-arrow" onClick={() => go(tq + 1)} aria-label="Next testimonial">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
