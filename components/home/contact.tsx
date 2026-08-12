'use client';

import { CONTACT } from '../../lib/site';
import { Button, Container, Eyebrow } from '../ui';
import { Reveal } from '../ui/reveal';
import { useUI } from '../ui-context';

/**
 * §22 Contact. Migrated to the design tokens: spacing, radii, borders and text
 * colours now come from :root rather than inline rgba values.
 *
 * The heading intentionally uses `text-display` rather than `SectionHeading`
 * (`text-h2`) — this is the closing call to action, not another content
 * section, and it carried a display-scale size before the migration.
 */

const rowCls = 'grid grid-cols-[86px_1fr] items-center gap-3 py-[14px]';
/** Was rgba(...,.36) — under 3:1 on --bg, and these are real labels, not decoration. */
const labelCls = 'text-[.64rem] font-bold uppercase tracking-[.18em] text-ink-muted';

export function Contact() {
  const { setContactOpen } = useUI();

  return (
    <section id="contact" aria-labelledby="contact-title" className="contact-sec relative overflow-hidden py-section">
      <Container>
        <Reveal className="grid grid-cols-1 items-start gap-12 rounded-sm border border-accent/30 bg-white/[.035] p-[clamp(36px,5vw,72px)] shadow-lifted backdrop-blur-2xl lg:grid-cols-[1fr_360px]">
          <div>
            <Eyebrow className="mb-[14px]">Private Consultation</Eyebrow>
            <h2
              id="contact-title"
              className="mb-4 font-bebas text-display uppercase leading-[.92] tracking-[.03em] text-ink"
            >
              Let&rsquo;s Build
              <br />
              What&rsquo;s Next
            </h2>
            <p className="mb-7 max-w-[500px] text-body-lg leading-[1.74] text-ink-secondary">
              Whether you&rsquo;re scaling a commerce platform, implementing AI automation, or planning a transformation initiative, every engagement begins with a strategic conversation.
            </p>
            <Button onClick={() => setContactOpen(true)}>Book Strategic Consultation</Button>
          </div>

          <div className="grid gap-0">
            <div className={`${rowCls} border-b border-line`}>
              <span className={labelCls}>Email</span>
              <span className="text-[.88rem] font-medium text-ink">
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-accent-bright">
                  {CONTACT.email}
                </a>
              </span>
            </div>
            <div className={`${rowCls} border-b border-line`}>
              <span className={labelCls}>WhatsApp</span>
              <span className="text-[.88rem] font-medium text-ink">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="transition-colors hover:text-[#25D366]">
                  {CONTACT.phoneDisplay}
                </a>
              </span>
            </div>
            <div className={`${rowCls} border-b border-line`}>
              <span className={labelCls}>LinkedIn</span>
              <span className="text-[.88rem] font-medium">
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="li-btn inline-flex h-[34px] items-center gap-[6px] rounded-sm border border-[rgba(10,102,194,.32)] bg-[rgba(10,102,194,.18)] px-[14px] text-[.68rem] font-semibold uppercase tracking-[.10em] text-ink-secondary transition-colors hover:border-[rgba(10,102,194,.52)] hover:bg-[rgba(10,102,194,.32)]"
                >
                  Yuvraj Raulji
                </a>
              </span>
            </div>
            <div className={rowCls}>
              <span className={labelCls}>Location</span>
              <span className="text-[.88rem] font-medium text-ink">{CONTACT.location}</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
