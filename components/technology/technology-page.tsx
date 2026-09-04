import Link from 'next/link';
import { Page, PageHero } from '../chrome/page';
import { ContactButton } from '../homepage/contact-button';
import { Lines, Rise, type DisplayLine } from '../homepage/motion';
import { Btn, InlineLink, Marker, Section, Shell, Tag } from '../homepage/primitives';
import { WORK_ITEMS } from '../../lib/home';
import { POSTS } from '../../lib/posts';
import { technologySchema, type Crumb } from '../../lib/schema';
import { techHref, type Technology } from '../../lib/technology';
import { serviceHref, servicesFor } from '../../lib/platform-services';

/**
 * The technology landing page. One component, nine pages.
 *
 * ── The ground ──────────────────────────────────────────────────────────────────
 *
 * The page is paper end to end: white ground, near-black text, red accents.
 * That is `.yr-paper` from app/home.css, passed to `Page` as `scope` so it
 * lands on <main> and every section inherits it. The class is a token swap,
 * not a set of overrides: it redeclares --bg, --text, --rule and the accent
 * channels on its own scope, so every component inside inverts without knowing
 * it has.
 *
 * The red is the reason the swap is a class and not a palette rewrite here.
 * --accent stays #d71920 on both grounds because it is the brand. What cannot
 * stay is --accent-bright: #ee2a34 is drawn to lift off black and lands at
 * 3.4:1 on white, failing AA for the labels and marker numbers that use it, so
 * on paper it maps to #a30f15 at 7.6:1. Reach for a token and the contrast is
 * handled; hardcode a hex and it is not.
 *
 * So nothing in this file styles for a ground. There is no `.yr-paper .thing`
 * rule anywhere, and there should not be one. If a section needs a colour it
 * takes a token, which is what lets the whole page change ground by one prop.
 *
 * Section order:
 *
 *   01 Hero            the H1, the lede, two calls to action
 *   02 Quick answer    the extractable definition
 *   02b Services      the spokes, on the platforms that have them
 *   03 Problems        symptom, cost, then what the technology does
 *   04 Approach        the five stages, same five on every page
 *   05 Capabilities    grouped, not a wall of service cards
 *   06 AI              the signature section
 *   07 Architecture    the diagram
 *   08 Fit             good fit against think twice, same weight
 *   09 Comparison      how it reads against the alternatives
 *   10 Work            real builds only
 *   11 Outcomes        verified figures, with their context attached
 *   12 FAQ             open text, because the schema has to match it
 *   13 Related         the other pages worth a click
 *   14 Final CTA       the closing question
 *
 * ── Headings ───────────────────────────────────────────────────────────────
 *
 * One H1, in the hero. Every section opens an H2. Repeated items inside a
 * section are H3, and a named sub-part of one of those items is an H4:
 * "Opportunity" under a problem, "Where this came from" under an outcome, and
 * the article titles under Related. No level is skipped, on any of the nine
 * pages.
 *
 * It stops at H4 because the content stops at H4. The outline runs section,
 * item, named part of an item, and there is no fifth thing under the fourth to
 * describe. The one place that looks like it goes deeper, the <dl> of "What it
 * does" / "How it works" terms in the AI section, is a definition list rather
 * than a heading level, and <dt> may not contain heading content under the
 * HTML content model, so those terms stay <dt>. Adding H5 and H6 here would
 * mean inventing nesting the page does not have, which reads to a screen
 * reader as structure that is not there.
 */

/* Headlines land in the red.

   `Lines` paints a line in --accent when it is handed `{ text, accent: true }`,
   which is how BUSINESS carries the red on the homepage. Here it marks the
   last line, the same one the default `strongFrom` sets solid at 600, so the
   weight and the colour arrive together rather than on two different lines.
   Used by the H1 and by every section H2, so the red marks where a headline
   turns rather than appearing once at the top of the page.

   Doing it here rather than in lib/technology.ts keeps the authored headlines
   as plain strings and applies the treatment to all nine pages at once. */
const accentLastLine = (lines: readonly string[]): readonly DisplayLine[] =>
  lines.map((text, i) => (i === lines.length - 1 ? { text, accent: true } : text));

/* One mono label, shared by every eyebrow below, matching the pillar pages. */
const LABEL =
  'm-0 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/55';

/* One body size, so fourteen sections cannot drift into fourteen body sizes. */
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

