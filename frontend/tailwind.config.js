/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: {
          light: "#FFE4EC",
          DEFAULT: "#F9A8D4",
          dark: "#F472B6",
        },
        cream: "#FFF9F5",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px rgba(249, 168, 212, 0.25)",
      },
    },
  },
  plugins: [],
};
