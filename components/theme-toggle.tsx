'use client';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({
  variant = 'dropdown',
  size = 'default',
  className,
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  if (variant === 'button') {
    return (
      <Button
        variant='ghost'
        size={size === 'sm' ? 'sm' : 'icon'}
        onClick={toggleTheme}
        className={cn(
          'relative transition-all duration-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/20',
          showLabel && 'gap-2',
          className
        )}
        aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <Sun
          className={cn(
            'h-4 w-4 transition-all duration-300',
            resolvedTheme === 'dark'
              ? 'rotate-90 scale-0'
              : 'rotate-0 scale-100'
          )}
        />
        <Moon
          className={cn(
            'absolute h-4 w-4 transition-all duration-300',
            resolvedTheme === 'dark'
              ? 'rotate-0 scale-100'
              : '-rotate-90 scale-0'
          )}
        />
        {showLabel && (
          <span className='text-sm font-medium'>
            {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
          </span>
        )}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size={size === 'sm' ? 'sm' : 'icon'}
          className={cn(
            'relative transition-all duration-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/20',
            showLabel && 'gap-2',
            className
          )}
          aria-label='Toggle theme'
        >
          <Sun
            className={cn(
              'h-4 w-4 transition-all duration-300',
              resolvedTheme === 'dark'
                ? 'rotate-90 scale-0'
                : 'rotate-0 scale-100'
            )}
          />
          <Moon
            className={cn(
              'absolute h-4 w-4 transition-all duration-300',
              resolvedTheme === 'dark'
                ? 'rotate-0 scale-100'
                : '-rotate-90 scale-0'
            )}
          />
          {showLabel && <span className='text-sm font-medium'>Theme</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='min-w-[140px] bg-white dark:bg-gray-900 border-emerald-200 dark:border-emerald-800'
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={cn(
            'cursor-pointer transition-colors',
            'hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
            'focus:bg-emerald-50 dark:focus:bg-emerald-900/20',
            theme === 'light' && 'bg-emerald-100 dark:bg-emerald-900/30'
          )}
        >
          <Sun className='mr-2 h-4 w-4' />
          <span>Light</span>
          {theme === 'light' && (
            <div className='ml-auto h-2 w-2 rounded-full bg-emerald-600' />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={cn(
            'cursor-pointer transition-colors',
            'hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
            'focus:bg-emerald-50 dark:focus:bg-emerald-900/20',
            theme === 'dark' && 'bg-emerald-100 dark:bg-emerald-900/30'
          )}
        >
          <Moon className='mr-2 h-4 w-4' />
          <span>Dark</span>
          {theme === 'dark' && (
            <div className='ml-auto h-2 w-2 rounded-full bg-emerald-600' />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={cn(
            'cursor-pointer transition-colors',
            'hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
            'focus:bg-emerald-50 dark:focus:bg-emerald-900/20',
            theme === 'system' && 'bg-emerald-100 dark:bg-emerald-900/30'
          )}
        >
          <Monitor className='mr-2 h-4 w-4' />
          <span>System</span>
          {theme === 'system' && (
            <div className='ml-auto h-2 w-2 rounded-full bg-emerald-600' />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Simplified toggle for mobile or compact layouts
export function SimpleThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-2',
        'text-sage-600 hover:text-emerald-600 dark:text-sage-400 dark:hover:text-emerald-400',
        'hover:bg-emerald-100 dark:hover:bg-emerald-900/20',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
        'dark:focus:ring-offset-gray-900',
        className
      )}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun
        className={cn(
          'h-5 w-5 transition-all duration-300',
          resolvedTheme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        )}
      />
      <Moon
        className={cn(
          'absolute h-5 w-5 transition-all duration-300',
          resolvedTheme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        )}
      />
    </button>
  );
}
