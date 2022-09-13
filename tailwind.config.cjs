/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      'tablet': '837px',
    }
  },
  
  plugins: [require("daisyui")],
};
