import type { Metadata } from 'next';
import { SiteFooter } from '../components/chrome/footer';
import { MobileCta } from '../components/chrome/mobile-cta';
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
import { ROLE_LINE } from '../lib/identity';

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
const title = `Yuvraj Raulji | ${ROLE_LINE}`;

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
    'Senior Software Developer',
    'Technology Consultant',
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
 * The section order is section 4 of the brief, and the list below carries a
 * line per section saying what it does. The sections themselves, and the
 * ground each one sits on, are in components/homepage-sections/sections.tsx.
 * In short: the page answers who, what can be bought, whether it has been
 * built before, and what to do next, in that order, because that is the order
 * a buyer asks.
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

          {/*
            ── The order, and why it changed ──────────────────────────────
            Section 4 of the brief lists the thirteen sections it wants and
            the order it wants them in: hero, statistics, about, services,
            featured projects, technical expertise, why work with me,
            process, remote collaboration, insights, FAQs, close, footer.
            This follows it, with the five sections the site carries beyond
            that list slotted beside the one they belong to.

            It did not follow it before, and the cost was specific:
            Services sat twelfth. A buyer scrolling this page passed the
            problems, the figures, the capability matrix, the stack, the AI
            position, six case studies, a red band and nine reasons before
            reaching the first list of things that can actually be bought.
            Section 14 says the most important objective is getting project
            enquiries, and eleven sections ahead of the offer is the most
            expensive thing on a page with that objective.

            RemoteWork moved the same way and for the same reason, from
            sixteenth to seventh. The target markets are the USA, the UK, the
            UAE and Europe, so "can someone in Vadodara actually work with
            us" is not a detail a buyer checks at the end: it is the
            objection that decides whether the services above it are worth
            reading about at all. It now answers that immediately after the
            proof that the work has been built, while the question is live.

            It did not move further up. Ahead of SelectedWork it would be
            explaining how an engagement runs to someone who has not yet seen
            that there is anything worth engaging for.

            What each one is doing, in order:

              Hero          who, what, and the three ways to start
              Problems      the symptom the reader arrived with
              Credibility   the five verified figures
              About         who is behind it
              Services      what can be bought
              SelectedWork  proof that it has been built
              RemoteWork    how working across time zones actually runs
              Capabilities  the four areas, in depth
              Ecosystem     the stack, grouped by what it is for
              AiCommerce    the AI position, which is the newest claim
              Why           the belief, on the red band
              WhyWorkWithMe the nine reasons behind that belief
              Approach      how an engagement actually runs
              Professional  the employment record behind all of it
              Certification the one credential, as evidence for the AI half
              TechnologyPartner  the alternative to hiring an agency
              Insights      the writing, for a reader not ready to write
              Faq           what is asked before a first call
              Contact       the close, three channels and the form
          */}
          <Problems />
          <Credibility />
          <About />
          <Services />
          <SelectedWork />
          <RemoteWork />
          <Capabilities />
          <Ecosystem />
          <AiCommerce />
          {/* Position, then the reasons behind it, then how the work runs.
              The red band asserts a belief; WhyWorkWithMe is the evidence.
              On its own, either reads as assertion. */}
          <Why />
          <WhyWorkWithMe />
          <Approach />
          {/* The record behind the offer. For a freelance buyer, nine years
              at named companies is the credibility that separates this from
              a portfolio anyone can assemble, and the certification is the
              evidence for the AI half of it. */}
          <ProfessionalExperience />
          <Certification />
          <TechnologyPartner />
          <Insights />
          <Faq />
          <Contact />
        </main>

        <SiteFooter />
        <MobileCta />
      </div>
    </>
  );
}
