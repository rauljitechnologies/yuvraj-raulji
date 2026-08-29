import type { Metadata } from 'next';
import { TechnologyPage } from '../../components/technology/technology-page';
import { OG_IMAGE, OG_IMAGE_URL, SITE_URL } from '../../lib/site';
import { TECHNOLOGIES_BY_SLUG } from '../../lib/technology';

/**
 * /shopify/
 *
 * Moved here from /expertise/shopify/, which now redirects (vercel.json). The
 * two pages would otherwise have competed for the same query with near
 * identical copy, which is the duplication the technology brief rules out.
 */
const tech = TECHNOLOGIES_BY_SLUG.shopify;

export const metadata: Metadata = {
  title: tech.title,
  description: tech.description,
  keywords: [
    'Shopify',
    'Shopify Plus',
    'Shopify strategy',
    'Shopify integrations',
    'Shopify performance',
    'Shopify AI',
    'Shopify CRO',
    'Shopify headless',
  ],
  alternates: { canonical: `${SITE_URL}/shopify/` },
  openGraph: {
    title: tech.title,
    description: tech.description,
    url: `${SITE_URL}/shopify/`,
    siteName: 'Yuvraj Raulji',
    type: 'article',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: tech.title,
    description: tech.description,
    images: [OG_IMAGE_URL],
  },
};

export default function Shopify() {
  return <TechnologyPage tech={tech} />;
}
