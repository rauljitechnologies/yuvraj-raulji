import type { MetadataRoute } from 'next';
import { POSTS } from '../lib/posts';
import { SITE_URL } from '../lib/site';

export const dynamic = 'force-static';

const BASE = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE + '/', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: BASE + '/blog/', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...Object.keys(POSTS).map((slug) => ({
      url: `${BASE}/blog/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
