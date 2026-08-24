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
 * The About page body.
 *
 * A story, not a CV. The employment record already exists at /experience/ in
 * exactly the shape a CV should take; repeating it here in nicer type would
 * hand the reader two documents and no narrative.
 *
 * Server components throughout.
 */

/* ═══════════════════════════════════════════════════════════════
   THE OPENING

   Sits directly under the page hero and carries the record: the figures, the
   platforms and the models, in prose rather than in a stat strip. A row of
   four big numbers is a thing an agency site does; a paragraph that happens to
   contain them is a thing a person does.
   ═══════════════════════════════════════════════════════════════ */

export function Opening() {
  return (
    <Section id="opening" labelledBy="opening-title">
      <Shell>
        <Marker num="01" label="The short version" />
        <h2 id="opening-title" className="sr-only">
          The short version
        </h2>
        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Rise>
            <p className="yr-lede text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.6] text-ink">
              {ABOUT_HERO.opening}
            </p>
          </Rise>
          <Rise delay={0.16} className="self-end">
            <p className="yr-lede max-w-[52ch]">{ABOUT_HERO.record}</p>
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
   ═══════════════════════════════════════════════════════════════ */

export function Journey() {
  return (
    <Section id="journey" labelledBy="journey-title" className="yr-paper">
      <Shell>
        <Marker num="02" label="The journey" />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="journey-title" lines={JOURNEY.headline} softFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[52ch]">{JOURNEY.body}</p>
          </Rise>
        </div>

        <ol className="mt-grid border-t border-line">
          {JOURNEY.eras.map((era, i) => (
            <li key={era.year} className="border-b border-line">
              <Rise
                delay={Math.min(i, 5) * 0.05}
                className="grid gap-x-10 gap-y-tight py-block md:grid-cols-[7rem_minmax(0,16rem)_minmax(0,1fr)]"
              >
                <p className="font-display text-[.9rem] font-medium uppercase tracking-[.14em] text-accent-bright">
                  {era.year}
                </p>
                <h3 className="yr-display yr-display--3">{era.shift}</h3>
                <p className="yr-note max-w-[58ch]">{era.body}</p>
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
   ═══════════════════════════════════════════════════════════════ */

export function Beliefs() {
  return (
    <Section id="beliefs" labelledBy="beliefs-title">
      <Shell>
        <Marker num="03" label="Positions" />
        <Lines as="h2" id="beliefs-title" lines={BELIEFS_INTRO.headline} softFrom={1} />

        <ul className="mt-grid grid gap-x-14 gap-y-grid md:grid-cols-2">
          {BELIEFS.map((b, i) => (
            <li key={b.num}>
              <Rise delay={Math.min(i, 3) * 0.06} className="yr-thought h-full">
                <span aria-hidden="true" className="yr-num">
                  {b.num}
                </span>
                <h3 className="yr-pov mt-item max-w-[22ch]">{b.claim}</h3>
                <p className="yr-note mt-item max-w-[48ch]">{b.because}</p>
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
        <Marker num="05" label="Current focus" />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="focus-title" lines={FOCUS_INTRO.headline} softFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[52ch]">{FOCUS_INTRO.body}</p>
          </Rise>
        </div>

        <Rise delay={0.22} className="mt-grid">
          <ul className="flex flex-wrap gap-x-2 gap-y-3">
            {FOCUS.map((f) => (
              <li key={f}>
                <span className="inline-flex items-center border border-line px-4 py-2.5 font-display text-[.82rem] font-medium uppercase tracking-[.1em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent-bright">
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

   Five steps, and the order is the entire content. Rendered as an ordered
   list with the connector drawn as a pseudo-element, so no empty element
   exists purely to hold a line.
   ═══════════════════════════════════════════════════════════════ */

export function Process() {
  return (
    <Section id="process" labelledBy="process-title" className="yr-paper">
      <Shell>
        <Marker num="04" label="Method" />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="process-title" lines={PROCESS_INTRO.headline} softFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[52ch]">{PROCESS_INTRO.body}</p>
          </Rise>
        </div>

        <ol className="mt-grid max-w-[74ch]">
          {PROCESS.map((step, i) => (
            <li key={step.num} className="yr-flow-step pl-10 sm:pl-14">
              <Rise delay={Math.min(i, 4) * 0.06}>
                <p className="yr-label yr-label--accent">{step.num}</p>
                <h3 className="yr-display yr-display--2 mt-hair">
                  {step.verb}{' '}
                  <span className="yr-display__soft">{step.object}</span>
                </h3>
                <p className="yr-note mt-item max-w-[54ch]">{step.body}</p>
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
        <Marker num="06" label="Beyond the work" />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="personal-title" lines={PERSONAL.headline} softFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[52ch]">{PERSONAL.body}</p>
          </Rise>
        </div>

        <dl className="mt-grid grid gap-x-12 gap-y-grid md:grid-cols-3">
          {PERSONAL.facets.map((f, i) => (
            <Rise key={f.label} delay={Math.min(i, 2) * 0.07} className="yr-thought">
              <dt className="yr-display yr-display--3">{f.label}</dt>
              <dd className="yr-note mt-item">{f.body}</dd>
            </Rise>
          ))}
        </dl>
      </Shell>
    </Section>
  );
}
