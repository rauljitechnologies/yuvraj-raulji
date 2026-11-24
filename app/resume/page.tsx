import type { Metadata } from 'next';
import Link from 'next/link';
import { Page, PageHero } from '../../components/chrome/page';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, Marker, Section, Shell, Tag } from '../../components/homepage/primitives';
import { RESUME } from '../../lib/resume';
import { resumeAvailable } from '../../lib/resume-file';
import { resumeSchema, type Crumb } from '../../lib/schema';
import { OG_HIRE, SITE_URL } from '../../lib/site';
import '../home.css';
import { ROLE } from '../../lib/identity';

/**
 * /resume/
 *
 * The employment record as a document, in HTML, with the PDF offered beside
 * it when the file exists.
 *
 * ── Why the record is on the page and not only in the file ────────────────
 *
 * A PDF is close to invisible to search and useless to an answer engine
 * summarising a candidate. This page carries the same record as semantic HTML,
 * which is the version that gets indexed and cited; the file is for the
 * applicant tracking system a recruiter has to paste it into. They are two
 * formats of one record, and lib/career.ts is the single source for both, so
 * they cannot disagree.
 *
 * ── The two states ────────────────────────────────────────────────────────
 *
 * `RESUME.available` is resolved at build time by checking public/ for the
 * file. With the file, the primary call to action is a download. Without it,
 * the download is absent entirely rather than broken, and a short note says
 * the page is the current version. Nothing on this page ever offers a file it
 * does not have.
 */

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Resume', href: RESUME.path },
];

export const metadata: Metadata = {
  title: RESUME.title,
  description: RESUME.description,
  keywords: [RESUME.primaryKeyword, ...RESUME.secondaryKeywords],
  alternates: { canonical: `${SITE_URL}${RESUME.path}` },
  openGraph: {
    title: RESUME.title,
    description: RESUME.description,
    url: `${SITE_URL}${RESUME.path}`,
    siteName: 'Yuvraj Raulji',
    type: 'profile',
    locale: 'en_US',
    images: [OG_HIRE],
  },
  twitter: {
    card: 'summary_large_image',
    title: RESUME.title,
    description: RESUME.description,
    images: [OG_HIRE],
  },
};

const LABEL =
  'm-0 font-mono text-eyebrow font-medium uppercase leading-none tracking-[0.2em] text-ink/55';

/* Resolved once at build time, in a server component, and threaded into both
   the schema and the markup so the two can never disagree about whether the
   file exists. */
const available = resumeAvailable();

