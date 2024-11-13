/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      xsm: '0px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
  },
  plugins: [],
};
