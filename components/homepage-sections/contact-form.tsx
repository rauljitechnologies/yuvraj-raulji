'use client';

import { useState } from 'react';
import { ENQUIRY_TOPICS } from '../../lib/homepage';
import { LEAD_ENDPOINT } from '../../lib/site';

/**
 * The homepage contact form.
 *
 * The canvas mockup wired its submit handler to `e.preventDefault()` and
 * nothing else, which would have shipped a form that silently drops every
 * enquiry. This posts to the same Apps Script endpoint the site's contact modal
 * already uses, with the same `no-cors` POST and the same mailto fallback, so a
 * message sent from here lands in the same place as one sent from anywhere else.
 *
 * The only client component on the homepage besides the reveal wrappers.
 *
 * Drawn for the white band it sits in, not the page ground: rules and text are
 * `ground`, and the panel carries no border or padding of its own because the
 * cell in section 14 provides both.
 */

const EMPTY = { name: '', email: '', topic: ENQUIRY_TOPICS[0], message: '', hp: '' };

export function ContactForm() {
  const [f, setF] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const valid = f.name.trim() !== '' && /\S+@\S+\.\S+/.test(f.email) && f.message.trim() !== '';

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Enquiry: ${f.topic}`);
    const body = encodeURIComponent(`${f.message}\n\n${f.name}\n${f.email}`);
    window.location.href = `mailto:hello@yuvrajraulji.com?subject=${subject}&body=${body}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || sending) return;

    // Honeypot: a bot fills every field it finds, a person never sees this one.
    if (f.hp) {
      setSent(true);
      return;
    }

    if (!LEAD_ENDPOINT) {
      mailtoFallback();
      setSent(true);
      return;
    }

    setSending(true);
    const body = new URLSearchParams({
      name: f.name,
      email: f.email,
      phone: '',
      service: f.topic,
      message: f.message,
      page: typeof location !== 'undefined' ? location.href : '',
      hp: '',
    });

    try {
      await fetch(LEAD_ENDPOINT, { method: 'POST', mode: 'no-cors', body });
      setSent(true);
    } catch {
      mailtoFallback();
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  const field =
    'bg-transparent border-0 border-b border-ground/20 py-3 font-manrope text-[17px] font-light leading-[1.4] text-ground outline-none transition-colors placeholder:text-ground/35 focus:border-accent';
  const label =
    'flex flex-col gap-2.5 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.16em] text-ground/45';

  if (sent) {
    return (
      <div
        // Announced rather than silently swapped in, so a screen-reader user
        // knows the send succeeded without having to hunt for the change.
        role="status"
        aria-live="polite"
        className="flex min-h-[420px] flex-col justify-center gap-4"
      >
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-accent">
          Message sent
        </span>
        <p className="m-0 font-manrope text-2xl font-light leading-[1.35] text-ground">
          Thank you. I read every message myself and will reply within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <div className="flex items-center gap-3 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.24em] text-ground/40">
        <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-accent animate-yr-blink" />
        Responds within 24 hours
      </div>

      <label className={label}>
        Full name *
        <input
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          value={f.name}
          onChange={(e) => setF({ ...f, name: e.target.value })}
          className={field}
        />
      </label>

      <label className={label}>
        Email address *
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={f.email}
          onChange={(e) => setF({ ...f, email: e.target.value })}
          className={field}
        />
      </label>

      <label className={label}>
        What is this about?
        <select
          value={f.topic}
          onChange={(e) => setF({ ...f, topic: e.target.value })}
          className={`${field} bg-white text-ground/80`}
        >
          {ENQUIRY_TOPICS.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </label>

      <label className={label}>
        Message *
        <textarea
          rows={3}
          required
          placeholder="Tell me about the problem."
          value={f.message}
          onChange={(e) => setF({ ...f, message: e.target.value })}
          className={`${field} resize-y leading-[1.5]`}
        />
      </label>

      {/* Honeypot. Hidden from people, left in the DOM for bots. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={f.hp}
        onChange={(e) => setF({ ...f, hp: e.target.value })}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <button
        type="submit"
        disabled={!valid || sending}
        className="mt-2 self-start bg-ground px-8 py-5 font-manrope text-xs font-bold uppercase leading-none tracking-[0.16em] text-white transition-colors duration-200 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ground"
      >
        {sending ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  );
}
