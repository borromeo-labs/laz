const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Readex Pro', ...defaultTheme.fontFamily.sans],
      serif: ['Playfair Display', ...defaultTheme.fontFamily.serif]
    },

    spacing: {
      8: '8px',
      12: '12px',
      16: '16px',
      24: '24px',
      32: '32px',
      48: '48px',
      56: '56px'
    },

    extend: {}
  },
  plugins: []
}
