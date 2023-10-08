/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },

    extend: {
      width: {
        "5/12": "47.5%",
      },
      colors: {
        pizza: "#123456",
        "yellow-300": "#90a955",
        "bg-yellow-300": "#90a955",
        "yellow-400": "#90a955",
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
