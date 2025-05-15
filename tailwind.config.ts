import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      colors: {
        gold: "#FFD700",
        bronze: "#CD7F32",
        silver: "#C0C0C0",
      },
    },
  },
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#FFD700",
          secondary: "#C0C0C0",
          accent: "#CD7F32",
          neutral: "#2a323c",
          "base-100": "#1d232a",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
} satisfies Config;