export default function Resume() {
  return (
    <Page schema={resumeSchema(crumbs, available)} active="Resume">
      <PageHero eyebrow={RESUME.eyebrow} lines={RESUME.h1} lede={RESUME.lede} crumbs={crumbs}>
        {available ? (
          <>
            {/*
              `download` names the saved file, so it does not land in a
              downloads folder as a hashed build asset. The analytics layer in
              app/layout.tsx counts this click through the delegated `yr-btn`
              handler, and `resume_download` is one of the named conversions.
            */}
            <a
              href={RESUME.href}
              download={RESUME.filename}
              data-event="resume_download"
              className="yr-btn inline-flex h-[52px] shrink-0 items-center bg-accent px-8 font-display text-small font-bold uppercase leading-none tracking-[.18em] text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-bright motion-reduce:hover:translate-y-0"
            >
              Download Resume
            </a>
            <Btn href={RESUME.href} variant="ghost">
              View PDF
            </Btn>
          </>
        ) : (
          <Btn href="/remote-collaboration/" variant="primary">
            Send me a remote opportunity
          </Btn>
        )}
      </PageHero>

      {/* ── Header block ───────────────────────────────────────────── */}
      <Section id="summary" labelledBy="summary-title">
        <Shell>
          <Marker label="Summary" />
          <div className="grid gap-x-12 gap-y-grid lg:grid-cols-[1.3fr_1fr]">
            <div>
              <Lines as="h2" id="summary-title" lines={[`${ROLE},`, 'and what that covers.']} />
              <Rise delay={0.16}>
                <p className="m-0 mt-head max-w-[62ch] font-manrope text-[18px] font-light leading-[1.7] text-ink/65">
                  {RESUME.summary}
                </p>
                <ul className="m-0 mt-item flex list-none flex-wrap gap-2 p-0">
                  {RESUME.titles.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
                <p className="m-0 mt-item flex items-center gap-3.5">
                  <span
                    aria-hidden="true"
                    className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent animate-yr-blink"
                  />
                  <span className="font-mono text-eyebrow font-medium uppercase leading-[1.5] tracking-[0.2em] text-accent-bright">
                    {RESUME.availability}
                  </span>
                </p>

                {!available ? (
                  /* Honest, and specific about what to do instead. It is not an
                     apology: this page is the complete record either way. */
                  <p className="m-0 mt-item max-w-[58ch] border-l-2 border-accent/40 pl-5 font-manrope text-[15px] font-light leading-[1.7] text-ink/50">
                    This page is the current version of the record. If you need it as a file for an
                    applicant tracking system, email me and I will send it straight back.
                  </p>
                ) : null}
              </Rise>
            </div>

            <Rise delay={0.24}>
              <h3 className={LABEL}>Contact</h3>
              <dl className="m-0 mt-tight border-t border-line">
                {RESUME.contact.map((c) => (
                  <div key={c.label} className="flex flex-wrap items-baseline gap-x-4 border-b border-line py-3.5">
                    <dt className="font-mono text-eyebrow font-medium uppercase leading-[1.5] tracking-[0.18em] text-ink/45">
                      {c.label}
                    </dt>
                    <dd className="m-0 ml-auto font-manrope text-[15px] font-light leading-[1.4] text-ink/75">
                      {'href' in c && c.href ? (
                        <a
                          href={c.href}
                          {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                          className="transition-colors hover:text-accent-bright"
                        >
                          {c.value}
                        </a>
                      ) : (
                        c.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Rise>
          </div>
        </Shell>
      </Section>

      {/* ── Career ─────────────────────────────────────────────────── */}
      <Section id="career" labelledBy="career-title">
        <Shell>
          <Marker label="Career history" />
          <div className="mb-grid">
            <Lines as="h2" id="career-title" lines={['Role by role,', 'with the employer named.']} />
          </div>

          <ol className="m-0 list-none p-0">
            {RESUME.career.map((r, i) => (
              <li key={`${r.org}-${r.period}`}>
                <Rise
                  delay={Math.min(i, 3) * 0.05}
                  className="grid gap-x-10 gap-y-2 md:grid-cols-[180px_minmax(0,1fr)]"
                >
                  <div className="md:pt-7">
                    <p className="m-0 font-mono text-eyebrow font-medium leading-none tracking-[0.16em] text-accent-bright">
                      {r.period}
                    </p>
                    {r.current ? (
                      <p className="m-0 mt-2.5 font-mono text-eyebrow uppercase leading-none tracking-[0.18em] text-ink/45">
                        Current
                      </p>
                    ) : null}
                    {r.location ? (
                      <p className="m-0 mt-2.5 font-mono text-eyebrow uppercase leading-[1.5] tracking-[0.14em] text-ink/45">
                        {r.location}
                      </p>
                    ) : null}
                  </div>

                  <div className="border-t border-line pb-grid pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-7">
                    <h3 className="m-0 font-manrope text-[clamp(20px,2.1vw,28px)] font-semibold leading-[1.15] tracking-[-0.02em]">
                      {r.title}
                    </h3>
                    <p className="m-0 mt-2.5 font-manrope text-[15px] font-medium leading-[1.5] text-accent-bright">
                      {r.org}
                    </p>
                    <p className="m-0 mt-5 max-w-[68ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/60">
                      {r.summary}
                    </p>

                    {r.points.length ? (
                      <ul className="m-0 mt-6 grid list-none gap-2.5 p-0">
                        {r.points.map((pt) => (
                          <li
                            key={pt}
                            className="flex gap-3.5 font-manrope text-[15px] font-light leading-[1.6] text-ink/60"
                          >
                            <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-accent/50" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      /* Said out loud rather than left as a gap. An empty
                         bullet list on one role reads as an oversight; this
                         reads as a record that does not borrow. */
                      <p className="m-0 mt-6 font-manrope text-[14px] font-light italic leading-[1.6] text-ink/40">
                        Achievements from this role are not in the verified record, so none are
                        listed.
                      </p>
                    )}

                    {r.stack.length ? (
                      <ul className="m-0 mt-item flex list-none flex-wrap gap-2 p-0">
                        {r.stack.map((tech) => (
                          <li key={tech}>
                            <Tag>{tech}</Tag>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Rise>
              </li>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* ── Skills, education, certification ───────────────────────── */}
      <Section id="credentials" labelledBy="credentials-title">
        <Shell>
          <Marker label="Skills and credentials" />
          <div className="mb-grid">
            <Lines as="h2" id="credentials-title" lines={['What I work with,', 'and what I studied.']} />
          </div>

          <div className="grid gap-x-12 gap-y-grid lg:grid-cols-[1.3fr_1fr]">
            <Rise>
              <h3 className={LABEL}>Technical skills</h3>
              <dl className="m-0 mt-tight border-t border-line">
                {RESUME.skills.map((g) => (
                  <div
                    key={g.group}
                    className="grid gap-x-8 gap-y-3 border-b border-line py-6 sm:grid-cols-[11rem_1fr]"
                  >
                    <dt className="m-0 font-mono text-eyebrow font-medium uppercase leading-[1.5] tracking-[0.16em] text-ink/55">
                      {g.group}
                    </dt>
                    <dd className="m-0">
                      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                        {g.items.map((it) => (
                          <li key={it}>
                            <Tag>{it}</Tag>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </Rise>

            <Rise delay={0.14}>
              <h3 className={LABEL}>Education</h3>
              <dl className="m-0 mt-tight border-t border-line">
                {RESUME.education.map((e) => (
                  <div key={e.qualification} className="border-b border-line py-4">
                    <dt className="m-0 font-manrope text-[16px] font-light leading-[1.5] text-ink/75">
                      {e.qualification}
                    </dt>
                    <dd className="m-0 mt-1.5 font-mono text-eyebrow uppercase leading-none tracking-[0.16em] text-ink/45">
                      {e.period}
                    </dd>
                  </div>
                ))}
              </dl>

              <h3 className={`${LABEL} mt-grid`}>Certifications</h3>
              <dl className="m-0 mt-tight border-t border-line">
                {RESUME.certifications.map((c) => (
                  <div key={`${c.name}-${c.issuer}`} className="border-b border-line py-4">
                    <dt className="m-0 font-manrope text-[16px] font-light leading-[1.5] text-ink/75">
                      {/* Only a URL that is on the record becomes a link.
                          lib/site.ts holds an empty string where there is no
                          verification page, and inventing one is exactly the
                          fabrication CONTENT-PRINCIPLES.md forbids. */}
                      {c.url ? (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener"
                          className="underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-bright hover:decoration-accent"
                        >
                          {c.name}
                        </a>
                      ) : (
                        c.name
                      )}
                    </dt>
                    <dd className="m-0 mt-1.5 font-mono text-eyebrow uppercase leading-none tracking-[0.16em] text-ink/45">
                      {c.issuer}
                      {c.date ? ` | ${c.date}` : ''}
                    </dd>
                  </div>
                ))}
              </dl>

              <Rise delay={0.24} className="mt-item">
                <Link
                  href="/certifications/"
                  className="font-manrope text-[15px] font-light text-accent-bright underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  The Generative AI certification in detail
                </Link>
              </Rise>
            </Rise>
          </div>
        </Shell>
      </Section>

      {/* ── Close ──────────────────────────────────────────────────── */}
      <Section id="next" labelledBy="next-title">
        <Shell>
          <div className="grid gap-x-12 gap-y-item lg:grid-cols-[1fr_1fr]">
            {/* This read "Hiring for a remote team?", which is the one
                question this site is explicitly not asking for. The resume is
                here as evidence for a client deciding whether to engage, so
                the close points at that decision. */}
            <Lines as="h2" id="next-title" lines={['Project that needs', { text: 'this record behind it?', accent: true }]} />
            <Rise delay={0.14}>
              <p className="m-0 max-w-[48ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/60">
                The remote collaboration page has the engagement models, the time zone overlap and
                how a project actually starts, so a first reply can be a straight yes or no.
              </p>
              <div className="mt-block flex flex-wrap gap-3 sm:gap-4">
                <Btn href="/remote-collaboration/" variant="primary">
                  How we work together
                </Btn>
                <Btn href="/experience/" variant="ghost">
                  Full experience
                </Btn>
              </div>
            </Rise>
          </div>
        </Shell>
      </Section>
    </Page>
  );
}
