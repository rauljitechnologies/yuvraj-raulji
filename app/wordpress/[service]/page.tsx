import type { Metadata } from 'next';
import { ServicePage } from '../../../components/platform/service-page';
import { serviceMetadata, serviceParams, type ServiceRouteProps } from '../../../lib/platform-route';
import { findService } from '../../../lib/platform-services';

/**
 * /wordpress/{service}/
 *
 * One route for every WordPress service page. The shared metadata and params
 * live in lib/platform-route.ts so the five platform routes cannot drift apart
 * on a canonical or an og:type.
 *
 * `dynamicParams = false` so a slug outside `generateStaticParams` is a build
 * error rather than a page that renders empty. Under `output: 'export'` there
 * is no request-time fallback to catch it later.
 */

const PLATFORM = 'wordpress';

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceParams(PLATFORM);
}

export function generateMetadata(props: ServiceRouteProps): Promise<Metadata> {
  return serviceMetadata(PLATFORM, props);
}

export default async function WordPressService({ params }: ServiceRouteProps) {
  const { service: slug } = await params;
  /* Non-null: `dynamicParams = false` means only the slugs above ever render,
     and the registry is the same source `generateStaticParams` reads. */
  const service = findService(PLATFORM, slug)!;
  return <ServicePage service={service} />;
}
