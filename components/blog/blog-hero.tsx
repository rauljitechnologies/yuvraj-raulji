import Link from 'next/link';

const TICKER = [
  'Magento 2',
  'Shopify',
  'SEO & CRO',
  'AWS & Server',
  'WordPress',
  'E-commerce',
  'Digital Growth',
  'Consulting',
  'Strategy',
  'Yuvraj Raulji',
];

const STATS = [
  { v: '8', l: 'Articles' },
  { v: '9+', l: 'Years Exp.' },
  { v: '5', l: 'Topics' },
];

const displayFace = { fontFamily: 'var(--font-display), "Bebas Neue", sans-serif' } as const;

function TickerRun() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 28,
        padding: '0 28px',
        fontSize: '.60rem',
        fontWeight: 700,
        letterSpacing: '.24em',
        textTransform: 'uppercase',
        color: 'rgba(245, 245, 242,.28)',
        whiteSpace: 'nowrap',
      }}
    >
      {TICKER.map((t) => (
        <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#e50920', flexShrink: 0 }} />
          {t}
        </span>
      ))}
    </span>
  );
}

/**
 * `svh`, not `vh`. On a phone `100vh` measures the viewport with the browser
 * chrome retracted, so a hero sized to it is always taller than what the reader
 * can actually see and the first screen never fits. `min-h-screen` stays as the
 * fallback for anything without the small-viewport units.
 */
