/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#1C3462",
        "primary-variant": "#1F4789",
        secondary: "#FCC563",
        "secondary-variant": "#FAA425",
        error: "#C23327",
      },
      fontFamily: {
        "db-helvethaica-x-base": ['"DB Helvethaica X"', "sans-serif"],
        "db-helvethaica-x-light": ['"DB Helvethaica X Light"', "sans-serif"],
        "db-helvethaica-x-bold": ['"DB Helvethaica X Bold"', "sans-serif"],
        "db-helvethaica-x-thin": ['"DB Helvethaica X Thin"', "sans-serif"],
        "db-helvethaica-x-medium": ['"DB Helvethaica X Medium"', "sans-serif"],
      },
      animation: {
        fade: "fadeIn .5s ease-in-out",
        lightup: "expand 4s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        expand: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(6)" },
        },
      },
      backgroundImage: {
        hopeone: "url('../public/images/bg/page_3_bg.png')",
        hopetwo: "url('../public/images/bg/page_4_7_bg.png') ",
        hopethree: "url('../public/images/bg/page_8_9_bg.png') ",
        hopefour: "url('../public/images/bg/page_11_31_bg.png') ",
        characblue: "url('../public/images/bg/page_33_34_blue.png') ",
        characgreen: "url('../public/images/bg/page_33_34_green.png') ",
        characorange: "url('../public/images/bg/page_33_34_orange.png') ",
        characpurple: "url('../public/images/bg/page_33_34_purple.png') ",
        characred: "url('../public/images/bg/page_33_34_red.png') ",
        characyellow: "url('../public/images/bg/page_33_34_yellow.png') ",
        hopelogin: "url('../public/images/bg/page_login_32_bg.png') ",
        hopemission: "url('../public/images/bg/page_35_bg.png') ",
        hopemoon: "url('../public/images/mission/moon.png') ",
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui")],
};
