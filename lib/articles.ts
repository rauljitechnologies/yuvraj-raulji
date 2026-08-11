import fs from 'fs';
import path from 'path';

export interface Heading {
  id: string;
  t: string;
}

export interface Article {
  html: string;
  toc: Heading[];
}

const stripTags = (s: string) => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

const decode = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

/**
 * Reads an article body and stamps `id="sec-N"` onto every <h2>, returning the
 * matching table of contents. The original did this in the browser after Alpine
 * injected the HTML; doing it at build time means the article text and its
 * headings are in the static output.
 */
export function getArticle(slug: string): Article {
  const file = path.join(process.cwd(), 'content', 'articles', `${slug}.html`);
  if (!fs.existsSync(file)) return { html: '', toc: [] };

  const raw = fs.readFileSync(file, 'utf8');
  const toc: Heading[] = [];
  let i = 0;

  const html = raw.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/g, (_m, attrs = '', inner) => {
    const id = `sec-${i++}`;
    toc.push({ id, t: decode(stripTags(inner)) });
    return `<h2 id="${id}"${attrs || ''}>${inner}</h2>`;
  });

  return { html, toc };
}
