import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(30px, -40px) scale(1.1)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      animation: {
        float: "float 12s ease-in-out infinite",
      },
      colors: {
        primary: {
          DEFAULT: "#F15B04",
          foreground: "#FFFFFF",
        },
        secondary: "#413620",
      },
      fontFamily: {
        sans: "var(--font-sans)",
      },
    },
  },
  plugins: [],
} satisfies Config;
