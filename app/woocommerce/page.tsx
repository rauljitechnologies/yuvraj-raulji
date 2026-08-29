import type { Metadata } from 'next';
import { TechnologyPage } from '../../components/technology/technology-page';
import { OG_IMAGE, OG_IMAGE_URL, SITE_URL } from '../../lib/site';
import { TECHNOLOGIES_BY_SLUG } from '../../lib/technology';

/**
 * /woocommerce/
 *
 * New. No case study is claimed: none of the builds on the work record is a
 * WooCommerce build, so the relevant work section does not render and the
 * outcomes section says why.
 */
const tech = TECHNOLOGIES_BY_SLUG.woocommerce;

export const metadata: Metadata = {
  title: tech.title,
  description: tech.description,
  keywords: [
    'WooCommerce',
    'WooCommerce development',
    'WordPress commerce',
    'WooCommerce integrations',
    'WooCommerce performance',
    'WooCommerce SEO',
  ],
  alternates: { canonical: `${SITE_URL}/woocommerce/` },
  openGraph: {
    title: tech.title,
    description: tech.description,
    url: `${SITE_URL}/woocommerce/`,
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

export default function Woocommerce() {
  return <TechnologyPage tech={tech} />;
}
