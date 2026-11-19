import type { Metadata } from 'next';
import { Page, PageHero } from '../../components/chrome/page';
import { ProjectForm } from '../../components/forms/project-form';
import { Rise } from '../../components/homepage/motion';
import { InlineLink, Marker, Section, Shell } from '../../components/homepage/primitives';
import { contactSchema, type Crumb } from '../../lib/schema';
import { CONTACT, OG_IMAGE, SITE_URL } from '../../lib/site';
import '../home.css';
import { ROLE_LINE } from '../../lib/identity';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact/' },
];

const title = `Contact | Hire a ${ROLE_LINE}`;
const description =
  'Have a project in mind? Describe what you need and get a written scope and a figure, usually within a few days. WhatsApp, email or the form below.';

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
  twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
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
 * ── Back to one form, and a shorter one ───────────────────────────────────
 *
 * This page briefly carried two: a project form and a recruiter form
 * collecting a job title, an employment type, a work arrangement and a job
 * description URL. The objective is now explicitly freelance client work and
 * explicitly not a recruiter portal, so the recruiter funnel is deleted.
 *
 * The remaining form went from nine fields to five, three of them required.
 * "Do not overload the website with forms" is the instruction, and a
 * nine-field form on the page whose whole job is making contact easy was the
 * overload. Platform, timeline and project type are all answerable in the
 * reply, and asking there costs nothing while asking on the form costs
 * submissions.
 *
 * ── The channels come first ───────────────────────────────────────────────
 *
 * WhatsApp, email and phone sit above the form, not below it. The conversion
 * objective is a conversation, and for a good share of this audience the
 * fastest route to one is a message rather than a form. A form is what you
 * offer the reader who wants to write a paragraph in their own time.
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

/* Phrased as the question the reader still has, not as a page name. */
const NEXT_STEPS = [
  { href: '/services/', label: 'Which service the problem belongs to' },
  { href: '/pricing/', label: 'How an engagement is structured and priced' },
  { href: '/remote-collaboration/', label: 'How remote collaboration actually runs' },
  { href: '/work/', label: 'Whether I have built something like it' },
] as const;

export default function ContactPage() {
  return (
    <Page schema={contactSchema(crumbs)} active="Contact">
      {/*
        The headline and the supporting line are the brief's own words, in
        section 12, rather than a rewrite of them.

        The page previously opened "Describe the problem, not the project.",
        which is a better sentence and the wrong one here. It is an
        instruction, and an instruction is what you give a reader who has
        already decided to write. This page has to convert the reader who has
        not, and for that the heading has to name what they came for.

        The paragraph underneath keeps the specifics the old lede carried,
        because "custom development" and "technical improvements" are
        categories and a reader recognises their own situation faster than a
        category.
      */}
      <PageHero
        eyebrow="Contact"
        lines={['Have a project in mind?', "Let's build it together."]}
        lede="Whether you need a new eCommerce platform, custom development, technical improvements or ongoing remote development support, I'd be happy to discuss your requirements. A replatforming you have been putting off, a checkout that loses people you already paid for, a catalogue that has outgrown its architecture, or an AI idea that needs someone to tell you which half of it is real: a few lines is enough to start."
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
                  <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/55">
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
                  <p className="m-0 mt-4 max-w-[46ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/55">
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
          One form, five fields. The channels above are the faster route for
          most of this audience; this is for the reader who wants to write a
          paragraph in their own time. */}
      <Section id="project" labelledBy="project-title" className="yr-paper">
        <Shell>
          <Marker label="Project enquiry" />
          <div className="mb-grid">
            <h2 id="project-title" className="yr-display yr-display--2 m-0 max-w-[20ch]">
              <span className="yr-display__soft block">Tell me what is</span>
              <span className="yr-display__strong block">in front of you.</span>
            </h2>
          </div>

          <Rise className="grid gap-px border border-line bg-line lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="flex min-w-0 flex-col gap-item bg-[var(--bg)] p-card">
              <p className="m-0 max-w-[42ch] font-manrope text-[19px] font-light leading-[1.7] text-ground/65">
                The platform, what is in the way, and anything you have already tried. Three fields
                are required and that is enough for a useful first reply.
              </p>
              <p className="m-0 max-w-[42ch] font-manrope text-[16px] font-light leading-[1.7] text-ground/55">
                Nothing here is sold on. Messages go to one inbox, they are read by me, and an
                enquiry that turns out to be a bad fit gets told so rather than quoted for.
              </p>
              <p className="m-0 max-w-[42ch] font-manrope text-[15px] font-light leading-[1.7] text-ground/45">
                No price is quoted from a form. The pricing page explains the engagement models
                and why there is no rate card.
              </p>
            </div>
            <div className="min-w-0 bg-[var(--bg)] p-card">
              <ProjectForm tone="paper" id="project-form" source="contact-page" />
            </div>
          </Rise>

          {/*
            Three ways out, for the reader who is not ready to write yet.

            This page had no links in its body at all: it took the header and
            footer like every page and gave nothing back, so a visitor who
            arrived, read the channels and decided they wanted to know more
            first had the browser back button and nothing else. It was also
            the only page on the site with no contextual links in either
            direction, which is a poor signal for the one page the whole site
            is pointing at.

            Named by what the reader is deciding, not by page title, because
            somebody who has not written yet is usually missing one of these
            three things.
          */}
          <Rise
            delay={0.15}
            className="mt-12 border-t border-line pt-8 sm:mt-16"
          >
            <p className="m-0 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/55">
              Not ready to write yet
            </p>
            <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0 sm:flex-row sm:flex-wrap sm:gap-x-10">
              {NEXT_STEPS.map((n) => (
                <li key={n.href} className="m-0">
                  <InlineLink href={n.href}>{n.label}</InlineLink>
                </li>
              ))}
            </ul>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
