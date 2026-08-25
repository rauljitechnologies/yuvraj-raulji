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
   optional lede, and it repeats nine times below. */

function Head({
  num,
  label,
  id,
  lines,
  lede,
}: {
  num: string;
  label: string;
  id: string;
  lines: readonly string[];
  lede?: string;
}) {
  return (
    <>
      <Marker num={num} label={label} />
      <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
        <Lines as="h2" id={id} lines={lines} softFrom={1} />
        {lede ? (
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[54ch]">{lede}</p>
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
        <ContactButton>Discuss a project</ContactButton>
        <Btn href="#approach" variant="ghost">
          How I approach it
        </Btn>
      </PageHero>

      {/* ── What it means ─────────────────────────────────────────── */}
      <Section id="what" labelledBy="what-title">
        <Shell>
          <Head num="01" label="What it means" id="what-title" lines={['What this', 'actually is.']} />
          <div className="mt-grid grid gap-x-12 gap-y-block md:grid-cols-2 lg:grid-cols-3">
            {pillar.what.map((para, i) => (
              <Rise key={para.slice(0, 24)} delay={i * 0.08}>
                <p className="border-t border-[var(--rule)] pt-item text-[.98rem] leading-[1.72] text-ink-secondary">
                  {para}
                </p>
              </Rise>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ── Problems solved ───────────────────────────────────────── */}
      <Section id="problems" labelledBy="problems-title">
        <Shell>
          <Head
            num="02"
            label="Problems solved"
            id="problems-title"
            lines={['What I get', 'called about.']}
            lede="The symptom as the person with the problem describes it, then what is usually underneath it."
          />
          <ul className="mt-grid">
            {pillar.problems.map((p, i) => (
              <li
                key={p.symptom}
                className="border-t border-[var(--rule)] py-block last:border-b last:border-[var(--rule)]"
              >
                <Rise delay={Math.min(i, 3) * 0.06}>
                  <div className="grid gap-x-12 gap-y-item lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
                    <h3 className="yr-display yr-display--3 max-w-[22ch]">{p.symptom}</h3>
                    <p className="yr-note max-w-[62ch]">{p.body}</p>
                  </div>
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
            num="03"
            label="When it applies"
            id="signals-title"
            lines={['When a business', 'has reached this.']}
          />
          <div className="mt-grid grid gap-x-16 gap-y-grid lg:grid-cols-2">
            <Rise>
              <h3 className="yr-label">Signals it is time</h3>
              <ul className="mt-item">
                {pillar.signals.map((s) => (
                  <li
                    key={s}
                    className="flex gap-4 border-b border-[var(--rule)] py-item text-[.94rem] leading-[1.6] text-ink-secondary"
                  >
                    <span aria-hidden="true" className="mt-[.55em] h-1 w-1 flex-none rounded-full bg-accent" />
                    {s}
                  </li>
                ))}
              </ul>
            </Rise>

            <Rise delay={0.12}>
              <h3 className="yr-label text-accent-bright">And when it is the wrong call</h3>
              <div className="mt-item border-l border-accent/40 pl-6">
                <p className="text-[length:var(--hd-quote)] font-display uppercase leading-[1.06] tracking-[-.01em] text-ink">
                  {pillar.wrong}
                </p>
              </div>
              <p className="yr-note mt-block max-w-[46ch]">
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
          <Head num="04" label="Approach" id="approach-title" lines={['How I', 'work on it.']} />
          <ol className="mt-grid grid gap-x-12 gap-y-grid md:grid-cols-2">
            {pillar.approach.map((s, i) => (
              <li key={s.num}>
                <Rise delay={Math.min(i, 3) * 0.07}>
                  <div className="border-t border-[var(--rule)] pt-item">
                    <p aria-hidden="true" className="yr-marker__num text-[.68rem] font-semibold tracking-[.26em]">
                      {s.num}
                    </p>
                    <h3 className="yr-display yr-display--3 mt-tight max-w-[24ch]">{s.title}</h3>
                    <p className="yr-note mt-item max-w-[52ch]">{s.body}</p>
                  </div>
                </Rise>
              </li>
            ))}
          </ol>

          <Rise delay={0.3} className="mt-grid border-t border-[var(--rule)] pt-item">
            <h3 className="yr-label">Stack</h3>
            <p className="mt-tight flex flex-wrap gap-x-1.5 gap-y-2">
              {pillar.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
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
              num="05"
              label="Related work"
              id="cases-title"
              lines={['Where this', 'has been built.']}
              lede="The builds where this practice area shows up, with the decision inside each one."
            />
            <ul className="mt-grid grid gap-grid sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((w, i) => (
                <li key={w.id}>
                  <Rise delay={Math.min(i, 3) * 0.07}>
                    <a href={w.href} className="yr-card h-full">
                      <span className="yr-frame relative block aspect-[16/10] w-full">
                        <img
                          src={w.img}
                          alt={w.alt}
                          width={w.imgW}
                          height={w.imgH}
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </span>
                      <h3 className="yr-display yr-display--3 mt-item">{w.name}</h3>
                      <p className="yr-label mt-hair">{w.category}</p>
                      <p className="yr-note mt-item">{w.summary}</p>
                      {w.outcome ? (
                        <p className="mt-item text-[.86rem] font-semibold text-accent-bright">
                          {w.outcome}
                        </p>
                      ) : null}
                      <span className="sr-only"> (case study, opens in a new tab)</span>
                    </a>
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
            <Head
              num="06"
              label="Related writing"
              id="reading-title"
              lines={['The reasoning,', 'written out.']}
            />
            <ul className="mt-grid">
              {posts.map((p, i) => (
                <li
                  key={p.slug}
                  className="border-t border-[var(--rule)] last:border-b last:border-[var(--rule)]"
                >
                  <Rise delay={Math.min(i, 3) * 0.05}>
                    <Link
                      href={`/blog/${p.slug}/`}
                      className="group grid gap-x-12 gap-y-tight py-block lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto]"
                    >
                      <h3 className="yr-display yr-display--3 max-w-[28ch] transition-colors duration-200 group-hover:text-accent-bright">
                        {p.title}
                      </h3>
                      <p className="yr-note max-w-[52ch]">{p.excerpt}</p>
                      <p className="yr-label self-center whitespace-nowrap">{p.readTime}</p>
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
            num="07"
            label="Related expertise"
            id="related-title"
            lines={['What this', 'sits next to.']}
            lede="These overlap on purpose. A platform decision is an architecture question first, and an AI project is usually a process question first."
          />
          <ul className="mt-grid grid gap-grid md:grid-cols-3">
            {pillar.related.map((r, i) => (
              <li key={r.href}>
                <Rise delay={i * 0.07}>
                  <div className="border-t border-[var(--rule)] pt-item">
                    <h3 className="text-[1.02rem] leading-[1.45]">
                      <InlineLink href={r.href} lead>
                        {r.label}
                      </InlineLink>
                    </h3>
                    {r.note ? <p className="yr-note mt-tight max-w-[40ch]">{r.note}</p> : null}
                  </div>
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── Questions ─────────────────────────────────────────────── */}
      <Section id="questions" labelledBy="pillar-faq-title">
        <Shell>
          <Head
            num="08"
            label="Questions"
            id="pillar-faq-title"
            lines={['Straight', 'answers.']}
          />
          {/* Open text, not an accordion. These are the passages an AI answer
              would quote, and FAQPage markup has to correspond to text a
              visitor can actually see. lib/schema.ts builds that markup from
              this same array. */}
          <dl className="mt-grid">
            {pillar.faqs.map((f, i) => (
              <div
                key={f.q}
                className="border-t border-[var(--rule)] py-block last:border-b last:border-[var(--rule)]"
              >
                <Rise delay={Math.min(i, 3) * 0.05}>
                  <div className="grid gap-x-12 gap-y-item lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.4fr)]">
                    <dt>
                      <h3 className="yr-display yr-display--3 max-w-[24ch]">{f.q}</h3>
                    </dt>
                    <dd>
                      <p className="yr-note max-w-[62ch]">{f.a}</p>
                    </dd>
                  </div>
                </Rise>
              </div>
            ))}
          </dl>
        </Shell>
      </Section>

      {/* ── Close ─────────────────────────────────────────────────── */}
      <Section id="contact" labelledBy="pillar-cta-title" tall>
        <Shell>
          <Lines
            as="h2"
            id="pillar-cta-title"
            lines={["Let's discuss", 'what you are building.']}
            softFrom={1}
            className="max-w-[20ch]"
          />
          <Rise delay={0.2} className="mt-head">
            <p className="yr-lede max-w-[56ch]">
              Whether you are scaling an existing commerce platform, planning a migration, exploring
              headless architecture or looking at AI-driven transformation, the first conversation
              costs nothing and usually shortens the second one.
            </p>
          </Rise>
          <Rise delay={0.3} className="mt-block flex flex-wrap gap-3">
            <ContactButton>Discuss a project</ContactButton>
            <Btn href="/contact/" variant="ghost">
              Other ways to reach me
            </Btn>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
