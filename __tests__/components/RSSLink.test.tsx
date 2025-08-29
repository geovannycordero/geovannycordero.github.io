import { render, screen } from '@testing-library/react';
import RSSLink from '@/components/rss-link';

describe('RSSLink Component', () => {
  it('renders RSS link with correct content', () => {
    render(<RSSLink />);

    // Check for RSS link
    const rssLink = screen.getByRole('link', { name: /rss feed/i });
    expect(rssLink).toBeInTheDocument();
  });

  it('has correct href attribute', () => {
    render(<RSSLink />);

    const rssLink = screen.getByRole('link', { name: /rss feed/i });
    expect(rssLink).toHaveAttribute('href', '/rss.xml');
  });

  it('opens in new tab', () => {
    render(<RSSLink />);

    const rssLink = screen.getByRole('link', { name: /rss feed/i });
    expect(rssLink).toHaveAttribute('target', '_blank');
  });

  it('has proper title attribute', () => {
    render(<RSSLink />);

    const rssLink = screen.getByRole('link', { name: /rss feed/i });
    expect(rssLink).toHaveAttribute('title', 'Subscribe to RSS Feed');
  });

  it('displays RSS icon', () => {
    render(<RSSLink />);

    // Check for RSS icon
    const rssIcon = document.querySelector('.lucide-rss');
    expect(rssIcon).toBeInTheDocument();
  });

  it('has proper styling classes', () => {
    render(<RSSLink />);

    const rssLink = screen.getByRole('link', { name: /rss feed/i });
    expect(rssLink).toHaveClass('inline-flex', 'items-center', 'gap-2');
  });

  it('has proper semantic structure', () => {
    render(<RSSLink />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });
});
