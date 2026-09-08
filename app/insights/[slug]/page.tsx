import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleAside, ReadingProgress, TocList } from '../../../components/insights/article-aside';
import { Breadcrumbs, Page } from '../../../components/chrome/page';
import { Lines, Rise } from '../../../components/homepage/motion';
import { Btn, Marker, Section, Shell } from '../../../components/homepage/primitives';
import { getArticle } from '../../../lib/articles';
import { articleSchema, PERSON_JOB_TITLE, type Crumb } from '../../../lib/schema';
import { POSTS, postDateISO } from '../../../lib/posts';
import { SITE_URL } from '../../../lib/site';
import { TAGS } from '../../../lib/tags';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = POSTS[slug];
  const url = `${SITE_URL}/insights/${slug}/`;
  return {
    title: p.seoTitle ?? p.title,
    description: p.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: p.title,
      description: p.excerpt,
      url,
      siteName: 'Yuvraj Raulji',
      type: 'article',
      locale: 'en_US',
      publishedTime: postDateISO(p.date),
      authors: ['Yuvraj Raulji'],
      images: [{ url: p.ogImg, width: 1600, height: 900, alt: p.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      description: p.excerpt,
      images: [{ url: p.ogImg, alt: p.title }],
    },
  };
}

/*
  The trail. The middle crumb is named "Insights", which is what
  app/insights/page.tsx calls the same URL; this page previously called it
  "Blog & Insights", so the two BreadcrumbLists described /insights/ under two
  different names.
*/
function articleCrumbs(title: string, url: string): Crumb[] {
  return [
    { name: 'Home', href: '/' },
    { name: 'Insights', href: '/insights/' },
    { name: title, href: url.replace(SITE_URL, '') },
  ];
}

/** Same rule as the original: same-category first, topped up with any others. */
function relatedFor(slug: string) {
  const p = POSTS[slug];
  const entries = Object.entries(POSTS).filter(([s]) => s !== slug);
  const same = entries.filter(([, q]) => q.filter === p.filter).slice(0, 3);
  const extra = entries.filter(([s]) => !same.find(([t]) => t === s)).slice(0, 3 - same.length);
  return [...same, ...extra].map(([s, q]) => ({ ...q, slug: s }));
}

/**
 * A single article.
 *
 * ── What this replaces ─────────────────────────────────────────────────────
 *
 * The same rebuild as the hub. This page assembled SiteHeader, SiteFooter, a
 * preloader, an effects layer and its own arrangement of everything else,
 * against a `.reveal-article` scope whose opacity was cleared by an
 * IntersectionObserver living in that effects layer. It now renders through
 * `Page`, which is the wrapper every other interior route uses.
 *
 * Dropping the effects layer means dropping `.reveal` with it. That class sets
 * `opacity: 0` in the server-rendered HTML and relies on the observer to clear
 * it, so a `.reveal` left behind here would be an element that never appears.
 * Everything that carried one now uses `Rise`, which animates from Motion's own
 * `whileInView` and has no such dependency, and the article body carries no
 * animation at all: a 1,600-word body is the reason somebody opened the page
 * and it should not be waiting on anything.
 *
 * ── Kept ───────────────────────────────────────────────────────────────────
 *
 * The reading-progress bar, the table of contents in both its desktop and
 * mobile placements, the share controls, the tag list, the related articles
 * and the authored HTML body, which is rendered from content/articles/ at
 * build time exactly as before.
 */
