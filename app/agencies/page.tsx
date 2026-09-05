import type { Metadata } from 'next';
import { Page, PageHero } from '../../components/chrome/page';
import { ContactButton } from '../../components/homepage/contact-button';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, InlineLink, Marker, Section, Shell } from '../../components/homepage/primitives';
import { AGENCIES } from '../../lib/agencies';
import { agenciesSchema, type Crumb } from '../../lib/schema';
import { OG_EXPERTISE, SITE_URL } from '../../lib/site';
import '../home.css';

/**
 * /agencies/
 *
 * The one page on the site whose buyer is not the end client.
 *
 * Section order, and the reason the second one is where it is:
 *
 *   01 Hero          the promise, which is that the client stays theirs
 *   02 Commitments   the four written commitments, immediately
 *   03 Direct answer what a technical partner actually is
 *   04 What I take on
 *   05 What this is not
 *   06 How it works  four steps
 *   07 Platforms     linking into the existing technology pages
 *   08 FAQ
 *   09 Final CTA
 *
 * Section 02 sits above the explanation of the service, which is unusual, and
 * it is the point of the page. Every agency evaluating a technical partner is
 * asking whether that partner will take their client. Nothing below is read
 * properly until that is answered, so it is answered before anything is asked
 * of the reader.
 *
 * Section 05 exists for the same reason it exists on /hire/: an agency that
 * needs volume templating should disqualify itself here rather than three
 * weeks into a badly matched engagement.
 */

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'For agencies', href: '/agencies/' },
];

export const metadata: Metadata = {
  title: AGENCIES.title,
  description: AGENCIES.description,
  keywords: [AGENCIES.primaryKeyword, ...AGENCIES.secondaryKeywords],
  alternates: { canonical: `${SITE_URL}/agencies/` },
  openGraph: {
    title: AGENCIES.title,
    description: AGENCIES.description,
    url: `${SITE_URL}/agencies/`,
    siteName: 'Yuvraj Raulji',
    type: 'article',
    locale: 'en_US',
    images: [OG_EXPERTISE],
  },
  twitter: {
    card: 'summary_large_image',
    title: AGENCIES.title,
    description: AGENCIES.description,
    images: [OG_EXPERTISE.url],
  },
};

const BODY = 'font-manrope text-[17px] font-light leading-[1.7] text-ink/60';

const PLATFORMS = [
  { href: '/magento/', label: 'Magento 2 and Adobe Commerce' },
  { href: '/shopify/', label: 'Shopify and Shopify Plus' },
  { href: '/headless-commerce/', label: 'Headless commerce' },
  { href: '/woocommerce/', label: 'WooCommerce' },
  { href: '/wordpress/', label: 'WordPress' },
  { href: '/nextjs/', label: 'Next.js' },
] as const;

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

