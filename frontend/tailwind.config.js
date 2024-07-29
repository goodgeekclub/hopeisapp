/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#1C3462",
        'primary-variant': "#1F4789",
        secondary: "#FCC563",
        'secondary-variant': "#FAA425",
        error: "#C23327",
      },
      fontFamily: {
        "db-helvethaica-x-base": ['"DB Helvethaica X"', "sans-serif"],
        "db-helvethaica-x-light": ['"DB Helvethaica X Light"', "sans-serif"],
        "db-helvethaica-x-bold": ['"DB Helvethaica X Bold"', "sans-serif"],
        "db-helvethaica-x-thin": ['"DB Helvethaica X Thin"', "sans-serif"],
        "db-helvethaica-x-medium": ['"DB Helvethaica X Medium"', "sans-serif"],
      },
      screens: {
        'phone': '320px',
        'tablet': '640px'
      },
      backgroundImage: {
        'bg-name': "url('https://drive.google.com/file/d/1KnjhwrsIJpMdFhZeTSinGF5L5AjPwQXk/view?usp=drive_link')",
      }
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui")],
};
