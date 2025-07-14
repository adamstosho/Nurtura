/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0066CC",
        'primary-light': '#338FE6',
        'primary-dark': '#004A99',
        secondary: "#33B864",
        'secondary-light': '#5CD38A',
        'secondary-dark': '#24994B',
        accent: "#FFA500",
        'accent-light': '#FFB733',
        'accent-dark': '#CC8400',
        surface: "#F8FAFC",
        'surface-dark': '#F1F5F9',
        'surface-light': '#FFFFFF',
        'text-primary': "#1A1A1A",
        'text-muted': "#667085",
        error: "#D92D20",
        'background': '#F4F6FB',
        'navbar': '#FFFFFF',
        'card': '#FFFFFF',
        'border': '#E5E7EB',
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Inter", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        card: "0 4px 16px rgba(0, 0, 0, 0.06)",
        modal: "0 10px 40px rgba(0, 0, 0, 0.18)",
        navbar: "0 2px 8px rgba(0, 0, 0, 0.04)",
        input: "0 1px 2px rgba(0,0,0,0.03)",
      },
      transitionProperty: {
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
