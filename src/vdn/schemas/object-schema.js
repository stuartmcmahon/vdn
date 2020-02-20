const AnySchema = require('./any-schema')

/**
 * Convenience class for creating object schemas.
 * @hideconstructor
 */
class ObjectSchema extends AnySchema {
  constructor(...args) {
    super({ type: 'object' }, ...args);
  }

  /**
   * See {@link AnySchema#clone}.
   */
  clone(schema) {
    return new ObjectSchema(this._schema, schema);
  }

  /**
   * Construct a schema that requires each object entry to match
   * a given schema.
   * @param {Object.<string, AnySchema>} entries - Object that holds
   * schemas for each object entry.
   * @example
   * vdn.object().entries({
   *   id: vdn.number().integer(),
   *   email: vdn.string().email(),
   * })
   */
  entries(entries) {
    return this.clone({ entries: { value: entries } });
  }

}

module.exports = ObjectSchema;
