import Link from 'next/link';
import { CONTACT } from '../../lib/site';

const STATS = [
  { v: '9+', l: 'Years Experience' },
  { v: '50+', l: 'Projects Delivered' },
  { v: '12+', l: 'Industries Served' },
  { v: '90+', l: 'PageSpeed Scores' },
];

export function BlogCta() {
  return (
    <section className="relative overflow-hidden bg-bg2 border-t border-[rgba(255,255,255,.07)]" style={{ padding: 'clamp(72px,10vw,120px) 0' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 55% at 80% 50%,rgba(229, 9, 32,.11),transparent)' }} />
      <div className="max-w-shell mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center reveal">
          <div>
            <p className="sec-kicker inline-flex items-center gap-3 text-[.66rem] font-bold tracking-[.26em] uppercase text-rv mb-5">Work Together</p>
            <h2 className="font-display uppercase tracking-[.02em] leading-[.91] mb-6" style={{ fontSize: 'clamp(2.6rem,5.5vw,5.2rem)' }}>
              Need Expert Help
              <br />
              With Your Project?
            </h2>
            <p className="text-[rgba(245,245,242,.58)] leading-[1.78] mb-9 max-w-[500px]" style={{ fontSize: 'clamp(.94rem,1.2vw,1.06rem)' }}>
              Whether you need a Magento 2 overhaul, SEO &amp; CRO strategy, AWS server migration, or AI automation — let&rsquo;s have a focused consultation and map out your roadmap.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${CONTACT.email}?subject=Blog+Consultation+Request`}
                className="inline-flex items-center gap-2 h-[52px] px-8 rounded bg-red text-white border border-red text-[.74rem] font-bold tracking-[.10em] uppercase transition-all hover:bg-rv hover:border-rv hover:shadow-[0_16px_48px_rgba(229,9,32,.32)] hover:-translate-y-[2px] active:scale-[.95] touch-manipulation"
              >
                Book Free Consultation →
              </a>
              <Link
                href="/#services"
                className="inline-flex items-center gap-2 h-[52px] px-8 rounded bg-transparent border border-[rgba(255,255,255,.18)] text-[#f5f5f2] text-[.74rem] font-bold tracking-[.10em] uppercase transition-all hover:border-[rgba(229,9,32,.32)] hover:-translate-y-[2px] active:scale-[.95] touch-manipulation"
              >
                View Services →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div key={s.l} className="p-7 rounded-lg border border-[rgba(255,255,255,.07)] bg-bg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[rgba(229,9,32,.40)] to-transparent" />
                <div className="font-display text-rv leading-none mb-2" style={{ fontSize: 'clamp(2.2rem,4vw,3rem)' }}>
                  {s.v}
                </div>
                <p className="text-[.70rem] font-semibold tracking-[.14em] uppercase text-[rgba(245,245,242,.50)]">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
