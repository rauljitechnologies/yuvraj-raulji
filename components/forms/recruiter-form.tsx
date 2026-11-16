'use client';

import { useState } from 'react';
import { track } from '../../lib/analytics';
import {
  EMPLOYMENT_TYPES,
  RECRUITER_EMPTY,
  WORK_ARRANGEMENTS,
  fieldErrors,
  recruiterSchema,
  recruiterToLead,
  type RecruiterInput,
} from '../../lib/forms';
import { submitLead, type LeadResult } from '../../lib/lead';
import { CONTACT } from '../../lib/site';
import { FormResult, Honeypot, SelectField, TextArea, TextField, type Tone } from './fields';

/**
 * The hiring funnel.
 *
 * Rendered on /remote-work/ and on /contact/. It is deliberately a different
 * form from the project one rather than a mode of it: a hiring manager should
 * never be asked for a budget range, and a business should never be asked for
 * an employment type. Keeping them separate is also what makes the two
 * countable, because `generate_lead` carries which funnel produced it.
 *
 * ── Validation timing ─────────────────────────────────────────────────────
 *
 * Nothing is validated until the first submit. Validating on blur means a
 * reader who tabs through the form to read it is told off for fields they have
 * not filled in yet, which reads as the form being broken. After the first
 * submit, each field revalidates as it is edited, so an error clears as soon
 * as it is fixed rather than on the next submit.
 *
 * Three fields are required and the rest are not, which is the discipline the
 * rest of this site's forms are written under: every additional required field
 * is a submission that does not happen.
 */
export function RecruiterForm({ tone = 'dark', id }: { tone?: Tone; id?: string }) {
  const [f, setF] = useState<RecruiterInput>(RECRUITER_EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);

  /** Updates one field, and revalidates only after a submit has been tried. */
  const set = (k: keyof RecruiterInput) => (v: string) => {
    const next = { ...f, [k]: v };
    setF(next);
    if (submitted) setErrors(validate(next));
  };

  const validate = (v: RecruiterInput) => {
    const parsed = recruiterSchema.safeParse(v);
    return parsed.success ? {} : fieldErrors(parsed.error);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSubmitted(true);

    const parsed = recruiterSchema.safeParse(f);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      /* Recorded so a form nobody can get past is visible in the analytics
         rather than only in the drop-off. `field` names the first blocker. */
      track('form_invalid', { form: 'recruiter', field: Object.keys(errs)[0] });
      /* Move focus to the first thing that is wrong. Without this a keyboard
         or screen-reader user submits, hears nothing and has no idea which of
         eight fields the complaint is about. */
      document.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }

    setErrors({});
    setSending(true);
    /* `submitLead` returns 'sent' only on a confirmed submission, and fires
       `generate_lead` itself. `funnel` distinguishes this form from the
       project one in the same event. */
    const r = await submitLead({ ...recruiterToLead(parsed.data), funnel: 'recruiter' });
    setResult(r);
    setSending(false);
  };

  if (result) {
    return (
      <FormResult
        result={result}
        tone={tone}
        sentHeading="Opportunity received"
        sentBody={
          <>
            Thank you. I read every approach myself and will reply within 24 hours, including if
            it is not the right fit.
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
          label="Full name"
          tone={tone}
          required
          autoComplete="name"
          placeholder="Your name"
          value={f.name}
          onChange={set('name')}
          error={errors.name}
        />
        <TextField
          name="company"
          label="Company"
          tone={tone}
          required
          autoComplete="organization"
          placeholder="Who is hiring"
          value={f.company}
          onChange={set('company')}
          error={errors.company}
        />
      </div>

      <TextField
        name="email"
        label="Professional email"
        tone={tone}
        required
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        value={f.email}
        onChange={set('email')}
        error={errors.email}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          name="jobTitle"
          label="Job title"
          tone={tone}
          autoComplete="off"
          placeholder="Senior Magento Developer"
          value={f.jobTitle ?? ''}
          onChange={set('jobTitle')}
          error={errors.jobTitle}
        />
        <SelectField
          name="employmentType"
          label="Employment type"
          tone={tone}
          options={EMPLOYMENT_TYPES}
          value={f.employmentType ?? ''}
          onChange={set('employmentType')}
          error={errors.employmentType}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          name="workArrangement"
          label="Work arrangement"
          tone={tone}
          options={WORK_ARRANGEMENTS}
          value={f.workArrangement ?? ''}
          onChange={set('workArrangement')}
          error={errors.workArrangement}
        />
        <TextField
          name="jobUrl"
          label="Job description URL"
          tone={tone}
          type="url"
          autoComplete="off"
          placeholder="company.com/careers/role"
          hint="The fastest way to tell me the stack and the seniority."
          value={f.jobUrl ?? ''}
          onChange={set('jobUrl')}
          error={errors.jobUrl}
        />
      </div>

      <TextArea
        name="message"
        label="Message"
        tone={tone}
        required
        rows={5}
        placeholder="The team, the stack, and what the first six months look like."
        value={f.message}
        onChange={set('message')}
        error={errors.message}
      />

      <div className="mt-tight flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-[52px] shrink-0 items-center bg-accent px-8 font-display text-[.7rem] font-bold uppercase leading-none tracking-[.18em] text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:hover:translate-y-0"
        >
          {sending ? 'Sending...' : 'Send Me a Remote Opportunity'}
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
