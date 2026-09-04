import type { Metadata } from 'next';
import { TechnologyPage } from '../../components/technology/technology-page';
import { OG_EXPERTISE, SITE_URL } from '../../lib/site';
import { TECHNOLOGIES_BY_SLUG } from '../../lib/technology';

/**
 * /mixpanel/
 *
 * Tier 2, and deliberately a single page. The brief originally carried four
 * /expertise/mixpanel-*\/ pages alongside this one, which is five URLs for one
 * product and four more than the same brief allows WebEngage and MoEngage.
 * Approved as one root page on 4 Sep 2026, so consulting, implementation,
 * audit and tracking design are sections here rather than separate URLs.
 */
const tech = TECHNOLOGIES_BY_SLUG.mixpanel;

export const metadata: Metadata = {
  title: tech.title,
  description: tech.description,
  keywords: [
    'Mixpanel consultant',
    'Mixpanel implementation',
    'Mixpanel tracking plan',
    'Mixpanel audit',
    'product analytics consultant',
    'event tracking',
  ],
  alternates: { canonical: `${SITE_URL}/mixpanel/` },
  openGraph: {
    title: tech.title,
    description: tech.description,
    url: `${SITE_URL}/mixpanel/`,
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

export default function Mixpanel() {
  return <TechnologyPage tech={tech} />;
}
