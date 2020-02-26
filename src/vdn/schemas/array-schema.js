const AnySchema = require('./any-schema')
const SchemaUtils = require('../main/schema-utils');

const _wrapped = SchemaUtils.wrapped.bind(SchemaUtils);

/**
 * Convenience class for creating array schemas.
 * @extends AnySchema
 * @hideconstructor
 */
class ArraySchema extends AnySchema {
  constructor(...args) {
    super({ type: 'array' }, ...args);
  }

  clone(schema) {
    return new ArraySchema(this._schema, schema);
  }

  /**
   * Require array items to match a given schema.
   * @param {AnySchema} schema - Schema that items must match.
   * @example
   * const schema = vdn.array().items(vdn.string().digits())
   * 
   * vdn.attempt([], schema)    // Result == [] (valid)
   * vdn.attempt(['4'], schema) // Result == ['4'] (valid)
   * vdn.attempt(['x'], schema) // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'array',
   *   items: {
   *     value: {
   *       type: 'string',
   *       digits: true
   *     }
   *   }
   * }
   */   
  items(schema) {
    return this.clone({ items: _wrapped(schema) });
  }

  /**
   * Require an exact array length.
   * @param {number} length - The length required.
   * @example
   * const schema = vdn.array().length(1)
   * 
   * vdn.attempt([4], schema) // Result == [4] (valid)
   * vdn.attempt([], schema)  // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'array',
   *   length: 1
   * }
   */   
  length(length) {
    return this.clone({ length: _wrapped(length) });
  }

  /**
   * Require a maximum array length.
   * @param {number} length - The maximum length allowed.
   * @example
   * const schema = vdn.array().maxLength(1)
   * 
   * vdn.attempt([], schema)    // Result == [] (valid)
   * vdn.attempt([4], schema)   // Result == [4] (valid)
   * vdn.attempt([4,5], schema) // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'array',
   *   maxLength: 1
   * }
   */
  maxLength(length) {
    return this.clone({ maxLength: _wrapped(length) });
  }

  /**
   * Requires a minimum array length.
   * @param {number} length - The minimum length allowed.
   * @example
   * const schema = vdn.array().minLength(1)
   * 
   * vdn.attempt([4], schema)   // Result == [4] (valid)
   * vdn.attempt([], schema)    // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'array',
   *   minLength: 1
   * }
   */
  minLength(length) {
    return this.clone({ minLength: _wrapped(length) });
  }
}

module.exports = ArraySchema;
