import Link from 'next/link';
import {
  ATTENTION,
  ATTENTION_INTRO,
  CASES,
  COMMERCE_INTRO,
  COMMERCE_NODES,
  ERAS,
  EVOLUTION_INTRO,
  LEARNING_INTRO,
  POSITIONS,
  POV_INTRO,
  STATEMENT,
  THOUGHT_AREAS,
  THOUGHT_INTRO,
  TRACKS,
  WORK_INTRO,
  WRITING,
  WRITING_INTRO,
} from '../../lib/brand';
import { Lines, Rise } from '../homepage/motion';
import { Btn, InlineLink, Marker, Section, Shell, Tag } from '../homepage/primitives';

/**
 * The homepage body, sections 02 through 10.
 *
 * Every component here is a server component. Nothing on this page needs
 * client state: the only interactive elements are links, buttons and the
 * enquiry modal, and the only animation is `Rise` and `Lines`, which are
 * IntersectionObserver entrances rendered from a separate `use client` module.
 *
 * There is no WebGL, no canvas, no scroll library and no scroll hijacking on
 * this page.
 */

/** `YYYY-MM-DD` for a <time datetime>, or undefined if the string is not a date. */
function isoDate(date: string): string | undefined {
  const t = Date.parse(date);
  return Number.isNaN(t) ? undefined : new Date(t).toISOString().slice(0, 10);
}

/* ═══════════════════════════════════════════════════════════════
   02 — THE STATEMENT

   One sentence, set as the whole section. No grid, no card, no image. The
   drama is entirely the size of the type and the amount of nothing around it,
   which is the only kind of drama this palette can produce without turning
   into a template.
   ═══════════════════════════════════════════════════════════════ */

