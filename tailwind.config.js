/** @type {import('tailwindcss').Config} */
import motion from 'tailwindcss-motion'; // ES Module import works here

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#1E40AF",
        "main-color": "#10B981", 
        overlay: "#0F172A", 
      },
    },
  },
  plugins: [motion], // Use the imported plugin directly
};
