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

        // Legacy brand scales — every value here is read from the CSS custom
        // properties declared in app/globals.css, which is the single source
        // of truth. Retained until every component migrates off them (see
        // ideas/redesign-tdd-plan.md Task 12/14); changing the palette means
        // editing the variables there, not these lines.
        emerald: {
          50: 'hsl(var(--emerald-50))',
          100: 'hsl(var(--emerald-100))',
          200: 'hsl(var(--emerald-200))',
          300: 'hsl(var(--emerald-300))',
          400: 'hsl(var(--emerald-400))',
          500: 'hsl(var(--emerald-500))',
          600: 'hsl(var(--emerald-600))',
          700: 'hsl(var(--emerald-700))',
          800: 'hsl(var(--emerald-800))',
          900: 'hsl(var(--emerald-900))',
          950: 'hsl(var(--emerald-950))',
        },
        sage: {
          50: 'hsl(var(--sage-50))',
          100: 'hsl(var(--sage-100))',
          200: 'hsl(var(--sage-200))',
          300: 'hsl(var(--sage-300))',
          400: 'hsl(var(--sage-400))',
          500: 'hsl(var(--sage-500))',
          600: 'hsl(var(--sage-600))',
          700: 'hsl(var(--sage-700))',
          800: 'hsl(var(--sage-800))',
          900: 'hsl(var(--sage-900))',
          950: 'hsl(var(--sage-950))',
        },
        // Warm secondary accent — reserved for highlight/status markers
        // (e.g. an active-status badge) that need to stand apart from the
        // emerald brand color rather than compete with it.
        amber: {
          50: 'hsl(var(--amber-50))',
          100: 'hsl(var(--amber-100))',
          200: 'hsl(var(--amber-200))',
          300: 'hsl(var(--amber-300))',
          400: 'hsl(var(--amber-400))',
          500: 'hsl(var(--amber-500))',
          600: 'hsl(var(--amber-600))',
          700: 'hsl(var(--amber-700))',
          800: 'hsl(var(--amber-800))',
          900: 'hsl(var(--amber-900))',
          950: 'hsl(var(--amber-950))',
        },
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
              color: 'hsl(163 94% 24%)',
            },
            h3: {
              color: 'hsl(163 94% 24%)',
            },
            strong: {
              color: 'hsl(163 94% 24%)',
            },
            code: {
              color: 'hsl(163 94% 24%)',
              backgroundColor: 'hsl(151 81% 96%)',
            },
            blockquote: {
              borderLeftColor: 'hsl(156 72% 67%)',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
