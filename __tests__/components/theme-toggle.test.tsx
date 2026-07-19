import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

function renderToggle(defaultTheme: 'light' | 'dark' | 'system' = 'light') {
  return render(
    <ThemeProvider defaultTheme={defaultTheme}>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe('ThemeToggle', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('renders as a switch that is unchecked in light mode', () => {
    renderToggle('light');
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('renders as a switch that is checked in dark mode', () => {
    renderToggle('dark');
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('has an accessible label describing the action, not the current state', () => {
    renderToggle('light');
    expect(screen.getByRole('switch')).toHaveAccessibleName(
      /switch to dark mode/i
    );
  });

  it('exposes the resolved theme as data-state for the slide-position styling', () => {
    renderToggle('dark');
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'dark');
  });

  it('toggles from light to dark on click', async () => {
    const user = userEvent.setup();
    renderToggle('light');
    await user.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'dark');
  });

  it('toggles via keyboard activation', async () => {
    const user = userEvent.setup();
    renderToggle('light');
    screen.getByRole('switch').focus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });
});
