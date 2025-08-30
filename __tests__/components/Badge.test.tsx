import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge Component', () => {
  it('renders badge with default variant', () => {
    render(<Badge>Default Badge</Badge>);

    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full');
  });

  it('renders badge with secondary variant', () => {
    render(<Badge variant='secondary'>Secondary Badge</Badge>);

    const badge = screen.getByText('Secondary Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground');
  });

  it('renders badge with destructive variant', () => {
    render(<Badge variant='destructive'>Destructive Badge</Badge>);

    const badge = screen.getByText('Destructive Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground');
  });

  it('renders badge with outline variant', () => {
    render(<Badge variant='outline'>Outline Badge</Badge>);

    const badge = screen.getByText('Outline Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-foreground');
  });

  it('applies custom className', () => {
    render(<Badge className='custom-badge'>Custom Badge</Badge>);

    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-badge');
  });

  it('renders badge with different content types', () => {
    render(<Badge>Text Content</Badge>);

    const badge = screen.getByText('Text Content');
    expect(badge).toBeInTheDocument();
  });

  it('renders badge with numbers', () => {
    render(<Badge>42</Badge>);

    const badge = screen.getByText('42');
    expect(badge).toBeInTheDocument();
  });

  it('renders badge with special characters', () => {
    render(<Badge>New!</Badge>);

    const badge = screen.getByText('New!');
    expect(badge).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<Badge>Semantic Badge</Badge>);

    const badge = screen.getByText('Semantic Badge');
    expect(badge.tagName).toBe('DIV');
  });

  it('handles empty content', () => {
    render(<Badge></Badge>);

    const badge = screen.getAllByText('')[0];
    expect(badge).toBeInTheDocument();
  });
});
