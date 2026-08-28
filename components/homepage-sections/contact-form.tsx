'use client';

import { useState } from 'react';
import { ENQUIRY_TOPICS } from '../../lib/homepage';
import { CONTACT, LEAD_ENDPOINT } from '../../lib/site';

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
    /* CONTACT.email, not a literal. This was hardcoded to an address that
       is not the mailbox, so every enquiry that fell back to mailto (a
       missing endpoint, or a failed fetch) was addressed to nobody. */
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
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

  /*
   * `w-full min-w-0` is load-bearing, not decoration. A bare input, select or
   * textarea carries an intrinsic width of roughly twenty characters, and that
   * width is also its min-content width, so it refuses to shrink. Inside a grid
   * cell (which is `min-width: auto` by default) that pinned the whole contact
   * panel at 449px and pushed it past the right edge of a 375px phone, where
   * the page's `overflow-x: clip` cut the text off rather than letting it
   * scroll. Shrinking the controls is what lets the cell shrink.
   *
   * `appearance-none` is on the select for the same reason: a native control
   * sizes itself to its widest option, and the topic list has long ones.
   */
  const field =
    'w-full min-w-0 bg-transparent border-0 border-b border-ground/20 py-3 font-manrope text-[17px] font-light leading-[1.4] text-ground outline-none transition-colors placeholder:text-ground/35 focus:border-accent';
  const label =
    'flex flex-col gap-2.5 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.16em] text-ground/45';

  if (sent) {
    return (
      <div
        // Announced rather than silently swapped in, so a screen-reader user
        // knows the send succeeded without having to hunt for the change.
        role="status"
        aria-live="polite"
        className="flex min-h-[260px] flex-col justify-center gap-4 lg:min-h-[420px]"
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
          /*
            `appearance-none` takes the native chevron with it, so one is drawn
            back as a background mark. Without it the topic control reads as a
            text field that will not accept typing.
          */
          className={`${field} appearance-none bg-white bg-[length:9px] bg-[right_2px_center] bg-no-repeat pr-7 text-ground/80 [background-image:url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2010%206%27%3E%3Cpath%20d%3D%27M1%201l4%204%204-4%27%20stroke%3D%27%23050505%27%20stroke-opacity%3D%27.45%27%20stroke-width%3D%271.5%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E")]`}
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
        className="mt-2 w-full bg-ground px-8 py-5 font-manrope text-xs font-bold uppercase leading-none tracking-[0.16em] text-white transition-colors duration-200 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ground xs:w-auto xs:self-start"
      >
        {sending ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  );
}
