/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dancing: ["Dancing Script", "cursive"],
      },
    },
    colors: {
      primary: "#222831",
      secondary: "#FFBE33",
      secondaryDark: "#ffae00",
      bg: "#FFFFFF",
      bgDark: "#F1F2F3",
      txtLight: "#FFFFFF",
      txtDark: "#0C0C0C",
      error: "#f1512e",
    },
  },
  plugins: [],
};
