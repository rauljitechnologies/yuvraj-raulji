import {
  AI_TRACKS,
  ANSWERS,
  CONTACT,
  ENGAGEMENTS,
  FAQS,
  FEATURED,
  PORTRAITS,
  PROJECTS,
  STACK_LAYERS,
  STATS,
  SYSTEMS,
  TIMELINE,
} from '../../lib/homepage';
import { POSTS } from '../../lib/posts';
import { ContactForm } from './contact-form';
import { Cta, RuleLink, SectionLabel, Tag } from './primitives';
import { Rv, RvGroup, RvItem } from './rv';

/**
 * The homepage sections, in page order, from the design canvas
 * "Yuvraj Raulji - Homepage.dc.html".
 *
 * Every section here is a server component. The data is imported at module
 * scope from lib/homepage.ts and lib/posts.ts, so the whole page is rendered on
 * the server and, because next.config.mjs sets `output: 'export'`, written to
 * static HTML at build time. Nothing below fetches at runtime.
 *
 * Shared shell classes. The canvas used a 1440px container with 48px gutters
 * throughout; both are kept, with the gutter dropping to 24px under `lg` where
 * 48px would eat a phone's width.
 */
const SHELL = 'mx-auto max-w-[1440px] px-6 lg:px-12';
const SECTION_Y = 'py-24 lg:py-[140px]';

/** The two-weight display heading the canvas repeats in every section. */
const H2 = 'm-0 font-manrope text-[clamp(34px,4.6vw,68px)] font-extralight leading-[1.02] tracking-[-0.035em]';

/* ─────────────────────────────────────────────────────────────
   02 — The position
   ───────────────────────────────────────────────────────────── */

export function Position() {
  return (
    <section id="about" className={`${SHELL} ${SECTION_Y}`}>
      <SectionLabel no="02" className="mb-14">
        The position
      </SectionLabel>

      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <Rv>
          <h2 className={H2}>
            More than code.{' '}
            <span className="block font-bold">Technology should move the business forward.</span>
          </h2>
        </Rv>
        <div>
          <Rv>
            <p className="mb-7 font-manrope text-[19px] font-light leading-[1.7] text-ink/60">
              I build digital commerce systems from the technology layer up: engineering,
              architecture, performance, customer experience and growth, treated as one system
              rather than five projects.
            </p>
          </Rv>
          <Rv>
            <p className="m-0 font-manrope text-[17px] font-light leading-[1.75] text-ink/45">
              Technology is valuable when it creates leverage: better decisions, stronger customer
              experiences, faster operations and sustainable growth. Not because it is possible, and
              not because it is new.
            </p>
          </Rv>
        </div>
      </div>

      {/*
        The stat band. A 1px gap over a light background is what draws the
        hairlines between cells, so the grid needs no borders of its own.
      */}
      <RvGroup className="mt-20 grid grid-cols-2 gap-px bg-ink/10 lg:mt-24 lg:grid-cols-4">
        {STATS.map((stat) => (
          <RvItem key={stat.label} className="bg-ground px-7 py-9">
            <div className="font-manrope text-[clamp(40px,5vw,76px)] font-extralight leading-none tracking-[-0.04em]">
              {/* The trailing "+" is the accent; the number stays foreground. */}
              {stat.value.replace('+', '')}
              {stat.value.includes('+') && <span className="text-accent">+</span>}
            </div>
            <div className="mt-3.5 font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-[0.2em] text-ink/45">
              {stat.label}
            </div>
          </RvItem>
        ))}
      </RvGroup>

      {/* Portrait plus the standing statement. */}
      <Rv className="mt-20 grid gap-px border border-ink/10 bg-ink/10 lg:mt-24 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
        <div className="relative min-h-[320px] overflow-hidden bg-surface lg:min-h-[420px]">
          <img
            src={PORTRAITS.about}
            alt="Yuvraj Raulji"
            width={1200}
            height={1680}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[50%_12%] grayscale contrast-[1.12] brightness-[.72]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,.55)_0%,rgba(5,5,5,.2)_34%,rgba(5,5,5,.85)_100%)]"
          />
          <span className="absolute bottom-5 left-6 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.24em] text-ink/75">
            Since 2016 · 9+ years
          </span>
        </div>
        <div className="flex flex-col justify-between gap-9 bg-surface p-8 lg:p-[52px_46px]">
          <p className="m-0 font-manrope text-[clamp(20px,2.2vw,32px)] font-light leading-[1.45] tracking-[-0.02em] text-ink/85 [text-wrap:pretty]">
            I don&rsquo;t sell platforms. I make decisions, about architecture, about catalogue,
            about where the business actually loses money, and then I build the system that holds
            those decisions.
          </p>
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-7 gap-y-3.5 font-mono text-[13px] leading-[1.5]">
            <dt className="uppercase tracking-[0.16em] text-ink/35">Role</dt>
            <dd className="m-0 text-ink/75">eCommerce and technology architect</dd>
            <dt className="uppercase tracking-[0.16em] text-ink/35">Focus</dt>
            <dd className="m-0 text-ink/75">Magento 2 · Headless · AI systems</dd>
            <dt className="uppercase tracking-[0.16em] text-ink/35">Based</dt>
            <dd className="m-0 text-ink/75">Vadodara, Gujarat · IST</dd>
          </dl>
        </div>
      </Rv>

      {/*
        The four-word banner, closing the section.

        It used to be one wrapping line, and wrap is not a layout: at desktop
        width it broke as COMMERCE / TECHNOLOGY AI / GROWTH, leaving two lines
        that ended in a third of a screen of dead space, so a deliberate piece
        of typography looked like text that had run out of room.

        One word per line now, each on a rule that runs the full measure, which
        is what bounds the space beside the short words instead of abandoning
        it. The note on the right does the rest of that work, and earns the row
        at the same time: section 6 of BRAND-DESIGN-GUIDELINE.md says not to
        leave a keyword list standing on the visible page, and four bare nouns
        is precisely that. Every note summarises material already on this page,
        so nothing here is a new claim.
      */}
      <RvGroup
        as="ul"
        className="m-0 mt-20 list-none border-t border-ink/10 p-0 lg:mt-24"
        each={0.07}
      >
        {(
          [
            ['COMMERCE', 'font-bold text-ink', 'Storefronts, catalogues, checkout'],
            ['TECHNOLOGY', 'font-extralight text-ink/35', 'Architecture, performance, cloud'],
            ['AI', 'font-bold text-accent', 'Agents, retrieval, automation'],
            ['GROWTH', 'font-extralight text-ink/35', 'Search, speed, conversion'],
          ] as const
        ).map(([word, skin, note]) => (
          <RvItem key={word} as="li" className="border-b border-ink/10">
            <div className="flex items-baseline justify-between gap-8">
              <span
                className={`block py-2 font-manrope text-[clamp(38px,8.6vw,116px)] leading-[0.98] tracking-[-0.05em] ${skin}`}
              >
                {word}
              </span>
              <span className="hidden shrink-0 pb-3 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.18em] text-ink/30 md:block">
                {note}
              </span>
            </div>
          </RvItem>
        ))}
      </RvGroup>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   03 — What I build
   ───────────────────────────────────────────────────────────── */

