import type { Metadata } from 'next';
import { BlogCta } from '../../components/blog/blog-cta';
import { BlogHero } from '../../components/blog/blog-hero';
import { BlogListing, type ListPost } from '../../components/blog/blog-listing';
import { ContactModal } from '../../components/contact-modal';
import { Preloader } from '../../components/preloader';
import { SiteEffects } from '../../components/site-effects';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { POSTS } from '../../lib/posts';
import { SITE_URL } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Blog & Insights — Yuvraj Raulji | Magento 2, Shopify, SEO, AWS & E-Commerce',
  description:
    'Expert insights on Magento 2, Shopify, headless commerce, SEO, AWS infrastructure, analytics and AI by Yuvraj Raulji. 9+ years of hands-on e-commerce and digital transformation experience.',
  alternates: { canonical: `${SITE_URL}/blog/` },
  openGraph: {
    title: 'Blog & Insights — Yuvraj Raulji | Magento 2, Shopify, SEO & AWS',
    description: 'Expert insights on Magento 2, Shopify, headless commerce, SEO, AWS, analytics and AI.',
    url: `${SITE_URL}/blog/`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Insights — Yuvraj Raulji',
    description: 'Expert insights on Magento 2, Shopify, headless commerce, SEO, AWS and AI by Yuvraj Raulji.',
  },
};

export default function Blog() {
  const posts: ListPost[] = Object.entries(POSTS).map(([slug, p]) => ({ ...p, slug }));

  return (
    <div className="reveal-blog" style={{ ['--noise-o' as string]: 0.06 }}>
      <div className="noise" aria-hidden="true" />
      <Preloader tagline="Blog & Insights" />
      <SiteHeader active="Blog" />
      <SiteEffects />

      <main>
        <BlogHero />
        <BlogListing posts={posts} />
        <BlogCta />
      </main>

      <SiteFooter />
      <ContactModal />
    </div>
  );
}
