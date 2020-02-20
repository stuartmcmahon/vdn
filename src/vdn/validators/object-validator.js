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

      // TODO: Add an 'allowNull' flag?
      if (typeof value !== 'object' || value === null) {
        state.error(schema.message || '{{name}} is not an object.', `object.${this.name}`);
        return Result.stop();
      }
    },
  },

  {
    name: 'entries',
    run(value, schema, state) {
      // TODO: Add 'allowAdditional' or 'allowUnknown' flag?
      const props = schema['value'];
      const missing = { ...props };
      const newValue = {};
      let hasError = false;
  
      // Validate object properties.
      for (const key in value) {
        const match = props[key];
  
        if (match === undefined) {
          // Not found.
          state.error(`'${key}' is not allowed.`, `object.${this.name}`);
          hasError = true;
        } else {
          // Found.
          delete missing[key];
          // Validate children.
          newValue[key] = state.substate(`${key}`).validate(value[key], match);
        }
      }
  
      // Iterate missing keys.
      for (const key in missing) {
        const valueSchema = props[key];

        // Get the default for this key (may be undefined).
        newValue[key] = state.substate(`${key}`).validate(undefined, valueSchema);
      }
  
      if (hasError) {
        return Result.stop();
      }

      return Result.value(newValue);
    },
  },
];

/**
 * Validates Objects.
 * @extends AnyValidator
 * @hideconstructor
 */
class ObjectValidator extends AnyValidator {
  constructor(rules) {
    super(_rules.concat(rules || []));
  }
}

module.exports = ObjectValidator;
