import type { Metadata } from 'next';
import { ContactModal } from '../components/contact-modal';
import { AgenticAI, GenerativeAI } from '../components/home/ai';
import { Contact } from '../components/home/contact';
import { Expertise } from '../components/home/expertise';
import { Faq } from '../components/home/faq';
import { Hero } from '../components/home/hero';
import { Industries } from '../components/home/industries';
import { Introduction } from '../components/home/introduction';
import { Infrastructure } from '../components/home/infrastructure';
import { Analytics, Seo } from '../components/home/measurement';
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
import { SITE_URL } from '../lib/site';

const title = 'Yuvraj Raulji | E-commerce Consultant & Technology Strategist';
const description =
  'Yuvraj Raulji — E-commerce & Digital Transformation Consultant and Technology Strategist: commerce architecture, Magento 2, Shopify, headless, analytics and AI.';
const ogDescription =
  'Technology Strategist specializing in Magento 2, Shopify, headless commerce, modern web, analytics, SEO, Generative AI and Agentic AI. 9+ years across B2B, B2C, D2C and marketplace.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title,
    description: ogDescription,
    url: `${SITE_URL}/`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/yuvraj-raulji.jpg`, alt: 'Yuvraj Raulji' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: ogDescription,
    images: [`${SITE_URL}/assets/yuvraj-raulji.jpg`],
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
        <Introduction />
        <Expertise />
        <Infrastructure />
        <Analytics />
        <Seo />
        <GenerativeAI />
        <AgenticAI />
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