export default async function Article({ params }: Props) {
  const { slug } = await params;
  const p = POSTS[slug];
  const url = `${SITE_URL}/insights/${slug}/`;
  const { html, toc } = getArticle(slug);
  const tags = TAGS[slug] ?? [p.cat];
  const related = relatedFor(slug);

  /*
    The graph comes from lib/schema.ts, not from a literal built here.

    The literal that stood here declared `publisher: { '@id': '.../#person' }`
    and emitted no Person node on the page, so the publisher reference resolved
    to nothing: a bare `@id` with no `@type` and no matching node is not an
    entity Google can read, and `publisher` is required on an Article. It also
    repeated the author inline with a `jobTitle` of "E-commerce & Digital
    Transformation Consultant", contradicting the single PERSON_JOB_TITLE every
    other page on the site states.

    `articleSchema` emits the full Person node and points both `author` and
    `publisher` at it by reference, which is what ties eight articles to the
    one entity the rest of the site defines.
  */
  const ld = articleSchema({ slug, crumbs: articleCrumbs(p.title, url), keywords: tags });

  return (
    <Page schema={ld} active="Insights">
      <ReadingProgress />

      {/* ── Head ──────────────────────────────────────────────────
          The interior hero's shape: breadcrumbs, the red hairline eyebrow, the
          H1, the lede. Set at the `--2` display size rather than `--1` because
          an article title runs to fifty or sixty characters where a page
          headline runs to twenty, and the page scale set on one of these fills
          a viewport on its own. */}
      <section
        aria-labelledby="article-title"
        className="yr-section yr-section--open !pt-[118px] md:!pt-[146px]"
      >
        <Shell>
          <Breadcrumbs crumbs={articleCrumbs(p.title, url)} />

          <Rise as="p" className="mb-item flex items-center gap-3.5">
            <span aria-hidden="true" className="h-px w-11 bg-accent" />
            <span className="font-mono text-[11px] font-medium uppercase leading-[1.6] tracking-[0.3em] text-ink/55">
              {p.cat}
            </span>
          </Rise>

          <Lines as="h1" id="article-title" size="2" lines={[p.title]} />

          <Rise delay={0.28} className="mt-block">
            <p className="yr-lede max-w-[58ch]">{p.excerpt}</p>
          </Rise>

          {/* The byline. A <time> with a machine-readable datetime, which the
              uppercase span it replaces was not, so the date a reader sees and
              the date in the Article markup are now the same value in the same
              format. */}
          <Rise delay={0.4} className="mt-head border-t border-ink/10 pt-6">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <p className="m-0">
                <span className="block font-manrope text-[15px] font-semibold leading-none">
                  Yuvraj Raulji
                </span>
                <span className="mt-2 block font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink-faint">
                  {PERSON_JOB_TITLE}
                </span>
              </p>
              <p className="m-0 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink-faint">
                <time dateTime={postDateISO(p.date)}>{p.date}</time>
                <span aria-hidden="true"> · </span>
                {p.readTime}
              </p>
              <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                {tags.map((tag) => (
                  <li key={tag}>
                    <span className="yr-tag">{tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Rise>
        </Shell>
      </section>

      {/* ── Cover ─────────────────────────────────────────────────
          Monochrome, like every other photograph on the site. It was the one
          full-colour image on any route, under a 110px drop shadow and a
          rounded corner that nothing else here has. */}
      <div className="yr-shell mb-[clamp(56px,7vw,90px)]">
        <div className="relative aspect-[16/9] overflow-hidden border border-ink/15 bg-[#111]">
          <img
            src={p.img}
            alt=""
            width={1600}
            height={900}
            fetchPriority="high"
            decoding="async"
            sizes="(max-width: 1280px) 94vw, 1200px"
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,.18)_0%,transparent_40%,rgba(5,5,5,.45)_100%)]"
          />
        </div>
      </div>

      {/* ── Body and aside ────────────────────────────────────────
          The cover carries `alt=""`: it is a decorative lead image directly
          under an H1 that already names the subject, and describing it would
          make a screen reader hear the title twice before the first paragraph. */}
      <div className="yr-shell mb-[clamp(80px,10vw,140px)]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-16">
          <div className="min-w-0">
            <TocList toc={toc} mobile />
            {/* Authored HTML from content/articles/, rendered at build time. */}
            <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
          <ArticleAside toc={toc} tags={tags} title={p.title} />
        </div>
      </div>

      {/* ── Related ───────────────────────────────────────────────
          The hub's card, at the hub's proportions. */}
      {related.length > 0 ? (
        <Section id="related" labelledBy="related-title">
          <Shell>
            <Marker label="Keep reading" />
            <div className="mb-10 lg:mb-14">
              <Lines as="h2" id="related-title" lines={['Related', 'writing.']} />
            </div>

            <ul className="grid list-none gap-4 sm:gap-6 md:grid-cols-3">
              {related.map((r, i) => (
                <li key={r.slug} className="flex">
                  <Rise
                    delay={i * 0.08}
                    className="group flex w-full flex-col border border-ink/15 bg-surface transition-[transform,border-color] duration-300 hover:-translate-y-2 hover:border-accent/60 motion-reduce:hover:translate-y-0"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-ink/10 bg-[#111]">
                      <img
                        src={r.img}
                        alt=""
                        width={1600}
                        height={900}
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 92vw, 30vw"
                        className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:group-hover:scale-100"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,.25)_0%,rgba(5,5,5,.82)_100%)]"
                      />
                      <span className="absolute bottom-5 left-5 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-accent-bright">
                        {r.cat}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="m-0 font-manrope text-[19px] font-semibold leading-[1.2] tracking-[-0.02em]">
                        <Link
                          href={`/insights/${r.slug}/`}
                          className="transition-colors duration-200 hover:text-accent-bright"
                        >
                          {r.title}
                        </Link>
                      </h3>
                      <p className="mt-auto pt-6 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink-faint">
                        {r.date} <span aria-hidden="true"> · </span> {r.readTime}
                      </p>
                    </div>
                  </Rise>
                </li>
              ))}
            </ul>
          </Shell>
        </Section>
      ) : null}

      {/* ── Closing ───────────────────────────────────────────────
          The same close the hub carries, for the same reason: the piece
          describes what usually goes wrong, and the next step is finding out
          what is wrong here. */}
      <Section id="next" labelledBy="next-title" tall>
        <Shell>
          <Marker label="What next" />
          <Lines
            as="h2"
            id="next-title"
            lines={['Got this problem', { text: 'on a live store?', accent: true }]}
          />
          <Rise delay={0.28} className="mt-block">
            <p className="yr-lede max-w-[54ch]">
              This is the general shape of it. What is actually happening on one particular store
              takes looking at that store, which is what the audit is for.
            </p>
          </Rise>
          <Rise delay={0.4} className="mt-block flex flex-wrap gap-3">
            <Btn href="/ecommerce-audit/">See what an audit covers</Btn>
            <Btn href="/insights/" variant="ghost">
              Read the rest
            </Btn>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
