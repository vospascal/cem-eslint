// https://github.com/yeonjuan/html-eslint/blob/main/docs/rules/id-naming-convention.md
// https://github.com/yeonjuan/html-eslint/blob/70366193d9adba70f34380136de345e56f305241/packages/eslint-plugin/lib/rules/no-obsolete-tags.js#L4
// https://github.com/yeonjuan/html-eslint/blob/70366193d9adba70f34380136de345e56f305241/packages/eslint-plugin/lib/rules/require-attrs.js

// https://github.com/cletusw/eslint-plugin-local-rules
// https://classic.yarnpkg.com/en/docs/cli/add/
//   yarn add --dev file:./../cem-rules

module.exports = {
  rules: {
    "require-attrs": require("./require-attrs"),
    "no-deprecated-attrs": require("./no-deprecated-attrs"),
    "no-deprecated-tags": require("./no-deprecated-tags"),
    "use-attrs-values": require("./use-attrs-values"),
  }
}
