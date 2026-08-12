import type { MetadataRoute } from 'next';
import { POSTS } from '../lib/posts';
import { SITE_URL } from '../lib/site';

export const dynamic = 'force-static';

const BASE = SITE_URL;

/**
 * `lastModified` previously used `new Date()` for every entry, so all 24 URLs
 * claimed to have changed at build time — a freshness signal Google discounts,
 * and one that misrepresents articles which have not been touched in months.
 * Articles now report their own publication date; only the hub pages, whose
 * contents genuinely change when posts are added, use the build date.
 */
function postDate(date: string): Date {
  const t = Date.parse(date);
  return isNaN(t) ? new Date() : new Date(t);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();
  return [
    { url: BASE + '/', lastModified: buildDate, changeFrequency: 'weekly', priority: 1 },
    { url: BASE + '/about/', lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: BASE + '/blog/', lastModified: buildDate, changeFrequency: 'weekly', priority: 0.9 },
    ...Object.entries(POSTS).map(([slug, p]) => ({
      url: `${BASE}/blog/${slug}/`,
      lastModified: postDate(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
