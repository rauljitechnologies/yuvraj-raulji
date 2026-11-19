/**
 * Article FAQs.
 *
 * ── Why this is a separate file ────────────────────────────────────────────
 *
 * lib/posts.ts is generated from the blog data and says so in its first line,
 * so hand-written prose does not belong in it: the next regeneration would
 * drop it. This is authored, keyed by the same slug, and read by the article
 * page when it exists.
 *
 * ── Why only one article has them ──────────────────────────────────────────
 *
 * The 19 Nov 2026 Search Console audit found that one piece,
 * magento2-seo-technical-audit, carries 61% of the site's impressions at an
 * average position of 26. It ranks for "magento seo audit", "magento website
 * audit" and "magento 2 technical audit" and takes no clicks from any of
 * them. Questions a searcher is actually asking, answered on the page, is the
 * cheapest thing that moves a page in that position.
 *
 * The rest of the articles get this when there is a reason, not to make the
 * set uniform. An FAQ written to fill a field is padding with markup on it.
 *
 * ── The rule these are written under ───────────────────────────────────────
 *
 * The answers are rendered as open text on the page, which is the only
 * condition the FAQPage markup is legitimate under. Nothing here states a
 * price, a turnaround or a result: /ecommerce-audit/ deliberately states no
 * price, and an FAQ is not the place to invent one.
 */

export interface ArticleFaq {
  q: string;
  a: string;
}

export const ARTICLE_FAQS: Record<string, readonly ArticleFaq[]> = {
  'magento2-seo-technical-audit': [
    {
      q: 'What does a Magento 2 SEO audit actually check?',
      a: 'Four things, in this order: whether the store can be crawled and indexed at all, whether the pages that are indexed send the right signals, whether they load well enough to keep the ranking they earn, and whether multi-store and international setups are telling search engines the truth about which page serves which audience. The order matters, because a title tag on a page that is not indexed changes nothing.',
    },
    {
      q: 'Why does Magento 2 need a different SEO audit from any other site?',
      a: 'Because most of what goes wrong is generated rather than written. Layered navigation multiplies one category into thousands of filtered URLs, the default sitemap and canonical settings disagree with each other on several of them, and store views duplicate the catalogue once per view. None of that is visible in the content: it is produced by the platform configuration, which is where the audit has to look.',
    },
    {
      q: 'Which Magento 2 SEO problems are the most common?',
      a: 'Filtered catalogue URLs being crawled and indexed at scale, canonical tags pointing at the wrong variant of a product, an XML sitemap that lists URLs the robots file blocks, missing or invalid Product and Breadcrumb structured data, and category pages whose largest element is an image the theme loads late. The first one is usually the expensive one, because it spends the crawl budget the rest of the catalogue needs.',
    },
    {
      q: 'Do I need an SEO extension for Magento 2?',
      a: 'Usually not for the problems in this guide. Sitemaps, canonicals, robots rules, meta templates and structured data are all platform configuration, and an extension that rewrites them adds a second opinion about the same settings. Extensions earn their place for bulk editing and for rules a merchandiser needs to change without a developer. Buying one to fix a crawl problem is paying for a symptom.',
    },
    {
      q: 'How is a technical SEO audit different from a site audit?',
      a: 'A site audit answers how the store is doing. A technical audit answers why, and it is only worth commissioning when you intend to act on it. This guide is the framework I use; what it cannot tell you is which of these is true on your store, which is what looking at the store is for.',
    },
  ],
};
