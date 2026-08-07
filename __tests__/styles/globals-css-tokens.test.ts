import fs from 'fs';
import path from 'path';

const globalsCss = fs.readFileSync(
  path.join(process.cwd(), 'app/globals.css'),
  'utf8'
);

function extractBlock(source: string, startMarker: string, endMarker: string) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  if (start === -1 || end === -1) {
    throw new Error(
      `Could not find block between "${startMarker}" and "${endMarker}"`
    );
  }
  return source.slice(start, end);
}

describe('app/globals.css — .prose token usage', () => {
  // Same "no legacy tokens" regression guard already applied at the
  // component level (RSSLink/BackToTopButton/theme-toggle), extended to
  // the hand-rolled .prose rules that style rendered blog post markdown —
  // the actual content of every blog post, and previously the one part of
  // the redesign that never got retokenized.
  const proseBlock = extractBlock(
    globalsCss,
    '/* Custom styles for blog content */',
    '/* Smooth scrolling for anchor links */'
  );

  it('does not use the legacy emerald/sage/slate token classes', () => {
    expect(proseBlock).not.toMatch(/emerald-\d|sage-\d|slate-\d/);
  });

  it('uses the current design tokens for heading, text, code, and blockquote colors', () => {
    expect(proseBlock).toMatch(/text-accent-brand/);
    expect(proseBlock).toMatch(/text-ink-muted/);
    expect(proseBlock).toMatch(/bg-accent-soft/);
  });
});
