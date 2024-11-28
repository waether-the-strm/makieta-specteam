/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.css",
    "./src/styles/**/*.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [typography()],
};
