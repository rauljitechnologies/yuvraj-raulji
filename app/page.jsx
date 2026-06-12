import { pageHtml } from '../lib/html';

export const metadata = {
  title: 'Yuvraj Raulji | Luxury Brand Development & E-Commerce Architect',
  description: 'Full Stack E-commerce Developer & AI Consultant — Magento 2, Shopify, SEO & CRO, AWS infrastructure, and AI automation. 9+ years crafting luxury digital experiences.',
  alternates: { canonical: 'https://yuvrajraulji.com/' },
  openGraph: {
    title: 'Yuvraj Raulji | Luxury Brand Development & E-Commerce Architect',
    description: 'Full Stack E-commerce Developer & AI Consultant — Magento 2, Shopify, SEO & CRO, AWS, and AI automation.',
    url: 'https://yuvrajraulji.com/',
    siteName: 'Yuvraj Raulji',
    type: 'website',
  },
};

export default function Home() {
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: pageHtml('home.html') }} />;
}
