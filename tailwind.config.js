module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#0f3460", // Header background
        "secondary-color": "#16213e", // Search bar background
        "tertiary-color": "#e94560", // Accent color
      },
      backdropBlur: {
        none: "0",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")]
};