/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "rich-black": "#101820",
        "vivid-yellow": "#FEE715",
        "navy-blue": "#4169E1",
        "col-zamrud": "#00A36C",
        "deep-jungle": "#07553B",
        "light-olive": "#CED46A",
      },
    },
  },
  plugins: [],
};
