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

PROBE='hp=probe&name=probe&email=probe@example.com&message=probe'

GET_CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$URL")

# Headers only, and no -L. A working Apps Script web app answers a POST with a
# 302 whose Location is the script.googleusercontent.com URL the result is
# actually at; curl -L would turn that into a GET and report a meaningless 405,
# and this check used to call the 302 itself a sign-in redirect and declare a
# healthy endpoint broken. Where it points is the thing that matters.
POST_HEADERS=$(curl -s -D - -o /dev/null --max-time 20 -X POST -d "$PROBE" "$URL")
POST_CODE=$(printf '%s' "$POST_HEADERS" | awk 'toupper($1) ~ /^HTTP/ { c=$2 } END { print c }')
LOCATION=$(printf '%s' "$POST_HEADERS" | awk 'tolower($1) == "location:" { print $2 }' | tr -d '\r' | tail -1)
LOCATION_HOST=$(printf '%s' "$LOCATION" | sed -E 's#^(https?://[^/]+).*#\1#')

# `hp` is the honeypot, so doPost returns {"ok":true} and writes no row and
# sends no email. The probe proves the path without putting a test lead in the
# spreadsheet.
case "$POST_CODE" in
  200)
    POST_BODY=$(curl -s --max-time 20 -X POST -d "$PROBE" "$URL")
    ;;
  301|302)
    case "$LOCATION_HOST" in
      https://script.googleusercontent.com)
        POST_BODY=$(curl -s --max-time 20 "$LOCATION")
        POST_CODE=200
        ;;
      *)
        POST_BODY=''
        ;;
    esac
    ;;
  *)
    POST_BODY=$(curl -s --max-time 20 -X POST -d "$PROBE" "$URL")
    ;;
esac

echo "  GET   $GET_CODE"
echo "  POST  $POST_CODE${LOCATION_HOST:+  -> $LOCATION_HOST}"
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
    echo "  The deployment's manifest is the fix, and google-apps-script/"
    echo "  already holds the right one: executeAs USER_DEPLOYING and access"
    echo "  ANYONE_ANONYMOUS. Push it and move the deployment onto that version:"
    echo
    echo "    npm run lead-api:deploy"
    echo
    echo "  In the UI the same settings read 'Execute as: Me' and 'Who has"
    echo "  access: Anyone'. NOT 'Anyone with a Google Account', which looks"
    echo "  identical at a glance and is the ANYONE that produces this $POST_CODE."
    exit 1
    ;;
  301|302)
    echo "BROKEN: redirecting to $LOCATION_HOST."
    echo
    echo "  A successful POST redirects to script.googleusercontent.com, which"
    echo "  is where the result is. Anywhere else is a sign-in page, or the"
    echo "  active deployment is a Library rather than a Web app. A Library has"
    echo "  no doPost and can never accept a form submission."
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
