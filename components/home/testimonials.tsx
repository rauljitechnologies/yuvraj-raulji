'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TESTIMONIALS } from '../../lib/site';
import { Container, SectionHeading } from '../ui';
import { Reveal } from '../ui/reveal';

/**
 * §19 Client Feedback. Migrated to the design tokens — the heading now uses the
 * shared SectionHeading at `text-h2` rather than a bespoke clamp, and every
 * rgba() text colour maps to a :root token.
 *
 * The section previously had no id and no accessible name; the h2 is now
 * referenced by aria-labelledby.
 */

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
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-bg py-section"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%,var(--accent-soft) 0%,transparent 100%),radial-gradient(ellipse 40% 40% at 85% 90%,rgba(140,8,22,.10) 0%,transparent 100%)',
        }}
      />

      <Container className="relative">
        <Reveal className="mb-[clamp(28px,4vh,56px)] grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_minmax(280px,.55fr)]">
          <SectionHeading id="testimonials-title" eyebrow="Testimonials" title="Client Feedback" className="max-w-none" />
          <p className="text-body-lg leading-[1.74] text-ink-secondary">
            A technology partner for organizations that value precision, premium execution, and measurable transformation.
          </p>
        </Reveal>

        <Reveal className="relative text-center">
          <div className="relative" style={{ minHeight: 'clamp(300px,40vh,440px)' }}>
            <span
              className="tst-mark pointer-events-none absolute left-1/2 -top-[clamp(20px,3vh,40px)] -translate-x-1/2"
              aria-hidden="true"
              style={{ fontSize: 'clamp(11rem,22vw,20rem)' }}
            >
              &ldquo;
            </span>

            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.n}
                className={`m-0 flex flex-col items-center justify-center transition-all duration-[700ms] ease-[cubic-bezier(.19,1,.22,1)] ${
                  i === tq ? 'relative opacity-100 translate-y-0 delay-150' : 'pointer-events-none absolute inset-0 translate-y-6 opacity-0'
                }`}
                style={{ minHeight: 'inherit' }}
              >
                <div className="mb-7 flex items-center gap-[6px]" aria-label="5 star rating">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <svg key={s} className="h-[15px] w-[15px] text-accent-bright" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
                    </svg>
                  ))}
                </div>

                <blockquote
                  className="m-0 mx-auto mb-9 max-w-[880px] font-medium text-ink"
                  style={{ fontSize: 'clamp(1.25rem,2.4vw,2.05rem)', lineHeight: 1.5, letterSpacing: '.005em' }}
                >
                  {t.q}
                </blockquote>

                <figcaption className="flex items-center justify-center gap-4">
                  <span className="tst-ava" aria-hidden="true">
                    {t.m}
                  </span>
                  <span className="text-left">
                    <span className="block font-display text-[1.15rem] uppercase leading-tight tracking-[.08em] text-ink">{t.n}</span>
                    <span className="mt-[3px] block text-label font-semibold uppercase tracking-[.18em] text-accent-bright">{t.r}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-[clamp(20px,3vh,40px)] flex items-center justify-center gap-7">
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
        </Reveal>
      </Container>
    </section>
  );
}
