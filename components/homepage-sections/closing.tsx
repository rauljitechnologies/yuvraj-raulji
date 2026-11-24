import { ArrowRight, Mail, MessageCircle, CalendarClock } from 'lucide-react';
import { CONTACT } from '../../lib/homepage';
import { BOOKING_URL, TESTIMONIALS } from '../../lib/testimonials';
import { Button, Card, Container, Eyebrow, Section, SectionHeading } from '../ui';
import { RvGroup, RvItem } from './rv';

/* ══════════════════════════════════════════════════════════════════════════
   TESTIMONIALS.  PAPER.
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * Three testimonial cards.
 *
 * ── These are PLACEHOLDERS and they are labelled as such ──────────────────
 *
 * The brief asks for a testimonials section with placeholder content. A
 * fabricated quote attributed to a named person at a named company is the
 * single worst thing this page could ship: it is a false statement about a
 * real third party, it is the kind of thing a reader checks, and
 * CONTENT-PRINCIPLES.md section 1 rules it out outright.
 *
 * So no invented quotes and no invented names. Each card renders the shape of
 * a testimonial — the quote block, the attribution line, the role line — with
 * the slots visibly empty and a TODO marker on the section. The layout is
 * real, the spacing is real, the type is real, and nothing on it claims
 * anyone said anything.
 *
 * To fill one in: replace the entry in `TESTIMONIALS` in lib/testimonials.ts
 * with the real quote, name and role, and set `placeholder: false`. The
 * marker is driven off that flag, so the section stops announcing itself as
 * unfinished only when every card is real.
 */
export function Testimonials() {
  const anyPlaceholder = TESTIMONIALS.some((t) => t.placeholder);

  return (
    <Section id="testimonials" labelledBy="testimonials-title" className="border-t border-line">
      <Container>
        <SectionHeading
          id="testimonials-title"
          eyebrow="Testimonials"
          emphasis="in their words."
          intro="What the people who commissioned the work say about it."
        >
          The work,
        </SectionHeading>

        {anyPlaceholder ? (
          <p className="m-0 mt-6 font-mono text-eyebrow uppercase text-accent-bright">
            TODO: {TESTIMONIALS.filter((t) => t.placeholder).length} of {TESTIMONIALS.length} quotes
            still to be supplied. Nothing is attributed until they are.
          </p>
        ) : null}

        <RvGroup as="ul" className="m-0 mt-12 grid list-none gap-4 p-0 md:grid-cols-3" each={0.06}>
          {TESTIMONIALS.map((t, i) => (
            <RvItem key={t.id} as="li" className="h-full">
              <Card>
                {/* A real <blockquote>, so the quote is a quote in the
                    accessibility tree rather than a styled paragraph. */}
                <blockquote className="m-0 flex h-full flex-col">
                  <p className="m-0 font-body text-body text-ink">
                    {t.placeholder ? (
                      <span className="text-ink-faint">
                        Quote {i + 1} goes here. Two or three sentences, in the client&rsquo;s own
                        words, about what changed.
                      </span>
                    ) : (
                      <>&ldquo;{t.quote}&rdquo;</>
                    )}
                  </p>

                  <footer className="mt-auto pt-8">
                    <p className="m-0 font-heading text-small font-bold text-ink">
                      {t.placeholder ? (
                        <span className="text-ink-faint">Name to follow</span>
                      ) : (
                        t.name
                      )}
                    </p>
                    <p className="m-0 mt-1 font-mono text-eyebrow uppercase text-ink-muted">
                      {t.placeholder ? 'Role, company' : t.role}
                    </p>
                  </footer>
                </blockquote>
              </Card>
            </RvItem>
          ))}
        </RvGroup>
      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FINAL CTA.  INK — the second of the page's two dark bands.
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * The closing band: one heading, then the three ways to start.
 *
 * ── Why this is the page's second ink band ────────────────────────────────
 *
 * The hero opens dark and this closes dark, which frames the argument that
 * runs on paper between them. See the alternation note on `Section` in
 * components/ui/index.tsx: those two are the only ones the brief allows, and
 * they are named there rather than chosen locally.
 *
 * ── The three routes, in the order a reader is likely to want them ────────
 *
 *   Book a call   the primary, and the only crimson fill on the band
 *   WhatsApp      fastest, and the one most enquiries actually arrive on
 *   Email         for anything with detail or an attachment in it
 *
 * One primary fill and two text links, rather than three buttons: three equal
 * buttons is three decisions, and the brief's accent rule allows exactly one
 * crimson fill per view anyway.
 *
 * The booking link is a TODO. See `BOOKING_URL` in lib/testimonials.ts for
 * why it falls back to /contact/ rather than to a dead Calendly URL.
 */
export function FinalCta() {
  const booking = BOOKING_URL;

  return (
    <Section id="start" labelledBy="start-title" tone="ink">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <div>
            <Eyebrow>Start here</Eyebrow>
            <h2
              id="start-title"
              className="m-0 mt-4 max-w-[22ch] font-heading text-h2 font-extrabold text-ink"
            >
              Bring the problem.{' '}
              <span className="text-accent-bright">Leave with a plan.</span>
            </h2>
            <p className="m-0 mt-6 max-w-measure font-body text-body text-ink-secondary">
              A first conversation is 30 minutes, costs nothing and ends with the next practical
              step, whether or not it involves me.
            </p>
          </div>

          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            <li>
              <Button
                href={booking.href}
                data-event="consultation_cta_click"
                external={booking.external ? 'the booking page' : undefined}
                className="w-full"
              >
                <CalendarClock aria-hidden="true" strokeWidth={2} className="h-4 w-4" />
                Book a 30-min call
                <ArrowRight aria-hidden="true" strokeWidth={2} className="h-4 w-4" />
              </Button>
              {booking.todo ? (
                <p className="m-0 mt-2 font-mono text-eyebrow uppercase text-accent-bright">
                  TODO: add the Calendly URL to BOOKING_URL
                </p>
              ) : null}
            </li>

            <li>
              <Button
                href={CONTACT.whatsapp}
                variant="text"
                external="WhatsApp"
                data-event="whatsapp_click"
              >
                <MessageCircle aria-hidden="true" strokeWidth={2} className="h-4 w-4" />
                WhatsApp
              </Button>
            </li>

            <li>
              <Button href={`mailto:${CONTACT.email}`} variant="text" data-event="email_click">
                <Mail aria-hidden="true" strokeWidth={2} className="h-4 w-4" />
                {CONTACT.email}
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
