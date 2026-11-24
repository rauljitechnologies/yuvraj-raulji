import { ROLE, ROLE_LINE } from '../../lib/identity';
import { HERO, PORTRAITS } from '../../lib/homepage';
import { Button, Container, Section } from '../ui';
import { Eager } from './rv';

/**
 * ══════════════════════════════════════════════════════════════════════════
 * HOMEPAGE HERO — section 1 of 9. DARK.
 * ══════════════════════════════════════════════════════════════════════════
 *
 * What the first screen has to do, in order: name the person, name the job,
 * state what the work produces, offer one obvious next step, and evidence the
 * claim. Five things, one each.
 *
 * ── What came out, and the cost of each ──────────────────────────────────
 *
 * THE SEVEN-ITEM PIPE LIST. The eyebrow carried `POSITIONING_LINE`, which is
 * `ROLE` plus all six of `ROLES_ADDITIONAL` joined by pipes: 151 characters,
 * "Senior Software Developer & Technology Consultant | Full-Stack Development
 * | eCommerce & Headless Commerce | Generative AI | Magento 2 | Shopify | SEO
 * & CRO". Three lines at 1440px and a 46-character measure on a phone, each
 * item wrapped in its own `whitespace-nowrap` span with a dimmed separator,
 * plus an `aria-label` rebuilding the spoken version because the visual one
 * had the separator in the DOM twice.
 *
 * Seven specialisms stated before the H1 is seven things to weigh before the
 * reader has been told what is on offer. The eyebrow is the name and ONE role
 * line now; the six specialisms are on /expertise/ and in the Person node's
 * `knowsAbout`, which is where a machine reads them and where a reader who
 * wants the list will look for it.
 *
 * THE SECOND PARAGRAPH, and the availability line as a third block. The hero
 * had four runs of prose above the buttons: the eyebrow, the eyebrow's
 * sub-line, the H1, a 203-character lede, and an uppercase mono availability
 * sentence. The subheading is one sentence now. Availability is in the header
 * bar, where it is on every page, which is what the bar's own note says it is
 * for.
 *
 * THE THIRD AND SECOND CALLS TO ACTION. It was three buttons: "Discuss Your
 * Project" filled, "Explore My Work" outlined, "WhatsApp Me" outlined. Three
 * buttons of equal visual weight is no primary action. One filled primary and
 * one text link now, and WhatsApp is the floating button
 * (components/chrome/whatsapp-float.tsx), where it is reachable from any
 * scroll position rather than only from the top of the page.
 *
 * THE FIVE-ITEM CREDIBILITY ROW. `EXPERTISE_LINE` is "9+ Years Experience |
 * 50+ Projects | Magento | Shopify | Next.js" — two figures and three
 * platform names in one uppercase mono line with pipe separators, at 11px.
 * Three stats now, as figures with labels, read from `STATS` so they cannot
 * contradict the strip below.
 *
 * THE MARQUEE. An infinite horizontally scrolling ticker of eight
 * specialisms, `aria-hidden`, rendered twice inside a `w-max` track as the
 * last child of this section. Removed outright, per the brief. The eight
 * terms are the `SPECIALTIES` list and they are real text on /expertise/.
 *
 * ── The top padding ──────────────────────────────────────────────────────
 *
 * There isn't any. This was `pt-[128px] sm:pt-[140px]` plus a `.yr-hero` rule
 * in app/home.css carrying an lg override and a viewport-height ceiling for
 * the headline, all of it balancing against a 110px `fixed` header. The
 * header is `sticky` and in flow now, so it occupies its own 72px and the
 * hero starts underneath it with the section's own `py-section`. Nothing here
 * knows the bar's height, and nothing can be hidden under it.
 *
 * ── Why this section reveals from CSS and not from Motion ────────────────
 *
 * `Eager` animates from a CSS keyframe. The Motion wrappers serialise
 * `opacity:0` into the exported HTML and clear it after hydration and an
 * IntersectionObserver, which is correct below the fold and wrong for the
 * first screen: until the bundle runs, the hero is painted and empty. The
 * portrait is the LCP element on this page and it must not wait on
 * JavaScript.
 */
