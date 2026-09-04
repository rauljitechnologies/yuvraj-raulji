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
  const body = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Phone: ${f.phone || 'not given'}`,
    `About: ${f.service || 'not specified'}`,
    '',
    'Message:',
    f.message,
  ].join('\n');
  window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export async function submitLead(f: LeadFields): Promise<LeadResult> {
  /* A bot filled the honeypot. Report success, send nothing, record nothing.
     Telling a bot it failed only teaches it to retry. */
  if (f.hp) return 'sent';

  if (!LEAD_ENDPOINT) {
    openMailFallback(f);
    return 'fallback';
  }

  const body = new URLSearchParams({
    name: f.name,
    email: f.email,
    phone: f.phone || '',
    service: f.service || '',
    message: f.message,
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

    return 'sent';
  } catch {
    openMailFallback(f);
    return 'fallback';
  } finally {
    clearTimeout(timer);
  }
}
