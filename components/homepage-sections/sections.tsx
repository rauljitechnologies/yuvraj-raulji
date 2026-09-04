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
 * This replaced a fifteen-section page ordered as a narrative about what
 * Yuvraj finds interesting: a position statement, four "systems", a featured
 * case, a stack diagram, direct answers, a career timeline, a pull quote, a
 * channels grid, a consultation band and a contact band. Most of it was good
 * writing answering a question nobody had asked yet. What went, and why:
 *
 *   - Featured case      a second, longer telling of a project already on the
 *                        page. One telling, then /work/.
 *   - Direct answers     four definitions that the FAQ already covers, on a
 *                        page that now has one FAQ instead of two.
 *   - The evolution      a career timeline belongs on /about/, which has one.
 *   - Quote band         a pull quote between two sections that were both
 *                        already making the point.
 *   - Channels           four links to social profiles, in the middle of the
 *                        page, competing with the actual call to action. The
 *                        footer already carries them.
 *   - Consultation       merged into Contact, because two closing bands split
 *                        one decision across two scroll positions.
 *
 * ── Rendering ──────────────────────────────────────────────────────────────
 *
 * Every section here is a server component reading module-scope data, so the
 * whole page prerenders to static HTML at build time (next.config.mjs sets
 * `output: 'export'`). The only JavaScript the page ships is the scroll-reveal
 * wrappers and the contact form.
 *
 * ── Headings ───────────────────────────────────────────────────────────────
 *
 * One H1, in the hero, and it names the role. Every section below opens an H2.
 * Repeated items inside a section are H3. No level is skipped.
 */

/* Shared shell classes: a 1440px container with 48px gutters, dropping to
   20px under `sm` where 48px would eat a phone's width. */
const SHELL = 'mx-auto max-w-[1440px] px-5 sm:px-6 md:px-8 lg:px-12';
const SECTION_Y = 'py-16 sm:py-20 md:py-24 lg:py-[140px]';

/** The two-weight display heading repeated in every section. */
const H2 =
  'm-0 font-manrope text-[clamp(34px,4.6vw,68px)] font-extralight leading-[1.02] tracking-[-0.035em]';

/* ─────────────────────────────────────────────────────────────
   02 — Credibility
   ───────────────────────────────────────────────────────────── */

/**
 * The four numbers, immediately under the hero.
 *
 * Every figure here comes from STATS in lib/homepage.ts, which is the one
 * place on this site a verified number is written down. Nothing in this file
 * types a figure of its own, so the page cannot contradict itself and a number
 * can only be changed in the place where its provenance is recorded.
 *
 * Deliberately not a card grid. Four hairline cells on the page ground read as
 * a masthead; four bordered boxes read as an infographic, and an infographic
 * of your own achievements is the least credible way to present them.
 */
