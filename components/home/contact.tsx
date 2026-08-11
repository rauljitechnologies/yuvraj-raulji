'use client';

import { CONTACT } from '../../lib/site';
import { useUI } from '../ui-context';

const rowCls = 'grid grid-cols-[86px_1fr] gap-3 items-center py-[14px]';
const labelCls = 'text-[.64rem] font-bold tracking-[.18em] uppercase text-[rgba(244,244,244,.36)]';

export function Contact() {
  const { setContactOpen } = useUI();

  return (
    <section id="contact" className="contact-sec relative overflow-hidden" style={{ padding: 'clamp(80px,10vw,140px) 0' }}>
      <div className="max-w-shell mx-auto px-10">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start border border-[rgba(200,16,46,.32)] rounded bg-[rgba(255,255,255,.035)] backdrop-blur-2xl shadow-[0_60px_150px_rgba(0,0,0,.52),0_0_80px_rgba(200,16,46,.08)] reveal"
          style={{ padding: 'clamp(36px,5vw,72px)' }}
        >
          <div>
            <p className="sec-kicker inline-flex items-center gap-[10px] text-[.68rem] font-semibold tracking-[.22em] uppercase text-rv mb-[14px]">
              Private Consultation
            </p>
            <h2 className="font-bebas uppercase tracking-[.03em] leading-[.92] mb-4" style={{ fontSize: 'clamp(2.4rem,5.5vw,5.2rem)' }}>
              Let&rsquo;s Build
              <br />
              What&rsquo;s Next
            </h2>
            <p className="text-[.98rem] text-[rgba(244,244,244,.60)] leading-[1.74] mb-7 max-w-[500px]">
              Whether you&rsquo;re scaling a commerce platform, implementing AI automation, or planning a transformation initiative — every engagement begins with a strategic conversation.
            </p>
            <button
              onClick={() => setContactOpen(true)}
              className="btn-arr inline-flex items-center gap-2 h-[52px] px-7 rounded bg-red text-white border border-red text-[.76rem] font-bold tracking-[.10em] uppercase whitespace-nowrap transition-all hover:bg-rv hover:border-rv hover:shadow-[0_16px_48px_rgba(200,16,46,.32)] hover:-translate-y-[2px] active:scale-[.95] touch-manipulation"
            >
              Book Strategic Consultation
            </button>
          </div>

          <div className="grid gap-0">
            <div className={`${rowCls} border-b border-[rgba(255,255,255,.08)]`}>
              <span className={labelCls}>Email</span>
              <span className="text-[.88rem] font-medium">
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-rv">
                  {CONTACT.email}
                </a>
              </span>
            </div>
            <div className={`${rowCls} border-b border-[rgba(255,255,255,.08)]`}>
              <span className={labelCls}>WhatsApp</span>
              <span className="text-[.88rem] font-medium">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="transition-colors hover:text-[#25D366]">
                  {CONTACT.phoneDisplay}
                </a>
              </span>
            </div>
            <div className={`${rowCls} border-b border-[rgba(255,255,255,.08)]`}>
              <span className={labelCls}>LinkedIn</span>
              <span className="text-[.88rem] font-medium">
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="li-btn inline-flex items-center gap-[6px] h-[34px] px-[14px] rounded bg-[rgba(10,102,194,.18)] border border-[rgba(10,102,194,.32)] text-[.68rem] font-semibold tracking-[.10em] uppercase text-[rgba(244,244,244,.84)] transition-all hover:bg-[rgba(10,102,194,.32)] hover:border-[rgba(10,102,194,.52)]"
                >
                  Yuvraj Raulji
                </a>
              </span>
            </div>
            <div className={rowCls}>
              <span className={labelCls}>Location</span>
              <span className="text-[.88rem] font-medium">{CONTACT.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
