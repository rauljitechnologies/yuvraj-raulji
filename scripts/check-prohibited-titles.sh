#!/usr/bin/env bash
#
# The naming rule, as a build gate.
#
# Section 3 of BRAND-DESIGN-GUIDELINE.md rules the word "Founder" off this site
# and the brand brief extends the rule to Co-Founder, CTO, Chief Technology
# Officer, Business Owner and Company Founder, in visible copy, in metadata, in
# schema, in alt text and in hidden content alike.
#
# It is checked against the EXPORTED HTML rather than against the source,
# because the failure mode is a string reaching rendered output through a
# template, a schema field, an <option> or an alt attribute, and a source grep
# misses all four. It is also why this runs after `next build`, not before.
#
# ── Why the match is whole-word ────────────────────────────────────────────
#
# A naive `grep -i cto` reports every one of the 68 pages, because "sector",
# "director", "selector" and "factory" all contain the letters. The first
# version of this check did exactly that and the result was unreadable, so the
# rule looked unenforceable when it was in fact already being kept. `-w` binds
# the match to word boundaries, which is what the rule actually means.
#
# The forbidden strings are also declared in `PROHIBITED_TITLES` in
# lib/identity.ts, for the TypeScript side to read. Keep the two in sync.
set -uo pipefail

DIR="${1:-out}"
if [ ! -d "$DIR" ]; then
  echo "check-prohibited-titles: no '$DIR' directory. Run 'npx next build' first." >&2
  exit 2
fi

TITLES=(
  'Founder'
  'Co-Founder'
  'Cofounder'
  'CTO'
  'Chief Technology Officer'
  'Business Owner'
  'Company Founder'
)

# Historical company names kept off this site by section 4. Checked here too:
# they arrive by the same routes and the same way, and a second script would
# only get run half as often.
BRANDS=(
  'Raulji Technologies'
  'Raulji Group'
  'Ariya InfoTech'
  'Nxtby'
)

fail=0
check() {
  local needle="$1" kind="$2" hits
  hits=$(find "$DIR" -name '*.html' -exec grep -liw -- "$needle" {} + 2>/dev/null || true)
  if [ -n "$hits" ]; then
    local n
    n=$(printf '%s\n' "$hits" | wc -l | tr -d ' ')
    echo "FAIL  $kind \"$needle\" appears in $n file(s):" >&2
    printf '%s\n' "$hits" | sed 's/^/        /' | head -10 >&2
    fail=1
  fi
}

for t in "${TITLES[@]}"; do check "$t" 'prohibited title'; done
for b in "${BRANDS[@]}"; do check "$b" 'removed brand name'; done

# Section 2 bans the em dash and the multiplication sign in site copy.
for sym in '—' '×'; do
  hits=$(find "$DIR" -name '*.html' -exec grep -l -- "$sym" {} + 2>/dev/null || true)
  if [ -n "$hits" ]; then
    echo "FAIL  prohibited symbol \"$sym\" appears in $(printf '%s\n' "$hits" | wc -l | tr -d ' ') file(s)" >&2
    fail=1
  fi
done

if [ "$fail" -eq 0 ]; then
  echo "check-prohibited-titles: clean across $(find "$DIR" -name '*.html' | wc -l | tr -d ' ') pages."
fi
exit "$fail"
