/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#eef9ff",
          100: "#d8f1ff",
          200: "#afe3ff",
          300: "#76ceff",
          400: "#37b2ff",
          500: "#0f97ff",
          600: "#0078db",
          700: "#005faa",
          800: "#094f87",
          900: "#0e436f",
        },
      },
      boxShadow: {
        glass: "0 10px 40px rgba(15, 23, 42, 0.18)",
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at top left, rgba(15, 151, 255, 0.28), transparent 30%), radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.18), transparent 24%), radial-gradient(circle at bottom right, rgba(56, 189, 248, 0.16), transparent 28%)",
      },
    },
  },
  plugins: [],
};

