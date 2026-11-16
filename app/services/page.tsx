import type { Metadata } from 'next';
import Link from 'next/link';
import { Page, PageHero } from '../../components/chrome/page';
import { ContactButton } from '../../components/homepage/contact-button';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, Marker, Section, Shell, Tag } from '../../components/homepage/primitives';
import { servicesHubSchema, type Crumb } from '../../lib/schema';
import { ALL_TECH_LINKS, SERVICES } from '../../lib/services-hub';
import { OG_IMAGE, SITE_URL } from '../../lib/site';
import { TECHNOLOGIES_BY_SLUG } from '../../lib/technology';
import '../home.css';

/**
 * /services/
 *
 * A hub, and only a hub. It owns the generic services query and routes to the
 * eleven technology pages and twenty-six service pages that own the specific
 * ones. It never restates their content, which is what keeps it from
 * competing with them; the reasoning is at the top of lib/services-hub.ts,
 * including the mapping from the URLs the brief asked for to the URLs that
 * already serve them.
 *
 * Section order:
 *
 *   01 Hero
 *   02 Direct answer     the extractable list of everything offered
 *   03 Four groups       each routing into its platforms
 *   04 Full index        every technology and every service under it
 *   05 Engagement        one paragraph, pointing at /pricing/
 *   06 FAQ
 *   07 CTA
 *
 * Section 04 exists because a hub that only shows four groups hides
 * twenty-six real pages from both a reader and a crawler. It is a plain
 * index, and it is the most useful block on the page for anyone who already
 * knows what they want.
 */

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: SERVICES.path },
];

export const metadata: Metadata = {
  title: SERVICES.title,
  description: SERVICES.description,
  keywords: [SERVICES.primaryKeyword, ...SERVICES.secondaryKeywords],
  alternates: { canonical: `${SITE_URL}${SERVICES.path}` },
  openGraph: {
    title: SERVICES.title,
    description: SERVICES.description,
    url: `${SITE_URL}${SERVICES.path}`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SERVICES.title,
    description: SERVICES.description,
    images: [OG_IMAGE],
  },
};

const LABEL =
  'm-0 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.2em] text-ink/55';

