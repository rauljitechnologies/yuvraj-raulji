#!/usr/bin/env python3
"""
Build public/assets/yuvraj-raulji-cv.pdf from the exported /resume/ page.

── Why it reads the built page instead of lib/career.ts ───────────────────────

lib/resume.ts says the file and the page are "two formats of one record, and
lib/career.ts is the single source for both, so they cannot disagree". A
generator that re-types the record would break exactly that promise the first
time a bullet changed on the page and not here.

So the record is read out of `out/resume/index.html`, which is the published
record itself. If the page is wrong the PDF is wrong in the same way, which is
the correct failure: there is one source, and a diff on the page is a diff on
the file. Identity (name, title, email, phone, location) comes from that page's
JSON-LD Person rather than its markup, because the schema is already the
machine-readable copy of those fields.

── Why the layout is single-column ───────────────────────────────────────────

The file exists for the applicant tracking system a recruiter pastes it into.
A two-column CV reads beautifully and parses badly: ATS text extraction walks
the content stream, so a sidebar interleaves itself into the career history one
line at a time. The page keeps the two-column design; the file does not, and
that difference is the point of having both.

Everything here is real text. No part of this record is an image, so nothing in
it depends on OCR.

Usage:  npm run build && python3 scripts/make-cv.py
"""

import html
import json
import pathlib
import re
import sys

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "out" / "resume" / "index.html"
OUT = ROOT / "public" / "assets" / "yuvraj-raulji-cv.pdf"

ACCENT = "#d71920"
ACCENT_DEEP = "#8f1016"
INK = "#15171a"

# Pulls the record out of the rendered DOM. Kept as one evaluate() so the
# selectors live next to each other and a markup change fails loudly here
# rather than silently dropping a section.
EXTRACT = r"""
() => {
  const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '');
  const all = (root, sel) => Array.from(root.querySelectorAll(sel));

  // ── Summary block ──
  const summary = document.querySelector('#summary');
  const paras = all(summary, 'p');
  // The section's first <p> is the `Marker` eyebrow, which reads "Summary",
  // so taking paras[0] put the word "Summary" under the heading that already
  // says it. The record's summary is the longest prose in the block.
  const lede = paras.map(txt).sort((a, b) => b.length - a.length)[0] || '';
  const titles = all(summary, 'ul li').map(txt).filter(Boolean);
  // The availability line is the one paragraph carrying the blinking dot, an
  // aria-hidden span. Matching on the words instead hit the summary, because
  // that sentence ends "Available for freelance projects and remote ...".
  const availRow = paras.find((p) => p.querySelector('span[aria-hidden=\"true\"]'));
  const availability = availRow ? txt(availRow.querySelector('span:last-child')) : '';

  const contact = all(summary, 'dl > div').map((row) => ({
    label: txt(row.querySelector('dt')),
    value: txt(row.querySelector('dd')),
  }));

  // ── Career ──
  // Each <li> wraps a `Rise` div, and that wrapper holds the two columns:
  // the period on the left, the role on the right. Querying the <li> for
  // 'div' finds the wrapper first, which contains everything, so the columns
  // are taken as its direct children instead.
  const career = all(document.querySelector('#career'), 'ol > li').map((li) => {
    const wrap = li.querySelector(':scope > div');
    const cols = all(wrap, ':scope > div');
    const left = cols[0];
    const body = cols.find((d) => d.querySelector(':scope > h3'));
    const leftP = all(left, ':scope > p').map(txt);
    const bodyParas = all(body, ':scope > p').map(txt);
    return {
      period: leftP[0] || '',
      current: leftP.includes('Current'),
      // 'Current' is a flag, not a place; the remainder is the location.
      location: leftP.slice(1).filter((t) => t !== 'Current')[0] || '',
      title: txt(body.querySelector('h3')),
      org: bodyParas[0] || '',
      summary: bodyParas[1] || '',
      // The two lists are told apart by their markup, not their order. A role
      // with no verified achievements renders no points list at all, so
      // indexing [0] as points and [1] as stack made the last role's stack
      // (Magento, PHP, MySQL) read as its accomplishments.
      points: (() => {
        const ul = all(body, ':scope > ul').find((u) => u.querySelector('li span[aria-hidden=\"true\"]'));
        return ul ? all(ul, 'li').map((l) => txt(l.querySelector('span:last-child'))) : [];
      })(),
      stack: (() => {
        const ul = all(body, ':scope > ul').find((u) => !u.querySelector('li span[aria-hidden=\"true\"]'));
        return ul ? all(ul, 'li').map(txt) : [];
      })(),
      // The page says so out loud where the record is empty; so does the file.
      note: bodyParas[2] || '',
    };
  });

  // ── Skills, education, certifications: three dl blocks, in that order ──
  const creds = document.querySelector('#credentials');
  const dls = all(creds, 'dl');
  const pairs = (dl) =>
    dl
      ? all(dl, ':scope > div').map((row) => ({
          term: txt(row.querySelector('dt')),
          detail: txt(row.querySelector('dd')),
          items: all(row, 'dd li').map(txt).filter(Boolean),
        }))
      : [];

  return {
    lede,
    titles,
    availability,
    contact,
    career,
    skills: pairs(dls[0]),
    education: pairs(dls[1]),
    certifications: pairs(dls[2]),
  };
}
"""


