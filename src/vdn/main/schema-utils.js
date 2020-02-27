const _objectProto = Object.prototype;

class SchemaUtils {
  // Check for a pure Javascript object, excluding functions, arrays and derived classes.
  isObject(value) {
    try {
      return Object.getPrototypeOf(value) === _objectProto;
    } catch (_err) {
      return false;
    }
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
    if (this.isObject(schema)) {
      return schema;
    } else {
      return { value: schema };
    }
  }

  // Wrap objects that can't be distinguished from schema definitions.
  wrapped(value) {
    if (this.isObject(value)) {
      return { value: value };
    } else {
      return value;
    }
  }
}

module.exports = new SchemaUtils();
