/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Josefin Sans", "sans-serif"],
        header: ["Crimson Text", "serif"],
        logo: ["Henny Penny", "cursive"],
        logo_bold: ["Montserrat", "sans-serif"],
      },
      colors: {
        base_color: "#4FB735",
        light: "#6CC357",
        dark: "#10250B",
        extra_light: "#DCF1D7",
        secondary_extra_light: "#D8E6EB",
        secondary_light: "#7DACBE",
        secondary_base: "#7DACBE",
      },
      fontSize: {
        "3xl": "28px",
      },
      borderRadius: {
        "2xl": "20px",
      },
    },
  },
  plugins: [],
};
