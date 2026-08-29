import type { Metadata } from 'next';
import { TechnologyPage } from '../../components/technology/technology-page';
import { OG_IMAGE, OG_IMAGE_URL, SITE_URL } from '../../lib/site';
import { TECHNOLOGIES_BY_SLUG } from '../../lib/technology';

/**
 * /wordpress/
 *
 * New, and deliberately not a second WooCommerce page. This one is about
 * content platforms, performance and infrastructure, and it hands the
 * commerce question to /woocommerce/ rather than answering it twice.
 */
const tech = TECHNOLOGIES_BY_SLUG.wordpress;

export const metadata: Metadata = {
  title: tech.title,
  description: tech.description,
  keywords: [
    'WordPress',
    'WordPress commerce',
    'WordPress development',
    'content commerce',
    'WordPress performance',
    'WordPress integrations',
  ],
  alternates: { canonical: `${SITE_URL}/wordpress/` },
  openGraph: {
    title: tech.title,
    description: tech.description,
    url: `${SITE_URL}/wordpress/`,
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

export default function Wordpress() {
  return <TechnologyPage tech={tech} />;
}
