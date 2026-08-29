import type { Metadata } from 'next';
import { TechnologyPage } from '../../components/technology/technology-page';
import { OG_IMAGE, OG_IMAGE_URL, SITE_URL } from '../../lib/site';
import { TECHNOLOGIES_BY_SLUG } from '../../lib/technology';

/**
 * /headless-commerce/
 *
 * Moved here from /expertise/headless-commerce/, which now redirects.
 */
const tech = TECHNOLOGIES_BY_SLUG['headless-commerce'];

export const metadata: Metadata = {
  title: tech.title,
  description: tech.description,
  keywords: [
    'headless commerce',
    'composable commerce',
    'commerce APIs',
    'GraphQL',
    'Next.js',
    'frontend architecture',
    'performance',
  ],
  alternates: { canonical: `${SITE_URL}/headless-commerce/` },
  openGraph: {
    title: tech.title,
    description: tech.description,
    url: `${SITE_URL}/headless-commerce/`,
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

export default function HeadlessCommerce() {
  return <TechnologyPage tech={tech} />;
}
