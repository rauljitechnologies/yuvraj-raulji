import type { Metadata } from 'next';
import { ServicePage } from '../../../components/platform/service-page';
import { findService, serviceHref, servicesFor } from '../../../lib/platform-services';
import { OG_IMAGE, OG_IMAGE_URL, SITE_URL } from '../../../lib/site';

/**
 * /magento/{service}/
 *
 * One route for all seven Magento service pages. The alternative was seven
 * near-identical page files, which is seven places for a heading level or a
 * canonical to drift, and thirty-five once Shopify, WooCommerce, WordPress and
 * headless commerce get the same treatment.
 *
 * `dynamicParams = false` so a slug outside `generateStaticParams` is a build
 * error rather than a page that renders empty. Under `output: 'export'` there
 * is no request-time fallback to catch it later.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return servicesFor('magento').map((s) => ({ service: s.slug }));
}

type Props = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params;
  const service = findService('magento', slug);
  if (!service) return {};

  const url = `${SITE_URL}${serviceHref('magento', slug)}`;
  return {
    title: service.title,
    description: service.description,
    /* The primary keyword first, then the supporting set. Every term here is a
       phrase the page actually answers in visible prose; none is repeated to
       hit a density. */
    keywords: [service.primaryKeyword, ...service.secondaryKeywords],
    alternates: { canonical: url },
    openGraph: {
      title: service.title,
      description: service.description,
      url,
      siteName: 'Yuvraj Raulji',
      type: 'article',
      locale: 'en_US',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.title,
      description: service.description,
      images: [OG_IMAGE_URL],
    },
  };
}

export default async function MagentoService({ params }: Props) {
  const { service: slug } = await params;
  /* Non-null: `dynamicParams = false` means only the slugs above ever render,
     and the registry is the same source `generateStaticParams` reads. */
  const service = findService('magento', slug)!;
  return <ServicePage service={service} />;
}
