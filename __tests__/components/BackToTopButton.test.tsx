import { render, screen, fireEvent } from '@testing-library/react';
import BackToTopButton from '@/components/BackToTopButton';

describe('BackToTopButton', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true,
    });
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    document.getElementById('blog-content')?.remove();
  });

  it('renders a button with accessible label', () => {
    render(<BackToTopButton />);
    expect(
      screen.getByRole('button', { name: /back to top/i })
    ).toBeInTheDocument();
  });

  it('scrolls to #blog-content element when present', () => {
    const el = document.createElement('div');
    el.id = 'blog-content';
    document.body.appendChild(el);

    render(<BackToTopButton />);
    fireEvent.click(screen.getByRole('button', { name: /back to top/i }));

    expect(el.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('falls back to window.scrollTo when #blog-content is absent', () => {
    render(<BackToTopButton />);
    fireEvent.click(screen.getByRole('button', { name: /back to top/i }));
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
