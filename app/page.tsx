import type { Metadata } from 'next';
import { ContactModal } from '../components/contact-modal';
import { Closing } from '../components/homepage/closing';
import { Commerce } from '../components/homepage/commerce';
import { Company } from '../components/homepage/company';
import { ContentHub } from '../components/homepage/content-hub';
import { Hero } from '../components/homepage/hero';
import { Lab } from '../components/homepage/lab';
import { HomeNav } from '../components/homepage/nav';
import { Now } from '../components/homepage/now';
import { Philosophy } from '../components/homepage/philosophy';
import { Pov } from '../components/homepage/pov';
import { Thinking } from '../components/homepage/thinking';
import { Timeline } from '../components/homepage/timeline';
import { Work } from '../components/homepage/work';
import { JsonLd } from '../components/json-ld';
import { SiteFooter } from '../components/site-footer';
import { homeSchema } from '../lib/schema';
import { SITE_URL } from '../lib/site';
import './home.css';

const title = 'Yuvraj Raulji | AI & eCommerce Consultant';
const description =
  'Yuvraj Raulji explores AI, LLMs, eCommerce, digital transformation and the technologies shaping modern business.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Yuvraj Raulji',
    'AI',
    'LLMs',
    'AI agents',
    'AI automation',
    'business transformation',
    'eCommerce',
    'Shopify',
    'Magento',
    'headless commerce',
    'AI search',
    'CRO',
    'digital transformation',
  ],
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/assets/yuvraj-raulji.jpg`,
        width: 400,
        height: 400,
        alt: 'Yuvraj Raulji',
      },
    ],
  },
  twitter: {
    /*
     * `summary`, not `summary_large_image`. The only real photograph in the
     * repository is 400×400, and a square asset in a 1.91:1 card is either
     * cropped through the subject's face or pillarboxed. Ship a 1200×630 card
     * and this becomes summary_large_image.
     */
    card: 'summary',
    title,
    description,
    images: [`${SITE_URL}/assets/yuvraj-raulji.jpg`],
  },
};

/**
 * Homepage.
 *
 * A server component. Every section below is a server component too, apart
 * from the five that genuinely need an event handler or local state: the
 * navigation, the learning lab tabs, the point-of-view rail, the content
 * filters, and the small motion wrappers. Everything else is HTML by the time
 * it reaches the browser.
 *
 * There is no WebGL, no scroll library and no canvas on this page. The only
 * scroll-linked value in the whole document is the hero parallax offset; every
 * other animation is an IntersectionObserver firing once, or CSS.
 *
 * Section order is fixed by SECTIONS in lib/home.ts, which also supplies each
 * section's number and running-head label, so the twelve stay in step.
 *
 * `faq: false` because this page renders no FAQ block, and FAQPage markup
 * without the matching visible content is a structured-data violation rather
 * than a free win.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={homeSchema({ faq: false })} />

      <div className="home">
        <HomeNav />

        {/* Film grain. Fixed, non-interactive, purely atmospheric. */}
        <div className="noise" aria-hidden="true" />

        <main id="top">
          <Hero />
          <Philosophy />
          <Thinking />
          <Lab />
          <Commerce />
          <Pov />
          <Timeline />
          <Work />
          <Now />
          <ContentHub />
          <Company />
          <Closing />
        </main>

        <SiteFooter />
      </div>

      <ContactModal />
    </>
  );
}
