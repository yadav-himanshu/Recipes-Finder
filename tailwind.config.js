import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: "#f97316", // orange-500
        primaryHover: "#ea580c", // orange-600
        background: "#fbfaf8",
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(0,0,0,0.05)",
        card: "0 4px 20px -5px rgba(0,0,0,0.06)",
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
};
