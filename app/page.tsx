import type { Metadata } from 'next';
import { SiteFooter } from '../components/chrome/footer';
import { WhatsAppFloat } from '../components/chrome/whatsapp-float';
import { SiteNav } from '../components/chrome/nav';
import { Hero } from '../components/homepage-sections/hero';
import { NO_SCRIPT_REVEAL_CSS } from '../components/homepage-sections/rv';
import {
  AboutExperience,
  FaqContact,
  Insights,
  Problems,
  Process,
  ProofStrip,
  SelectedWork,
  Services,
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
/**
 * ══════════════════════════════════════════════════════════════════════════
 * HOME — nine sections
 * ══════════════════════════════════════════════════════════════════════════
 *
 * ── THE ORDER, AND WHAT IT ANSWERS ───────────────────────────────────────
 *
 * A buyer arrives with four questions and about eight seconds: who is this,
 * what can I buy, has he built it before, and what do I do next. Nine
 * sections, each answering one of those or removing one objection to it:
 *
 *   1  Hero              who, what the work produces, and one next step
 *   2  Proof strip       the hero's claim, in five checkable figures
 *   3  Selected work     has he built it before
 *   4  Services          what can actually be bought
 *   5  Problems I solve  the symptom the reader arrived with
 *   6  About + record    who is behind it, and the employment history
 *   7  Process           how an engagement runs, so the risk is legible
 *   8  Insights          evidence of thinking, for a reader not ready to buy
 *   9  FAQ + close       the last objections, then the action
 *
 * Services is fourth, not twelfth. That is the one ordering change worth
 * calling out: on the previous page a buyer passed the problems, the figures,
 * a four-area capability matrix, a 32-item technology grid, an AI position,
 * six case studies, a solid-red belief band and nine reasons before reaching
 * the first list of things that could be bought. Eleven sections ahead of the
 * offer is the most expensive thing on a page whose objective is enquiries.
 *
 * ── THE BACKGROUND RULE ──────────────────────────────────────────────────
 *
 *   1 Hero              DARK
 *   2 Proof strip       DARK
 *   3 Selected work     LIGHT
 *   4 Services          DARK
 *   5 Problems          LIGHT
 *   6 About + record    DARK
 *   7 Process           LIGHT
 *   8 Insights          DARK
 *   9 FAQ + close       LIGHT
 *
 * Sections 1 and 2 are both dark because they are one opening unit: the hero
 * makes the claim and the strip evidences it, and a band boundary between
 * them would split one argument in half. From section 3 the ground strictly
 * alternates, starting light: for n >= 3, LIGHT when n is odd.
 *
 * The rule is enforced by the `tone` prop on `Section`
 * (components/ui/index.tsx), which is the only thing on the site that sets a
 * ground. The full reasoning is in that component's note; the short version
 * is that the previous page ran dark, dark, light, light, dark, light, light,
 * light, dark, RED, dark, dark, light, dark, dark, dark, light, dark, which
 * is not a rhythm, and the solid-red band in the middle of it read as a
 * different website.
 *
 * ── WHERE THE OTHER ELEVEN SECTIONS WENT ─────────────────────────────────
 *
 * Nothing was deleted. The content lives in lib/ and never moved; what moved
 * is which page reads it:
 *
 *   Capabilities (4 areas)        -> /expertise/
 *   Ecosystem (32 technologies)   -> /expertise/
 *   AI & automation (8 tracks)    -> /ai/            (new route)
 *   Why (the red belief band)     -> /about/
 *   Why work with me (9 reasons)  -> /about/
 *   Certification                 -> /about/
 *   Remote collaboration          -> /how-we-work/   (new route)
 *   Engagement models (7)         -> /how-we-work/   (new route)
 *   Technology partner argument   -> /how-we-work/
 *   FAQs 7 to 14                  -> /faq/           (new route)
 *   Contact form                  -> /contact/, which already carried it
 *
 * The three sections that were already on the page in a longer form, and are
 * now sliced, keep their full version at the destination: /work/ renders all
 * six case studies against this page's three, /services/ all seventeen
 * against six, /insights/ every article against three, and /faq/ the other
 * eight questions. Every slice is taken against a named constant or the
 * array's own order, never a magic number, so the two halves cannot overlap
 * or leave a gap.
 *
 * The marquee is gone outright: an infinite horizontally scrolling ticker of
 * eight `SPECIALTIES`, `aria-hidden`, rendered twice inside a `w-max` track
 * at the foot of the hero. The eight terms are real text on /expertise/.
 *
 * ── RENDERING ────────────────────────────────────────────────────────────
 *
 * Every section is a server component reading module-scope data, so this page
 * prerenders to static HTML at build time: next.config.mjs sets
 * `output: \'export\'`, which is prerender-at-build rather than
 * render-per-request, and there is no Node server in front of it.
 *
 * The JavaScript the page ships is the header (scroll state and the
 * hamburger), the Motion scroll-reveal wrappers below the fold, and the
 * floating WhatsApp button. The hero animates from a CSS keyframe and the FAQ
 * is a native `<details>`, so neither waits on the bundle.
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

      {/*
        `overflow-x-clip` and not `overflow-x-hidden`.

        Both suppress a horizontal scrollbar and neither prevents the
        overflow, which is the state the audit found this page in: `clip` here
        and `hidden` on <body> meant `document.scrollWidth` could exceed
        `clientWidth` with nothing visible to show it. It is kept as the last
        line of defence rather than the first: every section is now inside one
        1200px `Container`, the case-study carousel that leaked 1250px of
        scroll is a grid, and scripts/check-overflow.mjs measures the exported
        HTML with both classes stripped so a regression is a build failure
        rather than something a reader finds.
      */}
      <div className="bg-ground font-body text-ink [overflow-x:clip]">
        <SiteNav />

        <main id="main">
          <Hero />
          <ProofStrip />
          <SelectedWork />
          <Services />
          <Problems />
          <AboutExperience />
          <Process />
          <Insights />
          <FaqContact />
        </main>

        <SiteFooter />
        <WhatsAppFloat />
      </div>
    </>
  );
}
