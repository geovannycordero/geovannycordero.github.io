const { getAllByRole, getByRole, getByText } = require('@testing-library/dom');
const { renderBlogPostCard } = require('../../../build/partials/blog-post-card');

const post = {
  slug: 'test-post',
  title: 'Test Post',
  date: '2026-01-01',
  excerpt: 'An excerpt used only in tests.',
  readTime: '3 min read',
  tags: ['Testing'],
  author: 'Geovanny Cordero Valverde',
};

function mount(index = 0) {
  document.body.innerHTML = renderBlogPostCard(post, index);
  return document.body;
}

describe('renderBlogPostCard', () => {
  it('renders the title, excerpt, and read time', () => {
    const body = mount();
    expect(getByText(body, 'Test Post')).toBeTruthy();
    expect(getByText(body, 'An excerpt used only in tests.')).toBeTruthy();
    expect(getByText(body, '3 min read')).toBeTruthy();
  });

  it('links to the post slug', () => {
    const body = mount();
    getAllByRole(body, 'link').forEach(link => {
      expect(link.getAttribute('href')).toBe('/blog/test-post/');
    });
  });

  it('renders the title as a real heading', () => {
    const body = mount();
    expect(getByRole(body, 'heading', { name: 'Test Post' })).toBeTruthy();
  });

  it('does not use the legacy emerald/sage/slate token classes', () => {
    const body = mount();
    expect(body.innerHTML).not.toMatch(/emerald-\d|sage-\d|slate-\d/);
  });

  it('sets --stagger-index from the card index, for the CSS stagger-in animation', () => {
    const body = mount(3);
    expect(body.firstElementChild.getAttribute('style')).toContain('--stagger-index: 3');
  });

  // Date-only front matter parses as UTC midnight; formatting in the
  // builder's local zone would render the previous day west of UTC, so
  // a local build would disagree with what CI deploys.
  it('formats the date in UTC regardless of the builder timezone', () => {
    const tz = process.env.TZ;
    process.env.TZ = 'America/Los_Angeles';
    try {
      expect(getByText(mount(), 'January 1, 2026')).toBeTruthy();
    } finally {
      process.env.TZ = tz;
    }
  });
});
