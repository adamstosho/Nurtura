/** @type {import('tailwindcss').Config} */
const defaultConfig = require("shadcn/ui/tailwind.config")

module.exports = {
  ...defaultConfig,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        primary: "#0066CC",
        secondary: "#33B864",
        accent: "#FFA500",
        surface: "#FFFFFF",
        "text-primary": "#1A1A1A",
        "text-muted": "#667085",
        error: "#D92D20",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      borderRadius: {
        ...defaultConfig.theme.extend.borderRadius,
        "2xl": "1rem",
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.05)",
        modal: "0 10px 40px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}
