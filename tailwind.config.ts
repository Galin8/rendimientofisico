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
        brand: {
          dark: "#1a472a",
          lime: "#4ade80",
          gray: "#f8f9fa",
        },
      },
      fontFamily: {
        display: ["var(--font-barlow)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "70ch",
            color: "#1a1a1a",
            h1: { fontFamily: "var(--font-barlow)", fontWeight: "700" },
            h2: { fontFamily: "var(--font-barlow)", fontWeight: "600" },
            h3: { fontFamily: "var(--font-barlow)", fontWeight: "600" },
            a: {
              color: "#1a472a",
              "&:hover": { color: "#4ade80" },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
