/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        'white': '5px 4px 6px 2px rgb(255 255 255 / 0.1), 5px 2px 4px 2px rgb(255 255 255 / 0.1)'
      }
    },
    screens: {
      'tablet' : '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },

  },
  plugins: [],
}

