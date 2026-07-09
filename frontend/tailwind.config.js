/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfbf7',
          100: '#fbf7ed',
          200: '#f5ebd2',
          300: '#edd8a7',
          400: '#e0bd70',
          500: '#d4ab3a', // Primary branding gold
          600: '#c2962d',
          700: '#a27622',
          800: '#815c1e',
          900: '#6a4c1c',
          950: '#3e2a0e',
        },
        dark: {
          50: '#f5f5f5',
          100: '#ebebeb',
          200: '#d6d6d6',
          300: '#b5b5b5',
          400: '#8f8f8f',
          500: '#707070',
          600: '#5c5c5c',
          700: '#4a4a4a',
          800: '#3a3a3a',
          900: '#1a1a1a',
          950: '#070707', // Premium black backdrop
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
