import { HOME_FAQS, QUESTIONS, SECTIONS } from '../../lib/home';
import { Lines, Rise } from './motion';
import { InlineLink, Marker, Section, Shell } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'questions')!;

/**
 * Questions.
 *
 * Plain open text, not an accordion. Three reasons, in order of how much they
 * matter:
 *
 *   1. The answers are the passages an AI search result would quote. Collapsed
 *      content is extractable, but a reader who has to click eight times to
 *      compare eight answers reads none of them.
 *   2. FAQPage markup has to correspond to text a visitor can see. Open text
 *      removes the argument entirely.
 *   3. An accordion here is eight buttons of client JavaScript for a section
 *      that has no interaction worth having. This renders as HTML.
 *
 * `lib/schema.ts` builds the FAQPage node from the same HOME_FAQS array this
 * component renders, so the markup and the visible text cannot drift.
 *
 * Questions are third person because that is the shape the query arrives in.
 * Answers are first person because the site is Yuvraj's, and a man describing
 * himself in the third person on his own homepage reads as copy someone else
 * wrote about him.
 */
export function Faq() {
  return (
    <Section id="questions" labelledBy="questions-title">
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="questions-title" lines={QUESTIONS.headline} strongFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[54ch]">{QUESTIONS.body}</p>
          </Rise>
        </div>

        <dl className="mt-grid">
          {HOME_FAQS.map((f, i) => (
            <div
              key={f.q}
              className="border-t border-[var(--rule)] py-block last:border-b last:border-[var(--rule)]"
            >
              <Rise delay={Math.min(i, 3) * 0.05}>
                <div className="grid gap-x-12 gap-y-item lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.4fr)]">
                  {/* The question is an <h3> because it is a real level in the
                      outline under the section's <h2>, and because a heading is
                      what lets a screen-reader user jump between the eight. */}
                  <dt>
                    <h3 className="yr-display yr-display--3 max-w-[24ch]">{f.q}</h3>
                  </dt>
                  <dd>
                    <p className="yr-note max-w-[62ch]">{f.a}</p>
                    {f.link ? (
                      <p className="mt-item">
                        <InlineLink
                          href={f.link.href}
                          lead
                          external={f.link.href.startsWith('http')}
                        >
                          {f.link.label}
                        </InlineLink>
                      </p>
                    ) : null}
                  </dd>
                </div>
              </Rise>
            </div>
          ))}
        </dl>
      </Shell>
    </Section>
  );
}
