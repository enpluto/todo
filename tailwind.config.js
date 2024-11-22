/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/**/*.{html,js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        background: "#FFD370",
        lightGray: "#EFEFEF",
        darkGray: "#9F9A91",
      },
      borderRadius: {
        custom: "10px",
      },
      fontFamily: {
        baloo: ["'Baloo Thambi 2'", "system-ui"],
      },
      boxShadow: {
        custom: "0 0 15px 0 rgb(0 0 0 / 0.15)",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(172.7deg, #FFD370 5.12%, #FFD370 53.33%, #FFD370 53.44%, #FFFFFF 53.45%, #FFFFFF 94.32%)",
      },
    },
  },
  plugins: [],
};
