import { PHILOSOPHY, SECTIONS } from '../../lib/home';
import { Lines, Rise } from './motion';
import { Marker, Section, Shell } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'philosophy')!;

/**
 * The quiet section. One statement, one paragraph, and a great deal of nothing
 * around them: the negative space is the point, so nothing else is allowed in
 * here and the vertical padding is doubled against every other section.
 */
export function Philosophy() {
  return (
    <Section id="philosophy" labelledBy="philosophy-title" tall>
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <Lines
          as="h2"
          id="philosophy-title"
          lines={PHILOSOPHY.headline}
          softFrom={1}
          className="max-w-[18ch]"
        />

        <Rise delay={0.2} className="mt-head flex justify-start lg:justify-end">
          <div className="max-w-[54ch] border-l border-accent/40 pl-6 lg:pl-8">
            <p className="text-[clamp(1rem,1.35vw,1.22rem)] leading-[1.7] text-ink-secondary">
              {PHILOSOPHY.body}
            </p>
          </div>
        </Rise>
      </Shell>
    </Section>
  );
}
