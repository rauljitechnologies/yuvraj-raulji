import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/site';

export const dynamic = 'force-static';

/**
 * `/404/` and `/_not-found/` are artifacts of the static export: `trailingSlash`
 * turns Next's own not-found page into two real files that a host serves at 200,
 * so both are crawlable soft 404s carrying "404: This page could not be found."
 * and no canonical. Nothing links to them, and a static export gives no way to
 * put `noindex` on Next's built-in not-found page, so they are excluded here.
 * The 404 a visitor actually reaches is `/404.html`, served with a 404 status,
 * and it is not covered by either rule.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/404/', '/_not-found/'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
