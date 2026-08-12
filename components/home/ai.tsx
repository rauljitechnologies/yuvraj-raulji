'use client';

import { AGENT_LOOP, AGENT_TYPES, GENERATIVE_AI } from '../../lib/site';
import { Button, Container, SectionHeading } from '../ui';
import { ArrowIcon, Icon } from '../ui/icons';
import { Reveal, RevealGroup, RevealItem } from '../ui/reveal';
import { useUI } from '../ui-context';

/**
 * §15 + §16 — two separate sections, deliberately.
 *
 * Visual restraint is a hard requirement here: no robot imagery, no neon, no
 * generic "AI" clichés. The only visual device is a thin technical rule and the
 * agent-loop diagram, which carries actual meaning rather than decoration.
 */

export function GenerativeAI() {
  return (
    <section id="generative-ai" aria-labelledby="genai-title" className="relative overflow-hidden bg-surface py-section">
      {/* Restrained scanline field — no glow, no gradient mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[.35]"
        style={{
          backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,.02) 0 1px, transparent 1px 5px)',
          maskImage: 'linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)',
        }}
      />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            id="genai-title"
            eyebrow="Generative AI"
            title="Generative AI for E-commerce & Digital Transformation"
            lede="The useful question is not what a model can generate — it is which parts of a commerce operation are bottlenecked by writing, classifying or summarising at volume. Those are the parts worth automating."
          />
        </Reveal>

        <RevealGroup as="ul" className="mt-[clamp(44px,5vw,68px)] grid gap-px overflow-hidden rounded-md border border-line sm:grid-cols-2 lg:grid-cols-3" each={0.05}>
          {GENERATIVE_AI.map((item) => (
            <RevealItem key={item.title} as="li" className="bg-bg p-7 transition-colors duration-200 hover:bg-elevated">
              <h3 className="font-bebas text-[clamp(1.15rem,1.6vw,1.45rem)] uppercase tracking-[.04em] text-ink">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[.9rem] leading-[1.65] text-ink-secondary">{item.desc}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

export function AgenticAI() {
  const { setContactOpen } = useUI();

  return (
    <section id="agentic-ai" aria-labelledby="agentic-title" className="relative overflow-hidden bg-bg py-section">
      <Container>
        <Reveal>
          <SectionHeading
            id="agentic-title"
            eyebrow="Agentic AI"
            title="Agentic AI & Intelligent Automation"
          />
        </Reveal>

        {/* The distinction the brief asks for, stated plainly */}
        <Reveal>
          <div className="mt-8 grid max-w-[900px] gap-px overflow-hidden rounded-md border border-line sm:grid-cols-2">
            <div className="bg-surface p-6">
              <p className="text-label font-bold uppercase tracking-[.2em] text-ink-muted">Generative AI</p>
              <p className="mt-3 text-[.95rem] leading-[1.7] text-ink-secondary">
                <strong className="font-semibold text-ink">Generates.</strong> You give it a prompt, it returns
                content — text, code, an image, a summary.
              </p>
            </div>
            <div className="bg-surface p-6">
              <p className="text-label font-bold uppercase tracking-[.2em] text-accent-bright">Agentic AI</p>
              <p className="mt-3 text-[.95rem] leading-[1.7] text-ink-secondary">
                <strong className="font-semibold text-ink">Reasons, plans and executes.</strong> You give it a goal,
                and it works through steps using tools it is permitted to call — inside a defined system.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Agent loop — real steps, real text, arrows are decoration only */}
        <div className="mt-[clamp(44px,5vw,68px)]">
          <h3 className="mb-6 text-label font-bold uppercase tracking-[.24em] text-ink-muted">How an agent actually runs</h3>
          <RevealGroup as="ol" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5" each={0.06}>
            {AGENT_LOOP.map((s, i) => {
              const isCheckpoint = i === AGENT_LOOP.length - 1;
              return (
                <RevealItem
                  key={s.step}
                  as="li"
                  className={`relative rounded-md border p-5 ${
                    isCheckpoint ? 'border-accent/40 bg-accent-soft' : 'border-line bg-surface'
                  }`}
                >
                  <div className="flex items-baseline gap-2.5">
                    <span aria-hidden="true" className="font-bebas text-[.9rem] tracking-[.14em] text-accent-bright">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-bebas text-[1.15rem] uppercase tracking-[.04em] text-ink">{s.step}</h4>
                  </div>
                  <p className="mt-2 text-[.85rem] leading-[1.6] text-ink-secondary">{s.desc}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <p className="mt-5 flex items-start gap-2.5 text-[.85rem] leading-[1.65] text-ink-muted">
            <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent-bright">
              <Icon name="agentic" size={16} />
            </span>
            <span>
              Scope is the whole discipline. I build agents with an explicit tool set, defined boundaries and a human
              checkpoint before anything consequential commits — not systems that run a business unsupervised.
            </span>
          </p>
        </div>

        {/* Where agents are actually deployed */}
        <div className="mt-[clamp(44px,5vw,64px)]">
          <h3 className="mb-6 text-label font-bold uppercase tracking-[.24em] text-ink-muted">Where they apply</h3>
          <RevealGroup as="ul" className="grid gap-px overflow-hidden rounded-md border border-line sm:grid-cols-2 lg:grid-cols-3" each={0.05}>
            {AGENT_TYPES.map((a) => (
              <RevealItem key={a.title} as="li" className="bg-surface p-6 transition-colors duration-200 hover:bg-elevated">
                <h4 className="text-[.82rem] font-bold uppercase tracking-[.12em] text-ink">{a.title}</h4>
                <p className="mt-1.5 text-[.875rem] leading-[1.6] text-ink-secondary">{a.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="mt-[clamp(40px,5vw,64px)] flex flex-col items-start gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[520px] text-[.95rem] leading-[1.7] text-ink-muted">
            Most AI conversations start with the wrong question. The useful one is which workflow is expensive enough
            to be worth changing.
          </p>
          <Button onClick={() => setContactOpen(true)} className="group">
            Explore an AI Strategy
            <ArrowIcon className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
