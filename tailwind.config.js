/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Redesign brand tokens — read from app/globals.css :root/.dark.
        // These back the Refined Emerald (light) / Terminal (dark) palette;
        // see ideas/redesign-tdd-plan.md §1.3 for the design rationale.
        paper: 'hsl(var(--paper))',
        surface: 'hsl(var(--surface))',
        ink: {
          DEFAULT: 'hsl(var(--ink))',
          muted: 'hsl(var(--ink-muted))',
        },
        line: 'hsl(var(--line))',
        'accent-brand': 'hsl(var(--accent-brand))',
        'accent-soft': 'hsl(var(--accent-soft))',
      },
      fontFamily: {
        // Sans stays Inter via next/font in app/layout.tsx (already loaded,
        // no new request). Serif is display-only; mono is meta-only
        // (eyebrows, stack tags, section indices, terminal card).
        serif: [
          'Charter',
          'Iowan Old Style',
          'Palatino Linotype',
          'Georgia',
          'serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'SF Mono',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'terminal-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'slide-in-up': 'slide-in-up 0.4s ease-out forwards',
        'terminal-blink': 'terminal-blink 1s step-end infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'hsl(var(--foreground))',
            h2: {
              color: 'hsl(var(--accent-brand))',
            },
            h3: {
              color: 'hsl(var(--accent-brand))',
            },
            strong: {
              color: 'hsl(var(--accent-brand))',
            },
            code: {
              color: 'hsl(var(--accent-brand))',
              backgroundColor: 'hsl(var(--accent-soft))',
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--line))',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
