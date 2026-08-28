import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Page, PageHero } from '../../../components/chrome/page';
import { ContactButton } from '../../../components/homepage/contact-button';
import { Lines, Rise } from '../../../components/homepage/motion';
import {
  Btn,
  InlineLink,
  Marker,
  Section,
  Shell,
  Tag,
} from '../../../components/homepage/primitives';
import { PILLARS, PILLARS_BY_SLUG, pillarHref, type Pillar } from '../../../lib/expertise';
import { WORK_ITEMS } from '../../../lib/home';
import { POSTS } from '../../../lib/posts';
import { pillarSchema, type Crumb } from '../../../lib/schema';
import { SITE_URL } from '../../../lib/site';
import '../../home.css';

/**
 * Expertise pillar page.
 *
 * One route serves all six. The alternative was six near-identical page files,
 * which is six places for a section to go missing and six places to fix a
 * heading level.
 *
 * Page structure follows the brief's requirement for each expertise area in
 * order: what it means, problems solved, when a business needs it (and when it
 * does not), the approach, the stack, related case studies, related insights,
 * related expertise, questions, and a call to action. Everything below the hero
 * is content the pillar model supplies; nothing is generated to fill a slot.
 *
 * Heading levels: the H1 is the pillar name, every section opens an H2, and the
 * repeated items inside a section are H3. There is exactly one H1 per page and
 * no level is skipped.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return PILLARS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pillar = PILLARS_BY_SLUG[slug];
  if (!pillar) return {};

  const url = `${SITE_URL}${pillarHref(slug)}`;
  return {
    title: pillar.title,
    description: pillar.description,
    alternates: { canonical: url },
    openGraph: {
      title: pillar.title,
      description: pillar.description,
      url,
      siteName: 'Yuvraj Raulji',
      type: 'article',
      locale: 'en_US',
    },
    twitter: { card: 'summary', title: pillar.title, description: pillar.description },
  };
}

/* ── Section helpers ─────────────────────────────────────────────
   Local to this file because they encode this page's layout, not a
   sitewide pattern. A section head is the marker, the H2 and the
   optional supporting line, and it repeats eight times below.

   The shape is the homepage's: the heading and its supporting line share a
   baseline with the space between them doing the separating, rather than
   sitting in two halves of a split grid. The ordinal the marker used to draw
   is gone with the ordinals everywhere else. */

/* One mono label, used by every eyebrow inside a section below. */
const LABEL =
  'm-0 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/35';

/* One body size, so eight sections cannot drift into eight body sizes. */
const BODY = 'font-manrope text-[17px] font-light leading-[1.7] text-ink/50';

function Head({
  label,
  id,
  lines,
  lede,
}: {
  label: string;
  id: string;
  lines: readonly string[];
  lede?: string;
}) {
  return (
    <>
      <Marker label={label} />
      <div className="mb-10 flex flex-wrap items-end justify-between gap-8 sm:mb-14 lg:mb-[70px]">
        <Lines as="h2" id={id} lines={lines} />
        {lede ? (
          <Rise delay={0.18}>
            <p className={`m-0 max-w-[520px] ${BODY}`}>{lede}</p>
          </Rise>
        ) : null}
      </div>
    </>
  );
}

