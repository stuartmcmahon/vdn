const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;

const vdn = require('../../src/vdn');

describe('array', function() {
  it('length', function() {
    const withLength = {
      type: 'array',
      length: 2,
    };
    const withoutLength = {
      type: 'array',
    };
    const valueOne = [ 4, 's' ];
    const valueTwo = [ 4 ];
    const valueThree = [ 4, 's', 5 ];

    assert.deepEqual(valueOne, vdn.attempt(valueOne, withLength));
    assert.deepEqual(valueOne, vdn.attempt(valueOne, withoutLength));

    assert.throws(() => vdn.attempt(valueTwo, withLength));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, withoutLength));

    assert.throws(() => vdn.attempt(valueThree, withLength));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, withoutLength));

    // Override defaults to alter the result.
    vdn.setDefaults('array', { minLength: 3 });
    assert.throws(() => vdn.attempt(valueOne, withLength));
    assert.throws(() => vdn.attempt(valueOne, withoutLength));
    assert.throws(() => vdn.attempt(valueTwo, withLength));
    assert.throws(() => vdn.attempt(valueTwo, withoutLength));
    assert.throws(() => vdn.attempt(valueThree, withLength));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, withoutLength));
    vdn.clearDefaults('array');
  });

  it('minLength', function() {
    const withLength = {
      type: 'array',
      minLength: 2,
    };
    const withoutLength = {
      type: 'array',
    };
    const valueOne = [ 4, 's' ];
    const valueTwo = [ 4 ];
    const valueThree = [ 4, 's', 5 ];

    assert.deepEqual(valueOne, vdn.attempt(valueOne, withLength));
    assert.deepEqual(valueOne, vdn.attempt(valueOne, withoutLength));

    assert.throws(() => vdn.attempt(valueTwo, withLength));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, withoutLength));
    
    assert.deepEqual(valueThree, vdn.attempt(valueThree, withLength));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, withoutLength));

    // Override defaults to alter the result.
    vdn.setDefaults('array', { length: 3 });
    assert.throws(() => vdn.attempt(valueOne, withLength));
    assert.throws(() => vdn.attempt(valueOne, withoutLength));
    assert.throws(() => vdn.attempt(valueTwo, withLength));
    assert.throws(() => vdn.attempt(valueTwo, withoutLength));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, withLength));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, withoutLength));
    vdn.clearDefaults('array');
  });
  
  it('maxLength', function() {
    const withLength = {
      type: 'array',
      maxLength: 2,
    };
    const withoutLength = {
      type: 'array',
    };
    const valueOne = [ 4, 's' ];
    const valueTwo = [ 4 ];
    const valueThree = [ 4, 's', 5 ];

    assert.deepEqual(valueOne, vdn.attempt(valueOne, withLength));
    assert.deepEqual(valueOne, vdn.attempt(valueOne, withoutLength));

    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, withLength));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, withoutLength));
    
    assert.throws(() => vdn.attempt(valueThree, withLength));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, withoutLength));

    // Override defaults to alter the result.
    vdn.setDefaults('array', { minLength: 2 });
    assert.deepEqual(valueOne, vdn.attempt(valueOne, withLength));
    assert.deepEqual(valueOne, vdn.attempt(valueOne, withoutLength));
    assert.throws(() => vdn.attempt(valueTwo, withLength));
    assert.throws(() => vdn.attempt(valueTwo, withoutLength));
    assert.throws(() => vdn.attempt(valueThree, withLength));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, withoutLength));
    vdn.clearDefaults('array');
  });
  
  it('items', function() {
    const schema = {
      type: 'array',
      items: {
        value: { type: 'string' },
      },
    };
    const valueOne = [];
    const valueTwo = [ '' ];
    const valueThree = [ 'some', 's' ];
    const valueFour = [ 4 ];
    const valueFive = [ 4, 's', 5 ];
    const valueSix = [ 's', {} ];

    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, schema));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema));
    assert.throws(() => vdn.attempt(valueFive, schema));
    assert.throws(() => vdn.attempt(valueSix, schema));

    // Override defaults to alter the result.
    vdn.setDefaults('array', { minLength: 3 });
    assert.throws(() => vdn.attempt(valueOne, schema));
    assert.throws(() => vdn.attempt(valueTwo, schema));
    assert.throws(() => vdn.attempt(valueThree, schema));
    vdn.clearDefaults('array');
  });
});
