import { CERTS } from '../lib/certifications';
import {
  AVAILABILITY,
  CLIENT_TYPES,
  ENGAGEMENT_MODELS,
  LOCATION,
  MARKETS,
  TIMEZONE,
} from '../lib/identity';
import {
  AI_TRACKS,
  CAPABILITIES,
  ECOSYSTEM,
  FAQS,
  HOME_FAQ_COUNT,
  PROBLEMS,
  WHY_WORK_WITH_ME,
} from '../lib/homepage';
import { REMOTE } from '../lib/remote';
import { Button, Card, Container, Eyebrow, Section, SectionHeading } from './ui';
import { Rv, RvGroup, RvItem } from './homepage-sections/rv';

/**
 * ══════════════════════════════════════════════════════════════════════════
 * THE ELEVEN SECTIONS THAT LEFT THE HOMEPAGE
 * ══════════════════════════════════════════════════════════════════════════
 *
 * The homepage went from nineteen sections to nine. Nothing was deleted: the
 * content itself lives in lib/ and never moved at all, and these are the
 * sections that render it, now on the page the question belongs to.
 *
 * They are in one module rather than scattered across five, because the fact
 * that they arrived together is the thing a reader of this code needs to
 * know. Each export says where it is used.
 *
 *   AiTracks                /ai/            8 practical AI tracks
 *   OperationsProblems      /ai/            the 3 operational problems
 *   TechnologyPosition      /about/         the belief, off the red band
 *   WhyWorkWithMe           /about/         9 reasons
 *   Certification           /about/         the Generative AI credential
 *   CapabilityAreas         /expertise/     the 4 areas, in depth
 *   TechnologyEcosystem     /expertise/     32 technologies, grouped
 *   EngagementModels        /how-we-work/   the 7 shapes an engagement takes
 *   RemoteCollaboration     /how-we-work/   location, time zone, markets
 *   TechnologyPartner       /how-we-work/   the agency alternative
 *   RemainingFaqs           /faq/           FAQs 7 to 14
 *
 * ── Every one of them is rebuilt, not pasted ─────────────────────────────
 *
 * The old markup carried the thing the design system exists to stop: its own
 * container string, its own section padding, hand-set `text-[clamp(...)]`
 * headings, `bg-[#f5f3ee]` and `bg-[#050505]` as literals, and 10px and 11px
 * labels under the type floor. All of these are `Section` + `Container` +
 * `SectionHeading` + `Card` and read every size and colour from the tokens.
 *
 * ── The band alternation on these pages ──────────────────────────────────
 *
 * Each destination page sets its own `tone` per section, following the same
 * rule the homepage does: strict alternation after the hero. The `tone` prop
 * is the only thing on the site that chooses a ground, so a page's rhythm is
 * readable from its JSX in one glance.
 */

/* ══════════════════════════════════════════════════════════════════════════
   /ai/
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * The eight practical AI tracks.
 *
 * Off the homepage, where it was section 10 of 19 and carried two radial red
 * gradient washes, an animated circuit-trace SVG with two `stroke-dasharray`
 * paths on an infinite keyframe, and a `relative overflow-hidden` wrapper to
 * contain them. All of that is gone with the move: the content is eight
 * names and eight sentences, and the decoration was the reason the section
 * needed its own `overflow-hidden`.
 *
 * `AI_TRACKS` is unchanged, all eight of them.
 */
