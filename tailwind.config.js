/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/**/*.{html,js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        background: "#FFD370",
      },
      borderRadius: {
        custom: "10px",
      },
      fontFamily: {
        baloo: ["'Baloo Thambi 2'", "system-ui"],
      },
      // screens: {
      //   sm: "376px",
      // },
    },
  },
  plugins: [],
};
