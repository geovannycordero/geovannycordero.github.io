import { render, screen } from '@testing-library/react';
import SectionHead from '@/components/section-head';

describe('SectionHead', () => {
  it('renders the index and the label', () => {
    render(
      <SectionHead index='01' label='Case Studies' id='work'>
        <p>content</p>
      </SectionHead>
    );

    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('Case Studies')).toBeInTheDocument();
  });

  it('renders the label as an h2, not a styled div', () => {
    render(
      <SectionHead index='02' label='About' id='about'>
        <p>content</p>
      </SectionHead>
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'About' })
    ).toBeInTheDocument();
  });

  it('applies the id to the wrapping section for anchor navigation', () => {
    render(
      <SectionHead index='03' label='Skills' id='skills'>
        <p>content</p>
      </SectionHead>
    );

    const section = document.getElementById('skills');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('renders children inside the section', () => {
    render(
      <SectionHead index='04' label='Experience' id='experience'>
        <p data-testid='section-content'>content</p>
      </SectionHead>
    );

    const section = document.getElementById('experience');
    expect(section).toContainElement(screen.getByTestId('section-content'));
  });
});
