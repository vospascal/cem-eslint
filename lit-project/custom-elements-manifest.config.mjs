
import {parse} from 'comment-parser';
import {getTsProgram, expandTypesPlugin} from "./expandTypesTSPlugin.mjs";
import {customElementEslintPlugin} from "./customElementEslintPlugin.mjs";
import { customJSDocTagsPlugin } from "cem-plugin-custom-jsdoc-tags";
import {customElementVsCodePlugin} from "custom-element-vs-code-integration";
import {customElementJetBrainsPlugin} from "custom-element-jet-brains-integration";

function noDash(string) {
  return string.replace(/^\s?-/, '').trim();
}


const typesByAliasMap = new Map()
export default {
  /** Globs to analyze */
  globs: ["src/**/*.lit.ts"],
  /** Directory to output CEM to */
  outdir: "./",
  /** Run in dev mode, provides extra logging */
  dev: false,
  /** Run in watch mode, runs on file changes */
  watch: true,
  /** Include third party custom elements manifests */
  dependencies: false,
  /** Output CEM path to `package.json`, defaults to true */
  packagejson: true,
  /** Enable special handling for litelement */
  litelement: true,
  /** Provide custom plugins */


  overrideModuleCreation: ({ts, globs}) => {
    const program = getTsProgram(ts, globs, "tsconfig.json");
    return program
      .getSourceFiles()
      .filter((sf) => globs.find((glob) => sf.fileName.includes(glob)));
  },

  /** Provide custom plugins */
  plugins: [
    expandTypesPlugin(),
    customJSDocTagsPlugin({
      tags: {
        since: {},
        dependency: {
          mappedName: 'dependencies',
          isArray: true,
        },
        "aria-rules": {
          isArray: true,
        },
        "deprecated-attribute": {
          isArray: true,
        },
        "deprecated" : {}
      }
    }),
    customElementVsCodePlugin(),
    customElementJetBrainsPlugin(),
    customElementEslintPlugin(),
  ],
};
