const { icon, customIcon } = require('../../build/icons');

describe('icon', () => {
  it('renders lucide-compatible markup: base + kebab class twice + extra class', () => {
    const svg = icon('rss', 'h-4 w-4');
    expect(svg).toContain('class="lucide lucide-rss lucide-rss h-4 w-4"');
  });

  it('carries the exact defaultAttributes lucide-react ships', () => {
    const svg = icon('x', '');
    expect(svg).toContain('width="24"');
    expect(svg).toContain('height="24"');
    expect(svg).toContain('viewBox="0 0 24 24"');
    expect(svg).toContain('fill="none"');
    expect(svg).toContain('stroke="currentColor"');
    expect(svg).toContain('stroke-width="2"');
    expect(svg).toContain('stroke-linecap="round"');
    expect(svg).toContain('stroke-linejoin="round"');
    expect(svg).toContain('aria-hidden="true"');
  });

  it('renders every path/circle/rect node for a multi-node icon (sun)', () => {
    const svg = icon('sun', '');
    expect((svg.match(/<circle/g) || []).length).toBe(1);
    expect((svg.match(/<path/g) || []).length).toBe(8);
  });

  it('throws on an unknown icon name rather than silently rendering nothing', () => {
    expect(() => icon('does-not-exist', '')).toThrow(/unknown icon/i);
  });

  it('covers the full icon set used across the site', () => {
    const names = [
      'rss',
      'sun',
      'moon',
      'menu',
      'x',
      'arrow-left',
      'arrow-right',
      'code',
      'briefcase',
      'calendar',
      'clock',
      'user',
      'mail',
      'chevron-right',
      'map-pin',
      'external-link',
      'trophy',
    ];
    names.forEach(name => expect(() => icon(name, '')).not.toThrow());
  });
});

describe('customIcon', () => {
  it('renders fill-based brand icons (github, linkedin) without stroke attrs', () => {
    const svg = customIcon('github', 'h-4 w-4');
    expect(svg).toContain('viewBox="0 0 24 24"');
    expect(svg).toContain('fill="currentColor"');
    expect(svg).not.toContain('stroke=');
    expect(svg).toContain('aria-hidden="true"');
    expect(svg).toContain('class="h-4 w-4"');
    expect(svg).toContain('<path');
  });

  it('covers github and linkedin', () => {
    ['github', 'linkedin'].forEach(name =>
      expect(() => customIcon(name, '')).not.toThrow()
    );
  });

  it('throws on an unknown custom icon name', () => {
    expect(() => customIcon('does-not-exist', '')).toThrow(/unknown icon/i);
  });
});
