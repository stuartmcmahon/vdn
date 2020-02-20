/**
 * Used to define results that can be returned by validators.
 */
class Result {
  /**
   * Stop validation of the current value, usually because it is no longer safe to continue.
   */
  stop() {
    return { stop: true };
  }

  /**
   * Coerce value to a new value.
   * @param {*} newValue - The new value to keep.
   */
  value(newValue) {
    return { value: newValue };
  }
}

module.exports = new Result();
