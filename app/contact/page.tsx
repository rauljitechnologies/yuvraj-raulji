import type { Metadata } from 'next';
import { Page, PageHero } from '../../components/chrome/page';
import { ContactForm } from '../../components/homepage-sections/contact-form';
import { Rise } from '../../components/homepage/motion';
import { Marker, Section, Shell } from '../../components/homepage/primitives';
import { contactSchema, type Crumb } from '../../lib/schema';
import { CONTACT, OG_IMAGE, OG_IMAGE_URL, SITE_URL } from '../../lib/site';
import '../home.css';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact/' },
];

const title = 'Contact Yuvraj Raulji | AI, Business and eCommerce';
const description =
  'Start a conversation about a commerce platform decision, a replatforming, headless architecture or an AI project. Replies within 24 hours on IST business days.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/contact/` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/contact/`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE_URL] },
};

/**
 * Contact.
 *
 * The route existed as an empty directory and a `contactSchema()` builder
 * nobody called: the site had a form on the homepage, a modal on the interior
 * pages and no page of its own to send anyone to, so the header's one action
 * pointed at `/#contact` and took a reader on /experience/ back to the
 * homepage to write a message. It has a destination now, and the header points
 * at it.
 *
 * ── What is on it, and what deliberately is not ────────────────────────────
 *
 * The channels, then the form. Nothing else: no availability pitch, no list of
 * services, no second call to action. The footer band under this page already
 * asks the question and says what the thirty minutes is, and repeating that
 * here would make the contact page the one page on the site that says the same
 * thing twice.
 *
 * The form is the homepage's component, unchanged. One form, one Apps Script
 * endpoint, one place a message can land. It is drawn for a white ground, which
 * is why the panel sits on the paper band: forking it to work on black would
 * have been a second form to keep in step with the first.
 */

/* The channels, as a list so the markup below is a loop and not four copies.
   `note` is what the reader needs to know before choosing one, which is the
   part a bare list of addresses leaves them to guess at. */
const CHANNELS = [
  {
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    note: 'The best one for anything with detail in it. Replies within 24 hours on IST business days.',
  },
  {
    label: 'WhatsApp',
    value: 'Message directly',
    href: CONTACT.whatsapp,
    note: 'For a quick question, or to find a slot without three emails about calendars.',
  },
  {
    label: 'Phone',
    value: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phoneE164}`,
    note: 'IST business hours. If it rings out, the email above reaches me faster.',
  },
  {
    label: 'LinkedIn',
    value: 'in/yuvraj-raulji',
    href: CONTACT.linkedin,
    note: 'Where the professional record lives, and where most first messages arrive.',
  },
] as const;

export default function ContactPage() {
  return (
    <Page schema={contactSchema(crumbs)} active="Contact">
      <PageHero
        eyebrow="Contact"
        lines={['Describe the problem,', 'not the project.']}
        lede="A replatforming you have been putting off, a checkout that loses people you already paid for, a catalogue that has outgrown its architecture, or an AI idea that needs someone to tell you which half of it is real. A few lines is enough to start."
        crumbs={crumbs}
      />

      {/* ── The channels ─────────────────────────────────────────── */}
      <Section id="channels" labelledBy="channels-title">
        <Shell>
          <Marker label="Direct" />
          <div className="mb-10 sm:mb-14">
            <h2
              id="channels-title"
              className="yr-display yr-display--2 m-0 max-w-[22ch]"
            >
              <span className="yr-display__soft block">Four ways through.</span>
              <span className="yr-display__strong block">All of them reach me.</span>
            </h2>
          </div>

          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2">
            {CHANNELS.map((c, i) => (
              <li key={c.label} className="bg-[var(--bg)]">
                <Rise delay={Math.min(i, 3) * 0.06} className="group flex h-full flex-col p-6 sm:p-8 lg:p-10">
                  <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/35">
                    {c.label}
                  </span>
                  <p className="m-0 mt-5 font-manrope text-[clamp(20px,2vw,28px)] font-semibold leading-[1.15] tracking-[-0.025em]">
                    <a
                      href={c.href}
                      {...(c.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="break-words transition-colors duration-200 group-hover:text-accent-bright"
                    >
                      {c.value}
                    </a>
                  </p>
                  <p className="m-0 mt-4 max-w-[46ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/50">
                    {c.note}
                  </p>
                </Rise>
              </li>
            ))}
          </ul>

          <Rise delay={0.3} className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-8">
            <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent animate-yr-blink" />
            <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.18em] text-ink/60">
              {CONTACT.location} · IST · GMT+5:30
            </span>
          </Rise>
        </Shell>
      </Section>

      {/* ── The form, on the paper band ───────────────────────────
          The same two-cell hairline panel the homepage closes with: the
          instruction on the narrow side, the fields on the wide one. `min-w-0`
          on both cells because a grid item defaults to `min-width: auto` and
          would otherwise refuse to shrink below the widest control inside it,
          which is what used to push this panel off the right edge of a phone. */}
      <Section id="form" labelledBy="form-title" className="yr-paper">
        <Shell>
          <Marker label="Send a message" />
          <div className="mb-10 sm:mb-14">
            <h2 id="form-title" className="yr-display yr-display--2 m-0 max-w-[20ch]">
              <span className="yr-display__soft block">Tell me what is</span>
              <span className="yr-display__strong block">in front of you.</span>
            </h2>
          </div>

          <Rise className="grid gap-px border border-line bg-line lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="flex min-w-0 flex-col gap-8 bg-[var(--bg)] p-6 sm:gap-10 sm:p-8 lg:p-12">
              <p className="m-0 max-w-[42ch] font-manrope text-[19px] font-light leading-[1.7] text-ink/60">
                The constraint, the system it sits in, and what you have already tried. That is
                enough for a useful first reply; the rest is what the conversation is for.
              </p>
              <p className="m-0 max-w-[42ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/45">
                Nothing here is sold on. Messages go to one inbox, they are read by me, and an
                enquiry that turns out to be a bad fit gets told so rather than quoted for.
              </p>
            </div>
            <div className="min-w-0 bg-[var(--bg)] p-6 sm:p-8 lg:p-12">
              <ContactForm />
            </div>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
