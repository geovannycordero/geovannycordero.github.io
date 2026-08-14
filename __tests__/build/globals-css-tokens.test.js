const fs = require('fs');
const path = require('path');

const globalsCss = fs.readFileSync(
  path.join(process.cwd(), 'assets/css/globals.css'),
  'utf8'
);

function extractBlock(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  if (start === -1 || end === -1) {
    throw new Error(`Could not find block between "${startMarker}" and "${endMarker}"`);
  }
  return source.slice(start, end);
}

describe('assets/css/globals.css — .prose token usage', () => {
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
  const tailwindConfig = fs.readFileSync(path.join(process.cwd(), 'tailwind.config.js'), 'utf8');

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
