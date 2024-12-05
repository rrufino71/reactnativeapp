/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        customColor1: {
          back: "#c0c5ca",
          title: "white",
          labels: "black",
          inputs: "grey",
        },
        customColor2: {
          DEFAULT: "#10b981",
          light: "#6ee7b7",
          dark: "#047857",
          back: "#6ee7b7",
          texto: "white",
        },
        customColor3: {
          DEFAULT: "#ee011e",
          light: "#f37281",
          dark: "#850b1a",
        },
        customcolor4: {
          DEFAULT: "#c9c1c1",
          light: "#dddada",
          dark: "#5b5b5b",
        },
        customColor5: {
          DEFAULT: "#fefefe ",
          light: "#f6eeee",
        },
      },
    },
  },

  plugins: [],
};
