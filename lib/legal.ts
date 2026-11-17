/**
 * The privacy policy, as data.
 *
 * ── Why this is authored rather than templated ─────────────────────────────
 *
 * A generated policy describes a generic website: cookies it does not set,
 * third parties it does not use, a database it does not have, and rights under
 * a regulation nobody checked applied. That is worse than no policy, because
 * it is a published statement about data handling that is not true.
 *
 * Every clause below describes something this site actually does, verified
 * against the code rather than assumed:
 *
 *   Analytics      app/layout.tsx loads a GTM container and gtag.js, in
 *                  production only (`isProd`), and lib/analytics.ts pushes
 *                  named events to `dataLayer`.
 *   Forms          lib/lead.ts POSTs to the Apps Script endpoint in
 *                  `LEAD_ENDPOINT`, which writes to a Google Sheet and sends
 *                  mail. See google-apps-script/Code.gs.
 *   Mail fallback  when that endpoint cannot be reached, the same file opens
 *                  the visitor's own mail client with the enquiry written out.
 *                  Nothing is transmitted by the site in that path.
 *   Fonts          next/font self-hosts all four faces at build time, so there
 *                  is no request to fonts.googleapis.com and no font-provider
 *                  cookie. This is a real difference from most sites and it is
 *                  worth stating.
 *   No database    next.config.mjs sets `output: 'export'`. The site is static
 *                  files; there is no server and no store under this domain.
 *
 * If any of those five change, this file changes in the same commit. A policy
 * that drifts from the implementation is the thing this comment exists to
 * prevent.
 *
 * Copy in this file avoids em-dashes on purpose.
 */

import { CONTACT, SITE_URL } from './site';

export interface PolicyClause {
  heading: string;
  /** Paragraphs. Rendered as prose, so each one stands alone. */
  body: readonly string[];
  /** An optional itemised list under the prose. */
  items?: readonly string[];
}

export const PRIVACY = {
  path: '/privacy-policy/',
  label: 'Privacy policy',
  eyebrow: 'How this site handles data',
  h1: ['Privacy policy.'],
  lede:
    'This is a personal site. It collects as little as it can, it has no database of its own, and this page says exactly what happens to the two things it does collect: what you send me on a form, and anonymous usage statistics.',

  title: 'Privacy Policy | Yuvraj Raulji',
  description:
    'What this site collects, what it does not, and how enquiry details and anonymous analytics are handled. No database, no advertising, no data selling.',

  primaryKeyword: 'yuvraj raulji privacy policy',
  secondaryKeywords: ['website privacy policy', 'data handling statement'],
  searchIntent: 'Informational. Someone checking what happens to their details before sending them.',
  audience: 'Any visitor, and anyone about to use one of the two enquiry forms.',
  purpose: 'State the actual data handling of this site accurately and in plain language.',
  entities: ['Yuvraj Raulji', 'Privacy Policy', 'Google Analytics', 'Data Protection'],

  /**
   * The date the statement was last true. Printed on the page, because a
   * policy with no date tells a reader nothing about whether it is current.
   */
  updated: '17 November 2026',

  clauses: [
    {
      heading: 'Who is responsible',
      body: [
        `This site is published and operated by Yuvraj Raulji, ${CONTACT.location}. There is no company, no team and no third-party agency behind it. Questions about anything on this page come to me directly at ${CONTACT.email}.`,
      ],
    },
    {
      heading: 'What you send me',
      body: [
        'The site has one enquiry form. It appears on the contact page, at the foot of the homepage and in the enquiry panel that opens from a call to action, and it is the same five fields in all three places. Three are required and two are optional.',
        'What you type is sent to a Google Workspace endpoint I control, which records it in a private spreadsheet and emails it to me. It is used to reply to you and to keep a record of the conversation. It is not added to a mailing list, it is not used for marketing, and it is never sold or shared with a third party.',
      ],
      items: [
        'Required: your name, your email address and a description of what you need.',
        'Optional: your company or website, and an indication of budget.',
        'Recorded automatically with a submission: the page you sent it from, which tells me what you were reading.',
        'There is also one hidden field that a person never sees and never fills in. A value in it means the submission came from a bot, and it is discarded rather than recorded.',
      ],
    },
    {
      heading: 'When the form cannot reach the server',
      body: [
        'If the endpoint does not answer, the site does not pretend the message was sent. It opens your own email application with the enquiry already written out, and you send it yourself. In that case nothing is transmitted by this site at all: the message goes from your mail provider to mine, and the site never holds a copy.',
      ],
    },
    {
      heading: 'Analytics',
      body: [
        'The site uses Google Analytics 4, loaded through Google Tag Manager, to count pages viewed and to record a small set of named actions: a resume download, an enquiry submitted, an email, phone or WhatsApp link opened. I use it to understand which pages are worth writing more of.',
        'I do not have access to your identity through it. There is no advertising, no remarketing, no cross-site tracking and no data broker involved. Analytics does not load at all in development, and it will not load if your browser or an extension blocks it, which no part of the site depends on.',
      ],
    },
    {
      heading: 'Cookies and local storage',
      body: [
        'The only cookies set are the ones Google Analytics and Tag Manager use to tell one visit from another. The site itself sets no cookies, keeps no session and stores nothing in your browser to identify you later.',
        'You can refuse all of it without losing anything. Every page is static HTML, so blocking scripts and cookies leaves the site fully readable and fully navigable.',
      ],
    },
    {
      heading: 'Fonts and third-party requests',
      body: [
        'All four typefaces are downloaded at build time and served from this domain, so loading a page makes no request to a font provider and no font-provider cookie is set. This is deliberate, and it is a difference from most sites.',
        'Pages carry no embedded social widgets, no comment system, no chat widget, no advertising network and no tracking pixels. Where a page links out, that link is visible and you choose whether to follow it.',
      ],
    },
    {
      heading: 'Where the site is hosted',
      body: [
        'The site is a set of static files served by Vercel, which as a host processes the ordinary request information any web server does, including your IP address, in order to deliver the page and to protect against abuse. There is no application server and no database under this domain, so there is nothing for the site itself to query or leak.',
      ],
    },
    {
      heading: 'How long things are kept',
      body: [
        'Enquiries are kept for as long as the conversation is live and for a reasonable period after it, so that I can pick up a thread months later when a project resumes. Analytics data is retained for the period set in the Google Analytics property, which is not longer than fourteen months.',
      ],
    },
    {
      heading: 'Your choices',
      body: [
        `You can ask me what I hold about you, ask for a correction, or ask me to delete it. Email ${CONTACT.email} and I will do it and confirm it in writing. There is no form to fill in and no process to go through, because the volume this site deals with does not need one.`,
      ],
    },
    {
      heading: 'Children',
      body: [
        'This is a professional site aimed at businesses and agencies looking for development work. It is not directed at children and I do not knowingly collect anything from them.',
      ],
    },
    {
      heading: 'Changes to this page',
      body: [
        `If the site starts doing something materially different with data, this page changes in the same release, and the date at the top changes with it. The current version is the one published at ${SITE_URL}/privacy-policy/.`,
      ],
    },
  /* Typed as the interface rather than `as const`: under `as const` each
     clause narrows to its own literal type, so the ones without `items`
     genuinely do not have the property and the union cannot be rendered in a
     single map. The interface is the shape the page needs. */
  ] as readonly PolicyClause[],
} as const;
