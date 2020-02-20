const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;

const vdn = require('../../src/vdn');

describe('object', function() {
  it('entries', function() {
    const schema = {
      type: 'object',
      entries: {
        value: {
          a: { type: 'string' },
          b: { type: 'number' },
          '1': { type: 'string' },
          '2': { type: 'number' },
        }
      },
    };
    const expected = {
      a: 'something',
      b: 52,
      '1': 'else',
      '2': 0.52
    };
    const unexpectedOne = 4; // Not an object.
    const unexpectedTwo = [ 4, 's', 5 ]; // Not an object.
    const unexpectedThree = { ...expected, z: 'what' }; // 'z' should not be allowed.
    const unexpectedFour = { ...expected, a: 43 }; // 'a' should be a string.

    assert.deepEqual(expected, vdn.attempt(expected, schema));
    assert.throws(() => vdn.attempt(unexpectedOne, schema));
    assert.throws(() => vdn.attempt(unexpectedTwo, schema));
    assert.throws(() => vdn.attempt(unexpectedThree, schema));
    assert.throws(() => vdn.attempt(unexpectedFour, schema));
  });
});
