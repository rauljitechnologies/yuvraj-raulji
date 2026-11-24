import Link from 'next/link';
import {
  ArrowRight,
  Layers,
  Rocket,
  ShoppingCart,
  Sparkles,
  Store,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { coverSrcSet, WRITING } from '../../lib/brand';
import { CAREER } from '../../lib/career';
import { INTRO } from '../../lib/identity';
import { FEATURED_SERVICE_PAGES, servicePageHref } from '../../lib/service-pages';
import {
  APPROACH,
  CONTACT,
  FAQS,
  HOME_FAQ_COUNT,
  PROBLEMS,
  PROJECTS,
  RESULT_CHIPS,
  STATS,
} from '../../lib/homepage';
import { Button, Card, Container, Eyebrow, Section, SectionHeading } from '../ui';
import { Rv, RvGroup, RvItem } from './rv';

/**
 * ══════════════════════════════════════════════════════════════════════════
 * THE HOMEPAGE, SECTIONS 2 TO 9
 * ══════════════════════════════════════════════════════════════════════════
 *
 * Section 1, the hero, is in hero.tsx. The order and the reasoning are in
 * app/page.tsx, which is the only place the page is assembled.
 *
 * ── Nineteen sections became nine ────────────────────────────────────────
 *
 * The page carried nineteen sections and one marquee. Every one of them was
 * answering a real question and the aggregate was still wrong: a buyer
 * scrolling it passed the problems, five figures, a four-area capability
 * matrix, a 32-item technology grid, an AI position, six case studies, a
 * solid-red belief band, nine reasons to work with him, a five-step process,
 * an employment record, a certification, an agency-alternative argument, the
 * writing, fourteen questions and a form. Nothing was redundant and
 * everything was too much.
 *
 * Nothing was deleted. Every section that left the homepage is now a section
 * on the page that question belongs to, and the content itself never moved at
 * all: it lives in lib/, which the pages read. The map is in app/page.tsx.
 *
 * ── What each section here is doing ──────────────────────────────────────
 *
 *   2  ProofStrip        the claim in the hero, evidenced, five figures
 *   3  SelectedWork      three builds, as a grid
 *   4  Services          six things that can be bought
 *   5  Problems          six symptoms, in the reader's words
 *   6  AboutExperience   who is behind it, and the record
 *   7  Process           how an engagement runs
 *   8  Insights          three pieces of writing
 *   9  FaqContact        six questions, then the close
 *
 * ── Rendering ───────────────────────────────────────────────────────────
 *
 * Every section is a server component reading module-scope data, so the page
 * prerenders to static HTML at build time (next.config.mjs sets
 * `output: 'export'`). The JavaScript the page ships is the Motion scroll
 * wrappers, the contact form, the header and the floating button.
 *
 * ── What none of these write ────────────────────────────────────────────
 *
 * No vertical padding, no gutters, no max width, no font family, no font
 * size, no colour, no card radius or border or padding. All of that is
 * `Section`, `Container`, `SectionHeading` and `Card` in components/ui.
 * See the contract at the top of that file.
 */

/* ══════════════════════════════════════════════════════════════════════════
   2 — PROOF STRIP.  DARK.
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * Five figures in one row, directly under the hero.
 *
 * Dark, and it is the second of the two dark sections at the top of the page.
 * The alternation rule in components/ui/index.tsx says why: the hero makes
 * the claim and this evidences it, so they are one opening unit and a band
 * boundary between them would split a single argument in half. It used to be
 * the page's first light band, which is exactly that split.
 *
 * Every figure comes from `STATS`, which derives from `CAREER_STATS` in
 * lib/career.ts: the one place a verified number and the context that
 * justifies it are written together. Nothing here types a figure of its own,
 * and the hero's three-stat row is a slice of the same array.
 *
 * `grid-cols-2` then five columns from md. Five items on a 375px screen in
 * one row gives each 60px, which cannot hold "Projects Delivered"; two
 * columns with the fifth spanning both is the honest phone layout.
 *
 * A `<dl>`, because each item is a value and the thing it measures. The
 * `<dt>` is visible here, unlike in the hero's compressed version.
 *
 * The heading is `sr-only`. The figures are the content and a visible heading
 * over them would be a label on a label; the document outline still needs the
 * h2 so the section is not an unnamed region.
 */
export function ProofStrip() {
  return (
    <Section id="proof" labelledBy="proof-title" className="border-t border-line">
      <Container>
        <h2 id="proof-title" className="sr-only">
          The record, in five figures
        </h2>

        {/*
          A bento strip: five tiles, each a surface with its own hairline,
          rather than five bare figures on the band. The tile is what makes it
          a strip — before this the five sat in a grid with nothing around
          them, so at 1440 they read as four columns of text and a gap.

          2 columns on a phone with the fifth spanning both, 5 across from
          `md`. The span is on the LAST tile rather than the first because a
          5-item list in a 2-column grid leaves its orphan at the end.
        */}
        <RvGroup
          as="dl"
          className="m-0 grid grid-cols-2 gap-4 md:grid-cols-5"
          each={0.06}
        >
          {STATS.map((stat) => (
            /*
              `RvItem` renders a <div>, which is the only wrapper a <dl> may
              carry around a dt/dd group. The link is INSIDE the <dd> and
              stretched over the tile with `absolute inset-0`, rather than
              wrapping the pair.

              That is not a style preference. An <a> between the <dl> and its
              dt/dd is invalid: Lighthouse failed both `definition-list` and
              `dlitem` on this one element, which was the whole of the
              homepage's accessibility gap (93 against a 95 target). Moving the
              <a> inside the <dd> and stretching it keeps the figure, the
              label, the semantics and the full-tile hit area all at once.
            */
            <RvItem
              key={stat.label}
              className="group relative flex flex-col justify-between rounded border border-line bg-surface p-6 transition-[border-color,transform] duration-200 ease-out hover:border-accent hover:-translate-y-[2px] motion-reduce:hover:translate-y-0 max-md:last:col-span-2"
            >
              <StatBody stat={stat} />
            </RvItem>
          ))}
        </RvGroup>
      </Container>
    </Section>
  );
}

function StatBody({ stat }: { stat: (typeof STATS)[number] }) {
  return (
    <>
      {/* Label first in the DOM because <dt> is the term and <dd> is the
          value, and `flex-col-reverse` on the tile is what puts the figure
          on top visually. Reversing with CSS rather than with markup keeps
          the list valid and keeps a screen reader reading "Years
          Experience, 9+" rather than "9+, Years Experience". */}
      <dt className="order-2 mt-2 font-mono text-eyebrow font-medium uppercase text-ink-muted">
        {stat.label}
      </dt>
      <dd
        className={`order-1 m-0 font-heading text-h2 font-extrabold leading-none text-ink transition-colors duration-200 ${
          stat.href ? 'group-hover:text-accent-bright' : ''
        }`}
      >
        {stat.value}
        {/* The figure links to the page that evidences it where there is one,
            which is four of the five. A number a reader cannot check is a
            number they discount. Stretched over the whole tile, so the target
            is the tile and not the glyphs. */}
        {stat.href ? (
          <Link
            href={stat.href}
            className="absolute inset-0"
            aria-label={`${stat.value} ${stat.label}`}
          />
        ) : null}
      </dd>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   3 — SELECTED WORK.  LIGHT.
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * Three case studies, as a three-column grid.
 *
 * ── What this replaced: the carousel ────────────────────────────────────
 *
 * Six case studies in a `<ul className="flex overflow-x-auto">` with
 * `scroll-snap-type: x_mandatory`, cards at `flex-[0_0_min(300px,82vw)]`
 * widening to `clamp(300px,34vw,480px)`, and a literal "Scroll →" hint
 * underneath it. Four things were wrong with it, and section 4 of
 * REDESIGN_AUDIT.md has the detail:
 *
 *   THE SCROLLBAR WAS VISIBLE. It was the only `overflow-x-auto` scroller on
 *   the site that did not suppress its own scrollbar: `.scrollbar-hide` in
 *   globals.css, `.yr-rail` and `.yr-scroll-x` in home.css and an inline
 *   triple on the nav's phone row all existed, and this element used none of
 *   them. On Windows and Linux Chrome, and anywhere "always show scrollbars"
 *   is set, that is a permanent 15px bar between the cards and the link under
 *   them.
 *
 *   IT WAS TOUCH-ONLY. Snap points, no buttons, no keyboard affordance, on
 *   six of the most important links on the page.
 *
 *   THE RIGHT GUTTER COLLAPSED. `px-5 … lg:px-12` was on the scroll
 *   container itself, so the padding-right disappeared at the end of the
 *   scroll and the last card finished flush against the edge.
 *
 *   IT LEAKED HORIZONTAL SCROLL. The comment on `RuleLink` in primitives.tsx
 *   records an `sr-only` label inside this rail escaping its `overflow-x`,
 *   landing 1600px into the document, and giving the whole page 1250px of
 *   horizontal scroll on a phone with nothing drawn in it.
 *
 * A grid has none of those properties. Three columns on desktop, one on
 * mobile, no overflow in any axis at any width.
 *
 * ── Three, not six ──────────────────────────────────────────────────────
 *
 * `PROJECTS` still holds all six and /work/ still renders all six. The three
 * here are the first three, which is the order the array is already in, and
 * the link under the grid goes to the rest.
 *
 * ── The image ───────────────────────────────────────────────────────────
 *
 * 16:9 via `aspect-[16/9]`, from the brief. It was `aspect-[4/3]`. The ratio
 * is on the wrapper rather than the image, with the image `absolute inset-0
 * object-cover`, so the box is reserved before the file arrives and the card
 * cannot shift when it does — that is the CLS term on this section.
 *
 * `coverSrcSet` and the `sizes` string are written against the grid cell: one
 * third of a 1200px container minus the gaps, which is 368px at the ceiling.
 */
export function SelectedWork() {
  const shown = PROJECTS.slice(0, 3);

  return (
    <Section id="work" labelledBy="work-title" tone="light">
      <Container>
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          emphasis="Real systems."
          intro="Three builds, and the decision inside each one. The interesting part was the choice made before the code."
        >
          Real work.
        </SectionHeading>

        {/*
          A bento: one large card and two small, per the brief.

          `md:grid-cols-3` with the first card spanning two columns and both
          rows, so the two small ones stack beside it. One column on a phone,
          where a 2:1 bento is just two different card widths on top of each
          other.

          `md:auto-rows-fr` makes the two right-hand rows equal, which is what
          keeps the small pair aligned with the large card's top and bottom
          edges instead of floating.
        */}
        <RvGroup
          as="ul"
          className="m-0 mt-12 grid list-none gap-4 p-0 md:auto-rows-fr md:grid-cols-3"
          each={0.06}
        >
          {shown.map((project, i) => (
            <RvItem
              key={project.id}
              as="li"
              className={`h-full ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              {/*
                The whole card is the link, so the target is the card and not
                a 20px line of text at the bottom of it. `Card` supplies the
                radius, the hairline, `p-6 md:p-8` and the red hover border;
                `h-full` plus the column flex is what makes the three cards in
                a row the same height with their links aligned.
              */}
              <Link href={`/work/${project.id}/`} className="group block h-full" data-event="project_view">
                <Card interactive className="!p-0">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t border-b border-line bg-surface">
                    {project.cover ? (
                      <img
                        src={project.cover}
                        srcSet={coverSrcSet(project.cover)}
                        sizes="(min-width: 768px) 368px, calc(100vw - 48px)"
                        alt={`${project.name} case study cover`}
                        width={1200}
                        height={675}
                        loading="lazy"
                        decoding="async"
                        /* In colour, and it zooms on hover. The zoom is on
                           the image inside an `overflow-hidden` box, so the
                           card's own edges do not move: `scale` on the card
                           would reflow its neighbours in the grid. */
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                      />
                    ) : (
                      /* The ghost tile, for a case study with no cover in
                         public/assets/case-covers. Decorative. */
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 [background-image:linear-gradient(rgb(var(--text-rgb)/.05)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--text-rgb)/.05)_1px,transparent_1px)] [background-size:36px_36px]"
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="m-0 font-mono text-eyebrow font-medium uppercase text-accent-bright">
                        {project.industry}
                      </p>

                      {/*
                        The measurable result chip.

                        `RESULT_CHIPS` holds PLACEHOLDERS and the asterisk
                        says so on the card, because a performance figure on
                        a case study is the most quotable claim on this page
                        and CONTENT-PRINCIPLES.md section 1 treats an
                        unsupported figure as an invented one. The chip keeps
                        the design honest in the meantime: the layout is real,
                        the number is marked.

                        To make one real, move the value into the project's
                        entry in lib/brand.ts and delete its key from
                        RESULT_CHIPS. The marker disappears with the key.
                      */}
                      {RESULT_CHIPS[project.id] ? (
                        <span
                          title="Placeholder figure, not yet verified"
                          className="inline-flex items-center gap-1 rounded-full border border-accent/40 px-3 py-1 font-mono text-eyebrow font-medium uppercase text-accent-bright"
                        >
                          {RESULT_CHIPS[project.id]}
                          <span aria-hidden="true">*</span>
                          <span className="sr-only"> (placeholder, to be verified)</span>
                        </span>
                      ) : null}
                    </div>
                    <h3 className="m-0 mt-3 font-heading text-h3 font-bold text-ink">
                      {project.name}
                    </h3>
                    <p className="m-0 mt-3 font-body text-small text-ink-secondary">
                      {project.challenge}
                    </p>
                    <p className="m-0 mt-auto pt-6 font-mono text-eyebrow uppercase text-ink-muted">
                      {project.stack}
                    </p>
                  </div>
                </Card>
              </Link>
            </RvItem>
          ))}
        </RvGroup>

        <div className="mt-12">
          <Button href="/work/" variant="text">
            All six case studies
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   4 — SERVICES.  DARK.
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * Six service cards, three by two, each linking to its own page.
 *
 * ── What this replaced ──────────────────────────────────────────────────
 *
 * A two-column split: a heading and a paragraph on the left, and on the right
 * an ordered list of the ten `featured` service pages as hairline-separated
 * rows. Ten rows is a directory rather than an offer, and a row with a 10px
 * eyebrow under a 24px label gives a reader no way to tell the six they
 * probably want from the four they probably do not.
 *
 * Six cards, in a 3x2 grid, from the brief. `FEATURED_SERVICE_PAGES` still
 * holds ten and /services/ still renders all seventeen; the six here are the
 * first six of the featured set, which is the order the registry is already
 * in, and the link under the grid goes to the hub.
 *
 * Each card is the whole link, with the service's own `eyebrow` as the
 * category line and its `navLabel` as the title. Both come from
 * lib/service-pages.ts, so adding a service to the registry adds it here
 * without this file knowing about it.
 */
/**
 * One lucide icon per service, keyed by slug.
 *
 * Keyed rather than positional: `FEATURED_SERVICE_PAGES` is a registry and
 * its order can change, and a positional array would silently reassign every
 * icon the next time a service is added. A slug with no entry falls back to
 * `Layers`, so a new service renders rather than crashing.
 *
 * Imported one by one, not as the whole `lucide-react` namespace: the barrel
 * import pulls the full icon set into the bundle, and this page needs six.
 */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  'magento-development': ShoppingCart,
  'shopify-development': Store,
  'headless-commerce': Layers,
  'generative-ai': Sparkles,
  'ecommerce-development': Rocket,
  'ecommerce-maintenance': Wrench,
};

export function Services() {
  const shown = FEATURED_SERVICE_PAGES.slice(0, 6);

  return (
    <Section id="services" labelledBy="services-title" className="border-t border-line">
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          emphasis="engaged to build."
          intro="Seventeen services, each with its own page covering what gets built and what it is not. These six are asked for most."
        >
          What I am
        </SectionHeading>

        <RvGroup
          as="ul"
          className="m-0 mt-12 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3"
          each={0.05}
        >
          {shown.map((sp) => (
            <RvItem key={sp.slug} as="li" className="h-full">
              <Link href={servicePageHref(sp.slug)} className="group block h-full">
                <Card interactive>
                  {(() => {
                    const Icon = SERVICE_ICONS[sp.slug] ?? Layers;
                    return (
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="h-6 w-6 text-accent transition-colors duration-200 group-hover:text-accent-bright"
                      />
                    );
                  })()}
                  <p className="m-0 mt-6 font-mono text-eyebrow font-medium uppercase text-accent-bright">
                    {sp.eyebrow}
                  </p>
                  <h3 className="m-0 mt-3 font-heading text-h3 font-bold text-ink">
                    {sp.navLabel}
                  </h3>
                  <p className="m-0 mt-3 font-body text-small text-ink-secondary">{sp.lede}</p>

                  {/* The arrow sits at the card's foot on `mt-auto`, so the
                      six arrows line up across a row regardless of how long
                      each lede runs. It is the Card's column flex that makes
                      `mt-auto` work here. */}
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-eyebrow font-medium uppercase text-ink-muted transition-colors duration-200 group-hover:text-accent-bright">
                    Explore
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={2}
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                    />
                  </span>
                </Card>
              </Link>
            </RvItem>
          ))}
        </RvGroup>

        <div className="mt-12">
          <Button href="/services/" variant="text">
            All services
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   5 — PROBLEMS I SOLVE.  LIGHT.
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * Six symptoms, compact, three by two.
 *
 * `PROBLEMS` holds nine. Six here, and the other three ("Manual operations",
 * "Weak analytics", "Scattered technology systems") are the three that are
 * about an operation rather than a storefront, which is what /how-we-work/
 * and /ai/ are about; both pages carry them.
 *
 * Compact means no card. A numbered item with a name and one line is a list,
 * and putting six of them in bordered boxes with 32px of padding each makes
 * the section as tall as the work grid above it for a sixth of the content.
 * The hairline above each item is the division; the number is the ordering.
 *
 * The ordinal is `aria-hidden`: it is decorative ordering, and a screen reader
 * announcing "zero one" before each problem name adds nothing.
 */
export function Problems() {
  const shown = PROBLEMS.slice(0, 6);

  return (
    <Section id="problems" labelledBy="problems-title" tone="light">
      <Container>
        <SectionHeading
          id="problems-title"
          eyebrow="Problems I solve"
          emphasis="your business grow."
          intro="These are the symptoms businesses arrive with. Each one is a technology problem with a commercial cost."
        >
          Technology should help
        </SectionHeading>

        <RvGroup
          as="ol"
          /* Two columns, not three. Six items in a 3-column grid is two rows
             of three, which reads as a card grid without the cards; two
             columns of three reads as a list, which is what it is. */
          className="m-0 mt-12 grid list-none gap-x-12 gap-y-8 p-0 sm:grid-cols-2"
          each={0.04}
        >
          {shown.map((problem) => (
            <RvItem
              key={problem.no}
              as="li"
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 border-t border-line pt-6"
            >
              {/*
                The number is a crimson accent in the left margin rather than
                a line above the heading, so the six read as one numbered
                list down the page. aria-hidden because the <ol> semantics
                already convey the position, and a screen reader announcing
                "01" before every heading is noise.
              */}
              <span
                aria-hidden="true"
                className="font-heading text-h3 font-extrabold leading-none text-accent"
              >
                {problem.no}
              </span>
              <div>
                <h3 className="m-0 font-heading text-h3 font-bold text-ink">{problem.name}</h3>
                <p className="m-0 mt-2 font-body text-small text-ink-secondary">{problem.note}</p>
              </div>
            </RvItem>
          ))}
        </RvGroup>

        <div className="mt-12">
          <Button href="/services/" variant="text">
            How each one gets fixed
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   6 — ABOUT + EXPERIENCE.  DARK.
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * A short bio, and the employment record as a four-row timeline.
 *
 * ── Two sections became one ─────────────────────────────────────────────
 *
 * `About` and `ProfessionalExperience` were sections 4 and 14 of the old
 * page, ten sections apart, and they answer one question between them: who is
 * this and has he done this before. Split across ten sections, a reader meets
 * the person early with no record behind it and the record late with no
 * person in front of it.
 *
 * ── Four rows, not five ────────────────────────────────────────────────
 *
 * `CAREER` holds five entries and two of them are the same employer: Team
 * Lead and Senior Magento Developer at Archer. They are shown as the one
 * progression they are, with the earlier title underneath, because on a
 * homepage the useful signal is "promoted at the same employer" and the
 * seat-by-seat breakdown belongs on /experience/, where an interviewer looks
 * for it.
 *
 * The merge is derived rather than hardcoded: the rows are grouped by `org`
 * and each group keeps its most recent title, so a sixth role at a new
 * employer appears without this file changing.
 */
export function AboutExperience() {
  /* Group by employer, newest first, keeping each group's first (most
     recent) title and the full span of its periods. `CAREER` is already in
     reverse-chronological order, so the first entry per org is the latest. */
  const byOrg: { org: string; title: string; earlier?: string; period: string }[] = [];
  for (const role of CAREER) {
    const existing = byOrg.find((r) => r.org === role.org);
    if (!existing) {
      byOrg.push({ org: role.org, title: role.title, period: role.period });
    } else if (!existing.earlier) {
      existing.earlier = role.title;
    }
  }
  const timeline = byOrg.slice(0, 4);

  return (
    <Section id="about" labelledBy="about-title" className="border-t border-line">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="about-title"
              eyebrow="About"
              emphasis="in business."
            >
              I build with technology.
              <br />I think
            </SectionHeading>

            <p className="m-0 mt-6 max-w-measure font-body text-body text-ink-secondary">
              {INTRO}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button href="/about/" variant="text">
                The longer version
              </Button>
              <Button href="/resume/" variant="text">
                Download the CV
              </Button>
            </div>
          </div>

          {/*
            The timeline. An ordered list, because the order is the content.
            The red hairline down the left is drawn with a border on the <ol>
            rather than a pseudo-element per row, so it is one line rather
            than four stacked segments with hairline gaps between them.
          */}
          <div>
            <Eyebrow className="mb-6">Experience</Eyebrow>
            <RvGroup as="ol" className="m-0 list-none border-l border-line p-0" each={0.06}>
              {timeline.map((role) => (
                <RvItem key={role.org} as="li" className="relative pb-8 pl-6 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent"
                  />
                  <p className="m-0 font-mono text-eyebrow font-medium uppercase text-ink-muted">
                    {role.period}
                  </p>
                  <h3 className="m-0 mt-2 font-heading text-h3 font-bold text-ink">{role.title}</h3>
                  <p className="m-0 mt-1 font-body text-small text-ink-secondary">{role.org}</p>
                  {role.earlier ? (
                    <p className="m-0 mt-1 font-body text-small text-ink-muted">
                      Previously {role.earlier}
                    </p>
                  ) : null}
                </RvItem>
              ))}
            </RvGroup>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   7 — PROCESS.  LIGHT.
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * Five steps, horizontal.
 *
 * `APPROACH` holds exactly five, which is what the brief asks for, so nothing
 * is sliced here.
 *
 * Horizontal means a five-column grid from `lg` with a rule running through
 * the step numbers, and a single column below it. Not a horizontal scroller:
 * a scroller is what the case studies were and the whole point of section 3
 * is that it is gone. Five short steps fit five columns at 1200px; at 1024
 * they wrap to three and two, which reads as two rows of a process rather
 * than as a broken row.
 *
 * The connecting rule is `aria-hidden` and drawn only from `lg`, where the
 * steps are actually in a row. Drawn on the single-column layout it would run
 * vertically through nothing.
 */
export function Process() {
  return (
    <Section id="process" labelledBy="process-title" tone="light">
      <Container>
        <SectionHeading
          id="process-title"
          eyebrow="Process"
          emphasis="runs."
          intro="Five steps, in this order, on every engagement. The first two are the ones most projects skip."
        >
          How the work
        </SectionHeading>

        <RvGroup
          as="ol"
          className="relative m-0 mt-12 grid list-none grid-cols-2 gap-x-6 gap-y-8 p-0 md:grid-cols-3 lg:grid-cols-5"
          each={0.06}
        >
          {APPROACH.map((step) => (
            <RvItem key={step.no} as="li">
              <span className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent font-mono text-eyebrow font-medium text-accent"
                >
                  {step.no}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
              </span>
              <h3 className="m-0 mt-4 font-heading text-h3 font-bold text-ink">{step.name}</h3>
              <p className="m-0 mt-2 font-body text-small text-ink-secondary">{step.body}</p>
            </RvItem>
          ))}
        </RvGroup>

        <div className="mt-12">
          <Button href="/how-we-work/" variant="text">
            Engagement models and what a week looks like
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   8 — INSIGHTS.  DARK.
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * The three latest articles.
 *
 * `WRITING` is `ALL_WRITING.slice(0, 6)`, already sorted newest first. Three
 * here, from the brief; it was six, rendered as hairline rows with a
 * four-column grid that collapsed to a stack and a `→` that only appeared
 * above `lg`.
 *
 * Three cards with the cover image, because an article's cover is the only
 * thing on this page that tells a reader what the piece is about before they
 * read the title. The old row layout had no image at all.
 *
 * ── The schema has to follow this ──────────────────────────────────────
 *
 * `brandHomeSchema()` in lib/schema-brand.ts emits an ItemList of the
 * articles the page shows, sliced against `WRITING`. That slice is now three,
 * matching this. An ItemList claiming six items on a page that shows three is
 * a structured-data mismatch.
 */
export function Insights() {
  const posts = WRITING.slice(0, 3);

  return (
    <Section id="insights" labelledBy="insights-title" className="border-t border-line">
      <Container>
        <SectionHeading
          id="insights-title"
          eyebrow="Insights"
          emphasis="making the decision."
          intro="Written for the people who have to choose a platform, approve a budget or defend a technical call."
        >
          Written for the people
        </SectionHeading>

        <RvGroup
          as="ul"
          className="m-0 mt-12 grid list-none gap-6 p-0 md:grid-cols-3"
          each={0.06}
        >
          {posts.map((post) => (
            <RvItem key={post.slug} as="li" className="h-full">
              <Link href={`/insights/${post.slug}/`} className="group block h-full">
                <Card interactive className="!p-0">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t border-b border-line bg-surface">
                    <img
                      src={post.img}
                      alt=""
                      width={1200}
                      height={675}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 768px) 368px, calc(100vw - 48px)"
                      className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <p className="m-0 font-mono text-eyebrow font-medium uppercase text-accent-bright">
                      {post.category}
                    </p>
                    <h3 className="m-0 mt-3 font-heading text-h3 font-bold text-ink">
                      {post.title}
                    </h3>
                    <p className="m-0 mt-auto pt-6 font-mono text-eyebrow uppercase text-ink-muted">
                      {post.date} · {post.readTime}
                    </p>
                  </div>
                </Card>
              </Link>
            </RvItem>
          ))}
        </RvGroup>

        <div className="mt-12">
          <Button href="/insights/" variant="text">
            All insights
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   9 — FAQ + CONTACT CTA.  LIGHT.
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * Six questions, then the close.
 *
 * ── Why these are one section and not two ──────────────────────────────
 *
 * The brief puts them together and it is right to: the last objection and the
 * action that follows answering it belong on one band. Split, the FAQ reads
 * as the end of the page and the close reads as an appendix after it.
 *
 * ── Six of fourteen, and the schema ───────────────────────────────────
 *
 * `FAQS` holds fourteen. `HOME_FAQ_COUNT` in lib/homepage.ts is 6, this
 * section slices against it, and `faqNode('/', FAQS.slice(0, HOME_FAQ_COUNT))`
 * in lib/schema-brand.ts slices against the same constant. That matters more
 * than it looks: FAQPage markup describing questions that are not visible on
 * the page is a structured-data violation and a manual-action risk, and the
 * two could only have been kept in step by hand otherwise.
 *
 * The other eight are on /faq/, which carries its own `FAQPage` node over
 * `FAQS.slice(HOME_FAQ_COUNT)` — the two nodes partition the array, so no
 * question is claimed by two pages.
 *
 * ── `<details>`, not a click handler ──────────────────────────────────
 *
 * Native disclosure. It is keyboard accessible, it is announced correctly, it
 * works before hydration and it costs no JavaScript. The question text is in
 * the `<summary>` and the answer in the body, which is also the order a
 * crawler reads them in for the FAQPage node to match.
 *
 * ── The close ─────────────────────────────────────────────────────────
 *
 * One heading, one primary button, two channels. The old Contact section was
 * a 190-line close: a 14-word h2, a lede, three channel cards in a bordered
 * grid, a dark info panel with a four-row `<dl>` and two more buttons, and a
 * white panel holding the full five-field project form.
 *
 * The form is not here. It is on /contact/, which the button goes to, and in
 * the enquiry modal. Three implementations of one form was the problem the
 * `ProjectForm` component already solved; a fourth copy on the homepage is
 * the same problem with better internals.
 *
 * `id="book"` is kept as a second anchor because the footer has linked to
 * `/#book` since before this restructure, and `#contact` because every
 * in-page call to action on the site points at it.
 */
export function FaqContact() {
  const shown = FAQS.slice(0, HOME_FAQ_COUNT);

  return (
    <Section id="faq" labelledBy="faq-title" tone="light">
      <Container>
        <SectionHeading
          id="faq-title"
          eyebrow="Questions"
          emphasis="a first call."
          intro="The six that come up every time. Eight more, including scope, timelines and what happens after launch, are on the FAQ page."
        >
          Asked before
        </SectionHeading>

        <RvGroup as="ul" className="m-0 mt-12 list-none p-0" each={0.04}>
          {shown.map((item) => (
            <RvItem key={item.no} as="li" className="border-t border-line last:border-b">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="m-0 font-heading text-h3 font-bold text-ink transition-colors duration-200 group-hover:text-accent">
                    {item.q}
                  </h3>
                  {/* A plus that becomes a minus. Transform only, and
                      `aria-hidden` because <summary> already announces the
                      expanded state. */}
                  <span
                    aria-hidden="true"
                    className="relative mt-1 block h-4 w-4 shrink-0 text-accent"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="m-0 max-w-measure pb-6 font-body text-body text-ink-secondary">
                  {item.a}
                </p>
              </details>
            </RvItem>
          ))}
        </RvGroup>

        <div className="mt-8">
          <Button href="/faq/" variant="text">
            The other eight questions
          </Button>
        </div>

        {/* ── The close ────────────────────────────────────────────────── */}
        <span id="book" aria-hidden="true" />
        <span id="contact" aria-hidden="true" />

        <Rv className="mt-16 rounded border border-line bg-surface p-6 md:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="m-0 max-w-measure-sm font-heading text-h2 font-medium text-ink">
                Let&apos;s solve it before it{' '}
                <span className="font-extrabold text-accent">becomes expensive.</span>
              </h2>
              <p className="m-0 mt-6 max-w-measure-md font-body text-body text-ink-secondary">
                Bring the problem. Leave with the next practical step. A first conversation is 30
                minutes and costs nothing.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-6">
              <Button href="/contact/" data-event="contact_cta_click">
                Discuss your project
              </Button>
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-mono text-small text-ink-secondary underline decoration-line underline-offset-4 transition-colors hover:text-accent"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>
        </Rv>
      </Container>
    </Section>
  );
}
