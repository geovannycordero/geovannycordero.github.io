const { ogTemplate, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } = require('../../build/og-image');

// renderOgImagePng (the actual PNG generation) isn't tested here — it
// dynamic-import()s satori, which is ESM-only and Jest can't load (same
// story as build/content/blog.js). See the self-check at the bottom of
// build/og-image.js, run via `node build/og-image.js`.
describe('ogTemplate', () => {
  it('is a 1200x630 PNG per the original next/og config', () => {
    expect(OG_IMAGE_SIZE).toEqual({ width: 1200, height: 630 });
    expect(OG_IMAGE_CONTENT_TYPE).toBe('image/png');
  });

  it('builds a satori-shaped tree: {type, props} nodes throughout', () => {
    const tree = ogTemplate({ eyebrow: 'Portfolio', title: 'Full-Stack Software Engineer' });
    expect(tree.type).toBe('div');
    expect(Array.isArray(tree.props.children)).toBe(true);
    expect(tree.props.children.length).toBe(3); // eyebrow row, title row, name/meta row
  });

  it('omits the `children` key entirely on a childless node (self-closing-<div/> equivalent)', () => {
    const tree = ogTemplate({ eyebrow: 'x', title: 'y' });
    const eyebrowRow = tree.props.children[0];
    const accentBar = eyebrowRow.props.children[0];
    expect('children' in accentBar.props).toBe(false);
  });

  it('adds a second (meta) span inside the name row only when meta is provided', () => {
    const withMeta = ogTemplate({ eyebrow: 'x', title: 'y', meta: 'z' });
    const withoutMeta = ogTemplate({ eyebrow: 'x', title: 'y' });

    const metaRowWith = withMeta.props.children[2];
    const metaRowWithout = withoutMeta.props.children[2];

    expect(Array.isArray(metaRowWith.props.children)).toBe(true);
    expect(metaRowWith.props.children).toHaveLength(2);
    // Single child collapses to the bare node, not a 1-item array — same
    // as JSX would produce.
    expect(Array.isArray(metaRowWithout.props.children)).toBe(false);
  });

  it('drops the meta span (not a null placeholder) when meta is absent', () => {
    const tree = ogTemplate({ eyebrow: 'x', title: 'y' });
    const metaRow = tree.props.children[2];
    const children = Array.isArray(metaRow.props.children)
      ? metaRow.props.children
      : [metaRow.props.children];
    expect(children.every(child => child != null)).toBe(true);
  });

  it('bumps the title font size down for long titles', () => {
    const short = ogTemplate({ eyebrow: 'x', title: 'Short' });
    const long = ogTemplate({ eyebrow: 'x', title: 'A'.repeat(41) });
    expect(short.props.children[1].props.style.fontSize).toBe(72);
    expect(long.props.children[1].props.style.fontSize).toBe(56);
  });
});
