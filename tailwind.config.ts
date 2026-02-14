import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
            DEFAULT: "#d8544f",
            foreground: "#ffffff",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair)"],
      },
       borderRadius: {
        'full': 'var(--radius-full)',
        'lg': 'var(--radius-lg)',
        'md': 'var(--radius-md)',
      }
    },
  },
  plugins: [],
};
export default config;
