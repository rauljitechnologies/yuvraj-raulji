import type { Metadata } from 'next';
import Link from 'next/link';
import { Page, PageHero } from '../../components/chrome/page';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, Marker, Section, Shell, Tag } from '../../components/homepage/primitives';
import { CAREER_STATS } from '../../lib/career';
import { AVAILABILITY, SPECIALTIES } from '../../lib/identity';
import { REMOTE } from '../../lib/remote';
import { remoteWorkSchema, type Crumb } from '../../lib/schema';
import { CONTACT, OG_HIRE, SITE_URL } from '../../lib/site';
import '../home.css';

/**
 * /remote-collaboration/ : working with clients worldwide.
 *
 * ── What this page was ────────────────────────────────────────────────────
 *
 * The recruiter funnel: seven target job titles, employment types, work
 * arrangements and an eight-field form asking for a job description URL. The
 * objective is now explicitly freelance client work and explicitly not a
 * recruiter portal, so all of that is gone and the page faces the other way.
 *
 * The URL stayed. It is indexed, it is linked from the header and footer, and
 * "remote work" is still what a client searches when they want someone who
 * works this way. The primary keyword moved with the intent, from "remote
 * magento developer" to "remote ecommerce development".
 *
 * Section order:
 *
 *   01 Hero            H1, lede, two calls to action
 *   02 Direct answer   the extractable "how this works"
 *   03 Logistics       time zone, communication, reply time
 *   04 Engagement      the seven models
 *   05 Who I work with client types and sectors
 *   06 How it starts   four steps
 *   07 Not a fit       the disqualifier, before the CTA
 *   08 FAQ             open text, because the FAQPage markup must match it
 *   09 CTA
 *
 * Section 07 sits before the final call to action for the same reason /hire/
 * puts its equivalent third: a reader who needs an agency should find out
 * before writing, and one who wants a single accountable person reads it as
 * confirmation they are in the right place.
 */

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Remote work', href: REMOTE.path },
];

export const metadata: Metadata = {
  title: REMOTE.title,
  description: REMOTE.description,
  keywords: [REMOTE.primaryKeyword, ...REMOTE.secondaryKeywords],
  alternates: { canonical: `${SITE_URL}${REMOTE.path}` },
  openGraph: {
    title: REMOTE.title,
    description: REMOTE.description,
    url: `${SITE_URL}${REMOTE.path}`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
    images: [OG_HIRE],
  },
  twitter: {
    card: 'summary_large_image',
    title: REMOTE.title,
    description: REMOTE.description,
    images: [OG_HIRE],
  },
};

const LABEL =
  'm-0 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.2em] text-ink/55';

