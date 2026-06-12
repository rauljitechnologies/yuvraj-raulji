import { pageHtml } from '../../lib/html';

export const metadata = {
  title: 'Blog & Insights — Yuvraj Raulji | Magento 2, Shopify, SEO, AWS & E-Commerce',
  description: 'Expert insights on Magento 2, Shopify, SEO & CRO, AWS server setup, WordPress, and luxury e-commerce development by Yuvraj Raulji. 9+ years of hands-on expertise.',
  alternates: { canonical: 'https://yuvrajraulji.com/blog/' },
  openGraph: {
    title: 'Blog & Insights — Yuvraj Raulji | Magento 2, Shopify, SEO & AWS',
    description: 'Expert insights on Magento 2, Shopify, SEO & CRO, AWS, and luxury e-commerce development.',
    url: 'https://yuvrajraulji.com/blog/',
    siteName: 'Yuvraj Raulji',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Insights — Yuvraj Raulji',
    description: 'Expert insights on Magento 2, Shopify, SEO & CRO, AWS, and luxury e-commerce by Yuvraj Raulji.',
  },
};

export default function Blog() {
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: pageHtml('blog.html') }} />;
}
