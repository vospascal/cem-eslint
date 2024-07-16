# cem-eslint


- `pnpm install` in the lit-project dir
- `pnpm cem` in the lit-project dir to run cem analyze
    - here the eslint rules are created and the cem-rules folder installed.
    - usage is based currently on `@html-eslint/parser` [github html-eslint](https://github.com/yeonjuan/html-eslint/tree/main/packages/eslint-plugin)
- `pnpm lint`  in the lit-project dir to run eslint to view errors in the console
- open the `index.html` file in the lit-project dir to view errors in the editor

if your using eslint plugin it will underline the problems 

more inspiration https://github.com/github/eslint-plugin-github/blob/main/lib/rules/unescaped-html-literal.js

after having the discussion with [Burton Smit](https://github.com/break-stuff) he picked this up further:
- https://github.com/break-stuff/cem-tools/tree/main/packages/eslint-rules
- https://github.com/break-stuff/cem-tools/tree/main/packages/eslint-plugin

for more awesome CEM based tools see his repository https://github.com/break-stuff/cem-tools
