module.exports = {
  "cem-rules/require-attrs": [
    "error",
    {
      "tag": "your-element",
      "attr": "aria-label"
    },
    {
      "tag": "your-element",
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
  "cem-rules/use-attrs-values": [
    "error",
    {
      "tag": "your-element",
      "attr": "species",
      "values": [
        "human",
        "droid",
        "wookie",
        "ewok"
      ]
    }
  ],
  "cem-rules/no-deprecated-tags": [
    "error",
    {
      "tag": "your-element"
    }
  ]
};