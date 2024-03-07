module.exports = {
  "cem/require-attrs": [
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
  "cem/no-deprecated-attrs": [
    "error",
    {
      "tag": "my-element",
      "attr": "size"
    }
  ],
  "cem/use-attrs-values": [
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
  "cem/no-deprecated-tags": [
    "error",
    {
      "tag": "your-element"
    }
  ]
};