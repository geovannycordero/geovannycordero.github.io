import { render, screen } from '@testing-library/react';
import TerminalCard from '@/components/terminal-card';

describe('TerminalCard', () => {
  it('renders the $ cat about.md prompt line', () => {
    render(<TerminalCard />);
    expect(screen.getByText('$ cat about.md')).toBeInTheDocument();
  });

  it.each([
    ['name', 'Geovanny Cordero'],
    ['title', 'Full-Stack Software Engineer'],
    ['location', 'San José, Costa Rica'],
    ['experience', '5+ years'],
    ['award', 'Programathon 2020 Champion'],
  ])('renders the %s key/value pair', (key, value) => {
    render(<TerminalCard />);
    expect(screen.getByText(new RegExp(key, 'i'))).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) => element?.textContent?.includes(value) ?? false,
        { selector: 'p' }
      )
    ).toBeInTheDocument();
  });

  it('renders the languages list', () => {
    render(<TerminalCard />);
    expect(screen.getByText(/languages/i)).toBeInTheDocument();
    expect(screen.getByText(/golang/i)).toBeInTheDocument();
  });

  it('is aria-hidden — decorative, facts are duplicated in About', () => {
    const { container } = render(<TerminalCard />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});
