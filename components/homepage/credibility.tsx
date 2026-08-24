import { CREDIBILITY, SECTIONS, STATS } from '../../lib/home';
import { Lines, Rise } from './motion';
import { Marker, Section, Shell } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'credibility')!;

/**
 * Credibility.
 *
 * Four figures, each traceable to the employment record in lib/site.ts. The
 * note under each one says what the number is counting, because a bare "500K+"
 * is a boast and "500K+ SKUs under management" is a fact.
 *
 * The old site's "50+ projects delivered" is not here. It appears in no record
 * and there is no way to source it, and one unsourceable number standing beside
 * three sourceable ones costs more credibility than it buys.
 *
 * The figures are plain text, not counters. A number that animates from zero
 * reads as a marketing device, and it is unreadable for the first second on the
 * one section of the page whose entire job is to be believed.
 */
export function Credibility() {
  return (
    <Section id="credibility" labelledBy="credibility-title">
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="credibility-title" lines={CREDIBILITY.headline} softFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[54ch]">{CREDIBILITY.body}</p>
          </Rise>
        </div>

        <dl className="mt-grid grid gap-x-8 gap-y-grid sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className="border-t border-[var(--rule)] pt-item">
              <Rise delay={i * 0.07}>
                {/* Value before label in source order, and the <dt>/<dd> pair is
                    the other way round on purpose: the label is the term and
                    the figure is what it resolves to, so they are ordered
                    label-first for assistive technology and reversed visually
                    with flex-col-reverse. */}
                <div className="flex flex-col-reverse">
                  <dt className="yr-label mt-hair">{s.label}</dt>
                  <dd className="font-display text-[length:var(--hd-3)] uppercase leading-none tracking-[-.01em] text-ink">
                    <span className="text-accent-bright">{s.value}</span>
                  </dd>
                </div>
                <p className="yr-note mt-item max-w-[34ch]">{s.note}</p>
              </Rise>
            </div>
          ))}
        </dl>

        <Rise delay={0.3} className="mt-grid border-t border-[var(--rule)] pt-item">
          <p className="yr-label">Markets worked in</p>
          <p className="mt-tight flex flex-wrap items-center gap-x-4 gap-y-hair text-[.82rem] text-ink-secondary">
            {CREDIBILITY.markets.map((m, i) => (
              <span key={m} className="flex items-center gap-4">
                {i > 0 ? (
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
                ) : null}
                {m}
              </span>
            ))}
          </p>
        </Rise>
      </Shell>
    </Section>
  );
}
