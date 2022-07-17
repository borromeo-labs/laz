const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Readex Pro', ...defaultTheme.fontFamily.sans],
      serif: ['Playfair Display', ...defaultTheme.fontFamily.serif]
    },

    spacing: {
      0: '0px',
      px: '1px',
      8: '8px',
      12: '12px',
      16: '16px',
      24: '24px',
      32: '32px',
      40: '40px',
      48: '48px',
      56: '56px',
      64: '64px'
    },

    fontSize: {
      h1: '48.83px',
      h2: '31.25px',
      h3: '25px',
      h4: '20px',
      h5: '16px',
      h6: '12.8px'
    },

    zIndex: {
      'modal-backdrop': 1000,
      'modal-content': 1001,
      'timeline-circle': 1
    },

    extend: {
    }
  },
  plugins: []
}
