const AnySchema = require('./any-schema')

/**
 * Convenience class for creating array schemas.
 * @hideconstructor
 */
class ArraySchema extends AnySchema {
  constructor(...args) {
    super({ type: 'array' }, ...args);
  }

  /**
   * See {@link AnySchema#clone}.
   */
  clone(schema) {
    return new ArraySchema(this._schema, schema);
  }

  /**
   * Construct a schema that requires array items to match
   * a given schema.
   * @param {AnySchema} schema - Schema that items must match.
   * @example
   * vdn.array().items(vdn.string().integer())
   */
  items(schema) {
    return this.clone({ items: schema });
  }

  /**
   * Construct a schema that requires an exact array length.
   * @param {number} length - The length required.
   * @example
   * vdn.array().length(3)
   */
  length(length) {
    return this.clone({ length: length });
  }

  /**
   * Construct a schema that requires a maximum array length.
   * @param {number} length - The maximum length allowed.
   * @example
   * vdn.array().maxLength(5)
   */
  maxLength(length) {
    return this.clone({ maxLength: length });
  }

  /**
   * Construct a schema that requires a minimum array length.
   * @param {number} length - The minimum length allowed.
   * @example
   * vdn.array().minLength(1)
   */
  minLength(length) {
    return this.clone({ minLength: length });
  }

}

module.exports = ArraySchema;
