const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;

const vdn = require('../../src/vdn');

describe('array', function() {
  it('items', function() {
    const items = vdn.string().email();
    const schemaOne = vdn.array().items();
    const schemaTwo = vdn.array().items(items);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'array',
      items: undefined,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'array',
      items: items,
    });
  });

  it('length', function() {
    const length = 5;
    const schemaOne = vdn.array().length();
    const schemaTwo = vdn.array().length(length);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'array',
      length: undefined,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'array',
      length: length,
    });
  });

  it('maxLength', function() {
    const maxLength = 15;
    const schemaOne = vdn.array().maxLength();
    const schemaTwo = vdn.array().maxLength(maxLength);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'array',
      maxLength: undefined,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'array',
      maxLength: maxLength,
    });
  });

  it('minLength', function() {
    const minLength = 0;
    const schemaOne = vdn.array().minLength();
    const schemaTwo = vdn.array().minLength(minLength);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'array',
      minLength: undefined,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'array',
      minLength: minLength,
    });
  });
});
