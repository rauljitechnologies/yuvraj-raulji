import type { Metadata } from 'next';
import { TechnologyPage } from '../../components/technology/technology-page';
import { OG_EXPERTISE, SITE_URL } from '../../lib/site';
import { TECHNOLOGIES_BY_SLUG } from '../../lib/technology';

/**
 * /nextjs/
 *
 * Tier 1, and one page. The brief bans /nextjs/consulting/,
 * /nextjs/development/ and /nextjs/migration/, which is the right call: all
 * three would compete with each other, and the delivery work they describe is
 * already covered by the four headless commerce services.
 *
 * The page owns the framework as an entity. /headless-commerce/ owns the
 * decision to decouple at all, and this page states that boundary rather than
 * re-arguing it.
 */
const tech = TECHNOLOGIES_BY_SLUG.nextjs;

export const metadata: Metadata = {
  title: tech.title,
  description: tech.description,
  keywords: [
    'Next.js consultant',
    'Next.js developer',
    'Next.js commerce storefront',
    'headless storefront Next.js',
    'React commerce',
    'Core Web Vitals Next.js',
  ],
  alternates: { canonical: `${SITE_URL}/nextjs/` },
  openGraph: {
    title: tech.title,
    description: tech.description,
    url: `${SITE_URL}/nextjs/`,
    siteName: 'Yuvraj Raulji',
    type: 'article',
    locale: 'en_US',
    images: [OG_EXPERTISE],
  },
  twitter: {
    card: 'summary_large_image',
    title: tech.title,
    description: tech.description,
    images: [OG_EXPERTISE.url],
  },
};

export default function NextJs() {
  return <TechnologyPage tech={tech} />;
}
