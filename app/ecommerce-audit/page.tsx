import type { Metadata } from 'next';
import { Page, PageHero } from '../../components/chrome/page';
import { ContactButton } from '../../components/homepage/contact-button';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, InlineLink, Marker, Section, Shell } from '../../components/homepage/primitives';
import { AUDIT } from '../../lib/audit-offer';
import { auditSchema, type Crumb } from '../../lib/schema';
import { OG_EXPERTISE, SITE_URL } from '../../lib/site';
import '../home.css';

/**
 * /ecommerce-audit/
 *
 * The site's one purchasable thing.
 *
 * Everything else sells an engagement shape or a conversation. This sells a
 * defined piece of work with a written output, which is the offer the business
 * diagnosis found missing: a visitor could previously agree to give up thirty
 * minutes, and nothing else.
 *
 * Section order:
 *
 *   01 Hero          what it is, in the H1
 *   02 Direct answer what an audit includes, extractable
 *   03 What it covers six areas
 *   04 What arrives  the deliverables, because this is the part that makes it
 *                    a purchase rather than a meeting
 *   05 Not for       three disqualifiers
 *   06 FAQ
 *   07 Final CTA
 *
 * No price anywhere, deliberately. The offer is a recommendation; the number is
 * Yuvraj's commercial decision, and the copy is written so one can be added in
 * a single place without rewriting the page.
 */

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'eCommerce technical audit', href: '/ecommerce-audit/' },
];

export const metadata: Metadata = {
  title: AUDIT.title,
  description: AUDIT.description,
  keywords: [AUDIT.primaryKeyword, ...AUDIT.secondaryKeywords],
  alternates: { canonical: `${SITE_URL}/ecommerce-audit/` },
  openGraph: {
    title: AUDIT.title,
    description: AUDIT.description,
    url: `${SITE_URL}/ecommerce-audit/`,
    siteName: 'Yuvraj Raulji',
    type: 'article',
    locale: 'en_US',
    images: [OG_EXPERTISE],
  },
  twitter: {
    card: 'summary_large_image',
    title: AUDIT.title,
    description: AUDIT.description,
    images: [OG_EXPERTISE.url],
  },
};

const BODY = 'font-manrope text-[17px] font-light leading-[1.7] text-ink/60';

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

export default function EcommerceAudit() {
  return (
    <Page schema={auditSchema(crumbs, AUDIT.faqs)} active="Expertise">
      <PageHero
        eyebrow={AUDIT.eyebrow}
        lines={[AUDIT.h1[0], { text: AUDIT.h1[1], accent: true }]}
        lede={AUDIT.lede}
        crumbs={crumbs}
      >
        <ContactButton>{AUDIT.cta}</ContactButton>
      </PageHero>

      <Section id="answer" labelledBy="answer-title" className="yr-paper">
        <Shell>
          <Marker label="Straight answer" />
          <div className="mb-8 sm:mb-10">
            <Lines
              as="h2"
              id="answer-title"
              lines={['What does an eCommerce', 'technical audit include?']}
            />
          </div>
          <Rise>
            <p className="m-0 max-w-[68ch] font-manrope text-[19px] font-light leading-[1.7] text-ink/70">
              {AUDIT.quickAnswer.answer}
            </p>
          </Rise>
          <Rise delay={0.12} className="mt-9 border-t border-line pt-7">
            <p className="m-0 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/55">
              Usually commissioned when
            </p>
            <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
              {AUDIT.quickAnswer.bestFor.map((b) => (
                <li key={b} className={`m-0 max-w-[56ch] ${BODY}`}>
                  {b}
                </li>
              ))}
            </ul>
          </Rise>
        </Shell>
      </Section>

      <Section id="covers" labelledBy="covers-title">
        <Shell>
          <Marker label="What it covers" />
          <div className="mb-10 sm:mb-14">
            <Lines as="h2" id="covers-title" lines={['Six areas, and the one', 'nobody expects.']} />
          </div>
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-3">
            {AUDIT.covers.map((c) => (
              <Cell key={c.title} title={c.title} body={c.body} />
            ))}
          </ul>
          <Rise delay={0.2} className="mt-8">
            <p className={`m-0 max-w-[62ch] ${BODY}`}>
              The unexpected one is analytics. A surprising number of stores are being steered by
              numbers that are wrong, and every decision made from them inherits the error.
            </p>
          </Rise>
        </Shell>
      </Section>

      {/* The section that makes this a purchase rather than a meeting. */}
      <Section id="deliverables" labelledBy="deliverables-title" className="yr-paper">
        <Shell>
          <Marker label="What arrives" />
          <div className="mb-10 sm:mb-14">
            <Lines as="h2" id="deliverables-title" lines={['A document you keep,', 'not a conversation you had.']} />
          </div>
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2">
            {AUDIT.deliverables.map((d) => (
              <Cell key={d.title} title={d.title} body={d.body} />
            ))}
          </ul>
        </Shell>
      </Section>

      <Section id="not" labelledBy="not-title">
        <Shell>
          <Marker label="When not to" />
          <div className="mb-10 sm:mb-14">
            <Lines as="h2" id="not-title" lines={['Three times this', 'is the wrong purchase.']} />
          </div>
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-3">
            {AUDIT.notFor.map((n) => (
              <Cell key={n.title} title={n.title} body={n.body} />
            ))}
          </ul>
          <Rise delay={0.2} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-10">
            <InlineLink href="/expertise/ecommerce-consulting/">
              What eCommerce consulting covers more broadly
            </InlineLink>
            <InlineLink href="/hire/">How an ongoing engagement works</InlineLink>
            <InlineLink href="/magento-shopify-migration/">
              If the question is specifically whether to replatform
            </InlineLink>
          </Rise>
        </Shell>
      </Section>

      <Section id="faq" labelledBy="faq-title" className="yr-paper">
        <Shell>
          <Marker label="Straight answers" />
          <div className="mb-10 sm:mb-14">
            <Lines as="h2" id="faq-title" lines={['What people ask', 'before commissioning one.']} />
          </div>
          <dl className="m-0 grid gap-px border border-line bg-line md:grid-cols-2">
            {AUDIT.faqs.map((f) => (
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
            lines={[AUDIT.finalHeadline[0], { text: AUDIT.finalHeadline[1], accent: true }]}
          />
          <Rise delay={0.16} className="mt-10 max-w-[62ch]">
            <p className={`m-0 ${BODY}`}>
              Send the store URL, the platform and the symptom that prompted this. I will say
              whether an audit is the right thing before either of us scopes one.
            </p>
          </Rise>
          <Rise delay={0.24} className="mt-10 flex flex-wrap gap-4">
            <ContactButton>{AUDIT.cta}</ContactButton>
            <Btn href="/work/" variant="ghost">
              See the work first
            </Btn>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