export function BlogHero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-bg supports-[min-height:100svh]:min-h-[100svh]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 80% at -5% 45%,rgba(229, 9, 32,.22) 0%,transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 105% 90%,rgba(140,8,22,.18) 0%,transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(6,6,6,.60) 0%,transparent 30%,transparent 70%,rgba(6,6,6,.40) 100%)' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.055,
            backgroundImage:
              'linear-gradient(rgba(229, 9, 32,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(229, 9, 32,.25) 1px,transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <div
          className="absolute select-none pointer-events-none"
          style={{ ...displayFace, right: '-2%', bottom: '-4%', fontSize: '38vw', lineHeight: 1, color: 'rgba(229, 9, 32,.045)', letterSpacing: '-.02em', animation: 'shimmer 5s ease-in-out infinite' }}
        >
          2026
        </div>
        <div className="absolute left-0 top-0 bottom-0 hidden xl:flex flex-col items-center justify-center gap-4 pl-[18px]" style={{ zIndex: 3 }}>
          <span
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontSize: '.55rem',
              fontWeight: 700,
              letterSpacing: '.32em',
              color: 'rgba(245, 245, 242,.18)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            Digital Insights · Yuvraj Raulji
          </span>
          <span style={{ width: 1, height: 56, background: 'linear-gradient(transparent,rgba(229, 9, 32,.50),transparent)' }} />
        </div>
      </div>

      <div className="relative z-[2] flex-1 flex items-center" style={{ padding: '100px 0 0' }}>
        <div className="w-full max-w-shell mx-auto px-6 md:px-10 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-10 xl:gap-16 items-stretch" style={{ minHeight: 'clamp(560px,60vh,720px)' }}>
            {/* LEFT */}
            <div className="flex flex-col justify-between py-6 lg:py-10 reveal">
              <div>
                <h1 className="leading-none mb-8" style={{ marginLeft: -2 }} aria-label="Blog & Insights">
                  <div style={{ ...displayFace, fontSize: 'clamp(4rem,10.2vw,9.6rem)', lineHeight: 0.87, letterSpacing: '.01em', WebkitTextStroke: '1.5px rgba(245, 245, 242,.11)', color: 'transparent', display: 'block' }} aria-hidden="true">
                    BLOG
                  </div>
                  <div style={{ ...displayFace, fontSize: 'clamp(2.4rem,5.8vw,5.5rem)', lineHeight: 0.88, letterSpacing: '.01em', color: '#f0263c', marginTop: '-.06em', display: 'block' }}>
                    &amp;
                  </div>
                  <div style={{ ...displayFace, fontSize: 'clamp(4rem,10.2vw,9.6rem)', lineHeight: 0.87, letterSpacing: '.01em', color: '#f5f5f2', marginTop: '-.06em', display: 'block' }}>
                    INSIGHTS
                  </div>
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                  <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg,#e50920 0%,rgba(229, 9, 32,.22) 60%,transparent 100%)' }} />
                  <span style={{ fontSize: '.54rem', fontWeight: 700, letterSpacing: '.30em', textTransform: 'uppercase', color: 'rgba(229, 9, 32,.55)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    Vadodara, India
                  </span>
                </div>

                <p style={{ fontSize: 'clamp(.96rem,1.25vw,1.10rem)', lineHeight: 1.82, color: 'rgba(245, 245, 242,.52)', maxWidth: 430 }}>
                  In-depth guides from <strong style={{ color: '#f5f5f2', fontWeight: 600 }}>9+ years</strong> hands-on experience: Magento 2, SEO &amp; CRO, AWS infrastructure, WordPress performance and AI automation.
                </p>
              </div>

              <div>
                <div style={{ height: 1, background: 'rgba(255,255,255,.07)', marginBottom: 28 }} />
                <div className="flex items-end justify-between flex-wrap gap-6">
                  <div className="flex items-center gap-8">
                    {STATS.map((s, i) => (
                      <div key={s.l} className="flex items-center gap-8">
                        {i > 0 && <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,.08)' }} />}
                        <div>
                          <div style={{ ...displayFace, fontSize: 'clamp(2rem,4vw,2.8rem)', lineHeight: 1, color: '#f0263c' }}>{s.v}</div>
                          <div style={{ fontSize: '.58rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(245, 245, 242,.36)', marginTop: 3 }}>
                            {s.l}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#blog-listing"
                    className="hidden lg:flex flex-col items-center gap-[10px] pb-1 border-0 bg-transparent cursor-pointer group"
                    aria-label="Scroll to articles"
                  >
                    <span className="group-hover:!text-rv" style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(245, 245, 242,.26)', transition: 'color .3s' }}>
                      Explore
                    </span>
                    <div
                      className="group-hover:!border-rv group-hover:!text-rv"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        border: '1px solid rgba(229, 9, 32,.28)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(229, 9, 32,.55)',
                        fontSize: '.80rem',
                        animation: 'scrollBounce 2.2s ease-in-out infinite',
                        transition: 'border-color .3s,color .3s,box-shadow .3s',
                      }}
                    >
                      ↓
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: featured */}
            <div className="relative lg:py-10 reveal" style={{ animationDelay: '.18s' }}>
              <Link
                href="/blog/ai-ecommerce-revenue-2025"
                className="group block relative h-full rounded-2xl overflow-hidden"
                style={{ minHeight: 'clamp(400px,55vh,680px)', border: '1px solid rgba(255,255,255,.09)', boxShadow: '0 40px 100px rgba(0,0,0,.60)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1400&q=80"
                  alt="AI for E-commerce in 2026"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,rgba(6,6,6,.08) 0%,rgba(6,6,6,.20) 30%,rgba(6,6,6,.85) 80%,rgba(6,6,6,.97) 100%)' }} />
                <div
                  className="absolute inset-0 rounded-2xl transition-opacity duration-400 opacity-0 group-hover:opacity-100"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(229, 9, 32,.35),0 0 80px rgba(229, 9, 32,.12)' }}
                />

                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      height: 28,
                      padding: '0 14px',
                      borderRadius: 100,
                      background: '#f0263c',
                      color: '#fff',
                      fontSize: '.60rem',
                      fontWeight: 700,
                      letterSpacing: '.18em',
                      textTransform: 'uppercase',
                      boxShadow: '0 6px 20px rgba(240, 38, 60,.45)',
                    }}
                  >
                    ★ Latest Article
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      height: 26,
                      padding: '0 12px',
                      borderRadius: 100,
                      background: 'rgba(6,6,6,.75)',
                      border: '1px solid rgba(255,255,255,.14)',
                      color: 'rgba(245, 245, 242,.65)',
                      fontSize: '.58rem',
                      fontWeight: 600,
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    11 min read
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-9">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        height: 22,
                        padding: '0 10px',
                        borderRadius: 100,
                        background: 'rgba(240, 38, 60,.18)',
                        border: '1px solid rgba(240, 38, 60,.30)',
                        color: '#f0263c',
                        fontSize: '.58rem',
                        fontWeight: 700,
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                      }}
                    >
                      AI &amp; Automation
                    </span>
                    <span style={{ fontSize: '.60rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(245, 245, 242,.38)' }}>08 Jun 2026</span>
                  </div>
                  <h2
                    className="group-hover:text-rv"
                    style={{ ...displayFace, fontSize: 'clamp(1.9rem,3.2vw,3rem)', lineHeight: 0.93, letterSpacing: '.02em', textTransform: 'uppercase', color: '#f5f5f2', marginBottom: 14, transition: 'color .3s' }}
                  >
                    AI for E-commerce in 2026:
                    <br />
                    Real Use Cases That Drive Revenue
                  </h2>
                  <p style={{ fontSize: '.90rem', lineHeight: 1.7, color: 'rgba(245, 245, 242,.52)', maxWidth: 460, marginBottom: 22 }}>
                    Six battle-tested implementations: AI recommendations, dynamic pricing, inventory forecasting, GPT catalog content and predictive churn reduction.
                  </p>
                  <div style={{ height: 1, background: 'rgba(255,255,255,.10)', marginBottom: 18 }} />
                  <span
                    className="group-hover:gap-[14px] transition-all duration-300"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#f0263c' }}
                  >
                    Read Article <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative z-[2] flex-shrink-0" style={{ marginTop: 52, borderTop: '1px solid rgba(255,255,255,.07)', background: 'rgba(6,6,6,.60)', backdropFilter: 'blur(8px)' }}>
        <div className="overflow-hidden h-[46px] flex items-center">
          <div className="mqt">
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: 0 }}>
              <TickerRun />
              <TickerRun />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
