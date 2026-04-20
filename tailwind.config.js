/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        atelier: {
          paper: '#fcfaf7',
          ink: '#1a1a1a',
          gold: '#c5a059',
          slate: '#4a4a4a',
        }
      }
    },
  },
  plugins: [],
}
