import type { Metadata } from 'next';
import { WorkCases } from '../../components/brand/work-cases';
import { Page, PageHero } from '../../components/chrome/page';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, Marker, Section, Shell } from '../../components/homepage/primitives';
import { WORK_NOTE } from '../../lib/brand';
import { brandWorkSchema, WORK_DESCRIPTION } from '../../lib/schema-brand';
import type { Crumb } from '../../lib/schema';
import { OG_IMAGE, OG_IMAGE_URL, SITE_URL } from '../../lib/site';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work/' },
];

/* Section 25, verbatim. */
const title = 'Yuvraj Raulji | eCommerce and Technology Work';

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
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', title, description: WORK_DESCRIPTION, images: [OG_IMAGE_URL] },
};

/**
 * Selected work.
 *
 * Six engagements as cards, in the homepage's card language. What each card
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

      {/*
        The case list sits on the black ground, not on the paper band it used
        to have. The homepage shows these same six builds as cards on black;
        putting the full list on white made the page a reader arrives at from
        that section look like a different site's.

        The heading is the homepage's line for this exact content, reused
        rather than rewritten, and it carries no supporting paragraph: the hero
        lede three hundred pixels above already says what the six are.
      */}
      <Section id="cases" labelledBy="cases-title">
        <Shell>
          <Marker label="Case studies" />
          <div className="mb-10 lg:mb-14">
            <Lines as="h2" id="cases-title" lines={['Real work.', 'Real systems.']} />
          </div>
          <WorkCases />
        </Shell>
      </Section>

      {/* ── What is not here, said out loud ─────────────────────────
          The homepage's section header, which is a heading and its supporting
          paragraph on one baseline with the space between them doing the
          separating, rather than two halves of a split grid. */}
      <Section id="note" labelledBy="note-title">
        <Shell>
          <Marker label="A note on proof" />
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-10">
            <Lines as="h2" id="note-title" lines={WORK_NOTE.headline} />
            <Rise delay={0.18} className="max-w-[460px]">
              <p className="m-0 font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                {WORK_NOTE.body}
              </p>
              <p className="m-0 mt-6 font-manrope text-[15px] font-light leading-[1.7] text-ink/55">
                {WORK_NOTE.note}
              </p>
            </Rise>
          </div>
        </Shell>
      </Section>

    </Page>
  );
}
