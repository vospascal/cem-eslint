module.exports = {
  "uc-rules/require-attrs": [
    "error",
    {
      "tag": "my-element",
      "attr": "aria-label"
    },
    {
      "tag": "my-element",
      "attr": "aria-labelledby"
    }
  ],
  "uc-rules/no-deprecated-attrs": [
    "error",
    {
      "tag": "my-element",
      "attr": "size"
    }
  ],
  "uc-rules/no-deprecated-tags": [
    "error",
    {
      "tag": "my-element"
    }
  ],
  "uc-rules/use-attrs-values": [
    "error",
    {
      "tag": "my-element",
      "attr": "size",
      "values": [
        "medium",
        "large"
      ]
    }
  ]
};