export default async function PillarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pillar: Pillar | undefined = PILLARS_BY_SLUG[slug];
  if (!pillar) notFound();

  const crumbs: Crumb[] = [
    { name: 'Home', href: '/' },
    { name: 'Expertise', href: '/expertise/' },
    { name: pillar.label, href: pillarHref(pillar.slug) },
  ];

  /* Cross-links are resolved from ids rather than duplicated, so a case study
     renamed in lib/home.ts is renamed on all six of these pages at once. An id
     with no match is dropped rather than rendered as a broken row. */
  const cases = pillar.cases
    .map((id) => WORK_ITEMS.find((w) => w.id === id))
    .filter((w): w is (typeof WORK_ITEMS)[number] => Boolean(w));

  const posts = pillar.posts
    .map((s) => (POSTS[s] ? { slug: s, ...POSTS[s] } : null))
    .filter((p): p is { slug: string } & (typeof POSTS)[string] => Boolean(p));

  return (
    <Page schema={pillarSchema(pillar, crumbs)} active="Expertise">
      <PageHero
        eyebrow={pillar.eyebrow}
        lines={pillar.h1}
        lede={pillar.lede}
        crumbs={crumbs}
      >
        <ContactButton>{pillar.cta}</ContactButton>
        <Btn href="#approach" variant="ghost">
          How I approach it
        </Btn>
      </PageHero>

      {/* ── What it means ───────────────────────────────────────────
          Three cells over a 1px gap, which is the homepage's grid. They were
          three columns each hung under its own top rule, a device that appears
          nowhere on the homepage and reads as three orphaned paragraphs when
          one of them runs short. */}
      <Section id="what" labelledBy="what-title">
        <Shell>
          <Head label="What it means" id="what-title" lines={['What this', 'actually is.']} />
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-3">
            {pillar.what.map((para, i) => (
              <li key={para.slice(0, 24)} className="bg-[var(--bg)]">
                <Rise delay={i * 0.08} className="flex h-full flex-col p-6 sm:p-8">
                  <span aria-hidden="true" className={LABEL}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className={`m-0 mt-6 ${BODY}`}>{para}</p>
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── Problems solved ─────────────────────────────────────────
          The homepage's direct-answers table: an ordinal in the left margin,
          the symptom as the reader would say it, and what is underneath it
          across from that. */}
      <Section id="problems" labelledBy="problems-title">
        <Shell>
          <Head
            label="Problems solved"
            id="problems-title"
            lines={['What I get', 'called about.']}
            lede="The symptom as the person with the problem describes it, then what is usually underneath it."
          />
          <ul className="m-0 list-none border-t border-line p-0">
            {pillar.problems.map((p, i) => (
              <li key={p.symptom} className="border-b border-line">
                <Rise
                  delay={Math.min(i, 3) * 0.06}
                  className="grid items-baseline gap-x-8 gap-y-3 py-7 sm:gap-x-10 sm:py-9 md:grid-cols-[44px_minmax(0,0.9fr)_minmax(0,1.4fr)] lg:grid-cols-[52px_minmax(0,0.9fr)_minmax(0,1.4fr)] lg:py-12"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-accent-bright"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="m-0 max-w-[24ch] font-manrope text-[clamp(20px,2vw,27px)] font-semibold leading-[1.22] tracking-[-0.025em]">
                    {p.symptom}
                  </h3>
                  <p className={`m-0 max-w-[66ch] ${BODY}`}>{p.body}</p>
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── When you need it, and when you do not ──────────────────
          The two halves are deliberately the same size. Sizing the
          qualification smaller than the pitch is how a point of view
          quietly turns back into a sales page. */}
      <Section id="signals" labelledBy="signals-title">
        <Shell>
          <Head
            label="When it applies"
            id="signals-title"
            lines={['When a business', 'has reached this.']}
          />
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
            <Rise>
              <h3 className={LABEL}>Signals it is time</h3>
              <ul className="m-0 mt-6 list-none border-t border-line p-0">
                {pillar.signals.map((sig) => (
                  <li
                    key={sig}
                    className="flex gap-4 border-b border-line py-5 font-manrope text-[16px] font-light leading-[1.65] text-ink/60"
                  >
                    {/* A rule, not a bullet: the same mark the homepage uses
                        for the points inside a timeline entry. */}
                    <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-accent/60" />
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            </Rise>

            <Rise delay={0.12} className="flex flex-col">
              <h3 className={`${LABEL} text-accent-bright`}>And when it is the wrong call</h3>
              <div className="mt-6 border border-line bg-surface p-6 sm:p-8">
                <p className="m-0 font-manrope text-[clamp(19px,2vw,26px)] font-light leading-[1.35] tracking-[-0.025em] text-ink/85">
                  {pillar.wrong}
                </p>
              </div>
              <p className={`m-0 mt-6 max-w-[46ch] ${BODY}`}>
                Every one of the six pages under{' '}
                <InlineLink href="/expertise/">expertise</InlineLink> carries one of these. A
                consultant who recommends everything for everyone is a vendor with a wider
                catalogue.
              </p>
            </Rise>
          </div>
        </Shell>
      </Section>

      {/* ── Approach ──────────────────────────────────────────────── */}
      <Section id="approach" labelledBy="approach-title">
        <Shell>
          <Head label="Approach" id="approach-title" lines={['How I', 'work on it.']} />
          <ol className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2">
            {pillar.approach.map((step, i) => (
              <li key={step.num} className="bg-[var(--bg)]">
                <Rise
                  delay={Math.min(i, 3) * 0.07}
                  className="flex h-full flex-col p-6 sm:p-8 lg:p-10"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs font-medium leading-none tracking-[0.2em] text-accent-bright"
                  >
                    {step.num}
                  </span>
                  <h3 className="m-0 mt-6 max-w-[24ch] font-manrope text-[clamp(20px,2vw,28px)] font-semibold leading-[1.15] tracking-[-0.025em]">
                    {step.title}
                  </h3>
                  <p className={`m-0 mt-4 max-w-[52ch] ${BODY}`}>{step.body}</p>
                </Rise>
              </li>
            ))}
          </ol>

          <Rise delay={0.3} className="mt-10 border-t border-line pt-8">
            <h3 className={LABEL}>Stack</h3>
            <p className="m-0 mt-4 flex flex-wrap gap-2">
              {pillar.stack.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </p>
          </Rise>
        </Shell>
      </Section>

      {/* ── Related work ──────────────────────────────────────────── */}
      {cases.length ? (
        <Section id="cases" labelledBy="cases-title">
          <Shell>
            <Head
              label="Related work"
              id="cases-title"
              lines={['Where this', 'has been built.']}
              lede="The builds where this practice area shows up, with the decision inside each one."
            />
            <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {cases.map((w, i) => (
                <li key={w.id} className="flex">
                  <Rise
                    delay={Math.min(i, 3) * 0.07}
                    className="group relative flex w-full flex-col border border-ink/15 bg-surface transition-[transform,border-color] duration-300 hover:-translate-y-2 hover:border-accent/60 motion-reduce:hover:translate-y-0"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-ink/10 bg-[#111]">
                      <img
                        src={w.img}
                        alt={w.alt}
                        width={w.imgW}
                        height={w.imgH}
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:group-hover:scale-100"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className={`${LABEL} text-accent-bright`}>{w.category}</span>
                      <h3 className="m-0 mt-4 font-manrope text-[21px] font-semibold leading-[1.15] tracking-[-0.02em]">
                        {/* `#id` rather than the bare /work/ in the record:
                            every case on the Work page carries an anchor with
                            this same id, so the link lands on the case rather
                            than at the top of a page of six, and the site-wide
                            scroll offset keeps it clear of the header. */}
                        <a
                          href={`${w.href}#${w.id}`}
                          className="transition-colors duration-200 after:absolute after:inset-0 after:content-[''] group-hover:text-accent-bright"
                        >
                          {w.name}
                        </a>
                      </h3>
                      <p className="m-0 mt-4 font-manrope text-[15px] font-light leading-[1.65] text-ink/50">
                        {w.summary}
                      </p>
                      {w.outcome ? (
                        <p className="m-0 mt-auto pt-6 font-manrope text-[15px] font-semibold leading-[1.5] text-accent-bright">
                          {w.outcome}
                        </p>
                      ) : null}
                    </div>
                  </Rise>
                </li>
              ))}
            </ul>
            <Rise delay={0.3} className="mt-tail">
              <InlineLink href="/work/" lead>
                All selected work across Magento, Shopify and headless commerce
              </InlineLink>
            </Rise>
          </Shell>
        </Section>
      ) : null}

      {/* ── Related writing ───────────────────────────────────────── */}
      {posts.length ? (
        <Section id="reading" labelledBy="reading-title">
          <Shell>
            <Head label="Related writing" id="reading-title" lines={['The reasoning,', 'written out.']} />
            <ul className="m-0 list-none border-t border-line p-0">
              {posts.map((p, i) => (
                <li key={p.slug} className="border-b border-line">
                  <Rise delay={Math.min(i, 3) * 0.05}>
                    <Link
                      href={`/blog/${p.slug}/`}
                      className="group grid gap-x-10 gap-y-3 py-7 sm:py-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] lg:py-10"
                    >
                      <h3 className="m-0 max-w-[30ch] font-manrope text-[clamp(19px,1.9vw,26px)] font-semibold leading-[1.2] tracking-[-0.025em] transition-colors duration-200 group-hover:text-accent-bright">
                        {p.title}
                      </h3>
                      <p className="m-0 max-w-[52ch] font-manrope text-[15px] font-light leading-[1.65] text-ink/45">
                        {p.excerpt}
                      </p>
                      <p className={`${LABEL} self-center whitespace-nowrap`}>{p.readTime}</p>
                    </Link>
                  </Rise>
                </li>
              ))}
            </ul>
            <Rise delay={0.28} className="mt-tail">
              <InlineLink href="/blog/" lead>
                All writing on commerce architecture, performance and AI
              </InlineLink>
            </Rise>
          </Shell>
        </Section>
      ) : null}

      {/* ── Related expertise ─────────────────────────────────────── */}
      <Section id="related" labelledBy="related-title">
        <Shell>
          <Head
            label="Related expertise"
            id="related-title"
            lines={['What this', 'sits next to.']}
            lede="These overlap on purpose. A platform decision is an architecture question first, and an AI project is usually a process question first."
          />
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-3">
            {pillar.related.map((r, i) => (
              <li key={r.href} className="bg-[var(--bg)]">
                <Rise delay={i * 0.07} className="flex h-full flex-col p-6 sm:p-8">
                  <h3 className="m-0 font-manrope text-[19px] font-semibold leading-[1.25] tracking-[-0.02em]">
                    <InlineLink href={r.href} lead>
                      {r.label}
                    </InlineLink>
                  </h3>
                  {r.note ? (
                    <p className="m-0 mt-4 max-w-[40ch] font-manrope text-[15px] font-light leading-[1.65] text-ink/45">
                      {r.note}
                    </p>
                  ) : null}
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── Questions ─────────────────────────────────────────────── */}
      <Section id="questions" labelledBy="pillar-faq-title">
        <Shell>
          <Head label="Questions" id="pillar-faq-title" lines={['Straight', 'answers.']} />
          {/* Open text, not an accordion. These are the passages an AI answer
              would quote, and FAQPage markup has to correspond to text a
              visitor can actually see. lib/schema.ts builds that markup from
              this same array. */}
          <dl className="m-0 border-t border-line">
            {pillar.faqs.map((f, i) => (
              <div key={f.q} className="border-b border-line">
                <Rise
                  delay={Math.min(i, 3) * 0.05}
                  className="grid items-baseline gap-x-8 gap-y-3 py-7 sm:gap-x-10 sm:py-9 md:grid-cols-[44px_minmax(0,0.9fr)_minmax(0,1.4fr)] lg:grid-cols-[52px_minmax(0,0.9fr)_minmax(0,1.4fr)] lg:py-12"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-accent-bright"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <dt className="m-0 max-w-[24ch] font-manrope text-[clamp(20px,2vw,27px)] font-semibold leading-[1.22] tracking-[-0.025em]">
                    {f.q}
                  </dt>
                  <dd className={`m-0 max-w-[66ch] ${BODY}`}>{f.a}</dd>
                </Rise>
              </div>
            ))}
          </dl>
        </Shell>
      </Section>

      {/* The page used to close with its own call to action, which is now the
          footer's on every route. The pillar's own CTA is still in the hero,
          where it carries the discipline's wording rather than a generic one. */}
    </Page>
  );
}
