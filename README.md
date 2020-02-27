# vdn

Javascript validation library. Data driven schemas.

Written as a module using ES6 (ECMAScript 2015). Also uses the spread operator '...'.

## Note

THIS LIBRARY IS NOT ACTIVELY MAINTAINED. IF YOU WISH TO USE IT PLEASE BE PREPARED TO FORK AND ADD YOUR OWN FIXES/ADDITIONS.

## Install

```console
$ npm install vdn --save
```

## Usage

```js
const vdn = require('vdn');

const schema = {
  type: 'number',
  default: 42,
};

vdn.attempt(undefined, schema); // Result == 42 (default used)
vdn.attempt(3, schema);         // Result == 3 (valid)
vdn.attempt('5', schema);       // Result == 5 (string conversion)
vdn.attempt('f', schema);       // Throws ValidationError
```

Alternatively create schemas using the builder interface.

```js
const schema = vdn.number().default(42);

...
```

There is also an extended schema form that lets you override the default error message for a rule.

```js
const schema = {
  type: {
    value: 'number',
    message: '{{name}} is not a number.',
  },
  default: 42,
};
```

Because of this you MUST use the extended form when passing an object type as a value, eg:

```js
const schema = {
  type: 'number',
  default: {
    value: {}, // Default is empty object.
  }
};
```

```js
const schema = {
  type: 'number',
  default: {} // Error, invalid schema.
};
```

## Documentation


