import { render } from '@testing-library/react';
import RootLayout from '@/app/layout';

// lib/blog.ts pulls in the ESM-only remark/remark-parse packages, which
// Jest's default CJS transform can't parse. Mocked here for the same reason
// __tests__/a11y/blog.a11y.test.tsx mocks it.
jest.mock('@/lib/blog', () => ({
  getPostBySlug: jest.fn().mockResolvedValue({
    slug: 'test-post',
    title: 'Test Post',
    excerpt: 'A test excerpt.',
    date: '2026-01-01',
    tags: ['Golang', 'Testing'],
    author: 'Geovanny Cordero Valverde',
    content: '<p>body</p>',
    readTime: '3 min read',
  }),
  getAllPostSlugs: jest.fn().mockResolvedValue(['test-post']),
}));

// Home pulls in every section component; mocked to a static shell so this
// suite only exercises the JSON-LD block, same approach as
// __tests__/app/page.test.tsx.
jest.mock(
  '@/components/hero',
  () =>
    function MockHero() {
      return <div />;
    }
);
jest.mock(
  '@/components/case-studies',
  () =>
    function MockCaseStudies() {
      return <div />;
    }
);
jest.mock(
  '@/components/about',
  () =>
    function MockAbout() {
      return <div />;
    }
);
jest.mock(
  '@/components/skills',
  () =>
    function MockSkills() {
      return <div />;
    }
);
jest.mock(
  '@/components/experience',
  () =>
    function MockExperience() {
      return <div />;
    }
);
jest.mock(
  '@/components/credentials',
  () =>
    function MockCredentials() {
      return <div />;
    }
);
jest.mock(
  '@/components/contact',
  () =>
    function MockContact() {
      return <div />;
    }
);
jest.mock(
  '@/components/navigation',
  () =>
    function MockNavigation() {
      return <div />;
    }
);
jest.mock(
  '@/components/footer',
  () =>
    function MockFooter() {
      return <div />;
    }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getJsonLd(root: Document | HTMLElement, type: string): any {
  const scripts = Array.from(
    root.querySelectorAll('script[type="application/ld+json"]')
  );
  const match = scripts
    .map(s => JSON.parse(s.textContent ?? '{}'))
    .find(json => json['@type'] === type);
  if (!match) throw new Error(`No JSON-LD block found for @type "${type}"`);
  return match;
}

describe('Person JSON-LD (site-wide)', () => {
  it('is present, parses as JSON, and has the required identity fields', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>
    );
    const person = getJsonLd(document, 'Person');

    expect(person['@context']).toBe('https://schema.org');
    expect(person.name).toBe('Geovanny Cordero Valverde');
    expect(person.url).toBe('https://geovannycordero.com');
    expect(Array.isArray(person.sameAs)).toBe(true);
    expect(person.sameAs.length).toBeGreaterThan(0);
    expect(Array.isArray(person.knowsAbout)).toBe(true);
  });
});

describe('BlogPosting + BreadcrumbList JSON-LD (post page)', () => {
  it('BlogPosting carries headline, dates, author, and matches the canonical URL', async () => {
    const { default: BlogPost } = await import('@/app/blog/[slug]/page');
    const element = await BlogPost({
      params: Promise.resolve({ slug: 'test-post' }),
    });
    const { container } = render(element);
    const posting = getJsonLd(container, 'BlogPosting');

    expect(posting.headline).toBe('Test Post');
    expect(posting.url).toBe('https://geovannycordero.com/blog/test-post');
    expect(posting.author).toEqual({
      '@type': 'Person',
      name: 'Geovanny Cordero Valverde',
    });
  });

  it('BreadcrumbList ends on the post itself with position 3', async () => {
    const { default: BlogPost } = await import('@/app/blog/[slug]/page');
    const element = await BlogPost({
      params: Promise.resolve({ slug: 'test-post' }),
    });
    const { container } = render(element);
    const breadcrumbs = getJsonLd(container, 'BreadcrumbList');
    const last = breadcrumbs.itemListElement.at(-1);

    expect(last.position).toBe(3);
    expect(last.item).toBe('https://geovannycordero.com/blog/test-post');
  });
});

describe('WebSite JSON-LD (homepage)', () => {
  it('declares the site name and root url', async () => {
    const { default: Home } = await import('@/app/page');
    const { container } = render(<Home />);
    const site = getJsonLd(container, 'WebSite');

    expect(site.name).toBe('Geovanny Cordero Portfolio');
    expect(site.url).toBe('https://geovannycordero.com');
  });
});

describe('ItemList JSON-LD (/projects)', () => {
  it('lists every project with position and url', async () => {
    const { default: ProjectsPage } = await import('@/app/projects/page');
    const element = await ProjectsPage();
    const { container } = render(element);
    const list = getJsonLd(container, 'ItemList');

    expect(list.itemListElement.length).toBeGreaterThan(0);
    expect(list.itemListElement[0]).toMatchObject({
      '@type': 'ListItem',
      position: 1,
    });
  });
});