export function Systems() {
  return (
    <section className="border-y border-ink/10 bg-surface">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <SectionLabel no="03" className="mb-10">
          What I build
        </SectionLabel>

        <Rv>
          <h2 className={`${H2} mb-5`}>
            Four systems, <span className="font-bold">not four services.</span>
          </h2>
        </Rv>
        <Rv>
          <p className="mb-16 max-w-[620px] font-manrope text-lg font-light leading-[1.7] text-ink/50 lg:mb-[72px]">
            They overlap on purpose: a commerce decision is an architecture decision before it is a
            platform decision, and an AI decision is a process decision before it is a model
            decision.
          </p>
        </Rv>

        <RvGroup className="grid gap-px bg-ink/10 lg:grid-cols-2">
          {SYSTEMS.map((system) => (
            <RvItem
              key={system.no}
              as="article"
              className="group bg-surface p-8 transition-colors duration-300 hover:bg-ground lg:p-[52px_44px]"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs font-medium leading-none tracking-[0.2em] text-accent-bright">
                  {system.no}
                </span>
                <span aria-hidden="true" className="font-mono text-xl leading-none text-ink/30">
                  ↗
                </span>
              </div>

              <h3 className="mb-4 mt-7 font-manrope text-[clamp(24px,2.6vw,40px)] font-semibold leading-[1.06] tracking-[-0.03em]">
                {system.title}
              </h3>

              {/*
                The accent underline grows on hover rather than animating in on
                a loop, which is what the canvas used. A one-shot keyframe would
                have replayed on every re-render and never on scroll.
              */}
              <div
                aria-hidden="true"
                className="h-0.5 w-16 origin-left bg-accent transition-transform duration-500 group-hover:scale-x-[1.6]"
              />

              <p className="mb-7 mt-6 font-manrope text-[17px] font-light leading-[1.7] text-ink/50">
                {system.body}
              </p>

              <div className="flex flex-wrap gap-2">
                {system.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </RvItem>
          ))}
        </RvGroup>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   04 — Selected work
   ───────────────────────────────────────────────────────────── */

export function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-[1440px] py-24 lg:pb-[120px] lg:pt-[140px]">
      <div className="px-6 lg:px-12">
        <SectionLabel no="04" className="mb-10">
          Selected work
        </SectionLabel>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-10">
          <Rv>
            <h2 className={H2}>
              Real work. <span className="font-bold">Real systems.</span>
            </h2>
          </Rv>
          <p className="m-0 max-w-[420px] font-manrope text-[17px] font-light leading-[1.7] text-ink/45">
            Six builds, and the decision inside each one. The interesting part of every one of these
            was the choice made before the code.
          </p>
        </div>
      </div>

      {/*
        Horizontal rail with scroll snapping. `overflow-x-auto` on a full-bleed
        row, with the shell gutter reproduced as padding so the first card lines
        up with the heading above it.
      */}
      <ul className="flex list-none gap-6 overflow-x-auto px-6 pb-10 pt-2 [scroll-snap-type:x_mandatory] lg:px-12">
        {PROJECTS.map((project) => (
          <li
            key={project.no}
            className="group flex-[0_0_clamp(300px,34vw,480px)] border border-ink/15 bg-surface transition-[transform,border-color] duration-300 [scroll-snap-align:start] hover:-translate-y-2 hover:border-accent/60 motion-reduce:hover:translate-y-0"
          >
            <div className="relative flex aspect-[4/3] items-end overflow-hidden border-b border-ink/10 bg-[#111] p-6">
              {project.cover ? (
                <img
                  src={project.cover}
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
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,.25)_0%,rgba(5,5,5,.8)_100%)]"
              />
              <span className="absolute right-6 top-6 font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-ink/60">
                {project.no}
              </span>
              <span className="relative font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/70">
                {project.industry}
              </span>
            </div>

            <div className="p-7 pb-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="m-0 font-manrope text-[30px] font-semibold leading-[1.05] tracking-[-0.03em]">
                  {project.name}
                </h3>
              </div>
              <p className="mt-4 font-manrope text-base font-light leading-[1.65] text-ink/50">
                {project.challenge}
              </p>
              <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 font-mono text-xs leading-[1.4]">
                <dt className="uppercase tracking-[0.14em] text-ink/35">Role</dt>
                <dd className="m-0 text-ink/70">{project.role}</dd>
                <dt className="uppercase tracking-[0.14em] text-ink/35">Stack</dt>
                <dd className="m-0 text-ink/70">{project.stack}</dd>
              </dl>
              <RuleLink href="/work/" className="mt-7">
                View case study <span className="font-mono">→</span>
              </RuleLink>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4 px-6 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.2em] text-ink/35 lg:px-12">
        <span aria-hidden="true">Scroll →</span>
        <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />
        <a href="/work/" className="text-ink transition-colors hover:text-accent-bright">
          View all work
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   05 — Featured case study. One of the two light-ground bands.
   ───────────────────────────────────────────────────────────── */

export function FeaturedCase() {
  return (
    <section className="bg-white text-ground">
      <div className={`${SHELL} py-24 lg:py-[130px]`}>
        <SectionLabel no="05" tone="light" className="mb-8">
          Featured case study
        </SectionLabel>

        <div className="flex flex-wrap items-end justify-between gap-8">
          <Rv>
            <h2 className="m-0 font-manrope text-[clamp(48px,8vw,124px)] font-bold leading-[0.9] tracking-[-0.05em]">
              {FEATURED.name}
            </h2>
          </Rv>
          <span className="font-mono text-xs font-medium uppercase leading-none tracking-[0.24em] text-accent">
            {FEATURED.kicker}
          </span>
        </div>

        <Rv className="relative mt-12 aspect-[21/9] overflow-hidden border border-ground/10 bg-[#F5F5F5]">
          <img
            src={FEATURED.cover}
            alt="Fashion D2C storefront storefront"
            width={1600}
            height={686}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </Rv>

        <RvGroup className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED.facts.map((fact) => (
            <RvItem key={fact.label}>
              <h3 className="mb-3 font-manrope text-[15px] font-semibold uppercase leading-none tracking-[0.06em]">
                {fact.label}
              </h3>
              <p className="m-0 font-manrope text-[17px] font-light leading-[1.7] text-ground/60">
                {fact.body}
              </p>
            </RvItem>
          ))}
          <RvItem>
            <h3 className="mb-3 font-manrope text-[15px] font-semibold uppercase leading-none tracking-[0.06em]">
              Technology
            </h3>
            <div className="flex flex-wrap gap-2">
              {FEATURED.tech.map((tech, i) => (
                // The lead platform is the filled chip; the rest are outlined.
                <span
                  key={tech}
                  className={`font-mono text-[11px] font-medium uppercase leading-none tracking-[0.12em] px-3.5 py-2.5 ${
                    i === 0 ? 'bg-ground text-white' : 'border border-ground/20'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </RvItem>
        </RvGroup>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   06 — Expertise
   ───────────────────────────────────────────────────────────── */

export function Expertise() {
  return (
    <section id="expertise" className={`${SHELL} ${SECTION_Y}`}>
      <SectionLabel no="06" className="mb-10">
        Expertise
      </SectionLabel>

      <Rv>
        <h2 className={`${H2} mb-5`}>
          Where technology <span className="font-bold">meets commerce.</span>
        </h2>
      </Rv>
      <p className="mb-14 max-w-[600px] font-manrope text-lg font-light leading-[1.7] text-ink/50 lg:mb-[70px]">
        Not a logo grid. An architecture, read left to right, the way a request travels through it.
      </p>

      {/*
        Four layers, not four cards.

        The paragraph above promises an architecture rather than a logo grid,
        and the previous version rendered exactly the logo grid it disclaims:
        every entry in an identical bordered chip, each with a decorative middot
        stranded on its right edge that read as a stray character in the text.

        What carries the idea instead is the rule across the top of each column
        with an accent node at its head. Four segments of one line, stepping
        left to right, is the request travelling through the stack; the names
        below hang off their layer as an index rather than sitting in boxes.
      */}
      <RvGroup className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4" each={0.06}>
        {STACK_LAYERS.map((layer) => (
          <RvItem key={layer.no}>
            <div aria-hidden="true" className="relative mb-5 h-px w-full bg-ink/15">
              <span className="absolute -top-[3px] left-0 block h-[7px] w-[7px] bg-accent" />
            </div>

            <div className="mb-6 flex items-baseline gap-3">
              <span className="font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-accent-bright">
                {layer.no}
              </span>
              <span className="font-manrope text-[15px] font-semibold uppercase leading-none tracking-[0.06em]">
                {layer.title}
              </span>
            </div>

            <ul className="m-0 list-none p-0">
              {layer.items.map((item) => (
                <li key={item} className="group border-b border-ink/10 last:border-b-0">
                  <div className="flex items-center py-3.5 font-mono text-xs font-medium leading-none tracking-[0.1em] text-ink/65 transition-colors duration-200 group-hover:text-ink">
                    {/*
                      The tick reserves its width at all times and only fades,
                      so hovering a row never nudges the text sideways.
                    */}
                    <span
                      aria-hidden="true"
                      className="mr-3 h-px w-3 shrink-0 bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                    {item}
                  </div>
                </li>
              ))}
            </ul>
          </RvItem>
        ))}
      </RvGroup>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   07 — AI
   ───────────────────────────────────────────────────────────── */

export function AiSystems() {
  return (
    <section id="ai" className="relative overflow-hidden border-t border-ink/10 bg-ground">
      {/* Circuit traces. Two accent paths on a slow dash loop. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50">
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
          <path d="M0 300 H1200" stroke="rgba(255,255,255,.07)" strokeWidth="1" />
        </svg>
      </div>

      <div className={`${SHELL} relative py-24 lg:py-[150px]`}>
        <SectionLabel no="07" className="mb-10">
          AI
        </SectionLabel>

        <Rv>
          <h2 className="m-0 max-w-[1000px] font-manrope text-[clamp(36px,6vw,96px)] font-extralight leading-[0.98] tracking-[-0.045em]">
            The next commerce system <span className="block font-bold">is intelligent.</span>
          </h2>
        </Rv>
        <Rv>
          <p className="mb-16 mt-9 max-w-[620px] font-manrope text-[19px] font-light leading-[1.7] text-ink/55 lg:mb-16">
            AI Search changes the discovery layer of commerce. Instead of matching a query to a
            keyword, the system interprets intent and returns products, categories or guidance
            based on what the customer is trying to accomplish. The rest of the value is
            unglamorous: retrieval that returns the right passage, evaluation you can trust, and
            grounding that stops a fluent answer from being a confident wrong one.
          </p>
        </Rv>

        <RvGroup
          className="grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4"
          each={0.04}
        >
          {AI_TRACKS.map((track) => (
            <RvItem
              key={track.no}
              className="flex min-h-[150px] flex-col justify-between bg-ground p-6 transition-colors duration-300 hover:bg-[#111]"
            >
              <span className="font-mono text-[10px] font-medium leading-none tracking-[0.2em] text-accent-bright">
                {track.no}
              </span>
              <div>
                <div className="mb-2.5 font-manrope text-[22px] font-semibold leading-[1.1] tracking-[-0.02em]">
                  {track.name}
                </div>
                <div className="font-manrope text-sm font-light leading-[1.55] text-ink/45">
                  {track.note}
                </div>
              </div>
            </RvItem>
          ))}
        </RvGroup>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   08 — Direct answers. The definitions, written to be quoted.
   ───────────────────────────────────────────────────────────── */

/**
 * Four short definitions on the surface band.
 *
 * This is the section an answer engine lifts from, so each block is a heading
 * and one self-contained paragraph, with no shared setup above it and no
 * pronoun reaching back into the previous block. The `auto-fit` track reflows
 * from four columns to two to one without a breakpoint of its own.
 */
export function Answers() {
  return (
    <section id="answers" className="border-y border-ink/10 bg-surface">
      <div className={`${SHELL} py-24 lg:py-[130px]`}>
        <SectionLabel no="08" className="mb-10">
          Direct answers
        </SectionLabel>

        <div className="mb-14 flex flex-wrap items-end justify-between gap-10 lg:mb-[60px]">
          <Rv>
            <h2 className={H2}>
              Short answers, <span className="font-bold">before the pitch.</span>
            </h2>
          </Rv>
          <p className="m-0 max-w-[420px] font-manrope text-[17px] font-light leading-[1.7] text-ink/45">
            The four definitions that decide most first conversations, written plainly enough to
            quote.
          </p>
        </div>

        <RvGroup
          as="ul"
          className="m-0 grid list-none gap-px border border-ink/10 bg-ink/10 p-0 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]"
          each={0.05}
        >
          {ANSWERS.map((item) => (
            <RvItem
              key={item.no}
              as="li"
              className="flex flex-col gap-[18px] bg-surface p-8 transition-colors duration-300 hover:bg-ground lg:px-9 lg:py-11"
            >
              <span className="font-mono text-[10px] font-medium leading-none tracking-[0.2em] text-accent-bright">
                {item.no}
              </span>
              <h3 className="m-0 font-manrope text-[22px] font-semibold leading-[1.2] tracking-[-0.02em]">
                {item.q}
              </h3>
              <p className="m-0 font-manrope text-base font-light leading-[1.7] text-ink/55">
                {item.a}
              </p>
            </RvItem>
          ))}
        </RvGroup>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   09 — The evolution
   ───────────────────────────────────────────────────────────── */

export function Evolution() {
  return (
    <section className={`${SHELL} ${SECTION_Y}`}>
      <SectionLabel no="09" className="mb-10">
        The evolution
      </SectionLabel>

      <Rv>
        <h2 className={`${H2} mb-5`}>
          From code <span className="font-bold">to company.</span>
        </h2>
      </Rv>

      <div className="mb-16 flex flex-wrap items-end justify-between gap-10 lg:mb-[70px]">
        <p className="m-0 max-w-[620px] font-manrope text-lg font-light leading-[1.7] text-ink/50">
          Eight shifts, each one forced by a problem the previous way of working could not hold. The
          technology changed roughly every three years. What it was for did not.
        </p>
        <RuleLink href="/experience/">Full experience ↗</RuleLink>
      </div>

      {/*
        A timeline, not a table of three columns.
        
        The previous version gave each shift a year, a heading and a paragraph,
        which is a summary of a career rather than a record of one: no role
        title, no place, nothing built, no stack. It also read as a list because
        nothing joined the entries together.
        
        The rail does that joining. A single hairline runs down the left of the
        content column with an accent node at each entry, so the eye follows one
        line from 2010 to now, and the period and place sit out in the left
        margin where they can be scanned without reading the prose.
      */}
      <RvGroup as="ol" className="m-0 list-none p-0" each={0.05}>
        {TIMELINE.map((entry) => (
          <RvItem key={`${entry.period}-${entry.role}`} as="li">
            <div className="grid gap-x-10 gap-y-3 lg:grid-cols-[190px_minmax(0,1fr)]">
              {/* Left margin: the two things worth scanning without reading. */}
              <div className="pt-8 lg:pt-9">
                <div className="font-mono text-[13px] font-medium leading-none tracking-[0.18em] text-accent-bright">
                  {entry.period}
                </div>
                <div className="mt-2.5 font-mono text-[11px] uppercase leading-[1.5] tracking-[0.14em] text-ink/35">
                  {entry.place}
                </div>
              </div>

              {/*
                The rail. `before` draws the hairline down the full height of the
                entry and the node sits on it, so the line is continuous between
                entries instead of restarting at each one.
              */}
              <div className="relative border-t border-ink/10 pb-10 pt-8 lg:border-t-0 lg:border-l lg:border-l-ink/10 lg:pl-10 lg:pt-9">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[38px] hidden h-[7px] w-[7px] -translate-x-1/2 bg-accent lg:block"
                />

                <h3 className="m-0 font-manrope text-[clamp(21px,2.2vw,30px)] font-semibold leading-[1.15] tracking-[-0.02em]">
                  {entry.role}
                </h3>
                <div className="mt-2.5 font-mono text-[11px] uppercase leading-[1.5] tracking-[0.14em] text-ink/40">
                  {entry.org}
                </div>

                <p className="m-0 mt-5 max-w-[68ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                  {entry.body}
                </p>

                <ul className="m-0 mt-6 grid list-none gap-x-10 gap-y-2.5 p-0 xl:grid-cols-2">
                  {entry.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3.5 font-manrope text-[15px] font-light leading-[1.6] text-ink/60"
                    >
                      {/*
                        A rule, not an em dash. The source for this section used
                        "—" as its bullet character, which section 2 bans from
                        the project and which a screen reader reads aloud.
                      */}
                      <span
                        aria-hidden="true"
                        className="mt-[11px] h-px w-3 shrink-0 bg-accent/50"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-ink/15 px-3 py-2 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-ink/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RvItem>
        ))}
      </RvGroup>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   The accent quote band.
   ───────────────────────────────────────────────────────────── */

export function QuoteBand() {
  return (
    <section className="bg-accent text-white">
      <div
        className={`${SHELL} grid items-center gap-12 py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:py-[110px]`}
      >
        <Rv>
          <blockquote className="m-0 font-manrope text-[clamp(28px,4.4vw,64px)] font-light leading-[1.1] tracking-[-0.035em] [text-wrap:pretty]">
            &ldquo;Technology should not make business more complicated.{' '}
            <span className="font-bold">It should make growth easier.&rdquo;</span>
          </blockquote>
        </Rv>
        <div className="flex flex-col items-start gap-4 lg:items-end">
          <img
            src={PORTRAITS.quote}
            alt="Yuvraj Raulji"
            width={1200}
            height={1680}
            loading="lazy"
            decoding="async"
            className="h-[290px] w-[230px] border border-white/40 object-cover object-[50%_15%] grayscale contrast-[1.05]"
          />
          <span className="font-mono text-xs font-medium uppercase leading-none tracking-[0.24em]">
            Yuvraj Raulji
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   10 — Insights. Reads the real post index, not the mockup's fixture.
   ───────────────────────────────────────────────────────────── */

export function Insights() {
  // The canvas hard-coded six article rows. The site already has a post index,
  // so the section reads that instead: the titles stay true and every row is a
  // working link rather than an anchor back to itself.
  const posts = Object.entries(POSTS).slice(0, 6);

  return (
    <section id="insights" className={`${SHELL} ${SECTION_Y}`}>
      <SectionLabel no="10" className="mb-10">
        Insights
      </SectionLabel>

      <div className="mb-14 flex flex-wrap items-end justify-between gap-10">
        <Rv>
          <h2 className={H2}>
            Things I&rsquo;m <span className="font-bold">thinking about.</span>
          </h2>
        </Rv>
        <RuleLink href="/blog/">All writing →</RuleLink>
      </div>

      <RvGroup as="ul" className="m-0 list-none p-0" each={0.05}>
        {posts.map(([slug, post]) => (
          <RvItem key={slug} as="li" className="border-t border-ink/10">
            <a
              href={`/blog/${slug}/`}
              className="grid items-center gap-4 px-2 py-8 transition-[background-color,padding-left] duration-300 hover:bg-surface hover:pl-5 lg:grid-cols-[150px_minmax(0,1fr)_190px_60px] lg:gap-9"
            >
              <span className="font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-[0.16em] text-accent-bright">
                {post.cat}
              </span>
              <span className="font-manrope text-[clamp(18px,1.9vw,27px)] font-medium leading-[1.25] tracking-[-0.02em]">
                {post.title}
              </span>
              <span className="font-mono text-xs leading-[1.5] text-ink/40">
                {post.date} · {post.readTime}
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-[22px] leading-none text-ink/35 lg:justify-self-end"
              >
                →
              </span>
            </a>
          </RvItem>
        ))}
      </RvGroup>
      <div className="border-t border-ink/10" />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   10 — Social authority
   ───────────────────────────────────────────────────────────── */

const CHANNELS = [
  { href: CONTACT.linkedin, kicker: 'Professional', name: 'LinkedIn', external: true },
  { href: '/blog/', kicker: 'Technical writing', name: 'Insights', external: false },
  { href: CONTACT.instagram, kicker: 'Behind the work', name: 'Instagram', external: true },
  { href: '/work/', kicker: 'Case studies', name: 'Projects', external: false },
] as const;

export function Social() {
  return (
    <section className="border-t border-ink/10 bg-surface">
      <div
        className={`${SHELL} grid items-center gap-12 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-[70px] lg:py-[120px]`}
      >
        <div>
          <SectionLabel no="11" className="mb-8">
            Writing &amp; profiles
          </SectionLabel>
          <Rv>
            <h2 className="mb-6 m-0 font-manrope text-[clamp(30px,3.8vw,58px)] font-extralight leading-[1.05] tracking-[-0.035em]">
              Follow the <span className="font-bold">journey.</span>
            </h2>
          </Rv>
          <p className="mb-9 font-manrope text-[17px] font-light leading-[1.7] text-ink/50">
            Long-form technical writing, build notes and platform opinions, published where the
            conversation already happens.
          </p>
          <div className="flex items-center gap-5 border-t border-ink/10 pt-7">
            <img
              src={PORTRAITS.contact}
              alt="Yuvraj Raulji"
              width={1200}
              height={1680}
              loading="lazy"
              decoding="async"
              className="h-[88px] w-[88px] shrink-0 object-cover object-[50%_14%] grayscale contrast-[1.05]"
            />
            <div className="flex flex-col gap-2">
              <span className="font-manrope text-[17px] font-semibold leading-none tracking-[-0.01em]">
                Yuvraj Raulji
              </span>
              <span className="font-mono text-xs leading-[1.5] text-ink/45">
                Writes about commerce architecture, performance and AI
              </span>
            </div>
          </div>
        </div>

        <RvGroup className="grid grid-cols-2 gap-px border border-ink/10 bg-ink/10">
          {CHANNELS.map((channel) => (
            <RvItem key={channel.name}>
              <a
                href={channel.href}
                {...(channel.external ? { target: '_blank', rel: 'noopener' } : {})}
                className="flex h-full flex-col justify-between gap-8 bg-surface p-7 transition-colors duration-300 hover:bg-ground"
              >
                <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/40">
                  {channel.kicker}
                </span>
                <span className="font-manrope text-2xl font-semibold leading-none">
                  {channel.name} <span className="text-accent">↗</span>
                </span>
              </a>
            </RvItem>
          ))}
        </RvGroup>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   12 — Questions.
   ───────────────────────────────────────────────────────────── */

/**
 * The ten questions that come up before a first call.
 *
 * FAQS also feeds the FAQPage node in lib/schema-brand.ts. That is why every
 * answer renders as open text rather than inside a <details>: the markup has to
 * correspond to text a reader can actually see, and collapsed-by-default
 * answers are the usual way that correspondence gets argued about. Ten short
 * answers cost less height than the argument.
 */
export function Faq() {
  return (
    <section id="faq" className={`${SHELL} ${SECTION_Y}`}>
      <SectionLabel no="12" className="mb-10">
        Questions
      </SectionLabel>

      <div className="mb-14 flex flex-wrap items-end justify-between gap-10 lg:mb-[60px]">
        <Rv>
          <h2 className={H2}>
            What people ask <span className="font-bold">before a first call.</span>
          </h2>
        </Rv>
        <p className="m-0 max-w-[400px] font-manrope text-[17px] font-light leading-[1.7] text-ink/45">
          Ten answers, in the words I would use on the call itself.
        </p>
      </div>

      <RvGroup
        as="ul"
        className="m-0 grid list-none gap-px border border-ink/10 bg-ink/10 p-0 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]"
        each={0.04}
      >
        {FAQS.map((item) => (
          <RvItem
            key={item.no}
            as="li"
            className="flex flex-col gap-4 bg-ground p-8 lg:px-[34px] lg:py-[38px]"
          >
            <div className="flex items-baseline gap-3.5">
              <span className="shrink-0 font-mono text-[10px] font-medium leading-[1.4] tracking-[0.18em] text-accent-bright">
                {item.no}
              </span>
              <h3 className="m-0 font-manrope text-xl font-semibold leading-[1.3] tracking-[-0.015em]">
                {item.q}
              </h3>
            </div>
            <p className="m-0 ml-6 font-manrope text-base font-light leading-[1.7] text-ink/55">
              {item.a}
            </p>
          </RvItem>
        ))}
      </RvGroup>

      <div className="mt-11 flex flex-wrap items-center gap-[18px]">
        <span className="font-manrope text-[17px] font-light leading-[1.6] text-ink/50">
          Question not answered here?
        </span>
        <RuleLink href="#contact">Start a conversation →</RuleLink>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   13 — Consultation. The second light band.
   ───────────────────────────────────────────────────────────── */

export function Book() {
  return (
    <section id="book" className="bg-white text-ground">
      <div
        className={`${SHELL} grid items-center gap-12 py-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-[70px] lg:py-[120px]`}
      >
        <div>
          <SectionLabel no="13" tone="light" className="mb-8">
            Consultation
          </SectionLabel>
          <Rv>
            <h2 className="m-0 mb-6 font-manrope text-[clamp(32px,4.4vw,66px)] font-extralight leading-[1.02] tracking-[-0.04em]">
              Book 30 minutes.{' '}
              <span className="block font-bold">Leave with a decision.</span>
            </h2>
          </Rv>
          <p className="mb-9 max-w-[620px] font-manrope text-lg font-light leading-[1.7] text-ground/60">
            Thirty minutes on your constraint, not on my slides. Bring a commerce, architecture or
            AI problem and we will name the decision behind it, what AI should and should not touch
            in your operation, and the next practical step.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Cta
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('30-min technology consult')}`}
              variant="accent"
            >
              Book the 30-min slot
            </Cta>
            <Cta href={CONTACT.whatsapp} variant="outline" tone="light">
              WhatsApp instead
            </Cta>
          </div>
        </div>

        <RvGroup className="grid grid-cols-2 gap-px border border-ground/15 bg-ground/15" each={0.05}>
          {ENGAGEMENTS.map((engagement) => (
            <RvItem
              key={engagement.no}
              className="flex min-h-[132px] flex-col justify-between gap-4 bg-white p-6"
            >
              <span className="font-mono text-[10px] font-medium leading-none tracking-[0.2em] text-accent">
                {engagement.no}
              </span>
              <div>
                <div className="mb-1.5 font-manrope text-[17px] font-semibold leading-[1.2] tracking-[-0.01em]">
                  {engagement.name}
                </div>
                <div className="font-manrope text-[13px] font-light leading-[1.5] text-ground/55">
                  {engagement.note}
                </div>
              </div>
            </RvItem>
          ))}
        </RvGroup>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   12 — Contact
   ───────────────────────────────────────────────────────────── */

export function Contact() {
  return (
    <section id="contact" className={`${SHELL} py-24 lg:pb-[120px] lg:pt-[150px]`}>
      <SectionLabel no="14" className="mb-11">
        Contact
      </SectionLabel>

      <Rv>
        <h2 className="m-0 font-manrope text-[clamp(38px,6.6vw,104px)] font-extralight leading-[0.96] tracking-[-0.05em]">
          Let&rsquo;s build something{' '}
          <span className="block font-bold">
            that <span className="text-accent">matters.</span>
          </span>
        </h2>
      </Rv>

      <div className="mt-14 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-9 font-manrope text-[19px] font-light leading-[1.7] text-ink/55">
            Have a commerce, AI or technology problem that needs a clearer decision? Describe it
            in a few lines and I will reply within 24 hours, IST business days.
          </p>
          <div className="flex flex-wrap gap-4">
            <Cta href={`mailto:${CONTACT.email}`} variant="accent">
              Start a conversation
            </Cta>
            <Cta href={CONTACT.whatsapp} variant="outline">
              Book 30 minutes
            </Cta>
          </div>
          <dl className="mt-14 grid grid-cols-[auto_1fr] gap-x-7 gap-y-4 font-mono text-[13px] leading-[1.5]">
            <dt className="uppercase tracking-[0.16em] text-ink/35">Email</dt>
            <dd className="m-0">
              <a href={`mailto:${CONTACT.email}`} className="hover:text-accent-bright">
                {CONTACT.email}
              </a>
            </dd>
            <dt className="uppercase tracking-[0.16em] text-ink/35">Phone</dt>
            <dd className="m-0">
              <a href={CONTACT.phoneHref} className="hover:text-accent-bright">
                {CONTACT.phone}
              </a>
            </dd>
            <dt className="uppercase tracking-[0.16em] text-ink/35">Based in</dt>
            <dd className="m-0 text-ink/70">
              {CONTACT.location} · {CONTACT.timezone}
            </dd>
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
