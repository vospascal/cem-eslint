import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export function customElementEslintPlugin(options) {
  const {
    from = join(dirname(fileURLToPath(import.meta.url))),
    to = options?.fileName ?? 'custom-elements-eslint-rules.js',
  } = options ?? {};

  return {
    name: 'customElementEslintPlugin',
    packageLinkPhase({ customElementsManifest }) {
      const outPath = join(from, to);
      try {
        const rules = customElementsEslint(customElementsManifest, {...options });
        mkdirSync(dirname(outPath), { recursive: true });
        const content = `module.exports = ${JSON.stringify(rules, null, 2)};`;
        writeFileSync(outPath, content);
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    },
  };
}

function transformArrayToObject(array) {
  const result = {};

  for (const item of array) {
    for (const key in item) {
      result[key] = item[key];
    }
  }

  return result;
}

export function customElementsEslint(manifest, options) {
  const tree = manifest.modules
      .flatMap(x => makeRules(x, options))
      .filter(x => x)

  return transformArrayToObject(tree)
}


function filteredcustomElement(declarationsToFilter) {
  return declarationsToFilter.filter((decl) => {
    if(decl && decl.customElement){
      return decl
    }
    return
  });

}

function makeAriaRules(decl, options) {
  if (!decl?.['aria-rules']) return [];

  const rules = []

  decl['aria-rules'].forEach((rule) => {
    rules.push({
      tag: decl.tagName,
      attr: `aria-${rule.name}`,
    })
  })

  return [
    {
      "uc-rules/require-attrs": [
        "error",
        ...rules,
      ],
    }
  ];
}

function makeDeprecatedAttributeRules(decl, options) {
  if (!decl?.['deprecated-attribute']) return [];

  const rules = []

  decl['deprecated-attribute'].forEach((rule) => {
    rules.push({
      tag: decl.tagName,
      attr: rule.name,
    })
  })

  return [
    {
      "uc-rules/no-deprecated-attrs": [
        "error",
        ...rules,
      ],
    }
  ];
}

function makeDeprecatedElementRules(decl, options) {
  if (!decl?.['deprecated']) return [];

  const rules = []

  rules.push({
    tag: decl.tagName,
  })

  return [
    {
      "uc-rules/no-deprecated-tags": [
        "error",
        ...rules,
      ],
    }
  ];
}

function getType(text) {
  // todo think of more cases
  if(text.includes('|')){
    return text.split(' | ').map(item => item.replace(/'/g, ''));
  }
  if(text.includes('}')){

  }
}

function makeAttribtuteValueRules(decl, options) {
  if (!decl?.attributes) return [];

  const rules = []

  decl['attributes'].forEach((rule) => {
    const types = [null, undefined, 'string', 'boolean', 'number', 'array', 'object', 'function', 'symbol', 'any', 'unknown', 'never', 'void', 'null', 'undefined', 'bigint', 'intrinsic']
    if(types.includes(rule?.type?.text)) return

    rules.push({
      tag: decl.tagName,
      attr: rule.name,
      values: getType(rule.type.text),
    })
  })

  if(rules.length === 0) return []
  return [
    {
      "uc-rules/use-attrs-values": [
        "error",
        ...rules,
      ],
    }
  ];
}

function makeRules(mod, options) {
  const declarations = mod?.declarations ?? [];

  return [
    ...(filteredcustomElement(declarations).flatMap(decl => {

      return [
        ...makeAriaRules(decl, options),
        ...makeDeprecatedAttributeRules(decl, options),
        ...makeDeprecatedElementRules(decl, options),
        ...makeAttribtuteValueRules(decl, options),
      ]

    })),
  ]
}
