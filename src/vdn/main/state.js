/**
 * Holds state during validation.
 * @hideconstructor
 */
class State {
  constructor(...args) {
    const defaults = {
      context: undefined,
      options: {},
      errors: [],
      path: [],
    };

    this._props = Object.assign(defaults, ...args);
  }

  /**
   * Clone this state and override properties.
   * @param {Object} overrides - Properties to override on the cloned state.
   * @returns {State} New state with overriden properties.
   */
  clone(overrides) {
    return new State(this._props, overrides)
  }

  /**
   * Context used for validation.
   * @type {Object}
   * @readonly
   */
  get context() {
    return this._props.context;
  }

  /**
   * Add a new error to this state.
   */
  error(message, type) {
    this.errors.push({
      path: this.path,
      message: this._format(message),
      type: type,
    });
  }

  /**
   * The current list of errors.
   * @type {Object[]}
   * @readonly
   */
  get errors() {
    return this._props.errors;
  }
  
  /**
   * Returns options used during validation.
   * Currently unused. Possible future use.
   * @type {Object}
   * @readonly
   */
  get options() {
    return this._props.options;
  }

  /**
   * Returns the path of this state.
   * @type {string[]}
   * @example
   * state.path -> []                           // At root level
   * state.path -> [ 'someObject', 'someKey' ]  // At 'someObject.someKey'
   * @readonly
   */
  get path() {
    return this._props.path;
  }
  
  /**
   * Build a new substate and return it.
   * @param {string} name - The name of the new child state.
   * @returns {State} New substate.
   * @example
   * substate('a')               -> path == [ 'a' ]
   * substate('a').substate('b') -> path == [ 'a', 'b' ]
   */
  substate(name) {
    const overrides = { path: this.path.concat(name) };
    return this.clone(overrides);
  }

  /**
   * Validate a value against a schema.
   * 
   * See {@link VDN#validate}.
   */
  validate(value, schema) {
    return this.context.validate(value, schema, this);
  }

  //
  // Private
  //

  /**
   * Format an error message replacing labels with their values.
   * @param {string} message - The message to format.
   * @private
   */
  _format(message) {
    const name = this.path.length ? this.path.join('.') : 'value';
    return message.replace(/{{name}}/g, `'${name}'`);
  }
}

module.exports = State;
