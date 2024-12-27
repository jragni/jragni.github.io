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
        navy: '#0a192f',
        slate: '#8892b0',
        'light-slate': '#ccd6f6',
        'lightest-slate': '#e2e8ff',
        teal: '#64FFDA',
      },
    },
  },
  plugins: [],
} satisfies Config;
