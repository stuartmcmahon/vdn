const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;

const vdn = require('../../src/vdn');

describe('number', function() {
  it('min, max', function() {
    const schema = {
      type: 'number',
      min: 7.5,
    };
    const valueOne = 11.5;
    const valueTwo = 7.5;
    const valueThree = 2.3;
    const valueFour = Number.NaN;
    const valueFive = 'some';
    const valueSix = [ 12.5, 2 ]; // Note: A single element array will convert, is this guaranteed?

    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, schema));
    assert.throws(() => vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema));
    assert.throws(() => vdn.attempt(valueFive, schema));
    assert.throws(() => vdn.attempt(valueSix, schema));

    // Override defaults to alter the result.
    vdn.setDefaults('number', { max: 11.0 });
    assert.throws(() => vdn.attempt(valueOne, schema));
    vdn.clearDefaults('number');
  });

  it('integer', function() {
    const schema = {
      type: 'number',
      integer: true,
      min: 3,
    };
    const valueOne = 5;
    const valueTwo = 3;
    const valueThree = 2;
    const valueFour = 6.3;
    const valueFive = 'some';
    const valueSix = Number.NaN;

    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, schema));
    assert.throws(() => vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema));
    assert.throws(() => vdn.attempt(valueFive, schema));
    assert.throws(() => vdn.attempt(valueSix, schema));

    // Override defaults to alter the result.
    vdn.setDefaults('number', { max: 4 });
    assert.throws(() => vdn.attempt(valueOne, schema));
    vdn.clearDefaults('number');
  });
});
