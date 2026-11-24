import type { Metadata } from 'next';
import Link from 'next/link';
import { Page, PageHero } from '../../../components/chrome/page';
import { ContactButton } from '../../../components/homepage/contact-button';
import { Lines, Rise } from '../../../components/homepage/motion';
import { Btn, InlineLink, Marker, Section, Shell, Tag } from '../../../components/homepage/primitives';
import { WORK_ITEMS } from '../../../lib/home';
import { servicePageSchema, type Crumb } from '../../../lib/schema';
import { SERVICE_PAGES, SERVICE_PAGES_BY_SLUG, servicePageHref } from '../../../lib/service-pages';
import { SERVICES } from '../../../lib/services-hub';
import { OG_IMAGE, SITE_URL } from '../../../lib/site';
import '../../home.css';

/**
 * /services/{slug}/
 *
 * The sixteen service pages, one route. The reasoning for why these exist
 * alongside the eleven technology hubs and twenty-six platform service pages
 * is at the top of lib/service-pages.ts; in short, these own the build query
 * and those own the entity and advisory ones, and lib/content-map.ts enforces
 * the separation at build time.
 *
 * `dynamicParams = false` so a slug outside `generateStaticParams` is a build
 * error rather than an empty page. Under `output: 'export'` there is no
 * request-time fallback to catch it later.
 *
 * Section order:
 *
 *   01 Hero           H1, lede, two calls to action
 *   02 Direct answer  the question, and the passage an AI system lifts
 *   03 Overview       two paragraphs of orientation
 *   04 Boundary       what this page is NOT, and where to go instead
 *   05 Challenges     the symptom, and what it is costing
 *   06 Solutions      what gets built
 *   07 Technologies
 *   08 Process        how delivery actually runs
 *   09 Relevant work  real builds only, or the section does not render
 *   10 FAQ            open text, because the FAQPage markup must match it
 *   11 Related        where this connects, with the reason for each pairing
 *   12 CTA
 *
 * Section 04 sits fourth, high on the page, and it is the one that keeps these
 * sixteen pages from merging with the platform pages they sit beside. A reader
 * who wants an opinion rather than a build should find that out before
 * reading a delivery process.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_PAGES_BY_SLUG[slug];
  if (!service) return {};
  const url = `${SITE_URL}${servicePageHref(slug)}`;
  return {
    title: service.title,
    description: service.description,
    keywords: [service.primaryKeyword, ...service.secondaryKeywords],
    alternates: { canonical: url },
    openGraph: {
      title: service.title,
      description: service.description,
      url,
      siteName: 'Yuvraj Raulji',
      type: 'website',
      locale: 'en_US',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.title,
      description: service.description,
      images: [OG_IMAGE],
    },
  };
}

const LABEL =
  'm-0 font-mono text-eyebrow font-medium uppercase leading-none tracking-[0.2em] text-ink/55';

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  /* Non-null: `dynamicParams = false` means only the slugs above ever render. */
  const service = SERVICE_PAGES_BY_SLUG[slug]!;

  const crumbs: Crumb[] = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: SERVICES.path },
    { name: service.navLabel, href: servicePageHref(slug) },
  ];

  /* Resolved against the six real builds. A service with no matching case
     renders no proof section rather than borrowing another service's. */
  const cases = service.cases
    .map((id) => WORK_ITEMS.find((w) => w.id === id))
    .filter((w): w is NonNullable<typeof w> => Boolean(w));

  return (
    <Page schema={servicePageSchema(service, crumbs)} active="Services">
      <PageHero
        eyebrow={service.eyebrow}
        lines={service.h1}
        lede={service.lede}
        crumbs={crumbs}
      >
        <ContactButton variant="primary">{service.cta}</ContactButton>
        <Btn href="/pricing/" variant="ghost">
          How engagements work
        </Btn>
      </PageHero>

      {/* ── 02 Direct answer ──────────────────────────────────────── */}
      <Section id="answer" labelledBy="answer-title">
        <Shell>
          <Marker label="In one paragraph" />
          <div className="grid gap-x-12 gap-y-item lg:grid-cols-[1fr_1.4fr]">
            <Lines as="h2" id="answer-title" lines={['The short', 'answer.']} />
            <Rise delay={0.12}>
              {/*
                The question, shown. It was authored on every one of these
                pages and rendered on none of them: the section printed the
                answer under a heading that says "The short answer" without
                ever saying to what. A lifted paragraph with no question
                attached is the one shape an answer engine cannot place, and
                a reader skimming had the same problem.

                It is also now the first entry in the page's FAQPage node, so
                the markup and the visible text match, which is the condition
                that markup has to meet.
              */}
              <h3 className="m-0 mb-item max-w-[46ch] font-manrope text-[clamp(17px,1.7vw,21px)] font-semibold leading-[1.3] tracking-[-0.02em]">
                {service.quickAnswer.question}
              </h3>
              <p className="m-0 max-w-[66ch] font-manrope text-[18px] font-light leading-[1.7] text-ink/65">
                {service.quickAnswer.answer}
              </p>
            </Rise>
          </div>
        </Shell>
      </Section>

      {/* ── 03 Overview + 04 Boundary ─────────────────────────────── */}
      <Section id="overview" labelledBy="overview-title">
        <Shell>
          <Marker label="What this is" />
          <div className="grid gap-x-12 gap-y-grid lg:grid-cols-[1fr_1.25fr]">
            <Lines as="h2" id="overview-title" lines={['Where this', 'work starts.']} />
            <div>
              <Rise delay={0.12}>
                {service.overview.map((para) => (
                  <p
                    key={para}
                    className="m-0 mb-item max-w-[62ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/60"
                  >
                    {para}
                  </p>
                ))}
              </Rise>

              {/*
                The boundary. This is the device that stops this page and the
                platform page it sits beside from merging: each states what it
                is not and links to the one that is. Same mechanism
                lib/platform-services.ts uses between migration and upgrade,
                and the note there applies: it is not a courtesy.
              */}
              <Rise delay={0.2} className="mt-grid">
                <h3 className={LABEL}>What this page is not</h3>
                <p className="m-0 mt-tight max-w-[58ch] border-l-2 border-accent/40 pl-5 font-manrope text-[16px] font-light leading-[1.7] text-ink/55">
                  {service.boundary.body}
                </p>
                <div className="mt-item">
                  <Link
                    href={service.boundary.link.href}
                    className="font-manrope text-[15px] font-light text-accent-bright underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    {service.boundary.link.label}
                  </Link>
                </div>
              </Rise>
            </div>
          </div>
        </Shell>
      </Section>

      {/* ── 05 Challenges ─────────────────────────────────────────── */}
      <Section id="challenges" labelledBy="challenges-title">
        <Shell>
          <Marker label="What usually brings this in" />
          <div className="mb-grid">
            <Lines as="h2" id="challenges-title" lines={['The symptom,', 'and what it costs.']} />
          </div>

          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2">
            {service.challenges.map((c, i) => (
              <Rise key={c.symptom} as="li" delay={Math.min(i, 3) * 0.05} className="bg-[var(--bg)] p-card">
                <h3 className="m-0 max-w-[36ch] font-manrope text-[clamp(18px,1.9vw,24px)] font-semibold leading-[1.25] tracking-[-0.02em]">
                  {c.symptom}
                </h3>
                <p className="m-0 mt-item max-w-[48ch] font-manrope text-[15px] font-light leading-[1.65] text-ink/55">
                  {c.impact}
                </p>
              </Rise>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── 06 Solutions ──────────────────────────────────────────── */}
      <Section id="solutions" labelledBy="solutions-title">
        <Shell>
          <Marker label="What gets built" />
          <div className="mb-grid">
            <Lines as="h2" id="solutions-title" lines={['The work', 'itself.']} />
          </div>

          <dl className="m-0 border-t border-line">
            {service.solutions.map((s, i) => (
              <Rise
                key={s.name}
                delay={Math.min(i, 5) * 0.04}
                className="grid gap-x-12 gap-y-tight border-b border-line py-item lg:grid-cols-[1fr_1.4fr]"
              >
                <dt className="m-0 font-manrope text-[clamp(18px,1.8vw,23px)] font-semibold leading-[1.25] tracking-[-0.02em]">
                  {s.name}
                </dt>
                <dd className="m-0 max-w-[62ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/60">
                  {s.body}
                </dd>
              </Rise>
            ))}
          </dl>
        </Shell>
      </Section>

      {/* ── 07 Technologies ───────────────────────────────────────── */}
      <Section id="technologies" labelledBy="technologies-title">
        <Shell>
          <Marker label="Technologies" />
          <div className="mb-grid">
            <Lines as="h2" id="technologies-title" lines={['What it is', 'built with.']} />
          </div>

          <dl className="m-0 grid gap-x-12 border-t border-line sm:grid-cols-2">
            {service.technologies.map((g, i) => (
              <Rise key={g.group} delay={Math.min(i, 3) * 0.05} className="border-b border-line py-6">
                <dt className={LABEL}>{g.group}</dt>
                <dd className="m-0 mt-tight">
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {g.items.map((it) => (
                      <li key={it}>
                        <Tag>{it}</Tag>
                      </li>
                    ))}
                  </ul>
                </dd>
              </Rise>
            ))}
          </dl>
        </Shell>
      </Section>

      {/* ── 08 Process ────────────────────────────────────────────── */}
      <Section id="process" labelledBy="process-title">
        <Shell>
          <Marker label="How delivery runs" />
          <div className="mb-grid">
            <Lines as="h2" id="process-title" lines={['From scope', 'to handover.']} />
          </div>

          <ol className="m-0 list-none p-0">
            {service.process.map((step, i) => (
              <Rise
                key={step.num}
                as="li"
                delay={Math.min(i, 4) * 0.05}
                className="grid gap-x-10 gap-y-3 border-t border-line py-item md:grid-cols-[120px_minmax(0,1fr)]"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-eyebrow font-medium leading-none tracking-[0.2em] text-accent-bright md:pt-2"
                >
                  {step.num}
                </span>
                <div>
                  <h3 className="m-0 font-manrope text-[clamp(18px,1.8vw,23px)] font-semibold leading-[1.25] tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="m-0 mt-tight max-w-[62ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/60">
                    {step.body}
                  </p>
                </div>
              </Rise>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* ── 09 Relevant work ──────────────────────────────────────── */}
      {cases.length ? (
        <Section id="work" labelledBy="work-title">
          <Shell>
            <Marker label="Relevant builds" />
            <div className="mb-grid">
              <Lines as="h2" id="work-title" lines={['Where this', 'has been done.']} />
            </div>

            <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((w, i) => (
                <Rise key={w.id} as="li" delay={Math.min(i, 3) * 0.05} className="bg-[var(--bg)]">
                  <Link href={w.href} className="group flex h-full flex-col p-card">
                    <span className="font-mono text-eyebrow font-medium uppercase leading-none tracking-[0.2em] text-ink/45">
                      {w.category}
                    </span>
                    <h3 className="m-0 mt-item font-manrope text-[clamp(18px,1.9vw,24px)] font-semibold leading-[1.2] tracking-[-0.02em] transition-colors duration-200 group-hover:text-accent-bright">
                      {w.name}
                    </h3>
                    <p className="m-0 mt-tight max-w-[44ch] font-manrope text-[15px] font-light leading-[1.65] text-ink/55">
                      {w.summary}
                    </p>
                    <ul className="m-0 mt-auto flex list-none flex-wrap gap-2 p-0 pt-item">
                      {w.stack.map((t) => (
                        <li key={t}>
                          <Tag>{t}</Tag>
                        </li>
                      ))}
                    </ul>
                  </Link>
                </Rise>
              ))}
            </ul>
          </Shell>
        </Section>
      ) : null}

      {/* ── 10 FAQ ────────────────────────────────────────────────── */}
      <Section id="questions" labelledBy="questions-title">
        <Shell>
          <Marker label="Questions" />
          <div className="mb-grid">
            <Lines as="h2" id="questions-title" lines={['Straight', 'answers.']} />
          </div>
          <dl className="m-0 border-t border-line">
            {service.faqs.map((f, i) => (
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

      {/* ── 11 Related ────────────────────────────────────────────
          These pages shipped without this section, and the in-content link
          graph showed what it cost: one or two pages linking in and three to
          seven links out, where every platform spoke carries thirteen to
          seventeen. A page at the end of the funnel with nowhere to go next is
          a dead end for a reader and a leaf for a crawler.

          The anchor text is the sentence the pairing is worth, which is the
          rule stated at the top of lib/platform-services.ts. `boundary.link`
          is not repeated here: it is already rendered in section 04, where it
          does more work. */}
      <Section id="related" labelledBy="related-title">
        <Shell>
          <Marker label="Related" />
          <div className="mb-grid">
            <Lines as="h2" id="related-title" lines={['Where this', 'connects.']} />
          </div>

          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-3">
            {service.related.map((r, i) => (
              <li key={r.href} className="bg-[var(--bg)]">
                <Rise delay={Math.min(i, 3) * 0.06} className="flex h-full flex-col p-6 sm:p-8">
                  <h3 className="m-0 font-manrope text-[19px] font-semibold leading-[1.25] tracking-[-0.02em]">
                    <InlineLink href={r.href} lead>
                      {r.label}
                    </InlineLink>
                  </h3>
                  {/* Guarded for the same reason the platform template guards
                      it: `note` is optional on ServiceAnchor, and an anchor
                      without one should render no paragraph rather than an
                      empty one. All seventeen pages carry a note on every
                      link today. */}
                  {r.note ? (
                    <p className="m-0 mt-4 max-w-[40ch] font-manrope text-[15px] font-light leading-[1.65] text-ink/55">
                      {r.note}
                    </p>
                  ) : null}
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── 12 CTA ────────────────────────────────────────────────── */}
      <Section id="start" labelledBy="start-title">
        <Shell>
          <div className="grid gap-x-12 gap-y-item lg:grid-cols-2">
            <Lines as="h2" id="start-title" lines={service.finalHeadline} />
            <Rise delay={0.14}>
              <p className="m-0 max-w-[48ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/60">
                Describe what is in front of you and you get a written scope and a figure, usually
                within a few days of a short call. No charge for either.
              </p>
              <div className="mt-block flex flex-wrap gap-3 sm:gap-4">
                <ContactButton variant="primary">{service.cta}</ContactButton>
                <Btn href={SERVICES.path} variant="ghost">
                  All services
                </Btn>
              </div>
            </Rise>
          </div>
        </Shell>
      </Section>
    </Page>
  );
}
