import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
        display: ["Fredoka One", "cursive"],
        pacifico: ["Pacifico", "cursive"],
        body: ["Lato", "sans-serif"],
        urbanist: ["var(--font-urbanist)", "sans-serif"],
      },
      colors: {
        primary: "#4A90E2",
        secondary: "#1ABC9C",
        background: "#F8F9FA",
        text: "#333333",
      },
      animation: {
        "fade-in": "fade-in 1s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in-up": "fade-in-up 1s ease-out forwards",
        reveal: "reveal 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        reveal: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
