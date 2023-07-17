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
      pressedGrey: "var(--pressedGrey)",
      textColor: "var(--textColor)",
      greyText: "var(--greyText)",
      white: "var(--white)",
      grey: "var(--grey)",
      primary: {
        170: "var(--primary-170)",
        100: "var(--primary-100)",
        90: "var(--primary-90)"
      },
      pink: generateColors("pink"),
      blue: generateColors("blue"),
      cyan: generateColors("cyan"),
      yellow: generateColors("yellow")
    },
    extend: {
      borderRadius: {
        'lg': '0.63rem'
      }
    }
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ],
  safelist: [{
    pattern: /(bg|text|border)-(pink|blue|cyan|yellow)/
  }]
};