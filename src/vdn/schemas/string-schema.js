const AnySchema = require('./any-schema')

/**
 * Convenience class for creating string schemas.
 * @hideconstructor
 */
class StringSchema extends AnySchema {
  constructor(...args) {
    super({ type: 'string' }, ...args);
  }

  /**
   * See {@link AnySchema#clone}.
   */
  clone(schema) {
    return new StringSchema(this._schema, schema);
  }

  /**
   * Construct a schema that requires a string to be only digits [0-9].
   * @example
   * vdn.string().digits()
   * vdn.string().digits(false)
   */
  digits(digits = true) {
    return this.clone({ digits: digits });
  }

  /**
   * Construct a schema that requires a valid email address.
   * @example
   * vdn.string().email()
   * vdn.string().email(false)
   */
  email(email = true) {
    return this.clone({ email: email });
  }

  /**
   * Construct a schema that requires a hexadecimal string.
   * @example
   * vdn.string().hex()
   * vdn.string().hex(false)
   */
  hex(hex = true) {
    return this.clone({ hex: hex });
  }

  /**
   * Construct a schema that requires an exact string length.
   * @param {number} length - The length required.
   * @example
   * vdn.string().length(3)
   */
  length(length) {
    return this.clone({ length: length });
  }

  /**
   * Construct a schema that requires a maximum string length.
   * @param {number} length - The maximum length allowed.
   * @example
   * vdn.string().maxLength(5)
   */
  maxLength(length) {
    return this.clone({ maxLength: length });
  }

  /**
   * Construct a schema that requires a minimum string length.
   * @param {number} length - The minimum length allowed.
   * @example
   * vdn.string().minLength(1)
   */
  minLength(length) {
    return this.clone({ minLength: length });
  }

  /**
   * Construct a schema that requires a string to not be empty, eg. ''
   * is not allowed.
   * @example
   * vdn.string().notEmpty()
   * vdn.string().notEmpty(false)
   */
  notEmpty(notEmpty = true) {
    return this.clone({ notEmpty: notEmpty });
  }
}

module.exports = StringSchema;