export function Statement() {
  return (
    <Section id="position" labelledBy="position-title" tall className="yr-paper">
      <Shell>
        <Marker num="02" label="The position" />
        {/* The measure goes on the heading, not on a wrapper. `ch` resolves
            against the element's own font-size, so 19ch on a wrapper div is
            19 characters of the 16px body face, roughly 170px, and the 86px
            headline inside it would have wrapped to one word per line. */}
        <Lines
          as="h2"
          id="position-title"
          size="statement"
          lines={STATEMENT.headline}
          strongFrom={1}
          className="max-w-[19ch]"
        />
        <Rise delay={0.24} className="mt-head">
          <p className="yr-lede max-w-[54ch] text-[clamp(1.05rem,1.4vw,1.3rem)]">
            {STATEMENT.body}
          </p>
        </Rise>
      </Shell>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   03 — WHERE TECHNOLOGY MEETS BUSINESS

   Four areas of thought, and specifically not four cards. No box, no fill, no
   shadow: a rule on top, an oversized ordinal, and air. The difference between
   an area of thought and a service tile is almost entirely whether it is
   boxed, so this one is not.
   ═══════════════════════════════════════════════════════════════ */

export function ThoughtAreas() {
  return (
    <Section id="thinking" labelledBy="thinking-title">
      <Shell>
        <Marker num="03" label="Areas of thought" />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="thinking-title" lines={THOUGHT_INTRO.headline} strongFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[52ch]">{THOUGHT_INTRO.body}</p>
          </Rise>
        </div>

        <ul className="mt-grid grid gap-x-12 gap-y-grid md:grid-cols-2">
          {THOUGHT_AREAS.map((area, i) => (
            <li key={area.num}>
              <Rise delay={Math.min(i, 3) * 0.07} className="yr-thought h-full">
                <span aria-hidden="true" className="yr-num">
                  {area.num}
                </span>
                <h3 className="yr-display yr-display--3 mt-item">{area.title}</h3>
                <p className="yr-note mt-tight max-w-[46ch]">{area.premise}</p>
                <ul className="mt-block flex flex-wrap gap-x-1.5 gap-y-2">
                  {area.subjects.map((s) => (
                    <li key={s}>
                      <Tag>{s}</Tag>
                    </li>
                  ))}
                </ul>
              </Rise>
            </li>
          ))}
        </ul>
      </Shell>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   04 — WHAT I AM LEARNING NOW

   Framed as study rather than as expertise, and the framing is the content.
   Nothing here claims a delivery, a certification or an engagement, because
   the record contains none for these subjects.
   ═══════════════════════════════════════════════════════════════ */

export function Learning() {
  return (
    <Section id="learning" labelledBy="learning-title" className="yr-paper">
      <Shell>
        <Marker num="04" label="Current study" />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="learning-title" lines={LEARNING_INTRO.headline} strongFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[52ch]">{LEARNING_INTRO.body}</p>
          </Rise>
        </div>

        <ul className="mt-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRACKS.map((track, i) => (
            <li key={track.id}>
              <Rise delay={Math.min(i, 3) * 0.07} className="yr-card h-full">
                <h3 className="yr-display yr-display--3">{track.title}</h3>
                <p className="yr-note mt-item flex-1">{track.focus}</p>
                <ul className="mt-block flex flex-wrap gap-x-1.5 gap-y-2">
                  {track.items.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </Rise>
            </li>
          ))}
        </ul>

        <Rise delay={0.2} className="mt-tail">
          <Btn href={LEARNING_INTRO.cta.href} variant="ghost">
            {LEARNING_INTRO.cta.label}
          </Btn>
        </Rise>
      </Shell>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   05 — THE COMMERCE SYSTEM

   Eight rows, each one a decision rather than an offer. Set as a definition
   list, because that is what it is: a term and what choosing it buys you.
   ═══════════════════════════════════════════════════════════════ */

export function Commerce() {
  return (
    <Section id="commerce" labelledBy="commerce-title">
      <Shell>
        <Marker num="05" label="The commerce system" />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="commerce-title" lines={COMMERCE_INTRO.headline} strongFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[52ch]">{COMMERCE_INTRO.body}</p>
          </Rise>
        </div>

        <dl className="mt-grid border-t border-line">
          {COMMERCE_NODES.map((node, i) => (
            <Rise
              key={node.label}
              delay={Math.min(i, 5) * 0.05}
              className="group grid items-baseline gap-x-10 gap-y-1 border-b border-line py-item md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]"
            >
              <dt className="font-display text-[clamp(1.05rem,1.7vw,1.45rem)] font-medium uppercase tracking-[-.01em] text-ink transition-colors duration-300 group-hover:text-accent-bright">
                {node.label}
              </dt>
              <dd className="text-[.98rem] leading-[1.6] text-ink-secondary">{node.decision}</dd>
            </Rise>
          ))}
        </dl>
      </Shell>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   06 — POINT OF VIEW

   Five positions, each with the turn that makes it an argument. Three link to
   the article that argues them out; two do not, and are unlinked rather than
   pointed at a route that does not exist yet.
   ═══════════════════════════════════════════════════════════════ */

export function PointOfView() {
  return (
    <Section id="pov" labelledBy="pov-title" className="yr-paper">
      <Shell>
        <Marker num="06" label="Positions" />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="pov-title" lines={POV_INTRO.headline} strongFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[52ch]">{POV_INTRO.body}</p>
          </Rise>
        </div>

        <ul className="mt-grid border-t border-line">
          {POSITIONS.map((pos, i) => (
            <li key={pos.claim} className="border-b border-line">
              <Rise delay={Math.min(i, 4) * 0.06} className="py-block">
                <p className="yr-pov max-w-[26ch]">
                  {pos.claim}{' '}
                  <span className="yr-pov__turn">{pos.turn}</span>
                </p>
                {pos.href && pos.cta ? (
                  <p className="mt-item">
                    <InlineLink href={pos.href} lead>
                      {pos.cta}
                    </InlineLink>
                  </p>
                ) : null}
              </Rise>
            </li>
          ))}
        </ul>
      </Shell>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   07 — THE EVOLUTION

   Seven eras. The year and the shift are the headline; the employer is inside
   the prose where it belongs. This is a story about how the thinking changed,
   and a column of logos does not tell it.
   ═══════════════════════════════════════════════════════════════ */

export function Evolution() {
  return (
    <Section id="evolution" labelledBy="evolution-title">
      <Shell>
        <Marker num="07" label="The evolution" />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="evolution-title" lines={EVOLUTION_INTRO.headline} strongFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[52ch]">{EVOLUTION_INTRO.body}</p>
          </Rise>
        </div>

        <ol className="mt-grid border-t border-line">
          {ERAS.map((era, i) => (
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
      </Shell>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   08 — SELECTED WORK

   The homepage preview: six covers, name, industry and the challenge line.
   The full record for each one, including the approach and the technology,
   is on /work/. Repeating it here would make the page long without making it
   more convincing.
   ═══════════════════════════════════════════════════════════════ */

export function SelectedWork() {
  return (
    <Section id="work" labelledBy="work-title" className="yr-paper">
      <Shell>
        <Marker num="08" label="Selected work" />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="work-title" lines={WORK_INTRO.headline} strongFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[52ch]">{WORK_INTRO.body}</p>
          </Rise>
        </div>

        <ul className="mt-grid grid gap-x-10 gap-y-grid md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <li key={c.id}>
              <Rise delay={Math.min(i, 3) * 0.06} className="h-full">
                <Link href={`/work/#${c.id}`} className="group block">
                  <span className="yr-frame relative block aspect-[16/10] w-full">
                    <img
                      src={c.img}
                      alt={c.alt}
                      width={c.imgW}
                      height={c.imgH}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 31vw"
                    />
                  </span>
                  <h3 className="yr-display yr-display--3 mt-item transition-colors duration-300 group-hover:text-accent-bright">
                    {c.name}
                  </h3>
                  <p className="yr-label mt-hair">{c.industry}</p>
                  <p className="yr-note mt-tight">{c.challenge}</p>
                </Link>
              </Rise>
            </li>
          ))}
        </ul>

        <Rise delay={0.2} className="mt-tail">
          <Btn href={WORK_INTRO.cta.href} variant="ghost">
            {WORK_INTRO.cta.label}
          </Btn>
        </Rise>
      </Shell>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   09 — CURRENT ATTENTION

   Four states of engagement rather than four claims of expertise, which is a
   more honest ladder and a more interesting one: "learning" is a more
   credible thing for a technologist to say about agents in 2026 than
   "expert in".
   ═══════════════════════════════════════════════════════════════ */

export function Attention() {
  return (
    <Section id="attention" labelledBy="attention-title">
      <Shell>
        <Marker num="09" label="Right now" />
        <Lines as="h2" id="attention-title" lines={ATTENTION_INTRO.headline} strongFrom={1} />

        <ul className="mt-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ATTENTION.map((a, i) => (
            <li key={a.state}>
              <Rise delay={Math.min(i, 3) * 0.07} className="yr-card h-full">
                <p className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="yr-dot" />
                  <span className="yr-label yr-label--accent">{a.state}</span>
                </p>
                <h3 className="yr-display yr-display--3 mt-item">{a.subject}</h3>
                <p className="yr-note mt-tight">{a.detail}</p>
              </Rise>
            </li>
          ))}
        </ul>
      </Shell>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   10 — THINKING OUT LOUD

   Six real, published, indexed articles, read out of lib/posts.ts. Not
   placeholders: a preview card promising an article that does not exist is a
   404 with nice typography.
   ═══════════════════════════════════════════════════════════════ */

export function Writing() {
  return (
    <Section id="writing" labelledBy="writing-title" className="yr-paper">
      <Shell>
        <Marker num="10" label="Writing" />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="writing-title" lines={WRITING_INTRO.headline} strongFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[52ch]">{WRITING_INTRO.body}</p>
          </Rise>
        </div>

        <ul className="mt-grid grid gap-x-10 gap-y-grid md:grid-cols-2 lg:grid-cols-3">
          {WRITING.map((w, i) => (
            <li key={w.slug}>
              <Rise delay={Math.min(i, 3) * 0.06} className="h-full">
                <article className="yr-thought flex h-full flex-col">
                  <p className="yr-label yr-label--accent">{w.category}</p>
                  <h3 className="yr-display yr-display--3 mt-item">
                    <Link
                      href={`/blog/${w.slug}/`}
                      className="transition-colors duration-300 hover:text-accent-bright"
                    >
                      {w.title}
                    </Link>
                  </h3>
                  <p className="yr-note mt-tight flex-1">{w.summary}</p>
                  <p className="mt-block flex items-center gap-3 text-[.72rem] uppercase tracking-[.16em] text-ink-faint">
                    {/* `dateTime` only when the string actually parses. A bad
                        date would otherwise throw inside toISOString, at build
                        time, on a static export. The visible date is the
                        authored string either way. */}
                    <time dateTime={isoDate(w.date)}>{w.date}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{w.readTime}</span>
                  </p>
                </article>
              </Rise>
            </li>
          ))}
        </ul>

        <Rise delay={0.2} className="mt-tail">
          <Btn href={WRITING_INTRO.cta.href} variant="ghost">
            {WRITING_INTRO.cta.label}
          </Btn>
        </Rise>
      </Shell>
    </Section>
  );
}
