import { EXPERTISE } from '../../lib/site';

export function Expertise() {
  return (
    <section id="expertise" className="relative overflow-hidden bg-bg2" style={{ padding: 'clamp(80px,10vw,140px) 0' }}>
      <div className="max-w-shell mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(280px,.55fr)] gap-10 items-end mb-[clamp(40px,6vw,72px)] reveal">
          <div>
            <p className="sec-kicker inline-flex items-center gap-[10px] text-[.68rem] font-semibold tracking-[.22em] uppercase text-rv mb-[10px]">
              Expertise
            </p>
            <h2 className="font-bebas uppercase tracking-[.03em] leading-[.94]" style={{ fontSize: 'clamp(2.2rem,5.5vw,4.8rem)' }}>
              Strategic Capabilities
            </h2>
          </div>
          <p className="text-[rgba(244,244,244,.60)]" style={{ fontSize: 'clamp(.92rem,1.2vw,1.06rem)', lineHeight: 1.74 }}>
            Luxury brand development and enterprise e-commerce architecture — precision-engineered digital experiences built for brands that set the standard.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]">
          {EXPERTISE.map((c) => (
            <article
              key={c.title}
              className="card relative overflow-hidden p-8 rounded border border-[rgba(255,255,255,.08)] bg-gradient-to-br from-[rgba(255,255,255,.05)] to-[rgba(255,255,255,.01)] transition-all duration-300 hover:border-[rgba(200,16,46,.32)] hover:-translate-y-[6px] hover:shadow-[0_28px_70px_rgba(0,0,0,.38)] active:scale-[.98] touch-manipulation reveal"
            >
              <div
                className="card-ic w-[50px] h-[50px] rounded-full grid place-items-center border border-[rgba(200,16,46,.32)] text-rv text-[1.15rem] bg-[rgba(200,16,46,.10)] mb-12 relative z-[1]"
                style={{ animation: 'fl 5s ease-in-out infinite' }}
              >
                {c.icon}
              </div>
              <h3
                className="font-bebas text-rv relative z-[1] uppercase tracking-[.03em] mb-2"
                style={{ fontSize: 'clamp(1.35rem,2vw,1.95rem)' }}
              >
                {c.title}
              </h3>
              <p className="text-[.90rem] text-[rgba(244,244,244,.60)] leading-[1.65] relative z-[1]">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
