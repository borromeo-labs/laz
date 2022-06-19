const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Neue Haas Display', ...defaultTheme.fontFamily.sans],
      serif: ['Playfair Display', ...defaultTheme.fontFamily.serif]
    },

    extend: {}
  },
  plugins: []
}
