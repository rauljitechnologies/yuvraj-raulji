import type { Metadata } from 'next';
import { Page, PageHero } from '../../components/chrome/page';
import { ContactButton } from '../../components/homepage/contact-button';
import { Lines, Rise, type DisplayLine } from '../../components/homepage/motion';
import { Btn, InlineLink, Marker, Section, Shell } from '../../components/homepage/primitives';
import { HIRE, TECH_HIRE } from '../../lib/hire';
import { hireSchema, type Crumb } from '../../lib/schema';
import { OG_HIRE, SITE_URL } from '../../lib/site';
import { TECHNOLOGIES_BY_SLUG, techHref } from '../../lib/technology';
import '../home.css';

/**
 * /hire/
 *
 * The common engagement page, sitting under the nine per-technology hire
 * sections that link up to it.
 *
 * Section order, and the one unusual choice in it:
 *
 *   01 Hero          the H1, the lede, the consultation call to action
 *   02 Direct answer the extractable definition of how this works
 *   03 What this is not
 *   04 Three models  advisory, defined work, ongoing
 *   05 How it starts the four steps
 *   06 The facts     what is actually verifiable, and nothing more
 *   07 Platforms     the nine technologies, each with its own hire section
 *   08 FAQ           open text, because the schema has to match it
 *   09 Final CTA
 *
 * Section 03 is unusual and is the point of the page. A reader who needs a
 * staffing supplier should disqualify themselves here rather than on a call,
 * and a reader who specifically wants one person rather than a rotating team is
 * being told they are in the right place. Both are served by the same block,
 * which is why it sits third rather than being buried near the FAQ.
 *
 * Paper ground, matching the technology and service pages this links between.
 *
 * One H1 in the hero, every section opens an H2, repeated items are H3.
 */

export const metadata: Metadata = {
  title: HIRE.title,
  description: HIRE.description,
  keywords: [HIRE.primaryKeyword, ...HIRE.secondaryKeywords],
  alternates: { canonical: `${SITE_URL}${HIRE.path}` },
  openGraph: {
    title: HIRE.title,
    description: HIRE.description,
    url: `${SITE_URL}${HIRE.path}`,
    siteName: 'Yuvraj Raulji',
    type: 'profile',
    locale: 'en_US',
    images: [OG_HIRE],
  },
  twitter: {
    card: 'summary_large_image',
    title: HIRE.title,
    description: HIRE.description,
    images: [OG_HIRE.url],
  },
};

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Hire', href: HIRE.path },
];

const accentLastLine = (lines: readonly string[]): readonly DisplayLine[] =>
  lines.map((text, i) => (i === lines.length - 1 ? { text, accent: true } : text));

const LABEL =
  'm-0 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/55';

const BODY = 'font-manrope text-[17px] font-light leading-[1.7] text-ink/55';

function Head({
  label,
  id,
  lines,
  lede,
}: {
  label: string;
  id: string;
  lines: readonly string[];
  lede?: string;
}) {
  return (
    <>
      <Marker label={label} />
      <div className="mb-10 flex flex-wrap items-end justify-between gap-8 sm:mb-14 lg:mb-[70px]">
        <Lines as="h2" id={id} lines={accentLastLine(lines)} />
        {lede ? (
          <Rise delay={0.18}>
            <p className={`m-0 max-w-[520px] ${BODY}`}>{lede}</p>
          </Rise>
        ) : null}
      </div>
    </>
  );
}

