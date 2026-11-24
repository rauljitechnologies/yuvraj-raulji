import type { Metadata } from 'next';
import { Page, PageHero } from '../../components/chrome/page';
import { RemainingFaqs } from '../../components/relocated';
import { brandFaqSchema, FAQ_DESCRIPTION } from '../../lib/schema-brand';
import type { Crumb } from '../../lib/schema';
import { OG_IMAGE, SITE_URL } from '../../lib/site';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'FAQ', href: '/faq/' },
];

const title = 'FAQ | Yuvraj Raulji';

export const metadata: Metadata = {
  title,
  description: FAQ_DESCRIPTION,
  keywords: [
    'ecommerce developer faq',
    'magento developer questions',
    'freelance developer pricing',
    'project scope and timelines',
    'yuvraj raulji faq',
  ],
  alternates: { canonical: `${SITE_URL}/faq/` },
  openGraph: {
    title,
    description: FAQ_DESCRIPTION,
    url: `${SITE_URL}/faq/`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: FAQ_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

/**
 * FAQ.
 *
 * New in redesign v2. The homepage carried all fourteen questions in one
 * section; it carries six and this page carries the other eight.
 *
 * The split is a constant, not a judgement: `HOME_FAQ_COUNT` in
 * lib/homepage.ts, which the homepage section, this page's section, the
 * homepage's `FAQPage` node and this page's `FAQPage` node all slice against.
 * The two nodes therefore partition the fourteen questions exactly, so no
 * question is claimed by two pages and none by neither. The note on that
 * constant has the reasoning.
 */
export default function Faq() {
  return (
    <Page schema={brandFaqSchema(crumbs)}>
      <PageHero
        eyebrow="Before the first call"
        lines={['Straight', { text: 'answers.', accent: true }]}
        lede="Eight questions that come up after the obvious ones, answered in full. The first six are on the homepage, and anything still unanswered is one message away."
        crumbs={crumbs}
      />
      <RemainingFaqs />
    </Page>
  );
}
