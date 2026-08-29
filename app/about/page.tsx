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
import { ABOUT_HERO } from '../../lib/about';
import { ABOUT_DESCRIPTION, brandAboutSchema } from '../../lib/schema-brand';
import type { Crumb } from '../../lib/schema';
import { OG_IMAGE, OG_IMAGE_URL, SITE_URL } from '../../lib/site';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about/' },
];

/* Section 25, verbatim. */
const title = 'About Yuvraj Raulji | AI and eCommerce';

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
    'AI consultant',
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
    images: [OG_IMAGE_URL],
  },
};

/**
 * About.
 *
 * Six sections: the short version, the journey, the beliefs, the current
 * focus, the method, and the human bit. In that order, because a reader who
 * stops after two has still got the two that matter most.
 *
 * This is the page that should define the entity for search engines and answer
 * engines, so its ProfilePage graph carries the full Person node including
 * education and credentials. It carries no Organization, and states no
 * company, directorship or foundership, in copy or in markup.
 */
export default function About() {
  return (
    <Page schema={brandAboutSchema(crumbs)} active="About">
      <PageHero
        eyebrow={ABOUT_HERO.eyebrow}
        lines={ABOUT_HERO.headline}
        lede={ABOUT_HERO.opening}
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
      <Personal />
    </Page>
  );
}
