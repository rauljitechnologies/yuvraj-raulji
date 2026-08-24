import type { Metadata } from 'next';
import { Closing } from '../../components/brand/closing';
import { WorkCases } from '../../components/brand/work-cases';
import { Page, PageHero } from '../../components/chrome/page';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, Marker, Section, Shell } from '../../components/homepage/primitives';
import { WORK_NOTE } from '../../lib/brand';
import { brandWorkSchema, WORK_DESCRIPTION } from '../../lib/schema-brand';
import type { Crumb } from '../../lib/schema';
import { SITE_URL } from '../../lib/site';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work/' },
];

const title = 'Selected Work | Yuvraj Raulji';

export const metadata: Metadata = {
  title,
  description: WORK_DESCRIPTION,
  keywords: [
    'eCommerce projects',
    'Shopify projects',
    'Magento projects',
    'headless commerce',
    'B2B commerce platform',
    'digital transformation',
    'AI commerce',
  ],
  alternates: { canonical: `${SITE_URL}/work/` },
  openGraph: {
    title,
    description: WORK_DESCRIPTION,
    url: `${SITE_URL}/work/`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary', title, description: WORK_DESCRIPTION },
};

/**
 * Selected work.
 *
 * Six engagements as alternating full-width editorial blocks. What each block
 * shows is bounded by what the record supports: challenge, approach and
 * technology on all six, and an outcome on the one engagement that has a
 * published measured result.
 *
 * Nothing on this page links out to a third-party case-study write-up any
 * more. The full record is here, which is what the personal site should carry;
 * routing a reader off-site at the moment they are most interested was costing
 * the page its own conclusion.
 */
export default function WorkPage() {
  return (
    <Page schema={brandWorkSchema(crumbs)} active="Work">
      <PageHero
        eyebrow="Selected work"
        lines={['Digital commerce,', 'technology and', 'transformation.']}
        lede="Six builds around real business problems. Read them as case studies in technology and business thinking: the interesting part of every one of these was the decision made before any code was written."
        crumbs={crumbs}
      >
        <Btn href="#cases">See the six</Btn>
        <Btn href="/about/" variant="ghost">
          How I approach a build
        </Btn>
      </PageHero>

      <Section id="cases" labelledBy="cases-title" className="yr-paper">
        <Shell>
          <Marker num="01" label="Case studies" />
          <h2 id="cases-title" className="sr-only">
            Case studies
          </h2>
          <WorkCases />
        </Shell>
      </Section>

      {/* ── What is not here, said out loud ───────────────────────── */}
      <Section id="note" labelledBy="note-title">
        <Shell>
          <Marker num="02" label="A note on proof" />
          <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
            <Lines as="h2" id="note-title" lines={WORK_NOTE.headline} softFrom={1} />
            <Rise delay={0.18}>
              <p className="yr-lede max-w-[54ch]">{WORK_NOTE.body}</p>
              <p className="yr-note mt-block max-w-[54ch]">{WORK_NOTE.note}</p>
            </Rise>
          </div>
        </Shell>
      </Section>

      <Closing
        headline={["Let's discuss", { text: 'what you are building.', accent: true }]}
        body="A replatforming you have been putting off, a checkout that loses people you already paid for, a catalogue that has outgrown its architecture, or an AI idea that needs someone to tell you which half of it is real."
      />
    </Page>
  );
}
