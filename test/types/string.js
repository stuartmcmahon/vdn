const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;

const vdn = require('../../src/vdn');

describe('string', function() {
  it('digits', function() {
    const schema = {
      type: 'string',
      digits: true,
    };
    const valueOne = '01';
    const valueTwo = '12345';
    const valueThree = '1';
    const valueFour = '0';
    const valueFive = 'e';
    const valueSix = '1g';
    const valueSeven = 'g1';
    const valueEight = [];
    const valueNine = 1;
    const valueTen = {};
    const valueEleven = '';

    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, schema));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, schema));
    assert.deepEqual(valueFour, vdn.attempt(valueFour, schema));
    assert.throws(() => vdn.attempt(valueFive, schema));
    assert.throws(() => vdn.attempt(valueSix, schema));
    assert.throws(() => vdn.attempt(valueSeven, schema));
    assert.throws(() => vdn.attempt(valueEight, schema));
    assert.throws(() => vdn.attempt(valueNine, schema));
    assert.throws(() => vdn.attempt(valueTen, schema));
    assert.throws(() => vdn.attempt(valueEleven, schema));

    // Override defaults to alter the result.
    vdn.setDefaults('string', { length: 2 });
    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.throws(() => vdn.attempt(valueTwo, schema));
    assert.throws(() => vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema));
    vdn.clearDefaults('string');
  });

  it('email', function() {
    const schema = {
      type: 'string',
      email: true,
    };
    const valueOne = 's@m.com';
    const valueTwo = 'something@longer.com';
    const valueThree = '';
    const valueFour = 'short@';
    const valueFive = 'short@';

    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, schema));
    assert.throws(() => vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema));
    assert.throws(() => vdn.attempt(valueFive, schema));

    // Override defaults to alter the result.
    vdn.setDefaults('string', { maxLength: 15 });
    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.throws(() => vdn.attempt(valueTwo, schema));
    assert.throws(() => vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema));
    assert.throws(() => vdn.attempt(valueFive, schema));
    vdn.clearDefaults('string');
  });

  it('hex', function() {
    const schema = {
      type: 'string',
      hex: true,
    };
    const valueOne = '1f';
    const valueTwo = 'e';
    const valueThree = '12345';
    const valueFour = 'g';
    const valueFive = '1fg';
    const valueSix = 'g1f';
    const valueSeven = [];
    const valueEight = 1;
    const valueNine = {};
    const valueTen = '';

    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, schema));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema));
    assert.throws(() => vdn.attempt(valueFive, schema));
    assert.throws(() => vdn.attempt(valueSix, schema));
    assert.throws(() => vdn.attempt(valueSeven, schema));
    assert.throws(() => vdn.attempt(valueEight, schema));
    assert.throws(() => vdn.attempt(valueNine, schema));
    assert.throws(() => vdn.attempt(valueTen, schema));

    // Override defaults to alter the result.
    vdn.setDefaults('string', { length: 2 });
    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.throws(() => vdn.attempt(valueTwo, schema));
    assert.throws(() => vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema));
    vdn.clearDefaults('string');
  });

  it('length', function() {
    const schema = {
      type: 'string',
      length: 2,
    };
    const valueOne = 'ab';
    const valueTwo = 's';
    const valueThree = '';
    const valueFour = 'something very long';
    const valueFive = 1;
    const valueSix = 25.1;
    const valueSeven = [ 's' ];
    const valueEight = { 's': '1' };

    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.throws(() => vdn.attempt(valueTwo, schema));
    assert.throws(() => vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema));
    assert.throws(() => vdn.attempt(valueFive, schema));
    assert.throws(() => vdn.attempt(valueSix, schema));
    assert.throws(() => vdn.attempt(valueSeven, schema));
    assert.throws(() => vdn.attempt(valueEight, schema));

    // Override defaults to alter the result.
    vdn.setDefaults('string', { minLength: 3 });
    assert.throws(() => vdn.attempt(valueOne, schema));
    assert.throws(() => vdn.attempt(valueTwo, schema));
    assert.throws(() => vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema));
    assert.throws(() => vdn.attempt(valueFive, schema));
    assert.throws(() => vdn.attempt(valueSix, schema));
    assert.throws(() => vdn.attempt(valueSeven, schema));
    assert.throws(() => vdn.attempt(valueEight, schema));
    vdn.clearDefaults('string');
  });

  it('minLength, maxLength', function() {
    const schema = {
      type: 'string',
      maxLength: 9,
    };
    const valueOne = 'absolute';
    const valueTwo = 'afternoon';
    const valueThree = 's';
    const valueFour = 'something very long';
    const valueFive = 1;
    const valueSix = 25.1;
    const valueSeven = [ 's' ];
    const valueEight = { 's': '1' };

    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, schema));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema));
    assert.throws(() => vdn.attempt(valueFive, schema));
    assert.throws(() => vdn.attempt(valueSix, schema));
    assert.throws(() => vdn.attempt(valueSeven, schema));
    assert.throws(() => vdn.attempt(valueEight, schema));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, schema));

    // Override defaults to alter the result.
    vdn.setDefaults('string', { minLength: 9 });
    assert.throws(() => vdn.attempt(valueOne, schema));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, schema));
    assert.throws(() => vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema));
    assert.throws(() => vdn.attempt(valueFive, schema));
    assert.throws(() => vdn.attempt(valueSix, schema));
    assert.throws(() => vdn.attempt(valueSeven, schema));
    assert.throws(() => vdn.attempt(valueEight, schema));
    vdn.clearDefaults('string');
  });

  it('notEmpty', function() {
    const schema = {
      type: 'string',
      notEmpty: true,
    };
    const valueOne = 's';
    const valueTwo = ' ';
    const valueThree = '12345';
    const valueFour = 'sd das';
    const valueFive = [];
    const valueSix = 1;
    const valueSeven = {};
    const valueEight = '';

    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, schema));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, schema));
    assert.deepEqual(valueFour, vdn.attempt(valueFour, schema));
    assert.throws(() => vdn.attempt(valueFive, schema));
    assert.throws(() => vdn.attempt(valueSix, schema));
    assert.throws(() => vdn.attempt(valueSeven, schema));
    assert.throws(() => vdn.attempt(valueEight, schema));

    // Override defaults to alter the result.
    vdn.setDefaults('string', { length: 1 });
    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, schema));
    assert.throws(() => vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema));
    assert.throws(() => vdn.attempt(valueFive, schema));
    assert.throws(() => vdn.attempt(valueSix, schema));
    assert.throws(() => vdn.attempt(valueSeven, schema));
    assert.throws(() => vdn.attempt(valueEight, schema));
    vdn.clearDefaults('string');
  });

  it('regExp', function() {
    const schema = {
      type: 'string',
      regExp: /.*some+./,
    };
    const valueOne = 'something';
    const valueTwo = ' what somewhere ';
    const valueThree = '242some423';
    const valueFour = 'some';
    const valueFive = 'twosome';
    const valueSix = 'Some';
    const valueSeven = [];
    const valueEight = 1;
    const valueNine = {};
    const valueTen = '';

    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, schema));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema));
    assert.throws(() => vdn.attempt(valueFive, schema));
    assert.throws(() => vdn.attempt(valueSix, schema));
    assert.throws(() => vdn.attempt(valueSeven, schema));
    assert.throws(() => vdn.attempt(valueEight, schema));
    assert.throws(() => vdn.attempt(valueNine, schema));
    assert.throws(() => vdn.attempt(valueTen, schema));

    // Override defaults to alter the result.
    vdn.setDefaults('string', { length: 9 });
    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.throws(() => vdn.attempt(valueTwo, schema));
    assert.throws(() => vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema));
    assert.throws(() => vdn.attempt(valueFive, schema));
    assert.throws(() => vdn.attempt(valueSix, schema));
    vdn.clearDefaults('string');
  });
});
