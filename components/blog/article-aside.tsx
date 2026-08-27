'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '../../lib/articles';
import { CONTACT } from '../../lib/site';

const panelCls = 'p-7 rounded-xl border border-[rgba(255,255,255,.07)] bg-bg2';
const spine = <span style={{ width: 2, height: 14, background: 'linear-gradient(180deg,#f0263c,rgba(229, 9, 32,.15))', borderRadius: 2, flexShrink: 0 }} />;
const shareBtnCls =
  'w-10 h-10 grid place-items-center rounded-full cursor-pointer bg-transparent transition-all duration-300 hover:-translate-y-[2px] hover:!border-rv hover:!text-rv hover:shadow-[0_8px_28px_rgba(229,9,32,.28)]';
const shareBtnStyle: React.CSSProperties = { border: '1px solid rgba(255,255,255,.12)', color: 'rgba(245, 245, 242,.55)', fontSize: '.74rem', fontWeight: 700 };

function PanelHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      {spine}
      <p className="text-[.60rem] font-bold tracking-[.26em] uppercase text-[rgba(245,245,242,.50)]">{children}</p>
    </div>
  );
}

/** Scroll-spy over the server-generated heading ids. */
function useTocActive(toc: Heading[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (toc.length < 2) return;
    const els = toc.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-15% 0px -70% 0px' },
    );
    els.forEach((el) => spy.observe(el));
    return () => spy.disconnect();
  }, [toc]);
  return active;
}

