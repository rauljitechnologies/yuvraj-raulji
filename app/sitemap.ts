import type { MetadataRoute } from 'next';
import { POSTS } from '../lib/posts';

export const dynamic = 'force-static';

const BASE = 'https://yuvrajraulji.com';

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
