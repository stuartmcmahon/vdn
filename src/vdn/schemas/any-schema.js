const SchemaUtils = require('../main/schema-utils');

const _wrapped = SchemaUtils.wrapped.bind(SchemaUtils);

/**
 * Convenience class for creating any value schemas.
 * @hideconstructor
 */
class AnySchema {
  constructor(...args) {
    this._schema = Object.assign({ type: 'any' }, ...args);
  }

  /**
   * Clone this schema.
   * @param {Object} schema - Schema additions for the cloned object.
   * @ignore
   */
  clone(schema) {
    return new AnySchema(this._schema, schema);
    // Note: Could use this but this makes it harder for Intellisense.
    // return new this.constructor(this._schema, schema);
  }

  /**
   * Set the default value to use when a value is 'undefined'.
   * @param {*} deFault - The default value.
   * @example
   * const schema = vdn.any().default(42)
   * 
   * vdn.attempt('', schema)        // Result == '' (valid)
   * vdn.attempt(undefined, schema) // Result == 42 (use default)
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'any',
   *   default: 42
   * }
   */
  default(deFault) {
    return this.clone({ default: _wrapped(deFault) });
  }

  /**
   * Declare an array of values that are invalid.
   * @param {*} values - The array of invalid values.
   * @example
   * const schema = vdn.any().invalid(['a string', 5, 6.3 ])
   * 
   * vdn.attempt(7, schema)          // Result == 7 (valid)
   * vdn.attempt('a string', schema) // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'any',
   *   invalid: ['a string', 5, 6.3 ]
   * }
   */
  invalid(values) {
    return this.clone({ invalid: _wrapped(values) });
  }

  /**
   * Require a value to exist (default is to allow the value 'undefined').
   * @param {boolean} [required=true] - 'true' if the value is required. Otherwise 'false'.
   * @example
   * const schema = vdn.any().required()
   * 
   * vdn.attempt('', schema)        // Result == '' (valid)
   * vdn.attempt(undefined, schema) // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'any',
   *   required: false
   * }
   */
  required(required = true) {
    return this.clone({ required: _wrapped(required) });
  }

  /**
   * Return this schema as a vanilla javascript object.
   * @returns {Object}
   * @example
   * vdn.any().required(false).toObject()
   * 
   * // Returns
   * {
   *   type: 'any',
   *   required: false
   * }
   */
  toObject() {
    return this._schema;
  }

  /**
   * Declare an array of values that are valid.
   * @param {*} values - The array of valid values.
   * @example
   * const schema = vdn.any().valid(['a string', 5, 6.3 ])
   * 
   * vdn.attempt(5, schema)          // Result == 5 (valid)
   * vdn.attempt('nope', schema)     // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'any',
   *   valid: ['a string', 5, 6.3 ]
   * }
   */
  valid(values) {
    return this.clone({ valid: _wrapped(values) });
  }
}

module.exports = AnySchema;
