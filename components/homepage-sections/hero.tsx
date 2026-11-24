import { ROLE } from '../../lib/identity';
import { HERO, HERO_EYEBROW, HERO_H1, PORTRAITS } from '../../lib/homepage';
import { HeroProof } from './hero-proof';
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
    <Section id="top" labelledBy="hero-title" tone="ink">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            {/* The eyebrow: the name, and one role line. A <p>, not a
                heading — the h1 below is the first heading on the page. */}
            <Eager>
              {/* One line, from the guideline. It was the name, a slash and
                  the job title in two different inks, which is a lockup
                  rather than a sentence; this states the position once. */}
              <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span aria-hidden="true" className="h-px w-6 shrink-0 bg-accent" />
                <span className="font-mono text-eyebrow font-medium uppercase text-ink-muted">
                  {HERO_EYEBROW}
                </span>
              </p>
            </Eager>

            {/*
              The one h1 on the page.

              `HERO_H1` is authored as runs rather than lines, so exactly one
              of them takes the accent. The guideline asks for "only the
              outcome word in crimson": the outcome is what the stores do
              differently afterwards, so "sell more" is crimson and nothing
              else is. The previous hero coloured a whole line, which reads as
              decoration rather than emphasis.

              No `block` on the spans, so it wraps as prose and the break
              falls wherever the measure puts it. At the 80px ceiling and a
              24ch measure that is two lines on a desktop and three on a
              phone, inside the brief's budget.

              `text-h1` carries the size, the 1.1 line height and the -0.02em
              tracking from the scale, so this heading cannot drift from the
              other 91 on the site.
            */}
            <Eager delay={0.06} className="mt-6">
              <h1
                id="hero-title"
                className="m-0 max-w-[24ch] font-heading text-h1 font-extrabold text-ink"
              >
                {HERO_H1.map((part) =>
                  part.accent ? (
                    <span key={part.text} className="text-accent-bright">
                      {part.text}
                    </span>
                  ) : (
                    <span key={part.text}>{part.text}</span>
                  ),
                )}
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
              calls to action, which were the same first three of the
              five-figure strip one section below. Removed; the strip is the
              page's one proof block.

              In its place, the two strips the guideline asks for: the client
              logo row and the tech-stack marquee. Both carry information the
              hero does not otherwise state, which is the test the old proof
              row failed.
            */}
            <Eager delay={0.24}>
              <HeroProof />
            </Eager>
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
            {/*
              The plate is one element now.

              It was three stacked boxes: a hairline frame offset up-left, a
              solid crimson rectangle offset down-right by 24px so it read as
              a bar down two edges, and the photograph on top. The guideline
              removes the bar, and with the bar gone the offset frame behind
              it has nothing to offset against, so both are gone and the
              photograph is the plate.

              That also settles the accent budget: crimson is now the CTA,
              one word of the H1 and active states, which is what the
              guideline restricts it to. A 400px solid crimson rectangle in
              the first screen was the single largest use of it on the site.
            */}
            <div className="relative mx-auto w-full max-w-[420px] lg:mr-0">

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
                /* In colour, and `rounded-2xl` (16px) so the portrait is visibly
                   rounder than a card. It was `grayscale contrast-[1.06]`;
                   the guideline asks for colour. */
                className="relative block h-auto w-full rounded-2xl border border-line"
              />
            </div>
          </Eager>
        </div>
      </Container>
    </Section>
  );
}
