import { render, screen } from '@testing-library/react';
import BlogPostCard from '@/components/blog-post-card';
import type { BlogPostMeta } from '@/lib/blog';

const post: BlogPostMeta = {
  slug: 'test-post',
  title: 'Test Post',
  date: '2026-01-01',
  excerpt: 'An excerpt used only in tests.',
  readTime: '3 min read',
  tags: ['Testing'],
  author: 'Geovanny Cordero Valverde',
};

describe('BlogPostCard', () => {
  it('renders the title, excerpt, and read time', () => {
    render(<BlogPostCard post={post} index={0} />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(
      screen.getByText('An excerpt used only in tests.')
    ).toBeInTheDocument();
    expect(screen.getByText('3 min read')).toBeInTheDocument();
  });

  it('links to the post slug', () => {
    render(<BlogPostCard post={post} index={0} />);
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href', '/blog/test-post');
    });
  });

  it('does not use the legacy emerald/sage/slate token classes', () => {
    const { container } = render(<BlogPostCard post={post} index={0} />);
    expect(container.innerHTML).not.toMatch(/emerald-\d|sage-\d|slate-\d/);
  });

  it('renders the title as a real heading, not a styled div', () => {
    render(<BlogPostCard post={post} index={0} />);
    expect(
      screen.getByRole('heading', { name: 'Test Post' })
    ).toBeInTheDocument();
  });
});
