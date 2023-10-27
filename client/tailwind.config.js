/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    spinner: (theme) => ({
      default: {
        color: '#dae1e7', // color you want to make the spinner
        size: '1em', // size of the spinner (used for both width and height)
        border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '500ms', // the speed at which the spinner should rotate
      }}),
    extend: {
      colors:{
        'blueColor':'#2a68ff',
        'grewIsh' : '#f1f4f8',
        'CardShasow':'#f7f8f9',
        'textColor' :'#252b36'
      }
    },
  },
  variants: { // all the following default to ['responsive']
    spinner: ['responsive'],
  },
  plugins: [
    require("tw-elements/dist/plugin.cjs"),
    require('tailwindcss-spinner')({ className: 'spinner', themeKey: 'spinner' })
  ],
  darkMode: "class"
}