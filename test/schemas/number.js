const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;

const vdn = require('../../src/vdn');

describe('number', function() {
  it('default', function() {
    const deFault = 1233;
    const schemaOne = vdn.number().default();
    const schemaTwo = vdn.number().default(deFault);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'number',
      default: undefined,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'number',
      default: deFault,
    });
  });

  it('integer', function() {
    const schemaOne = vdn.number().integer();

    assert.deepEqual(schemaOne.toObject(), {
      type: 'number',
      integer: true,
    });
  });

  it('max', function() {
    const max = Number.MAX_SAFE_INTEGER;
    const schemaOne = vdn.number().max();
    const schemaTwo = vdn.number().max(max);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'number',
      max: undefined,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'number',
      max: max,
    });
  });

  it('min', function() {
    const min = Number.MIN_SAFE_INTEGER;
    const schemaOne = vdn.number().min();
    const schemaTwo = vdn.number().min(min);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'number',
      min: undefined,
    });
    assert.deepEqual(schemaTwo.toObject(), {
      type: 'number',
      min: min,
    });
  });

  it('required', function() {
    const schemaOne = vdn.number().required();
    const schemaTwo = vdn.number().required(false);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'number',
      required: true,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'number',
      required: false,
    });
  });
});
