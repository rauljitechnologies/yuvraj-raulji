# GA4 implementation report

**Scope:** the code side of Phase 1 of the GA4 and Search Console audit dated
19 November 2026. Branch `seo/ga4-audit-remediation`.

**Nothing in this report was done in the GA4 interface.** No property setting,
key event, custom dimension, retention setting or stream name was changed. The
items that need the interface are in `MANUAL_GOOGLE_ACTIONS.md` and are listed
there as outstanding, not as complete.

---

## 1. What was verified, and how

| Check | Finding | Where |
| --- | --- | --- |
| Measurement ID | `G-5JHWRDWD9K`, unchanged | `lib/site.ts:124` |
| Tag loads on every route | One `gtag('config')` in the root layout, so every page and every client navigation is covered | `app/layout.tsx:251` |
| `page_view` | Sent once on load by `config`, and once per client navigation by GA4 enhanced measurement. No manual `page_view` call exists anywhere in the codebase, which is the usual source of doubles | `app/layout.tsx`, verified by `grep` across `app/`, `components/`, `lib/` |
| `generate_lead` | Preserved exactly. Still fires only after the lead endpoint confirms the submission | `lib/lead.ts:186` |
| Duplicate conversions | One `submitLead` call site in the codebase, one `generate_lead` call inside it, fired after a confirmed response. A failed submission fires `form_error`, which is a different event and not a conversion | `lib/lead.ts`, `components/forms/project-form.tsx:112` |
| Event transport | `gtag()` when present, `dataLayer` only as a fallback. This is the fix from commit `a731aa6` and it is intact | `lib/analytics.ts:83` |

---

## 2. Event inventory

Everything the site sends, with the parameters it carries.

| Event | Fired by | Parameters | Conversion? |
| --- | --- | --- | --- |
| `generate_lead` | `lib/lead.ts`, after the endpoint confirms | `funnel`, `service_selected`, `form_location`, `page_path` | **Yes.** The one enquiry event |
| `form_error` | `lib/lead.ts`, when the endpoint fails or refuses | `error_type`, `funnel`, `service_selected`, `form_location`, `page_path` | No. Alert on it instead |
| `form_invalid` | `components/forms/project-form.tsx`, client-side validation blocked a submit | `form`, `field`, `form_location` | No |
| `whatsapp_click` | Delegated click tracker, `wa.me` links | `cta_text`, `page_path` | Optional. It is a real contact on this site |
| `email_click` | `mailto:` links | `cta_text`, `page_path` | Optional |
| `phone_click` | `tel:` links | `cta_text`, `page_path` | Optional |
| `contact_cta_click` | links to `/contact/` or `#contact` | `cta_text`, `destination`, `page_path` | **No.** Top of funnel, not an outcome |
| `linkedin_click` | outbound LinkedIn links | `cta_text`, `destination`, `page_path` | No |
| `resume_download` | any link to the CV file | `cta_text`, `destination`, `page_path` | No |
| `project_view` | a click through to a case study | `cta_text`, `destination`, `page_path` | No |
| `consultation_cta_click` | booking calls to action | `cta_text`, `destination`, `page_path` | **No, deliberately.** There is no booking destination yet, so a click means someone wanted to book and could not. See the note in `app/layout.tsx` |
| `cta_click` | fallback, any `.yr-btn` not matched above | `cta_text`, `destination`, `page_path` | No |

The audit's recommendation not to mark every click as a conversion is the
reason only one event above is marked **Yes** and three are marked optional.

---

## 3. The four parameters the brief asked me to review

### `funnel`
Declared as `'project' | 'general'` in `lib/lead.ts`. Only `'project'` is ever
sent: there is exactly one form on the site and it always sets that value.
`'general'` is a leftover of a second funnel that no longer exists. It is kept
in the type because rows in the sheet still carry it.

**Consequence for reporting:** segmenting `generate_lead` by `funnel` tells you
nothing today, because every row has the same value. The distinction the audit
wanted, project enquiries versus contact-form submissions, is not a difference
this site has: the contact page and the modal render the same form.

### `service_selected`
The service the enquirer picked, from the form's own list. Sent on
`generate_lead` and `form_error`. Empty values are stripped by `track()` before
the event leaves, so an unanswered field never arrives as the string
`"undefined"`.

### `cta_text`
The clicked element's visible text, trimmed to 80 characters. Sent on every
click event. This is what makes "which wording gets clicked" answerable.

### `destination`
The clicked `href`. Sent on `contact_cta_click`, `linkedin_click`,
`resume_download`, `project_view`, `consultation_cta_click` and `cta_click`.

**Deliberately not sent** on `email_click`, `phone_click` and `whatsapp_click`.
Those hrefs are a `mailto:`, a `tel:` and a `wa.me` link, so the parameter
would carry a contact address into analytics while adding nothing: the event
name already says which channel it was, and there is one address per channel.

### `form_location` (added)
The one code change in Phase 1.

The same `ProjectForm` renders in three places: `/contact/`, the homepage
enquiry section, and the modal that every call to action on the site opens. All
three sent identical events, so "which page produces enquiries" could not be
answered. Each instance now declares where it is, and the value rides on the
existing `generate_lead` as a parameter.

It is a parameter rather than a second event on purpose. Two events for one
conversion is how a conversion count doubles, which the brief rules out.

| Instance | `form_location` |
| --- | --- |
| `/contact/` page form | `contact-page` |
| Homepage enquiry section | `homepage` |
| Site-wide modal | `modal` |

The value is not sent to the lead endpoint. The sheet has fixed columns and
this is a reporting dimension, not a field of the enquiry.

---

## 4. How to mark `generate_lead` as a key event

This needs the GA4 interface and has **not** been done. Steps are in
`MANUAL_GOOGLE_ACTIONS.md`, section 1.

Summary: Admin, then Events, then Key events. `generate_lead` appears in the
list only after the property has received at least one of them, which it has
(the audit found one in the last 28 days). Toggle it on. A key event marked
today counts forward from today; it does not backfill.

---

## 5. Known risk, unchanged

GTM container `GTM-TNKVWXJ5` loads alongside gtag.js. The container holds no
GA4 tag today, which is why nothing double-counts. **If a GA4 tag is ever added
to that container, the standalone gtag.js in `app/layout.tsx` has to be removed
in the same release or every page view counts twice.**

The audit recommends settling this by choosing one path. That is a decision
about your tag setup rather than a code fix, so nothing here changed it.
