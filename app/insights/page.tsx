import type { Metadata } from 'next';
import { BlogCta } from '../../components/insights/blog-cta';
import { BlogHero } from '../../components/insights/blog-hero';
import { BlogListing, type ListPost } from '../../components/insights/blog-listing';
import { ContactModal } from '../../components/contact-modal';
import { SiteEffects } from '../../components/site-effects';
import { SiteFooter } from '../../components/site-footer';
import { JsonLd } from '../../components/json-ld';
import { SiteHeader } from '../../components/site-header';
import { blogHubSchema, type Crumb } from '../../lib/schema';
import { POSTS } from '../../lib/posts';
import { OG_INSIGHTS, SITE_URL } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Insights on eCommerce Technology and AI | Yuvraj Raulji',
  description:
    'Practical writing on Magento 2, Shopify, headless commerce, infrastructure, analytics, SEO and AI, from hands-on e-commerce and digital transformation work.',
  alternates: { canonical: `${SITE_URL}/insights/` },
  openGraph: {
    title: 'Blog and Insights | Yuvraj Raulji',
    description: 'Expert insights on Magento 2, Shopify, headless commerce, SEO, AWS, analytics and AI.',
    url: `${SITE_URL}/insights/`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
    images: [OG_INSIGHTS],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog and Insights | Yuvraj Raulji',
    description: 'Expert insights on Magento 2, Shopify, headless commerce, SEO, AWS and AI by Yuvraj Raulji.',
    images: [OG_INSIGHTS],
  },
};

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Insights', href: '/insights/' },
];

export default function Blog() {
  const posts: ListPost[] = Object.entries(POSTS).map(([slug, p]) => ({ ...p, slug }));

  /*
   * Structured data comes from lib/schema.ts rather than from an object built
   * here. The inline graph this replaces referenced the Person node by @id for
   * both publisher and author without ever defining it, so /insights/ was the one
   * page on the site emitting a dangling entity reference and the only one with
   * no Person in its graph at all. The shared builder defines the node, adds the
   * CollectionPage every other hub carries, and carries publication dates.
   */
  return (
    <div className="reveal-blog" style={{ ['--noise-o' as string]: 0.06 }}>
      <JsonLd data={blogHubSchema(crumbs)} />
      <div className="noise" aria-hidden="true" />
      {/*
        The 1.5s full-screen preloader that used to sit here is gone.

        It painted an opaque #020202 overlay at z-1200 over the whole viewport
        and lifted at a fixed 1500ms timer, whatever the page had already
        finished rendering. On these nine routes, which are the site's main
        organic entry points, that made the word "YUVRAJ" inside the overlay the
        Largest Contentful Paint element and put a floor of ~1.5s under LCP on a
        page that otherwise had its hero painted well before that. It also ran
        again on every client-side navigation into the section.

        No other route on the site shipped one, so removing it is also what
        makes the section behave like the rest of the site rather than like the
        template it was ported from.
      */}
      <SiteHeader active="Insights" />
      <SiteEffects />

      <main id="main">
        <BlogHero />
        <BlogListing posts={posts} />
        <BlogCta />
      </main>

      <SiteFooter />
      <ContactModal />
    </div>
  );
}
