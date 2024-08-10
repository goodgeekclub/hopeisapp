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
        primary: 'Kanit'
      },
      animation: {
        fade: "fadeIn .5s ease-in-out",
        lightup: "expand 4s ease-in-out",
        customBounce: "customBounce 1s infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        customBounce : {
          "0%" : {
            transform: "translateY(-3%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)"
          },
          "50%" : {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)"
          }, 
          "100%" : {
            transform: "translateY(-3%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)"
          }
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
        hopemission: "url('../public/images/bg/page_35_bg.png') ",
        hopemoon: "url('../public/images/mission/moon.png') ",
        hopemissionpaper: "url('../public/images/mission/mission.png') ",
        bluedownbg: "url('../public/images/bg/blue-down-bg.png')",
        blueupbg: "url('../public/images/bg/blue-up-bg.png')",
        greendownbg: "url('../public/images/bg/green-down-bg.png')",
        greenupbg: "url('../public/images/bg/green-up-bg.png')",
        orangedownbg: "url('../public/images/bg/orange-down-bg.png')",
        orangeupbg: "url('../public/images/bg/orange-up-bg.png')",
        purpledownbg: "url('../public/images/bg/purple-down-bg.png')",
        purpleupbg: "url('../public/images/bg/purple-up-bg.png')",
        reddownbg: "url('../public/images/bg/red-down-bg.png')",
        redupbg: "url('../public/images/bg/red-up-bg.png')",
        yellowdownbg: "url('../public/images/bg/yellow-down-bg.png')",
        yellowupbg: "url('../public/images/bg/yellow-up-bg.png')",
        hopelanding: "url('../public/images/bg/page_landing_bg.png')",
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui")],
};
