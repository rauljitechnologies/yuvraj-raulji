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

/** Markets that read as "the USA" rather than as "Europe". */
const TAKES_ARTICLE = new Set(['USA', 'UK', 'UAE']);

/**
 * The markets, as a sentence rather than as a row of a table.
 *
 * Two things the raw `MARKETS.join(', ')` got wrong once the record was
 * reordered to lead with the international markets.
 *
 * India is dropped, because the first half of this sentence already says the
 * work happens from India. "I work remotely from Vadodara, Gujarat, India
 * ... with clients in USA, UK, UAE, Europe, India" names the country twice
 * in one line and reads as a mistake. It is filtered against `LOCATION`
 * rather than hard-coded, so if the base ever moves the sentence follows.
 *
 * And three of the five want an article in prose. A table cell can say
 * "USA, UK"; a sentence has to say "the USA, the UK".
 */
function marketSentence(): string {
  const elsewhere = MARKETS.filter((m) => !LOCATION.includes(m)).map((m) =>
    TAKES_ARTICLE.has(m) ? `the ${m}` : m,
  );
  if (elsewhere.length < 2) return elsewhere.join('');
  return `${elsewhere.slice(0, -1).join(', ')} and ${elsewhere[elsewhere.length - 1]}`;
}

export function MarketsNote() {
  return (
    <p className="m-0 mt-8 max-w-[62ch] font-manrope text-[14px] font-light leading-[1.7] text-ink/45">
      I work remotely from {LOCATION} on {TIMEZONE}, with clients in {marketSentence()}.{' '}
      <InlineLink href="/remote-collaboration/">How remote collaboration works</InlineLink>.
    </p>
  );
}
