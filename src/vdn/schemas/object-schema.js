const AnySchema = require('./any-schema')
const SchemaUtils = require('../main/schema-utils');

const _wrapped = SchemaUtils.wrapped.bind(SchemaUtils);

/**
 * Convenience class for creating object schemas.
 * @extends AnySchema
 * @hideconstructor
 */
class ObjectSchema extends AnySchema {
  constructor(...args) {
    super({ type: 'object' }, ...args);
  }

  clone(schema) {
    return new ObjectSchema(this._schema, schema);
  }

  /**
   * Require each object entry to match a given schema.
   * @param {Object.<string, AnySchema>} entries - Object that holds
   * schemas for each object entry.
   * @example
   * const schema = vdn.object().entries({
   *   id: vdn.number().integer(),
   *   mail: vdn.string().email(),
   * })
   * 
   * vdn.attempt({ id:2,   mail:'a@b.com' }, schema) // Valid
   * vdn.attempt([ id:2.3, mail:'a@b.com' }, schema) // Throws ValidationError
   * vdn.attempt([ id:2,   mail:'b.com'   }, schema) // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'object',
   *   entries: {
   *     value: {
   *       id: {
   *         type: 'number',
   *         integer: true
   *       },
   *       mail: {
   *         type: 'string',
   *         email: true
   *       }
   *     }
   *   }
   * }
   */
  entries(entries) {
    return this.clone({ entries: _wrapped(entries) });
  }
}

module.exports = ObjectSchema;
