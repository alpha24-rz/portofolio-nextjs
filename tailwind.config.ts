import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // Using class strategy for dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '50%': { borderColor: 'transparent' },
        },
        glitch: {
          '0%': { 'clip-path': 'inset(20% 0 50% 0)' },
          '5%': { 'clip-path': 'inset(10% 0 60% 0)' },
          '10%': { 'clip-path': 'inset(15% 0 55% 0)' },
          '15%': { 'clip-path': 'inset(25% 0 35% 0)' },
          '20%': { 'clip-path': 'inset(30% 0 40% 0)' },
          '25%': { 'clip-path': 'inset(40% 0 20% 0)' },
          '30%': { 'clip-path': 'inset(10% 0 60% 0)' },
          '35%': { 'clip-path': 'inset(15% 0 55% 0)' },
          '40%': { 'clip-path': 'inset(25% 0 35% 0)' },
          '45%': { 'clip-path': 'inset(30% 0 40% 0)' },
          '50%': { 'clip-path': 'inset(20% 0 50% 0)' },
          '55%': { 'clip-path': 'inset(10% 0 60% 0)' },
          '60%': { 'clip-path': 'inset(15% 0 55% 0)' },
          '65%': { 'clip-path': 'inset(25% 0 35% 0)' },
          '70%': { 'clip-path': 'inset(30% 0 40% 0)' },
          '75%': { 'clip-path': 'inset(40% 0 20% 0)' },
          '80%': { 'clip-path': 'inset(20% 0 50% 0)' },
          '85%': { 'clip-path': 'inset(10% 0 60% 0)' },
          '90%': { 'clip-path': 'inset(15% 0 55% 0)' },
          '95%': { 'clip-path': 'inset(25% 0 35% 0)' },
          '100%': { 'clip-path': 'inset(30% 0 40% 0)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glitch-after": "glitch var(--after-duration) infinite linear alternate-reverse",
        "glitch-before": "glitch var(--before-duration) infinite linear alternate-reverse",
        typing: "typing 3s steps(10) 1s forwards, blink 0.75s step-end infinite",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
