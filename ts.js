module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-typescript/base",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
  ],
  rules: {
    "no-underscore-dangle": "off",
    "import/prefer-default-export": "off",
  },
  env: {
    node: true,
  },
};
