/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom emerald and sage colors
        emerald: {
          50: "hsl(151 81% 96%)",
          100: "hsl(149 80% 90%)",
          200: "hsl(152 76% 80%)",
          300: "hsl(156 72% 67%)",
          400: "hsl(158 64% 52%)",
          500: "hsl(160 84% 39%)",
          600: "hsl(161 94% 30%)",
          700: "hsl(163 94% 24%)",
          800: "hsl(163 88% 20%)",
          900: "hsl(164 86% 16%)",
          950: "hsl(166 91% 9%)",
        },
        sage: {
          50: "hsl(138 20% 97%)",
          100: "hsl(138 15% 94%)",
          200: "hsl(138 12% 88%)",
          300: "hsl(138 10% 76%)",
          400: "hsl(138 8% 64%)",
          500: "hsl(138 6% 52%)",
          600: "hsl(138 8% 42%)",
          700: "hsl(138 10% 34%)",
          800: "hsl(138 12% 27%)",
          900: "hsl(138 15% 22%)",
          950: "hsl(138 20% 15%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "slide-in-up": "slide-in-up 0.4s ease-out forwards",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "hsl(var(--foreground))",
            h2: {
              color: "hsl(163 94% 24%)",
            },
            h3: {
              color: "hsl(163 94% 24%)",
            },
            strong: {
              color: "hsl(163 94% 24%)",
            },
            code: {
              color: "hsl(163 94% 24%)",
              backgroundColor: "hsl(151 81% 96%)",
            },
            blockquote: {
              borderLeftColor: "hsl(156 72% 67%)",
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
