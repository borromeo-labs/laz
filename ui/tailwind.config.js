const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Readex Pro', ...defaultTheme.fontFamily.sans],
      serif: ['Playfair Display', ...defaultTheme.fontFamily.serif]
    },

    colors: {
      primary: {
        50: '#EEF2FF',
        100: '#E0E7FF',
        200: '#C7D2FE',
        300: '#CAB1FC',
        400: '#818CF8',
        500: '#8A4FFF',
        600: '#6366F1',
        700: '#480CC0',
        800: '#36147B'
      },

      neutral: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#2C2B3C',
        800: '#121420'
      },

      red: {
        100: '#FDE4E3',
        200: '#F7A7A1',
        300: '#EB5E55',
        400: '#E72E23',
        500: '#6F110B'
      },

      yellow: {
        100: '#FDF8D9',
        200: '#F4E47C',
        300: '#FCDC4D',
        400: '#F1C504',
        500: '#897306'
      },

      green: {
        100: '#D1FAE5',
        200: '#6EE7B7',
        300: '#34D399',
        400: '#10B981',
        500: '#059669'
      },

      white: '#fff',
      black: '#000'
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
