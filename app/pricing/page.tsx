import type { Metadata } from 'next';
import { Page, PageHero } from '../../components/chrome/page';
import { ContactButton } from '../../components/homepage/contact-button';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, Marker, Section, Shell } from '../../components/homepage/primitives';
import { PRICING } from '../../lib/pricing';
import { pricingSchema, type Crumb } from '../../lib/schema';
import { OG_IMAGE, SITE_URL } from '../../lib/site';
import '../home.css';

/**
 * /pricing/
 *
 * Section order, and the one decision that matters:
 *
 *   01 Hero
 *   02 Why there are no numbers   <- second, not last
 *   03 The five models
 *   04 How to get a number
 *   05 FAQ
 *   06 CTA
 *
 * Section 02 sits directly under the hero. A reader who has to scroll past
 * five cards looking for a price before being told why there is not one has
 * already decided the page is evasive, and nothing after that lands. Stating
 * it immediately is the difference between a considered position and a gap.
 */

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Pricing', href: PRICING.path },
];

export const metadata: Metadata = {
  title: PRICING.title,
  description: PRICING.description,
  keywords: [PRICING.primaryKeyword, ...PRICING.secondaryKeywords],
  alternates: { canonical: `${SITE_URL}${PRICING.path}` },
  openGraph: {
    title: PRICING.title,
    description: PRICING.description,
    url: `${SITE_URL}${PRICING.path}`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: PRICING.title,
    description: PRICING.description,
    images: [OG_IMAGE],
  },
};

const LABEL =
  'm-0 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.2em] text-ink/55';

