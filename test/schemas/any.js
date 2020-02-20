const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;

const vdn = require('../../src/vdn');

describe('any', function() {
  it('default', function() {
    const deFault = 'where';
    const schemaOne = vdn.any().default();
    const schemaTwo = vdn.any().default(deFault);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'any',
      default: undefined,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'any',
      default: deFault,
    });
  });

  it('invalid', function() {
    const values = [
      5, 42.6, 324, 0.24, 0.0
    ];
    const deFault = 0.0;
    const schema = vdn.any().invalid(values).default(deFault);

    assert.deepEqual(schema.toObject(), {
      type: 'any',
      invalid: values,
      default: deFault,
    });
  });

  it('required', function() {
    const values = [
      'what', 'when', 'where', 'why'
    ];
    const schemaOne = vdn.any().valid(values).required();
    const schemaTwo = vdn.any().valid(values).required(false);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'any',
      valid: values,
      required: true,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'any',
      valid: values,
      required: false,
    });
  });

  it('valid', function() {
    const values = [
      'what', 'when', 'where', 'why'
    ];
    const deFault = 'where';
    const schema = vdn.any().valid(values).default(deFault);

    assert.deepEqual(schema.toObject(), {
      type: 'any',
      valid: values,
      default: deFault,
    });
  });
});
