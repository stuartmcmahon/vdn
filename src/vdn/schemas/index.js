const AnySchema = require('./any-schema')
const ArraySchema = require('./array-schema')
const NumberSchema = require('./number-schema')
const ObjectSchema = require('./object-schema')
const StringSchema = require('./string-schema')

/**
 * Convenience methods for constructing schema types.
 * @hideconstructor
 */
class Schemas {
  /**
   * Construct a schema that allows any value.
   * @returns {AnySchema}
   */
  any() {
    return new AnySchema();
  }

  /**
   * Construct an array schema.
   * @returns {ArraySchema}
   */
  array() {
    return new ArraySchema();
  }

  /**
   * Construct a number schema.
   * @returns {NumberSchema}
   */
  number() {
    return new NumberSchema();
  }

  /**
   * Construct an object schema.
   * @returns {ObjectSchema}
   */
  object() {
    return new ObjectSchema();
  }

  /**
   * Construct a string schema.
   * @returns {StringSchema}
   */
  string() {
    return new StringSchema();
  }
  
}

module.exports = Schemas;
