const { ratio } = require('../../build/contrast');

describe('contrast ratio', () => {
  it('computes the maximum ratio for pure black on pure white', () => {
    expect(ratio('#ffffff', '#000000')).toBeCloseTo(21, 1);
  });

  it('computes a near-1 ratio for identical colors', () => {
    expect(ratio('#14442c', '#14442c')).toBeCloseTo(1, 1);
  });

  it('matches the neon-on-near-black pairing used in dark mode', () => {
    expect(ratio('#00ff41', '#0a0a0a')).toBeCloseTo(14.5, 1);
  });

  it('flags the rejected gray-500 dark-mode meta color as failing AA', () => {
    expect(ratio('#6b7280', '#0a0a0a')).toBeLessThan(4.5);
  });

  it('accepts #rrggbb hex input', () => {
    expect(ratio('#151515', '#f6f7f5')).toBeGreaterThan(15);
  });

  it('accepts "H S% L%" HSL triplet input', () => {
    const hex = ratio('#151515', '#f6f7f5');
    const hsl = ratio('0 0% 8%', '90 11% 96%');
    expect(hsl).toBeCloseTo(hex, 0);
  });

  it('is symmetric regardless of argument order', () => {
    expect(ratio('#151515', '#f6f7f5')).toBeCloseTo(
      ratio('#f6f7f5', '#151515'),
      5
    );
  });
});
