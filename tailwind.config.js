/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      black: 'var(--black)',
      darkGrey: 'var(--darkGrey)',
      mediumGrey: 'var(--mediumGrey)',
      textColor: 'var(--textColor)',
      greyText: 'var(--greyText)',
      white: 'var(--white)',
      grey: 'var(--grey)',
      pink: {
        900: "#FEE3E4",
        800: "#FDC7CE",
        700: "#F9A9BC",
        600: "#F492B3",
        500: "#ED6FA6",
        400: "#CB5192",
        300: "#AA3780",
        200: "#89236E",
        100: "#711562"
      },
      blue: {
        900: "#D8E8FB",
        800: "#B9D0F8",
        700: "#91AFEB",
        600: "#7090D8",
        500: "#4567BF",
        400: "#324EA4",
        300: "#223989",
        200: "#16276E",
        120: '#324EA4',
        110: '#7090D8',
        100: "#4567BF",
        90: '#91AFEB'
      },
      cyan: {
        900: "#CEFBEC",
        800: "#9FF7E1",
        700: "#6CE8D4",
        600: "#46D2C7",
        500: "#14B2B4",
        400: "#0E8D9A",
        300: "#0A6B81",
        200: "#064D68",
        100: "#033856"
      },
      yellow: {
        900: "#FEFADF",
        800: "#FDF4BF",
        700: "#FBEB9E",
        600: "#F8E185",
        500: "#F4D35E",
        400: "#D1AF44",
        300: "#AF8D2F",
        200: "#8D6D1D",
        100: "#755612"
      }
    },
    extend: {},
  },
  plugins: [],
  safelist: [{
    pattern: /(bg|text|border)-(pink|blue|cyan|yellow)/
  }

  ]
};
