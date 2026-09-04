import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleAside, ReadingProgress, TocList } from '../../../components/insights/article-aside';
import { ContactModal } from '../../../components/contact-modal';
import { JsonLd } from '../../../components/json-ld';
import { Preloader } from '../../../components/preloader';
import { SiteEffects } from '../../../components/site-effects';
import { SiteFooter } from '../../../components/site-footer';
import { SiteHeader } from '../../../components/site-header';
import { getArticle } from '../../../lib/articles';
import { articleSchema, type Crumb } from '../../../lib/schema';
import { POSTS, postDateISO } from '../../../lib/posts';
import { CONTACT, SITE_URL } from '../../../lib/site';
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
    twitter: { card: 'summary_large_image', title: p.title, description: p.excerpt, images: [p.ogImg] },
  };
}

/*
  The trail. The middle crumb is named "Insights", which is what app/insights/page.tsx
  calls the same URL; this page previously called it "Blog & Insights", so the two
  BreadcrumbLists described /insights/ under two different names.
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
    <div className="reveal-article">
      <JsonLd data={ld} />
      <div className="noise" aria-hidden="true" />
      <Preloader tagline="Blog & Insights" />
      <SiteHeader active="Insights" />
      <ReadingProgress />
      <SiteEffects />

      <main id="main">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-bg" style={{ padding: 'clamp(120px,16vh,170px) 0 clamp(40px,5vw,60px)' }}>
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 75% at -5% 30%,rgba(229, 9, 32,.16) 0%,transparent 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 45% 55% at 105% 85%,rgba(140,8,22,.12) 0%,transparent 100%)' }} />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.05,
                backgroundImage:
                  'linear-gradient(rgba(229, 9, 32,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(229, 9, 32,.25) 1px,transparent 1px)',
                backgroundSize: '72px 72px',
              }}
            />
            <div
              className="absolute select-none hidden md:block font-display"
              style={{
                right: '-1%',
                top: '6%',
                fontSize: 'clamp(5rem,13vw,11rem)',
                lineHeight: 1,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(229, 9, 32,.07)',
                letterSpacing: '.02em',
                textTransform: 'uppercase',
              }}
            >
              {p.cat}
            </div>
            <div className="absolute left-0 top-0 bottom-0 hidden xl:flex flex-col items-center justify-center gap-4 pl-[18px]">
              <span
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: '.55rem',
                  fontWeight: 700,
                  letterSpacing: '.32em',
                  color: 'rgba(245, 245, 242,.18)',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Blog &amp; Insights · Yuvraj Raulji
              </span>
              <span style={{ width: 1, height: 56, background: 'linear-gradient(transparent,rgba(229, 9, 32,.50),transparent)' }} />
            </div>
          </div>

          <div className="relative z-[2] max-w-shell mx-auto px-6 md:px-10 xl:px-16">
            <nav className="flex items-center flex-wrap gap-3 text-[.62rem] font-bold tracking-[.18em] uppercase text-[rgba(245,245,242,.34)] mb-10 reveal">
              <Link href="/" className="hover:text-rv transition-colors">
                Home
              </Link>
              <span style={{ width: 14, height: 1, background: 'rgba(229, 9, 32,.45)' }} />
              <Link href="/insights" className="hover:text-rv transition-colors">
                Blog
              </Link>
              <span style={{ width: 14, height: 1, background: 'rgba(229, 9, 32,.45)' }} />
              <span className="text-rv">{p.cat}</span>
            </nav>

            <div style={{ maxWidth: 920 }}>
              <div className="flex items-center flex-wrap gap-4 mb-7 reveal">
                <span
                  className="inline-flex items-center h-[28px] px-4 rounded-full bg-rv text-white text-[.60rem] font-bold tracking-[.16em] uppercase"
                  style={{ boxShadow: '0 6px 20px rgba(240, 38, 60,.40)' }}
                >
                  {p.cat}
                </span>
                <span className="text-[.64rem] font-bold tracking-[.22em] uppercase text-[rgba(245,245,242,.38)]">{p.date}</span>
                <span className="w-1 h-1 rounded-full bg-[rgba(229,9,32,.55)]" />
                <span className="text-[.64rem] font-bold tracking-[.22em] uppercase text-[rgba(245,245,242,.38)]">{p.readTime}</span>
              </div>

              <h1 className="font-display uppercase reveal" style={{ fontSize: 'clamp(2.6rem,6.5vw,5.6rem)', lineHeight: 0.92, letterSpacing: '.015em', marginBottom: 26 }}>
                {p.title}
              </h1>

              <p className="reveal" style={{ fontSize: 'clamp(1rem,1.4vw,1.16rem)', lineHeight: 1.85, color: 'rgba(245, 245, 242,.55)', maxWidth: 680, marginBottom: 36 }}>
                {p.excerpt}
              </p>

              <div className="flex items-center flex-wrap gap-x-8 gap-y-4 reveal" style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 24 }}>
                <div className="flex items-center gap-[12px]">
                  <div
                    className="font-display"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      border: '1px solid rgba(229, 9, 32,.35)',
                      background: 'rgba(229, 9, 32,.08)',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '.92rem',
                      color: '#f0263c',
                      boxShadow: '0 0 24px rgba(229, 9, 32,.14)',
                    }}
                  >
                    YR
                  </div>
                  <div>
                    <div style={{ fontSize: '.80rem', fontWeight: 700, color: 'rgba(245, 245, 242,.85)' }}>Yuvraj Raulji</div>
                    <div style={{ fontSize: '.60rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(245, 245, 242,.36)' }}>
                      Full Stack E-commerce &amp; AI Consultant
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block" style={{ width: 1, height: 30, background: 'rgba(255,255,255,.09)' }} />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center h-[24px] px-3 rounded-full text-[.58rem] font-bold tracking-[.12em] uppercase"
                      style={{ border: '1px solid rgba(229, 9, 32,.22)', background: 'rgba(229, 9, 32,.06)', color: 'rgba(245, 245, 242,.55)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured image ── */}
        <div className="max-w-shell mx-auto px-6 md:px-10" style={{ marginBottom: 'clamp(56px,7vw,90px)' }}>
          <div className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[400px] md:h-[560px]" style={{ border: '1px solid rgba(255,255,255,.09)', boxShadow: '0 50px 110px rgba(0,0,0,.60)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.img}
              alt={p.title}
              width={1600}
              height={900}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ animation: 'imgIn 1.5s cubic-bezier(.19,1,.22,1) both .2s' }}
            />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg,rgba(6,6,6,.28) 0%,transparent 35%,rgba(6,6,6,.55) 100%)' }} />
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(229, 9, 32,.16)' }} />
          </div>
        </div>

        {/* ── Body + sidebar ── */}
        <div className="max-w-shell mx-auto px-6 md:px-10" style={{ marginBottom: 'clamp(80px,10vw,140px)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-12 xl:gap-16 items-start">
            <div className="min-w-0">
              <TocList toc={toc} mobile />
              {/* Article body is authored HTML from content/articles/, rendered at build time. */}
              <article className="prose reveal" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
            <ArticleAside toc={toc} tags={tags} title={p.title} />
          </div>
        </div>

        {/* ── Related ── */}
        {related.length > 0 && (
          <section className="relative overflow-hidden bg-bg2 border-t border-[rgba(255,255,255,.07)]" style={{ padding: 'clamp(72px,9vw,120px) 0' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 92% 8%,rgba(229, 9, 32,.08),transparent)' }} />
            <div className="relative max-w-shell mx-auto px-6 md:px-10">
              <div className="flex items-center gap-4 mb-12">
                <span style={{ width: 2, height: 30, background: 'linear-gradient(180deg,#f0263c,rgba(229, 9, 32,.15))', borderRadius: 2, flexShrink: 0 }} />
                <div>
                  <p className="text-[.62rem] font-bold tracking-[.30em] uppercase text-[rgba(229,9,32,.60)] mb-1">Keep Reading</p>
                  <h2 className="font-display uppercase tracking-[.02em] leading-[.94]" style={{ fontSize: 'clamp(2rem,4vw,3.4rem)' }}>
                    Related Articles
                  </h2>
                </div>
                <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg,rgba(229, 9, 32,.16),transparent)' }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/insights/${r.slug}`}
                    className="group block rounded-2xl overflow-hidden border border-[rgba(255,255,255,.07)] bg-bg transition-all duration-500 hover:border-[rgba(229,9,32,.30)] hover:-translate-y-2 hover:shadow-[0_40px_90px_rgba(0,0,0,.65)] touch-manipulation reveal"
                  >
                    <div className="relative overflow-hidden" style={{ height: 190 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={r.img}
                        alt={r.title}
                        width={1600}
                        height={900}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,transparent 45%,rgba(6,6,6,.55) 100%)' }} />
                      <span
                        className="absolute top-4 left-4 inline-flex items-center h-[24px] px-3 rounded-full bg-rv text-white text-[.56rem] font-bold tracking-[.14em] uppercase"
                        style={{ boxShadow: '0 5px 16px rgba(240, 38, 60,.40)' }}
                      >
                        {r.cat}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display uppercase tracking-[.02em] leading-[1.04] mb-3 transition-colors duration-200 group-hover:text-rv" style={{ fontSize: 'clamp(1.15rem,1.8vw,1.5rem)' }}>
                        {r.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-[.64rem] font-semibold tracking-[.12em] uppercase text-[rgba(245,245,242,.36)]">{r.date}</p>
                        <span className="inline-flex items-center gap-1 text-[.62rem] font-bold tracking-[.14em] uppercase text-rv transition-all duration-300 group-hover:gap-[7px]">
                          Read <span>→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Bottom CTA ── */}
        <section className="relative overflow-hidden bg-bg" style={{ padding: 'clamp(80px,10vw,130px) 0' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 50% 100%,rgba(229, 9, 32,.10),transparent)' }} />
          <div className="relative max-w-prose mx-auto px-6 md:px-10 text-center reveal">
            <p className="text-[.68rem] font-semibold tracking-[.22em] uppercase text-rv mb-4">Work With Yuvraj</p>
            <h2 className="font-display uppercase tracking-[.03em] leading-[.92] mb-6" style={{ fontSize: 'clamp(2.4rem,6vw,5rem)' }}>
              Ready To Grow
              <br />
              Your Business?
            </h2>
            <p className="text-[rgba(245,245,242,.60)] leading-[1.74] mb-8 max-w-[500px] mx-auto">
              From Magento 2 builds and SEO audits to AWS server setup and AI automation. Let&rsquo;s turn your digital presence into a growth engine.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${CONTACT.email}?subject=Project+Inquiry`}
                className="inline-flex items-center gap-2 h-[52px] px-7 rounded bg-red text-white border border-red text-[.76rem] font-bold tracking-[.10em] uppercase transition-all hover:bg-rv hover:border-rv hover:shadow-[0_16px_48px_rgba(229,9,32,.32)] hover:-translate-y-[2px] active:scale-[.95] after:content-['→']"
              >
                Book Consultation
              </a>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 h-[52px] px-7 rounded bg-transparent border border-[rgba(255,255,255,.22)] text-[#f5f5f2] text-[.76rem] font-bold tracking-[.10em] uppercase transition-all hover:border-[rgba(229,9,32,.32)] hover:-translate-y-[2px] active:scale-[.95] after:content-['→']"
              >
                More Articles
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ContactModal />
    </div>
  );
}
