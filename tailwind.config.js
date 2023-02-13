/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/index.js", "./src/components/BreweryCards.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}