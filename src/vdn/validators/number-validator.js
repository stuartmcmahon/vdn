const AnyValidator = require('./any-validator');
const Result = require('./result');

const _type = 'number';

// Note: Rules are in order of evaluation.
const _rules = [
  {
    name: 'type',
    run(value, schema, state) {
      if (value === undefined) {
        // Optional value, skip remaining rules.
        return Result.stop();
      }

      // Allow conversion from other types.
      const coerced = Number(value);
      
      if (Number.isNaN(coerced)) {
        state.error(schema.message || '{{name}} is not a number.', `${_type}.${this.name}`);
        return Result.stop();
      }

      return Result.value(coerced);
    },  
  },

  {
    name: 'integer',
    run(value, schema, state) {
      const { value:wantInteger=true } = schema;
      const isInteger = Number.isInteger(value);
      if (wantInteger) {
        if (!isInteger) {
          state.error(schema.message || '{{name}} is not an integer.', `${_type}.${this.name}`);
          return Result.stop();
        }
      } else {
        if (isInteger) {
          state.error(schema.message || '{{name}} is an integer.', `${_type}.${this.name}`);
          return Result.stop();
        }
      }
    },
  },
  
  {
    name: 'min',
    run(value, schema, state) {
      const minValue = schema['value'];
      if (value < minValue) {
        state.error(schema.message || `{{name}} is less than ${minValue}.`, `${_type}.${this.name}`);
        return Result.stop();
      }
    },
  },

  {
    name: 'max',
    run(value, schema, state) {
      const maxValue = schema['value'];
      if (value > maxValue) {
        state.error(schema.message || `{{name}} is greater than ${maxValue}.`, `${_type}.${this.name}`);
        return Result.stop();
      }
    },
  },
];

class NumberValidator extends AnyValidator {
  constructor(rules) {
    super(_rules.concat(rules || []));
  }
}

module.exports = NumberValidator;
