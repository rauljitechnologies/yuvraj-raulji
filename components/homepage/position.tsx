import { POSITION, SECTIONS } from '../../lib/home';
import { Lines, Rise } from './motion';
import { Marker, Section, Shell } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'position')!;

/**
 * Position.
 *
 * One statement, one paragraph, and a great deal of nothing around them. The
 * negative space is the point, so nothing else is allowed in here and the
 * vertical padding is doubled against every other section.
 *
 * This is where the brief's long-form founder story belongs, and it is not that
 * yet. What is here is Yuvraj's own position, kept verbatim. The story needs
 * writing by him; a narrative assembled from the employment record would be a
 * biography with a first-person pronoun bolted on, which is the exact failure
 * CONTENT-PRINCIPLES §1 exists to prevent.
 */
export function Position() {
  return (
    <Section id="position" labelledBy="position-title" tall>
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <Lines
          as="h2"
          id="position-title"
          lines={POSITION.headline}
          strongFrom={1}
          className="max-w-[18ch]"
        />

        <Rise delay={0.2} className="mt-head flex justify-start lg:justify-end">
          <figure className="max-w-[54ch] border-l border-accent/40 pl-6 lg:pl-8">
            <blockquote>
              <p className="text-[clamp(1rem,1.35vw,1.22rem)] leading-[1.7] text-ink-secondary">
                {POSITION.body}
              </p>
            </blockquote>
            <figcaption className="yr-label mt-item">{POSITION.attribution}</figcaption>
          </figure>
        </Rise>
      </Shell>
    </Section>
  );
}
