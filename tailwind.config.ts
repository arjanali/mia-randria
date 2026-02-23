import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      colors: {
        cream: "var(--color-bg)",
        "warm-white": "var(--color-bg-alt)",
        dark: "var(--color-text)",
        mid: "var(--color-text-muted)",
        accent: "var(--color-accent)",
      },
    },
  },
  plugins: [],
};
export default config;
