const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;

const vdn = require('../../src/vdn');

describe('object', function() {
  it('entries', function() {
    const entries = { 'email': vdn.string().email() };
    const schemaOne = vdn.object().entries();
    const schemaTwo = vdn.object().entries(entries);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'object',
      entries: { value: undefined },
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'object',
      entries: { value: entries },
    });
  });
});
