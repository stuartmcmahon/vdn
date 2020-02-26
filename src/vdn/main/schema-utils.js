const _objectProto = Object.prototype;

class SchemaUtils {
  isObject(value) {
    return value !== null && Object.getPrototypeOf(value) === _objectProto;
  }

  //  Put non-object values in an object to normalise access by validators.
  //  @param {*} schema - The schema to normalise.
  //  @example
  //  normalised(5)         -> { value: 5 }
  //  normalised('s')       -> { value: 's' }
  //  normalised([])        -> { value: [] }
  //  normalised(null)      -> { value: null }
  //  normalised({})        -> {}               // No change
  //  normalised({ s: 1 })  -> { s: 1 }         // No change
  normalised(schema) {
    // Check for vanilla javascript objects, excluding arrays and derived classes.
    if (this.isObject(schema)) {
      return schema;
    } else {
      return { value: schema };
    }
  }

  // Wrap objects that can't be distinguished from scheme definitions.
  wrapped(value) {
    if (this.isObject(value)) {
      return { value: value };
    } else {
      return value;
    }
  }
}

module.exports = new SchemaUtils();
