import type { Metadata } from 'next';
import { TechnologyPage } from '../../components/technology/technology-page';
import { OG_EXPERTISE, SITE_URL } from '../../lib/site';
import { TECHNOLOGIES_BY_SLUG } from '../../lib/technology';

/**
 * /digital-transformation/
 *
 * Moved here from /expertise/digital-transformation/, which now redirects.
 */
const tech = TECHNOLOGIES_BY_SLUG['digital-transformation'];

export const metadata: Metadata = {
  title: tech.title,
  description: tech.description,
  keywords: [
    'digital transformation',
    'technology strategy',
    'business automation',
    'digital systems',
    'process optimization',
    'technology modernization',
  ],
  alternates: { canonical: `${SITE_URL}/digital-transformation/` },
  openGraph: {
    title: tech.title,
    description: tech.description,
    url: `${SITE_URL}/digital-transformation/`,
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

export default function DigitalTransformation() {
  return <TechnologyPage tech={tech} />;
}
