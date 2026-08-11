import type { Metadata } from 'next';
import { ContactModal } from '../components/contact-modal';
import { Contact } from '../components/home/contact';
import { Expertise } from '../components/home/expertise';
import { Faq } from '../components/home/faq';
import { Hero } from '../components/home/hero';
import { Industries } from '../components/home/industries';
import { Insights } from '../components/home/insights';
import { Technology } from '../components/home/technology';
import { Testimonials } from '../components/home/testimonials';
import { Work } from '../components/home/work';
import { JsonLd } from '../components/json-ld';
import { Preloader } from '../components/preloader';
import { SiteEffects } from '../components/site-effects';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { homeSchema } from '../lib/schema';

const title = 'Yuvraj Raulji | Luxury Brand Development & E-Commerce Architect';
const description =
  'Full Stack E-commerce Developer & AI Consultant — Magento 2, Shopify, SEO & CRO, AWS infrastructure, and AI automation. 9+ years crafting luxury digital experiences.';
const ogDescription =
  'Full Stack E-commerce Developer & AI Consultant — Magento 2, Shopify, SEO & CRO, AWS, and AI automation.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://yuvrajraulji.com/' },
  openGraph: {
    title,
    description: ogDescription,
    url: 'https://yuvrajraulji.com/',
    siteName: 'Yuvraj Raulji',
    type: 'website',
    images: [{ url: 'https://yuvrajraulji.com/assets/yuvraj-raulji.jpg', alt: 'Yuvraj Raulji' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: ogDescription,
    images: ['https://yuvrajraulji.com/assets/yuvraj-raulji.jpg'],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeSchema()} />
      <div className="noise" aria-hidden="true" />
      <Preloader />
      <SiteHeader />
      <SiteEffects fullpage />

      <main id="top">
        <Hero />
        <Expertise />
        <Work />
        <Technology />
        <Industries />
        <Insights />
        <Testimonials />
        <Faq />
        <Contact />
      </main>

      <SiteFooter />
      <ContactModal />
    </>
  );
}
