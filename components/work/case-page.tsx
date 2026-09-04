import Link from 'next/link';
import { Page, PageHero } from '../chrome/page';
import { ContactButton } from '../homepage/contact-button';
import { Lines, Rise, type DisplayLine } from '../homepage/motion';
import { Btn, InlineLink, Marker, Section, Shell, Tag } from '../homepage/primitives';
import { CASES, type CaseStudy } from '../../lib/brand';
import { POSTS } from '../../lib/posts';
import { caseStudySchema, type Crumb } from '../../lib/schema';

/**
 * A case-study page. One component, six pages.
 *
 * ── The two rules this page is built around ────────────────────────────────
 *
 * 1. **No client is named.** Every one of the six is described by what was
 *    built, and `public/llms.txt` carries a line telling a model not to infer
 *    the brands either. The cover images were renamed for the same reason,
 *    because a filename ships in the `src` attribute. Nothing on this page may
 *    reintroduce a name that the rest of the site went to some trouble to
 *    remove.
 *
 * 2. **Five of the six have no measured outcome, and say so.** Only the
 *    manufacturer platform has a published figure. The `outcome` field is
 *    absent on the other five and the page renders a different section for
 *    them rather than a placeholder, an estimate or a rounded-up number. That
 *    is the whole argument of WORK_NOTE on /work/, applied to the detail pages:
 *    five plausible percentages would cost more credibility than the one real
 *    figure buys.
 *
 * ── Why the page is short ──────────────────────────────────────────────────
 *
 * Because the record is short. `challenge`, `approach` and `technology` are
 * what lib/brand.ts can support, and inventing a timeline, a team size or a
 * constraint to fill a longer template is exactly what CONTENT-PRINCIPLES.md
 * forbids. A brief page that is entirely true is worth more here than a full
 * one that is partly furniture.
 *
 * Section order: hero, challenge, approach, technology, outcome, related, next.
 * One H1, every section opens an H2, repeated items are H3.
 */

const accentLastLine = (lines: readonly string[]): readonly DisplayLine[] =>
  lines.map((text, i) => (i === lines.length - 1 ? { text, accent: true } : text));

const LABEL =
  'm-0 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/55';

const BODY = 'font-manrope text-[17px] font-light leading-[1.7] text-ink/55';

function Head({ label, id, lines }: { label: string; id: string; lines: readonly string[] }) {
  return (
    <>
      <Marker label={label} />
      <div className="mb-8 sm:mb-12 lg:mb-14">
        <Lines as="h2" id={id} lines={accentLastLine(lines)} />
      </div>
    </>
  );
}

