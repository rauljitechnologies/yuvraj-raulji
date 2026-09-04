import Link from 'next/link';
import { Page, PageHero } from '../chrome/page';
import { ContactButton } from '../homepage/contact-button';
import { Lines, Rise, type DisplayLine } from '../homepage/motion';
import { Btn, InlineLink, Marker, Section, Shell, Tag } from '../homepage/primitives';
import { WORK_ITEMS } from '../../lib/home';
import { POSTS } from '../../lib/posts';
import { serviceHref, type PlatformService } from '../../lib/platform-services';
import { platformServiceSchema, type Crumb } from '../../lib/schema';
import { TECHNOLOGIES_BY_SLUG, techHref } from '../../lib/technology';

/**
 * A platform service page. One component, seven Magento pages today and the
 * Shopify, WooCommerce, WordPress and headless clusters on the same file later.
 *
 * ── Why the section order is what it is ─────────────────────────────────────
 *
 * The order is the conversion structure the brief specifies, not a template
 * inherited from the technology pages:
 *
 *   Problem, Impact, Approach, Capability, Proof, Outcome, CTA
 *
 * mapped onto sections as:
 *
 *   01 Hero            the H1, the lede, the two calls to action
 *   02 Quick answer    the extractable definition, and who it suits
 *   03 Boundary        what this page is not, and where that job lives
 *   04 Problems        the symptom as the buyer says it, and what it costs
 *   05 Approach        the steps, in order, with the reasoning attached
 *   06 Capabilities    grouped, so it reads as scope rather than as a list
 *   07 Work            proof, real builds only
 *   08 Outcomes        verified figures with their context, or none at all
 *   09 FAQ             open text, because the schema has to match it
 *   10 Related         contextual links with anchors written per pairing
 *   11 Final CTA       the page's own closing question
 *
 * Section 03 is the one with no equivalent on the technology pages and it is
 * the most important one here. Migration and upgrade are the same word to most
 * buyers; so are automation and agents. A page that does not say what it is not
 * merges with its neighbour in a search engine's eyes, and the neighbour with
 * more links wins. The boundary is therefore rendered as visible copy carrying
 * a real link, not left as a note in the content model.
 *
 * ── Ground and headings ─────────────────────────────────────────────────────
 *
 * Paper end to end, via `scope="yr-paper"` on `Page`, matching the technology
 * hub above it so moving from /magento/ to /magento/consulting/ does not change
 * ground mid-journey. Nothing here styles for a ground: colours come from
 * tokens, which is what lets the whole page invert from one prop.
 *
 * One H1, in the hero. Every section opens an H2, repeated items inside a
 * section are H3, and a named sub-part of one of those is an H4. No level is
 * skipped on any of the seven pages.
 */

/* Headlines land in the red on the last line, the same treatment the technology
   pages use, applied here so the authored strings stay plain. */
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

