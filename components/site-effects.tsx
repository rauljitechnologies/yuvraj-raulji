'use client';

import { useEffect } from 'react';

type Draw = (ctx: CanvasRenderingContext2D, W: number, H: number, f: number) => void;

/** Canvas bootstrap helper — DPR-aware sizing + rAF loop (port of `mkC`). */
function mkC(canvas: HTMLCanvasElement, draw: Draw, reduced: boolean) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  let W = 0;
  let H = 0;

  const rs = () => {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = r.width;
    H = r.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  rs();
  window.addEventListener('resize', rs, { passive: true });

  let f = 0;
  let raf = 0;
  const loop = () => {
    f++;
    draw(ctx, W, H, f);
    if (!reduced) raf = requestAnimationFrame(loop);
  };
  loop();

  return () => {
    window.removeEventListener('resize', rs);
    cancelAnimationFrame(raf);
  };
}

/**
 * All the imperative page behaviour that lived in the trailing <script> of
 * home.html. Mounted once per page; `fullpage` and the canvases are home-only.
 */
export function SiteEffects({ fullpage = false }: { fullpage?: boolean }) {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
    const cleanups: (() => void)[] = [];

    /* CSS scroll-snap is the no-JS fallback and is home-only */
    if (fullpage) {
      document.documentElement.classList.add('snap-page');
      cleanups.push(() => document.documentElement.classList.remove('snap-page'));
    }

    /* ── smooth scroll for in-page anchors ── */
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"], a[href^="/#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute('href')!.replace(/^\//, '');
      if (hash === '#') return;
      const t = document.querySelector(hash);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    };
    document.addEventListener('click', onAnchorClick);
    cleanups.push(() => document.removeEventListener('click', onAnchorClick));

    /* ── reveal on scroll + counters ── */
    const countUp = (el: HTMLElement) => {
      const marked = el as HTMLElement & { _d?: boolean };
      if (marked._d) return;
      marked._d = true;
      const tgt = Number(el.dataset.count);
      const dur = reduced ? 1 : 1200;
      const t0 = performance.now();
      const tick = (n: number) => {
        const p = Math.min((n - t0) / dur, 1);
        el.textContent = String(Math.round(tgt * (1 - Math.pow(1 - p, 4))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const onReveal = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        e.target.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
      });
    };

    // An element taller than the viewport can never reach a 14% intersection
    // ratio, so it would stay at opacity:0 forever — that is how a long article
    // body would silently render invisible. Tall elements get threshold 0.
    const io = new IntersectionObserver(onReveal, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
    const ioTall = new IntersectionObserver(onReveal, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

    const safeRatio = 0.14 / 0.6; // require ≥60% headroom before trusting the ratio
    document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
      (el.offsetHeight * safeRatio > innerHeight ? ioTall : io).observe(el);
    });

    // Counters used to run only as a side effect of a `.reveal` ancestor coming
    // into view. Sections migrated to the design tokens animate with the motion
    // <Reveal> wrapper instead and carry no `.reveal` class, which left their
    // numbers frozen at 0. Observe the counter elements directly so the two
    // concerns are independent; countUp is idempotent, so an element reached by
    // both paths still animates once.
    //
    // Note the absence of a negative rootMargin, unlike the reveal observers
    // above: the counters sit in the control strip pinned to the bottom of a
    // 100vh section, so trimming the root's bottom edge would exclude them for
    // the whole time they are on screen and leave every figure showing 0.
    const ioCount = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && countUp(e.target as HTMLElement)),
      { threshold: 0 },
    );
    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => ioCount.observe(el));

    cleanups.push(() => {
      io.disconnect();
      ioTall.disconnect();
      ioCount.disconnect();
    });

    /* ── card tilt ── */
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.card'));
    const cardHandlers = cards.map((c) => {
      const move = (e: PointerEvent) => {
        if (reduced) return;
        const r = c.getBoundingClientRect();
        c.style.setProperty('--cx', `${e.clientX - r.left}px`);
        c.style.setProperty('--cy', `${e.clientY - r.top}px`);
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 9;
        c.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      };
      const leave = () => {
        c.style.transform = '';
      };
      c.addEventListener('pointermove', move);
      c.addEventListener('pointerleave', leave);
      return () => {
        c.removeEventListener('pointermove', move);
        c.removeEventListener('pointerleave', leave);
      };
    });
    cleanups.push(...cardHandlers);

    /* ── hero particles ── */
    const heroC = document.getElementById('heroC') as HTMLCanvasElement | null;
    if (heroC) {
      let mx = innerWidth / 2;
      let my = innerHeight / 2;
      const onPointer = (e: PointerEvent) => {
        mx = e.clientX;
        my = e.clientY;
      };
      addEventListener('pointermove', onPointer, { passive: true });
      cleanups.push(() => removeEventListener('pointermove', onPointer));
      cleanups.push(
        mkC(
          heroC,
          (ctx, W, H, f) => {
            ctx.clearRect(0, 0, W, H);
            const n = Math.max(44, Math.floor(W / 28));
            for (let i = 0; i < n; i++) {
              const x = (Math.sin(f * 0.004 + i * 11.7) * 0.5 + 0.5) * W;
              const y = ((i * 97 + f * (0.16 + (i % 5) * 0.04)) % (H + 80)) - 40;
              const dx = (mx - W / 2) * 0.013;
              const dy = (my - H / 2) * 0.009;
              const r = 0.7 + (i % 4) * 0.36;
              ctx.beginPath();
              ctx.fillStyle = i % 9 === 0 ? 'rgba(229, 9, 32,.65)' : 'rgba(245, 245, 242,.10)';
              ctx.arc(x + dx * ((i % 6) - 2.5), y + dy * ((i % 4) - 1.5), r, 0, Math.PI * 2);
              ctx.fill();
            }
          },
          reduced,
        ),
      );
    }

    /* ── industries network background ── */
    const netC = document.getElementById('netC') as HTMLCanvasElement | null;
    if (netC) {
      cleanups.push(
        mkC(
          netC,
          (ctx, W, H, f) => {
            ctx.clearRect(0, 0, W, H);
            const pts = Array.from({ length: 22 }, (_, i) => ({
              x: (Math.sin(i * 12.99 + f * 0.003) * 0.5 + 0.5) * W,
              y: (Math.cos(i * 8.23 + f * 0.004) * 0.5 + 0.5) * H,
            }));
            pts.forEach((p, i) =>
              pts.slice(i + 1).forEach((q) => {
                const d = Math.hypot(p.x - q.x, p.y - q.y);
                if (d < 210) {
                  ctx.globalAlpha = (1 - d / 210) * 0.15;
                  ctx.strokeStyle = 'rgba(229, 9, 32,1)';
                  ctx.lineWidth = 0.7;
                  ctx.beginPath();
                  ctx.moveTo(p.x, p.y);
                  ctx.lineTo(q.x, q.y);
                  ctx.stroke();
                }
              }),
            );
            ctx.globalAlpha = 1;
          },
          reduced,
        ),
      );
    }

    /* ── fullpage wheel/key snapping (desktop, home only) ── */
    if (fullpage && !reduced && matchMedia('(pointer:fine)').matches && innerWidth > 768) {
      document.documentElement.style.scrollSnapType = 'none';

      const secs = [
        ...Array.from(document.querySelectorAll<HTMLElement>('main > section')),
        document.querySelector('footer'),
      ].filter(Boolean) as HTMLElement[];

      const TOL = 24;
      let lock = false;

      const tops = () => secs.map((s) => s.getBoundingClientRect().top + scrollY);
      const maxY = () => document.documentElement.scrollHeight - innerHeight;
      // The original checked document.body for a class Alpine never set, so it
      // never actually paused for overlays. The provider now marks <html>.
      const overlayOpen = () => document.documentElement.classList.contains('is-locked');

      const animateTo = (yTarget: number) => {
        const y = Math.max(0, Math.min(yTarget, maxY()));
        lock = true;
        const y0 = scrollY;
        const dist = y - y0;
        const t0 = performance.now();
        const dur = 850;
        const ease = (p: number) => 1 - Math.pow(1 - p, 4);
        const step = (n: number) => {
          const p = Math.min((n - t0) / dur, 1);
          scrollTo({ top: y0 + dist * ease(p), behavior: 'instant' as ScrollBehavior });
          if (p < 1) requestAnimationFrame(step);
          else setTimeout(() => (lock = false), 220);
        };
        step(t0);
      };

      const snap = (dir: number) => {
        const ts = tops();
        let i = 0;
        for (let k = 0; k < ts.length; k++) if (scrollY >= ts[k] - 4) i = k;
        const bottom = ts[i] + secs[i].offsetHeight;

        if (dir > 0) {
          if (scrollY + innerHeight < bottom - TOL) return false;
          animateTo(i + 1 < ts.length ? ts[i + 1] : maxY());
          return true;
        }
        if (scrollY > ts[i] + TOL) {
          if (secs[i].offsetHeight > innerHeight + 50) return false;
          animateTo(ts[i]);
          return true;
        }
        if (i === 0) {
          animateTo(0);
          return true;
        }
        const prevTall = secs[i - 1].offsetHeight > innerHeight + 50;
        animateTo(prevTall ? ts[i] - innerHeight : ts[i - 1]);
        return true;
      };

      const onWheel = (e: WheelEvent) => {
        if (overlayOpen()) return;
        if (lock) {
          e.preventDefault();
          return;
        }
        if (Math.abs(e.deltaY) < 8) return;
        if (snap(Math.sign(e.deltaY))) e.preventDefault();
      };
      addEventListener('wheel', onWheel, { passive: false });
      cleanups.push(() => removeEventListener('wheel', onWheel));

      const onKey = (e: KeyboardEvent) => {
        if (overlayOpen() || lock) return;
        if ((e.target as HTMLElement)?.matches?.('input, textarea, select')) return;
        const down = ['ArrowDown', 'PageDown', ' '].includes(e.key);
        const up = ['ArrowUp', 'PageUp'].includes(e.key);
        if ((down || up) && snap(down ? 1 : -1)) e.preventDefault();
      };
      addEventListener('keydown', onKey);
      cleanups.push(() => removeEventListener('keydown', onKey));
    }

    return () => cleanups.forEach((fn) => fn());
  }, [fullpage]);

  return null;
}