export default function Pricing() {
  return (
    <Page schema={pricingSchema(crumbs)}>
      <PageHero eyebrow={PRICING.eyebrow} lines={PRICING.h1} lede={PRICING.lede} crumbs={crumbs}>
        <ContactButton variant="primary">{PRICING.cta}</ContactButton>
        <Btn href="#models" variant="ghost">
          See the five models
        </Btn>
      </PageHero>

      {/* ── 02 The position on prices ──────────────────────────────── */}
      <Section id="no-prices" labelledBy="no-prices-title">
        <Shell>
          <Marker label="On prices" />
          <div className="grid gap-x-12 gap-y-grid lg:grid-cols-[1fr_1.25fr]">
            <Lines as="h2" id="no-prices-title" lines={PRICING.whyNoPrices.heading} />
            <div>
              <Rise delay={0.12}>
                {PRICING.whyNoPrices.body.map((para) => (
                  <p
                    key={para}
                    className="m-0 mb-item max-w-[62ch] font-manrope text-[18px] font-light leading-[1.7] text-ink/65 last:mb-0"
                  >
                    {para}
                  </p>
                ))}
              </Rise>

              <Rise delay={0.22} className="mt-grid">
                <h3 className={LABEL}>What you get instead</h3>
                <ul className="m-0 mt-tight grid list-none gap-2.5 p-0">
                  {PRICING.whyNoPrices.instead.map((i) => (
                    <li
                      key={i}
                      className="flex gap-3.5 font-manrope text-[16px] font-light leading-[1.65] text-ink/60"
                    >
                      <span aria-hidden="true" className="mt-[12px] h-px w-3 shrink-0 bg-accent/50" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </Rise>
            </div>
          </div>
        </Shell>
      </Section>

      {/* ── 03 The models ─────────────────────────────────────────── */}
      <Section id="models" labelledBy="models-title">
        <Shell>
          <Marker label="Engagement models" />
          <div className="mb-grid">
            <Lines as="h2" id="models-title" lines={['Five shapes,', 'not five tiers.']} />
          </div>

          <ol className="m-0 list-none p-0">
            {PRICING.models.map((m, i) => (
              <li key={m.name}>
                <Rise
                  delay={Math.min(i, 4) * 0.05}
                  className="grid gap-x-10 gap-y-4 border-t border-line py-grid md:grid-cols-[180px_minmax(0,1fr)]"
                >
                  <div>
                    <p
                      aria-hidden="true"
                      className="m-0 font-mono text-[12px] font-medium leading-none tracking-[0.2em] text-accent-bright"
                    >
                      {m.num}
                    </p>
                  </div>

                  <div>
                    <h3 className="m-0 font-manrope text-[clamp(22px,2.4vw,32px)] font-semibold leading-[1.15] tracking-[-0.025em]">
                      {m.name}
                    </h3>
                    <p className="m-0 mt-3 max-w-[58ch] font-manrope text-[18px] font-light leading-[1.6] text-accent-bright">
                      {m.shape}
                    </p>

                    <div className="mt-grid grid gap-x-10 gap-y-item lg:grid-cols-2">
                      <div>
                        <h4 className={LABEL}>Best for</h4>
                        <p className="m-0 mt-tight max-w-[48ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/60">
                          {m.bestFor}
                        </p>

                        <h4 className={`${LABEL} mt-item`}>How it is structured</h4>
                        <ul className="m-0 mt-tight grid list-none gap-2 p-0">
                          {m.structure.map((x) => (
                            <li
                              key={x}
                              className="flex gap-3.5 font-manrope text-[15px] font-light leading-[1.6] text-ink/60"
                            >
                              <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-accent/50" />
                              <span>{x}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className={LABEL}>What is included</h4>
                        <ul className="m-0 mt-tight grid list-none gap-2 p-0">
                          {m.includes.map((x) => (
                            <li
                              key={x}
                              className="flex gap-3.5 font-manrope text-[15px] font-light leading-[1.6] text-ink/60"
                            >
                              <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-accent/50" />
                              <span>{x}</span>
                            </li>
                          ))}
                        </ul>

                        {/* The disqualifier, per model. It is what stops the
                            five cards reading as five ways to sell the same
                            thing, and it is the sentence that earns the rest. */}
                        <p className="m-0 mt-item max-w-[48ch] border-l-2 border-line pl-5 font-manrope text-[15px] font-light leading-[1.65] text-ink/45">
                          <span className="text-ink/70">Not for: </span>
                          {m.notFor}
                        </p>
                      </div>
                    </div>
                  </div>
                </Rise>
              </li>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* ── 04 How to get a number ────────────────────────────────── */}
      <Section id="process" labelledBy="process-title">
        <Shell>
          <Marker label="Getting a quote" />
          <div className="mb-grid grid gap-x-12 gap-y-item lg:grid-cols-[1fr_1.1fr]">
            <Lines as="h2" id="process-title" lines={['Four steps', 'to a real number.']} />
            <Rise delay={0.12}>
              <p className="m-0 max-w-[52ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                No charge for any of it, and no follow-up sequence afterwards. If the scope says
                you do not need the work, that is the end of it.
              </p>
            </Rise>
          </div>

          <ol className="m-0 grid list-none gap-px border border-line bg-line p-0 lg:grid-cols-4">
            {PRICING.process.map((p, i) => (
              <Rise key={p.num} as="li" delay={i * 0.06} className="bg-[var(--bg)] p-card">
                <p
                  aria-hidden="true"
                  className="m-0 font-mono text-[12px] font-medium leading-none tracking-[0.2em] text-accent-bright"
                >
                  {p.num}
                </p>
                <h3 className="m-0 mt-item font-manrope text-[19px] font-semibold leading-[1.25] tracking-[-0.02em]">
                  {p.title}
                </h3>
                <p className="m-0 mt-tight font-manrope text-[15px] font-light leading-[1.65] text-ink/55">
                  {p.body}
                </p>
              </Rise>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* ── 05 FAQ ────────────────────────────────────────────────── */}
      <Section id="questions" labelledBy="questions-title">
        <Shell>
          <Marker label="Questions" />
          <div className="mb-grid">
            <Lines as="h2" id="questions-title" lines={['Straight', 'answers.']} />
          </div>
          <dl className="m-0 border-t border-line">
            {PRICING.faqs.map((f, i) => (
              <Rise
                key={f.q}
                delay={Math.min(i, 5) * 0.04}
                className="grid gap-x-12 gap-y-tight border-b border-line py-item lg:grid-cols-[1fr_1.4fr]"
              >
                <dt className="m-0 font-manrope text-[clamp(18px,1.8vw,23px)] font-semibold leading-[1.25] tracking-[-0.02em]">
                  {f.q}
                </dt>
                <dd className="m-0 max-w-[62ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/60">
                  {f.a}
                </dd>
              </Rise>
            ))}
          </dl>
        </Shell>
      </Section>

      {/* ── 06 CTA ────────────────────────────────────────────────── */}
      <Section id="quote" labelledBy="quote-title">
        <Shell>
          <div className="grid gap-x-12 gap-y-item lg:grid-cols-2">
            <Lines as="h2" id="quote-title" lines={PRICING.finalHeadline} />
            <Rise delay={0.14}>
              <p className="m-0 max-w-[48ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/60">
                Tell me the platform, the problem and what you have already been quoted. You get a
                written scope and a figure, and no charge for either.
              </p>
              <div className="mt-block flex flex-wrap gap-3">
                <ContactButton variant="primary">{PRICING.cta}</ContactButton>
                <Btn href="/services/" variant="ghost">
                  What I actually do
                </Btn>
              </div>
            </Rise>
          </div>
        </Shell>
      </Section>
    </Page>
  );
}
