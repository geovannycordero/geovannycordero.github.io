import fs from 'fs';
import path from 'path';
import { ratio } from '@/lib/contrast';

const css = fs.readFileSync(
  path.join(__dirname, '..', '..', 'app', 'globals.css'),
  'utf8'
);

const REQUIRED_TOKENS = [
  '--paper',
  '--surface',
  '--ink',
  '--ink-muted',
  '--line',
  '--accent-brand',
];

function extractBlock(source: string, selector: string): string {
  const start = source.indexOf(`${selector} {`);
  if (start === -1) {
    throw new Error(`Could not find "${selector} {" block in globals.css`);
  }
  const openBrace = source.indexOf('{', start);
  let depth = 0;
  for (let i = openBrace; i < source.length; i++) {
    if (source[i] === '{') depth++;
    if (source[i] === '}') {
      depth--;
      if (depth === 0) return source.slice(openBrace + 1, i);
    }
  }
  throw new Error(`Unbalanced braces reading "${selector}" block`);
}

function readVar(block: string, token: string): string {
  const match = block.match(
    new RegExp(`${token.replace('-', '\\-')}:\\s*([^;]+);`)
  );
  if (!match) {
    throw new Error(`Token ${token} not declared in this block`);
  }
  return match[1].trim();
}

describe('design tokens', () => {
  const rootBlock = extractBlock(css, ':root');
  const darkBlock = extractBlock(css, '.dark');

  it.each(REQUIRED_TOKENS)('%s is declared in :root', token => {
    expect(() => readVar(rootBlock, token)).not.toThrow();
  });

  it.each(REQUIRED_TOKENS)('%s has a .dark counterpart', token => {
    expect(() => readVar(darkBlock, token)).not.toThrow();
  });

  it('light ink on paper clears AAA body-text contrast (>=7)', () => {
    const ink = readVar(rootBlock, '--ink');
    const paper = readVar(rootBlock, '--paper');
    expect(ratio(ink, paper)).toBeGreaterThanOrEqual(7);
  });

  it('dark ink on paper clears AAA body-text contrast (>=7)', () => {
    const ink = readVar(darkBlock, '--ink');
    const paper = readVar(darkBlock, '--paper');
    expect(ratio(ink, paper)).toBeGreaterThanOrEqual(7);
  });

  it('light muted ink on paper clears AA (>=4.5) — the guard that catches gray-500', () => {
    const inkMuted = readVar(rootBlock, '--ink-muted');
    const paper = readVar(rootBlock, '--paper');
    expect(ratio(inkMuted, paper)).toBeGreaterThanOrEqual(4.5);
  });

  it('dark muted ink on paper clears AA (>=4.5) — the guard that catches gray-500', () => {
    const inkMuted = readVar(darkBlock, '--ink-muted');
    const paper = readVar(darkBlock, '--paper');
    expect(ratio(inkMuted, paper)).toBeGreaterThanOrEqual(4.5);
  });

  it('light accent on paper clears AA (>=4.5)', () => {
    const accent = readVar(rootBlock, '--accent-brand');
    const paper = readVar(rootBlock, '--paper');
    expect(ratio(accent, paper)).toBeGreaterThanOrEqual(4.5);
  });

  it('dark accent on paper clears AA (>=4.5)', () => {
    const accent = readVar(darkBlock, '--accent-brand');
    const paper = readVar(darkBlock, '--paper');
    expect(ratio(accent, paper)).toBeGreaterThanOrEqual(4.5);
  });

  it('never uses the rejected gray-500 literal under components/', () => {
    const componentsDir = path.join(__dirname, '..', '..', 'components');
    const offenders: string[] = [];

    function walk(dir: string) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(full);
        } else if (/\.(tsx?|css)$/.test(entry.name)) {
          const contents = fs.readFileSync(full, 'utf8');
          if (/#6b7280|text-gray-500/.test(contents)) {
            offenders.push(full);
          }
        }
      }
    }
    walk(componentsDir);

    expect(offenders).toEqual([]);
  });
});
