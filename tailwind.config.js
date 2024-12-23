/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
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
  safelist: [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-gray-500",
  ],
  plugins: [],
};
