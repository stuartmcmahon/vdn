const AnySchema = require('./any-schema')

/**
 * Convenience class for creating number schemas.
 * @hideconstructor
 */
class NumberSchema extends AnySchema {
  constructor(...args) {
    super({ type: 'number' }, ...args);
  }

  /**
   * See {@link AnySchema#clone}.
   */
  clone(schema) {
    return new NumberSchema(this._schema, schema);
  }

  /**
   * Construct a schema that requires an integer number.
   * @example
   * vdn.number().integer()
   * vdn.number().integer(false)
   */
  integer(integer = true) {
    return this.clone({ integer: integer });
  }

  /**
   * Construct a schema that limits the maximum value.
   * @param {number} value - The maximum value allowed.
   * @example
   * vdn.number().max(142)
   */
  max(value) {
    return this.clone({ max: value });
  }

  /**
   * Construct a schema that limits the minimum value.
   * @param {number} value - The minimum value allowed.
   * @example
   * vdn.number().min(42)
   */
  min(value) {
    return this.clone({ min: value });
  }

}

module.exports = NumberSchema;
