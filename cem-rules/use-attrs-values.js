const {BEST_PRACTICE} = require("./rule-category");
module.exports = {
  meta: {
    type: 'code',
    docs: {
      description: 'Enforce specific attribute values for custom elements',
      category: BEST_PRACTICE,
      recommended: false,
    },
    fixable: null,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          tag: {
            type: 'string',
          },
          attr: {
            type: 'string',
          },
          values: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
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

      tagOptions.forEach(({ tag, attr, values }) => {
        const attributeValue = attributes.find(
          (attribute) => attribute.key && attribute.key.value === attr
        )?.value?.value

        if (!values.includes(attributeValue)) {
          context.report({
            node,
            message: `Invalid value "${attributeValue}" for "${attr}" attribute in "${tag}" element. Valid values are: ${values.join(', ')}`,
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
