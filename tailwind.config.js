/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
      },
    },
  },
  plugins: [],
};