export default function Hire() {
  /* The nine technologies, resolved through their hire sections so this list
     and those sections cannot describe a different set of platforms. */
  const platforms = Object.values(TECH_HIRE)
    .map((h) => ({ hire: h, tech: TECHNOLOGIES_BY_SLUG[h.slug] }))
    .filter((p) => Boolean(p.tech));

  return (
    <Page schema={hireSchema(crumbs)} active="Expertise" scope="yr-paper">
      {/* ── 01 Hero ─────────────────────────────────────────────── */}
      <PageHero
        eyebrow={HIRE.eyebrow}
        lines={accentLastLine(HIRE.h1)}
        lede={HIRE.lede}
        crumbs={crumbs}
      >
        <ContactButton>{HIRE.cta}</ContactButton>
        <Btn href="#models" variant="ghost">
          The three shapes
        </Btn>
      </PageHero>

      {/* ── 02 Direct answer ────────────────────────────────────── */}
      <Section id="what" labelledBy="what-title">
        <Shell>
          <Head label="Direct answer" id="what-title" lines={[HIRE.quickAnswer.question]} />
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <Rise>
              <p className="m-0 max-w-[62ch] font-manrope text-[clamp(19px,2vw,26px)] font-light leading-[1.5] tracking-[-0.02em] text-ink/85">
                {HIRE.quickAnswer.answer}
              </p>
            </Rise>
            <Rise delay={0.12}>
              <h3 className={LABEL}>Worth a conversation when</h3>
              <ul className="m-0 mt-6 list-none border-t border-line p-0">
                {HIRE.quickAnswer.bestFor.map((b) => (
                  <li
                    key={b}
                    className="flex gap-4 border-b border-line py-5 font-manrope text-[16px] font-light leading-[1.65] text-ink/60"
                  >
                    <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-accent/60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Rise>
          </div>
        </Shell>
      </Section>

      {/* ── 03 What this is not ─────────────────────────────────────
          Third, not last. The wrong-fit reader should leave here rather than
          after a call, and the right-fit reader is being told the thing they
          were hoping was true. */}
      <Section id="not" labelledBy="not-title">
        <Shell>
          <Head label="Before you ask" id="not-title" lines={HIRE.notThis.headline} />
          <Rise className="border-l-2 border-accent/60 py-2 pl-6 sm:pl-8">
            <p className="m-0 max-w-[68ch] font-manrope text-[clamp(18px,1.8vw,23px)] font-light leading-[1.55] text-ink/85">
              {HIRE.notThis.body}
            </p>
          </Rise>
          <ul className="m-0 mt-10 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-3">
            {HIRE.notThis.points.map((pt, i) => (
              <li key={pt.title} className="bg-[var(--bg)]">
                <Rise delay={Math.min(i, 3) * 0.06} className="flex h-full flex-col p-6 sm:p-8">
                  <h3 className="m-0 font-manrope text-[18px] font-semibold leading-[1.25] tracking-[-0.02em]">
                    {pt.title}
                  </h3>
                  <p className={`m-0 mt-4 max-w-[40ch] ${BODY}`}>{pt.body}</p>
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── 04 The three models ─────────────────────────────────── */}
      <Section id="models" labelledBy="models-title">
        <Shell>
          <Head
            label="Engagement"
            id="models-title"
            lines={['Three shapes,', 'genuinely different.']}
            lede="Which one fits comes out of the first conversation. Choosing it in advance is how people end up buying a build when they needed a decision."
          />
          <ol className="m-0 grid list-none gap-px border border-line bg-line p-0 lg:grid-cols-3">
            {HIRE.models.map((m, i) => (
              <li key={m.num} className="bg-[var(--bg)]">
                <Rise
                  delay={Math.min(i, 3) * 0.07}
                  className="flex h-full flex-col p-6 sm:p-8 lg:p-10"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-accent-bright"
                  >
                    {m.num}
                  </span>
                  <h3 className="m-0 mt-6 font-manrope text-[21px] font-semibold leading-[1.2] tracking-[-0.025em]">
                    {m.name}
                  </h3>
                  <p className="m-0 mt-3 max-w-[40ch] font-manrope text-[16px] font-light leading-[1.5] text-ink/75">
                    {m.summary}
                  </p>
                  <p className={`m-0 mt-5 max-w-[46ch] ${BODY}`}>{m.body}</p>
                  <div className="mt-auto pt-7">
                    <h4 className={`${LABEL} mb-3 block`}>Fits when</h4>
                    <ul className="m-0 list-none border-t border-line p-0">
                      {m.fitsWhen.map((f) => (
                        <li
                          key={f}
                          className="flex gap-3 border-b border-line py-3 font-manrope text-[15px] font-light leading-[1.55] text-ink/60"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[10px] h-px w-2.5 shrink-0 bg-accent/60"
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Rise>
              </li>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* ── 05 How it starts ────────────────────────────────────── */}
      <Section id="process" labelledBy="process-title">
        <Shell>
          <Head
            label="How it starts"
            id="process-title"
            lines={['Describe the problem,', 'not the project.']}
            lede="The most useful first message describes a symptom rather than requesting a technology, because the technology is the last decision rather than the first."
          />
          <ol className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-4">
            {HIRE.process.map((step, i) => (
              <li key={step.num} className="bg-[var(--bg)]">
                <Rise
                  delay={Math.min(i, 3) * 0.07}
                  className="flex h-full flex-col p-6 sm:p-8 lg:p-9"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-accent-bright"
                  >
                    {step.num}
                  </span>
                  <h3 className="m-0 mt-6 font-manrope text-[19px] font-semibold leading-[1.25] tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className={`m-0 mt-4 max-w-[42ch] ${BODY}`}>{step.body}</p>
                </Rise>
              </li>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* ── 06 The facts ────────────────────────────────────────────
          Four things that are actually verifiable. No rates, no availability,
          no client count and no country list, because the record supports none
          of those and a hiring page is the easiest place to start inventing. */}
      <Section id="facts" labelledBy="facts-title">
        <Shell>
          <Head label="The record" id="facts-title" lines={['What is actually', 'on offer.']} />
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-4">
            {HIRE.facts.map((f, i) => (
              <li key={f.label} className="bg-[var(--bg)]">
                <Rise delay={Math.min(i, 3) * 0.06} className="flex h-full flex-col p-6 sm:p-8">
                  <h3 className="m-0 font-manrope text-[19px] font-semibold leading-[1.2] tracking-[-0.025em] text-accent-bright">
                    {f.label}
                  </h3>
                  <p className={`m-0 mt-4 max-w-[40ch] ${BODY}`}>{f.body}</p>
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── 07 Platforms ────────────────────────────────────────────
          The nine technologies, each linking to its own hire section rather
          than to the top of the page, so the reader lands on the platform
          argument they were looking for. */}
      <Section id="platforms" labelledBy="platforms-title">
        <Shell>
          <Head
            label="Platforms"
            id="platforms-title"
            lines={['What this is', 'hired for.']}
            lede="Nine technologies with a real delivery record behind them. Anything outside this list would mean charging you to learn it, which is said in the first conversation rather than after."
          />
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-3">
            {platforms.map(({ hire, tech }, i) => (
              <li key={hire.slug} className="bg-[var(--bg)]">
                <Rise delay={Math.min(i, 3) * 0.05} className="flex h-full flex-col p-6 sm:p-8">
                  <h3 className="m-0 font-manrope text-[19px] font-semibold leading-[1.25] tracking-[-0.02em]">
                    <InlineLink href={`${techHref(hire.slug)}#hire`} lead>
                      {`Hire ${tech.name} expertise`}
                    </InlineLink>
                  </h3>
                  <p className="m-0 mt-4 max-w-[40ch] font-manrope text-[15px] font-light leading-[1.65] text-ink/55">
                    {hire.usuallyMeans}
                  </p>
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── 08 FAQ ──────────────────────────────────────────────────
          Open text, matching the FAQPage markup lib/schema.ts builds from the
          same array. */}
      <Section id="questions" labelledBy="faq-title">
        <Shell>
          <Head label="Questions" id="faq-title" lines={['What people ask', 'before the first call.']} />
          <dl className="m-0 border-t border-line">
            {HIRE.faqs.map((f, i) => (
              <div key={f.q} className="border-b border-line">
                <Rise
                  delay={Math.min(i, 3) * 0.05}
                  className="grid items-baseline gap-x-8 gap-y-3 py-7 sm:gap-x-10 sm:py-9 md:grid-cols-[44px_minmax(0,0.9fr)_minmax(0,1.4fr)] lg:grid-cols-[52px_minmax(0,0.9fr)_minmax(0,1.4fr)] lg:py-12"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-accent-bright"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <dt className="m-0 max-w-[24ch] font-manrope text-[clamp(20px,2vw,27px)] font-semibold leading-[1.22] tracking-[-0.025em]">
                    {f.q}
                  </dt>
                  <dd className={`m-0 max-w-[66ch] ${BODY}`}>{f.a}</dd>
                </Rise>
              </div>
            ))}
          </dl>
        </Shell>
      </Section>

      {/* ── 09 Final CTA ────────────────────────────────────────── */}
      <Section id="next" labelledBy="next-title" tall>
        <Shell>
          <Marker label="Next step" />
          <Lines as="h2" id="next-title" lines={accentLastLine(HIRE.finalHeadline)} />
          <Rise delay={0.16} className="mt-10 max-w-[62ch]">
            <p className={`m-0 ${BODY}`}>
              Send the symptom, what it is costing and what has already been tried. Thirty
              minutes is usually enough to name the decision underneath it, and that conversation
              occasionally ends with me saying you do not need the project.
            </p>
          </Rise>
          {/* The one audience /hire/ does not serve. An agency reading this page
              is reading the wrong one, and saying so is cheaper than letting
              them self-select out of the site entirely. */}
          {/* The smaller first step. Most people arriving here are not ready to
              commit to an engagement, and an audit is the version of this that
              produces something they keep whether or not anything follows. */}
          <Rise delay={0.18} className="mt-8">
            <p className={`m-0 max-w-[62ch] ${BODY}`}>
              Not ready to commit to an engagement?{' '}
              <InlineLink href="/ecommerce-audit/">Start with a technical audit</InlineLink>, which
              is fixed in scope and ends with a document rather than a proposal.
            </p>
          </Rise>
          <Rise delay={0.2} className="mt-8">
            <p className={`m-0 max-w-[62ch] ${BODY}`}>
              Working at an agency rather than buying for your own business?{' '}
              <InlineLink href="/agencies/">There is a separate page for that</InlineLink>, because
              the arrangement and the commitments are different.
            </p>
          </Rise>
          <Rise delay={0.24} className="mt-10 flex flex-wrap gap-4">
            <ContactButton>{HIRE.cta}</ContactButton>
            <Btn href="/work/" variant="ghost">
              See the work first
            </Btn>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
