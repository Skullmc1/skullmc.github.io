/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        primary: "#F2613F",
        secondary: "#9B3922",
        background: "#0C0C0C",
        surface: "#481E14",
        "squid-pink": "#FF0F7B",
        "squid-teal": "#00FFB3",
        "cyber-purple": {
          100: "#f0e6ff",
          200: "#dcd0ff",
          300: "#b69fff",
          400: "#9370ff",
          500: "#7c4dff",
          600: "#6236dd",
          700: "#4a23b7",
          800: "#341791",
          900: "#1f0d6b",
        },
        neon: {
          pink: "#ff00ff",
          blue: "#00f3ff",
          purple: "#b026ff",
        },
        game: {
          dark: "#0C0C0C",
          surface: "#481E14",
          secondary: "#9B3922",
          primary: "#F2613F",
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "cursive"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(10px, 10px) rotate(2deg)" },
          "50%": { transform: "translate(0, 20px) rotate(-1deg)" },
          "75%": { transform: "translate(-10px, 10px) rotate(1deg)" },
        },
      },
      animation: {
        "float-slow": "float 20s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
