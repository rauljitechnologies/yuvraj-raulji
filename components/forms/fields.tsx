'use client';

import type { ReactNode } from 'react';

/**
 * Shared field primitives for the two lead forms.
 *
 * ── Why these exist as components rather than as class strings ─────────────
 *
 * The existing forms share their styling by exporting class-name constants and
 * re-declaring the markup around them. That worked while one of them existed.
 * With two more funnels it stopped working, because the thing that has to be
 * consistent is not the border colour, it is the relationship between a label,
 * its control, its error message and the `aria-describedby` that ties the two
 * together. That is structure, so it is a component.
 *
 * ── The accessibility contract, in one place ───────────────────────────────
 *
 * Every field here guarantees four things, and gets them wrong in zero places
 * because there is only one implementation:
 *
 *   1. The label is a real <label> wrapping its control, so the hit area
 *      includes the text and no `for`/`id` pair can drift.
 *   2. An invalid control carries `aria-invalid`, so it is announced as
 *      invalid rather than merely painted red.
 *   3. The error text is linked by `aria-describedby` and rendered inside a
 *      `role="alert"`, so it is read when it appears instead of being a visual
 *      change a screen-reader user never learns about.
 *   4. The error is never the only signal: it is text, not just a colour.
 *
 * ── The two grounds ───────────────────────────────────────────────────────
 *
 * The forms appear on a dark section and inside a white band, and a field
 * drawn for one is invisible on the other. `tone` picks the palette rather
 * than each page overriding classes, which is what stopped the homepage form
 * and the modal from agreeing.
 */

export type Tone = 'dark' | 'paper';

/* The ink colour the controls are drawn in, per ground. `ground` is the page
   black, so on the white band the rules and the text are black at low alpha
   and on the dark sections they are the off-white. */
const TONE = {
  dark: {
    label: 'text-ink/55',
    rule: 'border-ink/20',
    text: 'text-ink',
    placeholder: 'placeholder:text-ink/40',
    chevron: '%23f5f3ee',
    selectBg: 'bg-ground',
    hint: 'text-ink/45',
  },
  paper: {
    label: 'text-ground/55',
    rule: 'border-ground/20',
    text: 'text-ground',
    placeholder: 'placeholder:text-ground/55',
    chevron: '%23050505',
    selectBg: 'bg-white',
    hint: 'text-ground/50',
  },
} as const;

function labelClass(tone: Tone) {
  return `flex flex-col gap-2.5 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.16em] ${TONE[tone].label}`;
}

/**
 * `w-full min-w-0` is load-bearing, not decoration.
 *
 * A bare input, select or textarea carries an intrinsic width of roughly
 * twenty characters, and that width is also its min-content width, so it
 * refuses to shrink. Inside a grid cell, which is `min-width: auto` by
 * default, that pins the whole panel wider than a phone and the page's
 * `overflow-x: clip` then cuts it off rather than letting it scroll.
 * Shrinking the controls is what lets the cell shrink. This was a real bug on
 * the homepage form and the note is carried here so it does not come back.
 */
function fieldClass(tone: Tone, invalid: boolean) {
  const t = TONE[tone];
  return `w-full min-w-0 appearance-none rounded-none border-0 border-b bg-transparent py-3 font-manrope text-[17px] font-light leading-[1.4] outline-none transition-colors ${
    t.text
  } ${t.placeholder} ${invalid ? 'border-error' : `${t.rule} focus:border-accent`}`;
}

function Err({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    /* `role="alert"` rather than a styled <p>: the message appears after a
       submit attempt, and an alert is announced when it arrives. */
    <span
      id={id}
      role="alert"
      className="font-manrope text-[13px] font-normal normal-case leading-[1.5] tracking-normal text-error"
    >
      {msg}
    </span>
  );
}

interface Base {
  name: string;
  label: string;
  tone: Tone;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  /** Helper text under the control, for a field whose purpose is not obvious. */
  hint?: string;
}

export function TextField({
  name,
  label,
  tone,
  value,
  onChange,
  error,
  required,
  autoComplete,
  placeholder,
  hint,
  type = 'text',
}: Base & { type?: 'text' | 'email' | 'url' }) {
  const errId = `${name}-error`;
  const hintId = `${name}-hint`;
  return (
    <label className={labelClass(tone)}>
      {label}
      {required ? <span className="sr-only"> (required)</span> : null}
      {required ? <span aria-hidden="true" className="text-accent"> *</span> : null}
      <input
        type={type}
        name={name}
        /* No `required` attribute. The browser's own bubble fires before the
           submit handler and replaces the schema's message with a generic one,
           so the two validators would disagree about what is wrong. Zod owns
           validation here; `aria-required` still states the requirement. */
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : hint ? hintId : undefined}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={fieldClass(tone, Boolean(error))}
      />
      {hint && !error ? (
        <span id={hintId} className={`font-manrope text-[13px] font-normal normal-case leading-[1.5] tracking-normal ${TONE[tone].hint}`}>
          {hint}
        </span>
      ) : null}
      <Err id={errId} msg={error} />
    </label>
  );
}

