import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme:{
    extend: {
      colors: {
        gold: '#FFD700',
        bronze: '#CD7F32',
        silver: '#C0C0C0'
      }
    },
  },
   daisyui: {
    themes: [{
      dark: {
        "primary": "#FFD700",
        "secondary": "#C0C0C0",
        "accent": "#CD7F32",
        "neutral": "#2a323c",
        "base-100": "#1d232a",
      }
    }],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')],
} satisfies Config;
