'use client';

import { useState } from 'react';
import { CONTACT, LEAD_ENDPOINT, SERVICE_OPTIONS } from '../lib/site';
import { useUI } from './ui-context';

const EMPTY = { name: '', email: '', phone: '', service: '', message: '', hp: '' };

/**
 * Validation ported verbatim from the Alpine `phoneOk()`:
 * phone is optional; rejects letters/symbols; accepts +international (8–15
 * digits), 10-digit Indian mobiles starting 6–9, 0+10, and 91+10.
 */
export function phoneOk(raw: string): boolean {
  const v = (raw || '').trim();
  if (!v) return true;
  if (/[^0-9+\s().-]/.test(v)) return false;
  const d = v.replace(/\D/g, '');
  if (v.startsWith('+')) return d.length >= 8 && d.length <= 15;
  if (d.length === 10) return /^[6-9]/.test(d);
  if (d.length === 11 && d.startsWith('0')) return /^[6-9]/.test(d[1]);
  if (d.length === 12 && d.startsWith('91')) return /^[6-9]/.test(d[2]);
  return false;
}

export function ContactModal() {
  const { contactOpen, setContactOpen } = useUI();
  const [f, setF] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const valid = Boolean(f.name && f.email && f.message) && phoneOk(f.phone);

  const mailtoFallback = () => {
    const s = encodeURIComponent(`Project Inquiry from ${f.name}${f.service ? ` — ${f.service}` : ''}`);
    const b = encodeURIComponent(
      `Name: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone || '—'}\nService: ${f.service || 'Not specified'}\n\nMessage:\n${f.message}`,
    );
    window.open(`mailto:${CONTACT.email}?subject=${s}&body=${b}`);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || sending) return;

    if (!LEAD_ENDPOINT) {
      mailtoFallback();
      setSent(true);
      return;
    }

    setSending(true);
    const body = new URLSearchParams({
      name: f.name,
      email: f.email,
      phone: f.phone || '',
      service: f.service || '',
      message: f.message,
      page: location.href,
      hp: f.hp || '',
    });

    try {
      await fetch(LEAD_ENDPOINT, { method: 'POST', mode: 'no-cors', body });
      setSending(false);
      setSent(true);
    } catch {
      setSending(false);
      mailtoFallback();
      setSent(true);
    }
  };

  const close = () => setContactOpen(false);
  const reset = () => {
    close();
    setF(EMPTY);
    setSent(false);
    setSending(false);
  };

  const phoneBad = !phoneOk(f.phone);

  return (
    <div
      className={`fixed inset-0 z-[1150] grid place-items-center p-4 sm:p-6 transition-all duration-[340ms] ${
        contactOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      aria-label="Contact Yuvraj Raulji"
    >
      <div className="absolute inset-0 bg-[rgba(0,0,0,.90)] backdrop-blur-2xl" onClick={close} />

      <div
        className={`relative z-[1] w-[min(980px,100%)] max-h-[calc(100vh-48px)] overflow-y-auto rounded-xl border border-[rgba(229,9,32,.22)] shadow-[0_80px_220px_rgba(0,0,0,.80),0_0_120px_rgba(229,9,32,.10)] transition-all duration-[420ms] ${
          contactOpen ? 'translate-y-0 scale-100' : 'translate-y-8 scale-[.96]'
        }`}
        style={{ background: '#080808' }}
      >
        <button
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-[rgba(255,255,255,.12)] grid place-items-center text-[rgba(245,243,238,.50)] transition-all hover:border-red hover:text-white hover:bg-red hover:rotate-90 active:scale-90"
          onClick={close}
          aria-label="Close"
        >
          {/*
            Drawn, not typed. This was the multiplication sign, which section 2
            of BRAND-DESIGN-GUIDELINE.md bans from the project outright. A
            stroked cross is the shape that character was standing in for
            anyway, and it scales with the button instead of with the font.
          */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr]">
          {/* ── LEFT: brand panel ── */}
          <div
            className="relative overflow-hidden rounded-tl-xl rounded-bl-xl p-8 lg:p-10 flex flex-col gap-8"
            style={{
              background: 'linear-gradient(135deg,#0d0d0d 0%,#0a0a0a 100%)',
              borderRight: '1px solid rgba(255,255,255,.06)',
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{ height: '50%', background: 'radial-gradient(ellipse 100% 80% at 50% 100%,rgba(229, 9, 32,.12),transparent)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none opacity-60" aria-hidden="true">
              <p
                className="font-display uppercase"
                style={{ fontSize: '8rem', letterSpacing: '.01em', color: 'rgba(229, 9, 32,.04)', whiteSpace: 'nowrap', transform: 'translateY(15%)' }}
              >
                YR
              </p>
            </div>

            <div className="relative z-[1]">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ width: 24, height: 1, background: 'var(--accent-bright)', flexShrink: 0 }} />
                <span style={{ fontSize: '.66rem', fontWeight: 700, letterSpacing: '.32em', textTransform: 'uppercase', color: 'rgba(229, 9, 32,.60)' }}>
                  Private Consultation
                </span>
              </div>
              <h2
                id="contact-modal-title"
                className="font-display uppercase"
                style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)', lineHeight: 0.9, letterSpacing: '.02em', color: 'var(--text)', marginBottom: 16 }}
              >
                Start a
                <br />
                <span style={{ color: 'rgba(245, 243, 238, .38)' }}>Conversation</span>
              </h2>
              <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'rgba(245, 243, 238, .45)', maxWidth: 300 }}>
                Every great brand begins with a conversation. Tell me about your project and I&rsquo;ll be in touch within 24 hours.
              </p>
            </div>

            <div className="relative z-[1]" style={{ height: 1, background: 'linear-gradient(90deg,rgba(229, 9, 32,.30),transparent)' }} />

            <div className="relative z-[1] flex flex-col gap-5">
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
                <span
                  className="group-hover:border-[rgba(229,9,32,.40)]"
                  style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.03)', display: 'grid', placeItems: 'center', flexShrink: 0, transition: 'border-color .22s' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(229, 9, 32,.70)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="2,4 12,13 22,4" />
                  </svg>
                </span>
                <div>
                  <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.20em', textTransform: 'uppercase', color: 'rgba(245, 243, 238, .28)', marginBottom: 2 }}>Email</p>
                  <p className="group-hover:text-white" style={{ fontSize: '.82rem', color: 'rgba(245, 243, 238, .70)', transition: 'color .22s' }}>
                    {CONTACT.email}
                  </p>
                </div>
              </a>

              <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
                <span
                  className="group-hover:border-[rgba(37,211,102,.55)]"
                  style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(37,211,102,.28)', background: 'rgba(37,211,102,.06)', display: 'grid', placeItems: 'center', flexShrink: 0, transition: 'border-color .22s' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                <div>
                  <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.20em', textTransform: 'uppercase', color: 'rgba(245, 243, 238, .28)', marginBottom: 2 }}>WhatsApp Business</p>
                  <p className="group-hover:text-white" style={{ fontSize: '.82rem', color: 'rgba(245, 243, 238, .70)', transition: 'color .22s' }}>
                    {CONTACT.phoneDisplay}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <span style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.03)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(229, 9, 32,.70)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.20em', textTransform: 'uppercase', color: 'rgba(245, 243, 238, .28)', marginBottom: 2 }}>Location</p>
                  <p style={{ fontSize: '.82rem', color: 'rgba(245, 243, 238, .70)' }}>{CONTACT.location}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 4 }}>
                <a href={CONTACT.instagram} target="_blank" rel="noopener" className="ft-ico" style={{ width: 34, height: 34, borderRadius: 7 }} aria-label="Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href={CONTACT.facebook} target="_blank" rel="noopener" className="ft-ico" style={{ width: 34, height: 34, borderRadius: 7 }} aria-label="Facebook">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href={CONTACT.linkedin} target="_blank" rel="noopener" className="ft-ico" style={{ width: 34, height: 34, borderRadius: 7 }} aria-label="LinkedIn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            <div
              className="relative z-[1]"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', border: '1px solid rgba(34,197,94,.18)', borderRadius: 6, background: 'rgba(34,197,94,.05)' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0, boxShadow: '0 0 0 0 rgba(34,197,94,.5)', animation: 'avP 1.6s infinite' }} />
              <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(34,197,94,.70)' }}>
                Responds within 24 hours
              </span>
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div className="p-8 lg:p-10">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-6 text-center py-16">
                <div style={{ width: 64, height: 64, borderRadius: '50%', border: '1px solid rgba(34,197,94,.40)', background: 'rgba(34,197,94,.08)', display: 'grid', placeItems: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-display uppercase" style={{ fontSize: '2rem', letterSpacing: '.06em', color: 'var(--text)', marginBottom: 8 }}>
                    Message Sent
                  </p>
                  <p style={{ fontSize: '.90rem', color: 'rgba(245, 243, 238, .50)', lineHeight: 1.7 }}>
                    Your message has been received and a confirmation email is on its way to you. I&rsquo;ll get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={reset}
                  className="h-[44px] px-7 rounded border border-[rgba(255,255,255,.14)] text-[.72rem] font-bold tracking-[.10em] uppercase text-[rgba(245, 243, 238, .60)] transition-all hover:border-red hover:text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <input
                  type="text"
                  name="company_website"
                  value={f.hp}
                  onChange={set('hp')}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: -5000, width: 1, height: 1, opacity: 0 }}
                />

                <div style={{ marginBottom: 28 }}>
                  <p className="font-display uppercase" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '.04em', color: 'var(--text)', lineHeight: 1, marginBottom: 6 }}>
                    Start a Conversation
                  </p>
                  <p style={{ fontSize: '.82rem', color: 'rgba(245, 243, 238, .38)' }}>Fill in the details and I&rsquo;ll reach out shortly.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="cf-lbl" htmlFor="cf-name">
                      Full Name <span style={{ color: 'var(--accent-bright)' }}>*</span>
                    </label>
                    <input id="cf-name" className="cf-inp" type="text" placeholder="Yuvraj Raulji" value={f.name} onChange={set('name')} required />
                  </div>
                  <div>
                    <label className="cf-lbl" htmlFor="cf-email">
                      Email Address <span style={{ color: 'var(--accent-bright)' }}>*</span>
                    </label>
                    <input id="cf-email" className="cf-inp" type="email" placeholder="you@company.com" value={f.email} onChange={set('email')} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="cf-lbl" htmlFor="cf-phone">
                      Phone Number
                    </label>
                    <input
                      id="cf-phone"
                      className="cf-inp"
                      type="tel"
                      inputMode="tel"
                      maxLength={18}
                      placeholder="+91 XXXXX XXXXX"
                      value={f.phone}
                      onChange={set('phone')}
                      style={phoneBad ? { borderColor: 'rgba(240, 38, 60,.70)', boxShadow: '0 0 0 1px rgba(240, 38, 60,.30)' } : undefined}
                    />
                    {phoneBad && (
                      <p style={{ marginTop: 6, fontSize: '.68rem', letterSpacing: '.04em', color: 'var(--accent-bright)' }}>
                        Enter a valid mobile number — e.g. 98983 34731 or +91 98983 34731
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="cf-lbl" htmlFor="cf-service">
                      What is this about?
                    </label>
                    <select id="cf-service" className="cf-inp" value={f.service} onChange={set('service')}>
                      <option value="">Pick the closest one</option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                      <option value="Other">Something else</option>
                    </select>
                  </div>
                </div>

                <div className="mb-7">
                  <label className="cf-lbl" htmlFor="cf-msg">
                    Message <span style={{ color: 'var(--accent-bright)' }}>*</span>
                  </label>
                  <textarea
                    id="cf-msg"
                    className="cf-inp"
                    rows={5}
                    placeholder="What are you trying to do, and what is in the way?"
                    value={f.message}
                    onChange={set('message')}
                    required
                    style={{ resize: 'vertical', minHeight: 120 }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <span style={{ fontSize: '.68rem', color: 'rgba(245, 243, 238, .24)', letterSpacing: '.08em' }}>
                    <span style={{ color: 'var(--accent-bright)' }}>*</span> Required fields
                  </span>
                  <button
                    type="submit"
                    disabled={!valid || sending}
                    className="inline-flex items-center gap-2 h-[50px] px-8 rounded bg-red text-white text-[.74rem] font-bold tracking-[.12em] uppercase transition-all hover:bg-rv active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    {sending ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-[14px] h-[14px] rounded-full border-2 border-white/30 border-t-white" style={{ animation: 'sp .7s linear infinite' }} />
                        Sending…
                      </span>
                    ) : (
                      <span>Send Message &nbsp;→</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
