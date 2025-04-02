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
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "500px",
        xl: "1280px",
        "2xl": "1536px",
        'ultrawide': '3440px',
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    plugin({ nocompatible: true })
  ]
};