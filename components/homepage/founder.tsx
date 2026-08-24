import { COMPANY_SHORT, FOUNDER, SECTIONS } from '../../lib/home';
import { getPhoto } from '../../lib/founder-photos';
import { Lines, Rise } from './motion';
import { InlineLink, Marker, Section, Shell } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'founder')!;

/**
 * Founder.
 *
 * The entity section, and the only one on the page whose primary audience is
 * partly machine. Its job is to state in one place, in ordinary crawlable
 * prose, that Yuvraj Raulji founded Raulji Technologies Private Limited, what
 * the company does, and what the relationship between the two sites is.
 *
 * The statement is deliberately one self-contained paragraph. An answer engine
 * lifting a passage takes a passage, not a page, so the sentence that has to
 * survive extraction is written to stand alone with the subject named rather
 * than pronouned.
 *
 * Three things this section refuses to say, all for the same reason: there is
 * no record of them. No team size, no client count, no revenue, no founding
 * story beyond the incorporation year. The one section on the page that has to
 * be believed literally is the worst possible place to round a number up.
 *
 * It is also not an agency block. The `split` pair says out loud which site
 * answers which question, because the risk of putting a company section on a
 * personal site is that the personal site quietly becomes a company one.
 */
export function Founder() {
  /*
   * Not `hero-portrait`. That slot has a shipped 400x400 fallback, and a square
   * 400px file stretched into a 16:7 band is worse than no image. These three
   * have no fallback, so the figure below renders only once real wide-format
   * photography is dropped into public/assets/founder/ and is simply absent
   * until then. That is the founder-photos contract, not an oversight.
   */
  const photo = getPhoto('whiteboard') ?? getPhoto('team') ?? getPhoto('desk');

  return (
    <Section id="founder" labelledBy="founder-title">
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <div className="grid items-start gap-x-16 gap-y-block lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <Lines as="h2" id="founder-title" lines={FOUNDER.headline} softFrom={1} />

            <Rise delay={0.18} className="mt-head">
              <p className="yr-lede max-w-[56ch]">{FOUNDER.statement}</p>
            </Rise>

            {/* Two destinations and one outbound, each with anchor text that
                describes where it goes. "Read more" would tell a crawler and a
                keyboard user nothing about three different targets. */}
            <Rise delay={0.3} className="mt-block flex flex-col gap-3">
              {FOUNDER.links.map((l) => (
                <InlineLink key={l.href} href={l.href} lead external={!l.internal}>
                  {l.label}
                </InlineLink>
              ))}
            </Rise>
          </div>

          {/* ── The split ── which site answers which question ── */}
          <Rise delay={0.24}>
            <dl className="border-t border-[var(--rule)]">
              {FOUNDER.split.map((s) => (
                <div key={s.label} className="border-b border-[var(--rule)] py-item">
                  <dt className="yr-label text-accent-bright">{s.label}</dt>
                  <dd className="yr-note mt-tight max-w-[44ch]">{s.body}</dd>
                </div>
              ))}
            </dl>

            <p className="yr-note mt-item max-w-[44ch]">
              Advice and delivery are separable on purpose. A recommendation is worth more when it
              is not also a quote, so consulting engagements do not have to run through{' '}
              {COMPANY_SHORT} to happen.
            </p>
          </Rise>
        </div>

        {/* The portrait sits under the statement rather than beside it: this
            section is carrying a claim, and a face next to a claim reads as an
            advertisement for the claim. Below it, it reads as attribution. */}
        {photo ? (
          <Rise delay={0.36} className="mt-grid">
            <figure className="yr-frame yr-frame--live relative aspect-[16/7] w-full">
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 1440px"
              />
            </figure>
          </Rise>
        ) : null}
      </Shell>
    </Section>
  );
}
