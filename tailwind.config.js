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
        120: '#324EA4',
      },
      primaryBg: 'var(--primaryBg)',
      secondaryBg: 'var(--secondaryBg)',
      neutralBg: 'var(--neutralBg)',
    },
    extend: {},
  },
  plugins: [],
};
