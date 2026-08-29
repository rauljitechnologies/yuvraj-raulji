import type { Metadata } from 'next';
import { BlogCta } from '../../components/blog/blog-cta';
import { BlogHero } from '../../components/blog/blog-hero';
import { BlogListing, type ListPost } from '../../components/blog/blog-listing';
import { ContactModal } from '../../components/contact-modal';
import { Preloader } from '../../components/preloader';
import { SiteEffects } from '../../components/site-effects';
import { SiteFooter } from '../../components/site-footer';
import { JsonLd } from '../../components/json-ld';
import { SiteHeader } from '../../components/site-header';
import { POSTS } from '../../lib/posts';
import { OG_IMAGE, OG_IMAGE_URL, SITE_URL } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Insights on eCommerce Technology and AI | Yuvraj Raulji',
  description:
    'Practical writing on Magento 2, Shopify, headless commerce, infrastructure, analytics, SEO and AI, from hands-on e-commerce and digital transformation work.',
  alternates: { canonical: `${SITE_URL}/blog/` },
  openGraph: {
    title: 'Blog and Insights | Yuvraj Raulji',
    description: 'Expert insights on Magento 2, Shopify, headless commerce, SEO, AWS, analytics and AI.',
    url: `${SITE_URL}/blog/`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog and Insights | Yuvraj Raulji',
    description: 'Expert insights on Magento 2, Shopify, headless commerce, SEO, AWS and AI by Yuvraj Raulji.',
    images: [OG_IMAGE_URL],
  },
};

export default function Blog() {
  const posts: ListPost[] = Object.entries(POSTS).map(([slug, p]) => ({ ...p, slug }));

  /** The hub had no structured data at all: articles were described, the collection was not. */
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog/#blog`,
        url: `${SITE_URL}/blog/`,
        name: 'Insights on E-commerce Technology & AI',
        description:
          'Practical writing on Magento 2, Shopify, headless commerce, infrastructure, analytics, SEO and AI.',
        inLanguage: 'en-US',
        publisher: { '@id': `${SITE_URL}/#person` },
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          '@id': `${SITE_URL}/blog/${p.slug}/#article`,
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}/`,
          image: `${SITE_URL}${p.ogImg}`,
          author: { '@id': `${SITE_URL}/#person` },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE_URL}/blog/` },
        ],
      },
    ],
  };

  return (
    <div className="reveal-blog" style={{ ['--noise-o' as string]: 0.06 }}>
      <JsonLd data={ld} />
      <div className="noise" aria-hidden="true" />
      <Preloader tagline="Blog & Insights" />
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
