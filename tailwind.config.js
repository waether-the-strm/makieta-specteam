/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Poppins", "sans-serif"],
        heading: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [typography()],
};
