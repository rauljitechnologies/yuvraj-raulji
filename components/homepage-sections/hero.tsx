import { HERO, PORTRAITS } from '../../lib/homepage';
import { fadeUp } from '../../lib/motion';
import { Cta, Marquee } from './primitives';
import { Rv } from './rv';

/**
 * Homepage hero, from the design canvas.
 *
 * The canvas offered two headline variants behind a `heroVariant` prop
 * ("statement" and "verbs"). Only the default, "statement", ships here. The
 * second was an alternate for the same slot rather than a state the page needs
 * at runtime, and carrying both would mean shipping two H1s and hiding one,
 * which is a real SEO cost for no reader benefit.
 */
export function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-[1440px] px-6 pt-24 lg:px-12 lg:pt-[120px]">
      {/*
        The faint blueprint grid. Two repeating linear-gradients, masked to a
        soft radial so it fades out before it reaches any edge. Decorative.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]"
      />

      <div className="relative grid items-end gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)]">
        <div>
          <Rv className="mb-8 flex items-center gap-3.5">
            <span className="h-px w-11 bg-accent" aria-hidden="true" />
            <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.3em] text-ink/55">
              {HERO.eyebrow}
            </span>
          </Rv>

          <Rv>
            <h1 className="m-0 font-manrope text-[clamp(44px,7.4vw,112px)] font-extralight leading-[0.94] tracking-[-0.045em] [text-wrap:balance]">
              I build with technology.{' '}
              <span className="block font-bold">
                I think in <span className="text-accent">business.</span>
              </span>
            </h1>
          </Rv>

          <Rv>
            <p className="mt-6 font-manrope text-[clamp(17px,1.6vw,22px)] font-medium leading-[1.4] tracking-[-0.01em] text-ink/90">
              {HERO.subLead}
            </p>
          </Rv>

          {/*
            The lead is JSX rather than a string in lib/homepage.ts because the
            canvas links two of its own nouns to the sections that answer them.
            Those are the page's first two internal links and the only ones
            above the fold, so they are worth the JSX.

            No year count here on purpose: the number lives in STATS and only
            in STATS, so it can never contradict itself across the page.
          */}
          <Rv>
            <p className="mt-10 max-w-[640px] font-manrope text-[19px] font-light leading-[1.65] text-ink/60">
              Yuvraj Raulji explores{' '}
              <a href="#ai" className="border-b border-accent/60 transition-colors hover:border-accent-bright hover:text-ink">
                AI
              </a>
              ,{' '}
              <a href="#expertise" className="border-b border-accent/60 transition-colors hover:border-accent-bright hover:text-ink">
                eCommerce
              </a>{' '}
              and digital transformation, with a focus on intelligent systems, digital commerce,
              automation and the technology decisions that create measurable business value. The
              work runs across storefronts, mobile app APIs, B2B systems and the operations behind
              them.
            </p>
          </Rv>

          <Rv className="mt-11 flex flex-wrap gap-4">
            <Cta href="#work" variant="solid">
              Explore my work <span className="font-mono">→</span>
            </Cta>
            <Cta href="#insights" variant="outline">
              Read my thinking
            </Cta>
          </Rv>
        </div>

        {/*
          The portrait plate: a hairline frame offset up-left, a solid accent
          block offset down-right, and the image sitting on top of both. The
          34px offsets are what give the stack its depth, so they are literal
          rather than a token.
        */}
        <Rv variants={fadeUp} delay={0.1}>
          <div className="relative flex h-[420px] items-end justify-center lg:h-[560px]">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-[34px] top-0 border border-ink/15 bg-surface"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-[calc(100%-34px)] w-[calc(100%-34px)] bg-accent"
            />

            <img
              src={PORTRAITS.hero}
              alt="Yuvraj Raulji"
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
              <circle cx="74" cy="106" r="4.5" fill="var(--accent-bright)" className="animate-yr-blink" />
            </svg>
          </div>
        </Rv>
      </div>

      <Marquee items={HERO.marquee} />
    </section>
  );
}
