const AnySchema = require('./any-schema')
const SchemaUtils = require('../main/schema-utils');

const _wrapped = SchemaUtils.wrapped.bind(SchemaUtils);

/**
 * Convenience methods for creating number schemas.
 * @extends AnySchema
 * @hideconstructor
 */
class NumberSchema extends AnySchema {
  constructor(...args) {
    super({ type: 'number' }, ...args);
  }

  clone(schema) {
    return new NumberSchema(this._schema, schema);
  }

  /**
   * Require a number to be an integer.
   * @example
   * const schema = vdn.number().integer()
   * 
   * vdn.attempt(5, schema)       // Result == 5 (valid)
   * vdn.attempt(5.3, schema)     // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'number',
   *   integer: true
   * }
   */
  integer() {
    return this.clone({ integer: _wrapped(true) });
  }

  /**
   * Set the maximum value allowed.
   * @param {number} value - The maximum value allowed.
   * @example
   * const schema = vdn.number().max(42)
   * 
   * vdn.attempt(42, schema)     // Result == 42 (valid)
   * vdn.attempt(43, schema)     // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'number',
   *   max: 42
   * }
   */
  max(value) {
    return this.clone({ max: _wrapped(value) });
  }

  /**
   * Set the minimum value allowed.
   * @param {number} value - The minimum value allowed.
   * @example
   * const schema = vdn.number().min(42)
   * 
   * vdn.attempt(42, schema)     // Result == 42 (valid)
   * vdn.attempt(41, schema)     // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'number',
   *   min: 42
   * }
   */
  min(value) {
    return this.clone({ min: _wrapped(value) });
  }
}

module.exports = NumberSchema;
