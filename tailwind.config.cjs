/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'primarycolor': '#ef255f',
      'primarycolorhover': '#ec7395',
      'secondarycolor': '#fccf4d',
      'secondarycolorhover': '#fce089',
      'white': '#fcfafa'
    },
  },
  plugins: [],
}
