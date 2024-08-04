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
        hopehome: "url('../public/images/bg/page_home.png')",
        hopeone: "url('../public/images/bg/page_3_bg.png')",
        hopetwo: "url('../public/images/bg/page_4_7_bg.png') ",
        hopethree: "url('../public/images/bg/page_8_9_bg.png') ",
        hopefour: "url('../public/images/bg/page_11_31_bg.png') ",
        hopefive: "url('../public/images/bg/page_10_bg.png')",
        hopesix: "url('../public/images/bg/page_32_bg.png')",
        characblue: "url('../public/images/bg/page_33_34_blue.png') ",
        characgreen: "url('../public/images/bg/page_33_34_green.png') ",
        characorange: "url('../public/images/bg/page_33_34_orange.png') ",
        characpurple: "url('../public/images/bg/page_33_34_purple.png') ",
        characred: "url('../public/images/bg/page_33_34_red.png') ",
        characyellow: "url('../public/images/bg/page_33_34_yellow.png') ",
        hopelogin: "url('../public/images/bg/page_login_32_bg.png') ",
        // brave: "url('../public/images/blue-bg-full.png')",
        // wisdom: "url('../public/images/purple-bg-full.png')",
        // planful: "url('../public/images/blue-bg-full.png')",
        // harmonious: "url('../public/images/yellow-bg-full.png')",
        // sincere: "url('../public/images/green-bg-full.png')",
        // esthetician: "url('../public/images/orange-bg-full.png')",
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui")],
};
