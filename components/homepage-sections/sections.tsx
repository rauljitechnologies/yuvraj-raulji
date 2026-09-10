import { WRITING } from '../../lib/brand';
import {
  AI_TRACKS,
  APPROACH,
  CAPABILITIES,
  CONTACT,
  ECOSYSTEM,
  FAQS,
  PROBLEMS,
  PROJECTS,
  STATS,
} from '../../lib/homepage';
import { ContactForm } from './contact-form';
import { Cta, RuleLink, SectionLabel } from './primitives';
import { Rv, RvGroup, RvItem } from './rv';

/**
 * The homepage sections, in page order.
 *
 * ── What this page is for ──────────────────────────────────────────────────
 *
 * A visitor arrives with four questions and roughly eight seconds: who is
 * this, what does he fix, is he any good, and what do I do next. The page is
 * ordered to answer them in that order, and every section earns its place by
 * answering one of them:
 *
 *   01 Hero          who, and what he is called for            (hero.tsx)
 *   02 Credibility   the verified numbers, four of them
 *   03 Problems      the symptoms, in the reader's own words
 *   04 Capabilities  the four areas the engagements take
 *   05 Why           the position: technology against business
 *   06 Work          six real builds
 *   07 AI            practical AI, and where it does not belong
 *   08 Ecosystem     the stack, grouped by what each layer is for
 *   09 Approach      how an engagement actually runs
 *   10 About         the person, briefly, then a link
 *   11 Insights      the writing
 *   12 FAQ           the questions that precede a first call
 *   13 Contact       the close, and the form
 *
 * ── Section rhythm ─────────────────────────────────────────────────────────
 *
 *   Hero       → DARK
 *   Credibility → LIGHT  (creates immediate visual break after hero)
 *   Problems   → DARK
 *   Expertise  → LIGHT
 *   Why        → RED BAND
 *   Work       → DARK
 *   AI         → DARK + red glow
 *   Ecosystem  → LIGHT
 *   Approach   → DARK
 *   About      → LIGHT
 *   Insights   → DARK
 *   FAQ        → LIGHT
 *   Contact    → BLACK (the close)
 *
 * ── Rendering ──────────────────────────────────────────────────────────────
 *
 * Every section here is a server component reading module-scope data, so the
 * whole page prerenders to static HTML at build time. The only JavaScript the
 * page ships is the scroll-reveal wrappers and the contact form.
 */

/* Shared shell classes: a 1440px container with 48px gutters. */
const SHELL = 'mx-auto max-w-[1440px] px-5 sm:px-6 md:px-8 lg:px-12';
const SECTION_Y = 'py-16 sm:py-20 md:py-24 lg:py-[140px]';

/** Display heading, dark sections (inherits off-white text). */
const H2 =
  'm-0 font-manrope text-[clamp(34px,4.6vw,68px)] font-extralight leading-[1.02] tracking-[-0.035em]';

/** Display heading, light sections (explicit dark text). */
const H2L =
  'm-0 font-manrope text-[clamp(34px,4.6vw,68px)] font-extralight leading-[1.02] tracking-[-0.035em] text-ground';

/* ─────────────────────────────────────────────────────────────
   02 — Credibility  (LIGHT)
   ───────────────────────────────────────────────────────────── */

/**
 * The four numbers, immediately under the hero.
 *
 * Light section — creates an immediate visual rhythm break after the dark hero.
 * Every figure comes from STATS in lib/homepage.ts, the one place a verified
 * number is written. Nothing here types a figure of its own.
 */
