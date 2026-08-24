import { PROBLEMS, SECTIONS, SOLVE } from '../../lib/home';
import { Lines, Rise } from './motion';
import { Marker, Section, Shell, TextLink } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'solve')!;

/**
 * What I solve.
 *
 * Business problems, phrased the way the person with the problem would phrase
 * them. "The store is slow and nobody can say why" is what lands in an inbox;
 * "Performance Engineering" is what a service menu calls it afterwards.
 *
 * Each entry ends in a link to the article that argues it out, which makes this
 * section the top of the internal-linking funnel as well as the section that
 * qualifies the visitor. The anchor text names the destination rather than
 * saying "read more", per the linking rules in the brief.
 *
 * The numbering is ordering, not ranking, so it is hidden from assistive
 * technology and the list carries the sequence instead.
 */
export function Solve() {
  return (
    <Section id="solve" labelledBy="solve-title">
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="solve-title" lines={SOLVE.headline} softFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[54ch]">{SOLVE.body}</p>
          </Rise>
        </div>

        <ol className="mt-grid grid gap-x-10 gap-y-grid md:grid-cols-2">
          {PROBLEMS.map((p, i) => (
            <li key={p.num} className="border-t border-[var(--rule)] pt-item">
              <Rise delay={(i % 2) * 0.08}>
                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className="font-display text-[.8rem] tabular-nums tracking-[.06em] text-accent-bright"
                  >
                    {p.num}
                  </span>
                  <h3 className="yr-display yr-display--3 max-w-[28ch]">{p.symptom}</h3>
                </div>

                <p className="yr-note mt-item max-w-[56ch]">{p.detail}</p>

                <p className="mt-item">
                  <TextLink href={p.href}>{p.cta}</TextLink>
                </p>
              </Rise>
            </li>
          ))}
        </ol>
      </Shell>
    </Section>
  );
}
