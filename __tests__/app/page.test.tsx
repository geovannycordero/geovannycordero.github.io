import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock all the components to avoid complex dependencies
jest.mock('@/components/hero', () => {
  return function MockHero() {
    return <div data-testid='hero'>Hero Component</div>;
  };
});

jest.mock('@/components/case-studies', () => {
  return function MockCaseStudies() {
    return <div data-testid='case-studies'>Case Studies Component</div>;
  };
});

jest.mock('@/components/about', () => {
  return function MockAbout() {
    return <div data-testid='about'>About Component</div>;
  };
});

jest.mock('@/components/skills', () => {
  return function MockSkills() {
    return <div data-testid='skills'>Skills Component</div>;
  };
});

jest.mock('@/components/experience', () => {
  return function MockExperience() {
    return <div data-testid='experience'>Experience Component</div>;
  };
});

jest.mock('@/components/credentials', () => {
  return function MockCredentials() {
    return <div data-testid='credentials'>Credentials Component</div>;
  };
});

jest.mock('@/components/contact', () => {
  return function MockContact() {
    return <div data-testid='contact'>Contact Component</div>;
  };
});

jest.mock('@/components/navigation', () => {
  return function MockNavigation() {
    return <div data-testid='navigation'>Navigation Component</div>;
  };
});

jest.mock('@/components/footer', () => {
  return function MockFooter() {
    return <div data-testid='footer'>Footer Component</div>;
  };
});

describe('Home Page', () => {
  it('renders all main sections', () => {
    render(<Home />);

    // Check that all main sections are rendered
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('case-studies')).toBeInTheDocument();
    expect(screen.getByTestId('about')).toBeInTheDocument();
    expect(screen.getByTestId('skills')).toBeInTheDocument();
    expect(screen.getByTestId('experience')).toBeInTheDocument();
    expect(screen.getByTestId('credentials')).toBeInTheDocument();
    expect(screen.getByTestId('contact')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<Home />);

    // Check for main element
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('min-h-screen', 'bg-white');
  });

  it('renders components in correct order', () => {
    render(<Home />);

    const mainElement = screen.getByRole('main');
    const children = Array.from(mainElement.children);

    // Check that components are rendered in the expected order
    expect(children[0]).toHaveAttribute('data-testid', 'navigation');
    expect(children[1]).toHaveAttribute('data-testid', 'hero');
    expect(children[2]).toHaveAttribute('data-testid', 'case-studies');
    expect(children[3]).toHaveAttribute('data-testid', 'about');
    expect(children[4]).toHaveAttribute('data-testid', 'skills');
    expect(children[5]).toHaveAttribute('data-testid', 'experience');
    expect(children[6]).toHaveAttribute('data-testid', 'credentials');
    expect(children[7]).toHaveAttribute('data-testid', 'contact');
    expect(children[8]).toHaveAttribute('data-testid', 'footer');
  });
});
