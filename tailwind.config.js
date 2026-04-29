/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#B8A472',
          light: '#D4C48F',
          dark: '#8A7A55',
        },
        dark: {
          DEFAULT: '#0A0E0D',
          2: '#0F1512',
          3: '#141A18',
          4: '#1A2220',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        cairo: ['"Cairo"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