def identity(page_html: str) -> dict:
    """Name, role and contact facts, from the page's JSON-LD Person."""
    blocks = re.findall(
        r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', page_html, re.S
    )
    for b in blocks:
        graph = json.loads(html.unescape(b)).get("@graph", [])
        for node in graph:
            if node.get("@type") == "Person":
                addr = node.get("address", {}) or {}
                return {
                    "name": node.get("name", ""),
                    "jobTitle": node.get("jobTitle", ""),
                    "email": node.get("email", "").replace("mailto:", ""),
                    "telephone": node.get("telephone", ""),
                    "locality": ", ".join(
                        v
                        for v in (
                            addr.get("addressLocality"),
                            addr.get("addressRegion"),
                            addr.get("addressCountry"),
                        )
                        if v
                    ),
                    "url": node.get("url", ""),
                    "sameAs": node.get("sameAs", []) or [],
                }
    raise SystemExit("no JSON-LD Person on the resume page")


def esc(s: str) -> str:
    return html.escape(s or "", quote=False)


def render(ident: dict, rec: dict) -> str:
    """The print document. A4, single column, hairline rules, brand red."""

    # The page's contact block, in reading order, rather than the schema's
    # fields: JSON-LD carries the phone as E.164 (+919898334731), and a CV
    # header should print the number the way a human dials it.
    order = ["Location", "Email", "Phone", "Website", "LinkedIn", "Time zone"]
    by_label = {c["label"]: c["value"] for c in rec["contact"]}
    header_bits = [by_label[k] for k in order if by_label.get(k)]
    header_bits += [v for k, v in by_label.items() if k not in order and v]

    roles = "".join(
        f"""
    <article class="role">
      <header>
        <h3>{esc(r['title'])}</h3>
        <p class="org">{esc(r['org'])}</p>
        <p class="meta">{esc(r['period'])}{' &middot; ' + esc(r['location']) if r['location'] else ''}{' &middot; Current' if r['current'] else ''}</p>
      </header>
      {f"<p class='lede'>{esc(r['summary'])}</p>" if r['summary'] else ''}
      {('<ul class="points">' + ''.join(f'<li>{esc(p)}</li>' for p in r['points']) + '</ul>') if r['points'] else (f"<p class='note'>{esc(r['note'])}</p>" if r['note'] else '')}
      {f"<p class='stack'><span>Stack</span>{esc(', '.join(r['stack']))}</p>" if r['stack'] else ''}
    </article>"""
        for r in rec["career"]
    )

    skills = "".join(
        f"""<div class="kv"><dt>{esc(g['term'])}</dt><dd>{esc(', '.join(g['items']) or g['detail'])}</dd></div>"""
        for g in rec["skills"]
    )
    education = "".join(
        f"""<div class="rec"><dt>{esc(e['term'])}</dt><dd>{esc(e['detail'])}</dd></div>"""
        for e in rec["education"]
    )
    certs = "".join(
        f"""<div class="rec"><dt>{esc(c['term'])}</dt><dd>{esc(c['detail'])}</dd></div>"""
        for c in rec["certifications"]
    )

    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>{esc(ident['name'])} — {esc(ident['jobTitle'])}</title>