export default function Agencies() {
  return (
    <Page schema={agenciesSchema(crumbs, AGENCIES.faqs)} active="Hire">
      <PageHero
        eyebrow={AGENCIES.eyebrow}
        lines={[AGENCIES.h1[0], { text: AGENCIES.h1[1], accent: true }]}
        lede={AGENCIES.lede}
        crumbs={crumbs}
      >
        <ContactButton>{AGENCIES.cta}</ContactButton>
      </PageHero>

      {/* The objection, answered before anything is asked of the reader. */}
      <Section id="commitments" labelledBy="commitments-title" className="yr-paper">
        <Shell>
          <Marker label="In writing" />
          <div className="mb-10 sm:mb-14">
            <Lines
              as="h2"
              id="commitments-title"
              lines={['Four commitments,', 'before anything else.']}
            />
          </div>
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2">
            {AGENCIES.commitments.map((c) => (
              <Cell key={c.title} title={c.title} body={c.body} />
            ))}
          </ul>
        </Shell>
      </Section>

      <Section id="answer" labelledBy="answer-title">
        <Shell>
          <Marker label="Straight answer" />
          <div className="mb-8 sm:mb-10">
            <Lines
              as="h2"
              id="answer-title"
              lines={['What does a technical', 'commerce partner do?']}
            />
          </div>
          <Rise>
            <p className="m-0 max-w-[68ch] font-manrope text-[19px] font-light leading-[1.7] text-ink/70">
              {AGENCIES.quickAnswer.answer}
            </p>
          </Rise>
          <Rise delay={0.12} className="mt-9 border-t border-line pt-7">
            <p className="m-0 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/55">
              Usually brought in for
            </p>
            <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
              {AGENCIES.quickAnswer.bestFor.map((b) => (
                <li key={b} className={`m-0 max-w-[56ch] ${BODY}`}>
                  {b}
                </li>
              ))}
            </ul>
          </Rise>
        </Shell>
      </Section>

      <Section id="scope" labelledBy="scope-title" className="yr-paper">
        <Shell>
          <Marker label="What I take on" />
          <div className="mb-10 sm:mb-14">
            <Lines as="h2" id="scope-title" lines={['The parts that need', 'a decision, not a pair of hands.']} />
          </div>
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-3">
            {AGENCIES.takesOn.map((t) => (
              <Cell key={t.title} title={t.title} body={t.body} />
            ))}
          </ul>
        </Shell>
      </Section>

      <Section id="not" labelledBy="not-title">
        <Shell>
          <Marker label="What this is not" />
          <div className="mb-10 sm:mb-14">
            <Lines as="h2" id="not-title" lines={['Three times you should', 'hire someone else.']} />
          </div>
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-3">
            {AGENCIES.notFor.map((n) => (
              <Cell key={n.title} title={n.title} body={n.body} />
            ))}
          </ul>
        </Shell>
      </Section>

      <Section id="process" labelledBy="process-title" className="yr-paper">
        <Shell>
          <Marker label="How it works" />
          <div className="mb-10 sm:mb-14">
            <Lines as="h2" id="process-title" lines={['Four steps, and the second', 'is sometimes a no.']} />
          </div>
          <ol className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-4">
            {AGENCIES.howItWorks.map((s, i) => (
              <li key={s.num} className="bg-[var(--bg)]">
                <Rise delay={Math.min(i, 3) * 0.06} className="flex h-full flex-col p-6 sm:p-8 lg:p-10">
                  <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-accent-bright">
                    {s.num}
                  </span>
                  <h3 className="m-0 mt-5 font-manrope text-[clamp(17px,1.6vw,20px)] font-semibold leading-[1.2] tracking-[-0.02em]">
                    {s.title}
                  </h3>
                  <p className={`m-0 mt-4 max-w-[42ch] ${BODY}`}>{s.body}</p>
                </Rise>
              </li>
            ))}
          </ol>
        </Shell>
      </Section>

      <Section id="platforms" labelledBy="platforms-title">
        <Shell>
          <Marker label="Platforms" />
          <div className="mb-8 sm:mb-10">
            <Lines as="h2" id="platforms-title" lines={['The stacks, and what', 'each one is written up as.']} />
          </div>
          <Rise className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-10">
            {PLATFORMS.map((p) => (
              <InlineLink key={p.href} href={p.href}>
                {p.label}
              </InlineLink>
            ))}
          </Rise>
        </Shell>
      </Section>

      <Section id="faq" labelledBy="faq-title" className="yr-paper">
        <Shell>
          <Marker label="Straight answers" />
          <div className="mb-10 sm:mb-14">
            <Lines as="h2" id="faq-title" lines={['What agencies ask', 'before the first project.']} />
          </div>
          <dl className="m-0 grid gap-px border border-line bg-line md:grid-cols-2">
            {AGENCIES.faqs.map((f) => (
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
            lines={[AGENCIES.finalHeadline[0], { text: AGENCIES.finalHeadline[1], accent: true }]}
          />
          <Rise delay={0.16} className="mt-10 max-w-[62ch]">
            <p className={`m-0 ${BODY}`}>
              Tell me the platform, what you have committed to and where the uncertainty sits. If it
              is not a fit I will say so on the first call, which is cheaper for both of us than
              finding out at the halfway point.
            </p>
          </Rise>
          <Rise delay={0.24} className="mt-10 flex flex-wrap gap-4">
            <ContactButton>{AGENCIES.cta}</ContactButton>
            <Btn href="/work/" variant="ghost">
              See the technical work
            </Btn>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
