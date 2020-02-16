module.exports = {
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": 9, // For spread operator.
    "sourceType": "module",
  },
  "env": {
    "es6": true, // For 'Map' global.
    "node": true, // For 'module.exports'.
  },
  "rules": {
    "require-atomic-updates": 0, // Disable broken eslint rule.
  },
  "overrides": [{ 
    "files": "test/**",
    "rules": { // Relaxed rules for test code.
      "node/no-unpublished-require": 0,
      "node/no-missing-require": 0,
      "no-console": 0,
    },
  }],
};
