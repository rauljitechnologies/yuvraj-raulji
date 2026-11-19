# Redirect test report

**Scope:** Phase 2 of the GA4 and Search Console audit dated 19 November 2026.
Branch `seo/ga4-audit-remediation`.

Search Console reported four Not-found (404) URLs and that **12% of all crawl
requests in the last 90 days hit a 404**. One of the four,
`/unlocking-the-potential-how-b2b-ecommerce-is-reshaping-global-trade/`, was
still taking landing-page sessions in GA4 while returning 404.

---

## 1. Rules added

Twelve rules, which is the four 404s plus their trailing-slash spellings plus
two extras explained below. `trailingSlash: true` in `next.config.mjs` means
`/x` and `/x/` are two different requests, so each redirect is declared twice.
That is the existing convention in `vercel.json`, not a new one.

| Source | Destination | Type |
| --- | --- | --- |
| `/unlocking-the-potential-how-b2b-ecommerce-is-reshaping-global-trade` | `/insights/` | 301 |
| `/unlocking-the-potential-how-b2b-ecommerce-is-reshaping-global-trade/` | `/insights/` | 301 |
| `/how-to-clean-up-magento2-database-programatically` | `/magento/performance/` | 301 |
| `/how-to-clean-up-magento2-database-programatically/` | `/magento/performance/` | 301 |
| `/how-to-clean-up-magento2-database-programmatically` | `/magento/performance/` | 301 |
| `/how-to-clean-up-magento2-database-programmatically/` | `/magento/performance/` | 301 |
| `/home` | `/` | 301 |
| `/home/` | `/` | 301 |
| `/custom` | `/` | 301 |
| `/custom/` | `/` | 301 |
| `/insights/magento2-pwa-studio-headless/src/components/CustomPage` | `/insights/magento2-pwa-studio-headless/` | 301 |
| `/insights/magento2-pwa-studio-headless/src/components/CustomPage/` | `/insights/magento2-pwa-studio-headless/` | 301 |

### Why the two extras

**The double-m spelling.** The audit and the brief spell the database URL
`programatically`; Search Console's own listing shows the same. A redirect for
a URL nobody requests costs nothing, and a missing one costs the crawl, so both
spellings are handled.

**`/insights/magento2-pwa-studio-headless/src/components/CustomPage`.** Listed
by Search Console as a 404 and caused by the same code sample as `/custom`.
Sending it to the article it was extracted from is more useful than sending it
to the homepage.

### Destination choices

| 404 | Destination | Reason |
| --- | --- | --- |
| B2B global-trade post | `/insights/` | The post does not exist on this site. The hub is the closest live equivalent and keeps the session |
| Magento database cleanup post | `/magento/performance/` | Database cleanup is performance work, and that page is where it is sold |
| `/home` | `/` | The page it was asking for |
| `/custom` | `/` | Not a page that ever existed here. See section 2 |

---

## 2. The "broken link" in the PWA Studio article

**It is not a link.** The article renders the sample inside `<pre><code>`, and
no anchor in the built HTML points at it:

```
$ grep -o 'href="[^"]*[Cc]ustom[^"]*"' out/insights/magento2-pwa-studio-headless/index.html
(no matches)
```

What Googlebot found is the text of a correct JavaScript sample:

```js
routes.push({
  name: 'Custom Page',
  pattern: '/custom',
  path: require.resolve('./src/components/CustomPage')
});
```

It resolved `'/custom'` and `'./src/components/CustomPage'` as URLs relative to
the article and crawled both. The code is right and stays as it is. Making the
sample wrong to stop a crawler misreading it would be the wrong trade, so the
crawl is answered with the two redirects above instead.

`npm run build` runs `check-links.mjs`, which resolves every `href` and `src`
in all 90 exported pages against the exported routes. It passes, which is the
standing evidence that no article contains a broken relative link.

---

## 3. Verification

### Automated, and now permanent

`scripts/check-redirects.mjs` was added and runs in `npm run build`. It checks
all 54 rules, not just the new ones:

1. No two rules declare the same source.
2. No source is also an exported page. A redirect beats the filesystem on
   Vercel, so this is how a live page would silently disappear.
3. Every destination resolves to an exported page, or is a pattern whose
   literal prefix matches exported pages.
4. No destination is itself a source. **This is the loop and chain check.**
5. Both spellings of each source exist.

Result on this branch:

```
check-redirects: 54 rules, destinations resolve, no chains, no shadowed pages.
```

### Local HTTP check of the destinations

`vercel.json` is applied by Vercel, not by a local static server, so the
redirects themselves cannot be exercised locally. What can be, and was, is that
every destination is a real page that returns 200:

```
200  /
200  /insights/
200  /magento/performance/
200  /insights/magento2-pwa-studio-headless/
404  /custom          <- pre-fix behaviour, with no vercel.json applied
```

### Production check, done

Verified on 20 November 2026, against the deploy of merge commit `252d640`.
Every rule resolves to a live page and no chain loops:

| Requested | Hops | Final |
| --- | --- | --- |
| `/custom` | 2 | 200 `/` |
| `/custom/` | 1 | 200 `/` |
| `/home` | 2 | 200 `/` |
| `/home/` | 1 | 200 `/` |
| `/unlocking-the-potential-how-b2b-ecommerce-is-reshaping-global-trade/` | 1 | 200 `/insights/` |
| `/how-to-clean-up-magento2-database-programatically/` | 1 | 200 `/magento/performance/` |
| `/how-to-clean-up-magento2-database-programmatically/` | 1 | 200 `/magento/performance/` |
| `/insights/magento2-pwa-studio-headless/src/components/CustomPage` | 2 | 200 `/insights/magento2-pwa-studio-headless/` |

Control: `/definitely-not-a-page-xyz/` still returns 404, so the rules are
matching what they were written for and nothing else.

**Two things worth knowing about the responses.**

Vercel answers `permanent: true` with **308**, not 301. Both are permanent
and Google treats them the same way for consolidation; the difference is that
308 preserves the request method. Nothing to change, but the status code in a
Search Console report will read 308.

The spellings without a trailing slash take **two hops**: Vercel normalises
`/custom` to `/custom/` first, and the rule fires on the second request. The
forms Search Console actually lists are the slashed ones, which are one hop.
This is also why both spellings are declared: without the slashed rule, the
normalisation would land on a 404.

### The commands, for re-running this after any routing change

```bash
for u in \
  /unlocking-the-potential-how-b2b-ecommerce-is-reshaping-global-trade/ \
  /how-to-clean-up-magento2-database-programatically/ \
  /home/ /custom \
  /insights/magento2-pwa-studio-headless/src/components/CustomPage ; do
  printf '%s -> ' "$u"
  curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' "https://www.yuvrajraulji.com$u"
done
```

Expected: `301` for every line, with no second hop. Follow with `curl -sIL` on
one of them to confirm the final status is 200.

Then, in Search Console, use Validate Fix on the Not-found (404) group. That is
a manual step and is listed in `MANUAL_GOOGLE_ACTIONS.md`.
