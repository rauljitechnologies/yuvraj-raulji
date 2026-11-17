#!/usr/bin/env bash
#
# Push google-apps-script/ and move the live deployment onto the new version.
#
# ── Why this is a script and not six steps in a guide ────────────────────────
#
# SETUP-GUIDE.md described the redeploy as a sequence of clicks, and the table
# at the bottom of it said "After editing Code.gs: Deploy > Manage deployments >
# Edit > New version". That instruction was followed by nobody for two months:
# Code.gs was rewritten on 17 Nov 2026 and the deployment stayed on version 5,
# so every lead kept being scored by the function the rewrite replaced.
#
# A redeploy that nothing runs is a redeploy that does not happen. This runs.
#
# ── What it does not do ──────────────────────────────────────────────────────
#
# It never creates a deployment. `clasp create-deployment` issues a new /exec
# URL, which would leave LEAD_ENDPOINT in lib/site.ts pointing at the old one
# and every enquiry posting into a deployment nobody reads. It updates the
# deployment the site already posts to, in place, so the URL cannot drift.
#
# The deployment id is read out of that URL rather than written here, for the
# same reason: one source of truth, and no second place to update.
#
#   npm run lead-api:deploy
#
# Exit 0 means pushed, deployed and verified healthy against the live URL.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CLASP="$ROOT/node_modules/.bin/clasp"

if [ ! -x "$CLASP" ]; then
  echo "clasp is not installed. Run: npm install"
  exit 1
fi

URL="$(grep -o "https://script\.google\.com/macros/s/[^']*" "$ROOT/lib/site.ts" | head -1)"
if [ -z "$URL" ]; then
  echo "FAIL: no LEAD_ENDPOINT found in lib/site.ts"
  exit 1
fi

# https://script.google.com/macros/s/<deploymentId>/exec
DEPLOYMENT_ID="$(printf '%s' "$URL" | sed -E 's#.*/macros/s/([^/]+)/exec.*#\1#')"

echo "Deployment (from lib/site.ts):"
echo "  $DEPLOYMENT_ID"
echo

cd "$ROOT/google-apps-script"

# -f because the manifest is part of the push, and the manifest is what carries
# executeAs USER_DEPLOYING and access ANYONE_ANONYMOUS. A deployment created in
# the web UI keeps whatever the UI set until a pushed manifest replaces it, and
# the UI had it on USER_ACCESSING + ANYONE, which is what rejected every
# anonymous submission with a 401.
echo "Pushing..."
"$CLASP" push -f

echo
echo "Creating a version..."
VERSION="$("$CLASP" create-version "${1:-Automated deploy}" | grep -oE '[0-9]+$')"
if [ -z "$VERSION" ]; then
  echo "FAIL: could not read the new version number"
  exit 1
fi
echo "  version $VERSION"

echo
echo "Pointing the deployment at it..."
"$CLASP" redeploy "$DEPLOYMENT_ID" -V "$VERSION" -d "lead api"

echo
echo "Verifying the live URL..."
exec "$ROOT/scripts/check-lead-endpoint.sh"
