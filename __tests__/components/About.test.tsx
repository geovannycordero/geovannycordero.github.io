import { render, screen } from '@testing-library/react';
import About from '@/components/about';

describe('About', () => {
  it('renders the section heading via SectionHead', () => {
    render(<About />);
    expect(
      screen.getByRole('heading', { level: 2, name: /about/i })
    ).toBeInTheDocument();
  });

  it('has proper semantic structure with id="about"', () => {
    render(<About />);
    const section = document.getElementById('about');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('renders the compressed narrative in a measure-width prose column', () => {
    render(<About />);
    const prose = screen.getByTestId('about-prose');
    expect(prose.className).toMatch(/measure|max-w-\[/);
    expect(
      screen.getByText(/pernix solutions/i, { selector: 'p' })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/golang/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/rails/i).length).toBeGreaterThan(0);
  });

  it('renders exactly 4 stat items with a label and detail each', () => {
    render(<About />);
    const stats = screen.getAllByTestId('about-stat');
    expect(stats).toHaveLength(4);

    expect(screen.getByText('5+ years')).toBeInTheDocument();
    expect(screen.getByText('4 client sites')).toBeInTheDocument();
    expect(screen.getByText('4 countries')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(
      screen.getByText(/programathon competition champion/i)
    ).toBeInTheDocument();
  });
});
