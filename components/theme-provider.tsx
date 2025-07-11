'use client';

import type * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  resolvedTheme: 'dark' | 'light';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  systemTheme: 'dark' | 'light';
};

const initialState: ThemeProviderState = {
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => null,
  toggleTheme: () => null,
  systemTheme: 'light',
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'geovanny-portfolio-theme',
  disableTransitionOnChange = false,
  ...props
}: Readonly<ThemeProviderProps>) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>('light');
  const [mounted, setMounted] = useState(false);

  // Get the resolved theme (actual theme being applied)
  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  // Update system theme when media query changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    // Set initial system theme
    updateSystemTheme();

    // Listen for changes - using deprecated addListener for React 17 compatibility
    if (mediaQuery.addListener) {
      mediaQuery.addListener(updateSystemTheme);
    } else {
      mediaQuery.addEventListener('change', updateSystemTheme);
    }

    return () => {
      if (mediaQuery.removeListener) {
        mediaQuery.removeListener(updateSystemTheme);
      } else {
        mediaQuery.removeEventListener('change', updateSystemTheme);
      }
    };
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Add transition class if not disabled
    if (!disableTransitionOnChange) {
      root.classList.add('theme-transition');
    }

    // Apply new theme
    root.classList.add(resolvedTheme);

    // Remove transition class after animation
    if (!disableTransitionOnChange) {
      const timeoutId = setTimeout(() => {
        root.classList.remove('theme-transition');
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [resolvedTheme, disableTransitionOnChange]);

  // Load theme from storage on mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(storageKey) as Theme;
      if (storedTheme && ['dark', 'light', 'system'].includes(storedTheme)) {
        setThemeState(storedTheme);
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
    setMounted(true);
  }, [storageKey]);

  // Save theme to storage when it changes
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }
    }
  }, [theme, storageKey, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'system') {
      // If system, toggle to opposite of current system theme
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      // Toggle between light and dark
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  const value = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    systemTheme,
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
