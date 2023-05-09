/** @type {import("tailwindcss").Config} */

function generateColors(color) {
  const colors = {};

  for (let i = 1; i <= 9; i++) {
    const shade = `${i}00`;
    colors[shade] = `var(--${color}-${shade})`;
  }

  return colors;
}

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    colors: {
      black: "var(--black)",
      darkGrey: "var(--darkGrey)",
      mediumGrey: "var(--mediumGrey)",
      textColor: "var(--textColor)",
      greyText: "var(--greyText)",
      white: "var(--white)",
      grey: "var(--grey)",
      primary: generateColors("primary"),
      pink: generateColors("pink"),
      blue: generateColors("blue"),
      cyan: generateColors("cyan"),
      yellow: generateColors("yellow")
    },
    extend: {}
  },
  plugins: [],
  safelist: [{
    pattern: /(bg|text|border)-(pink|blue|cyan|yellow)/
  }]
};