export function Hero() {

  return (
    <Section id="top" labelledBy="hero-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            {/* The eyebrow: the name, and one role line. A <p>, not a
                heading — the h1 below is the first heading on the page. */}
            <Eager>
              <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span aria-hidden="true" className="h-px w-6 shrink-0 bg-accent" />
                <span className="font-mono text-eyebrow font-medium uppercase text-ink">
                  {HERO.eyebrow}
                </span>
                <span aria-hidden="true" className="text-ink-faint">
                  /
                </span>
                <span className="font-mono text-eyebrow font-medium uppercase text-ink-muted">
                  {ROLE_LINE}
                </span>
              </p>
            </Eager>

            {/*
              The one h1 on the page, and it names what the work produces
              rather than restating the job title the eyebrow just gave.

              Two authored lines from `HERO.h1`, which is `HEADLINE` in
              lib/identity.ts. At the 64px ceiling and a 20-character measure
              those two lines set as three on a desktop and three on a phone,
              which is the brief's 2-3 line budget. The accent falls on the
              second line because the first half is the established record and
              the second is the wider claim, so the colour marks the part
              being asserted rather than decorating the whole heading.

              `text-h1` carries the size, the 1.1 line height and the -0.02em
              tracking from the scale. The hand-set
              `text-[clamp(34px,4.9vw,76px)] leading-[1.04]
              tracking-[-0.022em]` that stood here was the 92nd heading on the
              site and the only one not going through the shared scale, which
              is exactly why it was the one that did not follow when the
              display face changed.
            */}
            <Eager delay={0.06} className="mt-6">
              <h1 id="hero-title" className="m-0 max-w-[20ch] font-heading text-h1 font-extrabold text-ink">
                {HERO.h1.map((line) => {
                  const text = typeof line === 'string' ? line : line.text;
                  const accent = typeof line === 'string' ? false : line.accent;
                  return (
                    <span key={text} className="block">
                      {accent ? <span className="text-accent-bright">{text}</span> : text}
                    </span>
                  );
                })}
              </h1>
            </Eager>

            {/* One sentence. `HERO.subLead` is `INTRO_LONG`, which is three
                clauses in one sentence; the measure is the 55ch scan width
                rather than the 65ch read width, because this is read once on
                the way to the button under it. */}
            <Eager delay={0.12} className="mt-6">
              <p className="m-0 max-w-measure-md font-body text-body text-ink-secondary">
                {HERO.subLead}
              </p>
            </Eager>

            {/* One primary, one text link. */}
            <Eager delay={0.18} className="mt-8 flex flex-wrap items-center gap-6">
              <Button href="/contact/" data-event="contact_cta_click">
                Discuss your project
              </Button>
              <Button href="/work/" variant="text">
                See my work
              </Button>
            </Eager>

            {/*
              The proof row stood here: three figures in a <dl> under the
              calls to action.

              It is gone because it was the SAME three figures, in the same
              order, as the first three of the five-figure strip in the
              section immediately below it — `STATS.slice(0, 3)` against a
              strip that renders all of `STATS`. So "9+ / 50+ / 1M+" was
              read twice within about one screen, the second time under a
              heading announcing it as the record. Two proof blocks a border
              apart do not reinforce each other; they read as the page
              repeating itself, which is exactly how it was reported.

              The row also had a duplication bug of its own, which is worth
              recording because it is the kind that only shows up in
              extracted text: the label was in an `sr-only` <dt> AND again
              in a visible <span> inside the <dd>, so a screen reader and a
              copy-paste both got "Years Experience 9+ Years Experience".

              The five-figure strip is now the page's one proof block. It
              still sits directly under the hero's call to action, which is
              where the brief wanted the evidence; it is simply its own band
              rather than a second copy.
            */}
          </div>

          {/*
            The portrait plate: a hairline frame offset up-left, a solid red
            block offset down-right, and the photograph on top of both. The
            24px offsets are what give the stack its depth, so they are
            literal rather than a spacing token: they are a drawing, not a gap
            between two pieces of content.

            `order-first lg:order-none` is deliberate on the markup side and
            not applied: the portrait reads SECOND on a phone, under the call
            to action, because on a 375px screen a portrait above the h1 costs
            the whole first screen. On `lg` the grid puts it beside the column.
          */}
          <Eager delay={0.3} className="w-full">
            <div className="relative mx-auto w-full max-w-[420px] lg:mr-0">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-6 top-0 rounded border border-line bg-surface"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 h-[calc(100%-24px)] w-[calc(100%-24px)] rounded bg-accent"
              />

              {/*
                Three cuts of one photograph, and `sizes` written against the
                PLATE's width rather than the viewport's, because the browser
                multiplies `sizes` by device pixel ratio before choosing a
                candidate and overstating the box costs bytes on the element
                that decides LCP.

                The plate is at most 420px and is `100vw - 48px` below that,
                so a DPR-2 phone at 375px needs 654 real pixels (the 700 cut)
                and a DPR-2 desktop needs 840 (the 960). The 1200 serves DPR-3.

                A plain <img> and not next/image: next.config.mjs sets
                `images: { unoptimized: true }` because this site is a static
                export with no image optimiser in front of it, so next/image
                would add a wrapper and a loader that resolves to the same
                file. `width`, `height`, `srcSet`, `sizes`, `loading`,
                `fetchPriority` and `decoding` are all set explicitly here,
                which is the whole of what next/image would have contributed.
              */}
              <img
                src={PORTRAITS.hero}
                srcSet={`${PORTRAITS.heroSmall} 700w, ${PORTRAITS.heroMid} 960w, ${PORTRAITS.hero} 1200w`}
                sizes="(min-width: 1024px) 420px, (min-width: 468px) 420px, calc(100vw - 48px)"
                alt={`Yuvraj Raulji, ${ROLE}`}
                width={1200}
                height={1680}
                /* Above the fold and the page's largest paint. Eager, high
                   priority, never lazy: the LCP element must not wait on an
                   intersection observer. */
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="relative block h-auto w-[calc(100%-24px)] rounded grayscale contrast-[1.06]"
              />
            </div>
          </Eager>
        </div>
      </Container>
    </Section>
  );
}
