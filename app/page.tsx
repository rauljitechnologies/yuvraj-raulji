import type { Metadata } from 'next';
import { SiteNav } from '../components/chrome/nav';
import { ContactModal } from '../components/contact-modal';
import { Closing } from '../components/brand/closing';
import { Hero } from '../components/brand/hero';
import {
  Attention,
  Commerce,
  Evolution,
  Learning,
  PointOfView,
  SelectedWork,
  Statement,
  ThoughtAreas,
  Writing,
} from '../components/brand/sections';
import { SiteFooter } from '../components/chrome/footer';
import { JsonLd } from '../components/json-ld';
import { POSITIONING_PLAIN } from '../lib/brand';
import { brandHomeSchema, HOME_DESCRIPTION } from '../lib/schema-brand';
import { SITE_URL } from '../lib/site';

/**
 * Title and description carry the one positioning string, and the same one the
 * H1 and the Person node carry. Three different descriptions of the same
 * person across title, heading and markup is the fastest way to stop a search
 * engine resolving an entity confidently, and it was the previous state of
 * this file.
 */
const title = 'Yuvraj Raulji | AI, Business & eCommerce';

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
    images: [
      {
        url: `${SITE_URL}/assets/yuvraj-raulji.jpg`,
        width: 400,
        height: 400,
        alt: `Yuvraj Raulji, working across ${POSITIONING_PLAIN}`,
      },
    ],
  },
  twitter: {
    /*
     * `summary`, not `summary_large_image`. The only real photograph in the
     * repository is 400x400, and a square asset in a 1.91:1 card is either
     * cropped through the subject's face or pillarboxed. Ship a 1200x630 card
     * and this becomes summary_large_image.
     */
    card: 'summary',
    title,
    description: HOME_DESCRIPTION,
    images: [`${SITE_URL}/assets/yuvraj-raulji.jpg`],
  },
};

/**
 * Home.
 *
 * Eleven sections, in the order the brief fixes:
 *
 *   01 Hero              who, in five seconds
 *   02 Statement         the belief the rest of the page rests on
 *   03 Thought areas     the four subjects
 *   04 Learning          what is being studied now, framed as study
 *   05 Commerce          eight decisions, not eight services
 *   06 Point of view     five positions, each with its turn
 *   07 Evolution         how the thinking got here
 *   08 Selected work     six builds
 *   09 Attention         what is live right now
 *   10 Writing           six real, indexed articles
 *   11 Closing           one question, one action
 *
 * What is deliberately absent, and the absence is the design rather than an
 * omission to tidy up later:
 *
 *   - Testimonials. The four on file attribute to phrases like "Enterprise
 *     Client", and an unattributable quote is not proof of anything.
 *   - Five of six outcome figures. One engagement has a published measured
 *     result; the others say what was built and stop.
 *   - Any company, directorship or foundership. This is the personal site.
 *
 * A server component, and so is every section. The only client modules on the
 * page are the navigation, the entrance animations and the enquiry modal.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={brandHomeSchema()} />

      <div className="yr-page">
        <SiteNav />

        {/* Film grain. Fixed, non-interactive, purely atmospheric. */}
        <div className="noise" aria-hidden="true" />

        <main id="main">
          <Hero />
          <Statement />
          <ThoughtAreas />
          <Learning />
          <Commerce />
          <PointOfView />
          <Evolution />
          <SelectedWork />
          <Attention />
          <Writing />
          <Closing />
        </main>

        <SiteFooter />
      </div>

      <ContactModal />
    </>
  );
}
