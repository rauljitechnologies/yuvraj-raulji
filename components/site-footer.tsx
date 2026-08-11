'use client';

import Link from 'next/link';
import { CONTACT, FOOTER_EXPERTISE, FOOTER_NAV, FOOTER_TOPICS } from '../lib/site';

const linkCls =
  'inline-flex items-center gap-2 text-[rgba(244,244,244,.46)] transition-all duration-300 hover:text-rv hover:gap-3';
const dashCls = 'text-[rgba(200,16,46,.45)] text-[.6rem]';

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span style={{ width: 2, height: 16, background: 'linear-gradient(180deg,#e8192c,rgba(200,16,46,.15))', borderRadius: 2 }} />
      <h3 className="text-[.64rem] font-bold tracking-[.28em] uppercase text-[rgba(244,244,244,.62)]">{children}</h3>
    </div>
  );
}

const socialCls =
  'w-10 h-10 grid place-items-center rounded-full transition-all duration-300 hover:-translate-y-[2px] hover:!border-rv hover:!text-rv hover:shadow-[0_8px_28px_rgba(200,16,46,.28)]';
const socialStyle: React.CSSProperties = {
  border: '1px solid rgba(255,255,255,.12)',
  color: 'rgba(244,244,244,.55)',
  fontSize: '.74rem',
  fontWeight: 700,
  letterSpacing: '.04em',
};

