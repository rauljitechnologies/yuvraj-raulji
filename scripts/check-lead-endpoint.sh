#!/usr/bin/env bash
#
# Is the lead endpoint alive?
#
# ── Why this exists ──────────────────────────────────────────────────────────
#
# The Apps Script lead endpoint was found dead on 4 Sep 2026 and was still dead
# on 6 Sep. Nothing was watching it, so every enquiry submitted from the website
# in that window was lost, and the only visible symptom was that demand looked
# weak. A form that reports failure to nobody is the same as a form that reports
# success falsely: the business draws a conclusion from an instrumentation gap.
#
# This script is the thing that was missing. Run it after any deployment change,
# and on a schedule.
#
# ── Usage ────────────────────────────────────────────────────────────────────
#
#   ./scripts/check-lead-endpoint.sh              # read the URL from lib/site.ts
#   ./scripts/check-lead-endpoint.sh <exec-url>   # test a candidate URL first
#
# Exit 0 = healthy, exit 1 = broken. Safe to put in cron or CI.
#
# The POST carries hp=probe, which hits the honeypot branch in Code.gs: it
# returns {"ok":true} and returns BEFORE writing a row or sending any mail. So
# this creates no lead, no sheet row and no email, and can run as often as you
# like.

set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ $# -ge 1 ]; then
  URL="$1"
  SOURCE="argument"
else
  # Single source of truth: whatever the site actually posts to.
  URL="$(grep -o "https://script\.google\.com/macros/s/[^']*" "$ROOT/lib/site.ts" | head -1)"
  SOURCE="lib/site.ts"
fi

if [ -z "${URL:-}" ]; then
  echo "FAIL: no endpoint URL found in lib/site.ts"
  exit 1
fi

echo "Endpoint (from $SOURCE):"
echo "  $URL"
echo

GET_CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$URL")
POST_BODY=$(curl -s --max-time 20 -X POST \
  -d 'hp=probe&name=probe&email=probe@example.com&message=probe' "$URL")
POST_CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 -X POST \
  -d 'hp=probe&name=probe&email=probe@example.com&message=probe' "$URL")

echo "  GET   $GET_CODE"
echo "  POST  $POST_CODE"
echo "  body  ${POST_BODY:0:120}"
echo

# The POST is the check that matters. A browser form does a cross-origin POST,
# so that is the request that has to succeed; a 200 on GET alone does not prove
# the form works.
case "$POST_CODE" in
  200)
    if printf '%s' "$POST_BODY" | grep -q '"ok"[[:space:]]*:[[:space:]]*true'; then
      echo "HEALTHY: the endpoint accepts anonymous posts."
      exit 0
    fi
    echo "BROKEN: 200, but the body is not {\"ok\":true}."
    echo "  The URL is answering but it is not this script. Check the deployment"
    echo "  points at the right project and has been redeployed as a New version."
    exit 1
    ;;
  401|403)
    echo "BROKEN: the endpoint rejects anonymous callers."
    echo
    echo "  Deploy > Manage deployments > pencil on the active deployment."
    echo "  Set 'Who has access' to Anyone."
    echo "  NOT 'Anyone with a Google Account', which looks identical at a glance"
    echo "  and produces exactly this $POST_CODE."
    exit 1
    ;;
  302|301)
    echo "BROKEN: redirecting to a sign-in page."
    echo
    echo "  Either access is restricted, or the active deployment is a Library"
    echo "  rather than a Web app. A Library has no doPost and can never accept"
    echo "  a form submission. Check the Type column in Manage deployments; if"
    echo "  it is not 'Web app', deploy a new one via the gear icon under"
    echo "  Select type, which issues a new /exec URL that must then be written"
    echo "  into LEAD_ENDPOINT in lib/site.ts."
    exit 1
    ;;
  000)
    echo "BROKEN: no response (timeout or DNS)."
    exit 1
    ;;
  *)
    echo "BROKEN: unexpected status $POST_CODE."
    exit 1
    ;;
esac
