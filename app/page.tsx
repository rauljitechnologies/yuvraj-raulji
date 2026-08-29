import type { Metadata } from 'next';
import { SiteFooter } from '../components/chrome/footer';
import { SiteNav } from '../components/chrome/nav';
import { Hero } from '../components/homepage-sections/hero';
import { NO_SCRIPT_REVEAL_CSS } from '../components/homepage-sections/rv';
import {
  AiSystems,
  Answers,
  Book,
  Contact,
  Evolution,
  Expertise,
  Faq,
  FeaturedCase,
  Insights,
  Position,
  QuoteBand,
  SelectedWork,
  Social,
  Systems,
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
/* Section 25 of BRAND-DESIGN-GUIDELINE.md gives this title verbatim. */
const title = 'Yuvraj Raulji | AI, Business and eCommerce';

export const metadata: Metadata = {
  title,
  description: HOME_DESCRIPTION,
  /**
   * Entities, not a keyword list. Every term here is a subject the page
   * actually discusses in visible prose; none is repeated to hit a density.
   */
  keywords: [
    'Yuvraj Raulji',
    'AI and eCommerce',
    'AI agents',
    'LLMs',
    'digital commerce',
    'headless commerce',
    'business transformation',
    'technology strategy',
    'AI search',
    'Magento',
    'Shopify',
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
 * Home, built to the Claude Design canvas "Yuvraj Raulji - Homepage.dc.html"
 * (project 76be536d), section for section.
 *
 * The numbers below are the canvas's order and this file's order. They are no
 * longer drawn: the section eyebrows used to open with a red ordinal and now
 * carry the name alone, so nothing on the page counts itself.
 *
 *   01 Hero            the positioning statement, portrait plate, ticker
 *   02 The position    the belief, the four numbers, the standing statement
 *   03 What I build    four systems, not four services
 *   04 Selected work   six builds on a snapping rail
 *   05 Featured case   the fashion D2C build, on the first light band
 *   06 Expertise       the stack read left to right, as an architecture
 *   07 AI              the eight tracks, over the circuit traces
 *   08 Direct answers  four definitions, written to be quoted
 *   09 The evolution   eight shifts, oldest first
 *   --  Quote          the accent band
 *   10 Insights        six real posts from lib/posts.ts
 *   11 Writing         where the writing is published
 *   12 Questions       ten answers, and the FAQPage node behind them
 *   13 Consultation    six engagement shapes, on the second light band
 *   14 Contact         the form, wired to the same endpoint as the site modal
 *
 * Rendering. Every section is a server component reading module-scope data, so
 * this page prerenders to static HTML at build time (next.config.mjs sets
 * `output: 'export'`, which is prerender-at-build rather than render-per-request;
 * there is no Node server in front of it). The only JavaScript the page ships is
 * the Motion scroll-reveal wrappers and the contact form.
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
          <Position />
          <Systems />
          <SelectedWork />
          <FeaturedCase />
          <Expertise />
          <AiSystems />
          <Answers />
          <Evolution />
          <QuoteBand />
          <Insights />
          <Social />
          <Faq />
          <Book />
          <Contact />
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
