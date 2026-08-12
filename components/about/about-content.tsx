'use client';

import Image from 'next/image';
import {
  BUSINESS_MODEL_DETAIL,
  CERTIFICATIONS,
  CURRENT_ROLES,
  EDUCATION,
  EXPERIENCE,
  TECH_PROFICIENCIES,
} from '../../lib/site';
import { Button, Container, SectionHeading } from '../ui';
import { ArrowIcon } from '../ui/icons';
import { Reveal, RevealGroup, RevealItem } from '../ui/reveal';
import { useUI } from '../ui-context';

/**
 * The canonical biography. Every figure here traces to Yuvraj's own
 * professional record — see CONTENT-PRINCIPLES.md rule 1. Nothing is estimated,
 * rounded up or inferred.
 */
export function AboutContent() {
  const { setContactOpen } = useUI();

  return (
    <>
      {/* ── Intro ── */}
      <section className="relative overflow-hidden bg-bg pb-section pt-[clamp(140px,18vh,200px)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 60% at 0% 30%, var(--accent-soft) 0%, transparent 100%)',
          }}
        />
        <Container className="relative">
          <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
            <div>
              <p className="flex items-center gap-3 text-label font-bold uppercase tracking-[.28em] text-ink-secondary">
                <span aria-hidden="true" className="h-px w-10 bg-accent" />
                About
              </p>

              <h1 className="mt-6 font-bebas text-display uppercase leading-[.92] tracking-[.02em] text-ink">
                Yuvraj Raulji — E-commerce &amp;
                <br />
                Digital Transformation <span className="text-accent-bright">Consultant</span>
              </h1>

              <div className="mt-8 max-w-[640px] space-y-5 text-body-lg leading-[1.8] text-ink-secondary">
                <p>
                  I&rsquo;ve spent <strong className="font-semibold text-ink">9+ years</strong> building and
                  scaling commerce platforms — mostly Magento&nbsp;2, Shopify and headless architectures — for
                  B2B, B2C, D2C and marketplace businesses. Around{' '}
                  <strong className="font-semibold text-ink">50+ projects</strong>, and enough of them under
                  real load that I&rsquo;ve learned where these systems actually break.
                </p>
                <p>
                  Most of my recent work sits at the point where commerce strategy meets engineering: deciding
                  what to build, what to buy, what to retire, and how to sequence a migration so the business
                  keeps trading while it happens. That covers platform architecture, server infrastructure,
                  performance, analytics and — increasingly — where generative and agentic AI genuinely earn
                  their place in an operation.
                </p>
                <p>
                  I&rsquo;m not platform-loyal. A well-built Shopify store beats an over-engineered headless
                  stack for most businesses, and I&rsquo;ll say so. The interesting question is never which
                  technology is best, it&rsquo;s which one fits the catalogue, the team and the roadmap.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button onClick={() => setContactOpen(true)} className="group">
                  Book a Consultation
                  <ArrowIcon className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
                </Button>
                <Button href="/#services" variant="secondary">
                  Explore Services
                </Button>
              </div>
            </div>

            <div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line">
                <Image
                  src="/assets/yuvraj-raulji.jpg"
                  alt="Yuvraj Raulji, E-commerce and Digital Transformation Consultant"
                  fill
                  priority
                  sizes="(max-width: 1023px) 90vw, 40vw"
                  className="object-cover object-top"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, var(--bg) 2%, transparent 45%)' }}
                />
              </div>

              <dl className="mt-6 divide-y divide-line overflow-hidden rounded-md border border-line">
                {CURRENT_ROLES.map((r) => (
                  <div key={`${r.title}-${r.org}`} className="flex flex-wrap items-baseline gap-x-3 px-5 py-4">
                    <dt className="text-[.82rem] font-bold uppercase tracking-[.1em] text-ink">{r.title}</dt>
                    <dd className="text-[.85rem] text-ink-secondary">{r.org}</dd>
                    {r.period ? (
                      <dd className="ml-auto text-[.68rem] font-semibold uppercase tracking-[.1em] text-ink-muted">
                        {r.period}
                      </dd>
                    ) : null}
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Business models ── */}
      <section aria-labelledby="models-title" className="bg-surface py-section">
        <Container>
          <Reveal>
            <SectionHeading
              id="models-title"
              eyebrow="Business Models"
              title="B2B, B2C, D2C & Marketplace Commerce"
              lede="The commercial model changes the architecture more than the platform choice does. These are the four I work across."
            />
          </Reveal>
          <RevealGroup as="ul" className="mt-12 grid gap-px overflow-hidden rounded-md border border-line sm:grid-cols-2" each={0.06}>
            {BUSINESS_MODEL_DETAIL.map((b) => (
              <RevealItem key={b.model} as="li" className="bg-bg p-7">
                <h3 className="font-bebas text-[1.5rem] uppercase tracking-[.06em] text-accent-bright">{b.model}</h3>
                <p className="mt-2.5 text-[.9rem] leading-[1.68] text-ink-secondary">{b.note}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ── Experience ── */}
      <section aria-labelledby="experience-title" className="bg-bg py-section">
        <Container>
          <Reveal>
            <SectionHeading id="experience-title" eyebrow="Experience" title="Where I've Worked" />
          </Reveal>

          <ol className="mt-12 space-y-4">
            {EXPERIENCE.map((r) => (
              <Reveal key={`${r.org}-${r.period}`} as="li">
                <article className="rounded-md border border-line bg-surface p-7 transition-colors duration-200 hover:border-accent/30">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <div>
                      <h3 className="font-bebas text-[clamp(1.3rem,2vw,1.7rem)] uppercase tracking-[.03em] text-ink">
                        {r.title}
                      </h3>
                      <p className="mt-1 text-[.9rem] font-semibold text-accent-bright">{r.org}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[.7rem] font-bold uppercase tracking-[.14em] text-ink-muted">{r.period}</p>
                      {r.location ? <p className="mt-1 text-[.7rem] text-ink-faint">{r.location}</p> : null}
                    </div>
                  </div>

                  <p className="mt-4 max-w-[720px] text-[.92rem] leading-[1.7] text-ink-secondary">{r.summary}</p>

                  {r.points.length > 0 && (
                    <ul className="mt-5 space-y-2 border-t border-line pt-5">
                      {r.points.map((pt) => (
                        <li key={pt} className="flex gap-3 text-[.88rem] leading-[1.65] text-ink-secondary">
                          <span aria-hidden="true" className="mt-[.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── Technical proficiencies ── */}
      <section aria-labelledby="stack-title" className="bg-surface py-section">
        <Container>
          <Reveal>
            <SectionHeading id="stack-title" eyebrow="Stack" title="What I Work With" />
          </Reveal>
          <RevealGroup as="ul" className="mt-12 grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3" each={0.05}>
            {TECH_PROFICIENCIES.map((g) => (
              <RevealItem key={g.group} as="li" className="rounded-md border border-line bg-bg p-6">
                <h3 className="text-[.78rem] font-bold uppercase tracking-[.14em] text-ink-muted">{g.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((i) => (
                    <li
                      key={i}
                      className="rounded-full border border-line px-2.5 py-1 text-[.68rem] font-semibold uppercase tracking-[.08em] text-ink-secondary"
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ── Education & certifications ── */}
      <section aria-labelledby="credentials-title" className="bg-bg py-section">
        <Container>
          <Reveal>
            <SectionHeading id="credentials-title" eyebrow="Credentials" title="Education & Certifications" />
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-5 text-label font-bold uppercase tracking-[.24em] text-ink-muted">Education</h3>
              <ul className="divide-y divide-line overflow-hidden rounded-md border border-line">
                {EDUCATION.map((e) => (
                  <li key={e.qualification} className="flex flex-wrap items-baseline justify-between gap-3 bg-surface px-5 py-4">
                    <span className="text-[.9rem] text-ink">{e.qualification}</span>
                    <span className="text-[.7rem] font-semibold uppercase tracking-[.1em] text-ink-muted">{e.period}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-label font-bold uppercase tracking-[.24em] text-ink-muted">Certifications</h3>
              <ul className="divide-y divide-line overflow-hidden rounded-md border border-line">
                {CERTIFICATIONS.map((c) => (
                  <li key={`${c.name}-${c.issuer}`} className="flex flex-wrap items-baseline justify-between gap-3 bg-surface px-5 py-4">
                    <span className="text-[.88rem] text-ink">
                      {c.url ? (
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:text-accent-bright">
                          {c.name}
                        </a>
                      ) : (
                        c.name
                      )}
                      <span className="ml-2 text-ink-muted">· {c.issuer}</span>
                    </span>
                    {c.date ? (
                      <span className="text-[.7rem] font-semibold uppercase tracking-[.1em] text-ink-muted">{c.date}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-[clamp(40px,5vw,64px)] flex flex-col items-start gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[540px] text-[.95rem] leading-[1.7] text-ink-muted">
              If you&rsquo;re weighing a replatform, a migration, or whether your current stack can carry the
              next two years of growth — that&rsquo;s the conversation I&rsquo;m useful in.
            </p>
            <Button onClick={() => setContactOpen(true)} className="group">
              Book a Consultation
              <ArrowIcon className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
