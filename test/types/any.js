const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;

const vdn = require('../../src/vdn');

describe('any', function() {
  it('default', function() {
    const defaultValue = 15;
    const withDefault = {
      type: 'any',
      default: defaultValue,
    };
    const withoutDefault = {
      type: 'any',
    };
    const valueOne = 6.5;
    const valueTwo = 'whEn';
    const valueThree = 15.5;
    const valueFour = [];

    assert.deepEqual(defaultValue, vdn.attempt(undefined, withDefault));
    assert.deepEqual(undefined, vdn.attempt(undefined, withoutDefault));

    assert.deepEqual(valueOne, vdn.attempt(valueOne, withDefault));
    assert.deepEqual(valueOne, vdn.attempt(valueOne, withoutDefault));

    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, withDefault));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, withoutDefault));

    assert.deepEqual(valueThree, vdn.attempt(valueThree, withDefault));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, withoutDefault));

    assert.deepEqual(valueFour, vdn.attempt(valueFour, withDefault));
    assert.deepEqual(valueFour, vdn.attempt(valueFour, withoutDefault));
  });

  it('required', function() {
    const withRequired = {
      type: 'any',
      required: true,
    };
    const withoutRequired = {
      type: 'any',
    };
    const valueOne = 6.5;
    const valueTwo = 'whEn';
    const valueThree = 15.5;
    const valueFour = [];

    assert.throws(() => vdn.attempt(undefined, withRequired), vdn.ValidationError);
    assert.deepEqual(undefined, vdn.attempt(undefined, withoutRequired));
    
    assert.deepEqual(valueOne, vdn.attempt(valueOne, withRequired));
    assert.deepEqual(valueOne, vdn.attempt(valueOne, withoutRequired));

    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, withRequired));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, withoutRequired));

    assert.deepEqual(valueThree, vdn.attempt(valueThree, withRequired));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, withoutRequired));

    assert.deepEqual(valueFour, vdn.attempt(valueFour, withRequired));
    assert.deepEqual(valueFour, vdn.attempt(valueFour, withoutRequired));
  });

  it('valid', function() {
    const validArray = [ 4, 'ten' ];
    const schema = {
      type: 'any',
      valid: [ 15, 'what', 6.5, 'when', validArray ],
    };
    const valueOne = 6.5;
    const valueTwo = [ ...validArray ]; // No deep comparison.
    const valueThree = 'whEn';
    const valueFour = 15.5;

    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.deepEqual(validArray, vdn.attempt(validArray, schema));
    assert.throws(() => vdn.attempt(valueTwo, schema), vdn.ValidationError);
    assert.throws(() => vdn.attempt(valueThree, schema), vdn.ValidationError);
    assert.throws(() => vdn.attempt(valueFour, schema), vdn.ValidationError);
  });

  it('invalid', function() {
    const expectedArray = [ 4, 'ten' ];
    const schema = {
      type: 'any',
      invalid: [ 15, 'what', 6.5, 'when', expectedArray ],
    };
    const valueOne = 15.5;
    const valueTwo = 'whEn';
    const valueThree = [ ...expectedArray ]; // No deep comparison.
    const valueFour = expectedArray;
    const valueFive = 'when';
    const valueSix = 6.5;

    assert.deepEqual(valueOne, vdn.attempt(valueOne, schema));
    assert.deepEqual(valueTwo, vdn.attempt(valueTwo, schema));
    assert.deepEqual(valueThree, vdn.attempt(valueThree, schema));
    assert.throws(() => vdn.attempt(valueFour, schema), vdn.ValidationError);
    assert.throws(() => vdn.attempt(valueFive, schema), vdn.ValidationError);
    assert.throws(() => vdn.attempt(valueSix, schema), vdn.ValidationError);
  });
});
