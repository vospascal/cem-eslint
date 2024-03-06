module.exports = {
  "cem-rules/require-attrs": [
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
  "cem-rules/no-deprecated-attrs": [
    "error",
    {
      "tag": "my-element",
      "attr": "size"
    }
  ],
  "cem-rules/no-deprecated-tags": [
    "error",
    {
      "tag": "my-element"
    }
  ],
  "cem-rules/use-attrs-values": [
    "error",
    {
      "tag": "my-element",
      "attr": "size",
      "values": [
        "medium",
        "large"
      ]
    },
    {
      "tag": "my-element",
      "attr": "kind",
      "values": [
        "c-3po",
        "r2d2",
        "yoda",
        "jedi",
        "sith",
        "bb8"
      ]
    }
  ]
};