export function Credibility() {
  return (
    <section
      id="credibility"
      aria-labelledby="credibility-title"
      className="border-y border-ground/12 bg-[#f5f3ee] text-ground"
    >
      <div className={`${SHELL} py-14 sm:py-16 lg:py-20`}>
        <h2 id="credibility-title" className="sr-only">
          Experience at a glance
        </h2>
        <RvGroup
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0"
          each={0.06}
        >
          {STATS.map((stat, i) => (
            <RvItem
              key={stat.label}
              className={`flex flex-col gap-4 ${i > 0 ? 'lg:border-l lg:border-ground/12 lg:pl-10' : ''}`}
            >
              <span className="font-manrope text-[clamp(44px,5.2vw,72px)] font-semibold leading-[0.9] tracking-[-0.04em] text-accent-bright">
                {stat.value}
              </span>
              <span className="max-w-[26ch] font-manrope text-[15px] font-light leading-[1.55] text-ground/60">
                {stat.label}
              </span>
            </RvItem>
          ))}
        </RvGroup>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   03 — The problems  (DARK)
   ───────────────────────────────────────────────────────────── */

/**
 * The symptoms, before the services.
 *
 * A visitor does not arrive looking for "commerce architecture". They arrive
 * because checkout is leaking or the site is slow, and they will only recognise
 * the offer once they have recognised themselves. So this section runs before
 * the capabilities rather than after.
 */
export function Problems() {
  return (
    <section id="problems" aria-labelledby="problems-title" className={`border-t border-ink/10 ${SHELL} ${SECTION_Y}`}>
      <SectionLabel className="mb-10">The problem</SectionLabel>

      <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <Rv>
          <h2 id="problems-title" className={H2}>
            Technology should help <span className="font-bold">your business grow.</span>
          </h2>
        </Rv>
        <Rv>
          <p className="m-0 max-w-[52ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55 sm:text-[19px] lg:mt-2">
            Slow websites, complicated checkouts, poor search, weak conversion rates, disconnected
            systems and inefficient processes can quietly affect revenue and customer experience.
          </p>
        </Rv>
      </div>

      <RvGroup
        as="ul"
        className="m-0 grid list-none gap-px border border-ink/12 bg-ink/12 p-0 sm:grid-cols-2 lg:grid-cols-3"
        each={0.03}
      >
        {PROBLEMS.map((problem) => (
          <RvItem
            key={problem.no}
            as="li"
            className="group relative flex flex-col justify-between gap-4 overflow-hidden bg-ground p-6 transition-colors duration-300 hover:bg-surface sm:p-7"
          >
            {/* Accent sweep on hover */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
            />
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] font-medium leading-none tracking-[0.2em] text-accent-bright">
                {problem.no}
              </span>
              <h3 className="m-0 font-manrope text-[19px] font-semibold leading-[1.2] tracking-[-0.02em] sm:text-[21px]">
                {problem.name}
              </h3>
            </div>
            <p className="m-0 font-manrope text-[15px] font-light leading-[1.6] text-ink/50">
              {problem.note}
            </p>
          </RvItem>
        ))}
      </RvGroup>

      <Rv className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5">
        <p className="m-0 max-w-[46ch] font-manrope text-[17px] font-light leading-[1.65] text-ink/60 sm:text-[19px]">
          The first step is understanding what is actually holding the business back.
        </p>
        <Cta href="#contact" variant="accent">
          Tell me what is not working
        </Cta>
        <RuleLink href="/ecommerce-audit/">Request a written audit</RuleLink>
      </Rv>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   04 — Capabilities  (LIGHT)
   ───────────────────────────────────────────────────────────── */

/**
 * Four areas, as full-width rows on a light ground.
 *
 * The brief asked these not look like service cards. A full-width row gives
 * the paragraph room to sound like a person. The numbered rule down the left
 * carries the rhythm.
 */
export function Capabilities() {
  return (
    <section
      id="expertise"
      aria-labelledby="capabilities-title"
      className="border-t border-ground/12 bg-[#f5f3ee] text-ground"
    >
      <div className={`${SHELL} ${SECTION_Y}`}>
        <SectionLabel tone="light" className="mb-10">
          What I help businesses with
        </SectionLabel>

        <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <Rv>
            <h2 id="capabilities-title" className={H2L}>
              Four areas, and <span className="font-bold">the decisions inside them.</span>
            </h2>
          </Rv>
          <Rv>
            <p className="m-0 max-w-[52ch] font-manrope text-[17px] font-light leading-[1.7] text-ground/55 sm:text-[19px] lg:mt-2">
              Most engagements start in one of these four and end up touching two. The platform
              decision and the growth work are rarely separable for long.
            </p>
          </Rv>
        </div>

        <RvGroup as="ul" className="m-0 list-none p-0" each={0.06}>
          {CAPABILITIES.map((area) => (
            <RvItem
              key={area.no}
              as="li"
              className="grid gap-x-12 gap-y-7 border-t border-ground/12 py-9 lg:grid-cols-[56px_minmax(0,0.95fr)_minmax(0,1.05fr)] lg:py-14"
            >
              <span
                aria-hidden="true"
                className="font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-accent-bright"
              >
                {area.no}
              </span>

              <div>
                <h3
                  id={area.no === '03' ? 'growth' : undefined}
                  className="m-0 max-w-[14ch] scroll-mt-28 font-manrope text-[clamp(24px,2.6vw,36px)] font-semibold leading-[1.08] tracking-[-0.03em] text-ground"
                >
                  {area.name}
                </h3>
                <p className="mt-5 max-w-[46ch] font-manrope text-[16px] font-light leading-[1.7] text-ground/55 sm:text-[17px]">
                  {area.body}
                </p>
              </div>

              <div>
                <ul className="m-0 grid list-none grid-cols-1 gap-x-8 p-0 sm:grid-cols-2">
                  {area.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 border-b border-ground/10 py-2.5 font-manrope text-[15px] font-light leading-[1.5] text-ground/60"
                    >
                      <span aria-hidden="true" className="h-px w-2.5 shrink-0 bg-accent/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RvItem>
          ))}
        </RvGroup>

        <Rv className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-ground/12 pt-10">
          <p className="m-0 max-w-[44ch] font-manrope text-[17px] font-light leading-[1.65] text-ground/55">
            Not sure which of these the problem sits in? Establishing that is what{' '}
            <a
              href="/expertise/ecommerce-consulting/"
              className="border-b border-accent/60 text-ground/80 transition-colors hover:border-accent hover:text-ground"
            >
              eCommerce consulting
            </a>{' '}
            is for.
          </p>
          <Cta href="#contact" variant="accent">
            Book a 30-minute consultation
          </Cta>
        </Rv>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   05 — Why Yuvraj  (RED BAND)
   ───────────────────────────────────────────────────────────── */

const INTERSECTION = ['Business', 'Technology', 'eCommerce', 'AI', 'Growth'] as const;

/**
 * The position, on the accent ground.
 *
 * The one section that argues rather than informs, so it gets the one full
 * red band. The list of five is set as a typographic stack with hairline
 * plus signs between the words.
 */
export function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="bg-accent text-white">
      <div className={`${SHELL} py-16 sm:py-20 md:py-24 lg:py-[130px]`}>
        <div className="mb-4 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-5 shrink-0 bg-white/60" />
          <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.3em] text-white/80">
            The position
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div>
            <Rv>
              <h2
                id="why-title"
                className="m-0 max-w-[16ch] font-manrope text-[clamp(34px,4.8vw,72px)] font-extralight leading-[1.02] tracking-[-0.04em]"
              >
                Technology decisions should{' '}
                <span className="font-bold">make business sense.</span>
              </h2>
            </Rv>

            <Rv>
              <p className="mt-8 max-w-[50ch] font-manrope text-[18px] font-light leading-[1.7] text-white/95 sm:text-[20px]">
                Technology is not valuable simply because it is new.
              </p>
            </Rv>
            <Rv>
              <p className="mt-5 max-w-[52ch] font-manrope text-[17px] font-light leading-[1.75] text-white/90">
                The right technology should improve performance, reduce friction, simplify
                operations, improve customer experience and create measurable business value. Every
                decision on this page is judged against that, which is also why some of the advice
                is to leave a system alone.
              </p>
            </Rv>
          </div>

          <RvGroup as="ul" className="m-0 list-none p-0" each={0.06}>
            {INTERSECTION.map((word, i) => (
              <RvItem key={word} as="li" className="border-t border-white/20 first:border-t-0">
                <div className="flex items-baseline gap-5 py-3.5 lg:py-5">
                  <span
                    aria-hidden="true"
                    className="w-4 shrink-0 font-mono text-[18px] leading-none text-white/70"
                  >
                    {i === 0 ? '' : '+'}
                  </span>
                  <span className="font-manrope text-[clamp(28px,3.4vw,50px)] font-light leading-[1.05] tracking-[-0.035em]">
                    {word}
                  </span>
                </div>
              </RvItem>
            ))}
          </RvGroup>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   06 — Selected work  (DARK)
   ───────────────────────────────────────────────────────────── */

export function SelectedWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mx-auto max-w-[1440px] py-16 sm:py-20 md:py-24 lg:pb-[120px] lg:pt-[140px]"
    >
      <div className="px-5 sm:px-6 md:px-8 lg:px-12">
        <SectionLabel className="mb-10">Selected work</SectionLabel>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-10">
          <Rv>
            <h2 id="work-title" className={H2}>
              Real work. <span className="font-bold">Real systems.</span>
            </h2>
          </Rv>
          <p className="m-0 max-w-[420px] font-manrope text-[17px] font-light leading-[1.7] text-ink/50">
            Six builds, and the decision inside each one. The interesting part of every one of these
            was the choice made before the code.
          </p>
        </div>
      </div>

      <ul className="flex list-none gap-4 overflow-x-auto px-5 pb-10 pt-2 [scroll-snap-type:x_mandatory] sm:gap-6 sm:px-6 md:px-8 lg:px-12">
        {PROJECTS.map((project) => (
          <li
            key={project.no}
            className="group flex-[0_0_min(300px,82vw)] border border-ink/15 bg-surface sm:flex-[0_0_clamp(300px,34vw,480px)] transition-[transform,border-color,box-shadow] duration-300 [scroll-snap-align:start] hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] motion-reduce:hover:translate-y-0"
          >
            <div className="relative flex aspect-[4/3] items-end overflow-hidden border-b border-ink/10 bg-[#111] p-6">
              {project.cover ? (
                <img
                  src={project.cover}
                  srcSet={`${project.cover.replace('.webp', '-640.webp')} 640w, ${project.cover.replace(
                    '.webp',
                    '-960.webp',
                  )} 960w, ${project.cover} 1920w`}
                  sizes="(min-width: 1024px) 480px, (min-width: 640px) 34vw, 82vw"
                  alt={`${project.name} case study cover`}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:36px_36px]"
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,.2)_0%,rgba(5,5,5,.85)_100%)]"
              />
              <span className="absolute right-6 top-6 font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-ink/50">
                {project.no}
              </span>
              <span className="relative font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/70">
                {project.industry}
              </span>
            </div>

            <div className="p-6 pb-7 sm:p-7 sm:pb-8">
              <h3 className="m-0 font-manrope text-[26px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[30px]">
                {project.name}
              </h3>
              <p className="mt-4 font-manrope text-base font-light leading-[1.65] text-ink/50">
                {project.challenge}
              </p>

              {/* Emphasis: approach first, technology secondary */}
              <div className="mt-5 border-t border-ink/10 pt-5">
                <span className="mb-1.5 block font-mono text-[10px] font-medium uppercase leading-none tracking-[0.18em] text-accent-bright">
                  Approach
                </span>
                <span className="font-manrope text-[15px] font-light leading-[1.5] text-ink/75">
                  {project.role}
                </span>
              </div>
              <p className="mt-2.5 font-mono text-[11px] leading-[1.4] tracking-[0.06em] text-ink/30">
                {project.stack}
              </p>

              <RuleLink href={`/work/${project.id}/`} className="mt-6">
                View case study
                <span className="sr-only">: {project.name}</span>{' '}
                <span className="font-mono">→</span>
              </RuleLink>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4 px-5 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.2em] text-ink/55 sm:px-6 md:px-8 lg:px-12">
        <span aria-hidden="true">Scroll →</span>
        <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />
        <a href="/work/" className="py-2.5 text-ink/55 transition-colors hover:text-accent-bright">
          View selected work
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   07 — AI  (DARK + red glow)
   ───────────────────────────────────────────────────────────── */

export function AiCommerce() {
  return (
    <section
      id="ai"
      aria-labelledby="ai-title"
      className="relative overflow-hidden border-t border-ink/10 bg-ground"
    >
      {/* Ambient red glow — purely decorative */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-0 top-0 h-[700px] w-[700px] translate-x-1/3 -translate-y-1/4 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(215,25,32,0.13) 0%, transparent 68%)' }}
        />
        <div
          className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(215,25,32,0.07) 0%, transparent 68%)' }}
        />
      </div>

      {/* Circuit traces */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 1200 600"
          fill="none"
        >
          <path
            d="M0 120 H420 Q470 120 470 180 V420 Q470 470 520 470 H1200"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="8 340"
            className="animate-yr-dash"
          />
          <path
            d="M0 480 H300 Q350 480 350 420 V200 Q350 150 400 150 H1200"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="8 400"
            className="animate-yr-dash-slow"
          />
          <path d="M0 300 H1200" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
        </svg>
      </div>

      <div className={`${SHELL} relative py-16 sm:py-20 md:py-24 lg:py-[150px]`}>
        <SectionLabel className="mb-10">AI and automation</SectionLabel>

        <Rv>
          <h2
            id="ai-title"
            className="m-0 max-w-[19ch] font-manrope text-[clamp(34px,5vw,80px)] font-extralight leading-[1.0] tracking-[-0.045em]"
          >
            AI should solve business problems,{' '}
            <span className="font-bold">not create more complexity.</span>
          </h2>
        </Rv>
        <Rv>
          <p className="mb-10 mt-7 max-w-[620px] font-manrope text-[18px] font-light leading-[1.7] text-ink/55 sm:mb-16 sm:mt-9 sm:text-[19px]">
            From AI search and intelligent product discovery to agents, automation and business
            intelligence, I help businesses identify where AI can create practical value. The useful
            part of that work is usually deciding what it should not touch: a process nobody has
            defined does not get better by being automated, it gets confusing faster.
          </p>
        </Rv>

        <RvGroup
          className="grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4"
          each={0.04}
        >
          {AI_TRACKS.map((track) => (
            <RvItem
              key={track.no}
              className="group relative flex min-h-[160px] flex-col justify-between overflow-hidden bg-ground p-6 transition-colors duration-300 hover:bg-surface"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
              />
              <span className="font-mono text-[10px] font-medium leading-none tracking-[0.2em] text-accent-bright">
                {track.no}
              </span>
              <div>
                <h3 className="m-0 mb-2.5 font-manrope text-[22px] font-semibold leading-[1.1] tracking-[-0.02em]">
                  {track.name}
                </h3>
                <p className="m-0 font-manrope text-sm font-light leading-[1.55] text-ink/50">
                  {track.note}
                </p>
              </div>
            </RvItem>
          ))}
        </RvGroup>

        <Rv className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5">
          <p className="m-0 max-w-[44ch] font-manrope text-[17px] font-light leading-[1.65] text-ink/55">
            Wondering whether an AI idea is worth building, or whether it is a process problem
            wearing a model?
          </p>
          <RuleLink href="/ai-commerce/">Explore AI solutions →</RuleLink>
        </Rv>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   08 — Technology ecosystem  (LIGHT)
   ───────────────────────────────────────────────────────────── */

/**
 * The stack, as type on a light ground.
 *
 * Explicitly not a logo wall. A grouped list says which layer each one sits in,
 * which is the only part a client's own technical reviewer will read closely.
 */
export function Ecosystem() {
  return (
    <section
      id="technology"
      aria-labelledby="technology-title"
      className="border-t border-ground/12 bg-[#f5f3ee] text-ground"
    >
      <div className={`${SHELL} ${SECTION_Y}`}>
        <SectionLabel tone="light" className="mb-10">
          Technology ecosystem
        </SectionLabel>

        <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <Rv>
            <h2 id="technology-title" className={H2L}>
              The stack, <span className="font-bold">grouped by what it is for.</span>
            </h2>
          </Rv>
          <Rv>
            <p className="m-0 max-w-[52ch] font-manrope text-[17px] font-light leading-[1.7] text-ground/55 sm:text-[19px] lg:mt-2">
              Tools are chosen against a problem, not collected. This is the working set, and which
              layer each one belongs to. The names that are linked have a page of their own.
            </p>
          </Rv>
        </div>

        <RvGroup as="ul" className="m-0 list-none p-0" each={0.05}>
          {ECOSYSTEM.map((group) => (
            <RvItem
              key={group.name}
              as="li"
              className="grid gap-x-12 gap-y-5 border-t border-ground/12 py-8 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] lg:py-11"
            >
              <h3 className="m-0 font-manrope text-[clamp(19px,1.8vw,24px)] font-semibold leading-[1.2] tracking-[-0.02em] text-ground">
                {group.name}
              </h3>
              <ul className="m-0 flex list-none flex-wrap gap-x-8 gap-y-3 p-0">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="font-manrope text-[16px] font-light leading-[1.5] text-ground/55 sm:text-[17px]"
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        className="border-b border-ground/25 pb-0.5 transition-colors duration-200 hover:border-accent hover:text-ground"
                      >
                        {item.name}
                      </a>
                    ) : (
                      item.name
                    )}
                  </li>
                ))}
              </ul>
            </RvItem>
          ))}
        </RvGroup>
        <div className="border-t border-ground/12" />

        <Rv className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-ground/12 pt-10">
          <p className="m-0 max-w-[44ch] font-manrope text-[17px] font-light leading-[1.65] text-ground/55">
            Need to evaluate a platform or review your current stack before committing to a direction?
          </p>
          <Cta href="#contact" variant="solid" tone="light">
            Book a 30-minute consultation
          </Cta>
        </Rv>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   09 — Working approach  (DARK)
   ───────────────────────────────────────────────────────────── */

export function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="border-t border-ink/10 bg-ground"
    >
      <div className={`${SHELL} ${SECTION_Y}`}>
      <SectionLabel className="mb-10">Working approach</SectionLabel>

      <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <Rv>
          <h2 id="approach-title" className={H2}>
            From problem to <span className="font-bold">practical solution.</span>
          </h2>
        </Rv>
        <Rv>
          <p className="m-0 max-w-[52ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55 sm:text-[19px] lg:mt-2">
            Five stages, in this order, on every engagement. Skipping the first one is the most
            expensive habit in this industry.
          </p>
        </Rv>
      </div>

      <RvGroup
        as="ol"
        className="m-0 grid list-none gap-px border border-ink/12 bg-ink/12 p-0 sm:grid-cols-2 lg:grid-cols-5"
        each={0.05}
      >
        {APPROACH.map((step) => (
          <RvItem
            key={step.no}
            as="li"
            className="group relative flex flex-col gap-4 overflow-hidden bg-ground p-6 transition-colors duration-300 hover:bg-surface sm:p-7"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
            />
            <span
              aria-hidden="true"
              className="font-manrope text-[clamp(38px,4vw,52px)] font-medium leading-[0.8] tracking-[-0.04em] text-ink/12"
            >
              {step.no}
            </span>
            <h3 className="m-0 font-mono text-[12px] font-semibold uppercase leading-none tracking-[0.2em] text-accent-bright">
              {step.name}
            </h3>
            <p className="m-0 font-manrope text-[15px] font-light leading-[1.65] text-ink/50">
              {step.body}
            </p>
          </RvItem>
        ))}
      </RvGroup>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   10 — About  (LIGHT)
   ───────────────────────────────────────────────────────────── */

/**
 * The person, briefly.
 *
 * Short on purpose. The homepage job is to establish that there is a real
 * person with a real record and hand off to /about/, which has the full
 * account. A long biography competes with the call to action for the same
 * scroll position and usually wins, which is the wrong outcome.
 */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-t border-ground/12 bg-[#f5f3ee] text-ground"
    >
      <div className={`${SHELL} py-16 sm:py-20 md:py-24 lg:py-[120px]`}>
        <SectionLabel tone="light" className="mb-10">
          About
        </SectionLabel>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div>
            <Rv>
              <h2 id="about-title" className={H2L}>
                A technology consultant who{' '}
                <span className="font-bold text-ground">thinks beyond technology.</span>
              </h2>
            </Rv>
            <Rv>
              <p className="mt-8 max-w-[54ch] font-manrope text-[17px] font-light leading-[1.75] text-ground/60 sm:text-[19px]">
                The work sits where eCommerce, technology, AI, digital transformation and business
                growth meet, which in practice means the answer is rarely only technical. A slow
                storefront can be a caching problem or a merchandising one. A failing integration is
                usually a process that was never agreed.
              </p>
            </Rv>
            <Rv>
              <p className="mt-5 max-w-[54ch] font-manrope text-[17px] font-light leading-[1.75] text-ground/50">
                The record runs from the first Magento role in 2016 through Shopify, headless
                commerce and, more recently, AI systems: catalogues in the hundreds of thousands of
                SKUs, multi-store platforms, B2B approval workflows and the operations behind them.
              </p>
            </Rv>
            <Rv className="mt-9 flex flex-wrap gap-3.5">
              <Cta href="/about/" variant="outline" tone="light">
                More about Yuvraj
              </Cta>
              <Cta href="#contact" variant="solid" tone="light">
                Book a consultation
              </Cta>
            </Rv>
          </div>

          <RvGroup as="dl" className="m-0 self-center" each={0.06}>
            {[
              { label: 'Based in', value: CONTACT.location },
              { label: 'Working hours', value: CONTACT.timezone },
              { label: 'Focus', value: 'eCommerce, AI and technology strategy' },
            ].map((row) => (
              <RvItem
                key={row.label}
                className="flex flex-col gap-1.5 border-t border-ground/12 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <dt className="font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-[0.16em] text-ground/50">
                  {row.label}
                </dt>
                <dd className="m-0 font-manrope text-[16px] font-light leading-[1.5] text-ground/65 sm:text-right">
                  {row.value}
                </dd>
              </RvItem>
            ))}
          </RvGroup>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   11 — Insights  (DARK)
   ───────────────────────────────────────────────────────────── */

export function Insights() {
  const posts = WRITING.slice(0, 6);

  return (
    <section
      id="insights"
      aria-labelledby="insights-title"
      className="border-t border-ink/10 bg-ground"
    >
      <div className={`${SHELL} ${SECTION_Y}`}>
      <SectionLabel className="mb-10">Insights</SectionLabel>

      <div className="mb-10 flex flex-wrap items-end justify-between gap-8 sm:mb-14 sm:gap-10">
        <Rv>
          <h2 id="insights-title" className={H2}>
            Written for the people <span className="font-bold">making the decision.</span>
          </h2>
        </Rv>
        <RuleLink href="/insights/">Explore insights →</RuleLink>
      </div>

      <RvGroup as="ul" className="m-0 list-none p-0" each={0.05}>
        {posts.map((post) => (
          <RvItem key={post.slug} as="li" className="border-t border-ink/10">
            <a
              href={`/insights/${post.slug}/`}
              className="group relative grid items-center gap-3 overflow-hidden px-1 py-6 transition-[background-color,padding-left] duration-300 hover:bg-surface hover:pl-5 sm:gap-4 sm:px-2 sm:py-8 md:grid-cols-[130px_minmax(0,1fr)_auto] md:gap-6 lg:grid-cols-[150px_minmax(0,1fr)_190px_60px] lg:gap-9"
            >
              <span className="font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-[0.16em] text-accent-bright">
                {post.category}
              </span>
              <span className="font-manrope text-[clamp(18px,1.9vw,27px)] font-medium leading-[1.25] tracking-[-0.02em]">
                {post.title}
              </span>
              <span className="font-mono text-xs leading-[1.5] text-ink/55">
                {post.date} · {post.readTime}
              </span>
              <span
                aria-hidden="true"
                className="hidden font-mono text-[22px] leading-none text-ink/40 transition-colors duration-200 group-hover:text-accent-bright lg:block lg:justify-self-end"
              >
                →
              </span>
            </a>
          </RvItem>
        ))}
      </RvGroup>
      <div className="border-t border-ink/10" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   12 — Questions  (LIGHT)
   ───────────────────────────────────────────────────────────── */

/**
 * The questions that come up before a first call.
 *
 * FAQS in lib/homepage.ts is the single source for both this section and the
 * FAQPage node in lib/schema-brand.ts.
 */
export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-t border-ground/12 bg-[#f5f3ee] text-ground"
    >
      <div className={`${SHELL} ${SECTION_Y}`}>
        <SectionLabel tone="light" className="mb-10">
          Questions
        </SectionLabel>

        <div className="mb-10 flex flex-wrap items-end justify-between gap-8 sm:mb-14 sm:gap-10 lg:mb-[60px]">
          <Rv>
            <h2 id="faq-title" className={H2L}>
              What people ask <span className="font-bold">before a first call.</span>
            </h2>
          </Rv>
          <p className="m-0 max-w-[400px] font-manrope text-[17px] font-light leading-[1.7] text-ground/50">
            The answers, in the words I would use on the call itself.
          </p>
        </div>

        <RvGroup
          as="ul"
          className="m-0 grid list-none gap-px border border-ground/12 bg-ground/10 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]"
          each={0.04}
        >
          {FAQS.map((item) => (
            <RvItem
              key={item.no}
              as="li"
              className="flex flex-col gap-4 bg-[#f5f3ee] p-6 sm:p-8 lg:px-[34px] lg:py-[38px]"
            >
              <div className="flex items-baseline gap-3.5">
                <span className="shrink-0 font-mono text-[10px] font-medium leading-[1.4] tracking-[0.18em] text-accent-bright">
                  {item.no}
                </span>
                <h3 className="m-0 font-manrope text-xl font-semibold leading-[1.3] tracking-[-0.015em] text-ground">
                  {item.q}
                </h3>
              </div>
              <p className="m-0 ml-6 font-manrope text-base font-light leading-[1.7] text-ground/55">
                {item.a}
              </p>
            </RvItem>
          ))}
        </RvGroup>

        <div className="mt-11 flex flex-wrap items-center gap-[18px]">
          <span className="font-manrope text-[17px] font-light leading-[1.6] text-ground/50">
            Question not answered here?
          </span>
          <RuleLink href="#contact" tone="light">
            Start a conversation →
          </RuleLink>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   13 — Contact  (BLACK — the close)
   ───────────────────────────────────────────────────────────── */

const DETAILS = [
  { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: 'Phone', value: CONTACT.phone, href: CONTACT.phoneHref },
  { label: 'Website', value: 'www.yuvrajraulji.com', href: 'https://www.yuvrajraulji.com/' },
  { label: 'Based in', value: `${CONTACT.location} · ${CONTACT.timezone}`, href: null },
] as const;

/**
 * Contact, on black. The only close on the page.
 *
 * A dark closing section creates a strong visual endpoint and editorial weight.
 * The contact info sits in a dark panel; the form sits in a white panel beside
 * it, because the ContactForm component uses light-background field styling.
 *
 * `id="book"` is kept as a second anchor because the footer has linked to
 * `/#book` since before this restructure.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-ink/10 bg-[#050505] text-ink"
    >
      <span id="book" aria-hidden="true" />
      <div className={`${SHELL} py-16 sm:py-20 md:py-24 lg:pb-[130px] lg:pt-[150px]`}>
        <SectionLabel className="mb-8 sm:mb-11">Contact</SectionLabel>

        <Rv>
          <h2
            id="contact-title"
            className="m-0 max-w-[22ch] font-manrope text-[clamp(32px,5vw,80px)] font-extralight leading-[1.0] tracking-[-0.045em]"
          >
            Let&apos;s solve the commerce problem{' '}
            <span className="font-bold">
              before it becomes a bigger <span className="text-accent">business problem.</span>
            </span>
          </h2>
        </Rv>

        <Rv>
          <p className="mt-7 max-w-[46ch] font-manrope text-[19px] font-light leading-[1.6] text-ink/60 sm:text-[21px]">
            Bring the problem. Leave with the next practical step.
          </p>
        </Rv>

        {/* Dark left panel (contact info) + white right panel (form) */}
        <Rv className="mt-12 grid gap-px border border-ink/15 bg-ink/15 sm:mt-14 lg:mt-[70px] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex min-w-0 flex-col gap-8 bg-surface p-6 sm:gap-10 sm:p-8 lg:p-12">
            <p className="m-0 max-w-[46ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/60">
              Describe the problem in a few lines and I will reply within 24 hours, IST business
              days. A first conversation is 30 minutes and costs nothing.
            </p>

            <dl className="m-0">
              {DETAILS.map((detail) => (
                <div
                  key={detail.label}
                  className="flex flex-col gap-1 border-t border-ink/12 py-4 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-8"
                >
                  <dt className="font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-[0.16em] text-ink/50">
                    {detail.label}
                  </dt>
                  <dd className="m-0 min-w-0 break-words font-mono text-[13px] leading-[1.5] text-ink/70">
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="inline-block py-1.5 transition-colors hover:text-accent-bright"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto flex flex-wrap gap-3.5 pt-2">
              <Cta href={CONTACT.whatsapp} variant="accent" external="WhatsApp">
                Book a 30-minute consultation
              </Cta>
              <Cta href={`mailto:${CONTACT.email}`} variant="outline">
                Start a conversation
              </Cta>
            </div>
          </div>

          {/* White panel: ContactForm uses text-ground / border-ground — light bg required */}
          <div className="min-w-0 bg-white p-6 sm:p-8 lg:p-12">
            <ContactForm />
          </div>
        </Rv>
      </div>
    </section>
  );
}
