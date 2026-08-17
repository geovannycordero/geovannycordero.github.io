const tailwindConfig = require('../../tailwind.config.js');

describe('typography tokens', () => {
  const fontFamily = tailwindConfig.theme.extend.fontFamily;

  it('exposes a serif display stack', () => {
    expect(Array.isArray(fontFamily?.serif)).toBe(true);
    expect(fontFamily.serif.length).toBeGreaterThan(0);
  });

  it('exposes a mono meta stack', () => {
    expect(Array.isArray(fontFamily?.mono)).toBe(true);
    expect(fontFamily.mono.length).toBeGreaterThan(0);
  });

  it('uses only system font stacks — no new web fonts', () => {
    const allFaces = [...fontFamily.serif, ...fontFamily.mono].join(' ');
    expect(allFaces).not.toMatch(/https?:\/\//);
  });
});