export function AiTracks() {
  return (
    <Section id="tracks" labelledBy="tracks-title" className="border-t border-line">
      <Container>
        <SectionHeading
          id="tracks-title"
          eyebrow="AI and automation"
          emphasis="not the demo."
          intro="Eight tracks, each one a thing that has to work in production. The interesting question is never whether a model can do it."
        >
          The practical end,
        </SectionHeading>

        <RvGroup
          as="ul"
          className="m-0 mt-12 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4"
          each={0.04}
        >
          {AI_TRACKS.map((track) => (
            <RvItem key={track.no} as="li" className="h-full">
              <Card>
                <p className="m-0 font-mono text-eyebrow font-medium text-accent-bright">
                  {track.no}
                </p>
                <h3 className="m-0 mt-3 font-heading text-h3 font-bold text-ink">{track.name}</h3>
                <p className="m-0 mt-3 font-body text-small text-ink-secondary">{track.note}</p>
              </Card>
            </RvItem>
          ))}
        </RvGroup>

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Button href="/ai-commerce/" variant="text">
            AI in commerce, specifically
          </Button>
          <Button href="/ai-automation/" variant="text">
            Workflow automation
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/**
 * The three operational problems, from `PROBLEMS`.
 *
 * The homepage shows the first six, which are all storefront symptoms. These
 * three — manual operations, weak analytics, scattered systems — are about an
 * operation rather than a store, which is what this page is about, so they
 * come here rather than being cut.
 *
 * The slice is `PROBLEMS.slice(HOME_FAQ_COUNT)`: the same six the homepage
 * takes, so the two partition the nine exactly and a tenth problem added to
 * the array lands here automatically. `HOME_FAQ_COUNT` is 6 and is the
 * homepage's section-slice constant; using it for both is deliberate, and the
 * note on it in lib/homepage.ts says why one constant is safer than two
 * literals that have to agree.
 */
export function OperationsProblems() {
  const shown = PROBLEMS.slice(HOME_FAQ_COUNT);

  return (
    <Section id="operations" labelledBy="operations-title" tone="light">
      <Container>
        <SectionHeading
          id="operations-title"
          eyebrow="Where automation earns its place"
          emphasis="a model."
          intro="Three problems that look like software problems and are usually process problems wearing"
        >
          Before you buy
        </SectionHeading>

        <RvGroup
          as="ul"
          className="m-0 mt-12 grid list-none gap-x-12 gap-y-8 p-0 md:grid-cols-3"
          each={0.05}
        >
          {shown.map((problem) => (
            <RvItem key={problem.no} as="li" className="border-t border-line pt-6">
              <span aria-hidden="true" className="font-mono text-eyebrow font-medium text-accent">
                {problem.no}
              </span>
              <h3 className="m-0 mt-3 font-heading text-h3 font-bold text-ink">{problem.name}</h3>
              <p className="m-0 mt-2 font-body text-small text-ink-secondary">{problem.note}</p>
            </RvItem>
          ))}
        </RvGroup>
      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   /about/
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * The position: technology decisions should make business sense.
 *
 * ── Why it is not a solid red band any more ─────────────────────────────
 *
 * It was `<section className="bg-accent text-white">` in the middle of the
 * homepage — one section, filled edge to edge in #d71920, with white type and
 * a list of five words ("Business + Technology + eCommerce + AI + Growth") set
 * at up to 50px. It read as a different website for the length of one scroll,
 * and it broke the band alternation: the rhythm went light, RED, dark, which
 * is not a rhythm.
 *
 * The belief survives intact. It is on /about/, which is the page a belief
 * belongs on, set on the ordinary dark ground with the red doing what red
 * does everywhere else on the site: the rule, the ordinals and the one
 * emphasised phrase.
 */
export function TechnologyPosition() {
  return (
    <Section id="position" labelledBy="position-title" className="border-t border-line">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="position-title"
              eyebrow="The position"
              emphasis="make business sense."
            >
              Technology decisions should
            </SectionHeading>

            <p className="m-0 mt-8 max-w-measure font-heading text-h3 font-medium text-ink">
              Technology is not valuable simply because it is new.
            </p>
            <p className="m-0 mt-6 max-w-measure font-body text-body text-ink-secondary">
              The right technology should improve performance, reduce friction, simplify
              operations, improve customer experience and create measurable business value. Every
              recommendation is judged against that, which is also why some of the advice is to
              leave a system alone.
            </p>

            <div className="mt-8">
              <Button href="/hire/">Work with me on one decision</Button>
            </div>
          </div>

          {/* The five words that used to be the red band's list. An ordered
              list, because the order is the argument: business first,
              technology second. */}
          <RvGroup as="ol" className="m-0 list-none p-0" each={0.06}>
            {['Business', 'Technology', 'eCommerce', 'AI', 'Growth'].map((word, i) => (
              <RvItem key={word} as="li" className="border-t border-line first:border-t-0">
                <span className="flex items-baseline gap-6 py-4">
                  <span
                    aria-hidden="true"
                    className="w-4 shrink-0 font-mono text-eyebrow font-medium text-accent"
                  >
                    {i === 0 ? '' : '+'}
                  </span>
                  <span className="font-heading text-h2 font-medium text-ink">{word}</span>
                </span>
              </RvItem>
            ))}
          </RvGroup>
        </div>
      </Container>
    </Section>
  );
}

/**
 * The nine reasons.
 *
 * Unchanged content: `WHY_WORK_WITH_ME`, all nine, each with the sentence
 * that does the actual work. The note on the array in lib/homepage.ts says
 * why each one carries a body — a list of nine labels like "Direct
 * communication" and "Remote collaboration" is the most generic block on any
 * freelance site, because every one of them is a claim anybody can make.
 *
 * Three by three, as cards. Nine items is scanned rather than read.
 */
export function WhyWorkWithMe() {
  return (
    <Section id="why-me" labelledBy="why-me-title" tone="light">
      <Container>
        <SectionHeading
          id="why-me-title"
          eyebrow="Why work with me"
          emphasis="behind the position."
          intro="Nine reasons, each with the specific thing behind it rather than the claim on its own."
        >
          The reasons
        </SectionHeading>

        <RvGroup
          as="ul"
          className="m-0 mt-12 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3"
          each={0.04}
        >
          {WHY_WORK_WITH_ME.map((reason) => (
            <RvItem key={reason.num} as="li" className="h-full">
              <Card>
                <p className="m-0 font-mono text-eyebrow font-medium text-accent">{reason.num}</p>
                <h3 className="m-0 mt-3 font-heading text-h3 font-bold text-ink">{reason.name}</h3>
                <p className="m-0 mt-3 font-body text-small text-ink-secondary">{reason.body}</p>
              </Card>
            </RvItem>
          ))}
        </RvGroup>
      </Container>
    </Section>
  );
}

/**
 * The Generative AI certification, and its syllabus.
 *
 * `CERTS.feature` unchanged: the issuer, the completion date, the body and
 * all five topics. /certifications/ still carries the full credential
 * record; this is the one that is load-bearing for the AI half of the
 * positioning, which is why it is on /about/ rather than only there.
 */
export function Certification() {
  const f = CERTS.feature;

  return (
    <Section id="certification" labelledBy="certification-title" className="border-t border-line">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="certification-title"
              eyebrow={f.issuer}
              emphasis="Certification."
              intro={f.body}
            >
              Generative AI
            </SectionHeading>

            <p className="m-0 mt-6 font-mono text-eyebrow font-medium uppercase text-ink-muted">
              {f.completed}
            </p>

            <div className="mt-8">
              <Button href="/certifications/" variant="text">
                The full credential record
              </Button>
            </div>
          </div>

          <RvGroup as="ul" className="m-0 list-none p-0" each={0.05}>
            {f.topics.map((t) => (
              <RvItem key={t.name} as="li" className="border-t border-line py-6 last:border-b">
                <h3 className="m-0 font-heading text-h3 font-bold text-ink">{t.name}</h3>
                <p className="m-0 mt-2 max-w-measure font-body text-small text-ink-secondary">
                  {t.body}
                </p>
              </RvItem>
            ))}
          </RvGroup>
        </div>
      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   /expertise/
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * The four capability areas, in depth.
 *
 * `CAPABILITIES` unchanged: four areas, each with the sentence saying what it
 * is for in the client's terms, and each with its own list of six or seven
 * named capabilities.
 *
 * This is the section that most clearly belonged somewhere else. On the
 * homepage it was section 8 of 19, after the case studies, and it is a
 * capability matrix: the thing a reader opens /expertise/ to find.
 */
export function CapabilityAreas() {
  return (
    <Section id="areas" labelledBy="areas-title" className="border-t border-line">
      <Container>
        <SectionHeading
          id="areas-title"
          eyebrow="Capability areas"
          emphasis="and what sits in each."
          intro="Four areas. Every engagement is mostly one of them with a piece of another."
        >
          Four areas,
        </SectionHeading>

        <RvGroup
          as="ul"
          className="m-0 mt-12 grid list-none gap-6 p-0 sm:grid-cols-2"
          each={0.05}
        >
          {CAPABILITIES.map((area) => (
            <RvItem key={area.no} as="li" className="h-full">
              <Card>
                <p className="m-0 font-mono text-eyebrow font-medium text-accent-bright">
                  {area.no}
                </p>
                <h3 className="m-0 mt-3 font-heading text-h3 font-bold text-ink">{area.name}</h3>
                <p className="m-0 mt-3 font-body text-small text-ink-secondary">{area.body}</p>
                <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
                  {area.items.map((item) => (
                    <li
                      key={item}
                      className="rounded border border-line px-3 py-2 font-mono text-eyebrow uppercase text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </RvItem>
          ))}
        </RvGroup>
      </Container>
    </Section>
  );
}

/**
 * The technology stack, grouped by what each layer is for.
 *
 * `ECOSYSTEM` unchanged: five groups, 32 items, each with the route it links
 * to where one exists.
 *
 * Explicitly not a logo wall, which is the note the original carried and the
 * reason it is worth keeping: a grouped list says which layer each technology
 * sits in, and that is the only part a client's own technical reviewer reads
 * closely.
 */
export function TechnologyEcosystem() {
  return (
    <Section id="ecosystem" labelledBy="ecosystem-title" tone="light">
      <Container>
        <SectionHeading
          id="ecosystem-title"
          eyebrow="Technology ecosystem"
          emphasis="not a logo wall."
          intro="Grouped by what each layer is for, because which layer a technology sits in is the part a technical reviewer reads closely."
        >
          The stack,
        </SectionHeading>

        <RvGroup
          as="ul"
          className="m-0 mt-12 grid list-none gap-x-12 gap-y-12 p-0 sm:grid-cols-2 lg:grid-cols-3"
          each={0.05}
        >
          {ECOSYSTEM.map((group) => (
            <RvItem key={group.name} as="li" className="border-t border-line pt-6">
              <h3 className="m-0 font-heading text-h3 font-bold text-ink">{group.name}</h3>
              <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
                {group.items.map((item) => (
                  <li key={item.name}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-body text-small text-ink-secondary underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <span className="font-body text-small text-ink-secondary">{item.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </RvItem>
          ))}
        </RvGroup>
      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   /how-we-work/
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * The seven shapes an engagement takes.
 *
 * `ENGAGEMENT_MODELS` unchanged, all seven. The note on it in
 * lib/identity.ts records what it replaced and why: `TARGET_ROLES`, seven job
 * titles as a recruiter would name them, which described a person looking for
 * employment on a site that offers services.
 *
 * It was the right-hand column of the homepage's RemoteWork section, under
 * the heading "How we can work together", nested inside a section whose own
 * heading was "Let's work together". Two headings saying the same thing, one
 * inside the other.
 */
export function EngagementModels() {
  return (
    <Section id="models" labelledBy="models-title" className="border-t border-line">
      <Container>
        <SectionHeading
          id="models-title"
          eyebrow="Engagement models"
          emphasis="is bought."
          intro="Seven shapes. A buyer with a fixed project, one who wants someone embedded for a while, and one who wants a long arrangement all need to see their own shape named."
        >
          How the work
        </SectionHeading>

        <RvGroup as="ol" className="m-0 mt-12 list-none border-t border-line p-0" each={0.04}>
          {ENGAGEMENT_MODELS.map((model, i) => (
            <RvItem key={model} as="li" className="border-b border-line">
              <span className="flex items-baseline gap-6 py-6">
                <span
                  aria-hidden="true"
                  className="font-mono text-eyebrow font-medium text-accent"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-heading text-h3 font-medium text-ink">{model}</span>
              </span>
            </RvItem>
          ))}
        </RvGroup>

        <div className="mt-12">
          <Button href="/pricing/" variant="text">
            What each one costs
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Where I am, what hours that means, and who the work is for.
 *
 * The left column of the homepage's RemoteWork section: the lede from
 * `REMOTE`, the availability line, and the four-row fact list (location, time
 * zone, client types, markets). All of it unchanged.
 *
 * /remote-collaboration/ is the full page on the subject and is linked at the
 * foot of this section. This is the short version, on the page a reader lands
 * on when they click "How we work", so the time-zone objection is answered
 * before the engagement models above it have to be weighed.
 */
export function RemoteCollaboration() {
  const facts = [
    { label: 'Location', value: LOCATION },
    { label: 'Time zone', value: TIMEZONE },
    { label: 'Clients', value: `${CLIENT_TYPES.length} kinds, listed below` },
    { label: 'Markets', value: MARKETS.join(', ') },
  ];

  return (
    <Section id="remote" labelledBy="remote-title" tone="light">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="remote-title"
              eyebrow="Working with clients worldwide"
              emphasis="is the default."
              intro={REMOTE.lede}
            >
              Remote
            </SectionHeading>

            <p className="m-0 mt-8 flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-[6px] h-[7px] w-[7px] shrink-0 rounded-full bg-accent animate-yr-blink"
              />
              <span className="font-mono text-eyebrow font-medium uppercase text-accent">
                {AVAILABILITY}
              </span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button href="/contact/" data-event="contact_cta_click">
                Discuss your project
              </Button>
              <Button href="/remote-collaboration/" variant="text">
                How remote collaboration runs
              </Button>
            </div>
          </div>

          <div>
            <Eyebrow className="mb-6">The practical facts</Eyebrow>
            <dl className="m-0 grid gap-x-12 gap-y-6 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="border-t border-line pt-4">
                  <dt className="font-mono text-eyebrow font-medium uppercase text-ink-muted">
                    {fact.label}
                  </dt>
                  <dd className="m-0 mt-2 font-body text-small text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <Eyebrow className="mb-4 mt-12">Who the work is for</Eyebrow>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {CLIENT_TYPES.map((type) => (
                <li key={type} className="font-body text-small text-ink-secondary">
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * The agency alternative.
 *
 * Unchanged argument and unchanged three supporting points: direct access, no
 * account layer, independent advice. It was section 16 of the homepage's
 * nineteen, three sections after the nine reasons it partly repeats; here it
 * is the close of the page about how an engagement runs, which is the
 * question it answers.
 */
export function TechnologyPartner() {
  const points = [
    {
      label: 'Direct access',
      note: 'The person you speak to is the person doing the work. Always.',
    },
    {
      label: 'No account layer',
      note: 'The first call is useful because the person responsible for the outcome is on it.',
    },
    {
      label: 'Independent advice',
      note: 'Technology recommendations based on the business, not on what the supplier is positioned to build.',
    },
  ];

  return (
    <Section id="partner" labelledBy="partner-title" className="border-t border-line">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="partner-title"
              eyebrow="Technology partner"
              emphasis="not another vendor?"
              intro="Sometimes you do not need another agency or a larger team. You need one experienced person who can understand the problem and make the technology decision."
            >
              Need a technology partner,
            </SectionHeading>

            <p className="m-0 mt-6 font-mono text-eyebrow font-medium uppercase text-ink-muted">
              Direct access. Senior judgement. One point of accountability.
            </p>

            <div className="mt-8">
              <Button href="/hire/">Hire me for your project</Button>
            </div>
          </div>

          <RvGroup as="ul" className="m-0 list-none p-0" each={0.06}>
            {points.map((point) => (
              <RvItem key={point.label} as="li" className="border-t border-line py-6 last:border-b">
                <p className="m-0 font-mono text-eyebrow font-medium uppercase text-accent-bright">
                  {point.label}
                </p>
                <p className="m-0 mt-2 max-w-measure font-body text-small text-ink-secondary">
                  {point.note}
                </p>
              </RvItem>
            ))}
          </RvGroup>
        </div>
      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   /faq/
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * FAQs 7 to 14.
 *
 * ── The slice, and why it is a constant ─────────────────────────────────
 *
 * `FAQS.slice(HOME_FAQ_COUNT)`. The homepage renders
 * `FAQS.slice(0, HOME_FAQ_COUNT)`. The two partition the array exactly, so
 * every question is on precisely one page, and a fifteenth question added to
 * the array lands here without either file changing.
 *
 * That matters for the structured data more than for the layout. The
 * homepage's `FAQPage` node and this page's `FAQPage` node are built from the
 * same two slices, so neither claims a question that is not visible on the
 * page carrying it — which is a structured-data violation and a
 * manual-action risk — and no question is claimed by both, which would be two
 * pages competing for one rich result.
 *
 * ── `<details>`, not a click handler ───────────────────────────────────
 *
 * Native disclosure, same as the homepage's. Keyboard accessible, announced
 * correctly, works before hydration, costs no JavaScript, and the question is
 * in the `<summary>` with the answer in the body — which is also the order a
 * crawler reads them in for the FAQPage node to match.
 */
export function RemainingFaqs() {
  const shown = FAQS.slice(HOME_FAQ_COUNT);

  return (
    <Section id="questions" labelledBy="questions-title" className="border-t border-line">
      <Container>
        <SectionHeading
          id="questions-title"
          eyebrow="Questions"
          emphasis="before the first call."
          intro="The eight that come up after the obvious six. The first six are on the homepage."
        >
          Everything else asked
        </SectionHeading>

        <RvGroup as="ul" className="m-0 mt-12 list-none p-0" each={0.03}>
          {shown.map((item) => (
            <RvItem key={item.no} as="li" className="border-t border-line last:border-b">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="m-0 font-heading text-h3 font-bold text-ink transition-colors duration-200 group-hover:text-accent-bright">
                    {item.q}
                  </h3>
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

        <Rv className="mt-16 rounded border border-line bg-surface p-6 md:p-8">
          <h2 className="m-0 max-w-measure-sm font-heading text-h2 font-medium text-ink">
            Still have a question? <span className="font-extrabold text-accent">Ask it.</span>
          </h2>
          <p className="m-0 mt-6 max-w-measure-md font-body text-body text-ink-secondary">
            A first conversation is 30 minutes and costs nothing.
          </p>
          <div className="mt-8">
            <Button href="/contact/" data-event="contact_cta_click">
              Discuss your project
            </Button>
          </div>
        </Rv>
      </Container>
    </Section>
  );
}