export function SiteFooter() {
  return (
    <footer className="footer relative bg-[#020202] overflow-hidden" style={{ padding: 'clamp(64px,8vw,104px) 0 0' }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 8% 0%,rgba(200,16,46,.10) 0%,transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 45% 55% at 100% 100%,rgba(140,8,22,.10) 0%,transparent 100%)' }} />
        <div
          className="absolute select-none font-bebas"
          style={{
            right: '-1%',
            bottom: '-6%',
            fontSize: 'clamp(8rem,20vw,19rem)',
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(200,16,46,.08)',
            letterSpacing: '.02em',
          }}
        >
          YR
        </div>
      </div>

      <div className="relative z-[2] max-w-shell mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.25fr_.75fr_1fr_1.1fr_1fr] gap-12 lg:gap-9 pb-14">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <span
                className="w-11 h-11 grid place-items-center rounded-full font-bebas text-rv text-[1.05rem]"
                style={{ border: '1px solid rgba(200,16,46,.38)', background: 'rgba(200,16,46,.07)', boxShadow: '0 0 28px rgba(200,16,46,.14)' }}
              >
                YR
              </span>
              <span className="font-bebas text-[1.7rem] tracking-[.06em] uppercase text-[#f4f4f4] transition-colors group-hover:text-rv">
                Yuvraj Raulji
              </span>
            </Link>
            <p className="leading-[1.8] mb-7 max-w-[340px]" style={{ fontSize: '.86rem', color: 'rgba(244,244,244,.46)' }}>
              Full Stack E-commerce Developer &amp; AI Consultant crafting luxury digital experiences — Magento 2, Shopify, AWS infrastructure, and growth-driven SEO from Vadodara, India.
            </p>
            <div className="flex items-center gap-3">
              <a href={CONTACT.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className={socialCls} style={socialStyle}>
                in
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener" aria-label="Instagram" className={socialCls} style={socialStyle}>
                ig
              </a>
              <a href={CONTACT.facebook} target="_blank" rel="noopener" aria-label="Facebook" className={socialCls} style={socialStyle}>
                fb
              </a>
              <a href={`mailto:${CONTACT.email}`} aria-label="Email" className={socialCls} style={{ ...socialStyle, letterSpacing: undefined }}>
                @
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <ColumnHeading>Navigate</ColumnHeading>
            <ul className="space-y-[14px] uppercase" style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.14em' }}>
              {FOOTER_NAV.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={l.active ? 'inline-flex items-center gap-2 text-rv' : linkCls}>
                    <span className={l.active ? 'text-rv text-[.6rem]' : dashCls}>—</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <ColumnHeading>Expertise</ColumnHeading>
            <ul className="space-y-[14px] uppercase" style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.14em' }}>
              {FOOTER_EXPERTISE.map((label) => (
                <li key={label}>
                  <Link href="/#expertise" className={linkCls}>
                    <span className={dashCls}>—</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span style={{ width: 2, height: 16, background: 'linear-gradient(180deg,#e8192c,rgba(200,16,46,.15))', borderRadius: 2 }} />
                <h3 className="text-[.64rem] font-bold tracking-[.28em] uppercase text-[rgba(244,244,244,.62)]">Explore Topics</h3>
              </div>
              <span className="font-bebas text-[.92rem] tracking-[.08em] text-[rgba(200,16,46,.45)]">22</span>
            </div>

            <div className="flex flex-wrap gap-[9px] mb-6">
              {FOOTER_TOPICS.map((t) => (
                <Link
                  key={t.filter}
                  href={`/blog?filter=${t.filter}`}
                  className="inline-flex items-center gap-[7px] h-[32px] px-[14px] rounded-full transition-all duration-300 touch-manipulation border hover:-translate-y-[2px] bg-[rgba(255,255,255,.02)] text-[rgba(244,244,244,.50)] border-[rgba(255,255,255,.10)] hover:text-[#f4f4f4] hover:border-[rgba(200,16,46,.40)] hover:bg-[rgba(200,16,46,.08)] hover:shadow-[0_6px_22px_rgba(200,16,46,.16)]"
                >
                  <span style={{ fontSize: '.60rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>{t.label}</span>
                  <span className="font-bebas leading-none" style={{ fontSize: '.78rem', letterSpacing: '.06em', color: 'rgba(232,25,44,.75)' }}>
                    {t.count}
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 transition-all duration-300 hover:gap-[13px] group"
              style={{ fontSize: '.66rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#e8192c' }}
            >
              View All 22 Articles <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Get in touch */}
          <div>
            <ColumnHeading>Get In Touch</ColumnHeading>
            <a href={`mailto:${CONTACT.email}`} className="block mb-2 transition-colors hover:text-rv" style={{ fontSize: '.88rem', fontWeight: 600, color: 'rgba(244,244,244,.78)' }}>
              {CONTACT.email}
            </a>
            <p className="mb-7" style={{ fontSize: '.76rem', color: 'rgba(244,244,244,.36)', letterSpacing: '.04em' }}>
              Vadodara, Gujarat, India · IST (GMT+5:30)
            </p>
            <a
              href={`mailto:${CONTACT.email}?subject=Strategic+Consultation`}
              className="inline-flex items-center gap-2 h-[48px] px-7 rounded bg-red text-white text-[.70rem] font-bold tracking-[.12em] uppercase transition-all hover:bg-rv hover:shadow-[0_14px_44px_rgba(200,16,46,.34)] hover:-translate-y-[2px] active:scale-[.96] touch-manipulation mb-6"
            >
              Book Consultation →
            </a>
            <div className="flex items-center gap-[10px]">
              <span className="w-[7px] h-[7px] rounded-full bg-[#22c55e] flex-shrink-0" style={{ boxShadow: '0 0 0 0 rgba(34,197,94,.55)', animation: 'avP 1.8s ease-out infinite' }} />
              <span style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(244,244,244,.40)' }}>
                Available for new projects
              </span>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(200,16,46,.35) 18%,rgba(255,255,255,.08) 50%,rgba(200,16,46,.35) 82%,transparent)' }} />

        <div className="flex flex-wrap items-center justify-between gap-4 py-7 text-[.70rem] text-[rgba(244,244,244,.34)]" style={{ letterSpacing: '.06em' }}>
          <span>
            © 2026 <span className="text-[rgba(244,244,244,.60)] font-semibold">Yuvraj Raulji</span>. All Rights Reserved.
          </span>
          <span className="hidden md:inline-flex items-center gap-[10px] font-bold tracking-[.22em] uppercase" style={{ fontSize: '.58rem', color: 'rgba(200,16,46,.50)' }}>
            <span style={{ width: 18, height: 1, background: 'rgba(200,16,46,.45)' }} />
            Luxury Brand Developer &amp; E-Commerce Architect
            <span style={{ width: 18, height: 1, background: 'rgba(200,16,46,.45)' }} />
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 font-bold tracking-[.18em] uppercase transition-all duration-300 hover:!text-rv group cursor-pointer border-0 bg-transparent"
            style={{ fontSize: '.62rem', color: 'rgba(244,244,244,.42)' }}
          >
            Back to top
            <span
              className="w-8 h-8 grid place-items-center rounded-full transition-all duration-300 group-hover:!border-rv group-hover:shadow-[0_0_20px_rgba(200,16,46,.25)] group-hover:-translate-y-[2px]"
              style={{ border: '1px solid rgba(200,16,46,.30)', color: '#e8192c', fontSize: '.74rem' }}
            >
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
