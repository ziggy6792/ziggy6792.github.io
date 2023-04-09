module.exports = {
  plugins: [
    require("prettier-plugin-go-template"),
    require("prettier-plugin-tailwindcss"),
  ],
  overrides: [
    {
      files: ["*.html"],
      options: {
        parser: "go-template",
      },
    },
  ],
};
