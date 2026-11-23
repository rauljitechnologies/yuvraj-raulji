import type { Metadata } from 'next';
import { Page, PageHero } from '../../components/chrome/page';
import {
  EngagementModels,
  RemoteCollaboration,
  TechnologyPartner,
} from '../../components/relocated';
import { brandHowWeWorkSchema, HOW_WE_WORK_DESCRIPTION } from '../../lib/schema-brand';
import type { Crumb } from '../../lib/schema';
import { OG_IMAGE, SITE_URL } from '../../lib/site';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'How we work', href: '/how-we-work/' },
];

const title = 'How We Work | Yuvraj Raulji';

export const metadata: Metadata = {
  title,
  description: HOW_WE_WORK_DESCRIPTION,
  keywords: [
    'engagement models',
    'fixed scope development',
    'monthly retainer developer',
    'contract development',
    'remote development collaboration',
    'hire a technology partner',
  ],
  alternates: { canonical: `${SITE_URL}/how-we-work/` },
  openGraph: {
    title,
    description: HOW_WE_WORK_DESCRIPTION,
    url: `${SITE_URL}/how-we-work/`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: HOW_WE_WORK_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

/**
 * How we work.
 *
 * New in redesign v2, and the destination for three homepage sections: the
 * engagement models, the remote facts, and the agency-alternative argument.
 *
 * ── Why this is not /remote-collaboration/ ──────────────────────────────
 *
 * /remote-collaboration/ exists, ranks, and answers one question at length:
 * can someone in Vadodara actually work with a business in London, Dubai or
 * Chicago. That is an objection, and a page answering it well should keep
 * answering it.
 *
 * This page answers a different question, which is "how would I buy this".
 * Seven engagement shapes, from a fixed scope to a retainer, with what each
 * one costs a click away on /pricing/.
 *
 * The two are linked rather than merged, each canonical points at itself, and
 * the old header carried two links to /remote-collaboration/ under two
 * different labels — "Resources › Remote collaboration" and a top-level "How
 * we work" — which is the duplication this separation actually fixes.
 *
 * ── The order ───────────────────────────────────────────────────────────
 *
 * Models, then the remote facts, then the partner argument. A reader on this
 * page has already decided the work might be worth buying; the first thing
 * they need is the shape, the second is whether the logistics work, and the
 * third is the reason to choose one person over an agency, which is the
 * close.
 */
export default function HowWeWork() {
  return (
    <Page schema={brandHowWeWorkSchema(crumbs)} active="How we work">
      <PageHero
        eyebrow="Engagement"
        lines={['How the work', { text: 'is bought.', accent: true }]}
        lede="Seven engagement shapes, the practical facts of working across time zones, and one point of accountability instead of an account layer."
        crumbs={crumbs}
      />
      <EngagementModels />
      <RemoteCollaboration />
      <TechnologyPartner />
    </Page>
  );
}