export default function RemoteWork() {
  return (
    <Page schema={remoteWorkSchema(crumbs)} active="How we work">
      <PageHero eyebrow={REMOTE.eyebrow} lines={REMOTE.h1} lede={REMOTE.lede} crumbs={crumbs}>
        <Btn href="/contact/" variant="primary">
          {REMOTE.cta}
        </Btn>
        <Btn href={CONTACT.whatsapp} variant="ghost" external>
          Message on WhatsApp
        </Btn>
      </PageHero>

      {/* ── 02 Direct answer ──────────────────────────────────────── */}
      <Section id="how" labelledBy="how-title">
        <Shell>
          <Marker label="How it works" />
          <div className="grid gap-x-12 gap-y-item lg:grid-cols-[1fr_1.4fr]">
            <Lines as="h2" id="how-title" lines={['Remote, and', 'actually practised.']} />
            <Rise delay={0.12}>
              <p className="m-0 flex items-center gap-3.5">
                <span
                  aria-hidden="true"
                  className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent animate-yr-blink"
                />
                <span className="font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-[0.2em] text-accent-bright">
                  {AVAILABILITY}
                </span>
              </p>
              <p className="m-0 mt-item max-w-[66ch] font-manrope text-[18px] font-light leading-[1.7] text-ink/65">
                {REMOTE.quickAnswer.answer}
              </p>
            </Rise>
          </div>
        </Shell>
      </Section>

      {/* ── 03 Logistics ─────────────────────────────────────────── */}
      <Section id="logistics" labelledBy="logistics-title">
        <Shell>
          <Marker label="The practical half" />
          <div className="mb-grid">
            <Lines as="h2" id="logistics-title" lines={['Answered upfront,', 'so it costs no email.']} />
          </div>

          <dl className="m-0 grid gap-x-12 border-t border-line sm:grid-cols-2">
            {REMOTE.facts.map((f, i) => (
              <Rise key={f.label} delay={Math.min(i, 5) * 0.05} className="border-b border-line py-6">
                <dt className={LABEL}>{f.label}</dt>
                <dd className="m-0 mt-tight font-manrope text-[18px] font-light leading-[1.5] text-ink">
                  {f.value}
                </dd>
                {f.note ? (
                  <dd className="m-0 mt-tight max-w-[46ch] font-manrope text-[14px] font-light leading-[1.6] text-ink/50">
                    {f.note}
                  </dd>
                ) : null}
              </Rise>
            ))}
          </dl>
        </Shell>
      </Section>

      {/* ── 04 Engagement models ─────────────────────────────────── */}
      <Section id="engagement" labelledBy="engagement-title">
        <Shell>
          <Marker label="Engagement models" />
          <div className="mb-grid grid gap-x-12 gap-y-item lg:grid-cols-[1fr_1.1fr]">
            <Lines as="h2" id="engagement-title" lines={['Seven ways', 'to work together.']} />
            <Rise delay={0.12}>
              <p className="m-0 max-w-[52ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                You do not have to pick one. Describe the work and I will tell you which fits,
                including when the cheapest option is the right one.
              </p>
              <div className="mt-item">
                <Btn href="/pricing/" variant="ghost">
                  What is inside each model
                </Btn>
              </div>
            </Rise>
          </div>

          <ol className="m-0 list-none border-t border-line p-0">
            {REMOTE.engagementModels.map((m, i) => (
              <Rise
                key={m.name}
                as="li"
                delay={Math.min(i, 6) * 0.04}
                className="grid gap-x-10 gap-y-2 border-b border-line py-item md:grid-cols-[70px_minmax(0,1fr)]"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-[12px] font-medium leading-none tracking-[0.2em] text-accent-bright md:pt-2"
                >
                  {m.num}
                </span>
                <div className="grid gap-x-10 gap-y-2 lg:grid-cols-[1fr_1.2fr]">
                  <div>
                    <h3 className="m-0 font-manrope text-[clamp(18px,1.9vw,24px)] font-semibold leading-[1.2] tracking-[-0.02em]">
                      {m.name}
                    </h3>
                    <p className="m-0 mt-2 max-w-[42ch] font-manrope text-[15px] font-light leading-[1.6] text-accent-bright">
                      {m.shape}
                    </p>
                  </div>
                  <p className="m-0 max-w-[56ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/60">
                    {m.bestFor}
                  </p>
                </div>
              </Rise>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* ── 05 Who I work with ───────────────────────────────────── */}
      <Section id="clients" labelledBy="clients-title">
        <Shell>
          <Marker label="Who I work with" />
          <div className="grid gap-x-12 gap-y-grid lg:grid-cols-2">
            <div>
              <Lines as="h2" id="clients-title" lines={['Businesses,', 'agencies and brands.']} />
              <Rise delay={0.16} className="mt-head">
                <ul className="m-0 list-none border-t border-line p-0">
                  {REMOTE.clients.map((c) => (
                    <li
                      key={c}
                      className="border-b border-line py-3.5 font-manrope text-[16px] font-light leading-[1.5] text-ink/70"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </Rise>
            </div>

            <Rise delay={0.24}>
              <h3 className={LABEL}>Sectors on the record</h3>
              <ul className="m-0 mt-tight list-none border-t border-line p-0">
                {REMOTE.industries.map((s) => (
                  <li
                    key={s}
                    className="border-b border-line py-3 font-manrope text-[15px] font-light leading-[1.5] text-ink/55"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-grid">
                <h3 className={LABEL}>Built with</h3>
                <ul className="m-0 mt-tight flex list-none flex-wrap gap-2 p-0">
                  {SPECIALTIES.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
                <p className="m-0 mt-item max-w-[46ch] font-manrope text-[15px] font-light leading-[1.7] text-ink/50">
                  The short list. The{' '}
                  <Link
                    href="/expertise/"
                    className="text-accent-bright underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                  >
                    full capability set is on the expertise page
                  </Link>
                  .
                </p>
              </div>
            </Rise>
          </div>
        </Shell>
      </Section>

      {/* ── 06 How a project starts ──────────────────────────────── */}
      <Section id="start" labelledBy="start-title">
        <Shell>
          <Marker label="Starting a project" />
          <div className="mb-grid grid gap-x-12 gap-y-item lg:grid-cols-[1fr_1.1fr]">
            <Lines as="h2" id="start-title" lines={['Four steps,', 'no charge for any.']} />
            <Rise delay={0.12}>
              <p className="m-0 max-w-[52ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                No follow-up sequence afterwards either. If the scope says you do not need the
                work, that is the end of it.
              </p>
            </Rise>
          </div>

          <ol className="m-0 grid list-none gap-px border border-line bg-line p-0 lg:grid-cols-4">
            {REMOTE.process.map((p, i) => (
              <Rise key={p.num} as="li" delay={i * 0.06} className="bg-[var(--bg)] p-card">
                <p
                  aria-hidden="true"
                  className="m-0 font-mono text-[12px] font-medium leading-none tracking-[0.2em] text-accent-bright"
                >
                  {p.num}
                </p>
                <h3 className="m-0 mt-item font-manrope text-[19px] font-semibold leading-[1.25] tracking-[-0.02em]">
                  {p.title}
                </h3>
                <p className="m-0 mt-tight font-manrope text-[15px] font-light leading-[1.65] text-ink/55">
                  {p.body}
                </p>
              </Rise>
            ))}
          </ol>

          {/* The verified record, as a reassurance strip rather than a hero
              claim. A client reading about remote collaboration wants to know
              it has been done at scale before. */}
          <dl className="m-0 mt-grid grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-5">
            {CAREER_STATS.map((s, i) => (
              <Rise
                key={s.label}
                delay={i * 0.05}
                className="flex flex-col bg-[var(--bg)] px-5 py-6 last:col-span-2 sm:px-7 lg:last:col-span-1"
              >
                <dd className="m-0 font-manrope text-[clamp(28px,3vw,42px)] font-extralight leading-none tracking-[-0.04em] text-ink">
                  {s.value.replace('+', '')}
                  {s.value.includes('+') && <span className="text-accent">+</span>}
                </dd>
                <dt className="m-0 mt-3 font-mono text-[10px] font-medium uppercase leading-[1.5] tracking-[0.18em] text-ink/55">
                  {s.label}
                </dt>
              </Rise>
            ))}
          </dl>
        </Shell>
      </Section>

      {/* ── 07 Not a fit ─────────────────────────────────────────── */}
      <Section id="not-a-fit" labelledBy="not-a-fit-title">
        <Shell>
          <Marker label="Where I am not the answer" />
          <div className="grid gap-x-12 gap-y-grid lg:grid-cols-[1fr_1.25fr]">
            <Lines as="h2" id="not-a-fit-title" lines={['What I am', 'not right for.']} />
            <ul className="m-0 grid list-none gap-item p-0">
              {REMOTE.notAFit.map((n, i) => (
                <Rise key={n} as="li" delay={Math.min(i, 3) * 0.05} className="flex gap-4">
                  <span aria-hidden="true" className="mt-[13px] h-px w-4 shrink-0 bg-accent/50" />
                  <span className="max-w-[58ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/60">
                    {n}
                  </span>
                </Rise>
              ))}
            </ul>
          </div>
        </Shell>
      </Section>

      {/* ── 08 FAQ ───────────────────────────────────────────────── */}
      <Section id="questions" labelledBy="questions-title">
        <Shell>
          <Marker label="Questions" />
          <div className="mb-grid">
            <Lines as="h2" id="questions-title" lines={['Straight', 'answers.']} />
          </div>

          {/* Open text, not an accordion. The FAQPage markup is only
              legitimate while the answers are visible without interaction. */}
          <dl className="m-0 border-t border-line">
            {REMOTE.faqs.map((f, i) => (
              <Rise
                key={f.q}
                delay={Math.min(i, 5) * 0.04}
                className="grid gap-x-12 gap-y-tight border-b border-line py-item lg:grid-cols-[1fr_1.4fr]"
              >
                <dt className="m-0 font-manrope text-[clamp(18px,1.8vw,23px)] font-semibold leading-[1.25] tracking-[-0.02em]">
                  {f.q}
                </dt>
                <dd className="m-0 max-w-[62ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/60">
                  {f.a}
                </dd>
              </Rise>
            ))}
          </dl>
        </Shell>
      </Section>

      {/* ── 09 CTA ───────────────────────────────────────────────── */}
      <Section id="contact" labelledBy="contact-title">
        <Shell>
          <div className="grid gap-x-12 gap-y-item lg:grid-cols-2">
            <Lines as="h2" id="contact-title" lines={REMOTE.finalHeadline} />
            <Rise delay={0.14}>
              <p className="m-0 max-w-[48ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/60">
                Describe what you are building or fixing and you get a written scope and a figure,
                usually within a few days of a short call.
              </p>
              <div className="mt-block flex flex-wrap gap-3 sm:gap-4">
                <Btn href="/contact/" variant="primary">
                  {REMOTE.cta}
                </Btn>
                <Btn href={CONTACT.whatsapp} variant="ghost" external>
                  WhatsApp
                </Btn>
              </div>
              <dl className="m-0 mt-grid grid gap-item border-t border-line pt-item">
                <div>
                  <dt className={LABEL}>Email</dt>
                  <dd className="m-0 mt-2">
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="font-manrope text-[17px] font-light text-ink transition-colors hover:text-accent-bright"
                    >
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className={LABEL}>Phone</dt>
                  <dd className="m-0 mt-2">
                    <a
                      href={`tel:${CONTACT.phoneE164}`}
                      className="font-manrope text-[17px] font-light text-ink transition-colors hover:text-accent-bright"
                    >
                      {CONTACT.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </dl>
            </Rise>
          </div>
        </Shell>
      </Section>
    </Page>
  );
}
