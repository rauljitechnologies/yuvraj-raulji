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
  Certification,
  Contact,
  Credibility,
  Ecosystem,
  Faq,
  Insights,
  ProfessionalExperience,
  Problems,
  RemoteWork,
  SelectedWork,
  Services,
  TechnologyPartner,
  Why,
  WhyWorkWithMe,
} from '../components/homepage-sections/sections';
import { JsonLd } from '../components/json-ld';
import { brandHomeSchema, HOME_DESCRIPTION } from '../lib/schema-brand';
import { OG_IMAGE, SITE_URL } from '../lib/site';

/**
 * The title names what is on offer, because that is the query.
 *
 * It has been three things: "AI, Business and eCommerce" (a description of
 * interests, matching no phrase a business searches), then "Senior Software
 * Engineer & eCommerce Architect" (a job title, from when the objective was
 * remote employment), and now this. The objective is freelance client work,
 * so the title leads with the word that qualifies the visitor.
 *
 * The H1, this title, the meta description and the Person node all resolve
 * against lib/identity.ts. Three different descriptions of one person across
 * title, heading and markup is the fastest way to stop a search engine
 * resolving an entity confidently, and that was the state of this file twice.
 *
 * 45 characters.
 */
const title = 'Yuvraj Raulji | Freelance eCommerce Developer';

export const metadata: Metadata = {
  title,
  description: HOME_DESCRIPTION,
  /**
   * Client-acquisition terms, per §13, plus the personal brand.
   *
   * Entities rather than a density list: every term is a subject the page
   * discusses in visible prose, and none is repeated to hit a count.
   *
   * They read as employment queries before this: "Senior Software Engineer",
   * "Remote Software Engineer", "eCommerce Technical Lead". Those are what a
   * candidate targets. These are what a business types when it wants someone
   * to build something.
   */
  keywords: [
    'Yuvraj Raulji',
    'Freelance Magento Developer',
    'Freelance eCommerce Developer',
    'Magento 2 Developer',
    'Shopify Developer',
    'eCommerce Development Services',
    'Remote Magento Developer',
    'Shopify Plus Development',
    'Next.js Developer',
    'Full Stack Developer',
    'Headless Commerce Development',
    'eCommerce Technical Consultant',
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
    images: [OG_IMAGE],
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
          <Problems />
          <Credibility />
          <Capabilities />
          <Ecosystem />
          <AiCommerce />
          <SelectedWork />
          {/* Position, then the reasons behind it, then how the work runs.
              The red band asserts a belief; WhyWorkWithMe is the evidence.
              On its own, either reads as assertion. */}
          <Why />
          <WhyWorkWithMe />
          <Approach />
          <About />
          {/* What can be bought, then the record behind it. The page showed
              capability and proof and never named an engagement; these two
              close that gap. The employment record stays because for a
              freelance buyer nine years at named companies is the credibility
              that separates this from a portfolio anyone can assemble. */}
          <Services />
          <ProfessionalExperience />
          <TechnologyPartner />
          {/* The credential, then how remote collaboration works, then the
              close. Certification sits here rather than next to Credibility
              because it is evidence for the AI half of the offer and reads as
              evidence only after the work has been shown. */}
          <Certification />
          <RemoteWork />
          <Insights />
          <Faq />
          <Contact />
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
