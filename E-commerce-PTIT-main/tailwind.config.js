/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300x": "1300px",
        "400px": "400px",
      },
      backgroundImage: {
        1: "linear-gradient(135deg,rgba(255,255,255,0.85),rgba(255,255,255,0.8))",
        2: "radial-gradient(50% 50% at 50% 50%, rgb(97 21 246 / 20%) 0%, rgba(246, 99, 21, 0) 100%);",
        3: "radial-gradient(71.29% 71.29% at 50.41% 50.41%, rgba(246, 99, 21, 0) 0%, rgb(21 109 246 / 60%) 100%)",
        4: "radial-gradient(50.73% 50.73% at 50.46% 49.27%,#fbc1a1 0%,rgba(251,193,161,0) 100%)",
        5: "linear-gradient(135deg,rgba(255,255,255,0.9) 0%,rgba(255,255,255,0.8) 100%)",
        6: "radial-gradient(833.15% 200.44% at 123.26% 253.01%, rgb(21 68 246) 0%, rgba(246, 99, 21, 0) 100%)",
        sale: "url('https://fbshop.vn/template/assets/images/icon-sale.svg')",
        banner:
          "url('https://static.vecteezy.com/system/resources/previews/006/730/227/large_2x/cream-white-badminton-shuttlecock-and-racket-with-neon-light-shading-on-green-floor-in-indoor-badminton-court-blurred-badminton-background-copy-space-free-photo.jpg')",
      },
      zIndex: {
        1: 1,
        "-1": -1,
      },
    },
    boxShadow: {
      headerShadow: "0 1rem 3rem 0 rgba(0,0,0,.1)",
      1: "0 1px 4px rgba(0,0,0,0.08)",
      2: "0 0.8rem 2.4rem 0 rgba(0,0,0,.1)",
      3: "-2px 0 3px 0 #fafafa",
    },
  },
  plugins: [],
};
