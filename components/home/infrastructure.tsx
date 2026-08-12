'use client';

import { useEffect, useRef } from 'react';
import { CWV_TARGETS, INFRA_LAYERS, PERF_AREAS } from '../../lib/site';
import { Button, Container, SectionHeading } from '../ui';
import { ArrowIcon } from '../ui/icons';
import { Reveal, RevealGroup, RevealItem } from '../ui/reveal';
import { useUI } from '../ui-context';

/**
 * §10 + §13 — Server Infrastructure & Performance Engineering.
 *
 * This is the one place Anime.js earns its keep: an imperative SVG connector
 * draw sequenced against layer entrances, which Framer Motion variants express
 * poorly. Everything React-state-driven elsewhere stays on Motion (MASTER.md §5).
 *
 * The diagram is HTML text with an SVG *overlay* rather than an SVG/canvas
 * drawing. Layer names and roles therefore live in the static HTML — §35 forbids
 * hiding primary information inside animation.
 */
function ArchitectureDiagram() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Content renders visible by default. Motion is added only when we know we
    // can also remove it — if JS never runs, nothing is hidden.
    if (reduced) return;

    const rows = Array.from(el.querySelectorAll<HTMLElement>('[data-layer]'));
    const connectors = el.querySelectorAll<SVGPathElement>('[data-connector]');
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        observer.disconnect();

        // Anime.js is ~18kB and this section sits well below the fold, so it is
        // fetched only once the diagram is actually about to animate — never on
        // initial load, and never at all under reduced motion.
        void import('animejs').then(({ animate, createDrawable, createTimeline, stagger }) => {
          const tl = createTimeline({ defaults: { ease: 'outExpo' } });
          tl.add(rows, { opacity: [0, 1], y: [16, 0], duration: 520, delay: stagger(90) }, 0);

          const drawables = createDrawable(connectors);
          if (drawables.length) {
            animate(drawables, {
              draw: ['0 0', '0 1'],
              duration: 620,
              delay: stagger(90, { start: 180 }),
              ease: 'outExpo',
            });
          }
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className="relative">
      <ol className="relative space-y-2">
        {INFRA_LAYERS.map((layer, i) => (
          <li key={layer.label} data-layer className="relative">
            <div className="rounded-md border border-line bg-gradient-to-r from-white/[.04] to-transparent p-5 transition-colors duration-200 hover:border-accent/30 sm:p-6">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span aria-hidden="true" className="font-bebas text-[.95rem] tracking-[.16em] text-accent-bright">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-bebas text-[clamp(1.15rem,1.6vw,1.5rem)] uppercase tracking-[.04em] text-ink">
                  {layer.label}
                </h4>
              </div>
              <p className="mt-2 max-w-[560px] text-[.9rem] leading-[1.65] text-ink-secondary">{layer.role}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-2.5 py-1 text-[.63rem] font-semibold uppercase tracking-[.1em] text-ink-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Connector into the next layer — decorative, hidden from AT */}
            {i < INFRA_LAYERS.length - 1 && (
              <svg
                aria-hidden="true"
                width="2"
                height="10"
                viewBox="0 0 2 10"
                className="mx-auto block overflow-visible"
              >
                <path data-connector d="M1 0 L1 10" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Infrastructure() {
  const { setContactOpen } = useUI();

  return (
    <section id="infrastructure" aria-labelledby="infrastructure-title" className="relative overflow-hidden bg-bg py-section">
      <Container>
        <Reveal>
          <SectionHeading
            id="infrastructure-title"
            eyebrow="Infrastructure"
            title="Server Infrastructure & Performance Engineering"
            lede="Commerce performance is an architecture problem before it is a code problem. This is the stack I work across, and the layers where load is actually won or lost."
          />
        </Reveal>

        <div className="mt-[clamp(48px,6vw,72px)] grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:gap-16">
          <div>
            <h3 className="mb-6 text-label font-bold uppercase tracking-[.24em] text-ink-muted">Request path, top to bottom</h3>
            <ArchitectureDiagram />
          </div>

          <div>
            <h3 className="mb-6 text-label font-bold uppercase tracking-[.24em] text-ink-muted">Performance engineering</h3>

            {/* Cited industry thresholds, explicitly attributed — not site metrics */}
            <div className="mb-8 rounded-md border border-line bg-surface p-6">
              <p className="mb-5 text-[.8rem] leading-[1.6] text-ink-muted">
                Work is measured against Google&rsquo;s published Core Web Vitals thresholds for a
                &ldquo;good&rdquo; experience. These are the industry targets, not measurements of this page.
              </p>
              <dl className="grid grid-cols-3 gap-4">
                {CWV_TARGETS.map((m) => (
                  <div key={m.metric}>
                    <dt className="font-bebas text-[1.05rem] tracking-[.1em] text-ink-muted">{m.metric}</dt>
                    <dd className="mt-1 font-bebas text-[clamp(1.3rem,2vw,1.7rem)] leading-none text-accent-bright">
                      {m.target}
                    </dd>
                    <dd className="mt-1.5 text-[.68rem] leading-[1.4] text-ink-muted">{m.name}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <RevealGroup as="ul" className="space-y-px overflow-hidden rounded-md border border-line" each={0.05}>
              {PERF_AREAS.map((a) => (
                <RevealItem key={a.title} as="li" className="bg-surface p-5 transition-colors duration-200 hover:bg-elevated">
                  <h4 className="text-[.82rem] font-bold uppercase tracking-[.12em] text-ink">{a.title}</h4>
                  <p className="mt-1.5 text-[.875rem] leading-[1.6] text-ink-secondary">{a.desc}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        <div className="mt-[clamp(40px,5vw,64px)] flex flex-col items-start gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[520px] text-[.95rem] leading-[1.7] text-ink-muted">
            Slow checkout, failing migrations, a database that buckles under campaign traffic: these are usually
            diagnosable in a single conversation.
          </p>
          <Button onClick={() => setContactOpen(true)} className="group">
            Discuss Your Technical Challenge
            <ArrowIcon className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
