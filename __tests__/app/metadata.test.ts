// lib/blog.ts pulls in the ESM-only remark/remark-parse packages, which
// Jest's default CJS transform can't parse. Mocked here (unused by these
// assertions) for the same reason __tests__/a11y/blog.a11y.test.tsx mocks it.
jest.mock('@/lib/blog', () => ({
  getAllPosts: jest.fn().mockResolvedValue([]),
}));

import { metadata as homeMetadata } from '@/app/page';
import { metadata as blogMetadata } from '@/app/blog/page';
import { metadata as projectsMetadata } from '@/app/projects/page';

describe('static route metadata', () => {
  it.each([
    ['home', homeMetadata, 'https://geovannycordero.com'],
    ['blog', blogMetadata, 'https://geovannycordero.com/blog'],
    ['projects', projectsMetadata, 'https://geovannycordero.com/projects'],
  ] as const)(
    '%s has a title, description, canonical, and matching OG/Twitter',
    (_name, metadata, canonicalUrl) => {
      expect(metadata.title).toBeTruthy();
      expect(metadata.description).toBeTruthy();
      expect(metadata.alternates?.canonical).toBe(canonicalUrl);
      expect(metadata.openGraph?.url).toBe(canonicalUrl);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((metadata.twitter as any)?.card).toBe('summary_large_image');
    }
  );
});
