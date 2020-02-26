const AnySchema = require('./any-schema')
const SchemaUtils = require('../main/schema-utils');

const _wrapped = SchemaUtils.wrapped.bind(SchemaUtils);

/**
 * Convenience class for creating string schemas.
 * @extends AnySchema
 * @hideconstructor
 */
class StringSchema extends AnySchema {
  constructor(...args) {
    super({ type: 'string' }, ...args);
  }

  clone(schema) {
    return new StringSchema(this._schema, schema);
  }

  /**
   * Require a string to be only digits [0-9].
   * @example
   * const schema = vdn.string().digits()
   * 
   * vdn.attempt('04', schema) // Result == '04' (valid)
   * vdn.attempt('x', schema)  // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'string',
   *   digits: true
   * }
   */   
  digits() {
    return this.clone({ digits: _wrapped(true) });
  }

  /**
   * Require a valid email address.
   * @example
   * const schema = vdn.string().email()
   * 
   * vdn.attempt('a@b.com', schema) // Result == 'a@b.com' (valid)
   * vdn.attempt('b.com', schema)   // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'string',
   *   email: true
   * }
   */
  email() {
    return this.clone({ email: _wrapped(true) });
  }

  /**
   * Require a hexadecimal string.
   * @example
   * const schema = vdn.string().hex()
   * 
   * vdn.attempt('0fE', schema)   // Result == '0fE' (valid)
   * vdn.attempt('ghi', schema)   // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'string',
   *   hex: true
   * }
   */
  hex() {
    return this.clone({ hex: _wrapped(true) });
  }

  /**
   * Require an exact string length.
   * @param {number} length - The length required.
   * @example
   * const schema = vdn.string().length(1)
   * 
   * vdn.attempt('x', schema)   // Result == 'x' (valid)
   * vdn.attempt('gh', schema)  // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'string',
   *   length: 1
   * }
   */
  length(length) {
    return this.clone({ length: _wrapped(length) });
  }

  /**
   * Require a maximum string length.
   * @param {number} length - The maximum length allowed.
   * @example
   * const schema = vdn.string().maxLength(1)
   * 
   * vdn.attempt('x', schema)   // Result == 'x' (valid)
   * vdn.attempt('gh', schema)  // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'string',
   *   maxLength: 1
   * }
   */
  maxLength(length) {
    return this.clone({ maxLength: _wrapped(length) });
  }

  /**
   * Require a minimum string length.
   * @param {number} length - The minimum length allowed.
   * @example
   * const schema = vdn.string().minLength(1)
   * 
   * vdn.attempt('x', schema)   // Result == 'x' (valid)
   * vdn.attempt('', schema)    // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'string',
   *   minLength: 1
   * }
   */
  minLength(length) {
    return this.clone({ minLength: _wrapped(length) });
  }

  /**
   * Require a string to not be empty.
   * @example
   * const schema = vdn.string().notEmpty()
   * 
   * vdn.attempt('x', schema)   // Result == 'x' (valid)
   * vdn.attempt('', schema)    // Throws ValidationError
   * @example <caption>Using data:</caption>
   * const schema = {
   *   type: 'string',
   *   notEmpty: true
   * }
   */
  notEmpty() {
    return this.clone({ notEmpty: _wrapped(true) });
  }
}

module.exports = StringSchema;
