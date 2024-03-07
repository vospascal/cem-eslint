/**
 * @typedef {import("../types").Rule} Rule
 */
const {BEST_PRACTICE} = require("./rule-category");


const MESSAGE_IDS = {
  MISSING: "missing",
  UNEXPECTED: "unexpected",
};

/**
 * @type {Rule}
 */
module.exports = {
  meta: {
    type: "code",

    docs: {
      description: "Require specified attribute",
      category: BEST_PRACTICE,
      recommended: false,
    },
    fixable: null,
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          tag: { type: "string" },
          attr: { type: "string" },
          value: { type: "string" },
        },
        required: ["tag", "attr"],
        additionalProperties: false,
      },
    },
    messages: {
      [MESSAGE_IDS.MISSING]: "Missing '{{attr}}' attribute for '{{tag}}' tag",
      [MESSAGE_IDS.UNEXPECTED]:
        "Unexpected '{{attr}}' attribute value. '{{expected}}' is expected",
    },
  },

  create(context) {
    const options = context.options || [];
    const tagOptionsMap = new Map();

    options.forEach((option) => {
      const tagName = option.tag.toLowerCase();
      if (tagOptionsMap.has(tagName)) {
        tagOptionsMap.set(tagName, [...tagOptionsMap.get(tagName), option]);
      } else {
        tagOptionsMap.set(tagName, [option]);
      }
    });

    function check(node, tagName) {
      const tagOptions = tagOptionsMap.get(tagName);
      const attributes = node.attributes || [];

      tagOptions.forEach((option) => {
        const attrName = option.attr;
        const attr = attributes.find(
          (attr) => attr.key && attr.key.value === attrName
        );
        if (!attr) {
          context.report({
            messageId: MESSAGE_IDS.MISSING,
            node,
            data: {
              attr: attrName,
              tag: tagName,
            },
          });
        }
      });
    }

    return {
      [["StyleTag", "ScriptTag"].join(",")](node) {
        const tagName = node.type === "StyleTag" ? "style" : "script";
        if (!tagOptionsMap.has(tagName)) {
          return;
        }
        check(node, tagName);
      },
      Tag(node) {
        const tagName = node.name.toLowerCase();
        if (!tagOptionsMap.has(tagName)) {
          return;
        }
        check(node, tagName);
      },
//       Literal(node) {
//         if (typeof node.value === 'string') {
//           // Check if the string looks like an HTML tag and apply some basic validation
//           // Note: This is a simplified check and might need adjustments
//           const tagMatch = node.value.match(/^<(\w+)(\s|>)/);
//           if (tagMatch) {
//             console.log(tagName,'tagName')
//             const tagName = tagMatch[1].toLowerCase();
//             check(node, tagName);
//           }
//         }
//       },
// TemplateLiteral(node) {
//         node.quasis.forEach((quasi) => {
//           if (typeof quasi.value.raw === 'string') {
//             const tagMatch = quasi.value.raw.match(/^<(\w+)(\s|>)/);
//             if (tagMatch) {
//               const tagName = tagMatch[1].toLowerCase();
//               console.log(tagName,'tagName')
//               check(node, tagName);
//             }
//           }
//         });
//       },
    };
  },
};
