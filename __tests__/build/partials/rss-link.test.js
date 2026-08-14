const { getByRole } = require('@testing-library/dom');
const { renderRssLink } = require('../../../build/partials/rss-link');

function mount() {
  document.body.innerHTML = renderRssLink();
  return document.body;
}

describe('renderRssLink', () => {
  it('renders an RSS link pointing at /rss.xml, opening in a new tab', () => {
    const body = mount();
    const link = getByRole(body, 'link', { name: /rss feed/i });
    expect(link.getAttribute('href')).toBe('/rss.xml');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('title')).toBe('Subscribe to RSS Feed');
  });

  it('includes the RSS icon', () => {
    const body = mount();
    expect(body.querySelector('.lucide-rss')).toBeTruthy();
  });

  it('uses theme tokens, not a raw color scale', () => {
    const body = mount();
    const link = getByRole(body, 'link', { name: /rss feed/i });
    expect(link.className).not.toMatch(/\bsage-\d|\bemerald-\d/);
    expect(link.className).toMatch(/text-ink-muted/);
  });
});
