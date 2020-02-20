// Used instead of 'undefined' to check for missing values.
const _notSet = new Object();
const _objectProto = Object.prototype;

function _getDerivedClassMembers(obj, name) {
  const all = [];
  let proto = Object.getPrototypeOf(obj);

  while (proto !== _objectProto) {
    const constructor = proto.constructor;

    // This version gives lint warning 'no-prototype-builtins':
    //  https://eslint.org/docs/rules/no-prototype-builtins
    // if (constructor.hasOwnProperty(name)) {

    if (_objectProto.hasOwnProperty.call(constructor, name)) {
      all.push(constructor[name]);
    }
    
    proto = Object.getPrototypeOf(proto);
  }  

  return all;
}

/**
 * Put non-object values in an object to normalise access by validators.
 * @param {*} schema - The schema to normalise.
 * @example
 * normalise(5)         -> { value: 5 }
 * normalise('s')       -> { value: 's' }
 * normalise([])        -> { value: [] }
 * normalise(null)      -> { value: null }
 * normalise({})        -> {}               // No change
 * normalise({ s: 1 })  -> { s: 1 }         // No change
 */
function _normalise(schema) {
  // Check for vanilla javascript objects, excluding arrays and derived classes.
  if (schema !== null && Object.getPrototypeOf(schema) === Object.prototype) {
    return schema;
  } else {
    return { value: schema };
  }
}

/**
 * Base validator class used to implement common validation functionality.
 * @hideconstructor
 */
class BaseValidator {
  constructor(rules) {
    // TODO: Could make insertion very fast by putting rules in a [k, v] array, then:
    // this.rules = new Map(_rules.concat(subclassRules));
    this.rules = new Map();
    this.addRules(rules); // Subclass rules.
    // TODO: Or if I never need rules by key in an array, eg:
    // this.rules = _rules.concat(subclassRules);
  }

  // TODO: Use a linked list instead and allow mutation of the base validators rules?
  // Example:
  // removeRule(name) {}
  // addRuleAtStart(rule) {}
  // addRuleAtEnd(rule) {}
  // addRuleBefore(name, rule) {}
  // addRuleAfter(name, rule) {}

  addRule(rule) {
    this.rules.set(rule.name, rule);
  }

  addRules(rules) {
    for (const rule of rules) {
      this.addRule(rule);
    }
  }

  getDerivedDefaults() {
    // Note: This function iterates the prototype chain itself so derived classes
    // don't each need to implement getDerivedDefaults(), which is error prone, eg:
    //   DerivedClass.getDerivedDefaults() {
    //     return { ...super.getDerivedDefaults(), ...DerivedClass.classdefaults }
    //   };

    // Iterate base class prototypes to find 'classDefaults' members.
    const all = _getDerivedClassMembers(this, 'classDefaults');

    // Note: Reverse so derived classes override base classes.
    return Object.assign({}, ...all.reverse());
  }

  /**
   * Validate a value against a schema.
   * 
   * See {@link VDN#validate}.
   */
  validate(value, schema, state) {
    const defaults = this.getDerivedDefaults();
    const merged = { ...defaults, ...schema };
    const missing = { ...merged };
    let skipRest = false;

    // Execute rules in the order they were added to the validator.
    this.rules.forEach((rule, ruleName) => {
      const data = merged[ruleName];

      // Is this rule used in the schema?
      if (data === undefined) {
        return; // No, try next.
      }

      // No longer missing.
      delete missing[ruleName];

      if (skipRest) {
        // Not safe to execute any more rules.
        return;
      }

      const ruleSchema = _normalise(data);

      // Run rule and unpack result (result may be undefined).
      const {
        value: newValue = _notSet,
        stop = false,
      } = rule.run(value, ruleSchema, state) || {};
      
      if (newValue !== _notSet) {
        // Coerced value.
        value = newValue;
      }

      if (stop) {
        // Not safe to execute any more rules.
        skipRest = true;
      }
    });

    // Dump rules we don't understand.
    for (const name in missing) {
      state.error(`'${name}' rule not found.`, `schema.validate`);
    }

    // Return potentially coerced value.
    return value;
  }
}

/**
 * Default schema to apply to all instances of this class.
 * @example
 * BaseValidator.classDefaults = {
 *   required: true,
 * };
 * 
 * StringValidator.classDefaults = {
 *   maxLength: yourConfig.database.maxStringLength,
 * };
 */
BaseValidator.classDefaults = {};

module.exports = BaseValidator;
