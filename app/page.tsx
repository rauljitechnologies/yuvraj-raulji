import type { Metadata } from 'next';
import { pageHtml } from '../lib/html';

export const metadata: Metadata = {
  title: 'Yuvraj Raulji | Luxury Brand Development & E-Commerce Architect',
  description: 'Full Stack E-commerce Developer & AI Consultant — Magento 2, Shopify, SEO & CRO, AWS infrastructure, and AI automation. 9+ years crafting luxury digital experiences.',
  alternates: { canonical: 'https://yuvrajraulji.com/' },
  openGraph: {
    title: 'Yuvraj Raulji | Luxury Brand Development & E-Commerce Architect',
    description: 'Full Stack E-commerce Developer & AI Consultant — Magento 2, Shopify, SEO & CRO, AWS, and AI automation.',
    url: 'https://yuvrajraulji.com/',
    siteName: 'Yuvraj Raulji',
    type: 'website',
    images: [{ url: 'https://yuvrajraulji.com/assets/yuvraj-raulji.jpg', alt: 'Yuvraj Raulji' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yuvraj Raulji | Luxury Brand Development & E-Commerce Architect',
    description: 'Full Stack E-commerce Developer & AI Consultant — Magento 2, Shopify, SEO & CRO, AWS, and AI automation.',
    images: ['https://yuvrajraulji.com/assets/yuvraj-raulji.jpg'],
  },
};

export default function Home() {
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: pageHtml('home.html') }} />;
}
