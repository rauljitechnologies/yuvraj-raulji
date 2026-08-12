'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { DUR_STORY, EASE_OUT, fadeUp, reducedVariants, staggerChildren } from '../../lib/motion';
import { HERO_STATS, MARQUEE_ITEMS } from '../../lib/site';
import { Button, Container } from '../ui';
import { useUI } from '../ui-context';

const BUSINESS_MODELS = ['B2B', 'B2C', 'D2C', 'Marketplace'] as const;

const CREDENTIALS = [
  'Magento 2',
  'Shopify',
  'Headless Commerce',
  'Modern Web',
  'Generative AI',
  'Agentic AI',
] as const;

function MarqueeRun() {
  return (
    <span className="inline-flex items-center gap-7 whitespace-nowrap px-7 text-[.68rem] font-semibold uppercase tracking-[.16em] text-ink-faint">
      {MARQUEE_ITEMS.map((t) => (
        <span key={t} className="inline-flex items-center gap-7">
          {t} <em aria-hidden="true" className="not-italic text-accent-bright">·</em>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const { setContactOpen } = useUI();
  const reduced = useReducedMotion();

  // Level 3 entrance — the one place a long duration is justified.
  const group = reduced ? reducedVariants : staggerChildren(0.08, 0.1);
  const item = reduced ? reducedVariants : fadeUp;

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-bg" aria-labelledby="hero-title">
      <canvas id="heroC" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />

      {/* Ambient crimson wash + technical grid — decorative, never carries meaning */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 65% at 0% 45%, var(--accent-soft) 0%, transparent 100%), radial-gradient(ellipse 32% 42% at 100% 85%, rgba(140,8,22,.14) 0%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[.14]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,16,46,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(200,16,46,.08) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 100%)',
        }}
      />

      <Container className="relative z-[2] flex flex-1 items-center">
        <div className="grid w-full items-center gap-12 py-[clamp(96px,12vh,150px)] lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
          {/* ── Editorial column ── */}
          <motion.div initial="hidden" animate="visible" variants={group}>
            <motion.p
              variants={item}
              className="flex items-center gap-3 text-label font-bold uppercase tracking-[.28em] text-ink-secondary"
            >
              <span aria-hidden="true" className="h-px w-10 bg-accent" />
              Yuvraj Raulji
            </motion.p>

            <motion.h1
              variants={item}
              id="hero-title"
              className="mt-6 font-bebas text-display uppercase leading-[.92] tracking-[.02em] text-ink"
            >
              E-commerce &amp; Digital
              <br />
              Transformation{' '}
              <span className="text-accent-bright">Consultant</span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-[560px] text-body-lg leading-[1.7] text-ink-secondary">
              Technology Strategist specializing in Magento&nbsp;2, Shopify, Headless Commerce, Modern Web,
              Generative AI and Agentic AI.
            </motion.p>

            <motion.p variants={item} className="mt-4 max-w-[560px] text-[.95rem] leading-[1.75] text-ink-muted">
              I help B2B, B2C, D2C and marketplace businesses modernize digital commerce, make better
              technology decisions, and build scalable digital ecosystems across commerce, architecture,
              infrastructure, analytics and AI.
            </motion.p>

            {/* Business models — text, not color, carries the meaning */}
            <motion.ul variants={item} className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
              <li className="text-label font-bold uppercase tracking-[.2em] text-ink-faint">9+ Years</li>
              <li aria-hidden="true" className="h-3 w-px bg-line-strong" />
              {BUSINESS_MODELS.map((m) => (
                <li key={m} className="text-label font-bold uppercase tracking-[.2em] text-ink-muted">
                  {m}
                </li>
              ))}
              <li aria-hidden="true" className="h-3 w-px bg-line-strong" />
              <li className="text-label font-bold uppercase tracking-[.2em] text-ink-muted">
                Commerce + Technology + AI
              </li>
            </motion.ul>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <Button onClick={() => setContactOpen(true)}>Book a Consultation</Button>
              <Button href="#services" variant="secondary">
                Explore My Expertise
              </Button>
            </motion.div>

            {/* Proof strip */}
            <motion.dl
              variants={item}
              className="mt-11 grid grid-cols-2 overflow-hidden rounded-md border border-line sm:grid-cols-4"
            >
              {HERO_STATS.map((s) => (
                <div key={s.label} className="border-b border-r border-line px-5 py-4 last:border-r-0 sm:border-b-0">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <strong className="block font-bebas text-[clamp(1.5rem,2.4vw,2.1rem)] leading-none tracking-[.04em] text-accent-bright">
                      {s.value}
                    </strong>
                    <span aria-hidden="true" className="mt-1 block text-[.7rem] font-semibold uppercase tracking-[.12em] text-ink-muted">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* ── Portrait column ── */}
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0.01 : DUR_STORY, ease: EASE_OUT, delay: reduced ? 0 : 0.15 }}
            className="relative mx-auto w-full max-w-[520px] lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line">
              <Image
                src="/assets/yuvraj-raulji.jpg"
                alt="Yuvraj Raulji, E-commerce and Digital Transformation Consultant"
                fill
                priority
                sizes="(max-width: 1023px) 90vw, 45vw"
                className="object-cover object-top"
              />
              {/* Grade the portrait into the page ground */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, var(--bg) 2%, transparent 45%)' }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
              />
            </div>

            {/* Capability rail — real crawlable text, not baked into an image */}
            <ul className="mt-5 flex flex-wrap gap-2">
              {CREDENTIALS.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-line px-3 py-1.5 text-[.66rem] font-semibold uppercase tracking-[.12em] text-ink-muted"
                >
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>

      {/* Technology marquee */}
      <div className="relative z-[2] overflow-hidden border-t border-line bg-[rgba(6,6,6,.9)] py-[13px]" aria-hidden="true">
        <div className="marquee-track">
          <MarqueeRun />
          <MarqueeRun />
        </div>
      </div>
    </section>
  );
}
