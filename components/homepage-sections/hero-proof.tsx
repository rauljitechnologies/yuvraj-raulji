import { CLIENT_LOGOS, TECH_STACK } from '../../lib/homepage';

/**
 * The two strips under the hero's calls to action: a client logo row and the
 * tech-stack marquee.
 *
 * Both are server components. The marquee is a CSS animation and the logo
 * row is a hover state, so neither needs JavaScript.
 */

/**
 * Client logos. Grayscale, colour on hover, per the guideline.
 *
 * ── These are PLACEHOLDERS, and they say so ───────────────────────────────
 *
 * There are no logo files in public/, and a logo wall is a claim about who
 * the work was for. Rather than ship five invented SVGs or an empty row,
 * each entry renders as a wordmark at the row's real height and rhythm, and
 * the row carries a visible TODO note until real assets replace it.
 *
 * The note is deliberately visible rather than a code comment: an invisible
 * placeholder is how a mockup ships to production as a factual claim.
 *
 * When the files arrive, give each entry in `CLIENT_LOGOS` a `src` and this
 * renders an <img> instead, with the grayscale-to-colour transition applied
 * to the image rather than to the text.
 */
function ClientLogos() {
  const anyReal = CLIENT_LOGOS.some((l) => l.src);

  return (
    <div>
      <p className="m-0 font-mono text-eyebrow font-medium uppercase text-ink-faint">
        Sectors delivered in
      </p>

      <ul className="m-0 mt-4 flex list-none flex-wrap items-center gap-x-8 gap-y-4 p-0">
        {CLIENT_LOGOS.map((logo) => (
          <li key={logo.name}>
            {logo.src ? (
              <img
                src={logo.src}
                alt={logo.name}
                height={28}
                loading="lazy"
                decoding="async"
                /* `grayscale` plus a reduced opacity, because a logo wall at
                   full strength competes with the H1 directly above it. */
                className="h-7 w-auto opacity-60 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <span className="font-heading text-small font-bold uppercase tracking-[0.08em] text-ink-faint transition-colors duration-300 hover:text-ink">
                {logo.name}
              </span>
            )}
          </li>
        ))}
      </ul>

      {!anyReal ? (
        <p className="m-0 mt-3 font-mono text-eyebrow uppercase text-accent-bright">
          TODO: swap for client logo files once use is cleared
        </p>
      ) : null}
    </div>
  );
}

/** The tech-stack marquee. See the `.yr-marquee` note in app/globals.css. */
function TechMarquee() {
  const row = (
    <ul className="m-0 flex list-none items-center gap-10 p-0 pr-10">
      {TECH_STACK.map((item) => (
        <li
          key={item}
          className="flex shrink-0 items-center gap-10 whitespace-nowrap font-mono text-eyebrow font-medium uppercase text-ink-muted"
        >
          {item}
          <span aria-hidden="true" className="text-accent">
            ·
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="yr-marquee relative overflow-hidden border-y border-line py-4"
      role="group"
      aria-label={`Platforms and technologies: ${TECH_STACK.join(', ')}`}
    >
      <div className="yr-marquee-track">
        {row}
        {/* The seamless second copy. Hidden from assistive tech so the five
            names are announced once, not twice. */}
        <div aria-hidden="true" className="flex">
          {row}
        </div>
      </div>
    </div>
  );
}

export function HeroProof() {
  return (
    <div className="mt-12 flex flex-col gap-8">
      <ClientLogos />
      <TechMarquee />
    </div>
  );
}
