/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors:{
        'blueColor':'#2a68ff',
        'grewIsh' : '#f1f4f8',
        'CardShasow':'#f7f8f9',
        'textColor' :'#252b36'
      }
    },
  },
  plugins: [
    require("tw-elements/dist/plugin.cjs"),
    require('flowbite/plugin'),
  ],
  darkMode: "class"
}