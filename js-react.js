module.exports = {
  parser: "@babel/eslint-parser",
  extends: ["airbnb", "airbnb/hooks", "plugin:import/errors", "plugin:import/warnings", "prettier"],
  env: {
    node: true,
    browser: true,
  },
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "no-underscore-dangle": "off",
    "import/prefer-default-export": "off",
  },
};
