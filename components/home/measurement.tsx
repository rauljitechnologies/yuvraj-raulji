'use client';

import { ANALYTICS_STACK, SEO_CONNECTIONS, SEO_PILLARS } from '../../lib/site';
import { Button, Container, SectionHeading } from '../ui';
import { ArrowIcon, Icon } from '../ui/icons';
import { Reveal, RevealGroup, RevealItem } from '../ui/reveal';
import { useUI } from '../ui-context';

/**
 * §12 Analytics & Tracking and §14 E-commerce SEO & Organic Growth.
 *
 * Both sections deliberately avoid the logo-wall pattern: §12 requires every
 * capability to state what it is, how it is built and what it changes
 * commercially, and §14 requires SEO to be shown as connected to technology,
 * architecture, performance, analytics, content and conversion.
 */

export function Analytics() {
  return (
    <section id="analytics" aria-labelledby="analytics-title" className="relative overflow-hidden bg-surface py-section">
      <Container>
        <Reveal>
          <SectionHeading
            id="analytics-title"
            eyebrow="Measurement"
            title="Analytics & Tracking"
            lede="Engineer-grade measurement for digital commerce. Most tracking problems are not reporting problems. They are implementation problems that surface months later as numbers nobody trusts."
          />
        </Reveal>

        <RevealGroup as="ul" className="mt-[clamp(44px,5vw,68px)] grid gap-px overflow-hidden rounded-md border border-line sm:grid-cols-2" each={0.05}>
          {ANALYTICS_STACK.map((a) => (
            <RevealItem key={a.title} as="li" className="flex flex-col bg-bg p-7 transition-colors duration-200 hover:bg-elevated">
              <h3 className="font-bebas text-[clamp(1.15rem,1.6vw,1.45rem)] uppercase tracking-[.04em] text-ink">
                {a.title}
              </h3>
              <p className="mt-2.5 text-[.9rem] leading-[1.65] text-ink-secondary">{a.desc}</p>
              <p className="mt-4 flex items-start gap-2 border-t border-line pt-4 text-[.82rem] leading-[1.55] text-ink-muted">
                <span aria-hidden="true" className="mt-px shrink-0 text-accent-bright">
                  <Icon name="analytics" size={14} />
                </span>
                <span>{a.value}</span>
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

export function Seo() {
  const { setContactOpen } = useUI();

  return (
    <section id="seo" aria-labelledby="seo-title" className="relative overflow-hidden bg-bg py-section">
      <Container>
        <Reveal>
          <SectionHeading
            id="seo-title"
            eyebrow="Organic Growth"
            title="E-commerce SEO & Organic Growth"
            lede="Organic performance on a commerce site is decided by architecture, rendering and speed long before it is decided by content. I work on SEO from that end first."
          />
        </Reveal>

        <RevealGroup as="ul" className="mt-[clamp(44px,5vw,68px)] grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3" each={0.05}>
          {SEO_PILLARS.map((p) => (
            <RevealItem
              key={p.title}
              as="li"
              className="rounded-md border border-line bg-surface p-6 transition-[border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/40"
            >
              <h3 className="font-bebas text-[clamp(1.15rem,1.6vw,1.45rem)] uppercase tracking-[.04em] text-ink">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[.9rem] leading-[1.65] text-ink-secondary">{p.desc}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* §14: SEO must be shown as connected, not a standalone service */}
        <div className="mt-[clamp(40px,5vw,64px)]">
          <h3 className="mb-6 text-label font-bold uppercase tracking-[.24em] text-ink-muted">
            Why it is never only an SEO problem
          </h3>
          <RevealGroup as="ul" className="grid gap-px overflow-hidden rounded-md border border-line sm:grid-cols-2 lg:grid-cols-3" each={0.04}>
            {SEO_CONNECTIONS.map((c) => (
              <RevealItem key={c.label} as="li" className="bg-surface p-5">
                <h4 className="text-[.78rem] font-bold uppercase tracking-[.14em] text-accent-bright">{c.label}</h4>
                <p className="mt-1.5 text-[.85rem] leading-[1.6] text-ink-secondary">{c.note}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="mt-[clamp(40px,5vw,64px)] flex flex-col items-start gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[520px] text-[.95rem] leading-[1.7] text-ink-muted">
            If organic traffic has plateaued despite the content work, the cause is usually further down the stack.
          </p>
          <Button onClick={() => setContactOpen(true)} className="group">
            Discuss Your Organic Growth
            <ArrowIcon className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
