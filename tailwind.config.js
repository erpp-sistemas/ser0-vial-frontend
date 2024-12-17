/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          background: '#f9fafb',
          text: '#111827',
        },
        dark: {
          background: '#1f2937',
          text: '#f9fafb',
        },
      },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
};
