/**
 * Class that represents validation errors.
 */
class ValidationError extends Error {
  /**
   * Construct a new validation error.
   * @param {string} message - See {@link ValidationError#message}.
   * @param {ErrorDetail[]} details - See {@link ValidationError#details}.
   */
  constructor(message, details) {
    super(message);
    this.name = this.constructor.name;

    /**
     * A multiline description of all the errors.
     * @member {string}
     */
    this.message;

    /**
     * Array of details for each error that occurred
     * @member {ErrorDetail[]}
     */
    this.details = details;
  }
}

module.exports = ValidationError;
