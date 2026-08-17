const fs = require('fs');
const path = require('path');
const { ratio } = require('../../build/contrast');

const css = fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'css', 'globals.css'), 'utf8');

const REQUIRED_TOKENS = ['--paper', '--surface', '--ink', '--ink-muted', '--line', '--accent-brand'];

function extractBlock(source, selector) {
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

function readVar(block, token) {
  const match = block.match(new RegExp(`${token.replace('-', '\\-')}:\\s*([^;]+);`));
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
    expect(ratio(readVar(rootBlock, '--ink'), readVar(rootBlock, '--paper'))).toBeGreaterThanOrEqual(7);
  });

  it('dark ink on paper clears AAA body-text contrast (>=7)', () => {
    expect(ratio(readVar(darkBlock, '--ink'), readVar(darkBlock, '--paper'))).toBeGreaterThanOrEqual(7);
  });

  it('light muted ink on paper clears AA (>=4.5) — the guard that catches gray-500', () => {
    expect(
      ratio(readVar(rootBlock, '--ink-muted'), readVar(rootBlock, '--paper'))
    ).toBeGreaterThanOrEqual(4.5);
  });

  it('dark muted ink on paper clears AA (>=4.5) — the guard that catches gray-500', () => {
    expect(
      ratio(readVar(darkBlock, '--ink-muted'), readVar(darkBlock, '--paper'))
    ).toBeGreaterThanOrEqual(4.5);
  });

  it('light accent on paper clears AA (>=4.5)', () => {
    expect(
      ratio(readVar(rootBlock, '--accent-brand'), readVar(rootBlock, '--paper'))
    ).toBeGreaterThanOrEqual(4.5);
  });

  it('dark accent on paper clears AA (>=4.5)', () => {
    expect(
      ratio(readVar(darkBlock, '--accent-brand'), readVar(darkBlock, '--paper'))
    ).toBeGreaterThanOrEqual(4.5);
  });

  it('never uses the rejected gray-500 literal under build/ or assets/', () => {
    const offenders = [];

    function walk(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(full);
        } else if (/\.(js|css)$/.test(entry.name)) {
          const contents = fs.readFileSync(full, 'utf8');
          if (/#6b7280|text-gray-500/.test(contents)) {
            offenders.push(full);
          }
        }
      }
    }
    walk(path.join(__dirname, '..', '..', 'build'));
    walk(path.join(__dirname, '..', '..', 'assets'));

    expect(offenders).toEqual([]);
  });
});
