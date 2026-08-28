import { EXPERIENCE, SECTIONS, TIMELINE } from '../../lib/home';
import { Lines, Rise } from './motion';
import { Marker, Section, Shell, TextLink } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'experience')!;

/**
 * The timeline.
 *
 * Vertical at every breakpoint. The previous version laid four entries across
 * as grid columns with a horizontal spine; at eight entries that wraps to two
 * rows and the spine only lines up with the first, so the layout is now a
 * single column with the year in the left margin from `md` up.
 *
 * One <ol>, one copy of every date in the DOM, read in order on any device.
 *
 * Every entry carries a year and what happened. The detail on the three
 * employment entries comes from the record in lib/site.ts and nothing is added
 * to it. Start years only: the record has Magneto IT running to May 2021 and
 * Nxtby starting Mar 2020, which overlap by fourteen months, so one of the two
 * end dates is wrong and neither is stated here until Yuvraj resolves it.
 */
export function Timeline() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="experience-title" lines={EXPERIENCE.headline} strongFrom={2} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[54ch]">{EXPERIENCE.body}</p>
          </Rise>
        </div>

        <ol className="mt-grid">
          {TIMELINE.map((entry, i) => (
            <li key={entry.year} className="relative border-t border-[var(--rule)]">
              <Rise delay={Math.min(i, 4) * 0.06}>
                <div className="grid gap-x-10 gap-y-tight py-block lg:py-item md:grid-cols-[7rem_minmax(0,1fr)] lg:grid-cols-[7rem_minmax(0,.82fr)_minmax(0,1.55fr)] lg:items-baseline">
                  <p className="font-display text-[length:var(--hd-3)] uppercase leading-none tracking-[-.01em] text-accent-bright tabular-nums">
                    {entry.year}
                  </p>

                  <h3 className="yr-display yr-display--3 max-w-[26ch]">{entry.title}</h3>

                  {/* Its own column from lg. Nested under the title it was a
                      58ch paragraph inside a 1144px column, which is what left
                      every row ending at 47% of the shell. */}
                  <p className="yr-note max-w-[68ch] lg:mt-0 mt-tight">{entry.body}</p>
                </div>
              </Rise>
            </li>
          ))}
        </ol>

        <Rise delay={0.2} className="mt-tail border-t border-[var(--rule)] pt-item">
          <TextLink href={EXPERIENCE.cta.href}>{EXPERIENCE.cta.label}</TextLink>
        </Rise>
      </Shell>
    </Section>
  );
}
