const AnyValidator = require('./any-validator')
const Result = require('./result')

// Enforce multi-domain segments?
// const _emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Note: This version allows single domain segments eg. 'test@localhost'.
const _digitsRegExp = /^\d+$/;
const _emailRegExp = /^[^\s@]+@[^\s@]+$/;
const _hexRegExp = /^[0-9a-fA-F]+$/;

// Note: Rules are in order of evaluation.
const _rules = [
  {
    name: 'type',
    run(value, schema, state) {
      if (value === undefined) {
        // Optional value, skip remaining rules.
        return Result.stop();
      }

      if (typeof value !== 'string') {
        state.error(schema.message || '{{name}} is not a string.', `string.${this.name}`);
        return Result.stop();
      }
    },
  },
  
  {
    name: 'digits',
    run(value, schema, state) {
      const wantDigits = schema['value'];
      const isDigits = _digitsRegExp.test(value);
      if (wantDigits) {
        if (!isDigits) {
          state.error(schema.message || `{{name}} must be digits only.`, `string.${this.name}`);
          return Result.stop();
        }
      } else {
        if (isDigits) {
          state.error(schema.message || `{{name}} must not be digits only.`, `string.${this.name}`);
          return Result.stop();
        }
      }
    },
  },
  
  {
    name: 'email',
    run(value, schema, state) {
      const wantEmail = schema['value'];
      const isEmail = _emailRegExp.test(value);
      if (wantEmail) {
        if (!isEmail) {
          state.error(schema.message || `{{name}} is not a valid email.`, `string.${this.name}`);
          return Result.stop();
        }
      } else {
        if (isEmail) {
          state.error(schema.message || `{{name}} is a valid email.`, `string.${this.name}`);
          return Result.stop();
        }
      }
    },
  },
  
  {
    name: 'hex',
    run(value, schema, state) {
      const wantHex = schema['value'];
      const isHex = _hexRegExp.test(value);
      if (wantHex) {
        if (!isHex) {
          state.error(schema.message || `{{name}} is not hexadecimal.`, `string.${this.name}`);
          return Result.stop();
        }
      } else {
        if (isHex) {
          state.error(schema.message || `{{name}} is hexadecimal.`, `string.${this.name}`);
          return Result.stop();
        }
      }
    },
  },

  { 
    name: 'length',
    run(value, schema, state) {
      const length = schema['value'];
      if (value.length != length) {
        state.error(schema.message || `{{name}} length is not ${length}.`, `string.${this.name}`);
        return Result.stop();
      }
    },
  },

  {
    name: 'maxLength',
    run(value, schema, state) {
      const maxLength = schema['value'];
      if (value.length > maxLength) {
        state.error(schema.message || `{{name}} is longer than ${maxLength}.`, `string.${this.name}`);
        return Result.stop();
      }
    },
  },

  { 
    name: 'minLength',
    run(value, schema, state) {
      const minLength = schema['value'];
      if (value.length < minLength) {
        state.error(schema.message || `{{name}} is shorter than ${minLength}.`, `string.${this.name}`);
        return Result.stop();
      }
    },
  },

  {
    name: 'notEmpty',
    run(value, schema, state) {
      const wantNotEmpty = schema['value'];
      const isEmpty = value.length === 0;
      if (wantNotEmpty) {
        if (isEmpty) {
          state.error(schema.message || `{{name}} is empty.`, `string.${this.name}`);
          return Result.stop();
        }
      } else {
        if (!isEmpty) {
          state.error(schema.message || `{{name}} is not empty.`, `string.${this.name}`);
          return Result.stop();
        }
      }
    },
  },

  {
    name: 'regExp',
    run(value, schema, state) {
      const regExp = schema['value'];
      if (!regExp.test(value)) {
        state.error(schema.message || `{{name}} does not match ${regExp.toString()}.`, `string.${this.name}`);
        return Result.stop();
      }
    },
  },
];

/**
 * Validates strings.
 * @extends AnyValidator
 * @hideconstructor
 */
class StringValidator extends AnyValidator {
  constructor(rules) {
    super(_rules.concat(rules || []));
  }
}

module.exports = StringValidator;
