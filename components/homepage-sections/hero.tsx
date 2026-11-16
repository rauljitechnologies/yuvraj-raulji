import { ROLE } from '../../lib/identity';
import { HERO, PORTRAITS } from '../../lib/homepage';
import { RESUME } from '../../lib/resume';
import { resumeAvailable } from '../../lib/resume-file';
import { Cta, Marquee } from './primitives';
import { Eager } from './rv';

/* Resolved once at build time. This is a server component, so the filesystem
   check is legal here; see the boundary note in lib/resume-file.ts. */
const resumeReady = resumeAvailable();

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
          <Eager className="mb-6 flex items-center gap-3.5 sm:mb-8">
            <span className="h-px w-11 shrink-0 bg-accent" aria-hidden="true" />
            <span className="font-mono text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.3em] text-ink">
              {HERO.eyebrow}
            </span>
          </Eager>

          {/*
            One H1, and it names what the work produces.

            It read "eCommerce, AI & Technology Consultant", which is a job
            title. A title belongs in the Person node's `jobTitle` and in the
            eyebrow above, and it is doing both of those now; an H1 that is only
            a title spends the largest type on the page saying something the
            eyebrow already said.

            Two lines, authored, from `HERO.h1` which is `HEADLINE` in
            lib/identity.ts. The accent falls on the second line because the
            first half is the established record and the second is the newer
            claim, so the colour marks the part being asserted rather than
            decorating the whole.

            The size drops from 92px to 76px at the top of the clamp. The old
            H1 was three words on two lines; this is nine, and at 92px it ran
            to four lines on a desktop and pushed the calls to action under the
            fold, which is the one thing the first screen cannot afford.

            The rag is authored from `sm` up, where the column is wide enough
            for a break to mean anything. Below that the browser wraps.
          */}
          <Eager delay={0.06}>
            <h1 className="m-0 max-w-[21ch] font-manrope text-[clamp(34px,4.9vw,76px)] font-extralight leading-[1.04] tracking-[-0.038em] text-ink/90">
              {HERO.h1.map((line, i) => {
                const text = typeof line === 'string' ? line : line.text;
                const accent = typeof line === 'string' ? false : line.accent;
                return (
                  <span key={text} className="block">
                    {accent ? (
                      <span className="font-bold text-accent-bright">{text}</span>
                    ) : (
                      text
                    )}
                    {i === 0 ? ' ' : null}
                  </span>
                );
              })}
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
          {/*
            The availability line, directly above the calls to action.

            This is the sentence the site's primary objective rests on, so it
            is the last thing read before the buttons rather than a band three
            scrolls down. The blinking dot is the same mark the header strip
            and /remote-work/ use, so the three read as one signal.

            It replaced a paragraph that linked three of its own nouns to
            #expertise, #growth and #ai. Two of those were worth keeping and
            one, #growth, was an anchor to a section this page no longer
            renders: it pointed at nothing and had done since the homepage was
            rebuilt. The two live links moved into the specialty row below.
          */}
          <Eager delay={0.18}>
            <p className="mt-7 flex max-w-[600px] items-start gap-3.5">
              <span
                aria-hidden="true"
                className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-accent animate-yr-blink"
              />
              <span className="font-mono text-[12px] font-medium uppercase leading-[1.6] tracking-[0.18em] text-accent-bright">
                {HERO.availability}
              </span>
            </p>
          </Eager>

          {/*
            Three calls to action, one per audience, in the order the site
            prioritises them: the work (anyone), the role (a recruiter), the
            document (a recruiter who has decided).

            The previous pair both pointed at #contact and both asked for a
            consultation, which served one audience twice. "Book a 30-minute
            consultation" also fired `consultation_cta_click` against a
            scheduling step that does not exist; the note in app/layout.tsx
            records that it resolved to an on-page anchor, so a click meant a
            reader wanted to book and could not.

            The resume button only renders when the file is actually in
            public/. See the gate at the top of lib/resume.ts.
          */}
          <Eager className="mt-9 flex flex-wrap gap-3 sm:mt-11 sm:gap-4" delay={0.24}>
            <Cta href="/work/" variant="accent">
              Explore My Work
            </Cta>
            <Cta href="/remote-work/" variant="outline">
              Remote Opportunities <span className="font-mono">→</span>
            </Cta>
            {resumeReady ? (
              <Cta href={RESUME.href} variant="outline">
                Download Resume
              </Cta>
            ) : (
              <Cta href="/resume/" variant="outline">
                View Resume
              </Cta>
            )}
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
              alt="Yuvraj Raulji, Senior Software Engineer and Enterprise eCommerce Architect"
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
                {ROLE}
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
