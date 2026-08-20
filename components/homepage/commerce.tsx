import { COMMERCE, COMMERCE_MODULES, SECTIONS } from '../../lib/home';
import { Diagram } from './diagrams';
import { InView, Lines, Rise } from './motion';
import { Marker, Section, Shell } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'commerce')!;

/**
 * Commerce intelligence.
 *
 * Six modules on a shared hairline grid. Each carries a drawing rather than an
 * icon (see ./diagrams.tsx), which draws itself once as it comes into view.
 * The stroke sits at a muted tone and resolves to the accent on hover, so the
 * grid reads as one quiet system until the visitor points at part of it.
 */
export function Commerce() {
  return (
    <Section id="commerce" labelledBy="commerce-title">
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1.1fr_.9fr]">
          <Lines
            as="h2"
            id="commerce-title"
            lines={COMMERCE.headline}
            softFrom={2}
            className="max-w-[16ch]"
          />
          <Rise delay={0.2} className="self-end">
            <p className="yr-lede max-w-[44ch]">{COMMERCE.body}</p>
          </Rise>
        </div>

        <ul className="mt-grid grid gap-px bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-3">
          {COMMERCE_MODULES.map((m, i) => (
            <li key={m.id} className="bg-bg">
              <InView
                as="div"
                className="h-full"
                activeClassName="yr-dia--draw"
              >
                <article className="yr-card yr-dia group h-full min-h-[300px] !border-0">
                  <div className="mb-item h-[101px] w-[160px] text-ink-faint transition-colors duration-500 group-hover:text-accent-bright">
                    <Diagram kind={m.diagram} />
                  </div>

                  <h3 className="yr-display yr-display--3">{m.label}</h3>

                  <p className="mt-tight text-[.7rem] font-semibold uppercase tracking-[.16em] text-accent-bright">
                    {m.beats.join(' · ')}
                  </p>

                  <p className="yr-note mt-item max-w-[38ch]">{m.note}</p>

                  <span
                    aria-hidden="true"
                    className="mt-auto pt-block font-display text-[.7rem] tracking-[.18em] text-ink-faint"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </article>
              </InView>
            </li>
          ))}
        </ul>
      </Shell>
    </Section>
  );
}
