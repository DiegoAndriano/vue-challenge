/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}", "./src/*.{html,js,vue}"],
  theme: {
    extend: {
      transitionProperty: {
        DEFAULT:
          "padding, box-shadow,background-color, border-color, color, fill, stroke, opacity, transform",
        spacing: "padding",
      },
      colors: {
        app: {
          text: "#374151",
          main: "#526e94",
          accent: "#f4f2d9",
          mute: "#9ca3af",
          reverse: "#fefefe",
        },
      },
    },
  },
  plugins: [],
  variants: {
    padding: ["hover", "focus", "responsive"],
    cursor: ["hover", "focus", "responsive"],
  },
};
