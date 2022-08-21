/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
};
