module.exports = {
  content: [
    "./frontend/**/*.{js,jsx,ts,tsx}",
    "./frontend/src/**/*.{js,jsx,ts,tsx}",
    "./frontend/public/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}