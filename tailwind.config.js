/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      blue: {
        90: '#91AFEB',
        100: '#4567BF',
        110: '#7090D8',
        120: '#324EA4',
      },
      black: 'var(--black)',
      darkGrey: 'var(--darkGrey)',
      mediumGrey: 'var(--mediumGrey)',
      textColor: 'var(--textColor)',
      greyText: 'var(--greyText)',
      white: 'var(--white)',
      grey: 'var(--grey)'
    },
    extend: {},
  },
  plugins: [],
};
