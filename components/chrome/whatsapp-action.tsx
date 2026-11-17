import { CONTACT } from '../../lib/site';

/**
 * The WhatsApp action in the header bar, on every page and at every width.
 *
 * ── Why it is in the header ────────────────────────────────────────────────
 *
 * Section 14 of the brief asks for WhatsApp and contact actions to be easy to
 * find on desktop and on mobile. Before this they were easy to find in exactly
 * three places: the homepage hero, the homepage close and /contact/. Every
 * other route, which is eighty-odd of them, offered a reader on a phone the
 * header's one call to action, and that leads to a form.
 *
 * For a good share of this audience a message is the fastest route to a
 * conversation and a form is the slowest, so the two sit side by side in the
 * bar rather than one of them being a page away.
 *
 * ── Why not a floating button ──────────────────────────────────────────────
 *
 * The usual answer is a fixed circle in the bottom-right corner. It converts,
 * and it covers content on a phone for the entire length of every page, which
 * on a site whose pages are long reads is a poor trade. The header is already
 * sticky, so it is on screen for the same reason without the cost.
 *
 * ── Why the glyph is not green ────────────────────────────────────────────
 *
 * Section 32 of BRAND-DESIGN-GUIDELINE.md allows black, white and red. The
 * WhatsApp mark is recognised by its shape, and a third-party brand green in
 * the header would be the most conspicuous way to break that rule on every
 * page of the site.
 */
export function WhatsAppAction({ className = '' }: { className?: string }) {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center border border-ink/20 text-ink/70 transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent-bright motion-reduce:hover:translate-y-0 lg:h-[46px] lg:w-[46px] ${className}`}
    >
      {/* Decorative: the accessible name is the text below it. */}
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span className="sr-only">Message me on WhatsApp (opens in a new tab)</span>
    </a>
  );
}
