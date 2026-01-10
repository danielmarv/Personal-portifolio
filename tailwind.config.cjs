/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0a0e27",
        secondary: "#b8b5d1",
        tertiary: "#1a1535",
        "black-100": "#120f28",
        "black-200": "#0d0a20",
        "white-100": "#f8f8ff",
        accent: "#915EFF",
        "accent-light": "#a77bff",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        glow: "0 0 20px rgba(145, 94, 255, 0.4)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
