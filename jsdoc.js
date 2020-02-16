module.exports = {
  "tags": {
    "allowUnknownTags": true,
    "dictionaries": ["jsdoc"],
  },
  "source": {
    "include": ["./src/vdn", "README.md"],
    "includePattern": ".js$",
  },
  "opts": {
    "template": "./src/third-party/jsdoc-template-master",
    "encoding": "utf8",
    "destination": "./docs",
    "recurse": true,
  },
  "templates": {
    "referenceTitle": "vdn",
    "disableSort": false,
    "collapse": false,
    "default": {
      "outputSourceFiles": false,
    },
  }
}