<style>
  @page {{ size: A4; margin: 14mm 15mm 15mm; }}
  * {{ box-sizing: border-box; }}
  html {{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
  body {{
    margin: 0; color: {INK};
    font-family: "Manrope", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 9.4pt; line-height: 1.5; font-weight: 300;
  }}
  h1, h2, h3 {{ margin: 0; font-weight: 700; letter-spacing: -0.01em; }}
  p {{ margin: 0; }}
  a {{ color: inherit; text-decoration: none; }}

  /* ── Masthead ── */
  .mast {{ border-bottom: 2px solid {ACCENT}; padding-bottom: 7pt; }}
  .mast h1 {{ font-size: 23pt; line-height: 1.05; }}
  .mast .role {{
    margin-top: 3pt; color: {ACCENT_DEEP};
    font-size: 10.2pt; font-weight: 600; letter-spacing: 0.01em;
  }}
  .mast .bits {{
    margin-top: 6pt; font-size: 8.3pt; color: #44484e;
    font-feature-settings: "tnum"; /* phone and URL digits align */
  }}
  .mast .bits span + span::before {{ content: "  |  "; color: #b9bdc4; }}
  .titles {{ margin-top: 5pt; font-size: 8pt; color: #5a5f66; }}
  .avail {{
    margin-top: 5pt; font-size: 7.8pt; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.03em; color: {ACCENT};
  }}

  /* ── Section furniture ── */
  section {{ margin-top: 11pt; }}
  section > h2 {{
    font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.05em;
    color: {ACCENT}; border-bottom: 0.6pt solid #d8dbe0;
    padding-bottom: 3pt; margin-bottom: 7pt;
  }}
  .summary {{ max-width: 100%; }}

  /* ── Career ── */
  .role {{ break-inside: avoid; page-break-inside: avoid; margin-bottom: 9pt; }}
  .role + .role {{ border-top: 0.6pt solid #e7e9ec; padding-top: 8pt; }}
  .role h3 {{ font-size: 11pt; }}
  .role .org {{ font-size: 9.4pt; font-weight: 600; color: {ACCENT_DEEP}; margin-top: 1.5pt; }}
  .role .meta {{
    font-size: 8pt; color: #5f646b; margin-top: 2pt;
    text-transform: uppercase; letter-spacing: 0.03em;
  }}
  .role .lede {{ margin-top: 4.5pt; color: #33373d; }}
  .points {{ margin: 4.5pt 0 0; padding: 0; list-style: none; }}
  .points li {{ position: relative; padding-left: 10pt; margin-bottom: 2.2pt; }}
  .points li::before {{
    content: ""; position: absolute; left: 0; top: 6pt;
    width: 5.5pt; height: 0.9pt; background: {ACCENT}; opacity: 0.65;
  }}
  .note {{ margin-top: 4.5pt; font-size: 8.6pt; font-style: italic; color: #767b82; }}
  .stack {{ margin-top: 5pt; font-size: 8.2pt; color: #5f646b; }}
  .stack span {{
    text-transform: uppercase; letter-spacing: 0.04em; font-weight: 600;
    color: {ACCENT_DEEP}; margin-right: 5pt;
  }}

  /* ── Key/value blocks: skills, education, certifications ── */
  .kv {{
    display: grid; grid-template-columns: 38mm 1fr; gap: 0 7mm;
    padding: 3.4pt 0; border-bottom: 0.6pt solid #eceef1;
    break-inside: avoid; page-break-inside: avoid;
  }}
  .kv:last-child {{ border-bottom: 0; }}
  .kv dt {{
    font-size: 7.9pt; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.03em; color: #4a4f56; padding-top: 0.6pt;
  }}
  .kv dd {{ margin: 0; }}

  /* Named records: the name reads as a name, the issuer or period sits
     right-aligned beside it. No uppercase, and no narrow label column. */
  .rec {{
    display: grid; grid-template-columns: 1fr auto; gap: 0 6mm;
    align-items: baseline; padding: 3.2pt 0;
    border-bottom: 0.6pt solid #eceef1;
    break-inside: avoid; page-break-inside: avoid;
  }}
  .rec:last-child {{ border-bottom: 0; }}
  .rec dt {{ font-size: 9.4pt; font-weight: 600; color: {INK}; }}
  .rec dd {{ margin: 0; font-size: 8.2pt; color: #5f646b; white-space: nowrap; }}
  dl {{ margin: 0; }}
</style></head>
<body>
  <header class="mast">
    <h1>{esc(ident['name'])}</h1>
    <p class="role">{esc(ident['jobTitle'])}</p>
    <p class="bits">{''.join(f'<span>{esc(b)}</span>' for b in header_bits)}</p>
    {f"<p class='titles'>{esc(' · '.join(rec['titles']))}</p>" if rec['titles'] else ''}
    {f"<p class='avail'>{esc(rec['availability'])}</p>" if rec['availability'] else ''}
  </header>

  <section>
    <h2>Summary</h2>
    <p class="summary">{esc(rec['lede'])}</p>
  </section>

  <section>
    <h2>Experience</h2>
    {roles}
  </section>

  <section>
    <h2>Technical skills</h2>
    <dl>{skills}</dl>
  </section>

  <section>
    <h2>Education</h2>
    <dl>{education}</dl>
  </section>

  <section>
    <h2>Certifications</h2>
    <dl>{certs}</dl>
  </section>
</body></html>"""


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"{SRC.relative_to(ROOT)} missing. Run `npm run build` first.")

    page_html = SRC.read_text(encoding="utf-8")
    ident = identity(page_html)

    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page()
        page.goto(SRC.as_uri(), wait_until="load")
        rec = page.evaluate(EXTRACT)

        # Sanity gates. A silently empty section is the one failure mode that
        # ships a wrong file that still opens, so each is asserted by name.
        for key in ("career", "skills", "education", "certifications"):
            if not rec[key]:
                raise SystemExit(f"extracted no {key} from the resume page")
        if not rec["lede"]:
            raise SystemExit("extracted no summary from the resume page")

        doc = ROOT / "out" / "_cv.html"
        doc.write_text(render(ident, rec), encoding="utf-8")

        pdf_page = browser.new_page()
        pdf_page.goto(doc.as_uri(), wait_until="load")
        OUT.parent.mkdir(parents=True, exist_ok=True)
        pdf_page.pdf(path=str(OUT), format="A4", print_background=True)
        browser.close()
        doc.unlink(missing_ok=True)

    roles = len(rec["career"])
    points = sum(len(r["points"]) for r in rec["career"])
    print(f"wrote {OUT.relative_to(ROOT)}  ({OUT.stat().st_size / 1024:.0f}KB)")
    print(f"  {roles} roles, {points} bullets, {len(rec['skills'])} skill groups, "
          f"{len(rec['education'])} education, {len(rec['certifications'])} certifications")


if __name__ == "__main__":
    sys.exit(main())
