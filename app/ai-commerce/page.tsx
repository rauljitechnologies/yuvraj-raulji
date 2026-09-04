import type { Metadata } from 'next';
import { TechnologyPage } from '../../components/technology/technology-page';
import { OG_EXPERTISE, SITE_URL } from '../../lib/site';
import { TECHNOLOGIES_BY_SLUG } from '../../lib/technology';

/**
 * /ai-commerce/
 *
 * Moved here from /expertise/ai-commerce/, which now redirects. Written as a
 * position rather than a portfolio: the one measured figure on the page is
 * workflow automation and is labelled as such.
 */
const tech = TECHNOLOGIES_BY_SLUG['ai-commerce'];

export const metadata: Metadata = {
  title: tech.title,
  description: tech.description,
  keywords: [
    'AI commerce',
    'AI search',
    'AI personalization',
    'AI recommendations',
    'conversational commerce',
    'catalogue intelligence',
  ],
  alternates: { canonical: `${SITE_URL}/ai-commerce/` },
  openGraph: {
    title: tech.title,
    description: tech.description,
    url: `${SITE_URL}/ai-commerce/`,
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

export default function AiCommerce() {
  return <TechnologyPage tech={tech} />;
}
