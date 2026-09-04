import type { Metadata } from 'next';
import { findService, serviceHref, servicesFor } from './platform-services';
import { OG_IMAGE, OG_IMAGE_URL, SITE_URL } from './site';

/**
 * The shared half of a platform service route.
 *
 * Next needs `generateStaticParams`, `generateMetadata` and the default export
 * to be real exports of the route file, so the five route files cannot be
 * replaced by one. What they can do is stop repeating sixty lines of identical
 * metadata construction, which is five places for a canonical, a locale or an
 * og:type to drift apart.
 *
 * Each route file is then the platform name, three thin exports and a comment
 * about anything specific to that platform.
 */

export type ServiceRouteProps = { params: Promise<{ service: string }> };

/** Every service slug under one platform, for `generateStaticParams`. */
export function serviceParams(platform: string) {
  return servicesFor(platform).map((s) => ({ service: s.slug }));
}

/**
 * Page metadata for one service.
 *
 * `keywords` leads with the primary keyword and follows with the supporting
 * set, all of which are phrases the page answers in visible prose. None is
 * repeated to reach a density, and no page shares a primary keyword with
 * another: lib/platform-services.ts throws at build time if two ever do.
 */
export async function serviceMetadata(
  platform: string,
  { params }: ServiceRouteProps,
): Promise<Metadata> {
  const { service: slug } = await params;
  const service = findService(platform, slug);
  if (!service) return {};

  const url = `${SITE_URL}${serviceHref(platform, slug)}`;
  return {
    title: service.title,
    description: service.description,
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
