const AnyValidator = require('../validators/any-validator');
const ArrayValidator = require('../validators/array-validator');
const NumberValidator = require('../validators/number-validator');
const ObjectValidator = require('../validators/object-validator');
const Package = require('../../../package.json');
const State = require('./state');
const StringValidator = require('../validators/string-validator');
const Schemas = require('../schemas');
const ValidationError = require('./validation-error');

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
 * Main validation class.
 * @extends Schemas
 * @hideconstructor
 * @example
 * const vdn = require('vdn');
 * 
 * const schema = vdn.number().default(42);
 * 
 * vdn.attempt(undefined, schema); // Result == 42 (default used)
 * vdn.attempt(3, schema);         // Result == 3 (valid)
 * vdn.attempt('5', schema);       // Result == 5 (string conversion)
 * vdn.attempt('f', schema);       // Throws ValidationError
 * @example
 * const vdn = require('vdn');
 * 
 * const schema = vdn.object().entries({
 *   id: vdn.number().integer().required(),
 *   mail: vdn.string().email().required(),
 * }).required();
 * 
 * vdn.attempt({ id:2, mail:'a@b.com'   }, schema); // Valid
 * vdn.attempt({ id:2.3, mail:'a@b.com' }, schema); // Throws ValidationError
 * vdn.attempt({ id:2,   mail:'b.com'   }, schema); // Throws ValidationError
 * vdn.attempt({ undefined, undefined   }, schema); // Throws ValidationError
 * vdn.attempt(undefined,                  schema); // Throws ValidationError
 */
class VDN extends Schemas {
  constructor() {
    super();
    this._options = {};
    this._validators = { ..._defaultValidators };
  }

  /**
   * Attempt to validate a value against a schema.
   * @param {*} value - The value to validate.
   * @param {Object} schema - The schema to validate against.
   * @throws {ValidationError} Thrown if validation fails.
   * @returns {*} The validated value (may have been cloned).
   * @example
   * const schema = vdn.array().items(vdn.string())
   * 
   * vdn.attempt(['a', 'b'], schema) // Result is ['a', 'b']
   * vdn.attempt(['a', 2], schema)   // Throws ValidationError
   */
  attempt(value, schema) {
    const state = new State({
      context: this,
      options: { ...this._options }, // , ...options },
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
   * Clear defaults for a type.
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
   * Options used during validation.
   * Currently unused. Possible future use.
   * @type {Object}
   */
  get options() {
    return this._options;
  }

  set options(options) {
    this._options = options;
  }

  /**
   * Set defaults for a type.
   * @param {string} type - The type to set defaults for.
   * @param {Object} defaults - The defaults to use.
   * @example
   * // All types will be required by default.
   * vdn.setDefaults('any', { required: true })
   * 
   * // Strings will now NOT be required by default. Limit string length.
   * const stringDefaults = {
   *     required: false, 
   *     maxLength: 1024  
   * }
   * vdn.setDefaults('string', stringDefaults)
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
   * @ignore Still undecided whether this function is suitable for client use. 
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

  /**
   * The validation error class.
   * @type {ValidationError}
   * @readonly
   */
  get ValidationError() {
    return ValidationError;
  }

  /**
   * The package version number.
   * @type {string}
   * @readonly
   * @example
   * vdn.version // Returns semantic version number, eg: '1.0.2'
   */
  get version() {
    return Package.version;
  }
}

module.exports = VDN;
