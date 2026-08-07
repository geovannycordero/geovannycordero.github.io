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

describe('tailwind.config.js — @tailwindcss/typography DEFAULT.css token usage', () => {
  const tailwindConfig = fs.readFileSync(
    path.join(process.cwd(), 'tailwind.config.js'),
    'utf8'
  );

  // These `typography.DEFAULT.css` overrides target the same prose h2/h3/
  // strong/code/blockquote elements as app/globals.css's hand-rolled .prose
  // rules above — a second, redundant, also-stale color source for one set
  // of headings. The three literals below (old emerald-700/50/300) are the
  // ones that were hardcoded; ban them so the plugin config can't silently
  // reintroduce a competing off-token palette.
  it('does not hardcode the old emerald-700/50/300 hsl literals', () => {
    expect(tailwindConfig).not.toMatch(/hsl\(163 94% 24%\)/);
    expect(tailwindConfig).not.toMatch(/hsl\(151 81% 96%\)/);
    expect(tailwindConfig).not.toMatch(/hsl\(156 72% 67%\)/);
  });

  it('reads typography colors from the current design tokens instead', () => {
    expect(tailwindConfig).toMatch(/hsl\(var\(--accent-brand\)\)/);
    expect(tailwindConfig).toMatch(/hsl\(var\(--accent-soft\)\)/);
    expect(tailwindConfig).toMatch(/hsl\(var\(--line\)\)/);
  });
});
