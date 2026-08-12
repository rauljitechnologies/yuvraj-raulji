'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { WORK_METRICS, WORK_SLIDES } from '../../lib/site';
import { Container, Eyebrow, SectionHeading } from '../ui';
import { Reveal } from '../ui/reveal';

/**
 * §18 Selected Projects. Migrated to the design tokens.
 *
 * The full-bleed viewport-height layout is deliberate and stays: `py-section`
 * is not used here because the top padding exists to clear the fixed header,
 * not to space a content band.
 */

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
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative flex min-h-screen flex-col overflow-hidden bg-bg"
    >
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

      <Container className="relative z-[2] flex flex-1 flex-col pb-[34px] pt-[108px]">
        <Reveal className="mb-[clamp(20px,3vh,44px)] flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            id="work-title"
            eyebrow="Selected Work"
            title={<>Selected Projects &amp; Digital Commerce Experience</>}
          />
          <p className="hidden max-w-[340px] text-[.94rem] leading-[1.7] text-ink-secondary lg:block">
            Cinematic case studies built around strategy, measurement, and premium execution.
          </p>
        </Reveal>

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
                <Eyebrow className="mb-4">{s.cat}</Eyebrow>
                <h3
                  className="mb-5 max-w-[14ch] font-bebas uppercase leading-[.95] tracking-[.03em] text-ink"
                  style={{ fontSize: 'clamp(2.4rem,5.2vw,4.6rem)' }}
                >
                  {s.title}
                </h3>
                <p className="mb-8 max-w-[480px] leading-[1.76] text-ink-secondary" style={{ fontSize: 'clamp(.92rem,1.2vw,1.04rem)' }}>
                  {s.desc}
                </p>
                <div>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener"
                    className="btn-arr inline-flex h-[50px] touch-manipulation items-center gap-2 whitespace-nowrap rounded-sm border border-accent bg-accent px-7 text-[.74rem] font-bold uppercase tracking-[.10em] text-white no-underline transition-[background-color,border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-[2px] hover:border-accent-bright hover:bg-accent-bright hover:shadow-accent active:scale-[.95]"
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
        <Reveal className="mt-[clamp(16px,2.5vh,30px)] flex flex-wrap items-center justify-between gap-6 border-t border-line pt-[clamp(16px,2.5vh,30px)]">
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
            <span className="whitespace-nowrap font-bebas text-[1.1rem] tracking-[.12em] text-ink-muted">
              <span className="text-accent-bright">{pad(ws + 1)}</span>
              &nbsp;/&nbsp;
              <span>{pad(WORK_SLIDES.length)}</span>
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-9">
            {WORK_METRICS.map((m) => (
              <div key={m.label} className="flex items-baseline gap-[10px]">
                <span className="font-bebas text-[1.7rem] leading-none tracking-[.02em] text-accent-bright">
                  <span data-count={m.count}>0</span>
                  {m.suffix}
                </span>
                <span className="text-[.64rem] font-semibold uppercase tracking-[.14em] text-ink-muted">{m.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
