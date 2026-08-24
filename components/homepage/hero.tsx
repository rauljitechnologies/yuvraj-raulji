import { HERO } from '../../lib/home';
import { getPhoto } from '../../lib/founder-photos';
import { ContactButton } from './contact-button';
import { Lines, Rise } from './motion';
import { Parallax } from './parallax';
import { Btn, Section, Shell } from './primitives';

/**
 * Hero.
 *
 * Source order is the mobile order: portrait, name and role, headline,
 * supporting copy, calls to action, discipline rail. Desktop puts the portrait
 * to the right of the text with `lg:order-2` and a two-column grid, so the
 * visual arrangement changes without the DOM order changing, and a screen
 * reader gets the same sequence on both.
 *
 * The role sits above the H1 rather than inside it. It is the positioning
 * string, repeated verbatim in the Person schema and the footer, and it belongs
 * in the reading order before the claim it qualifies. The H1 itself is a
 * sentence about the work, because an H1 that is only a job title tells a
 * visitor nothing they did not get from the tab.
 *
 * The portrait is the real photograph the repository ships (400×400). If a
 * larger frame-filling shot is dropped in as public/assets/founder/
 * hero-portrait.*, it is picked up automatically and used instead.
 */
export function Hero() {
  const photo = getPhoto('hero-portrait');

  return (
    <Section id="hero" open labelledBy="hero-title" className="!pt-[118px] md:!pt-[146px]">
      <Shell>
        <div className="grid items-center gap-x-12 gap-y-block lg:grid-cols-[minmax(0,1fr)_minmax(300px,.62fr)] lg:gap-x-16">
          {/* ── Portrait ── first in source, right-hand column on desktop ── */}
          {photo ? (
            <div className="order-1 lg:order-2">
              <Parallax distance={54} className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:mx-0 lg:max-w-[420px]">
                {/* Offset rule frame. Purely typographic furniture, so it is
                    hidden from assistive technology and sits behind the plate. */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-4 h-full w-full border border-accent/35"
                />
                <div className="yr-frame yr-frame--live relative aspect-square">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    /* Above the fold and the largest element in the viewport on
                       mobile, so it is the LCP candidate: eager, high priority,
                       never lazy. */
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 420px"
                  />
                </div>
              </Parallax>
            </div>
          ) : null}

          {/* ── Text ── */}
          <div className="order-2 lg:order-1">
            {/* The positioning string, and the only eyebrow. The name is
                already the nav wordmark two inches above this; repeating it
                here spent the most valuable line on the page saying nothing.
                One title, used identically here, in the Person schema and in
                the footer. */}
            <Rise as="p" className="mb-item flex items-center gap-3">
              <span aria-hidden="true" className="yr-dot" />
              <span className="font-display text-[.8rem] uppercase tracking-[.24em] text-accent-bright">
                {HERO.role}
              </span>
            </Rise>

            <Lines as="h1" id="hero-title" size="1" lines={HERO.headline} softFrom={2} />

            <Rise delay={0.3} className="mt-block">
              <p className="yr-lede max-w-[54ch]">{HERO.lede}</p>
            </Rise>

            <Rise delay={0.42} className="mt-block flex flex-wrap gap-3">
              <ContactButton>{HERO.ctaPrimary.label}</ContactButton>
              <Btn href={HERO.ctaSecondary.href} variant="ghost">
                {HERO.ctaSecondary.label}
              </Btn>
            </Rise>

            {/* Discipline rail. Real text, not logos: these are the six things
                the site is about, and a wall of vendor marks would say less
                while weighing more. */}
            <Rise
              delay={0.5}
              className="mt-block border-t border-[var(--rule)] pt-item"
            >
              <ul className="flex flex-wrap gap-x-5 gap-y-tight">
                {HERO.disciplines.map((d, i) => (
                  <li key={d} className="flex items-center gap-5">
                    {i > 0 ? (
                      <span
                        aria-hidden="true"
                        className="hidden h-1 w-1 rounded-full bg-accent sm:block"
                      />
                    ) : null}
                    <span className="text-[.72rem] font-medium uppercase tracking-[.16em] text-ink-muted">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </Rise>
          </div>
        </div>

        {/* ── Scroll cue ── decorative; the nav already provides the same jumps ── */}
        <div aria-hidden="true" className="mt-head hidden items-center gap-4 lg:flex">
          <span className="yr-cue__line" />
          <span className="yr-label">Scroll</span>
        </div>
      </Shell>
    </Section>
  );
}
