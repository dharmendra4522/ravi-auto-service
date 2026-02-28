/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E63946",
          dark: "#C1121F",
        },
        secondary: {
          DEFAULT: "#FF9F1C",
        },
        dark: {
          DEFAULT: "#1A1A2E",
          card: "#16213E",
        },
        light: {
          DEFAULT: "#F8F9FA",
        },
        muted: {
          DEFAULT: "#6C757D",
        },
        success: {
          DEFAULT: "#28A745",
        },
      },
      fontFamily: {
        heading: ["var(--font-rajdhani)", "sans-serif"],
        body: ["var(--font-nunito)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "grain": "url('/images/grain.png')",
      },
    },
  },
  plugins: [],
};
