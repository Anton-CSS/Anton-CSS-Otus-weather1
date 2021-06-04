module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-plusplus": 0,
    "no-alert": "off",
    "no-console": "off",
    "consistent-return": "off",
    "no-param-reassign": "off",
  },
  plugins: ["jest"],
};
