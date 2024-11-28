/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-grey": "#1b1b1b",
        "background": "#b1d0d2",
        "salmon": "#ec9384",
        "secundary-grey": "#505050",
        "secundary-green": "#779395",
        "project-selected": "#ff9f1c",
        "snow-white": "#f7f0f0"
      },
      fontSize: {
        "xs": "0.6875rem",
        "sm": "0.8125rem",
        "base": "1rem",
        "lg": "1.25rem",
        "xl": "1.5rem"
      },
    },
    fontFamily: {
      SpaceMono: ["'Space Mono'", "monospace"],
      Manrope: ["'Manrope'", "sans-serif"],
      BebasNeue: ["'Bebas Neue'", "cursive"],
    },
    container: {
      padding: "0",
      center: true,
    },
  },
  plugins: [],
};
