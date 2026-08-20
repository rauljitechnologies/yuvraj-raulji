'use client';

import { useState } from 'react';
import { CONTACT, FAQS } from '../../lib/site';
import { useUI } from '../ui-context';

const pad = (n: number) => String(n).padStart(2, '0');

/** Renders the one answer that carries an inline mailto link. */
function Answer({ text, linkEmail }: { text: string; linkEmail?: boolean }) {
  if (!linkEmail) return <p>{text}</p>;
  const [before, after] = text.split('{EMAIL}');
  return (
    <p>
      {before}
      <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      {after}
    </p>
  );
}

export function Faq() {
  const { setContactOpen } = useUI();
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section id="faq" className="relative overflow-hidden bg-bg" style={{ padding: 'clamp(80px,10vw,140px) 0' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 100% 100%,rgba(229, 9, 32,.07),transparent),radial-gradient(ellipse 40% 40% at 0% 0%,rgba(229, 9, 32,.04),transparent)',
        }}
      />

      <div className="max-w-shell mx-auto px-10 relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,.72fr)_1fr] gap-[clamp(36px,5vw,80px)] items-start">
          {/* Left rail */}
          <div className="lg:sticky lg:top-[110px] reveal">
            <p className="sec-kicker inline-flex items-center gap-[10px] text-[.68rem] font-semibold tracking-[.22em] uppercase text-rv mb-[12px]">
              Frequently Asked
            </p>
            <h2 className="font-display uppercase leading-[.90]" style={{ fontSize: 'clamp(2.8rem,5.2vw,5rem)', letterSpacing: '.02em' }}>
              Frequently Asked
              <br />
              <span style={{ color: 'rgba(245, 245, 242,.28)' }}>Questions</span>
            </h2>
            <p className="mt-6" style={{ fontSize: 'clamp(.92rem,1.1vw,1.02rem)', lineHeight: 1.8, color: 'rgba(245, 245, 242,.50)', maxWidth: 380 }}>
              Everything you need to know before we begin building your brand&rsquo;s digital future. Can&rsquo;t find your answer?
            </p>
            <button
              onClick={() => setContactOpen(true)}
              className="mt-6 inline-flex items-center gap-2 h-[44px] px-[22px] rounded-md border border-[rgba(229, 9, 32,.36)] text-rv text-[.70rem] font-bold tracking-[.12em] uppercase bg-transparent cursor-pointer whitespace-nowrap transition-all duration-200 hover:bg-red hover:text-white hover:border-red hover:-translate-y-px"
            >
              Ask Directly &nbsp;→
            </button>

            {/* Rolling digit */}
            <div className="hidden lg:block mt-12" aria-hidden="true">
              <div className="relative overflow-hidden" style={{ fontSize: 'clamp(6.5rem,9vw,10rem)', width: '1.3em', height: '.88em' }}>
                {FAQS.map((_, i) => {
                  const n = i + 1;
                  return (
                    <span
                      key={n}
                      className={`ws-digit absolute inset-0 transition-all duration-[700ms] ease-[cubic-bezier(.19,1,.22,1)] ${
                        open === n ? 'translate-y-0 opacity-100' : open && n < open ? '-translate-y-[75%] opacity-0' : 'translate-y-[75%] opacity-0'
                      }`}
                    >
                      {pad(n)}
                    </span>
                  );
                })}
              </div>
              <p className="font-display text-[1.05rem] tracking-[.14em] text-[rgba(245, 245, 242,.45)] mt-2">/ 08 &nbsp;Answered</p>
            </div>
          </div>

          {/* Accordion */}
          <div className="reveal" style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}>
            {FAQS.map((f, i) => {
              const n = i + 1;
              const isOpen = open === n;
              return (
                <div key={f.q} className={`faq-item ${isOpen ? 'faq-open' : ''}`} onClick={() => setOpen(isOpen ? null : n)}>
                  <div className="faq-row">
                    <span className="faq-num">{pad(n)}</span>
                    <p className="faq-q">{f.q}</p>
                    <span className="faq-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </div>
                  {isOpen && (
                    <div className="faq-ans">
                      <Answer text={f.a} linkEmail={f.linkEmail} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
