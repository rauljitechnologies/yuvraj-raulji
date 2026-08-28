import {
  ABOUT_HERO,
  BELIEFS,
  BELIEFS_INTRO,
  FOCUS,
  FOCUS_INTRO,
  JOURNEY,
  PERSONAL,
  PROCESS,
  PROCESS_INTRO,
} from '../../lib/about';
import { Lines, Rise } from '../homepage/motion';
import { InlineLink, Marker, Section, Shell } from '../homepage/primitives';

/**
 * The About page body, built from the homepage's devices.
 *
 * A story, not a CV. The employment record already exists at /experience/ in
 * exactly the shape a CV should take; repeating it here in nicer type would
 * hand the reader two documents and no narrative.
 *
 * ── What the layout is made of ─────────────────────────────────────────────
 *
 * Four devices, all of them the homepage's, and none of them invented here:
 *
 *   the section header   a mono label, a two-tone heading, and the supporting
 *                        line sharing its baseline out to the right
 *   the timeline rail    a hairline down the content column with an accent node
 *                        at each entry, the scannable facts in the left margin
 *   the numbered row     a mono ordinal, the claim, and the reasoning across
 *                        one hairline-ruled row
 *   the hairline cell    cells over a 1px gap, the ground painted back in
 *
 * What they replaced: a split 1fr/1fr grid at the top of every section, a
 * bordered table of eras, five cards each opening with a 3.6rem ordinal, and a
 * flow list with a drawn connector. All of it was the older editorial language,
 * and none of it appears anywhere on the homepage.
 *
 * ── Grounds ────────────────────────────────────────────────────────────────
 *
 * Two paper bands, not three, and spaced the way the homepage spaces its two:
 * Method near the middle and Beyond the work near the end. The journey was the
 * third, which put a white band directly under the opening and made the top of
 * the page read as stripes.
 *
 * `bg-[var(--bg)]` rather than `bg-ground` inside the cell grids: the paper
 * scope redefines `--bg` but not `--bg-rgb`, so a Tailwind ground utility would
 * paint near-black cells on a white section.
 *
 * Server components throughout.
 */

/* Shared with every section header below, so the six agree by construction. */
const SUPPORT = 'm-0 max-w-[520px] font-manrope text-[17px] font-light leading-[1.7] text-ink/50';

/* ═══════════════════════════════════════════════════════════════
   THE OPENING

   Sits directly under the page hero and carries the record: the figures, the
   platforms and the models, in prose rather than in a stat strip. A row of
   four big numbers is a thing an agency site does; a paragraph that happens to
   contain them is a thing a person does.

   Set as the homepage's position statement is set: the claim large and light,
   the evidence beside it behind an accent hairline.
   ═══════════════════════════════════════════════════════════════ */

