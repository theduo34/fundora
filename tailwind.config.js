const { semantic } = require("./theme/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: semantic.primary,
          foreground: semantic.primaryForeground,
        },
        secondary: {
          DEFAULT: semantic.secondary,
          foreground: semantic.secondaryForeground,
        },
        background: semantic.background,
        foreground: semantic.foreground,
        card: {
          DEFAULT: semantic.card,
          foreground: semantic.cardForeground,
        },
        popover: {
          DEFAULT: semantic.popover,
          foreground: semantic.popoverForeground,
        },
        border: semantic.border,
        input: semantic.input,
        ring: semantic.ring,
        muted: {
          DEFAULT: semantic.muted,
          foreground: semantic.mutedForeground,
        },
        accent: {
          DEFAULT: semantic.accent,
          foreground: semantic.accentForeground,
        },
        destructive: {
          DEFAULT: semantic.destructive,
          foreground: semantic.destructiveForeground,
        },
        sidebar: {
          DEFAULT: semantic.sidebar,
          foreground: semantic.sidebarForeground,
          primary: semantic.sidebarPrimary,
          "primary-foreground": semantic.sidebarPrimaryForeground,
          accent: semantic.sidebarAccent,
          "accent-foreground": semantic.sidebarAccentForeground,
          border: semantic.sidebarBorder,
          ring: semantic.sidebarRing,
        },
        chart: {
          "1": semantic.chart1,
          "2": semantic.chart2,
          "3": semantic.chart3,
          "4": semantic.chart4,
          "5": semantic.chart5,
        },
      },
    },
  },
};