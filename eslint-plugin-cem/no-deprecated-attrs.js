/**
 * @typedef {import("../types").Rule} Rule
 */
const { DEPRECATED} = require("./rule-category");

const MESSAGE_IDS = {
  UNEXPECTED: "unexpected",
};


module.exports = {
  meta: {
    type: "code",
    docs: {
      description: "Deprecated specified attribute",
      category: DEPRECATED,
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
        },
        required: ["tag", "attr"],
        additionalProperties: false,
      },
    },
    messages: {
      [MESSAGE_IDS.UNEXPECTED]:
        "Unexpected deprecated attribute '{{attr}}'",
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
        if (attr) {
          context.report({
            messageId: MESSAGE_IDS.UNEXPECTED,
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
    };
  },
};
