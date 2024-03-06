const {DEPRECATED} = require("./rule-category");
const MESSAGE_IDS = {
  UNEXPECTED: "unexpected",
};

module.exports = {
  meta: {
    type: "code",
    docs: {
      description: "Dont use deprecated tags",
      category: DEPRECATED,
      recommended: true,
    },
    fixable: null,
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          tag: { type: "string" },
        },
        required: ["tag"],
        additionalProperties: false,
      },
    },
    messages: {
      [MESSAGE_IDS.UNEXPECTED]: "Unexpected use of deprecated tag <{{tag}}>",
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
      tagOptions.forEach((option) => {
        context.report({
          node,
          data: {
            tag: node.name,
          },
          messageId: MESSAGE_IDS.UNEXPECTED,
        });
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
