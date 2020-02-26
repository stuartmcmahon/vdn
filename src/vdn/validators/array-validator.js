const AnyValidator = require('./any-validator')
const Result = require('./result')

// Note: Rules are in order of evaluation.
const _rules = [
  {
    name: 'type',
    run(value, schema, state) {
      if (value === undefined) {
        // Optional value, skip remaining rules.
        return Result.stop();
      }

      if (!Array.isArray(value)) {
        state.error(schema.message || '{{name}} is not an array.', `array.${this.name}`);
        return Result.stop();
      }
    },
  },

  {
    name: 'length',
    run(value, schema, state) {
      const length = schema['value'];
      if (value.length != length) {
        state.error(schema.message || `{{name}} length is not ${length}.`, `array.${this.name}`);
        return Result.stop();
      }
    },
  },

  {
    name: 'minLength',
    run(value, schema, state) {
      const minLength = schema['value'];
      if (value.length < minLength) {
        state.error(schema.message || `{{name}} is shorter than ${minLength}.`, `array.${this.name}`);
        return Result.stop();
      }
    },
  },

  {
    name: 'maxLength',
    run(value, schema, state) {
      const maxLength = schema['value'];
      if (value.length > maxLength) {
        state.error(schema.message || `{{name}} is longer than ${maxLength}.`, `array.${this.name}`);
        return Result.stop();
      }
    },
  },

  {
    name: 'items',
    run(value, schema, state) {
      const items = schema['value'];
      const newValue = [];

      // Iterate children.
      for (const [i, v] of value.entries()) {
        const newEntry = state.substate(i).validate(v, items);
        newValue.push(newEntry);
      }

      // Children may have been altered so return new value.
      return Result.value(newValue);
    },
  },
];

class ArrayValidator extends AnyValidator {
  constructor(rules) {
    super(_rules.concat(rules || []));
  }
}

module.exports = ArrayValidator;
