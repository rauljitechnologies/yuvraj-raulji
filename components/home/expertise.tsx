'use client';

import { CAPABILITIES } from '../../lib/site';
import { Button, Container, SectionHeading } from '../ui';
import { ArrowIcon, Icon } from '../ui/icons';
import { RevealGroup, RevealItem } from '../ui/reveal';
import { useUI } from '../ui-context';

/**
 * §9 Strategic Capabilities — the structural backbone of the homepage.
 *
 * Cards are non-interactive (they don't navigate), so hover is pure affordance
 * polish and never the only way to read the content. All 13 titles, descriptions
 * and stack rails are in the static HTML for crawlers and AI answer engines.
 */
export function Expertise() {
  const { setContactOpen } = useUI();

  return (
    <section id="services" aria-labelledby="capabilities-title" className="relative overflow-hidden bg-surface py-section">
      <Container>
        <div className="mb-[clamp(48px,6vw,80px)] grid items-end gap-8 lg:grid-cols-[1fr_minmax(300px,.6fr)]">
          <SectionHeading
            id="capabilities-title"
            eyebrow="Services"
            title="Strategic Capabilities"
            className="max-w-none"
          />
          <p className="text-body-lg leading-[1.74] text-ink-secondary">
            Fourteen connected disciplines — from commercial strategy through architecture, platforms, engineering
            and AI. Most engagements draw on several at once, which is usually the point.
          </p>
        </div>

        <RevealGroup as="ul" className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3" each={0.05}>
          {CAPABILITIES.map((c) => (
            <RevealItem
              key={c.num}
              as="li"
              className="group relative flex flex-col rounded-md border border-line bg-gradient-to-br from-white/[.04] to-white/[.01] p-7 transition-[border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <span
                  aria-hidden="true"
                  className="grid h-[46px] w-[46px] place-items-center rounded-md border border-accent/30 bg-accent-soft text-accent-bright transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
                >
                  <Icon name={c.icon} size={22} />
                </span>
                <span
                  aria-hidden="true"
                  className="font-bebas text-[1.35rem] leading-none tracking-[.08em] text-ink-faint transition-colors duration-200 group-hover:text-accent-bright"
                >
                  {c.num}
                </span>
              </div>

              <h3 className="mb-3 font-bebas text-[clamp(1.3rem,1.9vw,1.75rem)] uppercase leading-[1.05] tracking-[.03em] text-ink">
                {c.title}
              </h3>

              <p className="mb-6 text-[.92rem] leading-[1.68] text-ink-secondary">{c.desc}</p>

              <ul className="mt-auto flex flex-wrap gap-1.5 border-t border-line pt-5">
                {c.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line px-2.5 py-1 text-[.63rem] font-semibold uppercase tracking-[.1em] text-ink-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* §33 contextual CTA — matched to what the section just established */}
        <div className="mt-[clamp(40px,5vw,64px)] flex flex-col items-start gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[520px] text-[.95rem] leading-[1.7] text-ink-muted">
            Most projects start with a conversation about where the current stack is holding the business back.
          </p>
          <Button onClick={() => setContactOpen(true)} className="group">
            Discuss Your Commerce Architecture
            <ArrowIcon className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
