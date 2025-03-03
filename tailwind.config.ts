import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        navbar: "var(--navbar)",
        text: "var(--text)",
        content: "var(--content)",
        selection: "var(--selection)",
        prize: "var(--prize)",
        dot: "var(--dot)",
        "dot-selected": "var(--dot-selected)",
      },
    },
  },
  plugins: [],
} satisfies Config;
