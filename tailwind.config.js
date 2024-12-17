/** @type {import('tailwindcss').Config} */
const motion = await import('tailwindcss-motion');
export default {
   plugins: [motion.default],
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
  plugins: [require('tailwindcss-motion')], 
}
