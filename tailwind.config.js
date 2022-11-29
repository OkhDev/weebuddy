/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './constants/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans-serif': ['Rubik', 'sans-serif'],
      },
      colors: {
        offwhite: {
          DEFAULT: '#f3f3f4',
        },
        black: {
          DEFAULT: '#313639',
        },
        navy: {
          light: '#b9b8ca',
          DEFAULT: '#000957',
        },
        orange: {
          lightest: '#ffd6cb',
          light: '#ffad97',
          DEFAULT: '#ff5b2e',
        },
        sand: {
          DEFAULT: '#fffaf5',
          dark: '#fff6ed',
        },
      },
    },
  },
  plugins: [],
}
