import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/partials/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
      },
      animation: {
        "shaking-like": "shake 2s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        custom: "0 4px 4px 0 rgba(0, 0, 0, .25)",
      },
    },
    colors: {
      ...colors,
      "deep-lilac": "#9551BA",
      "light-silver": "#D9D9D9",
      cultured: "#F5F5F5",
      azure: "#0A87FB",
      "spanish-gray": "#9E9E9E",
      lenurple: "#B888D2",
      lavender: "#E8DAF0",
      "vivid-red": "#FF1010",
    },
    screens: {
      ...defaultTheme.screens,
      "3xl": "1600px",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
