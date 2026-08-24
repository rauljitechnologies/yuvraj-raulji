import { HERO, NAME, POSITIONING } from '../../lib/brand';
import { getPhoto } from '../../lib/founder-photos';
import { Lines, Rise } from '../homepage/motion';
import { Btn, Shell } from '../homepage/primitives';

/**
 * Hero.
 *
 * Editorial type on the left, a portrait plate on the right, which is the
 * arrangement the brief specifies and also the one that lets the H1 be
 * genuinely oversized: four short authored lines in a half-width column set
 * larger than two long ones ever could across the full width.
 *
 * ── On the portrait ────────────────────────────────────────────────────────
 *
 * The photograph is real and is never generated. The repository currently
 * ships one file, a 400x400 portrait, and the plate is sized from what the
 * resolver actually finds rather than from what the layout would prefer:
 *
 *   - A source at 1200px or wider gets the full-height cinematic plate the
 *     brief asks for, running to 78vh.
 *   - Anything smaller is capped at a width where it still resolves at roughly
 *     1x on a retina display, and the composition does the work instead: the
 *     frame, the grade, the drifting scale and the red rule beside it.
 *
 * Upscaling the 400px file to fill a 78vh plate would put a soft, visibly
 * interpolated face at the top of the page, which is worse than a smaller
 * sharp one. Drop a >=1200px `hero-portrait.*` into public/assets/founder/ and
 * the large plate switches on at the next build with no code change. See that
 * directory's README; it is the single biggest image-quality win available
 * here.
 */
export function Hero() {
  const portrait = getPhoto('hero-portrait');
  const cinematic = portrait !== null && portrait.width >= 1200;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="yr-section yr-section--open !pt-[112px] md:!pt-[140px]"
    >
      <Shell>
        <div className="grid items-center gap-x-14 gap-y-grid lg:grid-cols-[minmax(0,1.06fr)_minmax(0,.94fr)]">
          {/* ══ Left: the type ══════════════════════════════════════ */}
          <div className="order-2 lg:order-1">
            <Rise as="p" className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="yr-label text-ink">{NAME}</span>
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              <span className="yr-label yr-label--accent">{POSITIONING}</span>
            </Rise>

            <Lines
              as="h1"
              id="hero-title"
              size="1"
              lines={HERO.headline}
              delay={0.1}
              className="mt-block"
            />

            {/* The secondary statement. Three beats, set as one line on a
                phone and spaced across the column above 640. */}
            <Rise delay={0.5} className="mt-block flex flex-wrap items-center gap-x-5 gap-y-1">
              {HERO.statement.map((word) => (
                <span
                  key={word}
                  className="font-display text-[clamp(.95rem,1.5vw,1.2rem)] font-medium uppercase tracking-[.14em] text-ink-muted"
                >
                  {word}
                </span>
              ))}
            </Rise>

            <Rise delay={0.58} className="mt-block">
              <p className="yr-lede max-w-[46ch]">{HERO.lede}</p>
            </Rise>

            <Rise delay={0.66} className="mt-head flex flex-wrap gap-3">
              <Btn href={HERO.ctaPrimary.href}>{HERO.ctaPrimary.label}</Btn>
              <Btn href={HERO.ctaSecondary.href} variant="ghost">
                {HERO.ctaSecondary.label}
              </Btn>
            </Rise>

            {/* Credibility. One number, with the date it is measured from,
                because a figure without its start date is one nobody can
                check. */}
            <Rise delay={0.74} className="mt-head flex items-baseline gap-4 border-t border-line pt-item">
              <span className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium leading-none tracking-[-.03em] text-ink">
                {HERO.credibility.value}
              </span>
              <span>
                <span className="yr-label block text-ink">{HERO.credibility.label}</span>
                <span className="mt-hair block text-[.78rem] leading-[1.5] text-ink-faint">
                  {HERO.credibility.note}
                </span>
              </span>
            </Rise>
          </div>

          {/* ══ Right: the portrait ═════════════════════════════════
              Deliberately NOT wrapped in <Rise>. Rise is a `whileInView`
              entrance, which means the element ships with opacity:0 in the
              static HTML and only becomes visible once React has hydrated and
              an IntersectionObserver has fired. This is the LCP element on the
              page: gating it behind JavaScript means the largest paint cannot
              happen until the bundle has downloaded, parsed and run, which is
              a self-inflicted LCP penalty measured in whole seconds on a slow
              connection.

              It fades in with a CSS animation instead. CSS runs off the
              parser, so the image paints as soon as it decodes, with or
              without JavaScript. */}
          <div className="order-1 lg:order-2 lg:justify-self-end">
            {portrait ? (
              <div className="yr-portrait-plate relative">
                {/* The red rule. Hugs the plate rather than the column edge,
                    so it reads as part of the composition instead of as a
                    stray line in the gutter. */}
                <span
                  aria-hidden="true"
                  className="absolute -left-5 top-0 hidden h-full w-px bg-gradient-to-b from-accent via-accent-deep to-transparent lg:block"
                />
                <figure
                  className={`yr-portrait yr-fade w-full ${
                    cinematic ? 'h-[64vh] max-h-[780px] min-h-[440px]' : 'max-w-[440px]'
                  }`}
                  style={
                    cinematic ? undefined : { aspectRatio: `${portrait.width}/${portrait.height}` }
                  }
                >
                  <img
                    src={portrait.src}
                    alt={`${NAME}, working at the intersection of AI, business and eCommerce`}
                    width={portrait.width}
                    height={portrait.height}
                    /* The LCP element. Eager, decoded synchronously, and given
                       fetchPriority so it is not queued behind the fonts. */
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 90vw, 44vw"
                  />
                </figure>
              </div>
            ) : null}
          </div>
        </div>

        {/* Scroll cue. Decorative, hidden from assistive technology, and gone
            the moment the viewport is short enough that it would collide. */}
        <div aria-hidden="true" className="mt-grid hidden justify-center lg:flex">
          <span className="yr-cue__line" />
        </div>
      </Shell>
    </section>
  );
}
