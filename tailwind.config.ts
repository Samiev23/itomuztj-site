import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--rgb-background) / <alpha-value>)",
        surface: "rgb(var(--rgb-surface) / <alpha-value>)",
        "surface-elevated": "rgb(var(--rgb-surface-elevated) / <alpha-value>)",
        "card-hover": "rgb(var(--rgb-card-hover) / <alpha-value>)",
        foreground: "rgb(var(--rgb-foreground) / <alpha-value>)",
        "foreground-secondary": "rgb(var(--rgb-foreground-secondary) / <alpha-value>)",
        "foreground-muted": "rgb(var(--rgb-foreground-muted) / <alpha-value>)",
        "foreground-subtle": "rgb(var(--rgb-foreground-subtle) / <alpha-value>)",
        cyan: {
          DEFAULT: "rgb(var(--rgb-cyan) / <alpha-value>)",
          dim: "var(--color-cyan-dim)",
          hover: "rgb(var(--rgb-cyan-hover) / <alpha-value>)",
        },
        purple: {
          DEFAULT: "rgb(var(--rgb-purple) / <alpha-value>)",
          dim: "var(--color-purple-dim)",
        },
        line: "rgb(var(--rgb-line) / <alpha-value>)",
        success: "rgb(var(--rgb-success) / <alpha-value>)",
        warning: "rgb(var(--rgb-warning) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      backgroundSize: {
        grid: "64px 64px",
      },
    },
  },
  plugins: [],
};

export default config;
