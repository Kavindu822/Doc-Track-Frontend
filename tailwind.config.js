/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBg: "#102d3b",  // Main background color
        secondaryText: "#7f7f7f",  // Text color
        borderColor: "#7f7f7f",  // Border color
      },
    },
  },
  plugins: [],
};