export function Credibility() {
  return (
    <section
      id="credibility"
      aria-labelledby="credibility-title"
      className="border-y border-ink/10 bg-surface"
    >
      <div className={`${SHELL} py-12 sm:py-14 lg:py-16`}>
        <h2 id="credibility-title" className="sr-only">
          Experience at a glance
        </h2>
        <RvGroup
          className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12"
          each={0.05}
        >
          {STATS.map((stat) => (
            <RvItem key={stat.label} className="flex flex-col gap-3">
              <span className="font-manrope text-[clamp(38px,4.4vw,58px)] font-semibold leading-[0.95] tracking-[-0.04em] text-accent-bright">
                {stat.value}
              </span>
              <span className="max-w-[26ch] font-manrope text-[15px] font-light leading-[1.55] text-ink/55">
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
   03 — The problems
   ───────────────────────────────────────────────────────────── */

/**
 * The symptoms, before the services.
 *
 * A visitor does not arrive looking for "commerce architecture". They arrive
 * because checkout is leaking or the site is slow, and they will only recognise
 * the offer once they have recognised themselves. So this section runs before
 * the capabilities rather than after: it earns the right to describe the work
 * by first describing the problem.
 *
 * Nine rows on a hairline grid rather than nine cards. Cards would give each
 * symptom a frame and equal visual weight with a call to action, which is more
 * ceremony than a symptom deserves.
 */
export function Problems() {
  return (
    <section id="problems" aria-labelledby="problems-title" className={`${SHELL} ${SECTION_Y}`}>
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
        className="m-0 grid list-none gap-px border border-ink/10 bg-ink/10 p-0 sm:grid-cols-2 lg:grid-cols-3"
        each={0.03}
      >
        {PROBLEMS.map((problem) => (
          <RvItem
            key={problem.no}
            as="li"
            className="flex flex-col gap-3 bg-ground p-6 transition-colors duration-300 hover:bg-surface sm:p-7"
          >
            <span className="font-mono text-[10px] font-medium leading-none tracking-[0.2em] text-accent-bright">
              {problem.no}
            </span>
            <h3 className="m-0 font-manrope text-[19px] font-semibold leading-[1.2] tracking-[-0.02em] sm:text-[21px]">
              {problem.name}
            </h3>
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
        <Cta href="#contact" variant="outline">
          Start a conversation
        </Cta>
      </Rv>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   04 — What I help businesses with
   ───────────────────────────────────────────────────────────── */

/**
 * Four areas, as full-width rows rather than as a service-card grid.
 *
 * The brief for this page asked specifically that these not look like service
 * cards, and the reason is worth writing down: a four-up card grid compresses
 * each area into about 30 words and a bullet list, which is exactly the format
 * every agency site uses, so it reads as a template no matter how good the
 * writing inside it is. A full-width row gives the paragraph room to sound like
 * a person, and the numbered rule down the left is what carries the rhythm
 * instead of four boxes.
 *
 * `id="growth"` sits on the third row because the hero links into it by name.
 */
export function Capabilities() {
  return (
    <section
      id="expertise"
      aria-labelledby="capabilities-title"
      className="border-t border-ink/10 bg-surface"
    >
      <div className={`${SHELL} ${SECTION_Y}`}>
        <SectionLabel className="mb-10">What I help businesses with</SectionLabel>

        <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <Rv>
            <h2 id="capabilities-title" className={H2}>
              Four areas, and <span className="font-bold">the decisions inside them.</span>
            </h2>
          </Rv>
          <Rv>
            <p className="m-0 max-w-[52ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55 sm:text-[19px] lg:mt-2">
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
              className="grid gap-x-12 gap-y-7 border-t border-ink/12 py-9 lg:grid-cols-[56px_minmax(0,0.95fr)_minmax(0,1.05fr)] lg:py-14"
            >
              <span
                aria-hidden="true"
                className="font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-accent-bright"
              >
                {area.no}
              </span>

              {/*
                Heading and body share the middle column, and the items get the
                right one. They were split as heading / body-plus-items, which
                left the middle column empty under a two-word heading for most
                of the row's height: about 400px of nothing per area on a
                desktop, which reads as a rendering fault rather than as
                editorial space. This also removes the paragraph that was
                printed twice and hidden at alternate breakpoints.
              */}
              <div>
                {/* The hero links into the growth area by name, so that row's
                    heading carries the anchor. A heading is the right target:
                    a deep link should land on the thing it named. */}
                <h3
                  id={area.no === '03' ? 'growth' : undefined}
                  className="m-0 max-w-[14ch] scroll-mt-28 font-manrope text-[clamp(24px,2.6vw,36px)] font-semibold leading-[1.08] tracking-[-0.03em]"
                >
                  {area.name}
                </h3>
                <p className="mt-5 max-w-[46ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/50 sm:text-[17px]">
                  {area.body}
                </p>
              </div>

              <div>
                {/*
                  The items are a list, and marked as one. They were the part
                  most at risk of becoming a tag cloud, so they are set as two
                  columns of quiet type with a hairline rule between rows,
                  which reads as a specification rather than as decoration.
                */}
                <ul className="m-0 grid list-none grid-cols-1 gap-x-8 p-0 sm:grid-cols-2">
                  {area.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 border-b border-ink/8 py-2.5 font-manrope text-[15px] font-light leading-[1.5] text-ink/60"
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

        <Rv className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-ink/12 pt-10">
          {/*
            Two lines, and the measure is 44ch to hold it there.

            The link was added to this sentence without shortening it, and the
            measure was widened to 52ch to fit the extra words. The result set
            in three lines with "actually for." alone on the third, at 17% of
            the measure: a two-word widow under a heading, next to the only
            accent button in the section. Both of the other section closes on
            this page set in two, so this one was the odd row rather than a new
            idea. The sentence is shorter now instead of the column being
            wider, which keeps the link and drops the orphan.
          */}
          <p className="m-0 max-w-[44ch] font-manrope text-[17px] font-light leading-[1.65] text-ink/55">
            Not sure which of these the problem sits in? Establishing that is what{' '}
            <a
              href="/expertise/ecommerce-consulting/"
              className="border-b border-accent/60 text-ink/75 transition-colors hover:border-accent-bright hover:text-ink"
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
   05 — Why Yuvraj
   ───────────────────────────────────────────────────────────── */

/** The five words the position is built from, set as type rather than prose. */
const INTERSECTION = ['Business', 'Technology', 'eCommerce', 'AI', 'Growth'] as const;

/**
 * The position, on the accent ground.
 *
 * This is the one section on the page that argues rather than informs, so it
 * gets the one full red band. The list of five is set as a typographic stack
 * with hairline plus signs between the words: the brief asked for the five to
 * be connected and asked specifically that the multiplication sign not be used
 * for it, which is also section 1 of BRAND-DESIGN-GUIDELINE.md.
 */
export function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="bg-accent text-white">
      <div className={`${SHELL} py-16 sm:py-20 md:py-24 lg:py-[130px]`}>
        <div className="mb-4 flex items-center gap-3.5">
          <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.3em] text-white/95">
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
              <p className="mt-5 max-w-[52ch] font-manrope text-[17px] font-light leading-[1.75] text-white/95">
                The right technology should improve performance, reduce friction, simplify
                operations, improve customer experience and create measurable business value. Every
                decision on this page is judged against that, which is also why some of the advice
                is to leave a system alone.
              </p>
            </Rv>
          </div>

          {/*
            The five, stacked. Set large and light with a hairline rule and a
            plus between each, so it reads as one continuous position rather
            than as five tags.
          */}
          <RvGroup as="ul" className="m-0 list-none p-0" each={0.06}>
            {INTERSECTION.map((word, i) => (
              <RvItem key={word} as="li" className="border-t border-white/25 first:border-t-0">
                <div className="flex items-baseline gap-5 py-3.5 lg:py-5">
                  <span
                    aria-hidden="true"
                    className="w-4 shrink-0 font-mono text-[18px] leading-none text-white/80"
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
   06 — Selected work
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

      {/*
        Horizontal rail with scroll snapping. `overflow-x-auto` on a full-bleed
        row, with the shell gutter reproduced as padding so the first card lines
        up with the heading above it.
      */}
      <ul className="flex list-none gap-4 overflow-x-auto px-5 pb-10 pt-2 [scroll-snap-type:x_mandatory] sm:gap-6 sm:px-6 md:px-8 lg:px-12">
        {PROJECTS.map((project) => (
          <li
            key={project.no}
            className="group flex-[0_0_min(300px,82vw)] border border-ink/15 bg-surface sm:flex-[0_0_clamp(300px,34vw,480px)] transition-[transform,border-color] duration-300 [scroll-snap-align:start] hover:-translate-y-2 hover:border-accent/60 motion-reduce:hover:translate-y-0"
          >
            <div className="relative flex aspect-[4/3] items-end overflow-hidden border-b border-ink/10 bg-[#111] p-6">
              {project.cover ? (
                /*
                  The masters are 1920px wide and this tile is never wider than
                  480 CSS pixels, so a phone was downloading up to 460 KB to
                  paint a 300px card. The 640 and 960 cuts are the same files
                  resized, and sit beside the master in
                  public/assets/case-covers.
                */
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
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,.25)_0%,rgba(5,5,5,.8)_100%)]"
              />
              <span className="absolute right-6 top-6 font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-ink/60">
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
              {/*
                Industry, technology and role, as a definition list. The brief
                for this page asked each project to carry industry, technology,
                challenge, approach and outcome. Industry is on the cover plate
                above; challenge is the paragraph; approach and outcome are the
                two below. Nothing here is a number, because no verified
                per-project figure exists for these six and inventing one to
                fill a row would be the one unrecoverable mistake on a
                consultant's homepage.
              */}
              <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 font-mono text-xs leading-[1.4]">
                <dt className="uppercase tracking-[0.14em] text-ink/55">Approach</dt>
                <dd className="m-0 text-ink/70">{project.role}</dd>
                <dt className="uppercase tracking-[0.14em] text-ink/55">Technology</dt>
                <dd className="m-0 text-ink/70">{project.stack}</dd>
              </dl>
              {/*
                Deep-linked to the case's own anchor on /work/, not to the top
                of it. Six cards all reading "View case study" and all pointing
                at one URL is six copies of the same link: nothing tells a
                reader, or a crawler, which card leads where. The name is
                appended for assistive technology only, so the visible rule
                stays as short as the design wants it.
              */}
              <RuleLink href={`/work/#${project.id}`} className="mt-7">
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
        <a href="/work/" className="py-2.5 text-ink transition-colors hover:text-accent-bright">
          View selected work
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   07 — AI
   ───────────────────────────────────────────────────────────── */

export function AiCommerce() {
  return (
    <section
      id="ai"
      aria-labelledby="ai-title"
      className="relative overflow-hidden border-t border-ink/10 bg-ground"
    >
      {/* Circuit traces. Two accent paths on a slow dash loop. Decorative. */}
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
   08 — Technology ecosystem
   ───────────────────────────────────────────────────────────── */

/**
 * The stack, as type.
 *
 * Explicitly not a logo wall. A grid of vendor marks tells a reader that these
 * words have been heard of; a grouped list says which layer each one sits in,
 * which is the only part a client's own technical reviewer will read closely.
 * It also keeps the page free of thirty third-party images that would each
 * need loading, licensing and a colour treatment to survive the dark ground.
 */
export function Ecosystem() {
  return (
    <section
      id="technology"
      aria-labelledby="technology-title"
      className="border-t border-ink/10 bg-surface"
    >
      <div className={`${SHELL} ${SECTION_Y}`}>
        <SectionLabel className="mb-10">Technology ecosystem</SectionLabel>

        <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <Rv>
            <h2 id="technology-title" className={H2}>
              The stack, <span className="font-bold">grouped by what it is for.</span>
            </h2>
          </Rv>
          <Rv>
            <p className="m-0 max-w-[52ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55 sm:text-[19px] lg:mt-2">
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
              className="grid gap-x-12 gap-y-5 border-t border-ink/12 py-8 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] lg:py-11"
            >
              <h3 className="m-0 font-manrope text-[clamp(19px,1.8vw,24px)] font-semibold leading-[1.2] tracking-[-0.02em]">
                {group.name}
              </h3>
              <ul className="m-0 flex list-none flex-wrap gap-x-8 gap-y-3 p-0">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="font-manrope text-[16px] font-light leading-[1.5] text-ink/55 sm:text-[17px]"
                  >
                    {/*
                      The name is the anchor text where a page exists behind it,
                      which is the descriptive anchor a platform page wants:
                      "Shopify" pointing at /shopify/. The hairline underline
                      is what separates a link from a label here, because at
                      this weight a colour change alone would not read.
                    */}
                    {item.href ? (
                      <a
                        href={item.href}
                        className="border-b border-ink/25 pb-0.5 transition-colors duration-200 hover:border-accent hover:text-ink"
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
        <div className="border-t border-ink/12" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   09 — Working approach
   ───────────────────────────────────────────────────────────── */

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className={`${SHELL} ${SECTION_Y}`}>
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

      {/*
        An ordered list, because the order is the entire content. The oversized
        ordinal is decorative and hidden from assistive technology: the list
        already announces its own numbering, and hearing "01, 01 Audit" is the
        kind of duplication that makes people turn a screen reader off.
      */}
      <RvGroup
        as="ol"
        className="m-0 grid list-none gap-px border border-ink/10 bg-ink/10 p-0 sm:grid-cols-2 lg:grid-cols-5"
        each={0.05}
      >
        {APPROACH.map((step) => (
          <RvItem key={step.no} as="li" className="flex flex-col gap-4 bg-ground p-6 sm:p-7">
            <span
              aria-hidden="true"
              className="font-manrope text-[clamp(34px,3.6vw,46px)] font-medium leading-[0.8] tracking-[-0.04em] text-ink/40"
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
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   10 — About
   ───────────────────────────────────────────────────────────── */

/**
 * The person, briefly.
 *
 * Short on purpose. The homepage's job is to establish that there is a real
 * person with a real record and then hand off to /about/, which has the full
 * account. A long biography here competes with the call to action for the same
 * scroll position and usually wins, which is the wrong outcome.
 */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-t border-ink/10 bg-surface"
    >
      <div className={`${SHELL} py-16 sm:py-20 md:py-24 lg:py-[120px]`}>
        <SectionLabel className="mb-10">About</SectionLabel>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div>
            <Rv>
              <h2 id="about-title" className={H2}>
                A technology consultant who{' '}
                <span className="font-bold">thinks beyond technology.</span>
              </h2>
            </Rv>
            <Rv>
              <p className="mt-8 max-w-[54ch] font-manrope text-[17px] font-light leading-[1.75] text-ink/55 sm:text-[19px]">
                The work sits where eCommerce, technology, AI, digital transformation and business
                growth meet, which in practice means the answer is rarely only technical. A slow
                storefront can be a caching problem or a merchandising one. A failing integration is
                usually a process that was never agreed.
              </p>
            </Rv>
            <Rv>
              <p className="mt-5 max-w-[54ch] font-manrope text-[17px] font-light leading-[1.75] text-ink/50">
                The record runs from the first Magento role in 2016 through Shopify, headless
                commerce and, more recently, AI systems: catalogues in the hundreds of thousands of
                SKUs, multi-store platforms, B2B approval workflows and the operations behind them.
              </p>
            </Rv>
            <Rv className="mt-9 flex flex-wrap gap-3.5">
              <Cta href="/about/" variant="outline">
                More about Yuvraj
              </Cta>
            </Rv>
          </div>

          {/*
            Three lines of fact rather than a portrait: the hero already carries
            the photograph, and a second one here would be the page repeating
            its strongest asset at half the size.
          */}
          <RvGroup as="dl" className="m-0 self-center" each={0.06}>
            {[
              { label: 'Based in', value: CONTACT.location },
              { label: 'Working hours', value: CONTACT.timezone },
              { label: 'Focus', value: 'eCommerce, AI and technology strategy' },
            ].map((row) => (
              <RvItem
                key={row.label}
                className="flex flex-col gap-1.5 border-t border-ink/12 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <dt className="font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-[0.16em] text-ink/55">
                  {row.label}
                </dt>
                <dd className="m-0 font-manrope text-[16px] font-light leading-[1.5] text-ink/65 sm:text-right">
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
   11 — Insights
   ───────────────────────────────────────────────────────────── */

export function Insights() {
  /*
    WRITING, not POSTS. Both are the same eight articles, but POSTS is a record
    in authoring order and this section is labelled as the latest writing: it
    was rendering 12 Jun, 08 Jun, 05 Jun, 10 May, 15 May, which is not a date
    order in either direction. WRITING is the same data sorted newest first,
    and it is also the array the ItemList in the page's structured data is
    built from, so the visible list and the markup can no longer disagree.
  */
  const posts = WRITING.slice(0, 6);

  return (
    <section id="insights" aria-labelledby="insights-title" className={`${SHELL} ${SECTION_Y}`}>
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
              className="grid items-center gap-3 px-1 py-6 transition-[background-color,padding-left] duration-300 hover:bg-surface hover:pl-5 sm:gap-4 sm:px-2 sm:py-8 md:grid-cols-[130px_minmax(0,1fr)_auto] md:gap-6 lg:grid-cols-[150px_minmax(0,1fr)_190px_60px] lg:gap-9"
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
                className="hidden font-mono text-[22px] leading-none text-ink/55 lg:block lg:justify-self-end"
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
   12 — Questions
   ───────────────────────────────────────────────────────────── */

/**
 * The questions that come up before a first call.
 *
 * FAQS in lib/homepage.ts is the single source for both this section and the
 * FAQPage node in lib/schema-brand.ts. FAQPage markup that does not match the
 * visible text is a structured-data violation, so the two can never be allowed
 * to drift apart, which is why neither is typed twice.
 */
export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-t border-ink/10 bg-surface"
    >
      <div className={`${SHELL} ${SECTION_Y}`}>
        <SectionLabel className="mb-10">Questions</SectionLabel>

        <div className="mb-10 flex flex-wrap items-end justify-between gap-8 sm:mb-14 sm:gap-10 lg:mb-[60px]">
          <Rv>
            <h2 id="faq-title" className={H2}>
              What people ask <span className="font-bold">before a first call.</span>
            </h2>
          </Rv>
          <p className="m-0 max-w-[400px] font-manrope text-[17px] font-light leading-[1.7] text-ink/50">
            The answers, in the words I would use on the call itself.
          </p>
        </div>

        <RvGroup
          as="ul"
          className="m-0 grid list-none gap-px border border-ink/10 bg-ink/10 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]"
          each={0.04}
        >
          {FAQS.map((item) => (
            <RvItem
              key={item.no}
              as="li"
              className="flex flex-col gap-4 bg-ground p-6 sm:p-8 lg:px-[34px] lg:py-[38px]"
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
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   13 — Contact. The close.
   ───────────────────────────────────────────────────────────── */

const DETAILS = [
  { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: 'Phone', value: CONTACT.phone, href: CONTACT.phoneHref },
  { label: 'Website', value: 'www.yuvrajraulji.com', href: 'https://www.yuvrajraulji.com/' },
  { label: 'Based in', value: `${CONTACT.location} · ${CONTACT.timezone}`, href: null },
] as const;

/**
 * Contact, on white, and the only close on the page.
 *
 * This used to be two bands: a "Consultation" offer and, under it, a contact
 * form. Two closing sections split one decision across two scroll positions and
 * gave a reader who was ready to act a second thing to read first. They are one
 * band now: the offer, the details, and the form that acts on it.
 *
 * `id="book"` is kept as a second anchor on the same section because the site
 * footer has linked to `/#book` since before this restructure.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-ground/10 bg-white text-ground"
    >
      <span id="book" aria-hidden="true" />
      <div className={`${SHELL} py-16 sm:py-20 md:py-24 lg:pb-[130px] lg:pt-[150px]`}>
        <SectionLabel tone="light" className="mb-8 sm:mb-11">
          Contact
        </SectionLabel>

        <Rv>
          <h2
            id="contact-title"
            className="m-0 max-w-[20ch] font-manrope text-[clamp(32px,5vw,80px)] font-extralight leading-[1.0] tracking-[-0.045em]"
          >
            Have an eCommerce, AI or technology problem{' '}
            <span className="font-bold">
              that needs a clear <span className="text-accent">decision?</span>
            </span>
          </h2>
        </Rv>

        <Rv>
          <p className="mt-7 max-w-[46ch] font-manrope text-[19px] font-light leading-[1.6] text-ground/70 sm:text-[21px]">
            Bring the problem. Leave with the next practical step.
          </p>
        </Rv>

        {/*
          `min-w-0` on both cells, because a grid item defaults to
          `min-width: auto` and therefore refuses to shrink below the widest
          thing inside it. The form's controls were that widest thing, which
          held this panel at 449px and pushed it off the right edge of a phone.
        */}
        <Rv className="mt-12 grid gap-px border border-ground/15 bg-ground/15 sm:mt-14 lg:mt-[70px] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex min-w-0 flex-col gap-8 bg-white p-6 sm:gap-10 sm:p-8 lg:p-12">
            <p className="m-0 max-w-[46ch] font-manrope text-[17px] font-light leading-[1.7] text-ground/60">
              Describe the problem in a few lines and I will reply within 24 hours, IST business
              days. A first conversation is 30 minutes and costs nothing.
            </p>

            <dl className="m-0">
              {DETAILS.map((detail) => (
                <div
                  key={detail.label}
                  className="flex flex-col gap-1 border-t border-ground/15 py-4 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-8"
                >
                  <dt className="font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-[0.16em] text-ground/55">
                    {detail.label}
                  </dt>
                  <dd className="m-0 min-w-0 break-words font-mono text-[13px] leading-[1.5] text-ground/75">
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="inline-block py-1.5 transition-colors hover:text-accent"
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

            {/*
              Held at the foot of the cell so the two ways of starting a
              conversation, these and the form's own send, end on the same line.
            */}
            <div className="mt-auto flex flex-wrap gap-3.5 pt-2">
              <Cta href={CONTACT.whatsapp} variant="accent" external="WhatsApp">
                Book a 30-minute consultation
              </Cta>
              <Cta href={`mailto:${CONTACT.email}`} variant="outline" tone="light">
                Start a conversation
              </Cta>
            </div>
          </div>

          <div className="min-w-0 bg-white p-6 sm:p-8 lg:p-12">
            <ContactForm />
          </div>
        </Rv>
      </div>
    </section>
  );
}
