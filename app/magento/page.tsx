import type { Metadata } from 'next';
import { TechnologyPage } from '../../components/technology/technology-page';
import { OG_IMAGE, OG_IMAGE_URL, SITE_URL } from '../../lib/site';
import { TECHNOLOGIES_BY_SLUG } from '../../lib/technology';

/**
 * /magento/
 *
 * Moved here from /expertise/magento-2/, which now redirects. The slug is
 * /magento/ rather than /magento-2/ because that is the query people search.
 */
const tech = TECHNOLOGIES_BY_SLUG.magento;

export const metadata: Metadata = {
  title: tech.title,
  description: tech.description,
  keywords: [
    'Magento',
    'Magento 2',
    'Adobe Commerce',
    'enterprise commerce',
    'Magento performance',
    'Magento integrations',
    'Magento AI',
    'Magento headless',
  ],
  alternates: { canonical: `${SITE_URL}/magento/` },
  openGraph: {
    title: tech.title,
    description: tech.description,
    url: `${SITE_URL}/magento/`,
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

export default function Magento() {
  return <TechnologyPage tech={tech} />;
}
