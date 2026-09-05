import type { Metadata } from 'next';
import { Page, PageHero } from '../../components/chrome/page';
import { ContactButton } from '../../components/homepage/contact-button';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, InlineLink, Marker, Section, Shell } from '../../components/homepage/primitives';
import { MIGRATION } from '../../lib/migration';
import { migrationSchema, type Crumb } from '../../lib/schema';
import { OG_EXPERTISE, SITE_URL } from '../../lib/site';
import '../home.css';

/**
 * /magento-shopify-migration/
 *
 * Root level, not under either platform, because the page belongs to neither.
 * Filing it at /magento/shopify-migration/ would have made it a Magento page
 * arguing for leaving Magento, and the mirror problem under /shopify/.
 *
 * Section order, and the reason for it:
 *
 *   01 Hero            the H1 and the lede
 *   02 Direct answer   the extractable definition, first, because it is the
 *                      query this URL exists to own
 *   03 Toward Shopify  three signals
 *   04 Toward Magento  three signals, because a page that argues one way is a
 *                      sales page rather than an answer
 *   05 Stay put        the three reasons that look like platform problems and
 *                      are not. This is the section that makes the rest of the
 *                      page worth believing.
 *   06 What transfers  the part most quotes are vague about
 *   07 How it runs     six steps
 *   08 Boundary        where the delivery work actually lives
 *   09 FAQ             open text, matching the schema exactly
 *   10 Final CTA
 *
 * The boundary in section 08 is load-bearing. /shopify/migration/ and
 * /magento/migration/ own the delivery work on each side and both already rank
 * for their own terms; without an explicit hand-off this page becomes a third
 * competitor for queries they already answer.
 */

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Magento to Shopify migration', href: '/magento-shopify-migration/' },
];

export const metadata: Metadata = {
  title: MIGRATION.title,
  description: MIGRATION.description,
  keywords: [MIGRATION.primaryKeyword, ...MIGRATION.secondaryKeywords],
  alternates: { canonical: `${SITE_URL}/magento-shopify-migration/` },
  openGraph: {
    title: MIGRATION.title,
    description: MIGRATION.description,
    url: `${SITE_URL}/magento-shopify-migration/`,
    siteName: 'Yuvraj Raulji',
    type: 'article',
    locale: 'en_US',
    images: [OG_EXPERTISE],
  },
  twitter: {
    card: 'summary_large_image',
    title: MIGRATION.title,
    description: MIGRATION.description,
    images: [OG_EXPERTISE.url],
  },
};

const BODY = 'font-manrope text-[17px] font-light leading-[1.7] text-ink/60';

/** A titled block of prose. Used by the four signal sections. */
function Cell({ title, body }: { title: string; body: string }) {
  return (
    <li className="bg-[var(--bg)]">
      <div className="flex h-full flex-col p-6 sm:p-8 lg:p-10">
        <h3 className="m-0 font-manrope text-[clamp(18px,1.7vw,22px)] font-semibold leading-[1.2] tracking-[-0.02em]">
          {title}
        </h3>
        <p className={`m-0 mt-4 max-w-[46ch] ${BODY}`}>{body}</p>
      </div>
    </li>
  );
}

function SignalSection({
  id,
  marker,
  lines,
  items,
}: {
  id: string;
  marker: string;
  lines: readonly string[];
  items: readonly { title: string; body: string }[];
}) {
  return (
    <Section id={id} labelledBy={`${id}-title`}>
      <Shell>
        <Marker label={marker} />
        <div className="mb-10 sm:mb-14">
          <Lines as="h2" id={`${id}-title`} lines={lines} />
        </div>
        <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-3">
          {items.map((s) => (
            <Cell key={s.title} title={s.title} body={s.body} />
          ))}
        </ul>
      </Shell>
    </Section>
  );
}

