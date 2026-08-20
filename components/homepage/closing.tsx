import { CLOSING, SECTIONS } from '../../lib/home';
import { ContactButton } from './contact-button';
import { Lines, Rise } from './motion';
import { Btn, Marker, Section, Shell } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'contact')!;

/**
 * Closing.
 *
 * The last thing on the page before the footer, and the only section allowed to
 * take the full height of the viewport. The four questions are set as a list
 * because that is what they are; they are not four separate claims and they do
 * not need four separate reveals.
 */
export function Closing() {
  return (
    <Section
      id="contact"
      labelledBy="contact-title"
      tall
    >
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <Lines
          as="h2"
          id="contact-title"
          size="1"
          lines={CLOSING.headline}
          softFrom={1}
          className="max-w-[14ch]"
        />

        <Rise delay={0.22} className="mt-head">
          <ul className="space-y-tight">
            {CLOSING.lines.map((line) => (
              <li
                key={line}
                className="text-[clamp(1.02rem,1.5vw,1.35rem)] leading-[1.55] text-ink-secondary"
              >
                {line}
              </li>
            ))}
          </ul>
        </Rise>

        <Rise delay={0.3} className="mt-block flex flex-wrap gap-3">
          <ContactButton>{CLOSING.ctaPrimary.label}</ContactButton>
          <Btn href={CLOSING.ctaSecondary.href} variant="ghost">
            {CLOSING.ctaSecondary.label}
          </Btn>
        </Rise>

        {/* Sign-off */}
        <Rise delay={0.38} className="mt-grid border-t border-[var(--rule)] pt-block">
          <p className="font-display text-[clamp(1.6rem,4.4vw,3.4rem)] uppercase leading-none tracking-[-.02em] text-ink">
            {CLOSING.signoff}
          </p>
          <p className="mt-item flex flex-wrap items-center gap-x-3 gap-y-hair text-[.66rem] font-bold uppercase tracking-[.22em] text-ink-faint">
            {CLOSING.signoffLine.map((word, i) => (
              <span key={word} className="flex items-center gap-3">
                {i > 0 ? (
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
                ) : null}
                {word}
              </span>
            ))}
          </p>
        </Rise>
      </Shell>
    </Section>
  );
}
