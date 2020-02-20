const AnySchema = require('../schemas/any-schema')
const ArraySchema = require('../schemas/array-schema')
const NumberSchema = require('../schemas/number-schema')
const ObjectSchema = require('../schemas/object-schema')
const StringSchema = require('../schemas/string-schema')

/**
 * Convenience methods for constructing schema types.
 * @hideconstructor
 */
class Types {
  /**
   * Construct a schema that allows any value.
   */
  any() {
    return new AnySchema();
  }

  /**
   * Construct an array schema.
   */
  array() {
    return new ArraySchema();
  }

  /**
   * Construct a number schema.
   */
  number() {
    return new NumberSchema();
  }

  /**
   * Construct an object schema.
   */
  object() {
    return new ObjectSchema();
  }

  /**
   * Construct a string schema.
   */
  string() {
    return new StringSchema();
  }
  
}

module.exports = Types;
