import { pageHtml } from '../../../lib/html';
import { POSTS } from '../../../lib/posts';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

function isoDate(d) {
  const t = Date.parse(d);
  return isNaN(t) ? '2026-01-01' : new Date(t).toISOString().split('T')[0];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = POSTS[slug];
  const url = 'https://yuvrajraulji.com/blog/' + slug + '/';
  return {
    title: p.title + ' — Yuvraj Raulji',
    description: p.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: p.title,
      description: p.excerpt,
      url,
      siteName: 'Yuvraj Raulji',
      type: 'article',
      publishedTime: isoDate(p.date),
      authors: ['Yuvraj Raulji'],
      images: [{ url: p.img, width: 1600, height: 900, alt: p.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      description: p.excerpt,
      images: [p.img],
    },
  };
}

export default async function Article({ params }) {
  const { slug } = await params;
  const p = POSTS[slug];
  const url = 'https://yuvrajraulji.com/blog/' + slug + '/';
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': url + '#article',
        mainEntityOfPage: url,
        headline: p.title,
        description: p.excerpt,
        image: p.img,
        articleSection: p.cat,
        datePublished: isoDate(p.date),
        dateModified: isoDate(p.date),
        inLanguage: 'en-US',
        author: { '@type': 'Person', '@id': 'https://yuvrajraulji.com/#person', name: 'Yuvraj Raulji', url: 'https://yuvrajraulji.com/', jobTitle: 'Full Stack E-commerce Developer & AI Consultant' },
        publisher: { '@id': 'https://yuvrajraulji.com/#person' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yuvrajraulji.com/' },
          { '@type': 'ListItem', position: 2, name: 'Blog & Insights', item: 'https://yuvrajraulji.com/blog/' },
          { '@type': 'ListItem', position: 3, name: p.title, item: url },
        ],
      },
    ],
  };
  const html = pageHtml('detail.html').replaceAll('@@SLUG@@', slug);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
