import { COMPANY, SECTIONS } from '../../lib/home';
import { Lines, Rise } from './motion';
import { Btn, Marker, Section, Shell } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'company')!;

/**
 * Raulji Technologies.
 *
 * Deliberately the shortest section on the page. This site is the personal
 * brand; the company site is where strategy, delivery and services belong, and
 * duplicating any of that here would turn yuvrajraulji.com into a second agency
 * site. So: one statement, one paragraph, one link out.
 */
export function Company() {
  return (
    <Section id="company" labelledBy="company-title" className="overflow-hidden">
      {/* Watermark. Decorative, sits behind the copy at a tone that never
          competes with it, and is dropped below `md` where it would collide. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 bottom-0 hidden select-none font-display text-[clamp(9rem,20vw,17rem)] uppercase leading-[.78] tracking-[-.04em] text-transparent md:block"
        style={{ WebkitTextStroke: '1px rgba(229, 9, 32, .1)' }}
      >
        RT
      </span>

      <Shell className="relative">
        <Marker num={meta.num} label={meta.label} />

        <div className="max-w-[64ch]">
          <p className="yr-label mb-item">{COMPANY.eyebrow}</p>

          <Lines as="h2" id="company-title" lines={[COMPANY.headline]} />

          <Rise delay={0.18}>
            <p className="yr-lede mt-head">{COMPANY.body}</p>
          </Rise>

          <Rise delay={0.26} className="mt-block">
            <Btn href={COMPANY.cta.href} variant="ghost" external>
              {COMPANY.cta.label}
            </Btn>
          </Rise>
        </div>
      </Shell>
    </Section>
  );
}