export default function Services() {
  return (
    <Page schema={servicesHubSchema(crumbs)} active="Services">
      <PageHero eyebrow={SERVICES.eyebrow} lines={SERVICES.h1} lede={SERVICES.lede} crumbs={crumbs}>
        <ContactButton variant="primary">{SERVICES.cta}</ContactButton>
        <Btn href="/pricing/" variant="ghost">
          How engagements work
        </Btn>
      </PageHero>

      {/* ── 02 Direct answer ──────────────────────────────────────── */}
      <Section id="everything" labelledBy="everything-title">
        <Shell>
          <Marker label="In one paragraph" />
          <div className="grid gap-x-12 gap-y-item lg:grid-cols-[1fr_1.4fr]">
            <Lines as="h2" id="everything-title" lines={['Everything,', 'in one answer.']} />
            <Rise delay={0.12}>
              <p className="m-0 max-w-[66ch] font-manrope text-[18px] font-light leading-[1.7] text-ink/65">
                {SERVICES.quickAnswer.answer}
              </p>
            </Rise>
          </div>
        </Shell>
      </Section>

      {/* ── 03 The four groups ────────────────────────────────────── */}
      <Section id="groups" labelledBy="groups-title">
        <Shell>
          <Marker label="Four kinds of work" />
          <div className="mb-grid">
            <Lines as="h2" id="groups-title" lines={['Named by the work,', 'not by the tool.']} />
          </div>

          <ol className="m-0 list-none p-0">
            {SERVICES.groups.map((g, i) => (
              <li key={g.name}>
                <Rise
                  delay={Math.min(i, 3) * 0.05}
                  className="grid gap-x-10 gap-y-4 border-t border-line py-grid md:grid-cols-[180px_minmax(0,1fr)]"
                >
                  <p
                    aria-hidden="true"
                    className="m-0 font-mono text-[12px] font-medium leading-none tracking-[0.2em] text-accent-bright"
                  >
                    {g.num}
                  </p>

                  <div>
                    <h3 className="m-0 font-manrope text-[clamp(22px,2.4vw,32px)] font-semibold leading-[1.15] tracking-[-0.025em]">
                      {g.name}
                    </h3>
                    <p className="m-0 mt-item max-w-[62ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/60">
                      {g.body}
                    </p>

                    <div className="mt-grid grid gap-x-10 gap-y-item lg:grid-cols-[1.3fr_1fr]">
                      <div>
                        <h4 className={LABEL}>What that covers</h4>
                        <ul className="m-0 mt-tight grid list-none gap-2 p-0 sm:grid-cols-2">
                          {g.capabilities.map((c) => (
                            <li
                              key={c}
                              className="flex gap-3.5 font-manrope text-[15px] font-light leading-[1.6] text-ink/60"
                            >
                              <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-accent/50" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* The routes. Descriptive anchors only: every link says
                          where it goes, which is the rule the rest of the site
                          is written under. */}
                      <div>
                        <h4 className={LABEL}>Read in depth</h4>
                        <ul className="m-0 mt-tight grid list-none gap-2.5 p-0">
                          {g.platforms.map((slug) => {
                            const tech = TECHNOLOGIES_BY_SLUG[slug];
                            if (!tech) return null;
                            return (
                              <li key={slug}>
                                <Link
                                  href={`/${slug}/`}
                                  className="font-manrope text-[15px] font-light leading-[1.5] text-accent-bright underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
                                >
                                  {tech.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Rise>
              </li>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* ── 04 The full index ─────────────────────────────────────── */}
      <Section id="index" labelledBy="index-title">
        <Shell>
          <Marker label="Every page" />
          <div className="mb-grid grid gap-x-12 gap-y-item lg:grid-cols-[1fr_1.1fr]">
            <Lines as="h2" id="index-title" lines={['The full index,', 'platform by platform.']} />
            <Rise delay={0.12}>
              <p className="m-0 max-w-[52ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                Eleven platform pages, and the individual services under each. If you already know
                what you need, it is faster to go straight there.
              </p>
            </Rise>
          </div>

          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {ALL_TECH_LINKS.map((t, i) => (
              <Rise key={t.slug} delay={Math.min(i, 8) * 0.03} className="bg-[var(--bg)] p-card">
                <h3 className="m-0">
                  <Link
                    href={t.href}
                    className="font-manrope text-[19px] font-semibold leading-[1.25] tracking-[-0.02em] text-ink transition-colors hover:text-accent-bright"
                  >
                    {t.label}
                  </Link>
                </h3>
                {t.services.length ? (
                  <ul className="m-0 mt-item flex list-none flex-wrap gap-2 p-0">
                    {t.services.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="inline-block">
                          <Tag>{s.label}</Tag>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="m-0 mt-item font-manrope text-[14px] font-light leading-[1.6] text-ink/40">
                    One page, no sub-services.
                  </p>
                )}
              </Rise>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ── 05 Engagement ────────────────────────────────────────── */}
      <Section id="engagement" labelledBy="engagement-title">
        <Shell>
          <div className="grid gap-x-12 gap-y-item lg:grid-cols-[1fr_1.4fr]">
            <Lines as="h2" id="engagement-title" lines={['How the work', 'is bought.']} />
            <Rise delay={0.12}>
              <p className="m-0 max-w-[62ch] font-manrope text-[18px] font-light leading-[1.7] text-ink/65">
                {SERVICES.engagement}
              </p>
              <div className="mt-block">
                <Btn href="/pricing/" variant="ghost">
                  Engagement models and how to get a quote
                </Btn>
              </div>
            </Rise>
          </div>
        </Shell>
      </Section>

      {/* ── 06 FAQ ───────────────────────────────────────────────── */}
      <Section id="questions" labelledBy="questions-title">
        <Shell>
          <Marker label="Questions" />
          <div className="mb-grid">
            <Lines as="h2" id="questions-title" lines={['Straight', 'answers.']} />
          </div>
          <dl className="m-0 border-t border-line">
            {SERVICES.faqs.map((f, i) => (
              <Rise
                key={f.q}
                delay={Math.min(i, 4) * 0.04}
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

      {/* ── 07 CTA ───────────────────────────────────────────────── */}
      <Section id="start" labelledBy="start-title">
        <Shell>
          <div className="grid gap-x-12 gap-y-item lg:grid-cols-2">
            <Lines as="h2" id="start-title" lines={SERVICES.finalHeadline} />
            <Rise delay={0.14}>
              <p className="m-0 max-w-[48ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/60">
                Describe the symptom rather than the solution. Working out which service it is, is
                part of the first reply rather than a separate purchase.
              </p>
              <div className="mt-block flex flex-wrap gap-3">
                <ContactButton variant="primary">{SERVICES.cta}</ContactButton>
                <Btn href="/work/" variant="ghost">
                  See the case studies
                </Btn>
              </div>
            </Rise>
          </div>
        </Shell>
      </Section>
    </Page>
  );
}
