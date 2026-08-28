import type { MetadataRoute } from 'next';
import { PILLARS, pillarHref } from '../lib/expertise';
import { POSTS } from '../lib/posts';
import { SITE_URL } from '../lib/site';

export const dynamic = 'force-static';

const BASE = SITE_URL;

/**
 * `lastModified` previously used `new Date()` for every entry, so every URL
 * claimed to have changed at build time — a freshness signal Google discounts,
 * and one that misrepresents articles which have not been touched in months.
 * Articles now report their own publication date; only the hub pages, whose
 * contents genuinely change when posts are added, use the build date.
 *
 * Six routes were missing entirely and are now listed: /work/, /experience/,
 * /expertise/ and the six pillar pages under it. They were real, rendered,
 * linked pages that the sitemap simply did not mention.
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
    { url: BASE + '/work/', lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: BASE + '/blog/', lastModified: buildDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: BASE + '/experience/', lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: BASE + '/expertise/', lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: BASE + '/contact/', lastModified: buildDate, changeFrequency: 'yearly', priority: 0.7 },
    ...PILLARS.map((p) => ({
      url: `${BASE}${pillarHref(p.slug)}`,
      lastModified: buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...Object.entries(POSTS).map(([slug, p]) => ({
      url: `${BASE}/blog/${slug}/`,
      lastModified: postDate(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