export function CasePage({ study }: { study: CaseStudy }) {
  const path = `/work/${study.id}/`;
  const crumbs: Crumb[] = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work/' },
    { name: study.name, href: path },
  ];

  const posts = study.posts
    .map((s) => (POSTS[s] ? { slug: s, ...POSTS[s] } : null))
    .filter((p): p is { slug: string } & (typeof POSTS)[string] => Boolean(p));

  /* The other five, for the foot of the page. Resolved from the same array the
     /work/ index renders, so a case renamed there is renamed here too. */
  const others = CASES.filter((c) => c.id !== study.id).slice(0, 3);

  return (
    <Page schema={caseStudySchema(study, crumbs)} active="Work" scope="yr-paper">
      {/* ── 01 Hero ─────────────────────────────────────────────── */}
      <PageHero
        eyebrow={`Case study | ${study.industry}`}
        lines={accentLastLine([study.name])}
        lede={study.challenge}
        crumbs={crumbs}
      >
        <ContactButton>Discuss a build like this</ContactButton>
        <Btn href="/work/" variant="ghost">
          All six builds
        </Btn>
      </PageHero>

      {/* ── 02 The cover ────────────────────────────────────────────
          Sized and lazy-loaded like every other image on the site. The alt text
          describes the build rather than naming the brand, matching the rename
          in d00fd91. */}
      <Section id="cover" labelledBy="cover-title">
        <Shell>
          <h2 id="cover-title" className="sr-only">
            {study.name}
          </h2>
          <Rise>
            <figure className="m-0 overflow-hidden border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={study.img}
                alt={study.alt}
                width={study.imgW}
                height={study.imgH}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </figure>
          </Rise>
        </Shell>
      </Section>

      {/* ── 03 The challenge ────────────────────────────────────── */}
      <Section id="challenge" labelledBy="challenge-title">
        <Shell>
          <Head label="The challenge" id="challenge-title" lines={['What the business', 'was up against.']} />
          <Rise>
            <p className="m-0 max-w-[62ch] font-manrope text-[clamp(19px,2vw,26px)] font-light leading-[1.5] tracking-[-0.02em] text-ink/85">
              {study.challenge}
            </p>
          </Rise>
        </Shell>
      </Section>

      {/* ── 04 The approach ────────────────────────────────────────
          The decision, not the deliverable. Every one of these six is on the
          site because of the choice made before the code, which is what the
          /work/ intro says the six are for. */}
      <Section id="approach" labelledBy="approach-title">
        <Shell>
          <Head label="The approach" id="approach-title" lines={['The decision', 'inside it.']} />
          <Rise>
            <p className={`m-0 max-w-[70ch] ${BODY}`}>{study.approach}</p>
          </Rise>
        </Shell>
      </Section>

      {/* ── 05 Technology ──────────────────────────────────────── */}
      <Section id="technology" labelledBy="technology-title">
        <Shell>
          <Head label="Technology" id="technology-title" lines={['What it', 'was built on.']} />
          <Rise>
            <p className="m-0 flex flex-wrap gap-2">
              {study.technology.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </p>
          </Rise>
        </Shell>
      </Section>

      {/* ── 06 Outcome ──────────────────────────────────────────────
          Two states, and the second one is the point. Only the manufacturer
          platform has a published measurement; the other five render the note
          instead of a number, which is the same position /work/ takes and the
          reason it is credible there. */}
      <Section id="outcome" labelledBy="outcome-title">
        <Shell>
          <Head label="Outcome" id="outcome-title" lines={['What changed,', 'and what is not claimed.']} />
          {study.outcome ? (
            <Rise>
              <p className="m-0 font-manrope text-[clamp(26px,3vw,42px)] font-semibold leading-[1.1] tracking-[-0.03em] text-accent-bright">
                {study.outcome}
              </p>
              <p className={`m-0 mt-6 max-w-[62ch] ${BODY}`}>
                This is the one engagement of the six with a published measured result, which is
                why it is the only one showing a number.
              </p>
            </Rise>
          ) : (
            <Rise>
              <p className={`m-0 max-w-[68ch] ${BODY}`}>
                No measured result is published for this build. One of the six has one, and it is
                the only one that shows a figure. The rest say what was built and stop there,
                which is less impressive and considerably more useful than five plausible
                percentages.
              </p>
            </Rise>
          )}
        </Shell>
      </Section>

      {/* ── 07 Related ─────────────────────────────────────────────
          The pages this build actually used, authored per case rather than
          guessed from the technology tags. */}
      <Section id="related" labelledBy="related-title">
        <Shell>
          <Head label="Related" id="related-title" lines={['The thinking', 'behind it.']} />
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-3">
            {study.related.map((r, i) => (
              <li key={r.href} className="bg-[var(--bg)]">
                <Rise delay={Math.min(i, 3) * 0.06} className="flex h-full flex-col p-6 sm:p-8">
                  <h3 className="m-0 font-manrope text-[18px] font-semibold leading-[1.25] tracking-[-0.02em]">
                    <InlineLink href={r.href} lead>
                      {r.label}
                    </InlineLink>
                  </h3>
                </Rise>
              </li>
            ))}
          </ul>

          {posts.length ? (
            <Rise delay={0.2} className="mt-tail border-t border-line pt-8">
              <h3 className={LABEL}>Written out in full</h3>
              <ul className="m-0 mt-2 list-none p-0">
                {posts.map((p) => (
                  <li key={p.slug} className="border-b border-line">
                    <Link
                      href={`/insights/${p.slug}/`}
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

      {/* ── 08 The other builds ─────────────────────────────────── */}
      <Section id="more" labelledBy="more-title">
        <Shell>
          <Head label="More work" id="more-title" lines={['The other', 'builds.']} />
          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-3">
            {others.map((c, i) => (
              <li key={c.id} className="bg-[var(--bg)]">
                <Rise delay={Math.min(i, 3) * 0.06} className="flex h-full flex-col p-6 sm:p-8">
                  <p className={LABEL}>{c.industry}</p>
                  <h3 className="m-0 mt-4 font-manrope text-[19px] font-semibold leading-[1.25] tracking-[-0.02em]">
                    <InlineLink href={`/work/${c.id}/`} lead>
                      {c.name}
                    </InlineLink>
                  </h3>
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── 09 Next ─────────────────────────────────────────────── */}
      <Section id="next" labelledBy="next-title" tall>
        <Shell>
          <Marker label="Next step" />
          <Lines
            as="h2"
            id="next-title"
            lines={accentLastLine(['Have a problem', 'shaped like this one?'])}
          />
          <Rise delay={0.16} className="mt-10 max-w-[62ch]">
            <p className={`m-0 ${BODY}`}>
              Describe what is in front of you and what it is costing. Thirty minutes is usually
              enough to name the decision underneath it, and that conversation occasionally ends
              with me saying you do not need the project.
            </p>
          </Rise>
          <Rise delay={0.24} className="mt-10 flex flex-wrap gap-4">
            <ContactButton>Book a 30-minute consultation</ContactButton>
            <Btn href="/hire/" variant="ghost">
              How engagements work
            </Btn>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
