var cemes;
// if file not generated yet, use empty object else eslint cries
try {cemes = require("./custom-elements-eslint-rules.js");} catch(error) {cemes = {};}

module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es2021": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "html",
    "@typescript-eslint",
    "cem"
  ],
  overrides: [
    {
      files: ["**/*.html","**/*.ts"],
      parser: "@html-eslint/parser",
    },
  ],
  rules: {
    ...cemes
  }
}
