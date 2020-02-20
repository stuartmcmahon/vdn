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
   */
  clone(schema) {
    return new AnySchema(this._schema, schema);
    // Note: Could use this but this makes it harder for Intellisense to work.
    // return new this.constructor(this._schema, schema);
  }

  /**
   * Append a default value rule.
   * @param {*} deFault - The default value.
   * @example
   * vdn.any().default('')
   * vdn.any().default(42)
   */
  default(deFault) {
    return this.clone({ default: deFault });
  }

  /**
   * Construct a schema that should not include an invalid value from a set.
   * @param {*} values - The array of values that are invalid.
   * @example
   * vdn.any().invalid(['a string', 5, 6.3 ])
   */
  invalid(values) {
    return this.clone({ invalid: values });
  }

  /**
   * Return this schema as a vanilla javascript object.
   */
  toObject() {
    return this._schema;
  }

  /**
   * Construct a schema that requires a value to exist (default is to
   * allow the value 'undefined').
   * @param {boolean} required - 'true' if the value is required. Otherwise 'false'.
   * @example
   * vdn.any().required()
   * vdn.any().required(false)
   */
  required(required = true) {
    return this.clone({ required: required });
  }

  /**
   * Construct a schema that requires a valid value from a set.
   * @param {*} values - The array of values that are valid.
   * @example
   * vdn.any().valid(['a string', 5, 6.3 ])
   */
  valid(values) {
    return this.clone({ valid: values });
  }
}

module.exports = AnySchema;
