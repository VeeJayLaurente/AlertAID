/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        j_bold:["Jura-Bold", "sans-serif"],
        u_bold:["Ubuntu-Bold","sans-serif"],
        u_light:["Ubuntu-Light", "sans-serif"],
        u_regular:["Ubuntu-Regular","sans-serif"],
        inter: ["Inter-Regular", "sans-serif"],
        inter_bold: ["Inter-Bold", "sans-serif"],
      }
    },
  },
  plugins: [],
}

