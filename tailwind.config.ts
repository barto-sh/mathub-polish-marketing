import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border) / 0.12)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // MatHub brand tokens
        paper: "hsl(var(--paper))",
        cream: "hsl(var(--cream))",
        ink: "hsl(var(--ink))",
        navy: {
          DEFAULT: "hsl(var(--navy))",
          deep: "hsl(var(--navy-deep))",
        },
        yellow: {
          DEFAULT: "hsl(var(--yellow))",
          ink: "hsl(var(--yellow-ink))",
          accent: "hsl(var(--yellow-accent))",
        },
        line: {
          DEFAULT: "hsl(var(--ink) / 0.12)",
          dark: "hsl(0 0% 100% / 0.12)",
        },

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
      },
      borderRadius: {
        sm: "2px",
        md: "6px",
        lg: "12px",
      },
      boxShadow: {
        sm: "0 1px 2px hsl(222 33% 9% / 0.06)",
        md: "0 4px 12px hsl(222 33% 9% / 0.08)",
      },
      transitionTimingFunction: {
        mh: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
} satisfies Config;
