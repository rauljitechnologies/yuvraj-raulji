import type { Metadata } from 'next';
import {
  Beliefs,
  Focus,
  Journey,
  Opening,
  Personal,
  Process,
} from '../../components/brand/about-sections';
import { Page, PageHero } from '../../components/chrome/page';
import { Certification, TechnologyPosition, WhyWorkWithMe } from '../../components/relocated';
import { ABOUT_HERO } from '../../lib/about';
import { ABOUT_DESCRIPTION, brandAboutSchema } from '../../lib/schema-brand';
import type { Crumb } from '../../lib/schema';
import { OG_IMAGE, SITE_URL } from '../../lib/site';
import { ROLE_LINE } from '../../lib/identity';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about/' },
];

const title = `About Yuvraj Raulji | ${ROLE_LINE}`;

export const metadata: Metadata = {
  title,
  description: ABOUT_DESCRIPTION,
  /**
   * The semantic field this page should own: the person, and the disciplines
   * he is an authority in. Written as entities rather than as match types, and
   * every one of them is a subject the visible page actually discusses.
   */
  keywords: [
    'Yuvraj Raulji',
    'Senior Software Developer',
    'Enterprise eCommerce Architect',
    'eCommerce consultant',
    'technology strategist',
    'digital transformation',
    'AI business strategy',
    'commerce architecture',
  ],
  alternates: { canonical: `${SITE_URL}/about/` },
  openGraph: {
    title,
    description: ABOUT_DESCRIPTION,
    url: `${SITE_URL}/about/`,
    siteName: 'Yuvraj Raulji',
    type: 'profile',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: ABOUT_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

/**
 * About.
 *
 * Nine sections: the short version, the journey, the beliefs, the method, the
 * current focus, the position, the reasons behind it, the credential, and the
 * human bit. In that order, because a reader who stops after two has still
 * got the two that matter most.
 *
 * The position, the nine reasons and the certification arrived in redesign
 * v2, off the homepage. Nothing was rewritten: `WHY_WORK_WITH_ME` and
 * `CERTS.feature` are the same data the homepage read, and the position is
 * the same belief that used to be a solid-red band in the middle of the
 * homepage's nineteen sections.
 *
 * This is the page that should define the entity for search engines and answer
 * engines, so its ProfilePage graph carries the full Person node including
 * education and credentials. It carries no Organization, and states no
 * company, directorship or foundership, in copy or in markup.
 */
export default function About() {
  return (
    <Page schema={brandAboutSchema(crumbs)} active="About">
      {/* `lede`, not `opening`. The Opening section below renders `opening`,
          so passing it here printed the same sentence twice on the page,
          three lines apart in the HTML. See the note in lib/about.ts. */}
      <PageHero
        lines={ABOUT_HERO.headline}
        lede={ABOUT_HERO.lede}
        crumbs={crumbs}
      />

      {/* Order and ground are one decision here, not two.
          Opening stays dark so it reads as the tail of the hero rather than as
          a section, and from there the page alternates paper, black, paper,
          black to the closing: journey, positions, method, focus, personal.
          Method now precedes focus, which is also the order the reader needs
          it in — how the thinking works, then what it is currently pointed at.
          The running heads in about-sections.tsx were renumbered to match. */}
      <Opening />
      <Journey />
      <Beliefs />
      <Process />
      <Focus />
      {/*
        Three sections relocated from the homepage in redesign v2. See the map
        in components/relocated.tsx and app/page.tsx.

        They sit after `Focus` and before `Personal` deliberately: Focus says
        what the work is currently pointed at, so the position and the reasons
        behind it follow from it, and the certification is the evidence for
        the AI half of that position. `Personal` stays last, because the human
        bit is the right thing to close a page about a person on.
      */}
      <TechnologyPosition />
      <WhyWorkWithMe />
      <Certification />
      <Personal />
    </Page>
  );
}
