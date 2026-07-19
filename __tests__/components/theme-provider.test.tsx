import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/components/theme-provider';
import { THEME_STORAGE_KEY } from '@/lib/theme-script';

function mockMatchMedia(matches: boolean) {
  window.matchMedia = jest.fn().mockImplementation(query => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

function Probe() {
  const { theme, resolvedTheme } = useTheme();
  return <span data-testid='probe'>{`${theme}:${resolvedTheme}`}</span>;
}

describe('ThemeProvider', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('defaults to system and resolves to dark when the OS prefers dark', () => {
    mockMatchMedia(true);
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );
    expect(screen.getByTestId('probe')).toHaveTextContent('system:dark');
  });

  it('defaults to system and resolves to light when the OS prefers light', () => {
    mockMatchMedia(false);
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );
    expect(screen.getByTestId('probe')).toHaveTextContent('system:light');
  });

  it('honors a previously stored explicit choice over the system preference', () => {
    mockMatchMedia(true);
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );
    expect(screen.getByTestId('probe')).toHaveTextContent('light:light');
  });
});
