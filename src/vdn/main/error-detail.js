/**
 * Class that holds the details of a single error.
 */
class ErrorDetail {
  /**
   * Construct a new error detail.
   * @param {string} message - See {@link ValidationError#message}.
   * @param {Object[]} details - See {@link ValidationError#details}.
   */
  constructor(path, type, message) {
    this.name = this.constructor.name;
  
    /**
     * Path of this error.
     * @member {string[]}
     * @example
     * detail.path -> []                       // At root level
     * detail.path -> [ 'user', 'email' ]      // At 'user.email'
     * detail.path -> [ 'user', 'tag', '[1]' ] // At 'user.tag[1]'
     */
    this.path = path;

    /**
     * The type of this error.
     * @member {string}
     */
    this.type = type;
  
    /**
     * A description of the error.
     * @member {string}
     */
    this.message = message;
  }
}

module.exports = ErrorDetail;
