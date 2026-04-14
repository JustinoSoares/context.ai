import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F15B04"
        },
        secondary: "#413620",
      },
      fontFamily: {
        sans: "var(--font-sans)",
      }
    },
  },
  plugins: [],
} satisfies Config;