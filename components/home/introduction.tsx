'use client';

import Link from 'next/link';
import { Container } from '../ui';
import { ArrowIcon } from '../ui/icons';
import { Reveal, RevealGroup, RevealItem } from '../ui/reveal';

/**
 * §8 Personal Introduction — the entity paragraph. Deliberately condensed:
 * /about/ is the canonical biography, so this establishes who and what within a
 * few seconds and links onward rather than duplicating the page.
 *
 * Figures are the confirmed ones (9+ years, 50+ projects); the operational
 * numbers come from Yuvraj's own record. Nothing here is estimated.
 */

const PROOF = [
  { value: '9+', label: 'Years in commerce' },
  { value: '50+', label: 'Projects delivered' },
  { value: '12+', label: 'Multi-store Magento 2 platforms' },
  { value: '500K+', label: 'SKUs under management' },
];

export function Introduction() {
  return (
    <section id="about" aria-labelledby="intro-title" className="relative overflow-hidden bg-bg py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="flex items-center gap-3 text-label font-bold uppercase tracking-[.24em] text-ink-muted">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              Introduction
            </p>
            <h2
              id="intro-title"
              className="mt-5 font-bebas text-h2 uppercase leading-[.98] tracking-[.02em] text-ink"
            >
              Yuvraj Raulji — E-commerce Technology Consultant &amp; Strategist
            </h2>
          </Reveal>

          <div>
            <Reveal>
              <div className="max-w-[680px] space-y-5 text-body-lg leading-[1.8] text-ink-secondary">
                <p>
                  I&rsquo;ve spent <strong className="font-semibold text-ink">9+ years</strong> building commerce
                  platforms for B2B, B2C, D2C and marketplace businesses — Magento&nbsp;2 and Adobe Commerce,
                  Shopify and Shopify Plus, WooCommerce, and headless storefronts on Next.js and React.
                </p>
                <p>
                  The work rarely stops at the platform. It runs down into server infrastructure, caching,
                  database and search performance, and back up through analytics, tracking and technical SEO —
                  because those are the layers that decide whether a commerce site actually holds up under
                  load and converts what it attracts.
                </p>
                <p>
                  More recently that includes deciding where generative and agentic AI genuinely change a
                  commerce operation, and where they are an expensive distraction. Both answers come up
                  regularly.
                </p>
              </div>
            </Reveal>

            <RevealGroup
              as="ul"
              className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line sm:grid-cols-4"
              each={0.05}
            >
              {PROOF.map((p) => (
                <RevealItem key={p.label} as="li" className="bg-surface px-5 py-5">
                  <strong className="block font-bebas text-[clamp(1.5rem,2.4vw,2rem)] leading-none tracking-[.04em] text-accent-bright">
                    {p.value}
                  </strong>
                  <span className="mt-2 block text-[.7rem] font-semibold uppercase leading-[1.35] tracking-[.1em] text-ink-muted">
                    {p.label}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal>
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-2 text-[.78rem] font-bold uppercase tracking-[.12em] text-accent-bright transition-colors duration-200 hover:text-ink"
              >
                Read the full background — roles, projects and credentials
                <ArrowIcon className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
