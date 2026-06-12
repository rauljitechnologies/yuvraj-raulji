import { pageHtml } from '../../../lib/html';
import { POSTS } from '../../../lib/posts';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = POSTS[slug];
  return {
    title: p.title + ' — Yuvraj Raulji',
    description: p.excerpt,
    alternates: { canonical: 'https://yuvrajraulji.com/blog/' + slug },
    openGraph: {
      title: p.title,
      description: p.excerpt,
      url: 'https://yuvrajraulji.com/blog/' + slug,
      siteName: 'Yuvraj Raulji',
      type: 'article',
      images: [{ url: p.img }],
    },
  };
}

export default async function Article({ params }) {
  const { slug } = await params;
  const html = pageHtml('detail.html').replaceAll('@@SLUG@@', slug);
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}
