const VDN = require('./main/vdn');

/**
 * Main validation object.
 * @module {VDN} vdn
 * @ignore Type link above is not working so ignoring until fixed.
 */
module.exports = new VDN();

// TODO: 
// - Unify schema constructor and validator for each type into a single file/class.
// - Check that schemas are well formed? Takes processing. Only for debugging.
//   Would make sure all rule values are used? And values are the correct type?
// - Use separate error type for schema errors vs user/client errors.
// - Each rule should check all values are used and are the right type.
// - Rewrite - Switch to rules with inbuilt dependencies? eg:
//   {
//     rule: 'string',
//     validate() { check type is string }
//   }
//   {
//     rule: 'length',
//     validate() { (runRule('string') || runRule('array')) && check has 'length' property etc }
//   }
//   {
//     rule: 'email',
//     validate() { runRule('string') && check regex, domain segments etc... }
//   }
// - Flag to allow immediate stop() on state.error()???
// - Rewrite in Typescript?
// - Would be nicer to have these funcs, but would need to be able to override 'delete' operator.
//   vdn.defaults.string = { required: true }
//   delete vdn.defaults.string // Clear defaults
// - Support ES5 by transpiling with babel
//   Then -> package.json['main'] = "dist/module/vdn.js"
// - Support old browsers by transpiling, minifying and packing into single file & 'vdn' object with webpack.
//   Then -> package.json['browser'] = "dist/browser/vdn.min.js"
// - Async support with functions attemptAsync() and validateAsync(). Is there a need without
//   third party validation functions though?
// - Setup automated tests (Travis? Or github?).
