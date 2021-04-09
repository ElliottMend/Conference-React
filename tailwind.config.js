module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "enabled-green": "#0bda51",
      },
      stroke: (theme) => ({
        "enabled-green": theme("colors.enabled-green"),
      }),
      fill: (theme) => ({
        "enabled-green": theme("colors.enabled-green"),
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
