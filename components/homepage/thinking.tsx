import { SECTIONS, THINKING } from '../../lib/home';
import { Lines, Rise } from './motion';
import { Marker, Section, Shell, Tag } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'thinking')!;

/**
 * The four subjects, as a 2×2 grid of editorial cards.
 *
 * The grid is drawn with a single hairline border and negative margins rather
 * than one border per card, so adjacent cards share an edge instead of
 * doubling it into a 2px line.
 */
export function Thinking() {
  return (
    <Section id="thinking" labelledBy="thinking-title">
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <Lines
          as="h2"
          id="thinking-title"
          lines={['What I', 'think about']}
          softFrom={1}
          className="mb-grid"
        />

        <ul className="grid gap-px bg-[var(--rule)] sm:grid-cols-2">
          {THINKING.map((card, i) => (
            <li key={card.num} className="bg-bg">
              <Rise delay={i * 0.06} className="h-full">
                <article className="yr-card h-full !border-0 min-h-[280px]">
                  <p className="yr-card__num">{card.num}</p>

                  <h3 className="yr-display yr-display--3 mt-item">{card.title}</h3>

                  <p className="yr-note mt-tight max-w-[42ch] flex-1">{card.body}</p>

                  <ul className="mt-item flex flex-wrap gap-2">
                    {card.tags.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                </article>
              </Rise>
            </li>
          ))}
        </ul>
      </Shell>
    </Section>
  );
}
