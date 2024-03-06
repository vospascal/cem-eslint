
import {parse} from 'comment-parser';
import {getTsProgram, expandTypesPlugin} from "./expandTypesTSPlugin.mjs";
import {customElementEslintPlugin} from "./customElementEslintPlugin.mjs";

function noDash(string) {
  return string.replace(/^\s?-/, '').trim();
}

// https://github.com/GovTechSG/sgds-web-component/blob/5507171ebd23eae3c5db233035406298c41b066c/custom-elements-manifest.config.mjs
export function customTags() {
  return {
    name: 'custom-tags',
    analyzePhase({ts, node, moduleDoc}) {
      switch (node.kind) {
        case ts.SyntaxKind.ClassDeclaration: {
          const className = node.name.getText();
          const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);
          const customTags = ['aria-rules', 'deprecated-attribute','dependency'];
          let customComments = '/**';

          node.jsDoc?.forEach(jsDoc => {
            jsDoc?.tags?.forEach(tag => {
              const tagName = tag.tagName.getText();

              if (customTags.includes(tagName)) {
                customComments += `\n * @${tagName} ${tag.comment}`;
              }
            });
          });

          // This is what allows us to map JSDOC comments to ReactWrappers.
          classDoc['jsDoc'] = node.jsDoc?.map(jsDoc => jsDoc.getFullText()).join('\n');

          const parsed = parse(`${customComments}\n */`);
          parsed[0].tags?.forEach(t => {
            switch (t.tag) {
              // custom rule for aria
              case 'aria-rules':
                if (!Array.isArray(classDoc['aria-rules'])) {
                  classDoc['aria-rules'] = [];
                }
                classDoc['aria-rules'].push({
                  name: t.name,
                  description: noDash(t.description),
                });
                break;

              // custom deprecated attribute rule
              case 'deprecated-attribute':
                if (!Array.isArray(classDoc['deprecated-attribute'])) {
                  classDoc['deprecated-attribute'] = [];
                }
                classDoc['deprecated-attribute'].push({
                  name: t.name,
                  description: noDash(t.description),
                });
                break;

              // custom deprecated element rule
              case 'deprecated':
                if (!Array.isArray(classDoc['deprecated'])) {
                  classDoc['deprecated'] = [];
                }
                classDoc['deprecated'].push({
                  description: noDash(t.description),
                });
                break;

              // Dependencies
              case 'dependency':
                if (!Array.isArray(classDoc['dependencies'])) {
                  classDoc['dependencies'] = [];
                }
                classDoc['dependencies'].push(t.name);
                break;

              // All other tags
              default:
                if (!Array.isArray(classDoc[t.tag])) {
                  classDoc[t.tag] = [];
                }

                classDoc[t.tag].push({
                  name: t.name,
                  description: t.description,
                  type: t.type || undefined
                });
            }
          });
        }
      }
    }
  }
}

const typesByAliasMap = new Map()
export default {
  /** Globs to analyze */
  globs: ["src/**/*.lit.ts", "src/**/*.helper.ts"],
  /** Directory to output CEM to */
  outdir: "./",
  /** Run in dev mode, provides extra logging */
  dev: false,
  /** Run in watch mode, runs on file changes */
  watch: true,
  /** Include third party custom elements manifests */
  dependencies: true,
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
    customTags(),
    customElementEslintPlugin(),
  ],
};
