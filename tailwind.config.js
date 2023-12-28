/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "primary-color-background": "var(--skyblue-50)",
        "primary-color-text": "var(--skyblue-800)",
      },
    },
  },
  plugins: [],
};