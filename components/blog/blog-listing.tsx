'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Post } from '../../lib/posts';

export type ListPost = Post & { slug: string };

export const FILTERS = [
  'all',
  'magento-2',
  'shopify',
  'seo-cro',
  'aws-server',
  'wordpress',
  'ai-automation',
  'performance',
] as const;

const FILTER_LABELS: Record<string, string> = {
  all: 'All Articles',
  'magento-2': 'Magento 2',
  shopify: 'Shopify',
  'seo-cro': 'SEO & CRO',
  'aws-server': 'AWS & Server',
  wordpress: 'WordPress',
  'ai-automation': 'AI & Automation',
  performance: 'Performance',
};

const pad = (n: number) => String(n).padStart(2, '0');

function SectionBar({ num, label, badge }: { num: string; label: string; badge?: string }) {
  return (
    <div className="sec-bar mt-16 reveal">
      <span className="sec-spine" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.34em', textTransform: 'uppercase', color: 'rgba(229, 9, 32,.55)' }}>
          {num}
        </span>
        <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(245, 245, 242,.55)' }}>
          {label}
        </span>
      </div>
      {badge && <span className="cnt-badge">{badge}</span>}
      <span className="sec-line" />
    </div>
  );
}

function GridCard({ post, imgHeight, titleSize, excerptSize, showDate }: { post: ListPost; imgHeight: number; titleSize: string; excerptSize: string; showDate: boolean }) {
  return (
    <article className="bc reveal group">
      <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden flex-shrink-0" style={{ height: imgHeight }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.img} alt={post.title} className="ci w-full h-full object-cover" loading="lazy" />
        <div className="img-tint" />
        {showDate && (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 50%,rgba(6,6,6,.40) 100%)', pointerEvents: 'none' }} />
        )}
      </Link>

      <div className="flex flex-col flex-1 p-6 lg:p-7">
        <div className="flex items-center flex-wrap gap-[8px] mb-4">
          <span style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: '#f0263c' }}>{post.cat}</span>
          <span style={{ color: 'rgba(255,255,255,.20)', fontSize: '.75rem', lineHeight: 1 }}>·</span>
          <span style={{ fontSize: '.60rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(245, 245, 242,.36)' }}>{post.readTime}</span>
          {showDate && (
            <>
              <span style={{ color: 'rgba(255,255,255,.20)', fontSize: '.75rem', lineHeight: 1 }}>·</span>
              <span style={{ fontSize: '.58rem', fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', color: 'rgba(245, 245, 242,.28)' }}>{post.date}</span>
            </>
          )}
        </div>

        <h2
          className="font-display uppercase leading-[1.06] text-[#f5f5f2] mb-3 flex-shrink-0 transition-colors duration-200 group-hover:text-rv"
          style={{ fontSize: titleSize, letterSpacing: '.02em' }}
        >
          {post.title}
        </h2>

        <p className="leading-[1.74] line-clamp-2 flex-1 mb-5" style={{ fontSize: excerptSize, color: showDate ? 'rgba(245, 245, 242,.46)' : 'rgba(245, 245, 242,.42)' }}>
          {post.excerpt}
        </p>

        <div
          style={{
            height: 1,
            background: showDate
              ? 'linear-gradient(90deg,rgba(229, 9, 32,.18),rgba(255,255,255,.04),transparent)'
              : 'linear-gradient(90deg,rgba(229, 9, 32,.18),transparent)',
            marginBottom: showDate ? 15 : 14,
          }}
        />
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-[6px] mt-auto transition-all duration-300 hover:gap-[11px]"
          style={{ fontSize: showDate ? '.70rem' : '.68rem', fontWeight: 700, letterSpacing: '.13em', textTransform: 'uppercase', color: '#f0263c' }}
        >
          Read Article <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}

export function BlogListing({ posts }: { posts: ListPost[] }) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [slCur, setSlCur] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const programmatic = useRef(false);

  // ?filter= is read on mount (static export has no request-time query access).
  useEffect(() => {
    const f = new URLSearchParams(location.search).get('filter');
    if (f && (FILTERS as readonly string[]).includes(f)) setActiveFilter(f);
  }, []);

  const filtered = useMemo(
    () => posts.filter((p) => activeFilter === 'all' || p.filter === activeFilter),
    [posts, activeFilter],
  );

  const slides = filtered.slice(0, 5);

  useEffect(() => {
    setSlCur(0);
  }, [activeFilter]);

  // Autoplay
  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => setSlCur((i) => (i + 1) % slides.length), 4600);
    return () => clearInterval(id);
  }, [slides.length]);

  // Scroll the track when the active slide changes
  useEffect(() => {
    const t = track.current;
    if (!t) return;
    const card = t.querySelector<HTMLElement>('.sl-card');
    if (!card) return;
    programmatic.current = true;
    t.scrollTo({ left: slCur * (card.offsetWidth + 20), behavior: 'smooth' });
    const id = setTimeout(() => (programmatic.current = false), 700);
    return () => clearTimeout(id);
  }, [slCur]);

  // Sync state back when the user swipes
  useEffect(() => {
    const t = track.current;
    if (!t) return;
    let debounce: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      if (programmatic.current) return;
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const card = t.querySelector<HTMLElement>('.sl-card');
        if (!card) return;
        const idx = Math.max(0, Math.min(Math.round(t.scrollLeft / (card.offsetWidth + 20)), slides.length - 1));
        setSlCur((cur) => (idx !== cur ? idx : cur));
      }, 80);
    };
    t.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(debounce);
      t.removeEventListener('scroll', onScroll);
    };
  }, [slides.length]);

  return (
    <>
      {/* ══ FILTER BAR ══ */}
      <div
        className="sticky top-[74px] z-[100] bg-[rgba(6,6,6,.96)] backdrop-blur-2xl"
        style={{ borderBottom: '1px solid rgba(255,255,255,.07)', boxShadow: '0 8px 40px rgba(0,0,0,.40)' }}
      >
        <div className="max-w-shell mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide flex-1 min-w-0">
              <span className="flex-shrink-0 text-[.58rem] font-bold tracking-[.24em] uppercase text-[rgba(245,245,242,.28)] pr-2 border-r border-[rgba(255,255,255,.08)] mr-1 hidden sm:block">
                Filter
              </span>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`flex-shrink-0 h-[34px] px-[18px] rounded-full text-[.63rem] font-bold tracking-[.12em] uppercase whitespace-nowrap transition-all duration-200 touch-manipulation border ${
                    activeFilter === f
                      ? 'bg-rv text-white border-rv shadow-[0_4px_18px_rgba(240,38,60,.38)]'
                      : 'text-[rgba(245,245,242,.44)] border-[rgba(255,255,255,.08)] hover:text-[#f5f5f2] hover:border-[rgba(229,9,32,.24)] hover:bg-[rgba(229,9,32,.06)]'
                  }`}
                >
                  {FILTER_LABELS[f]}
                </button>
              ))}
            </div>
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="w-[5px] h-[5px] rounded-full bg-rv" />
              <span className="text-[.62rem] font-bold tracking-[.18em] uppercase text-[rgba(245,245,242,.32)]">{filtered.length} Articles</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ LISTING ══ */}
      <section className="bg-bg" id="blog-listing" style={{ padding: 'clamp(64px,8vw,100px) 0 clamp(80px,10vw,130px)' }}>
        <div className="max-w-shell mx-auto px-6 md:px-10">
          {slides.length > 0 && (
            <div className="mb-20 reveal">
              <div className="sec-bar">
                <span className="sec-spine" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.34em', textTransform: 'uppercase', color: 'rgba(229, 9, 32,.55)' }}>
                    01 / Cover
                  </span>
                  <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(245, 245, 242,.55)' }}>
                    Top Stories
                  </span>
                </div>
                <span className="sec-line" />
                <span className="font-display" style={{ fontSize: '1.20rem', letterSpacing: '.06em', color: 'rgba(245, 245, 242,.18)' }}>
                  <span style={{ color: '#f0263c' }}>{pad(slCur + 1)}</span>
                  <span style={{ color: 'rgba(255,255,255,.12)' }}> / </span>
                  <span>{pad(slides.length)}</span>
                </span>
              </div>

              <div className="overflow-hidden">
                <div
                  ref={track}
                  className="flex scrollbar-hide"
                  style={{ gap: 16, overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
                >
                  {slides.map((post) => (
                    <div key={post.slug} className="sl-card flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="sl-inner group block relative overflow-hidden"
                        style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,.09)', boxShadow: '0 24px 64px rgba(0,0,0,.52)' }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.img}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(0deg,rgba(6,6,6,.98) 0%,rgba(6,6,6,.70) 38%,rgba(6,6,6,.12) 70%,rgba(6,6,6,.04) 100%)',
                            pointerEvents: 'none',
                          }}
                        />
                        <div
                          className="group-hover:opacity-100"
                          style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: 'inset 0 0 0 1px rgba(229, 9, 32,.34)', opacity: 0, transition: 'opacity .28s', pointerEvents: 'none' }}
                        />

                        <div className="absolute top-5 left-5 sm:top-7 sm:left-8 flex items-center gap-[12px]">
                          <span
                            className="inline-flex items-center h-[26px] sm:h-[28px] px-[12px] sm:px-[16px] rounded-full"
                            style={{ background: '#f0263c', fontSize: '.60rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#fff', boxShadow: '0 6px 20px rgba(229, 9, 32,.45)' }}
                          >
                            {post.cat}
                          </span>
                          <span style={{ fontSize: '.60rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(245, 245, 242,.50)' }}>
                            {post.readTime}
                          </span>
                        </div>

                        <div className="sl-body absolute bottom-0 left-0 right-0">
                          <div style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.20em', textTransform: 'uppercase', color: 'rgba(245, 245, 242,.38)', marginBottom: 10 }}>
                            {post.date}
                          </div>
                          <h2
                            className="font-display uppercase text-[#f5f5f2] transition-colors duration-200 group-hover:text-rv"
                            style={{ fontSize: 'clamp(1.65rem,3.8vw,3.2rem)', lineHeight: 0.94, letterSpacing: '.02em', marginBottom: 12 }}
                          >
                            {post.title}
                          </h2>
                          <p className="hidden sm:block leading-[1.74] line-clamp-2" style={{ fontSize: '.90rem', color: 'rgba(245, 245, 242,.52)', maxWidth: 580, marginBottom: 20 }}>
                            {post.excerpt}
                          </p>
                          <div style={{ height: 1, background: 'linear-gradient(90deg,rgba(229, 9, 32,.24),rgba(255,255,255,.06),transparent)', marginBottom: 16 }} />
                          <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="hidden sm:flex items-center gap-[10px]">
                              <div
                                className="font-display"
                                style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(229, 9, 32,.30)', background: 'rgba(229, 9, 32,.10)', display: 'grid', placeItems: 'center', fontSize: '.72rem', color: '#f0263c', flexShrink: 0 }}
                              >
                                YR
                              </div>
                              <div>
                                <div style={{ fontSize: '.72rem', fontWeight: 600, color: 'rgba(245, 245, 242,.78)' }}>Yuvraj Raulji</div>
                                <div style={{ fontSize: '.58rem', fontWeight: 500, letterSpacing: '.06em', color: 'rgba(245, 245, 242,.36)' }}>
                                  Full Stack E-commerce &amp; AI Consultant
                                </div>
                              </div>
                            </div>
                            <span
                              className="inline-flex items-center gap-2 transition-all duration-300 group-hover:gap-[13px]"
                              style={{ fontSize: '.70rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#f0263c' }}
                            >
                              Read Article <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots */}
              {/*
                The dot is 11px tall and the button around it is 44px, because
                the thing a thumb has to hit is the control and not the mark it
                draws. The horizontal padding replaces the row's old gap, so the
                dots still sit 10px apart.
              */}
              <div className="flex items-center justify-center mt-3">
                {slides.map((p, i) => (
                  <button
                    key={p.slug}
                    onClick={() => setSlCur(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="grid h-11 cursor-pointer place-items-center border-0 bg-transparent px-[5px]"
                  >
                    <span
                      aria-hidden="true"
                      className={`block rounded-full transition-all duration-400 ${
                        slCur === i ? 'bg-rv' : 'bg-[rgba(255,255,255,.20)] hover:bg-[rgba(229,9,32,.40)]'
                      }`}
                      style={slCur === i ? { width: 38, height: 11, boxShadow: '0 2px 16px rgba(240, 38, 60,.45)' } : { width: 11, height: 11 }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filtered.length > 5 && (
            <>
              <SectionBar num="02 / Archive" label="All Articles" badge={`${filtered.slice(5).length} More`} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 xl:gap-10">
                {filtered.slice(5, 15).map((post) => (
                  <GridCard key={post.slug} post={post} imgHeight={240} titleSize="clamp(1.28rem,2.2vw,1.68rem)" excerptSize=".86rem" showDate />
                ))}
              </div>
            </>
          )}

          {filtered.length > 15 && (
            <div className="mt-10">
              <SectionBar num="03 — More" label="Further Reading" badge={`${filtered.slice(15).length} Articles`} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                {filtered.slice(15).map((post) => (
                  <GridCard key={post.slug} post={post} imgHeight={220} titleSize="clamp(1.20rem,2.0vw,1.55rem)" excerptSize=".84rem" showDate={false} />
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-28">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[rgba(229,9,32,.18)] mb-6" style={{ background: 'rgba(229, 9, 32,.05)' }}>
                <span className="font-display text-rv" style={{ fontSize: '1.5rem' }}>
                  —
                </span>
              </div>
              <p className="text-[rgba(245,245,242,.30)] font-semibold tracking-[.14em] uppercase" style={{ fontSize: '.76rem' }}>
                No articles in this category yet
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
