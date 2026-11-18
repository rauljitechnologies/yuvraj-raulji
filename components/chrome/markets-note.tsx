import { InlineLink } from '../homepage/primitives';
import { LOCATION, MARKETS, TIMEZONE } from '../../lib/identity';

/**
 * One line of geography, under the final call to action.
 *
 * The 26 service pages and the 11 technology hubs are where search lands a
 * buyer from the USA, the UK, the UAE or Europe, and none of them said where
 * I am. The homepage answers that objection seventh, deliberately, because
 * "can someone in Vadodara actually work with us" is what decides whether
 * the services above it are worth reading; a buyer who arrives on a service
 * page from a search engine never sees that section.
 *
 * It is one sentence rather than a section because the honest answer is
 * short, and every part of it is read from the identity record rather than
 * retyped, so no page can claim a market or an overlap the rest of the site
 * does not.
 */
export function MarketsNote() {
  return (
    <p className="m-0 mt-8 max-w-[62ch] font-manrope text-[14px] font-light leading-[1.7] text-ink/45">
      I work remotely from {LOCATION} on {TIMEZONE}, with clients in {MARKETS.join(', ')}.{' '}
      <InlineLink href="/remote-collaboration/">How remote collaboration works</InlineLink>.
    </p>
  );
}
