import type { Metadata } from 'next';
import { SiteFooter } from '../components/chrome/footer';
import { SiteNav } from '../components/chrome/nav';
import { Hero } from '../components/homepage-sections/hero';
import { NO_SCRIPT_REVEAL_CSS } from '../components/homepage-sections/rv';
import {
  About,
  AiCommerce,
  Approach,
  Capabilities,
  Contact,
  Credibility,
  Ecosystem,
  Faq,
  Insights,
  Problems,
  SelectedWork,
  Why,
} from '../components/homepage-sections/sections';
import { JsonLd } from '../components/json-ld';
import { brandHomeSchema, HOME_DESCRIPTION } from '../lib/schema-brand';
import { OG_IMAGE, OG_IMAGE_URL, SITE_URL } from '../lib/site';

/**
 * Title and description carry the one positioning string, and the same one the
 * H1 and the Person node carry. Three different descriptions of the same
 * person across title, heading and markup is the fastest way to stop a search
 * engine resolving an entity confidently, and it was the previous state of
 * this file.
 */
/**
 * The title names the role, because the role is the query.
 *
 * It read "Yuvraj Raulji | AI, Business and eCommerce" for a long time, which
 * is a description of interests rather than of a job, and matched no phrase a
 * business actually searches. The H1, this title and the Person node now carry
 * the same positioning string: three different descriptions of one person
 * across title, heading and markup is the fastest way to stop a search engine
 * resolving an entity confidently.
 */
const title = 'Yuvraj Raulji | eCommerce, AI & Technology Consultant';

export const metadata: Metadata = {
  title,
  description: HOME_DESCRIPTION,
  /**
   * Entities, not a keyword list. Every term here is a subject the page
   * actually discusses in visible prose; none is repeated to hit a density.
   */
  keywords: [
    'eCommerce consultant',
    'eCommerce technology consultant',
    'AI consultant for eCommerce',
    'Shopify consultant',
    'Magento consultant',
    'Headless commerce consultant',
    'AI commerce consultant',
    'technical SEO consultant',
    'digital transformation consultant',
    'Yuvraj Raulji',
  ],
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title,
    description: HOME_DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

/**
 * Home.
 *
 * The section order and the reasoning behind it are documented at the top of
 * components/homepage-sections/sections.tsx, next to the sections themselves.
 * In short: the page answers who, what he fixes, whether he is any good and
 * what to do next, in that order, because that is the order a visitor asks.
 *
 * Rendering. Every section is a server component reading module-scope data, so
 * this page prerenders to static HTML at build time (next.config.mjs sets
 * `output: 'export'`, which is prerender-at-build rather than
 * render-per-request; there is no Node server in front of it). The only
 * JavaScript the page ships is the Motion scroll-reveal wrappers and the
 * contact form.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={brandHomeSchema()} />

      {/*
        Motion writes its `initial` state into the server-rendered markup, so
        every reveal ships as `opacity:0`. Crawlers read the DOM and are
        unaffected, but a reader with JavaScript off would get a blank page.
        This switches all of it back on, and never loads when scripting works.
      */}
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: NO_SCRIPT_REVEAL_CSS }} />
      </noscript>

      <div className="bg-ground font-manrope text-ink [overflow-x:clip]">
        <SiteNav />

        <main id="main">
          <Hero />
          <Credibility />
          <Problems />
          <Capabilities />
          <Why />
          <SelectedWork />
          <AiCommerce />
          <Ecosystem />
          <Approach />
          <About />
          <Insights />
          <Faq />
          <Contact />
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
