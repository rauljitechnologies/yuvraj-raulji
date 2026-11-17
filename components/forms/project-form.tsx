'use client';

import { useState } from 'react';
import { track } from '../../lib/analytics';
import {
  PROJECT_EMPTY,
  fieldErrors,
  projectSchema,
  projectToLead,
  type ProjectInput,
} from '../../lib/forms';
import { submitLead, type LeadResult } from '../../lib/lead';
import { CONTACT } from '../../lib/site';
import { FormResult, Honeypot, TextArea, TextField, type Tone } from './fields';

/**
 * The one enquiry form.
 *
 * ── Why there is only one, and why it is this short ───────────────────────
 *
 * There were two: this and a recruiter form collecting a job title, an
 * employment type, a work arrangement and a job description URL. The
 * objective is now explicitly freelance client work and explicitly not a
 * recruiter portal, so that form and its schema are deleted rather than
 * hidden.
 *
 * This one went from nine fields to five, three of them required. The
 * instruction was not to overload the site with forms, and a nine-field form
 * on the page whose entire job is making contact easy was the overload.
 * Platform, timeline and project type are all things I can ask in the reply.
 * Asking them in the reply costs nothing; asking them on the form costs
 * submissions.
 *
 * ── Validation timing ────────────────────────────────────────────────────
 *
 * Nothing is validated until the first submit. Validating on blur tells a
 * reader who tabs through to read the form off for fields they have not
 * reached, which reads as the form being broken. After the first submit each
 * field revalidates as it is edited, so an error clears when it is fixed
 * rather than on the next submit.
 */
export function ProjectForm({ tone = 'dark', id }: { tone?: Tone; id?: string }) {
  const [f, setF] = useState<ProjectInput>(PROJECT_EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);

  const validate = (v: ProjectInput) => {
    const parsed = projectSchema.safeParse(v);
    return parsed.success ? {} : fieldErrors(parsed.error);
  };

  const set = (k: keyof ProjectInput) => (v: string) => {
    const next = { ...f, [k]: v };
    setF(next);
    if (submitted) setErrors(validate(next));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSubmitted(true);

    const parsed = projectSchema.safeParse(f);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      /* Recorded so a form nobody can get past is visible in the analytics
         rather than only in the drop-off. */
      track('form_invalid', { form: 'project', field: Object.keys(errs)[0] });
      /* Focus the first blocker. Without this a keyboard or screen-reader
         user submits, hears nothing, and has no idea which field is wrong. */
      document.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }

    setErrors({});
    setSending(true);
    const r = await submitLead({ ...projectToLead(parsed.data), funnel: 'project' });
    setResult(r);
    setSending(false);
  };

  if (result) {
    return (
      <FormResult
        result={result}
        tone={tone}
        sentHeading="Enquiry received"
        sentBody={
          <>
            Thank you. I read every enquiry myself and will reply within 24 hours, including if I
            think you do not need the project you just described.
          </>
        }
        email={CONTACT.email}
      />
    );
  }

  return (
    <form onSubmit={submit} noValidate id={id} className="relative flex flex-col gap-6">
      <Honeypot value={f.hp ?? ''} onChange={set('hp')} />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          name="name"
          label="Name"
          tone={tone}
          required
          autoComplete="name"
          placeholder="Your name"
          value={f.name}
          onChange={set('name')}
          error={errors.name}
        />
        <TextField
          name="email"
          label="Email"
          tone={tone}
          required
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={f.email}
          onChange={set('email')}
          error={errors.email}
        />
      </div>

      {/* One field for either, because a business has one or the other to hand
          and should not have to decide which box it goes in. */}
      <TextField
        name="company"
        label="Company or website"
        tone={tone}
        autoComplete="organization"
        placeholder="yourstore.com, or your company name"
        hint="Optional. A store URL tells me the platform and the scale before I read a word."
        value={f.company ?? ''}
        onChange={set('company')}
        error={errors.company}
      />

      <TextArea
        name="message"
        label="Project requirements"
        tone={tone}
        required
        rows={6}
        placeholder="What you are building or fixing, the platform it is on, and what is in the way."
        value={f.message}
        onChange={set('message')}
        error={errors.message}
      />

      {/* Free text, not a band list. A buyer who genuinely does not know yet
          can write "not sure", which is a real and useful answer that a
          select would force them to replace with a guess. */}
      <TextField
        name="budget"
        label="Budget"
        tone={tone}
        autoComplete="off"
        placeholder="A range, or not sure yet"
        hint="Optional, and an indication rather than a commitment."
        value={f.budget ?? ''}
        onChange={set('budget')}
        error={errors.budget}
      />

      <div className="mt-tight flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-[52px] shrink-0 items-center bg-accent px-8 font-display text-[.7rem] font-bold uppercase leading-none tracking-[.18em] text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:hover:translate-y-0"
        >
          {sending ? 'Sending...' : 'Discuss Your Project'}
        </button>
        <span
          className={`font-mono text-[11px] uppercase leading-[1.5] tracking-[0.16em] ${
            tone === 'paper' ? 'text-ground/50' : 'text-ink/45'
          }`}
        >
          Replies within 24 hours
        </span>
      </div>
    </form>
  );
}