export function ServicePage({ service }: { service: PlatformService }) {
  const platform = TECHNOLOGIES_BY_SLUG[service.platform];
  const path = serviceHref(service.platform, service.slug);

  const crumbs: Crumb[] = [
    { name: 'Home', href: '/' },
    { name: platform.label, href: techHref(service.platform) },
    { name: service.label, href: path },
  ];

  /* Cross-links resolve from ids rather than being duplicated, so a case study
     renamed in lib/home.ts is renamed on every service page at once. */
  const cases = service.cases
    .map((id) => WORK_ITEMS.find((w) => w.id === id))
    .filter((w): w is (typeof WORK_ITEMS)[number] => Boolean(w));

  const posts = service.posts
    .map((s) => (POSTS[s] ? { slug: s, ...POSTS[s] } : null))
    .filter((p): p is { slug: string } & (typeof POSTS)[string] => Boolean(p));

  return (
    <Page schema={platformServiceSchema(service, crumbs)} active="Expertise" scope="yr-paper">
      {/* ── 01 Hero ─────────────────────────────────────────────── */}
      <PageHero
        eyebrow={service.eyebrow}
        lines={accentLastLine(service.h1)}
        lede={service.lede}
        crumbs={crumbs}
      >
        <ContactButton>{service.cta}</ContactButton>
        <Btn href="#approach" variant="ghost">
          How the work runs
        </Btn>
      </PageHero>

      {/* ── 02 Quick answer ─────────────────────────────────────────
          The passage an answer engine quotes. Written to stand alone: it names
          the platform and the service rather than saying "this", and it is one
          paragraph rather than four, because a fragment is what gets lifted. */}
      <Section id="what" labelledBy="what-title">
        <Shell>
          <Head
            label="Direct answer"
            id="what-title"
            lines={[service.quickAnswer.question]}
          />
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <Rise>
              <p className="m-0 max-w-[62ch] font-manrope text-[clamp(19px,2vw,26px)] font-light leading-[1.5] tracking-[-0.02em] text-ink/85">
                {service.quickAnswer.answer}
              </p>
            </Rise>
            <Rise delay={0.12}>
              <h3 className={LABEL}>Best suited for</h3>
              <ul className="m-0 mt-6 list-none border-t border-line p-0">
                {service.quickAnswer.bestFor.map((b) => (
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

      {/* ── 03 Boundary ─────────────────────────────────────────────
          What this page is not. Rendered rather than implied, because two
          adjacent service pages that never say where one ends will be treated
          as one page by a search engine, and the weaker of them disappears. */}
      {service.boundary ? (
        <Section id="boundary" labelledBy="boundary-title">
          <Shell>
            <Rise className="border-l-2 border-accent/60 py-2 pl-6 sm:pl-8">
              <h2 id="boundary-title" className={`${LABEL} mb-4 block text-accent-bright`}>
                What this page is not
              </h2>
              <p className="m-0 max-w-[68ch] font-manrope text-[clamp(17px,1.6vw,21px)] font-light leading-[1.6] text-ink/75">
                {service.boundary.body}
              </p>
              <p className="m-0 mt-6">
                <InlineLink href={service.boundary.href} lead>
                  {service.boundary.label}
                </InlineLink>
              </p>
            </Rise>
          </Shell>
        </Section>
      ) : null}

      {/* ── 04 Problems and their cost ──────────────────────────────
          Two columns: the symptom in the buyer's own words, then what it is
          costing. Leading with the capability instead is what turns a service
          page into a brochure. */}
      <Section id="problems" labelledBy="problems-title">
        <Shell>
          <Head
            label="The problem"
            id="problems-title"
            lines={['What is this', 'actually costing?']}
            lede="The symptom as the person carrying it would describe it, and the part that shows up in the numbers rather than in the ticket queue."
          />
          <ul className="m-0 list-none border-t border-line p-0">
            {service.problems.map((p, i) => (
              <li key={p.symptom} className="border-b border-line">
                <Rise
                  delay={Math.min(i, 3) * 0.06}
                  className="grid items-baseline gap-x-8 gap-y-3 py-7 sm:gap-x-10 sm:py-9 lg:grid-cols-[52px_minmax(0,1fr)_minmax(0,1.5fr)] lg:py-12"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-accent-bright"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="m-0 max-w-[26ch] font-manrope text-[clamp(20px,2vw,27px)] font-semibold leading-[1.22] tracking-[-0.025em]">
                    {p.symptom}
                  </h3>
                  <div>
                    <h4 className={`${LABEL} mb-3 block text-accent-bright`}>What it costs</h4>
                    <p className="m-0 max-w-[60ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/65">
                      {p.impact}
                    </p>
                  </div>
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── 05 Approach ─────────────────────────────────────────────
          Five steps with the reasoning attached. The reasoning is the part
          worth reading; a list of stage names is a process diagram, not an
          argument for hiring anyone. */}
      <Section id="approach" labelledBy="approach-title">
        <Shell>
          <Head
            label="Approach"
            id="approach-title"
            lines={['How the work', 'actually runs.']}
            lede="In this order, and the order is the opinion. Most of what goes wrong on this kind of engagement is a step taken before the one it depends on."
          />
          <ol className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-3">
            {service.approach.map((step, i) => (
              <li key={step.num} className="bg-[var(--bg)]">
                <Rise
                  delay={Math.min(i, 3) * 0.07}
                  className="flex h-full flex-col p-6 sm:p-8 lg:p-10"
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
                  <p className={`m-0 mt-4 max-w-[46ch] ${BODY}`}>{step.body}</p>
                </Rise>
              </li>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* ── 06 Capabilities ─────────────────────────────────────────
          Grouped, so the section reads as the shape of the scope rather than
          as twenty service cards competing for the same attention. */}
      <Section id="scope" labelledBy="scope-title">
        <Shell>
          <Head label="Scope" id="scope-title" lines={['What the work', 'covers.']} />
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2">
            {service.capabilities.map((c, i) => (
              <li key={c.group} className="bg-[var(--bg)]">
                <Rise
                  delay={Math.min(i, 3) * 0.06}
                  className="flex h-full flex-col p-6 sm:p-8 lg:p-10"
                >
                  <h3 className="m-0 font-manrope text-[19px] font-semibold leading-[1.25] tracking-[-0.02em]">
                    {c.group}
                  </h3>
                  <p className="m-0 mt-6 flex flex-wrap gap-2">
                    {c.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </p>
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── 07 Work ─────────────────────────────────────────────────
          Proof. Real builds only, resolved from ids, and the note says why
          these particular ones are on this page rather than any six. */}
      {cases.length ? (
        <Section id="work" labelledBy="work-title">
          <Shell>
            <Head
              label="Proof"
              id="work-title"
              lines={['Where this', 'has been done.']}
              lede={service.casesNote}
            />
            <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2">
              {cases.map((w, i) => (
                <li key={w.id} className="bg-[var(--bg)]">
                  <Rise
                    delay={Math.min(i, 3) * 0.07}
                    className="flex h-full flex-col p-6 sm:p-8 lg:p-10"
                  >
                    <p className={LABEL}>{w.category}</p>
                    <h3 className="m-0 mt-5 font-manrope text-[21px] font-semibold leading-[1.2] tracking-[-0.025em]">
                      {w.name}
                    </h3>
                    <p className={`m-0 mt-4 max-w-[46ch] ${BODY}`}>{w.summary}</p>
                    <p className="m-0 mt-6 flex flex-wrap gap-2">
                      {w.stack.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </p>
                    {w.outcome ? (
                      <p className="m-0 mt-auto pt-6 font-manrope text-[15px] font-semibold leading-[1.5] text-accent-bright">
                        {w.outcome}
                      </p>
                    ) : null}
                  </Rise>
                </li>
              ))}
            </ul>
            <Rise delay={0.3} className="mt-tail">
              <InlineLink href="/work/" lead>
                All selected work across Magento, Shopify and headless commerce
              </InlineLink>
            </Rise>
          </Shell>
        </Section>
      ) : null}

      {/* ── 08 Outcomes ─────────────────────────────────────────────
          A figure appears only when it is in the verified record, and it always
          carries the context saying where it came from. The closing note is not
          a disclaimer; it is the section refusing to over-claim. */}
      <Section id="outcomes" labelledBy="outcomes-title">
        <Shell>
          <Head label="Outcome" id="outcomes-title" lines={['What changes,', 'and what does not.']} />
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2">
            {service.outcomes.map((o, i) => (
              <li key={o.label} className="bg-[var(--bg)]">
                <Rise
                  delay={Math.min(i, 3) * 0.07}
                  className="flex h-full flex-col p-6 sm:p-8 lg:p-10"
                >
                  {o.metric ? (
                    <p className="m-0 font-manrope text-[clamp(26px,3vw,42px)] font-semibold leading-[1.05] tracking-[-0.03em] text-accent-bright">
                      {o.metric}
                    </p>
                  ) : null}
                  <h3
                    className={`m-0 font-manrope text-[19px] font-semibold leading-[1.25] tracking-[-0.02em] ${
                      o.metric ? 'mt-5' : ''
                    }`}
                  >
                    {o.label}
                  </h3>
                  <p className={`m-0 mt-4 max-w-[52ch] ${BODY}`}>{o.body}</p>
                  {o.context ? (
                    <div className="mt-auto pt-6">
                      <h4 className={`${LABEL} mb-2 block`}>Where this came from</h4>
                      <p className="m-0 font-manrope text-[14px] font-light leading-[1.6] text-ink/55">
                        {o.context}
                      </p>
                    </div>
                  ) : null}
                </Rise>
              </li>
            ))}
          </ul>
          <Rise delay={0.28} className="mt-tail border-t border-line pt-8">
            <p className={`m-0 max-w-[86ch] ${BODY}`}>{service.outcomesNote}</p>
          </Rise>
        </Shell>
      </Section>

      {/* ── 09 FAQ ──────────────────────────────────────────────────
          Open text, not an accordion. These are the passages an AI answer would
          quote, and FAQPage markup has to correspond to text a visitor can
          actually see. lib/schema.ts builds that markup from this same array,
          so the two cannot disagree. */}
      <Section id="questions" labelledBy="faq-title">
        <Shell>
          <Head label="Questions" id="faq-title" lines={['What people ask', 'before starting.']} />
          <dl className="m-0 border-t border-line">
            {service.faqs.map((f, i) => (
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

      {/* ── 10 Related ──────────────────────────────────────────────
          Contextual links, anchor text written for each pairing. A grid of
          service names would be a keyword list wearing a nav. */}
      <Section id="related" labelledBy="related-title">
        <Shell>
          <Head
            label="Related"
            id="related-title"
            lines={['Where this', 'connects.']}
            lede="These overlap on purpose. Most of these engagements arrive labelled as one problem and turn out to be the one next to it."
          />
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-3">
            {service.related.map((r, i) => (
              <li key={r.href} className="bg-[var(--bg)]">
                <Rise delay={Math.min(i, 3) * 0.06} className="flex h-full flex-col p-6 sm:p-8">
                  <h3 className="m-0 font-manrope text-[19px] font-semibold leading-[1.25] tracking-[-0.02em]">
                    <InlineLink href={r.href} lead>
                      {r.label}
                    </InlineLink>
                  </h3>
                  {r.note ? (
                    <p className="m-0 mt-4 max-w-[40ch] font-manrope text-[15px] font-light leading-[1.65] text-ink/55">
                      {r.note}
                    </p>
                  ) : null}
                </Rise>
              </li>
            ))}
          </ul>

          {posts.length ? (
            <Rise delay={0.24} className="mt-tail border-t border-line pt-8">
              <h3 className={LABEL}>The reasoning, written out</h3>
              <ul className="m-0 mt-2 list-none p-0">
                {posts.map((p) => (
                  <li key={p.slug} className="border-b border-line">
                    <Link
                      href={`/blog/${p.slug}/`}
                      className="group grid gap-x-10 gap-y-2 py-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto]"
                    >
                      <h4 className="m-0 max-w-[30ch] font-manrope text-[19px] font-semibold leading-[1.2] tracking-[-0.025em] transition-colors duration-200 group-hover:text-accent-bright">
                        {p.title}
                      </h4>
                      <p className="m-0 max-w-[52ch] font-manrope text-[15px] font-light leading-[1.65] text-ink/55">
                        {p.excerpt}
                      </p>
                      <p className={`${LABEL} self-center whitespace-nowrap`}>{p.readTime}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </Rise>
          ) : null}
        </Shell>
      </Section>

      {/* ── 11 Final CTA ────────────────────────────────────────────
          The closing question is the page's own. The primary action is the
          consultation; the secondary one goes back up to the platform, because
          the second most useful thing for someone unconvinced by this page is
          the argument for the platform itself. */}
      <Section id="next" labelledBy="next-title" tall>
        <Shell>
          <Marker label="Next step" />
          <Lines as="h2" id="next-title" lines={accentLastLine(service.finalHeadline)} />
          <Rise delay={0.16} className="mt-10 max-w-[62ch]">
            <p className={`m-0 ${BODY}`}>
              Describe what is actually in front of you and we will work out whether this is the
              right piece of work before anyone scopes it. That conversation is usually shorter
              than people expect, and it occasionally ends with me saying you do not need the
              project.
            </p>
          </Rise>
          <Rise delay={0.24} className="mt-10 flex flex-wrap gap-4">
            <ContactButton>{service.cta}</ContactButton>
            <Btn href={techHref(service.platform)} variant="ghost">
              {platform.label} overview
            </Btn>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
