import { HERO, PORTRAITS } from '../../lib/homepage';
import { Cta, Marquee } from './primitives';
import { Eager } from './rv';

/**
 * Homepage hero.
 *
 * What this section has to do, in order: name the person, name the job, say
 * which problems he is called for, and offer one obvious next step. The
 * previous hero did the first and the fourth and left the middle two to be
 * inferred from a headline about how he thinks. A visitor who has to infer the
 * job leaves before the second section.
 *
 * The portrait plate stays. It is the strongest asset on the page and it is
 * what separates a consultant's homepage from an agency's: an agency shows the
 * work first because there is no one person to show.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-[1440px] px-5 pt-[128px] sm:px-6 sm:pt-[140px] md:px-8 lg:px-12 lg:pt-[176px]"
    >
      {/*
        The faint blueprint grid. Two repeating linear-gradients, masked to a
        soft radial so it fades out before it reaches any edge. Decorative.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]"
      />

      <div className="relative grid items-end gap-10 sm:gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)]">
        <div>
          {/*
            Two lines: the name, then the remit. `leading-none` was fine while
            this held one line and illegible the moment it wrapped, which it
            does on any phone.
          */}
          <Eager className="mb-6 flex items-start gap-3.5 sm:mb-8">
            <span className="mt-[7px] h-px w-11 shrink-0 bg-accent" aria-hidden="true" />
            <span className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.3em] text-ink">
                {HERO.eyebrow}
              </span>
              <span className="font-mono text-[11px] font-medium uppercase leading-[1.4] tracking-[0.3em] text-ink/55">
                {HERO.eyebrowSub}
              </span>
            </span>
          </Eager>

          {/*
            One H1, and it names the role.

            Set as one sentence in two weights rather than as a two-sentence
            ladder: "eCommerce, AI and Technology" is the subject and
            "Consultant" is the noun that makes it a job, so the weight change
            lands on the word that does the work. The red sits on nothing here.
            Section 32 of BRAND-DESIGN-GUIDELINE.md asks for the accent not to
            be overused, and an H1 that is already the largest thing on the
            page does not need colour to be found.

            The rag is authored below `sm`, where the column is too narrow for
            an authored break to mean anything and the browser wraps on its own.
          */}
          <Eager delay={0.06}>
            <h1 className="m-0 max-w-[15ch] font-manrope text-[clamp(40px,6.2vw,92px)] font-light leading-[1.0] tracking-[-0.042em] text-ink/85">
              eCommerce, AI <br className="hidden sm:inline" />
              &amp; Technology <span className="font-semibold text-ink">Consultant</span>
            </h1>
          </Eager>

          <Eager delay={0.12}>
            <p className="mt-7 max-w-[62ch] font-manrope text-[clamp(17px,1.5vw,21px)] font-normal leading-[1.5] tracking-[-0.01em] text-ink/85">
              {HERO.subLead}
            </p>
          </Eager>

          {/*
            The second paragraph links three of its own nouns to the sections
            that answer them. These are the page's first internal links and the
            only ones above the fold, which is why the sentence is JSX rather
            than a string in lib/homepage.ts.

            No year count here on purpose: the number lives in STATS and only in
            STATS, so it can never contradict itself across the page.
          */}
          <Eager delay={0.18}>
            <p className="mt-6 max-w-[600px] font-manrope text-[16px] font-light leading-[1.7] text-ink/55 sm:text-[17px]">
              The work is{' '}
              <a
                href="#expertise"
                className="border-b border-accent/60 transition-colors hover:border-accent-bright hover:text-ink"
              >
                commerce strategy and architecture
              </a>
              ,{' '}
              <a
                href="#growth"
                className="border-b border-accent/60 transition-colors hover:border-accent-bright hover:text-ink"
              >
                performance and conversion
              </a>{' '}
              and{' '}
              <a
                href="#ai"
                className="border-b border-accent/60 transition-colors hover:border-accent-bright hover:text-ink"
              >
                practical AI
              </a>
              , for businesses deciding what to build, what to fix and what to
              leave alone.
            </p>
          </Eager>

          <Eager className="mt-9 flex flex-wrap gap-3 sm:mt-11 sm:gap-4" delay={0.24}>
            <Cta href="#contact" variant="accent">
              Book a 30-minute consultation
            </Cta>
            <Cta href="#work" variant="outline">
              Explore my work <span className="font-mono">→</span>
            </Cta>
          </Eager>
        </div>

        {/*
          The portrait plate: a hairline frame offset up-left, a solid accent
          block offset down-right, and the image sitting on top of both. The
          34px offsets are what give the stack its depth, so they are literal
          rather than a token.
        */}
        <Eager delay={0.3}>
          <div className="relative mx-auto flex h-[380px] w-full max-w-[400px] items-end justify-center sm:h-[420px] lg:mx-0 lg:h-[560px] lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-[34px] top-0 border border-ink/15 bg-surface"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-[calc(100%-34px)] w-[calc(100%-34px)] bg-accent"
            />

            {/*
              Two cuts of one photograph. The plate is at most 400px wide under
              `lg`, so a phone was decoding a 1200px file to paint 400: the 700
              cut is a third of the bytes on the element that decides mobile
              LCP. `sizes` is written against the plate's own widths, not the
              viewport's.
            */}
            <img
              src={PORTRAITS.hero}
              srcSet={`${PORTRAITS.heroSmall} 700w, ${PORTRAITS.hero} 1200w`}
              sizes="(min-width: 1024px) 480px, min(400px, 100vw)"
              alt="Yuvraj Raulji, eCommerce, AI and technology consultant"
              width={1200}
              height={1680}
              // Above the fold and the page's largest paint. Eager, high
              // priority, and never lazy: the LCP element must not wait on the
              // intersection observer.
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute left-0 top-0 h-[calc(100%-34px)] w-[calc(100%-34px)] object-cover object-[50%_18%] grayscale contrast-[1.06]"
            />

            {/* Legibility scrim for the name plate below it. */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-[calc(100%-34px)] w-[calc(100%-34px)] bg-[linear-gradient(180deg,rgba(5,5,5,0)_42%,rgba(5,5,5,.82)_100%)]"
            />

            <div className="absolute bottom-14 left-[22px] flex flex-col gap-1.5">
              <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.26em] text-accent-bright">
                Vadodara · India
              </span>
              <span className="font-manrope text-xl font-semibold leading-[1.15] tracking-[-0.02em]">
                Yuvraj Raulji
              </span>
              <span className="font-mono text-xs leading-[1.4] text-ink/60">
                Commerce · Technology · AI
              </span>
            </div>

            {/* Floating monogram dial. Purely ambient. */}
            <svg
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden="true"
              className="absolute -bottom-3.5 -right-3.5 w-[118px] opacity-85 animate-yr-float"
            >
              <g stroke="rgba(255,255,255,.08)" strokeWidth="1">
                <circle cx="100" cy="100" r="92" />
                <circle cx="100" cy="100" r="64" />
                <path d="M8 100 H192 M100 8 V192" />
              </g>
              <path
                d="M34 46 L74 106 M114 46 L74 106 M74 106 L74 166"
                stroke="#fff"
                strokeWidth="9"
                strokeLinecap="square"
              />
              <path
                d="M126 46 H152 A17 17 0 0 1 152 90 H126 M148 90 L174 166"
                stroke="rgba(255,255,255,.22)"
                strokeWidth="9"
                strokeLinecap="square"
              />
              {/* The accent tracer that runs the monogram's outline on a loop. */}
              <path
                d="M34 46 L74 106 L74 166 M126 46 H152 A17 17 0 0 1 152 90 H126 M148 90 L174 166"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="120 500"
                className="animate-yr-dash [stroke-dashoffset:620]"
              />
              <circle
                cx="74"
                cy="106"
                r="4.5"
                fill="var(--accent-bright)"
                className="animate-yr-blink"
              />
            </svg>
          </div>
        </Eager>
      </div>

      <Marquee items={HERO.marquee} />
    </section>
  );
}
