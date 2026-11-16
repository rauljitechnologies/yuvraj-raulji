import type { Metadata } from 'next';
import Link from 'next/link';
import { RecruiterForm } from '../../components/forms/recruiter-form';
import { Page, PageHero } from '../../components/chrome/page';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, Marker, Section, Shell, Tag } from '../../components/homepage/primitives';
import { CAREER_STATS } from '../../lib/career';
import { AVAILABILITY, ROLE, SPECIALTIES } from '../../lib/identity';
import { REMOTE } from '../../lib/remote';
import { remoteWorkSchema, type Crumb } from '../../lib/schema';
import { RESUME } from '../../lib/resume';
import { resumeAvailable } from '../../lib/resume-file';
import { CONTACT, OG_HIRE, SITE_URL } from '../../lib/site';
import '../home.css';

/**
 * /remote-work/
 *
 * The recruiter funnel, and the page the repositioned site is pointed at.
 *
 * Section order, and the reasoning:
 *
 *   01 Hero          the H1, the availability line, the two calls to action
 *   02 Direct answer the extractable "yes, and here are the terms"
 *   03 The record    five figures, then the four highlights behind them
 *   04 Roles         the seats, as a recruiter titles them
 *   05 Logistics     location, time zone, overlap, markets, engagement
 *   06 Stack         what the work is actually done in
 *   07 Not a fit     the disqualifier, deliberately not buried
 *   08 The form      the approach, taken on the page
 *   09 FAQ           open text, because the FAQPage markup has to match it
 *
 * Section 07 sits before the form rather than near the FAQ for the same reason
 * /hire/ puts its equivalent third: a recruiter with a mismatched role should
 * find out before filling in eight fields, and a recruiter with the right one
 * reads it as a candidate who knows what they want.
 *
 * The form is a client component. Everything else on the page is a server
 * component reading module-scope data, so the route prerenders to static HTML.
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
    type: 'profile',
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

const available = resumeAvailable();

export default function RemoteWork() {
  return (
    <Page schema={remoteWorkSchema(crumbs)}>
      <PageHero
        eyebrow={REMOTE.eyebrow}
        lines={REMOTE.h1}
        lede={REMOTE.lede}
        crumbs={crumbs}
      >
        <Btn href="#send-a-role" variant="primary">
          {REMOTE.cta}
        </Btn>
        {/* The download only appears when the file is actually in public/. See
            the gate at the top of lib/resume.ts: a "Download Resume" button
            wired to a 404 reads as a broken site, not as a missing file. When
            there is no file the reader is sent to the on-page record, which is
            the complete version anyway. */}
        {available ? (
          <Btn href={RESUME.href} variant="ghost">
            Download Resume
          </Btn>
        ) : (
          <Btn href="/resume/" variant="ghost">
            View Resume
          </Btn>
        )}
      </PageHero>

      {/* ── 02 The direct answer ─────────────────────────────────────
          First thing under the hero, because it is the complete answer to the
          query the page targets and it is what an answer engine lifts. */}
      <Section id="availability" labelledBy="availability-title">
        <Shell>
          <Marker label="Availability" />
          <div className="grid gap-x-12 gap-y-item lg:grid-cols-[1fr_1.25fr]">
            <Lines
              as="h2"
              id="availability-title"
              lines={['Available,', 'and on what terms.']}
            />
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
              <p className="m-0 mt-item max-w-[64ch] font-manrope text-[18px] font-light leading-[1.7] text-ink/65">
                {REMOTE.quickAnswer.answer}
              </p>
            </Rise>
          </div>
        </Shell>
      </Section>

      {/* ── 03 The record ───────────────────────────────────────────── */}
      <Section id="record" labelledBy="record-title">
        <Shell>
          <Marker label="The record" />
          <div className="mb-grid">
            <Lines as="h2" id="record-title" lines={['Nine years,', 'with the receipts.']} />
          </div>

          <dl className="m-0 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-5">
            {CAREER_STATS.map((s, i) => (
              <Rise
                key={s.label}
                delay={i * 0.06}
                className="flex flex-col bg-[var(--bg)] px-5 py-7 last:col-span-2 sm:px-7 sm:py-9 lg:last:col-span-1"
              >
                <dd className="m-0 font-manrope text-[clamp(34px,3.8vw,56px)] font-extralight leading-none tracking-[-0.04em] text-ink">
                  {s.value.replace('+', '')}
                  {s.value.includes('+') && <span className="text-accent">+</span>}
                </dd>
                <dt className="m-0 mt-4 font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-[0.2em] text-ink/55">
                  {s.label}
                </dt>
                <p className="m-0 mt-4 max-w-[34ch] font-manrope text-[14px] font-light leading-[1.6] text-ink/50">
                  {s.context}
                </p>
              </Rise>
            ))}
          </dl>

          <ul className="m-0 mt-grid grid list-none gap-px border border-line bg-line p-0 lg:grid-cols-2">
            {REMOTE.highlights.map((h, i) => (
              <Rise key={h.headline} as="li" delay={Math.min(i, 3) * 0.06} className="bg-[var(--bg)] p-card">
                <h3 className="m-0 font-manrope text-[clamp(19px,1.9vw,25px)] font-semibold leading-[1.2] tracking-[-0.02em]">
                  {h.headline}
                </h3>
                <p className="m-0 mt-item max-w-[54ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/60">
                  {h.body}
                </p>
                {/* The provenance. Printed, not just recorded in the data: a
                    claim with a source attached is a different claim. */}
                <p className="m-0 mt-item font-mono text-[10px] font-medium uppercase leading-[1.5] tracking-[0.2em] text-ink/40">
                  {h.source}
                </p>
              </Rise>
            ))}
          </ul>

          <Rise delay={0.2} className="mt-tail">
            <Btn href="/experience/" variant="ghost">
              The full employment record
            </Btn>
          </Rise>
        </Shell>
      </Section>

      {/* ── 04 Roles ────────────────────────────────────────────────── */}
      <Section id="roles" labelledBy="roles-title">
        <Shell>
          <Marker label="Target roles" />
          <div className="grid gap-x-12 gap-y-grid lg:grid-cols-[1fr_1.25fr]">
            <div>
              <Lines as="h2" id="roles-title" lines={['The seats', 'this record fits.']} />
              <Rise delay={0.16}>
                <p className="m-0 mt-head max-w-[42ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                  The common thread is senior ownership of a commerce platform or a full-stack
                  product, with the architecture decisions inside the role rather than above it.
                </p>
              </Rise>
            </div>

            <div>
              <ol className="m-0 list-none border-t border-line p-0">
                {REMOTE.roles.map((r, i) => (
                  <Rise
                    key={r}
                    as="li"
                    delay={Math.min(i, 6) * 0.04}
                    className="flex items-baseline gap-5 border-b border-line py-5"
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] font-medium leading-none tracking-[0.18em] text-accent-bright"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-manrope text-[clamp(17px,1.7vw,22px)] font-light leading-[1.3] text-ink">
                      {r}
                    </span>
                  </Rise>
                ))}
              </ol>

              <Rise delay={0.3} className="mt-item">
                <h3 className={LABEL}>Engagement</h3>
                <ul className="m-0 mt-tight flex list-none flex-wrap gap-2 p-0">
                  {REMOTE.preferences.map((p) => (
                    <li key={p}>
                      <Tag>{p}</Tag>
                    </li>
                  ))}
                </ul>
              </Rise>
            </div>
          </div>
        </Shell>
      </Section>

      {/* ── 05 Logistics ────────────────────────────────────────────── */}
      <Section id="logistics" labelledBy="logistics-title">
        <Shell>
          <Marker label="Working arrangement" />
          <div className="mb-grid">
            <Lines as="h2" id="logistics-title" lines={['The practical half,', 'answered upfront.']} />
          </div>

          <dl className="m-0 grid gap-x-12 border-t border-line sm:grid-cols-2">
            {REMOTE.facts.map((f, i) => (
              <Rise
                key={f.label}
                delay={Math.min(i, 5) * 0.05}
                className="border-b border-line py-6"
              >
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

      {/* ── 06 Stack and sectors ────────────────────────────────────── */}
      <Section id="stack" labelledBy="stack-title">
        <Shell>
          <Marker label="Stack and sectors" />
          <div className="grid gap-x-12 gap-y-grid lg:grid-cols-2">
            <div>
              <Lines as="h2" id="stack-title" lines={['What the work', 'is done in.']} />
              <Rise delay={0.16} className="mt-head">
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {SPECIALTIES.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
                <p className="m-0 mt-item max-w-[46ch] font-manrope text-[15px] font-light leading-[1.7] text-ink/50">
                  The short list. The{' '}
                  <Link href="/expertise/" className="text-accent-bright underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                    full capability set is on the expertise page
                  </Link>
                  .
                </p>
              </Rise>
            </div>

            <Rise delay={0.24}>
              <h3 className={LABEL}>Sectors on the record</h3>
              <ul className="m-0 mt-tight list-none border-t border-line p-0">
                {REMOTE.industries.map((s) => (
                  <li
                    key={s}
                    className="border-b border-line py-3.5 font-manrope text-[15px] font-light leading-[1.5] text-ink/60"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Rise>
          </div>
        </Shell>
      </Section>

      {/* ── 07 Not a fit ────────────────────────────────────────────── */}
      <Section id="not-a-fit" labelledBy="not-a-fit-title">
        <Shell>
          <Marker label="Where I am not the answer" />
          <div className="grid gap-x-12 gap-y-grid lg:grid-cols-[1fr_1.25fr]">
            <Lines as="h2" id="not-a-fit-title" lines={['What I am', 'not looking for.']} />
            <ul className="m-0 grid list-none gap-item p-0">
              {REMOTE.notLookingFor.map((n, i) => (
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

      {/* ── 08 The form ─────────────────────────────────────────────── */}
      <Section id="send-a-role" labelledBy="send-a-role-title">
        <Shell>
          <Marker label="Recruiter enquiry" />
          <div className="grid gap-x-12 gap-y-grid lg:grid-cols-[1fr_1.4fr]">
            <div>
              <Lines as="h2" id="send-a-role-title" lines={REMOTE.finalHeadline} />
              <Rise delay={0.16} className="mt-head">
                <p className="m-0 max-w-[40ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                  Three fields are required and the rest help me give you a straight yes or no
                  rather than a holding reply. I read every approach myself.
                </p>
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
                    <dt className={LABEL}>LinkedIn</dt>
                    <dd className="m-0 mt-2">
                      <a
                        href={CONTACT.linkedin}
                        target="_blank"
                        rel="noopener"
                        className="font-manrope text-[17px] font-light text-ink transition-colors hover:text-accent-bright"
                      >
                        Yuvraj Raulji, opens in a new tab
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className={LABEL}>Resume</dt>
                    <dd className="m-0 mt-2">
                      <Link
                        href="/resume/"
                        className="font-manrope text-[17px] font-light text-ink transition-colors hover:text-accent-bright"
                      >
                        The full {ROLE.toLowerCase()} resume
                      </Link>
                    </dd>
                  </div>
                </dl>
              </Rise>
            </div>

            <Rise delay={0.24}>
              <RecruiterForm tone="dark" />
            </Rise>
          </div>
        </Shell>
      </Section>

      {/* ── 09 FAQ ──────────────────────────────────────────────────── */}
      <Section id="questions" labelledBy="questions-title">
        <Shell>
          <Marker label="Questions" />
          <div className="mb-grid">
            <Lines as="h2" id="questions-title" lines={['Straight', 'answers.']} />
          </div>

          {/* Open text, not an accordion. The FAQPage markup in
              remoteWorkSchema() is only legitimate while the answers are
              visible without interaction, and a recruiter scanning the page
              should not have to click seven times to read it. */}
          <dl className="m-0 border-t border-line">
            {REMOTE.faqs.map((f, i) => (
              <Rise
                key={f.q}
                delay={Math.min(i, 6) * 0.04}
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
    </Page>
  );
}
