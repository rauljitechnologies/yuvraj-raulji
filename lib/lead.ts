import { track } from './analytics';
import { CONTACT, LEAD_ENDPOINT } from './site';

/**
 * Lead submission, shared by the enquiry modal and the /contact/ form.
 *
 * ── The bug this file exists to make impossible ─────────────────────────────
 *
 * Both forms posted with `mode: 'no-cors'`. An opaque response resolves for
 * *any* HTTP status, including a redirect to a login page, so `fetch` never
 * rejected and both forms called their success state unconditionally. On
 * 4 Sep 2026 the Apps Script deployment was found redirecting to
 * accounts.google.com, which means its access had drifted from the "Anyone"
 * setting its own SETUP-GUIDE documents. Every enquiry was being discarded and
 * every visitor was being shown "Message Sent".
 *
 * That is the exact failure this site warns clients about on
 * /wordpress/integrations/: the form reports success to the visitor whether or
 * not anything downstream accepted it, so the business concludes demand fell.
 *
 * ── What changed ────────────────────────────────────────────────────────────
 *
 * The request is now a real CORS request, so a failure is observable. A
 * `URLSearchParams` body sends `application/x-www-form-urlencoded`, which is a
 * simple request and takes no preflight, and a correctly deployed Apps Script
 * web app answers it with `Access-Control-Allow-Origin: *`. A misconfigured one
 * redirects to a login page whose CORS headers do not admit this origin, and
 * the fetch rejects, which is the outcome we want: a detectable failure.
 *
 * The result is deliberately only two values, and neither of them is a guess.
 * A false negative here costs the visitor one extra click through their mail
 * client. A false positive costs the business the enquiry, silently, forever.
 */

export type LeadResult =
  /** The endpoint accepted it. The backend has recorded it and emailed both sides. */
  | 'sent'
  /** Nothing could be confirmed, so the message was handed to the mail client. */
  | 'fallback';

export interface LeadFields {
  name: string;
  email: string;
  phone?: string;
  /** The "what is this about" selection, sent to the sheet as `service`. */
  service?: string;
  message: string;
  /**
   * Qualifying fields. All optional, so none of them can cost a submission.
   *
   * The lead API scores on exactly these and reports UNSCORED when none are
   * present, which is what every enquiry was before this: enough to reply to,
   * not enough to prioritise, route or price. `website` is the highest-value
   * one, because a store URL tells you the platform, the scale and usually the
   * problem before you read the message.
   */
  website?: string;
  company?: string;
  /** Where the enquiry is from. Time-zone overlap, and which market replied. */
  country?: string;
  /**
   * Budget, free text.
   *
   * Declared here because the endpoint has always read `p.budget` and the
   * sheet has always had a column for it; the form just never sent one. The
   * five-field form does, and it is now the only qualifying field left, so it
   * is also the only thing standing between every enquiry and a band of
   * UNSCORED. See `scoreLead_` in google-apps-script/Code.gs.
   */
  budget?: string;
  /**
   * Collected by the nine-field forms that are gone. Kept declared, and no
   * longer sent by anything, so the sheet's existing columns and the rows
   * already in them stay readable. See the note in lib/site.ts.
   */
  role?: string;
  platform?: string;
  timeline?: string;
  /**
   * Which funnel produced this enquiry.
   *
   * It had a third value, 'recruiter', when the site carried a second form for
   * job approaches. That form is deleted and the site is explicitly not a
   * recruiter portal, so the value is gone with it and the rows already in the
   * sheet carrying it are simply history.
   *
   * Optional, so a call site that does not set it keeps compiling and reports
   * nothing.
   */
  funnel?: 'project' | 'general';
  /**
   * Which of the three instances of the form this was sent from.
   *
   * The same ProjectForm renders on /contact/, in the homepage enquiry
   * section and in the modal that every call to action on the site opens.
   * All three send `funnel: 'project'`, so in GA4 an enquiry from the
   * homepage and an enquiry from a service page's modal were the same
   * undifferentiated row, and the question the brief actually asks, which
   * page produces enquiries, could not be answered from the event.
   *
   * It is a parameter on the existing `generate_lead` rather than a second
   * event, because two events for one conversion is how a conversion count
   * doubles.
   *
   * Deliberately not sent to the lead endpoint: the sheet has a fixed set of
   * columns and this is a reporting dimension, not a field of the enquiry.
   */
  formLocation?: 'contact-page' | 'homepage' | 'modal';
  /** Honeypot. Filled means a bot; a person never sees the field. */
  hp?: string;
}

