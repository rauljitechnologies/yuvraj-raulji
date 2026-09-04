import type { Metadata } from 'next';
import { TechnologyPage } from '../../components/technology/technology-page';
import { OG_EXPERTISE, SITE_URL } from '../../lib/site';
import { TECHNOLOGIES_BY_SLUG } from '../../lib/technology';

/**
 * /ai-search/
 *
 * New. It covers both halves of the same shift: semantic search on the site,
 * and Generative Engine Optimization in front of it. There is no delivered AI
 * search engagement with a published measurement, and the page says so rather
 * than borrowing an adjacent number.
 */
const tech = TECHNOLOGIES_BY_SLUG['ai-search'];

export const metadata: Metadata = {
  title: tech.title,
  description: tech.description,
  keywords: [
    'AI search',
    'Generative Engine Optimization',
    'GEO',
    'conversational search',
    'product discovery',
    'search intent',
    'AI visibility',
    'semantic search',
  ],
  alternates: { canonical: `${SITE_URL}/ai-search/` },
  openGraph: {
    title: tech.title,
    description: tech.description,
    url: `${SITE_URL}/ai-search/`,
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

export default function AiSearch() {
  return <TechnologyPage tech={tech} />;
}
