/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#00F2FF",
        "bg-primary": "#05070A",
        "bg-secondary": "#0F172A",
        "text-primary": "#FFFFFF",
        "text-secondary": "#94A3B8",
      },
      fontFamily: {
        "display": ["Kanit", "IBM Plex Sans Thai", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "card": "16px",
        full: "9999px",
      },
      boxShadow: {
        "neon": "0 0 20px rgba(0, 242, 255, 0.3)",
        "neon-lg": "0 0 40px rgba(0, 242, 255, 0.5)",
        "neon-sm": "0 0 10px rgba(0, 242, 255, 0.2)",
      },
    },
  },
  plugins: [],
}
