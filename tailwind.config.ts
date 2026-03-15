import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          DEFAULT: "#111111",
          elevated: "#1a1a1a",
        },
        muted: "#888888",
        accent: "#c8a97e",
        body: "#e5e5e5",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'SF Pro Display'",
          "'SF Pro Text'",
          "'Segoe UI'",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        caveat: ["'Caveat'", "cursive"],
      },
      letterSpacing: {
        caption: "0.1em",
      },
      fontSize: {
        "fluid-xl": "clamp(3rem, 10vw, 9rem)",
        "fluid-lg": "clamp(2.5rem, 8vw, 6rem)",
        "fluid-md": "clamp(1.75rem, 5vw, 3.5rem)",
        "fluid-sm": "clamp(1.5rem, 4vw, 2.5rem)",
      },
    },
  },
  plugins: [],
};
export default config;