export function TechnologyPage({ tech }: { tech: Technology }) {
  const crumbs: Crumb[] = [
    { name: 'Home', href: '/' },
    { name: tech.label, href: techHref(tech.slug) },
  ];

  /* Cross-links resolve from ids rather than being duplicated, so a case study
     renamed in lib/home.ts is renamed on every technology page at once. An id
     with no match is dropped rather than rendered as a broken row. */
  const cases = tech.cases
    .map((id) => WORK_ITEMS.find((w) => w.id === id))
    .filter((w): w is (typeof WORK_ITEMS)[number] => Boolean(w));

  const posts = tech.posts
    .map((s) => (POSTS[s] ? { slug: s, ...POSTS[s] } : null))
    .filter((p): p is { slug: string } & (typeof POSTS)[string] => Boolean(p));

  /* The service pages under this platform, or an empty list on the eight
     technologies that do not have them yet. */
  const services = servicesFor(tech.slug);

  return (
    <Page schema={technologySchema(tech, crumbs)} active="Expertise" scope="yr-paper">
      {/* ── 01 Hero ─────────────────────────────────────────────── */}
      <PageHero
        eyebrow={tech.eyebrow}
        lines={accentLastLine(tech.h1)}
        lede={tech.lede}
        crumbs={crumbs}
      >
        <ContactButton>{tech.cta}</ContactButton>
        <Btn href="#work" variant="ghost">
          View relevant work
        </Btn>
      </PageHero>

      {/* ── 02 Quick answer ─────────────────────────────────────────
          The passage an AI system quotes. It is written to stand alone, which
          is why it names the technology instead of saying "the platform", and
          why it is one paragraph rather than four. */}
      <Section id="what" labelledBy="what-title">
        <Shell>
          <Head label="Quick answer" id="what-title" lines={['What is', `${tech.name}?`]} />
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <Rise>
              <p className="m-0 max-w-[62ch] font-manrope text-[clamp(19px,2vw,26px)] font-light leading-[1.5] tracking-[-0.02em] text-ink/85">
                {tech.quickAnswer.answer}
              </p>
            </Rise>
            <Rise delay={0.12}>
              <h3 className={LABEL}>Best suited for</h3>
              <ul className="m-0 mt-6 list-none border-t border-line p-0">
                {tech.quickAnswer.bestFor.map((b) => (
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

      {/* ── 02b Services ────────────────────────────────────────────
          The spokes, on the platforms that have them, and nothing at all on
          the ones that do not. This sits directly under the quick answer
          rather than at the foot of the page for two reasons: a visitor who
          has just read what the platform is wants to know what can be done
          about it, and these are the pages the hub exists to pass authority
          to, which it does badly from below fourteen other sections.

          Anchor text is each service's own `label` plus the sentence under it,
          never the exact-match keyword repeated seven times. */}
      {services.length ? (
        <Section id="services" labelledBy="services-title">
          <Shell>
            <Head
              label="Services"
              id="services-title"
              lines={[`Working with`, `${tech.name}.`]}
              lede={`Seven pieces of ${tech.name} work, each with its own page, because they are bought separately and by different people. The one you need is rarely the one the problem is labelled as.`}
            />
            <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-3">
              {services.map((svc, i) => (
                <li key={svc.slug} className="bg-[var(--bg)]">
                  <Rise delay={Math.min(i, 3) * 0.06} className="flex h-full flex-col p-6 sm:p-8">
                    <h3 className="m-0 font-manrope text-[19px] font-semibold leading-[1.25] tracking-[-0.02em]">
                      <InlineLink href={serviceHref(svc.platform, svc.slug)} lead>
                        {svc.label}
                      </InlineLink>
                    </h3>
                    <p className="m-0 mt-4 max-w-[40ch] font-manrope text-[15px] font-light leading-[1.65] text-ink/55">
                      {svc.quickAnswer.bestFor[0]}, and the decisions underneath it.
                    </p>
                  </Rise>
                </li>
              ))}
            </ul>
          </Shell>
        </Section>
      ) : null}

      {/* ── 03 Business problems ────────────────────────────────────
          Three columns: the symptom as the reader would say it, why it costs
          something, and only then what the technology does about it. Leading
          with the capability is what turns a landing page into a brochure. */}
      <Section id="problems" labelledBy="problems-title">
        <Shell>
          <Head
            label="Business problems"
            id="problems-title"
            lines={['What are you', 'trying to solve?']}
            lede="The symptom as the person with the problem describes it, what it is costing, and where the technology actually helps."
          />
          <ul className="m-0 list-none border-t border-line p-0">
            {tech.problems.map((p, i) => (
              <li key={p.symptom} className="border-b border-line">
                <Rise
                  delay={Math.min(i, 3) * 0.06}
                  className="grid items-baseline gap-x-8 gap-y-3 py-7 sm:gap-x-10 sm:py-9 lg:grid-cols-[52px_minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,1.2fr)] lg:py-12"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-accent-bright"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="m-0 max-w-[24ch] font-manrope text-[clamp(20px,2vw,27px)] font-semibold leading-[1.22] tracking-[-0.025em]">
                    {p.symptom}
                  </h3>
                  <p className={`m-0 max-w-[52ch] ${BODY}`}>{p.body}</p>
                  <div>
                    <h4 className={`${LABEL} mb-3 block text-accent-bright`}>Opportunity</h4>
                    <p className="m-0 max-w-[52ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/65">
                      {p.opportunity}
                    </p>
                  </div>
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── 04 Approach ─────────────────────────────────────────────
          The same five stages on every technology page, because the method
          genuinely is the same one. Only the bodies change. */}
      <Section id="approach" labelledBy="approach-title">
        <Shell>
          <Head
            label="Approach"
            id="approach-title"
            lines={['The technology is only', 'part of the answer.']}
            lede="Five stages, in this order, on every engagement. Skipping the first one is the most expensive habit in this industry."
          />
          <ol className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-3">
            {tech.approach.map((stage, i) => (
              <li key={stage.num} className="bg-[var(--bg)]">
                <Rise
                  delay={Math.min(i, 3) * 0.07}
                  className="flex h-full flex-col p-6 sm:p-8 lg:p-10"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs font-medium leading-none tracking-[0.2em] text-accent-bright"
                  >
                    {stage.num}
                  </span>
                  <h3 className="m-0 mt-6 font-manrope text-[clamp(20px,2vw,28px)] font-semibold uppercase leading-[1.15] tracking-[-0.02em]">
                    {stage.title}
                  </h3>
                  <p className="m-0 mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">
                    {stage.covers.map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </p>
                  <p className={`m-0 mt-6 max-w-[52ch] ${BODY}`}>{stage.body}</p>
                </Rise>
              </li>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* ── 05 Capabilities ─────────────────────────────────────────
          Grouped by what they are for. Twenty flat service cards is the
          format this deliberately is not. */}
      <Section id="capabilities" labelledBy="capabilities-title">
        <Shell>
          <Head
            label="Capabilities"
            id="capabilities-title"
            lines={['What can be built', `with ${tech.name}?`]}
          />
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-3">
            {tech.capabilities.map((group, i) => (
              <li key={group.group} className="bg-[var(--bg)]">
                <Rise delay={Math.min(i, 3) * 0.07} className="flex h-full flex-col p-6 sm:p-8">
                  <h3 className="m-0 font-manrope text-[19px] font-semibold uppercase leading-[1.2] tracking-[-0.01em]">
                    {group.group}
                  </h3>
                  <ul className="m-0 mt-6 list-none p-0">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-4 border-t border-line py-3 font-manrope text-[15px] font-light leading-[1.6] text-ink/55"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[10px] h-px w-3 shrink-0 bg-accent/60"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── 06 AI ───────────────────────────────────────────────────
          The signature section. Five fields per application, and the last two
          are the ones that make it worth reading: where a human still checks,
          and what it does not do. An entry that cannot fill those two does not
          belong on the page. */}
      <Section id="ai" labelledBy="ai-title">
        <Shell>
          <Head
            label="AI and technology"
            id="ai-title"
            lines={['Where AI meets', `${tech.name}.`]}
            lede="What each application does, how it works, where the value is, where a person still reviews it, and what it will not do."
          />
          <ul className="m-0 list-none border-t border-line p-0">
            {tech.ai.map((a, i) => (
              <li key={a.title} className="border-b border-line">
                <Rise
                  delay={Math.min(i, 3) * 0.06}
                  className="grid gap-x-10 gap-y-6 py-9 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:py-14"
                >
                  <div>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-accent-bright"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="m-0 mt-5 max-w-[20ch] font-manrope text-[clamp(21px,2.1vw,29px)] font-semibold leading-[1.15] tracking-[-0.025em]">
                      {a.title}
                    </h3>
                  </div>
                  <dl className="m-0 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                    {[
                      ['What it does', a.what],
                      ['How it works', a.how],
                      ['Where the value is', a.value],
                      ['Where a human reviews', a.human],
                    ].map(([term, def]) => (
                      <div key={term}>
                        <dt className={LABEL}>{term}</dt>
                        <dd className={`m-0 mt-3 max-w-[52ch] ${BODY}`}>{def}</dd>
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <dt className={`${LABEL} text-accent-bright`}>What it will not do</dt>
                      <dd className="m-0 mt-3 max-w-[74ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/70">
                        {a.limit}
                      </dd>
                    </div>
                  </dl>
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── 07 Architecture ─────────────────────────────────────────
          A stack read top to bottom, drawn with rules and type rather than as
          an image, so it is selectable, translatable, indexable and legible on
          a phone. An <ol> because the order is the whole content. */}
      <Section id="architecture" labelledBy="architecture-title">
        <Shell>
          <Head
            label="Architecture"
            id="architecture-title"
            lines={['Under the', 'technology.']}
            lede="How the pieces sit together, top to bottom. Only technologies actually used appear here."
          />
          <ol className="m-0 list-none border-t border-line p-0">
            {tech.architecture.map((layer, i) => (
              <li key={layer.name} className="border-b border-line">
                <Rise
                  delay={Math.min(i, 4) * 0.05}
                  className="grid items-baseline gap-x-8 gap-y-3 py-6 sm:gap-x-10 lg:grid-cols-[52px_minmax(0,0.7fr)_minmax(0,1.1fr)_minmax(0,1fr)] lg:py-8"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-accent-bright"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="m-0 font-manrope text-[clamp(18px,1.8vw,24px)] font-semibold uppercase leading-[1.2] tracking-[-0.02em]">
                    {layer.name}
                  </h3>
                  <p className={`m-0 max-w-[52ch] ${BODY}`}>{layer.detail}</p>
                  <p className="m-0 flex flex-wrap gap-2">
                    {layer.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </p>
                </Rise>
              </li>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* ── 08 Fit ──────────────────────────────────────────────────
          The two halves are deliberately the same size. Sizing the
          qualification smaller than the pitch is how a point of view quietly
          turns back into a sales page. */}
      <Section id="fit" labelledBy="fit-title">
        <Shell>
          <Head
            label="When to use it"
            id="fit-title"
            lines={[`Is ${tech.name} right`, 'for your business?']}
          />
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
            <Rise>
              <h3 className={LABEL}>Good fit</h3>
              <ul className="m-0 mt-6 list-none border-t border-line p-0">
                {tech.fit.goodFit.map((g) => (
                  <li
                    key={g}
                    className="flex gap-4 border-b border-line py-5 font-manrope text-[16px] font-light leading-[1.65] text-ink/60"
                  >
                    <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-accent/60" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </Rise>
            <Rise delay={0.12}>
              <h3 className={`${LABEL} text-accent-bright`}>Think twice</h3>
              <ul className="m-0 mt-6 list-none border-t border-line p-0">
                {tech.fit.thinkTwice.map((t) => (
                  <li
                    key={t}
                    className="flex gap-4 border-b border-line py-5 font-manrope text-[16px] font-light leading-[1.65] text-ink/60"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[11px] h-px w-3 shrink-0 bg-accent-bright/70"
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Rise>
          </div>
        </Shell>
      </Section>

      {/* ── 09 Comparison ───────────────────────────────────────────
          Stays on the paper band: it is the second half of the same decision.
          The table scrolls inside its own container rather than making the
          page scroll sideways on a phone. */}
      <Section id="comparison" labelledBy="comparison-title">
        <Shell>
          <Head
            label="Comparison"
            id="comparison-title"
            lines={['Which technology', 'makes sense?']}
            lede={tech.comparison.note}
          />
          <Rise className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                {tech.comparison.columns.join(', ')} compared across eight criteria
              </caption>
              <thead>
                <tr className="border-y border-line">
                  <th scope="col" className={`${LABEL} py-5 pr-6 align-bottom`}>
                    Criterion
                  </th>
                  {tech.comparison.columns.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`py-5 pr-6 align-bottom font-manrope text-[17px] font-semibold tracking-[-0.02em] ${
                        i === 0 ? 'text-accent-bright' : 'text-ink/70'
                      }`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tech.comparison.rows.map((row) => (
                  <tr key={row.criterion} className="border-b border-line">
                    <th
                      scope="row"
                      className="py-5 pr-6 align-top font-manrope text-[15px] font-medium leading-[1.5] text-ink/75"
                    >
                      {row.criterion}
                    </th>
                    {row.cells.map((cell, i) => (
                      <td
                        key={row.criterion + String(i)}
                        className={`py-5 pr-6 align-top font-manrope text-[15px] font-light leading-[1.6] ${
                          i === 0 ? 'text-ink/80' : 'text-ink/55'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Rise>
          <Rise delay={0.2} className="mt-tail grid gap-4 md:grid-cols-3">
            {tech.comparison.links.map((l) => (
              <p key={l.href} className="m-0">
                <InlineLink href={l.href} lead>
                  {l.label}
                </InlineLink>
              </p>
            ))}
          </Rise>
        </Shell>
      </Section>

      {/* ── 10 Relevant work ────────────────────────────────────────
          Only builds genuinely relevant to this page, resolved by id. If the
          record has nothing relevant, the section does not render rather than
          being filled with something adjacent. */}
      {cases.length ? (
        <Section id="work" labelledBy="work-title">
          <Shell>
            <Head
              label="Relevant work"
              id="work-title"
              lines={['Real work.', 'Real systems.']}
              lede={tech.casesNote}
            />
            <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {cases.map((w, i) => (
                <li key={w.id} className="flex">
                  <Rise
                    delay={Math.min(i, 3) * 0.07}
                    className="group relative flex w-full flex-col border border-ink/15 bg-surface transition-[transform,border-color] duration-300 hover:-translate-y-2 hover:border-accent/60 motion-reduce:hover:translate-y-0"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-ink/10 bg-surface">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={w.img}
                        alt={w.alt}
                        width={w.imgW}
                        height={w.imgH}
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:group-hover:scale-100"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className={`${LABEL} text-accent-bright`}>{w.category}</span>
                      <h3 className="m-0 mt-4 font-manrope text-[21px] font-semibold leading-[1.15] tracking-[-0.02em]">
                        <a
                          href={`${w.href}#${w.id}`}
                          className="transition-colors duration-200 after:absolute after:inset-0 after:content-[''] group-hover:text-accent-bright"
                        >
                          {w.name}
                        </a>
                      </h3>
                      <p className="m-0 mt-4 font-manrope text-[15px] font-light leading-[1.65] text-ink/55">
                        {w.summary}
                      </p>
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
                    </div>
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

      {/* ── 11 Business outcomes ────────────────────────────────────
          A figure only appears here when it is in the verified record, and it
          always carries the context that says where it came from. The closing
          note is not a disclaimer, it is the section doing its job. */}
      <Section id="outcomes" labelledBy="outcomes-title">
        <Shell>
          <Head
            label="Business outcomes"
            id="outcomes-title"
            lines={['What better technology', 'can change.']}
          />
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2">
            {tech.outcomes.map((o, i) => (
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
            <p className={`m-0 max-w-[86ch] ${BODY}`}>{tech.outcomesNote}</p>
          </Rise>
        </Shell>
      </Section>

      {/* ── 12 FAQ ──────────────────────────────────────────────────
          Open text, not an accordion. These are the passages an AI answer
          would quote, and FAQPage markup has to correspond to text a visitor
          can actually see. lib/schema.ts builds that markup from this same
          array, so the two cannot disagree. */}
      <Section id="questions" labelledBy="faq-title">
        <Shell>
          <Head label="FAQ" id="faq-title" lines={['Frequently asked', 'questions.']} />
          <dl className="m-0 border-t border-line">
            {tech.faqs.map((f, i) => (
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

      {/* ── 13 Related, and the writing behind it ───────────────────
          Contextual links with the anchor text written for each pairing. A
          block of technology names would be a keyword list wearing a nav. */}
      <Section id="related" labelledBy="related-title">
        <Shell>
          <Head
            label="Related"
            id="related-title"
            lines={['Keep', 'exploring.']}
            lede="These overlap on purpose. A platform decision is an architecture question first, and an AI project is usually a process question first."
          />
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:grid-cols-3">
            {tech.related.map((r, i) => (
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

      {/* ── 14 Final CTA ────────────────────────────────────────────
          Back on black, and the closing question is the page's own rather than
          a generic one. The footer's call to action sits below this on every
          route; this one carries the technology's wording. */}
      <Section id="next" labelledBy="next-title" tall>
        <Shell>
          <Marker label="Next step" />
          <Lines as="h2" id="next-title" lines={accentLastLine(tech.finalHeadline)} />
          <Rise delay={0.16} className="mt-10 max-w-[62ch]">
            <p className={`m-0 ${BODY}`}>
              Let us look at your business model, the systems you already run and where you are
              trying to get to, before choosing the technology. That conversation is usually
              shorter than people expect, and it occasionally ends with me saying you do not need
              the project.
            </p>
          </Rise>
          <Rise delay={0.24} className="mt-10 flex flex-wrap gap-4">
            <ContactButton>{tech.cta}</ContactButton>
            <Btn href="/work/" variant="ghost">
              View relevant work
            </Btn>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
