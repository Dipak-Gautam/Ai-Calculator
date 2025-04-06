/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-black": "#121212",
        "btn-gray": "#2a2a2c",
        "btn-orange": "#ff9f0a",
        "sec-gray": "#5c5c5f",
        "primary-blue": "#225fec",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