export default function MagentoShopifyMigration() {
  return (
    <Page schema={migrationSchema(crumbs, MIGRATION.faqs)} active="Expertise">
      <PageHero
        eyebrow={MIGRATION.eyebrow}
        lines={[MIGRATION.h1[0], { text: MIGRATION.h1[1], accent: true }]}
        lede={MIGRATION.lede}
        crumbs={crumbs}
      >
        <ContactButton>{MIGRATION.cta}</ContactButton>
      </PageHero>

      {/* The answer, before the argument. An answer engine extracting the first
          substantive passage after the H1 should find a definition here rather
          than a position it has to infer one from. */}
      <Section id="answer" labelledBy="answer-title" className="yr-paper">
        <Shell>
          <Marker label="Straight answer" />
          <div className="mb-8 sm:mb-10">
            <Lines
              as="h2"
              id="answer-title"
              lines={['When should a business', 'migrate from Magento to Shopify?']}
            />
          </div>
          <Rise>
            <p className={`m-0 max-w-[68ch] font-manrope text-[19px] font-light leading-[1.7] text-ink/70`}>
              {MIGRATION.quickAnswer.answer}
            </p>
          </Rise>
          <Rise delay={0.12} className="mt-9 border-t border-line pt-7">
            <p className="m-0 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/55">
              Usually the right move for
            </p>
            <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
              {MIGRATION.quickAnswer.bestFor.map((b) => (
                <li key={b} className={`m-0 max-w-[56ch] ${BODY}`}>
                  {b}
                </li>
              ))}
            </ul>
          </Rise>
        </Shell>
      </Section>

      <SignalSection
        id="to-shopify"
        marker="Toward Shopify"
        lines={['Three signals that', 'the move would pay.']}
        items={MIGRATION.toShopify}
      />

      <SignalSection
        id="to-magento"
        marker="Toward Magento"
        lines={['And three that point', 'the other way.']}
        items={MIGRATION.toMagento}
      />

      <SignalSection
        id="stay"
        marker="Neither"
        lines={['Three reasons to migrate', 'that are not reasons.']}
        items={MIGRATION.stayPut}
      />

      <Section id="transfers" labelledBy="transfers-title" className="yr-paper">
        <Shell>
          <Marker label="What actually moves" />
          <div className="mb-10 sm:mb-14">
            <Lines
              as="h2"
              id="transfers-title"
              lines={['Six things transfer,', 'and none of them cleanly.']}
            />
          </div>
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-3">
            {MIGRATION.transfers.map((t) => (
              <Cell key={t.title} title={t.title} body={t.body} />
            ))}
          </ul>
        </Shell>
      </Section>

      <Section id="process" labelledBy="process-title">
        <Shell>
          <Marker label="How it runs" />
          <div className="mb-10 sm:mb-14">
            <Lines
              as="h2"
              id="process-title"
              lines={['Six steps, and the first one', 'can end the project.']}
            />
          </div>
          <ol className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-3">
            {MIGRATION.steps.map((s, i) => (
              <li key={s.num} className="bg-[var(--bg)]">
                <Rise delay={Math.min(i, 3) * 0.06} className="flex h-full flex-col p-6 sm:p-8 lg:p-10">
                  <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-accent-bright">
                    {s.num}
                  </span>
                  <h3 className="m-0 mt-5 font-manrope text-[clamp(18px,1.7vw,22px)] font-semibold leading-[1.2] tracking-[-0.02em]">
                    {s.title}
                  </h3>
                  <p className={`m-0 mt-4 max-w-[44ch] ${BODY}`}>{s.body}</p>
                </Rise>
              </li>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* The hand-off. This page owns the decision; the two platform migration
          pages own the delivery, and saying so in visible copy is what stops
          three pages competing for the same queries. */}
      <Section id="boundary" labelledBy="boundary-title" className="yr-paper">
        <Shell>
          <Marker label="Where the work lives" />
          <div className="mb-8 sm:mb-10">
            <Lines
              as="h2"
              id="boundary-title"
              lines={['This page is the decision.', 'The delivery is next door.']}
            />
          </div>
          <Rise>
            <p className={`m-0 max-w-[62ch] ${BODY}`}>
              Once the direction is settled, the work itself is written up per platform rather than
              per pairing, because the mechanics differ far more than the decision does.
            </p>
          </Rise>
          <Rise delay={0.12} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-10">
            <InlineLink href="/shopify/migration/">Moving on to Shopify, in detail</InlineLink>
            <InlineLink href="/magento/migration/">Moving on to Magento, in detail</InlineLink>
            <InlineLink href="/expertise/ecommerce-consulting/">
              Deciding before either, with no platform in mind
            </InlineLink>
          </Rise>
        </Shell>
      </Section>

      {/* Open text, not an accordion. The FAQPage node emits exactly these
          strings, so they have to be present as visible content. */}
      <Section id="faq" labelledBy="faq-title">
        <Shell>
          <Marker label="Straight answers" />
          <div className="mb-10 sm:mb-14">
            <Lines as="h2" id="faq-title" lines={['What people ask', 'before replatforming.']} />
          </div>
          <dl className="m-0 grid gap-px border border-line bg-line md:grid-cols-2">
            {MIGRATION.faqs.map((f) => (
              <div key={f.q} className="bg-[var(--bg)] p-6 sm:p-8 lg:p-10">
                <dt className="m-0 font-manrope text-[clamp(17px,1.5vw,20px)] font-semibold leading-[1.25] tracking-[-0.02em]">
                  {f.q}
                </dt>
                <dd className={`m-0 mt-4 max-w-[52ch] ${BODY}`}>{f.a}</dd>
              </div>
            ))}
          </dl>
        </Shell>
      </Section>

      <Section id="next" labelledBy="next-title" tall>
        <Shell>
          <Marker label="Next step" />
          <Lines
            as="h2"
            id="next-title"
            lines={[MIGRATION.finalHeadline[0], { text: MIGRATION.finalHeadline[1], accent: true }]}
          />
          <Rise delay={0.16} className="mt-10 max-w-[62ch]">
            <p className={`m-0 ${BODY}`}>
              Bring the symptom driving the conversation and what it is costing. Thirty minutes is
              usually enough to say whether the platform is the problem, and that answer is
              occasionally that it is not.
            </p>
          </Rise>
          <Rise delay={0.24} className="mt-10 flex flex-wrap gap-4">
            <ContactButton>{MIGRATION.cta}</ContactButton>
            <Btn href="/work/" variant="ghost">
              See the work first
            </Btn>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