export function SelectField({
  name,
  label,
  tone,
  value,
  onChange,
  error,
  options,
  placeholder = 'Select one',
  hint,
}: Omit<Base, 'autoComplete'> & { options: readonly string[] }) {
  const errId = `${name}-error`;
  const hintId = `${name}-hint`;
  const t = TONE[tone];
  return (
    <label className={labelClass(tone)}>
      {label}
      <select
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : hint ? hintId : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        /* `appearance-none` removes the native chevron, so one is drawn back as
           a background mark. Without it a select reads as a text field that
           will not accept typing. It is also what stops the control sizing
           itself to its widest option, which several of these lists have. */
        className={`${fieldClass(tone, Boolean(error))} bg-[length:9px] bg-[right_2px_center] bg-no-repeat pr-7 ${t.selectBg} [background-image:url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2010%206%27%3E%3Cpath%20d%3D%27M1%201l4%204%204-4%27%20stroke%3D%27${t.chevron}%27%20stroke-opacity%3D%27.45%27%20stroke-width%3D%271.5%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E")]`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {hint && !error ? (
        <span id={hintId} className={`font-manrope text-[13px] font-normal normal-case leading-[1.5] tracking-normal ${t.hint}`}>
          {hint}
        </span>
      ) : null}
      <Err id={errId} msg={error} />
    </label>
  );
}

export function TextArea({
  name,
  label,
  tone,
  value,
  onChange,
  error,
  required,
  placeholder,
  hint,
  rows = 5,
}: Base & { rows?: number }) {
  const errId = `${name}-error`;
  const hintId = `${name}-hint`;
  return (
    <label className={labelClass(tone)}>
      {label}
      {required ? <span className="sr-only"> (required)</span> : null}
      {required ? <span aria-hidden="true" className="text-accent"> *</span> : null}
      <textarea
        name={name}
        rows={rows}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : hint ? hintId : undefined}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldClass(tone, Boolean(error))} resize-y`}
      />
      {hint && !error ? (
        <span id={hintId} className={`font-manrope text-[13px] font-normal normal-case leading-[1.5] tracking-normal ${TONE[tone].hint}`}>
          {hint}
        </span>
      ) : null}
      <Err id={errId} msg={error} />
    </label>
  );
}

/**
 * The honeypot.
 *
 * Hidden from sight and from assistive technology, and excluded from the tab
 * order, so no person can reach it by any route. `autoComplete="off"` stops a
 * password manager filling it, which would turn a real visitor into a
 * discarded submission.
 *
 * It is positioned off-screen rather than `display:none`, because some bots
 * skip fields that are explicitly hidden and fill the ones that are merely
 * moved. See lib/forms.ts for what happens when it arrives filled.
 */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <label>
        Company website
        <input
          type="text"
          name="company-url"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

/**
 * The result panel, shared by both forms.
 *
 * Two outcomes and no third. 'fallback' means nothing could be confirmed and
 * the visitor's mail client has been handed the enquiry, so claiming a send
 * would be the exact false success that hid a dead endpoint for weeks. See the
 * note at the top of lib/lead.ts.
 */
export function FormResult({
  result,
  tone,
  sentHeading,
  sentBody,
  email,
}: {
  result: 'sent' | 'fallback';
  tone: Tone;
  sentHeading: string;
  sentBody: ReactNode;
  email: string;
}) {
  const t = TONE[tone];
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[260px] flex-col justify-center gap-4"
    >
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-accent-bright">
        {result === 'sent' ? sentHeading : 'Send it from your email'}
      </span>
      <p className={`m-0 max-w-[46ch] font-manrope text-2xl font-light leading-[1.35] ${t.text}`}>
        {result === 'sent' ? (
          sentBody
        ) : (
          <>
            The form could not reach the server, so your email app has opened with the message
            already written. Send that and it reaches me directly.
          </>
        )}
      </p>
      {result === 'fallback' ? (
        <p className={`m-0 font-manrope text-base font-light leading-[1.6] ${t.hint}`}>
          If nothing opened:{' '}
          <a href={`mailto:${email}`} className="text-accent-bright underline">
            {email}
          </a>
        </p>
      ) : null}
    </div>
  );
}
