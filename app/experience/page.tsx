import type { Metadata } from 'next';
import { Page, PageHero } from '../../components/chrome/page';
import { ContactButton } from '../../components/homepage/contact-button';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, InlineLink, Marker, Section, Shell, Tag } from '../../components/homepage/primitives';
import { STATS, TIMELINE } from '../../lib/home';
import { experienceSchema, type Crumb } from '../../lib/schema';
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  OG_IMAGE,
  SITE_URL,
  TECH_PROFICIENCIES,
} from '../../lib/site';
import '../home.css';
import { ROLE_LINE } from '../../lib/identity';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Experience', href: '/experience/' },
];

const title = `Experience | Yuvraj Raulji, ${ROLE_LINE}`;
const description =
  'The employment record, employers named: Team Lead and Senior Magento Developer at Archer Business Solution, and earlier roles at Magento IT Solutions.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/experience/` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/experience/`,
    siteName: 'Yuvraj Raulji',
    type: 'profile',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
};

/**
 * Experience.
 *
 * Two views of the same nine years, because they answer different questions.
 * The timeline answers "how did this happen", one year per entry, and is the
 * version a visitor skims. The employment record answers "what exactly did you
 * do", role by role with the points from lib/site.ts, and is the version
 * someone evaluating a proposal reads.
 *
 * The fourteen-month overlap is real, not a data error. The Gulf retail role
 * runs Jul 2018 to May 2021 and the B2B platform starts Mar 2020; Yuvraj
 * confirmed both against his own record on 26 Aug 2026. Printing them as
 * stated is correct, and quietly adjusting one to remove the overlap would be
 * inventing a fact to make a layout tidier.
 */
/* The one mono eyebrow used inside the sections below, so four of them cannot
   drift into four different small-caps treatments. */
const LABEL =
  'm-0 font-mono text-eyebrow font-medium uppercase leading-none tracking-[0.2em] text-ink/55';

