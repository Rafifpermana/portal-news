/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "deep-jungle": "#07553B",
        "light-olive": "#CED46A",
      },
    },
  },
  plugins: [],
};
