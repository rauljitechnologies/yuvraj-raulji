import type { Metadata } from 'next';
import { Page, PageHero } from '../../components/chrome/page';
import { Rise } from '../../components/homepage/motion';
import { Marker, Section, Shell } from '../../components/homepage/primitives';
import { PRIVACY } from '../../lib/legal';
import { privacySchema, type Crumb } from '../../lib/schema';
import { OG_IMAGE, SITE_URL } from '../../lib/site';
import '../home.css';

/**
 * /privacy-policy/
 *
 * A prose page, so it is built from one measure rather than from a grid: the
 * clauses run down a single 68ch column, which is the width the rest of the
 * site sets long-form copy at. Nothing here reveals on scroll except the
 * clause blocks, and the hero does not animate at all.
 *
 * One H1 in the hero, one H2 per clause. The clause headings are the document
 * outline, so they are real headings rather than styled paragraphs: this is
 * the one page on the site a reader is likely to navigate with a screen
 * reader's heading list.
 */

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Privacy policy', href: PRIVACY.path },
];

export const metadata: Metadata = {
  title: PRIVACY.title,
  description: PRIVACY.description,
  keywords: [PRIVACY.primaryKeyword, ...PRIVACY.secondaryKeywords],
  alternates: { canonical: `${SITE_URL}${PRIVACY.path}` },
  openGraph: {
    title: PRIVACY.title,
    description: PRIVACY.description,
    url: `${SITE_URL}${PRIVACY.path}`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: PRIVACY.title,
    description: PRIVACY.description,
    images: [OG_IMAGE],
  },
};

export default function PrivacyPolicy() {
  return (
    <Page schema={privacySchema(crumbs)}>
      <PageHero
        eyebrow={PRIVACY.eyebrow}
        lines={PRIVACY.h1}
        lede={PRIVACY.lede}
        crumbs={crumbs}
      />

      <Section id="policy" labelledBy="policy-title">
        <Shell>
          <Marker label="The statement" />

          {/* The date is the first thing on the page proper. A policy with no
              date does not tell a reader whether it describes the site they
              are looking at. */}
          <h2 id="policy-title" className="sr-only">
            Privacy policy clauses
          </h2>
          <Rise>
            <p className="m-0 font-mono text-eyebrow font-medium uppercase leading-none tracking-[0.2em] text-ink/55">
              Last updated {PRIVACY.updated}
            </p>
          </Rise>

          <div className="mt-head max-w-[68ch]">
            {PRIVACY.clauses.map((c, i) => (
              <Rise
                key={c.heading}
                delay={Math.min(i, 4) * 0.04}
                className="border-t border-line pb-block pt-item first:border-t-0 first:pt-0"
              >
                <h3 className="m-0 font-manrope text-[clamp(19px,1.8vw,25px)] font-semibold leading-[1.2] tracking-[-0.02em]">
                  {c.heading}
                </h3>
                {c.body.map((para) => (
                  <p
                    key={para}
                    className="m-0 mt-item font-manrope text-[17px] font-light leading-[1.7] text-ink/60"
                  >
                    {para}
                  </p>
                ))}
                {c.items ? (
                  <ul className="m-0 mt-item grid list-none gap-2.5 p-0">
                    {c.items.map((it) => (
                      <li
                        key={it}
                        className="flex gap-3.5 font-manrope text-[15px] font-light leading-[1.6] text-ink/60"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[11px] h-px w-3 shrink-0 bg-accent/50"
                        />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Rise>
            ))}
          </div>
        </Shell>
      </Section>
    </Page>
  );
}