/** How long to wait before deciding the endpoint is not going to answer. */
const TIMEOUT_MS = 12_000;

/**
 * Opens the visitor's mail client with the enquiry already written.
 *
 * This is the path that makes a failed submission recoverable rather than lost,
 * so it carries every field the form collected in the body.
 */
export function openMailFallback(f: LeadFields): void {
  const subject = `Enquiry from ${f.name}${f.service ? `: ${f.service}` : ''}`;
  /* Only the lines the form actually collected. This listed eight fields with
     "not given" beside the six the form no longer asks for, which made the
     fallback email read as a half-filled questionnaire rather than as the
     enquiry the sender just wrote. Fields are included when present, so a
     future one appears here without this list being edited again. */
  const body = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    ...(f.company ? [`Company: ${f.company}`] : []),
    ...(f.website ? [`Website: ${f.website}`] : []),
    ...(f.country ? [`Country: ${f.country}`] : []),
    ...(f.phone ? [`Phone: ${f.phone}`] : []),
    ...(f.service ? [`Service: ${f.service}`] : []),
    ...(f.budget ? [`Budget: ${f.budget}`] : []),
    ...(f.timeline ? [`Timeline: ${f.timeline}`] : []),
    '',
    'Message:',
    f.message,
  ].join('\n');
  window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

/** The page the enquiry was sent from, which is the attribution that matters. */
function path(): string {
  return typeof location !== 'undefined' ? location.pathname : '';
}

export async function submitLead(f: LeadFields): Promise<LeadResult> {
  /* A bot filled the honeypot. Report success, send nothing, record nothing.
     Telling a bot it failed only teaches it to retry, and counting it would
     put bot traffic into the conversion number. */
  if (f.hp) return 'sent';

  if (!LEAD_ENDPOINT) {
    openMailFallback(f);
    track('form_error', {
      error_type: 'not_configured',
      funnel: f.funnel,
      service_selected: f.service,
      form_location: f.formLocation,
      page_path: path(),
    });
    return 'fallback';
  }

  const body = new URLSearchParams({
    name: f.name,
    email: f.email,
    phone: f.phone || '',
    service: f.service || '',
    message: f.message,
    /* Sent as empty strings when unanswered rather than omitted, so the field
       set on the wire matches the sheet's columns either way. */
    website: f.website || '',
    company: f.company || '',
    role: f.role || '',
    platform: f.platform || '',
    timeline: f.timeline || '',
    funnel: f.funnel || '',
    page: typeof location !== 'undefined' ? location.href : '',
    hp: '',
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      body,
      signal: controller.signal,
      /* Deliberately not 'no-cors'. See the note at the top of this file: an
         opaque response is indistinguishable from a success and that is what
         hid a dead endpoint. */
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(String(res.status));

    /* The script answers `{ ok: true }`, or `{ ok: false, error }` when it
       rejects the submission. Anything unparseable is treated as a failure
       rather than assumed to be fine. */
    const data = (await res.json()) as { ok?: boolean };
    if (data?.ok !== true) throw new Error('rejected');

    track('generate_lead', {
      funnel: f.funnel,
      service_selected: f.service,
      form_location: f.formLocation,
      page_path: path(),
    });
    return 'sent';
  } catch (err) {
    openMailFallback(f);
    /* The reason matters operationally: 'abort' is the endpoint not answering
       inside the timeout, 'rejected' is it answering with a refusal, and a
       bare TypeError is the CORS rejection a misconfigured Apps Script gives.
       All three are the same outcome for the visitor and different problems
       to fix. */
    track('form_error', {
      error_type: err instanceof Error ? err.message || err.name : 'unknown',
      funnel: f.funnel,
      service_selected: f.service,
      form_location: f.formLocation,
      page_path: path(),
    });
    return 'fallback';
  } finally {
    clearTimeout(timer);
  }
}
