/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
    colors: {
      offWhite: "#FAF9F6",
      white: "#FFFFFF",
      black: "#040707",
      yellow: "#fff59d",
      greyLight: " rgba(211, 211, 211, 0.483)",
      grey: "#2C3439",
      light: "#a3a3a3",
      yellowHover: "#e6dd8d",
      orange: {
        400: "#fb923c",
      },
      maroon: "#CF1F30",
      maroon2: "#de182b",

      yel: {
        50: "#fef08a",
        100: "#fbbf24",
        500: "#f59e0b",
      },
    },
  },
  plugins: [],
};
