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
        'border-line bg-accent-soft dark:border-line/30',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
    >
      <span
        className={cn(
          'inline-flex h-6 w-6 translate-x-1 items-center justify-center rounded-full bg-surface shadow-md transition-transform duration-300',
          isDark && 'translate-x-9'
        )}
      >
        {isDark ? (
          <Moon className='h-3.5 w-3.5 text-accent-brand' />
        ) : (
          <Sun className='h-3.5 w-3.5 text-accent-brand' />
        )}
      </span>
    </button>
  );
}
