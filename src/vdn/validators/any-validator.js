const BaseValidator = require('./base-validator')
const Result = require('./result')

const _type = 'any';

// Note: Rules are in order of evaluation.
const _rules = [
  {
    name: 'default',
    run(value, schema) {
      if (value === undefined) {
        // Note: Default value might be 'undefined' too.
        const newValue = schema['value'];
        return Result.value(newValue);
      }
    },
  },

  {
    name: 'required',
    run(value, schema, state) {
      if (value === undefined) {
        // TODO: Allow 'undefined' as well (ie. use 'notSet' value instead)?
        const isRequired = schema['value'];
        if (isRequired) {
          state.error(schema.message || '{{name}} is required.', `${_type}.${this.name}`);
          return Result.stop();
        }
      }
    },
  },

  {
    name: 'type',
    run(value) {
      if (value === undefined) {
        // Optional value, skip remaining rules.
        return Result.stop();
      }

      // Note: Any type is fine.
    },
  },

  {
    name: 'valid',
    run(value, schema, state) {
      // TODO: Use Set.has() instead of Array.indexOf() for speed? Options:
      // 1. Enforce 'Set' usage - schema will no longer be valid JSON.
      // 2. Allow either type in here.
      // 3. Add freeze()/optimise() function to convert schemas at run time.
      const options = schema['value'];
      if (options.indexOf(value) === -1) {
        state.error(schema.message || `{{name}} value is not valid.`, `${_type}.${this.name}`);
        return Result.stop();
      }
    },
  },

  {
    name: 'invalid',
    run(value, schema, state) {
      // TODO: Use Set.has() instead of Array.indexOf() for speed? Options:
      // 1. Enforce 'Set' usage - schema will no longer be valid JSON.
      // 2. Allow either type in here.
      // 3. Add freeze()/optimise() function to convert schemas at run time.
      const options = schema['value'];
      if (options.indexOf(value) !== -1) {
        state.error(schema.message || `{{name}} value is invalid.`, `${_type}.${this.name}`);
        return Result.stop();
      }
    },
  },
];

class AnyValidator extends BaseValidator {
  constructor(rules) {
    super(_rules.concat(rules || []));
  }
}

module.exports = AnyValidator;
