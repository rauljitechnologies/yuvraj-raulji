import { EXPERTISE_LINE, ROLE_LINE } from '../../lib/identity';
import { HERO, PORTRAITS } from '../../lib/homepage';
import { CONTACT } from '../../lib/site';
import { Cta, Marquee } from './primitives';
import { Eager } from './rv';

/* The resume gate (`resumeAvailable()`) was read here for a Download Resume
   button in the hero. That button served a recruiter; the objective is client
   work, so it is gone from the first screen. /resume/ still gates on the
   file. */

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
          <Eager className="mb-6 sm:mb-8">
            <span className="flex items-center gap-3.5">
              <span className="h-px w-11 shrink-0 bg-accent" aria-hidden="true" />
              <span className="font-mono text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.3em] text-ink">
                {HERO.eyebrow}
              </span>
            </span>
            {/*
              The headline, under the name and above the H1 that states what
              the work produces.

              It is set in the body face rather than the eyebrow's mono: at 151
              characters the mono's 0.3em tracking runs it to four lines and
              pushes the H1 out of the opening viewport, which is the LCP
              element on this page. Indented to the eyebrow's text so the rule
              reads as marking both lines, and the separators are dimmed so the
              specialisms scan as a list rather than as one long sentence.
            */}
            <span className="mt-3 block max-w-[46ch] pl-[58px] font-manrope text-[13px] font-light leading-[1.7] text-ink/55 sm:max-w-[72ch] sm:text-[14px]">
              {HERO.eyebrowSub.split(' | ').map((part, i, all) => (
                /*
                  Each item is its own unbreakable unit, separator included, so
                  a line break falls between items and never inside one. Left
                  to wrap as plain text it broke "Generative AI" across two
                  lines and started the next with a dangling "AI", which reads
                  as a seventh specialism rather than the tail of the sixth.
                */
                <span key={part} className="inline-block whitespace-nowrap">
                  {part}
                  {i < all.length - 1 ? (
                    <>
                      {/*
                        The separator trails its item rather than leading the
                        next one. Leading, it wrapped to the head of a new line
                        and every continuation line opened with a stray "|".
                        Trailing, a break falls after it, where a separator
                        reads as "continues below".
                      */}
                      <span aria-hidden="true" className="px-2 text-ink/25">
                        |
                      </span>
                      {/*
                        The pipe is aria-hidden and these spans sit flush
                        together, so without this a screen reader runs the
                        parts into each other: "Technology ConsultantFull-Stack
                        Development". A comma restores the boundary and is read
                        as the pause it is, where a spoken "vertical bar"
                        between every item would not be.
                      */}
                      <span className="sr-only">, </span>
                    </>
                  ) : null}
                </span>
              ))}
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
            and /remote-collaboration/ use, so the three read as one signal.

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
            Three calls to action, from the brief: hire, view work, WhatsApp.

            They used to be Explore My Work / Remote Opportunities / Download
            Resume, which served a recruiter. The objective is client work, so
            the primary is now the commercial one, and the third is WhatsApp:
            for a good share of this audience it is the fastest route to a
            conversation and the one most likely to be used on a phone.

            The resume download left the first screen entirely. It is still on
            /resume/ and in the Resources menu, where a reader who wants it
            will look; it is not what a prospective client is here for, and it
            was the only thing in the hero aimed at an employer.

            `external` on the WhatsApp button adds the tab target, the rel and
            an off-screen note, because a button that opens a new tab should
            say so in its accessible name.
          */}
          <Eager className="mt-9 flex flex-wrap gap-3 sm:mt-11 sm:gap-4" delay={0.24}>
            <Cta href="/contact/" variant="accent">
              Discuss Your Project
            </Cta>
            <Cta href="/work/" variant="outline">
              Explore My Work <span className="font-mono">&#8594;</span>
            </Cta>
            <Cta href={CONTACT.whatsapp} variant="outline" external="WhatsApp">
              WhatsApp Me
            </Cta>
          </Eager>

          {/*
            The credibility line, under the calls to action rather than above
            them. Above, it separates the supporting paragraph from the button
            the paragraph is arguing for; below, it is the last thing read
            before the decision and it is evidence rather than preamble.

            Same unbreakable-item treatment as the headline above: these are
            five units and a line must not break inside "9+ Years Experience".
          */}
          <Eager className="mt-7 sm:mt-8" delay={0.3}>
            <p className="m-0 max-w-[46ch] font-mono text-[11px] font-medium uppercase leading-[1.9] tracking-[0.14em] text-ink/50 sm:max-w-none sm:text-[12px]">
              {EXPERTISE_LINE.map((part, i, all) => (
                <span key={part} className="inline-block whitespace-nowrap">
                  {part}
                  {i < all.length - 1 ? (
                    <>
                      <span aria-hidden="true" className="px-2.5 text-accent/50">
                        |
                      </span>
                      <span className="sr-only">, </span>
                    </>
                  ) : null}
                </span>
              ))}
            </p>
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
              srcSet={`${PORTRAITS.heroSmall} 700w, ${PORTRAITS.heroMid} 960w, ${PORTRAITS.hero} 1200w`}
              /*
                Measured, not estimated. `sizes` is a promise about the box,
                and the browser multiplies it by device pixel ratio before
                choosing a candidate, so overstating it costs bytes on exactly
                the element that decides LCP.

                This said `(min-width: 1024px) 480px, min(400px, 100vw)`, and
                both halves were too big: the plate is inset 34px inside a
                shell that is itself padded, so under `lg` it measures
                `100vw - 74px`, and on a large desktop it is 464px, not 480.
                The consequence was that a DPR-2 phone asked for 800 pixels
                for a 286px box and took the 118 KB file.

                The values below are the element's actual width, measured
                across thirteen viewports from 320 to 1920:

                  up to 439px     100vw - 74px   (246 at 320, 338 at 412)
                  440 to 1023     366px          (the plate hits its max)
                  1024 to 1279    303px          (the two-column layout)
                  1280 to 1439    402px
                  1440 and up     464px
              */
              sizes="(min-width: 1440px) 464px, (min-width: 1280px) 402px, (min-width: 1024px) 303px, (min-width: 440px) 366px, calc(100vw - 74px)"
              alt="Yuvraj Raulji, Senior Software Developer and Technology Consultant"
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
                {ROLE_LINE}
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
