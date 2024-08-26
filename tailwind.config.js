/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,html}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [
    require('tw-elements/dist/plugin'),
    require('daisyui')
  ],
  daisyui: {
    themes: ['light']
  }
};
