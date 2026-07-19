'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: Readonly<ThemeToggleProps>) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type='button'
      role='switch'
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      data-state={resolvedTheme}
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex h-8 w-16 shrink-0 items-center rounded-full border transition-colors duration-300',
        'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
    >
      <span
        className={cn(
          'inline-flex h-6 w-6 translate-x-1 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 dark:bg-emerald-900',
          isDark && 'translate-x-9'
        )}
      >
        {isDark ? (
          <Moon className='h-3.5 w-3.5 text-emerald-300' />
        ) : (
          <Sun className='h-3.5 w-3.5 text-amber-500' />
        )}
      </span>
    </button>
  );
}
