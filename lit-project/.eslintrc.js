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
    "@eslint-plugin-cem/rules"
  ],
  overrides: [
    {
      files: ["**/*.html","**/*.ts"],
      // parser: "@html-eslint/parser",
      parser: "@eslint-plugin-cem/parser",
    },
  ],
  rules: {
    ...cemes
  }
}
