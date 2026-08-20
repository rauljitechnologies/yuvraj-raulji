import { EXPERIENCE, SECTIONS, TIMELINE } from '../../lib/home';
import { DrawRule, Lines, Rise } from './motion';
import { Marker, Section, Shell } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'experience')!;

/**
 * The timeline.
 *
 * One <ol> for both layouts. On desktop the list items become grid columns and
 * the connecting rule is drawn behind them; below `lg` the same items stack and
 * the rule becomes the vertical spine on the left. Nothing is duplicated and
 * nothing is hidden at a breakpoint, so there is one copy of every date in the
 * DOM and a screen reader reads them in order either way.
 *
 * Every entry carries a year and what happened. No client, revenue or headcount
 * figure is attached, because the record does not document one.
 */
export function Timeline() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="experience-title" lines={EXPERIENCE.headline} softFrom={2} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[44ch]">{EXPERIENCE.body}</p>
          </Rise>
        </div>

        <div className="relative mt-grid">
          {/* Spine. Vertical until lg, horizontal from lg, drawn in on entry. */}
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-[var(--rule)] lg:left-0 lg:top-[7px] lg:h-px lg:w-full"
          />
          <div aria-hidden="true" className="absolute left-0 top-[7px] hidden w-full lg:block">
            <DrawRule />
          </div>

          <ol className="grid gap-grid lg:grid-cols-4 lg:gap-8">
            {TIMELINE.map((entry, i) => (
              <li key={entry.year} className="relative pl-9 lg:pl-0 lg:pt-block">
                <Rise delay={i * 0.09}>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[6px] block h-[15px] w-[15px] border border-accent bg-bg lg:top-0"
                  >
                    <span className="absolute inset-[3px] bg-accent" />
                  </span>

                  <p className="font-display text-[length:var(--hd-year)] uppercase leading-[.9] tracking-[-.02em] text-ink">
                    {entry.year}
                  </p>

                  <h3 className="mt-item text-[.72rem] font-bold uppercase tracking-[.2em] text-accent-bright">
                    {entry.title}
                  </h3>

                  <p className="yr-note mt-tight max-w-[34ch]">{entry.body}</p>
                </Rise>
              </li>
            ))}
          </ol>
        </div>
      </Shell>
    </Section>
  );
}
