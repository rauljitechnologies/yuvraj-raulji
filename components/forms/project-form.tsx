'use client';

import { useState } from 'react';
import { track } from '../../lib/analytics';
import {
  BUDGET_RANGES,
  PROJECT_EMPTY,
  PROJECT_TECHNOLOGIES,
  PROJECT_TYPES,
  TIMELINES,
  fieldErrors,
  projectSchema,
  projectToLead,
  type ProjectInput,
} from '../../lib/forms';
import { submitLead, type LeadResult } from '../../lib/lead';
import { CONTACT } from '../../lib/site';
import { FormResult, Honeypot, SelectField, TextArea, TextField, type Tone } from './fields';

/**
 * The project funnel.
 *
 * The sibling of RecruiterForm and written to the same rules: validation only
 * after the first submit, three required fields, focus moved to the first
 * blocker, and `submitLead` as the one submission path so a message sent from
 * here lands where one sent from anywhere else does.
 *
 * `website` is optional and that is deliberate, for the reason recorded in
 * lib/site.ts: this site takes enquiries from agencies acting on behalf of a
 * client and from businesses that have not launched yet, and requiring a store
 * URL turns both away. It is still the most useful field on the form when it
 * is given, which is why it carries the hint rather than the asterisk.
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
      track('form_invalid', { form: 'project', field: Object.keys(errs)[0] });
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
          autoComplete="organization"
          placeholder="Your company"
          value={f.company ?? ''}
          onChange={set('company')}
          error={errors.company}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          name="email"
          label="Business email"
          tone={tone}
          required
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={f.email}
          onChange={set('email')}
          error={errors.email}
        />
        <TextField
          name="website"
          label="Website"
          tone={tone}
          type="url"
          autoComplete="url"
          placeholder="yourstore.com"
          hint="One paste tells me the platform, the scale and usually the problem."
          value={f.website ?? ''}
          onChange={set('website')}
          error={errors.website}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          name="projectType"
          label="Project type"
          tone={tone}
          options={PROJECT_TYPES}
          value={f.projectType ?? ''}
          onChange={set('projectType')}
          error={errors.projectType}
        />
        <SelectField
          name="technology"
          label="Technology"
          tone={tone}
          options={PROJECT_TECHNOLOGIES}
          value={f.technology ?? ''}
          onChange={set('technology')}
          error={errors.technology}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          name="budget"
          label="Budget range"
          tone={tone}
          options={BUDGET_RANGES}
          /* "Not decided yet" is a real option, not a placeholder. A required
             budget with no honest answer for a buyer who does not know yet
             makes them guess, which prices the conversation before it starts. */
          hint="An indication, not a commitment."
          value={f.budget ?? ''}
          onChange={set('budget')}
          error={errors.budget}
        />
        <SelectField
          name="timeline"
          label="Timeline"
          tone={tone}
          options={TIMELINES}
          value={f.timeline ?? ''}
          onChange={set('timeline')}
          error={errors.timeline}
        />
      </div>

      <TextArea
        name="message"
        label="Project description"
        tone={tone}
        required
        rows={6}
        placeholder="What you are building or fixing, and what is in the way."
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
          {sending ? 'Sending...' : 'Submit Project Inquiry'}
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
