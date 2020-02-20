const AnyValidator = require('./validators/any-validator');
const ArrayValidator = require('./validators/array-validator');
const NumberValidator = require('./validators/number-validator');
const ObjectValidator = require('./validators/object-validator');
const State = require('./main/state');
const StringValidator = require('./validators/string-validator');
const Types = require('./main/types');
const ValidationError = require('./main/validation-error');

const _defaultValidators = {
  'any': new AnyValidator(),
  'array': new ArrayValidator(),
  'number': new NumberValidator(),
  'object': new ObjectValidator(),
  'string': new StringValidator(),      
};

// Convert schema wrapper classes to vanilla objects.
function _coerceSchema(schema) {
  if (typeof schema.toObject === 'function') {
    return schema.toObject();
  } else {
    return schema;
  }
}

/**
 * Runs validation.
 * @hideconstructor
 */
class VDN extends Types {
  constructor() {
    super();
    this._options = {};
    this._validators = { ..._defaultValidators };
  }

  /**
   * Attempt to validate a value against a schema.
   * @param {*} value - The value to validate.
   * @param {Object} schema - The schema to validate against.
   * @param {*} options - Unused. Possible future use.
   * @throws {ValidationError} Thrown if validation fails.
   * @returns {*} The validated value (may have been cloned).
   */
  attempt(value, schema, options) {
    const state = new State({
      context: this,
      options: { ...this._options, ...options },
    });

    // Validate the value.
    const result = state.validate(value, schema);

    // Check for errors, format them and throw.
    const errorCount = state.errors.length;
    if (errorCount) {
      const tab = '\n  ';
      const details = tab + state.errors.map(v => v.message).join(tab);
      throw new ValidationError(`Found ${errorCount} error(s):${details}`, state.errors);
    }

    return result; // Success.
  }

  /**
   * Clear defaults for a given type.
   * @param {string} type - The type to clear defaults for.
   * @example
   * vdn.clearDefaults('any')
   * vdn.clearDefaults('string')
   */
  clearDefaults(type) {
    const klass = this._validators[type].constructor;
    delete klass.classDefaults;
  }

  /**
   * Returns options used during validation.
   * Currently unused. Possible future use.
   * @type {Object}
   * @readonly
   */
  get options() {
    return this._options;
  }

  /**
   * Set options used during validation.
   * Currently unused. Possible future use.
   * @param {Object} options - The options to set.
   */
  set options(options) {
    this._options = options;
  }

  /**
   * Set validator defaults for a given 'type' string.
   * @param {string} type - The validator type.
   * @param {Object} defaults - The defaults to use.
   * @example
   * vdn.setDefaults('any', { required: true })     // All types are now required by default.
   * vdn.setDefaults('string', { required: false }) // Strings are now NOT required by default.
   */
  setDefaults(type, defaults) {
    const klass = this._validators[type].constructor;
    klass.classDefaults = defaults;
  }

  /**
   * Access the validators available.
   * @type {Object}
   * @readonly
   * @example
   * vdn.validators.any    // Access the 'any' type validator.
   * vdn.validators.string // Access the 'string' type validator.
   */
  get validators() {
    return this._validators;
  }


  /**
   * Validate a value against a schema.
   * @param {*} value - The value to validate.
   * @param {Object} schema - The schema to validate against.
   * @param {State} state - The current validation state.
   */
  validate(value, schema, state) {
    const vanilla = _coerceSchema(schema);
    const type = vanilla.type;
    const validator = this._validators[type];
    if (validator === undefined) {
      if (type === undefined) {
        state.error(`Schema has no 'type' property.`, `schema.validate`);
      } else {
        state.error(`Schema type '${type}' has no validator.`, `schema.validate`);
      }
    } else {
      return validator.validate(value, vanilla, state);
    }
  }
}

module.exports = new VDN();

// TODO: 
// - Unify schema constructor and validator for each type into a single file/class.
// - Check that schemas are well formed? Takes processing. Only for debugging.
//   Would make sure all rule values are used? And values are the correct type?
// - Use separate error type for schema errors vs user/client errors.
// - Each rule should check all values are used and are the right type.
// - Rewrite - Switch to rules with inbuilt dependencies? eg:
//   {
//     rule: 'string',
//     validate() { check type is string }
//   }
//   {
//     rule: 'length',
//     validate() { (runRule('string') || runRule('array')) && check has 'length' property etc }
//   }
//   {
//     rule: 'email',
//     validate() { runRule('string') && check regex, domain segments etc... }
//   }
// - Flag to allow immediate stop() on state.error()???
// - Rewrite in Typescript?
// - Would be nicer to have these funcs, but would need to be able to override 'delete' operator.
//   vdn.defaults.string = { required: true }
//   delete vdn.defaults.string // Clear defaults
// - Support ES5 by transpiling with babel
//   Then -> package.json['main'] = "dist/module/vdn.js"
// - Support old browsers by transpiling, minifying and packing into single file & 'vdn' object with webpack.
//   Then -> package.json['browser'] = "dist/browser/vdn.min.js"
// - Async support with functions attemptAsync() and validateAsync(). Is there a need without
//   third party validation functions though?
