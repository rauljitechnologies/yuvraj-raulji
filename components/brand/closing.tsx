import { CLOSING, CTA_LABEL } from '../../lib/brand';
import { ContactButton } from '../homepage/contact-button';
import { Lines, Rise, type DisplayLine } from '../homepage/motion';
import { Btn, Section, Shell } from '../homepage/primitives';

/**
 * The closing question.
 *
 * A question, not a pitch, and the four lines under it are the four answers
 * the reader is most likely to already be holding. If one of them is theirs,
 * the CTA is the obvious next move and no persuasion is required; if none of
 * them is, no amount of persuasion was going to work.
 *
 * One primary action. A closing section offering three equally weighted
 * choices is a closing section that has not decided what it wants.
 */
export function Closing({
  headline = CLOSING.headline,
  lines = CLOSING.lines,
  body,
}: {
  /* DisplayLine, not string: the closing headline carries the red accent on its
     second line, which the brief specifies and which `Lines` reads off the
     object form. A `string[]` here silently stripped it. */
  headline?: readonly DisplayLine[];
  lines?: readonly string[];
  body?: string;
}) {
  return (
    <Section id="contact" labelledBy="closing-title" tall>
      <Shell>
        {/* Measure on the heading, not on a wrapper: `ch` resolves against
            the element's own font-size. See the note in sections.tsx. */}
        <Lines
          as="h2"
          id="closing-title"
          size="statement"
          lines={headline}
          strongFrom={1}
          className="max-w-[16ch]"
        />

        {body ? (
          <Rise delay={0.22} className="mt-head">
            <p className="yr-lede max-w-[54ch]">{body}</p>
          </Rise>
        ) : (
          <Rise delay={0.22} className="mt-head">
            <ul className="space-y-2">
              {lines.map((l) => (
                <li key={l} className="yr-lede max-w-[48ch] text-ink-muted">
                  {l}
                </li>
              ))}
            </ul>
          </Rise>
        )}

        <Rise delay={0.32} className="mt-head">
          <ContactButton>{CTA_LABEL}</ContactButton>
        </Rise>

        <Rise
          delay={0.4}
          className="mt-grid flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-item"
        >
          <span className="font-display text-[.9rem] font-medium uppercase tracking-[.2em] text-ink">
            {CLOSING.signoff}
          </span>
          <span aria-hidden="true" className="yr-rule-accent" />
          <Btn href="/insights/" variant="ghost" className="ml-auto">
            Read my thinking
          </Btn>
        </Rise>
      </Shell>
    </Section>
  );
}
