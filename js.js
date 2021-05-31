module.exports = {
  parser: "@babel/eslint-parser",
  extends: ["airbnb-base", "plugin:import/errors", "plugin:import/warnings", "prettier"],
  env: {
    node: true,
  },
  rules: {
    "no-underscore-dangle": "off",
    "import/prefer-default-export": "off",
  },
};
