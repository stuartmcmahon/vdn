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

      // Allow conversion from other types.
      const coerced = Number(value);
      
      if (Number.isNaN(coerced)) {
        state.error(schema.message || '{{name}} is not a number.', `number.${this.name}`);
        return Result.stop();
      }

      return Result.value(coerced);
    },  
  },

  {
    name: 'integer',
    run(value, schema, state) {
      const wantInteger = schema['value'];
      const isInteger = Number.isInteger(value);
      if (wantInteger) {
        if (!isInteger) {
          state.error(schema.message || '{{name}} is not an integer.', `number.${this.name}`);
          return Result.stop();
        }
      } else {
        if (isInteger) {
          state.error(schema.message || '{{name}} is an integer.', `number.${this.name}`);
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
        state.error(schema.message || `{{name}} is less than ${minValue}.`, `number.${this.name}`);
        return Result.stop();
      }
    },
  },

  {
    name: 'max',
    run(value, schema, state) {
      const maxValue = schema['value'];
      if (value > maxValue) {
        state.error(schema.message || `{{name}} is greater than ${maxValue}.`, `number.${this.name}`);
        return Result.stop();
      }
    },
  },
];

/**
 * Validates numbers.
 * @extends AnyValidator
 * @hideconstructor
 */
class NumberValidator extends AnyValidator {
  /**
   * The constructor.
   * @description Some stuff.
   * @param {Object} rules - Some rules.
   */
  constructor(rules) {
    super(_rules.concat(rules || []));
  }
}

module.exports = NumberValidator;
