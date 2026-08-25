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
  SITE_URL,
  TECH_PROFICIENCIES,
} from '../../lib/site';
import '../home.css';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Experience', href: '/experience/' },
];

const title = 'Experience | Yuvraj Raulji, eCommerce Consultant';
const description =
  'Nine years of commerce work: Magento since 2016, Shopify since 2018, Saudi retail builds, multi-store Magento 2 at B2B scale, and independent practice incorporated in 2025.';

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
  },
  twitter: { card: 'summary', title, description },
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
 * One conflict in the record is carried openly rather than smoothed over: the
 * employment history has the Gulf retail role running Jul 2018 to May 2021 and
 * the B2B platform starting Mar 2020, which overlap by fourteen months. Both are
 * printed as the record states them. Quietly adjusting one to remove the
 * overlap would be inventing a fact to make a layout tidier.
 */
export default function ExperiencePage() {
  return (
    <Page schema={experienceSchema(crumbs)} active="Experience">
      <PageHero
        eyebrow="Experience"
        lines={['Built.', 'Migrated.', 'Scaled.']}
        lede="Nine years building the same thing from different angles: systems a business can actually run on. The first websites go back to 2014, the Magento work to 2016, and the incorporated practice to 2025."
        crumbs={crumbs}
      >
        <ContactButton>Work with me</ContactButton>
        <Btn href="/work/" variant="ghost">
          See the work
        </Btn>
      </PageHero>

      {/* ── The four figures ──────────────────────────────────────── */}
      <Section id="record" labelledBy="record-title">
        <Shell>
          <Marker num="01" label="The record" />
          <Lines as="h2" id="record-title" lines={['Four numbers', 'I can point at.']} softFrom={1} />

          <dl className="mt-grid grid gap-x-8 gap-y-grid sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className="border-t border-[var(--rule)] pt-item">
                <Rise delay={i * 0.07}>
                  <div className="flex flex-col-reverse">
                    <dt className="yr-label mt-hair">{s.label}</dt>
                    <dd className="font-display text-[length:var(--hd-3)] uppercase leading-none tracking-[-.01em] text-accent-bright">
                      {s.value}
                    </dd>
                  </div>
                  <p className="yr-note mt-item max-w-[34ch]">{s.note}</p>
                </Rise>
              </div>
            ))}
          </dl>
        </Shell>
      </Section>

      {/* ── Timeline ──────────────────────────────────────────────── */}
      <Section id="timeline" labelledBy="timeline-title">
        <Shell>
          <Marker num="02" label="Timeline" />
          <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
            <Lines as="h2" id="timeline-title" lines={['2010', 'to today.']} softFrom={1} />
            <Rise delay={0.18} className="self-end">
              <p className="yr-lede max-w-[54ch]">
                Seven points where the work changed shape, from a diploma in information
                technology to incorporating the practice.
              </p>
            </Rise>
          </div>

          <ol className="mt-grid">
            {TIMELINE.map((t, i) => (
              <li
                key={t.year}
                className="border-t border-[var(--rule)] py-block last:border-b last:border-[var(--rule)]"
              >
                <Rise delay={Math.min(i, 3) * 0.05}>
                  <div className="grid gap-x-12 gap-y-item lg:grid-cols-[minmax(0,.4fr)_minmax(0,.8fr)_minmax(0,1.3fr)]">
                    <p
                      aria-hidden="true"
                      className="font-display text-[length:var(--hd-year)] uppercase leading-[.85] tracking-[.01em] text-accent/70"
                    >
                      {t.year}
                    </p>
                    <h3 className="yr-display yr-display--3 self-start">
                      <span className="sr-only">{t.year}: </span>
                      {t.title}
                    </h3>
                    <p className="yr-note max-w-[58ch] self-start">{t.body}</p>
                  </div>
                </Rise>
              </li>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* ── Employment record ─────────────────────────────────────── */}
      <Section id="roles" labelledBy="roles-title">
        <Shell>
          <Marker num="03" label="Employment record" />
          <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
            <Lines as="h2" id="roles-title" lines={['Role by role,', 'as it happened.']} softFrom={1} />
            <Rise delay={0.18} className="self-end">
              <p className="yr-lede max-w-[54ch]">
                The Gulf retail and B2B platform periods overlap by fourteen months. Both are
                printed as the record states them rather than adjusted to remove the overlap.
              </p>
            </Rise>
          </div>

          <ol className="mt-grid">
            {EXPERIENCE.map((r, i) => (
              <li
                key={`${r.org}-${r.period}`}
                className="border-t border-[var(--rule)] py-block last:border-b last:border-[var(--rule)]"
              >
                <Rise delay={Math.min(i, 3) * 0.05}>
                  <div className="grid gap-x-12 gap-y-item lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
                    <div>
                      <h3 className="yr-display yr-display--3 max-w-[22ch]">{r.title}</h3>
                      <p className="mt-tight text-[.94rem] font-semibold text-accent-bright">
                        {r.org}
                      </p>
                      <p className="yr-label mt-hair">{r.period}</p>
                      {r.location ? <p className="yr-label mt-hair">{r.location}</p> : null}
                    </div>
                    <div>
                      <p className="yr-note max-w-[60ch]">{r.summary}</p>
                      {r.points.length ? (
                        <ul className="mt-item space-y-2">
                          {r.points.map((pt) => (
                            <li
                              key={pt}
                              className="flex gap-4 text-[.92rem] leading-[1.65] text-ink-secondary"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[.6em] h-1 w-1 flex-none rounded-full bg-accent"
                              />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
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
          <Marker num="04" label="Technologies & credentials" />
          <Lines
            as="h2"
            id="credentials-title"
            lines={['What I work with,', 'and what I studied.']}
            softFrom={1}
          />

          <div className="mt-grid grid gap-x-12 gap-y-grid lg:grid-cols-[1.3fr_1fr]">
            <Rise>
              <h3 className="yr-label">Technologies</h3>
              <dl className="mt-item border-t border-[var(--rule)]">
                {TECH_PROFICIENCIES.map((g) => (
                  <div
                    key={g.group}
                    className="grid gap-x-8 gap-y-tight border-b border-[var(--rule)] py-item sm:grid-cols-[11rem_1fr]"
                  >
                    <dt className="yr-label">{g.group}</dt>
                    <dd className="flex flex-wrap gap-x-1.5 gap-y-2">
                      {g.items.map((it) => (
                        <Tag key={it}>{it}</Tag>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </Rise>

            <Rise delay={0.12}>
              <h3 className="yr-label">Education</h3>
              <ul className="mt-item border-t border-[var(--rule)]">
                {EDUCATION.map((e) => (
                  <li key={e.qualification} className="border-b border-[var(--rule)] py-item">
                    <p className="text-[.94rem] text-ink-secondary">{e.qualification}</p>
                    <p className="yr-label mt-hair">{e.period}</p>
                  </li>
                ))}
              </ul>

              <h3 className="yr-label mt-block">Certifications</h3>
              <ul className="mt-item border-t border-[var(--rule)]">
                {CERTIFICATIONS.map((c) => (
                  <li key={c.name} className="border-b border-[var(--rule)] py-item">
                    <p className="text-[.94rem] text-ink-secondary">
                      {c.url ? (
                        <InlineLink href={c.url} external>
                          {c.name}
                        </InlineLink>
                      ) : (
                        c.name
                      )}
                    </p>
                    <p className="yr-label mt-hair">
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

      <Section id="contact" labelledBy="exp-cta-title" tall>
        <Shell>
          <Lines
            as="h2"
            id="exp-cta-title"
            lines={['Nine years,', 'one conversation away.']}
            softFrom={1}
            className="max-w-[20ch]"
          />
          <Rise delay={0.2} className="mt-head">
            <p className="yr-lede max-w-[56ch]">
              If any of the above matches the problem in front of you, the first conversation costs
              nothing and usually shortens the second one.
            </p>
          </Rise>
          <Rise delay={0.3} className="mt-block flex flex-wrap gap-3">
            <ContactButton>Work with me</ContactButton>
            <Btn href="/about/" variant="ghost">
              About Yuvraj Raulji
            </Btn>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
