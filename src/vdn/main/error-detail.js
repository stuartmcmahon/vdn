/**
 * Holds the details of a single error.
 * @hideconstructor
 */
class ErrorDetail {
  constructor(path, type, message) {
    this.name = this.constructor.name;
  
    /**
     * Path of the error.
     * @member {string[]}
     * @example
     * detail.path -> []                        // At root level
     * detail.path -> [ 'user', 'email' ]       // At 'user.email'
     * detail.path -> [ 'user', 'tags', 1 ]     // At 'user.tags[1]'
     */
    this.path = path;

    /**
     * The type of error.
     * @member {string}
     * @example
     * detail.type -> 'array.length'      // An array length error.
     */
    this.type = type;
  
    /**
     * A description of the error.
     * @member {string}
     * @example
     * detail.message -> "'country_code' length is not 2."
     */
    this.message = message;
  }
}

module.exports = ErrorDetail;