export default function ExperiencePage() {
  return (
    <Page schema={experienceSchema(crumbs)} active="Experience">
      <PageHero
        eyebrow="Experience"
        lines={['Built.', 'Migrated.', 'Scaled.']}
        lede="Nine years building the same thing from different angles: systems a business can actually run on. Four employers since 2018, from the first Magento role to leading a development team, with the Generative AI certification in 2026."
        crumbs={crumbs}
      >
        <ContactButton>Work with me</ContactButton>
        <Btn href="/work/" variant="ghost">
          See the work
        </Btn>
      </PageHero>

      {/* ── The four figures ────────────────────────────────────────
          The homepage's stat band, cell for cell: a 1px gap draws the
          hairlines, the figure is set extralight at display size with the
          trailing "+" in the accent, and the label sits under it in mono. It
          was four numbers hung under top rules with the figure itself painted
          red, which is the one thing the homepage's band does not do: the
          number is the fact, and the accent marks the "+" that qualifies it. */}
      <Section id="record" labelledBy="record-title">
        <Shell>
          <Marker label="The record" />
          <div className="mb-head">
            <Lines as="h2" id="record-title" lines={['Five numbers', 'I can point at.']} />
          </div>

          {/* Five cells, not four. At `lg` they sit in one row; below that the
              two-column grid leaves the fifth spanning nothing, so it takes the
              full width rather than sitting half-empty next to a gap. */}
          <dl className="m-0 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-5">
            {STATS.map((s, i) => (
              <Rise
                key={s.label}
                delay={i * 0.07}
                className="flex flex-col bg-[var(--bg)] px-5 py-7 last:col-span-2 sm:px-7 sm:py-9 lg:last:col-span-1"
              >
                <dd className="m-0 font-manrope text-[clamp(38px,4.4vw,64px)] font-extralight leading-none tracking-[-0.04em] text-ink">
                  {s.value.replace('+', '')}
                  {s.value.includes('+') && <span className="text-accent">+</span>}
                </dd>
                <dt className="m-0 mt-4 font-mono text-eyebrow font-medium uppercase leading-[1.5] tracking-[0.2em] text-ink/55">
                  {s.label}
                </dt>
                <p className="m-0 mt-5 max-w-[34ch] font-manrope text-[15px] font-light leading-[1.65] text-ink/55">
                  {s.note}
                </p>
              </Rise>
            ))}
          </dl>
        </Shell>
      </Section>

      {/* ── Timeline ────────────────────────────────────────────────
          The homepage's rail: the year out in the left margin where it can be
          scanned, one continuous hairline down the content column with an
          accent node at each point. It was a three-column row with the year set
          as 3.6rem of display type, which competed with the entry titles beside
          it for the same eye. */}
      <Section id="timeline" labelledBy="timeline-title">
        <Shell>
          <Marker label="Timeline" />
          <div className="mb-grid flex flex-wrap items-end justify-between gap-8">
            <Lines as="h2" id="timeline-title" lines={['Today', 'back to 2010.']} />
            <Rise delay={0.18}>
              <p className="m-0 max-w-[520px] font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                Seven points where the work changed shape, most recent first,
                back to a diploma in information technology.
              </p>
            </Rise>
          </div>

          <ol className="m-0 list-none p-0">
            {/*
              NEWEST FIRST.

              `TIMELINE` in lib/home.ts is authored chronologically, 2010 to
              2026, and was rendered in that order: a reader landed on a
              diploma from sixteen years ago and had to scroll the whole rail
              to reach what this person does now. Reversed here rather than in
              the data, because the data's order is also what the ItemList
              node reports and a schema timeline reads correctly ascending.
              `toReversed()` leaves the module-scope array alone — `reverse()`
              would mutate it and flip the schema with it.
            */}
            {TIMELINE.toReversed().map((t, i) => (
              <li key={t.year}>
                <Rise
                  delay={Math.min(i, 5) * 0.05}
                  className="grid gap-x-8 gap-y-2 md:grid-cols-[150px_minmax(0,1fr)] lg:gap-x-10 lg:grid-cols-[190px_minmax(0,1fr)]"
                >
                  <p className="m-0 font-mono text-eyebrow font-medium leading-none tracking-[0.18em] text-accent-bright md:pt-8 lg:pt-9">
                    {t.year}
                  </p>
                  <div className="relative border-t border-line pb-8 pt-6 sm:pb-10 sm:pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-8 lg:pl-10 lg:pt-9">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[38px] hidden h-[7px] w-[7px] -translate-x-1/2 bg-accent md:block"
                    />
                    <h3 className="m-0 font-manrope text-[clamp(21px,2.2vw,30px)] font-semibold leading-[1.15] tracking-[-0.02em]">
                      <span className="sr-only">{t.year}: </span>
                      {t.title}
                    </h3>
                    <p className="m-0 mt-4 max-w-[68ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                      {t.body}
                    </p>
                  </div>
                </Rise>
              </li>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* ── Employment record ───────────────────────────────────────
          The same rail, carrying what the homepage's evolution entries carry:
          period and place in the left margin, then the role, the organisation
          in mono, the summary, and the points marked with a rule rather than a
          dot, which is the mark the homepage uses inside an entry. */}
      <Section id="roles" labelledBy="roles-title">
        <Shell>
          <Marker label="Employment record" />
          <div className="mb-grid flex flex-wrap items-end justify-between gap-8">
            <Lines as="h2" id="roles-title" lines={['Role by role,', 'as it happened.']} />
            <Rise delay={0.18}>
              <p className="m-0 max-w-[520px] font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                Two entries share one employer. They are listed separately rather than merged
                under a promotion, because which work was done in which seat is the thing an
                interviewer asks about.
              </p>
            </Rise>
          </div>

          <ol className="m-0 list-none p-0">
            {EXPERIENCE.map((r, i) => (
              <li key={`${r.org}-${r.period}`}>
                <Rise
                  delay={Math.min(i, 3) * 0.05}
                  className="grid gap-x-8 gap-y-2 md:grid-cols-[150px_minmax(0,1fr)] lg:gap-x-10 lg:grid-cols-[190px_minmax(0,1fr)]"
                >
                  <div className="md:pt-8 lg:pt-9">
                    <p className="m-0 font-mono text-eyebrow font-medium leading-none tracking-[0.18em] text-accent-bright">
                      {r.period}
                    </p>
                    {r.location ? (
                      <p className="m-0 mt-2.5 font-mono text-eyebrow uppercase leading-[1.5] tracking-[0.14em] text-ink/55">
                        {r.location}
                      </p>
                    ) : null}
                  </div>

                  <div className="relative border-t border-line pb-8 pt-6 sm:pb-10 sm:pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-8 lg:pl-10 lg:pt-9">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[38px] hidden h-[7px] w-[7px] -translate-x-1/2 bg-accent md:block"
                    />
                    <h3 className="m-0 font-manrope text-[clamp(21px,2.2vw,30px)] font-semibold leading-[1.15] tracking-[-0.02em]">
                      {r.title}
                    </h3>
                    <p className="m-0 mt-2.5 font-mono text-eyebrow uppercase leading-[1.5] tracking-[0.14em] text-ink/55">
                      {r.org}
                    </p>
                    <p className="m-0 mt-5 max-w-[68ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                      {r.summary}
                    </p>
                    {r.points.length ? (
                      <ul className="m-0 mt-6 grid list-none gap-x-10 gap-y-2.5 p-0 xl:grid-cols-2">
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
                    ) : null}

                    {/* The stack the seat was actually delivered on. It is in
                        the record in lib/career.ts and it is the first thing a
                        technical screen looks for, so it is printed per role
                        rather than only aggregated under Technologies below. */}
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

          {/* A "Held alongside" grid rendered CURRENT_ROLES here: four titles,
              two of which were "Founder" and "Director & Founder", against two
              company names. It is the only place on the site that published a
              foundership or a directorship, and the brand rule for this site is
              that no page does, in copy or in markup. The matching `founder`
              properties were removed from the Organization and
              ProfessionalService nodes in lib/schema.ts at the same time.

              CURRENT_ROLES itself is untouched in lib/site.ts. It is the
              professional record and the record is not edited to suit a design
              decision; it is simply not what this site publishes. Anything that
              should carry it belongs on a CV, not here. */}
        </Shell>
      </Section>

      {/* ── Technologies, education, credentials ──────────────────── */}
      <Section id="credentials" labelledBy="credentials-title">
        <Shell>
          <Marker label="Technologies & credentials" />
          <div className="mb-grid">
            <Lines
              as="h2"
              id="credentials-title"
              lines={['What I work with,', 'and what I studied.']}
            />
          </div>

          <div className="grid gap-x-12 gap-y-14 lg:grid-cols-[1.3fr_1fr]">
            <Rise>
              <h3 className={LABEL}>Technologies</h3>
              <dl className="m-0 mt-6 border-t border-line">
                {TECH_PROFICIENCIES.map((g) => (
                  <div
                    key={g.group}
                    className="grid gap-x-8 gap-y-4 border-b border-line py-6 sm:grid-cols-[11rem_1fr]"
                  >
                    <dt className={LABEL}>{g.group}</dt>
                    <dd className="m-0 flex flex-wrap gap-2">
                      {g.items.map((it) => (
                        <Tag key={it}>{it}</Tag>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </Rise>

            <Rise delay={0.12}>
              <h3 className={LABEL}>Education</h3>
              <ul className="m-0 mt-6 list-none border-t border-line p-0">
                {EDUCATION.map((e) => (
                  <li key={e.qualification} className="border-b border-line py-5">
                    <p className="m-0 font-manrope text-[16px] font-light leading-[1.5] text-ink/70">
                      {e.qualification}
                    </p>
                    <p className={`mt-2 ${LABEL}`}>{e.period}</p>
                  </li>
                ))}
              </ul>

              <h3 className={`mt-head ${LABEL}`}>Certifications</h3>
              <ul className="m-0 mt-6 list-none border-t border-line p-0">
                {CERTIFICATIONS.map((c) => (
                  <li key={c.name} className="border-b border-line py-5">
                    <p className="m-0 font-manrope text-[16px] font-light leading-[1.5] text-ink/70">
                      {c.url ? (
                        <InlineLink href={c.url} external>
                          {c.name}
                        </InlineLink>
                      ) : (
                        c.name
                      )}
                    </p>
                    <p className={`mt-2 ${LABEL}`}>
                      {c.issuer}
                      {c.date ? ` · ${c.date}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            </Rise>
          </div>
        </Shell>
      </Section>

      {/* The page used to close with its own call to action. That is the
          footer's job on every route now, and the page's own CTA is in the
          hero, where it carries this page's wording. */}
    </Page>
  );
}