export function Opening() {
  return (
    <Section id="opening" labelledBy="opening-title">
      <Shell>
        <Marker label="The short version" />
        <h2 id="opening-title" className="sr-only">
          The short version
        </h2>
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Rise>
            <p className="m-0 max-w-[30ch] font-manrope text-[clamp(21px,2.2vw,30px)] font-light leading-[1.35] tracking-[-0.03em] text-ink/85">
              {ABOUT_HERO.opening}
            </p>
          </Rise>
          <Rise delay={0.16} className="self-end">
            <p className="m-0 max-w-[52ch] border-l border-accent/60 pl-6 font-manrope text-[16px] font-light leading-[1.75] text-ink/50">
              {ABOUT_HERO.record}
            </p>
          </Rise>
        </div>
      </Shell>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   THE JOURNEY

   The same seven eras the homepage renders, at length. One story, one array;
   two versions of it would drift apart inside a month.

   Drawn as the homepage draws its evolution: one hairline running down the
   content column with an accent node at each entry, so the eye follows a
   single line from 2010 to now, and the year sits out in the left margin
   where it can be scanned without reading the prose.
   ═══════════════════════════════════════════════════════════════ */

export function Journey() {
  return (
    <Section id="journey" labelledBy="journey-title">
      <Shell>
        <Marker label="The journey" />

        <div className="mb-10 flex flex-wrap items-end justify-between gap-8 sm:mb-14 lg:mb-[70px]">
          <Lines as="h2" id="journey-title" lines={JOURNEY.headline} />
          <Rise delay={0.18}>
            <p className={SUPPORT}>{JOURNEY.body}</p>
          </Rise>
        </div>

        <ol className="m-0 list-none p-0">
          {JOURNEY.eras.map((era, i) => (
            <li key={era.year}>
              <Rise
                delay={Math.min(i, 5) * 0.05}
                className="grid gap-x-8 gap-y-2 md:grid-cols-[150px_minmax(0,1fr)] lg:gap-x-10 lg:grid-cols-[190px_minmax(0,1fr)]"
              >
                <p className="m-0 font-mono text-[13px] font-medium leading-none tracking-[0.18em] text-accent-bright md:pt-8 lg:pt-9">
                  {era.year}
                </p>

                {/* The rail. `border-l` runs the full height of the entry and
                    the node sits on it, so the line is continuous between
                    entries rather than restarting at each one. */}
                <div className="relative border-t border-line pb-8 pt-6 sm:pb-10 sm:pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-8 lg:pl-10 lg:pt-9">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[38px] hidden h-[7px] w-[7px] -translate-x-1/2 bg-accent md:block"
                  />
                  <h3 className="m-0 font-manrope text-[clamp(21px,2.2vw,30px)] font-semibold leading-[1.15] tracking-[-0.02em]">
                    {era.shift}
                  </h3>
                  <p className="m-0 mt-4 max-w-[68ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                    {era.body}
                  </p>
                </div>
              </Rise>
            </li>
          ))}
        </ol>

        <Rise delay={0.2} className="mt-tail">
          <InlineLink href="/experience/" lead>
            The full employment record, role by role
          </InlineLink>
        </Rise>
      </Shell>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WHAT I BELIEVE

   Five beliefs, each with the reasoning under it. A belief with no reasoning
   is indistinguishable from the same belief held by somebody who has never
   tested it, which is the difference this section exists to show.

   Cells over a 1px gap, which is the homepage's grid device. Five into two
   columns leaves one cell on its own row; it is given the full width rather
   than half of it and a hole beside it.
   ═══════════════════════════════════════════════════════════════ */

export function Beliefs() {
  return (
    <Section id="beliefs" labelledBy="beliefs-title">
      <Shell>
        <Marker label="Positions" />
        <div className="mb-10 sm:mb-14">
          <Lines as="h2" id="beliefs-title" lines={BELIEFS_INTRO.headline} />
        </div>

        <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2">
          {BELIEFS.map((b, i) => (
            <li
              key={b.num}
              className={`bg-[var(--bg)] ${i === BELIEFS.length - 1 ? 'md:col-span-2' : ''}`}
            >
              <Rise
                delay={Math.min(i, 3) * 0.06}
                className="flex h-full flex-col p-7 sm:p-9 lg:p-10"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-accent-bright"
                >
                  {b.num}
                </span>
                <h3 className="m-0 mt-6 max-w-[26ch] font-manrope text-[clamp(20px,2vw,27px)] font-semibold leading-[1.22] tracking-[-0.025em]">
                  {b.claim}
                </h3>
                <p className="m-0 mt-4 max-w-[62ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/50">
                  {b.because}
                </p>
              </Rise>
            </li>
          ))}
        </ul>
      </Shell>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CURRENT FOCUS
   ═══════════════════════════════════════════════════════════════ */

export function Focus() {
  return (
    <Section id="focus" labelledBy="focus-title">
      <Shell>
        <Marker label="Current focus" />

        <div className="mb-10 flex flex-wrap items-end justify-between gap-8 sm:mb-14">
          <Lines as="h2" id="focus-title" lines={FOCUS_INTRO.headline} />
          <Rise delay={0.18}>
            <p className={SUPPORT}>{FOCUS_INTRO.body}</p>
          </Rise>
        </div>

        <Rise delay={0.22}>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {FOCUS.map((f) => (
              <li key={f}>
                <span className="inline-flex items-center border border-line px-4 py-3 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.16em] text-ink/60 transition-colors duration-300 hover:border-accent hover:text-ink">
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </Rise>
      </Shell>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOW I THINK

   Five steps, and the order is the entire content, which is why these are
   numbered rows and the beliefs above are cells: a row reads as a sequence and
   a grid does not. The device is the homepage's direct-answers table, ordinal
   in the left margin and the reasoning across from the step.
   ═══════════════════════════════════════════════════════════════ */

export function Process() {
  return (
    <Section id="process" labelledBy="process-title" className="yr-paper">
      <Shell>
        <Marker label="Method" />

        <div className="mb-10 flex flex-wrap items-end justify-between gap-8 sm:mb-14 lg:mb-[70px]">
          <Lines as="h2" id="process-title" lines={PROCESS_INTRO.headline} />
          <Rise delay={0.18}>
            <p className={SUPPORT}>{PROCESS_INTRO.body}</p>
          </Rise>
        </div>

        <ol className="m-0 list-none border-t border-line p-0">
          {PROCESS.map((step, i) => (
            <li key={step.num} className="border-b border-line">
              <Rise
                delay={Math.min(i, 4) * 0.06}
                className="grid items-baseline gap-x-8 gap-y-3 py-7 sm:gap-x-10 sm:py-9 md:grid-cols-[44px_minmax(0,0.8fr)_minmax(0,1.5fr)] lg:grid-cols-[52px_minmax(0,0.8fr)_minmax(0,1.5fr)] lg:py-12"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-accent"
                >
                  {step.num}
                </span>
                <h3 className="m-0 font-manrope text-[clamp(21px,2.1vw,29px)] font-semibold leading-[1.22] tracking-[-0.025em]">
                  {step.verb} <span className="font-light text-ink/50">{step.object}</span>
                </h3>
                <p className="m-0 max-w-[68ch] font-manrope text-[17px] font-light leading-[1.75] text-ink/60">
                  {step.body}
                </p>
              </Rise>
            </li>
          ))}
        </ol>
      </Shell>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BEYOND THE WORK

   The human section, kept short. No photograph is invented for it: the
   photographic layout switches on when real files arrive in
   public/assets/founder/, and until then this renders as type, which is
   finished in its own right.
   ═══════════════════════════════════════════════════════════════ */

export function Personal() {
  return (
    <Section id="personal" labelledBy="personal-title" className="yr-paper">
      <Shell>
        <Marker label="Beyond the work" />

        <div className="mb-10 flex flex-wrap items-end justify-between gap-8 sm:mb-14">
          <Lines as="h2" id="personal-title" lines={PERSONAL.headline} />
          <Rise delay={0.18}>
            <p className={SUPPORT}>{PERSONAL.body}</p>
          </Rise>
        </div>

        <dl className="m-0 grid gap-px border border-line bg-line md:grid-cols-3">
          {PERSONAL.facets.map((f, i) => (
            <Rise
              key={f.label}
              delay={Math.min(i, 2) * 0.07}
              className="flex h-full flex-col bg-[var(--bg)] p-7 sm:p-9"
            >
              <dt className="m-0 font-manrope text-[19px] font-semibold leading-[1.2] tracking-[-0.02em]">
                {f.label}
              </dt>
              <dd className="m-0 mt-4 font-manrope text-[16px] font-light leading-[1.7] text-ink/50">
                {f.body}
              </dd>
            </Rise>
          ))}
        </dl>
      </Shell>
    </Section>
  );
}