export function TocList({ toc, mobile = false }: { toc: Heading[]; mobile?: boolean }) {
  const active = useTocActive(toc);
  if (toc.length < 2) return null;

  return (
    <div className={mobile ? `lg:hidden p-6 rounded-xl border border-[rgba(255,255,255,.07)] bg-bg2 mb-10` : `hidden lg:block ${panelCls}`}>
      <div className={`flex items-center gap-3 ${mobile ? 'mb-4' : 'mb-5'}`}>
        {spine}
        <p className="text-[.60rem] font-bold tracking-[.26em] uppercase text-[rgba(245,245,242,.50)]">On This Page</p>
      </div>
      <nav className={`flex flex-col ${mobile ? 'gap-[10px]' : 'gap-[12px]'}`}>
        {toc.map((h, i) => {
          const on = !mobile && active === h.id;
          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              // `py-1.5` for the touch target. These rows were 20px tall, and
              // in the mobile sheet they are the only way to move around a long
              // article.
              className={`flex items-start gap-[10px] py-1.5 text-[.79rem] leading-[1.5] transition-colors duration-200 ${
                mobile ? 'text-[rgba(245,245,242,.50)] hover:text-rv' : on ? 'text-rv' : 'text-[rgba(245,245,242,.48)] hover:text-[#f5f5f2]'
              }`}
            >
              <span
                className={`font-display pt-[2px] flex-shrink-0 ${mobile ? 'text-[rgba(229,9,32,.50)]' : on ? 'text-rv' : 'text-[rgba(229,9,32,.45)]'}`}
                style={{ fontSize: '.74rem', letterSpacing: '.08em' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{h.t}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

export function ArticleAside({ toc, tags, title }: { toc: Heading[]; tags: string[]; title: string }) {
  const [copied, setCopied] = useState(false);

  const share = (net: 'li' | 'x' | 'wa') => {
    const u = encodeURIComponent(location.href);
    const t = encodeURIComponent(title);
    const urls = {
      li: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      x: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      wa: `https://wa.me/?text=${t}%20${u}`,
    };
    window.open(urls[net], '_blank', 'noopener');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op, matching the original */
    }
  };

  return (
    <aside className="lg:sticky lg:top-[104px] flex flex-col gap-6 reveal">
      <TocList toc={toc} />

      {/* Author */}
      <div className={panelCls}>
        <PanelHeading>Written By</PanelHeading>
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-full grid place-items-center font-display text-rv text-xl flex-shrink-0"
            style={{ border: '1px solid rgba(229, 9, 32,.35)', background: 'rgba(229, 9, 32,.08)', boxShadow: '0 0 28px rgba(229, 9, 32,.14)' }}
          >
            YR
          </div>
          <div>
            <p className="font-bold text-[.92rem]">Yuvraj Raulji</p>
            <p className="text-[.70rem] text-[rgba(245,245,242,.46)] leading-snug">
              Full Stack E-commerce &amp;
              <br />
              AI Consultant · 9+ Years
            </p>
          </div>
        </div>
        <p className="text-[.82rem] text-[rgba(245,245,242,.52)] leading-[1.7] mb-5">
          Magento 2 architect, SEO/CRO strategist, AWS infrastructure specialist, and AI automation engineer based in Vadodara, India.
        </p>
        <div className="flex flex-col gap-[10px]">
          <a
            href={`mailto:${CONTACT.email}?subject=Blog+Article+Consultation`}
            className="flex items-center justify-center gap-2 h-11 rounded bg-red text-white text-[.70rem] font-bold tracking-[.12em] uppercase transition-all hover:bg-rv hover:shadow-[0_12px_36px_rgba(229,9,32,.30)] hover:-translate-y-px active:scale-[.97] touch-manipulation"
          >
            Hire Me →
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center gap-2 h-11 rounded border border-[rgba(255,255,255,.12)] text-[.70rem] font-semibold tracking-[.12em] uppercase text-[rgba(245,245,242,.60)] transition-all hover:border-[rgba(229,9,32,.36)] hover:text-rv touch-manipulation"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>

      {/* Share */}
      <div className={panelCls}>
        <PanelHeading>Share Article</PanelHeading>
        <div className="flex items-center gap-[10px]">
          <button onClick={() => share('li')} aria-label="Share on LinkedIn" className={shareBtnCls} style={shareBtnStyle}>
            in
          </button>
          <button onClick={() => share('x')} aria-label="Share on X" className={shareBtnCls} style={shareBtnStyle}>
            X
          </button>
          <button onClick={() => share('wa')} aria-label="Share on WhatsApp" className={shareBtnCls} style={{ ...shareBtnStyle, fontSize: '.70rem' }}>
            wa
          </button>
          <button
            onClick={copyLink}
            aria-label="Copy link"
            className={shareBtnCls}
            style={
              copied
                ? { border: '1px solid #f0263c', color: '#f0263c', fontSize: '.80rem', fontWeight: 700 }
                : { ...shareBtnStyle, fontSize: '.80rem' }
            }
          >
            {copied ? '✓' : '⧉'}
          </button>
        </div>
        {copied && <p className="text-[.62rem] tracking-[.10em] uppercase text-rv font-bold mt-3">Link copied!</p>}
      </div>

      {/* Contact CTA */}
      <div className="relative p-7 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(229, 9, 32,.26)', background: 'linear-gradient(160deg,rgba(229, 9, 32,.10),rgba(229, 9, 32,.03))' }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(240, 38, 60,.65),transparent)' }} />
        <p className="text-[.60rem] font-bold tracking-[.26em] uppercase text-rv mb-3">Free Consultation</p>
        <p className="font-display text-[1.55rem] uppercase tracking-[.03em] leading-[.98] mb-3">
          Need Help With
          <br />
          Your Project?
        </p>
        <p className="text-[.78rem] text-[rgba(245,245,242,.52)] leading-[1.65] mb-5">Magento 2 · Shopify · SEO/CRO · AWS · WordPress · AI Automation</p>
        <a
          href={`mailto:${CONTACT.email}?subject=Consultation+Request`}
          className="flex items-center justify-center gap-2 h-11 rounded bg-red text-white text-[.70rem] font-bold tracking-[.12em] uppercase transition-all hover:bg-rv hover:shadow-[0_12px_36px_rgba(229,9,32,.34)] hover:-translate-y-px active:scale-[.97] touch-manipulation"
        >
          Book Now →
        </a>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className={panelCls}>
          <PanelHeading>Tags</PanelHeading>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center h-[26px] px-3 rounded-full text-[.60rem] font-bold tracking-[.10em] uppercase"
                style={{ border: '1px solid rgba(229, 9, 32,.20)', background: 'rgba(229, 9, 32,.05)', color: 'rgba(245, 245, 242,.55)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

/** Reading-progress bar pinned under the header. */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-[74px] left-0 right-0 z-[810] h-[2px] bg-transparent" aria-hidden="true">
      <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#e50920,#f0263c)', transition: 'width .1s linear' }} />
    </div>
  );
}
