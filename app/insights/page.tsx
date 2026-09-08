import type { Metadata } from 'next';
import Link from 'next/link';
import { Page, PageHero } from '../../components/chrome/page';
import { WritingList } from '../../components/insights/writing-list';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, Marker, Section, Shell } from '../../components/homepage/primitives';
import { ALL_WRITING } from '../../lib/brand';
import { POSTS } from '../../lib/posts';
import { blogHubSchema, type Crumb } from '../../lib/schema';
import { OG_INSIGHTS, SITE_URL } from '../../lib/site';

const TITLE = 'Insights on eCommerce Technology and AI | Yuvraj Raulji';
const DESCRIPTION =
  'Practical writing on Magento 2, Shopify, headless commerce, infrastructure, analytics, SEO and AI, from hands-on e-commerce and digital transformation work.';

/*
 * One title and one description, spread into all three places.
 *
 * The page previously carried "Insights on eCommerce Technology and AI" in the
 * <title> and "Blog and Insights" in og:title and twitter:title, plus a third
 * shorter description in the Twitter card. Three names for one page is the
 * same entity-resolution problem the homepage was fixed for, and the share
 * card was advertising a page title that appears nowhere on the site.
 */
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/insights/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/insights/`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
    images: [OG_INSIGHTS],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [OG_INSIGHTS] },
};

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Insights', href: '/insights/' },
];

/**
 * The writing hub.
 *
 * ── What this replaces ─────────────────────────────────────────────────────
 *
 * This page used to assemble its own site: SiteHeader and SiteFooter rather
 * than the nav and footer every other route renders, a 1.5s preloader, an
 * effects layer, a full-viewport poster hero set in uppercase display type, a
 * ticker, and a listing built from a sticky filter bar plus a five-slide
 * carousel plus a grid of the leftovers. The docblock on
 * components/chrome/page.tsx already named this page and /about/ as the two
 * that disagreed with the rest of the site about all of it. /about/ was moved
 * across and this one was not.
 *
 * It now renders through `Page`, so the nav, the footer, the enquiry modal,
 * the `.yr-page` token scope and the `#main` skip target are the same objects
 * they are on every other interior route, and the type is the site's
 * mixed-case Manrope scale rather than the poster face.
 *
 * ── What was kept ──────────────────────────────────────────────────────────
 *
 * The featured article, because the newest piece earning the top of the page
 * is an editorial decision rather than a decorative one. It is a section with
 * a heading now instead of a full-bleed card, and it comes off the front of
 * ALL_WRITING rather than a hardcoded slug, so it cannot go stale the way the
 * old featured card had.
 *
 * ── What went ──────────────────────────────────────────────────────────────
 *
 * The counters. "8 Articles / 9+ Years Exp. / 5 Topics" was two facts about
 * the archive and one about the author, set at display size directly above the
 * archive itself; the only count worth stating is the one the filter toolbar
 * reports, and that one is live rather than typed by hand.
 *
 * The carousel. Five of the eight articles were reachable only by operating an
 * arrow or a dot, on a page whose entire job is getting somebody into an
 * article.
 */
export default function Insights() {
  const [featured] = ALL_WRITING;
  const post = POSTS[featured.slug];

  return (
    <Page schema={blogHubSchema(crumbs)} active="Insights">
      <PageHero
        eyebrow="Writing"
        lines={['Commerce and AI,', 'written for the people', 'making the decision.']}
        lede="Long-form technical writing on Magento 2, Shopify, headless commerce, AWS, analytics and AI. Written to be useful to somebody who has the problem, which is a harder brief than written to rank."
        crumbs={crumbs}
      >
        <Btn href="#archive">Read the archive</Btn>
        <Btn href="/ecommerce-audit/" variant="ghost">
          Get this done on your store
        </Btn>
      </PageHero>

      {/* ── The latest piece ──────────────────────────────────────
          A two-column band rather than a card: the cover on one side, the
          record on the other. It is the only place on the page a cover runs at
          this size, which is what makes it read as featured without a badge
          having to say so. */}
      <Section id="latest" labelledBy="latest-title">
        <Shell>
          <Marker label="Latest" />
          <div className="mb-10 lg:mb-14">
            <Lines as="h2" id="latest-title" lines={['The most recent', 'thing I wrote.']} />
          </div>

          <Rise className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
            {/* aria-hidden and out of the tab order: the heading beside it is
                the same link to the same article, and a screen reader hearing
                the destination twice is noise, not redundancy. */}
            <Link
              href={`/insights/${featured.slug}/`}
              aria-hidden="true"
              tabIndex={-1}
              className="group relative block aspect-[16/10] overflow-hidden border border-ink/15 bg-[#111]"
            >
              <img
                src={post.img}
                alt=""
                width={1600}
                height={900}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:group-hover:scale-100"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,.15)_0%,rgba(5,5,5,.55)_100%)]"
              />
            </Link>

            <div>
              <p className="yr-label yr-label--accent m-0">{featured.category}</p>
              {/* h3, not h2: the section's own "The most recent thing I wrote."
                  is the h2 and this sits under it. */}
              <h3 className="m-0 mt-item font-manrope text-[clamp(26px,3.2vw,40px)] font-semibold leading-[1.1] tracking-[-0.03em]">
                <Link
                  href={`/insights/${featured.slug}/`}
                  className="transition-colors duration-200 hover:text-accent-bright"
                >
                  {featured.title}
                </Link>
              </h3>
              <p className="mt-block max-w-[52ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                {featured.summary}
              </p>
              <p className="mt-block font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink-faint">
                {featured.date} <span aria-hidden="true"> · </span> {featured.readTime}
              </p>
            </div>
          </Rise>
        </Shell>
      </Section>

      {/* ── The archive ───────────────────────────────────────────
          Every article, the featured one included. Dropping it from the grid
          would mean a reader who filters to its subject cannot find the piece
          they just read about, and the count would disagree with the archive's
          real size. */}
      <Section id="archive" labelledBy="archive-title">
        <Shell>
          <Marker label="Archive" />
          <div className="mb-10 flex flex-wrap items-end justify-between gap-x-16 gap-y-8 lg:mb-14">
            <Lines as="h2" id="archive-title" lines={['Everything,', 'by subject.']} />
            <Rise delay={0.18} className="max-w-[420px]">
              <p className="m-0 font-manrope text-[15px] font-light leading-[1.7] text-ink/55">
                {ALL_WRITING.length} pieces, newest first. The filters are the subjects that have
                writing behind them, so none of them returns an empty page.
              </p>
            </Rise>
          </div>
          <WritingList />
        </Shell>
      </Section>

      {/* ── Closing ───────────────────────────────────────────────
          The interior pages end by naming the next step. This one used to end
          on a newsletter signup, and there is no newsletter. */}
      <Section id="next" labelledBy="next-title" tall>
        <Shell>
          <Marker label="What next" />
          <Lines
            as="h2"
            id="next-title"
            lines={['Reading about it is', { text: 'not the same as knowing.', accent: true }]}
          />
          <Rise delay={0.28} className="mt-block">
            <p className="yr-lede max-w-[54ch]">
              These describe what usually goes wrong. Finding out what is actually wrong on one
              particular store takes looking at it, which is what the audit is.
            </p>
          </Rise>
          <Rise delay={0.4} className="mt-block flex flex-wrap gap-3">
            <Btn href="/ecommerce-audit/">See what an audit covers</Btn>
            <Btn href="/contact/" variant="ghost">
              Describe the problem
            </Btn>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
