import type { Metadata } from 'next';
import { Page, PageHero } from '../../components/chrome/page';
import { AiTracks, OperationsProblems } from '../../components/relocated';
import { AI_DESCRIPTION, brandAiSchema } from '../../lib/schema-brand';
import type { Crumb } from '../../lib/schema';
import { OG_IMAGE, SITE_URL } from '../../lib/site';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'AI & automation', href: '/ai/' },
];

const title = 'AI & Automation | Yuvraj Raulji';

export const metadata: Metadata = {
  title,
  description: AI_DESCRIPTION,
  keywords: [
    'ai automation consultant',
    'llm application development',
    'retrieval augmented generation',
    'ai agents development',
    'workflow automation',
    'ai search',
    'generative engine optimization',
  ],
  alternates: { canonical: `${SITE_URL}/ai/` },
  openGraph: {
    title,
    description: AI_DESCRIPTION,
    url: `${SITE_URL}/ai/`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: AI_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

/**
 * AI and automation.
 *
 * New in redesign v2, and the destination for the homepage's AI section.
 *
 * ── Why a new route when /ai-commerce/, /ai-automation/ and /ai-search/
 *    already exist ──────────────────────────────────────────────────────
 *
 * Those three are entity pages, each owning one query and one slice of the
 * subject: AI in a commerce context, workflow automation, and search that
 * reads intent. None of them is the top of the subject, so the eight tracks
 * the homepage carried had no page to move to that would not have buried
 * them under a narrower argument.
 *
 * This page is the hub over the three. It carries the eight tracks and the
 * three operational problems, and links down to each of the specific pages
 * rather than restating them, so it takes no ground from any of them.
 */
export default function Ai() {
  return (
    <Page schema={brandAiSchema(crumbs)}>
      <PageHero
        eyebrow="AI and automation"
        lines={['The practical end,', { text: 'not the demo.', accent: true }]}
        lede="Eight tracks that have to work in production: agents with a deliberate tool boundary, retrieval you can audit, search that reads intent, and the operational work a model should not be pointed at yet."
        crumbs={crumbs}
      />
      <AiTracks />
      <OperationsProblems />
    </Page>
  );
}
