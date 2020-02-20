const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;

const vdn = require('../../src/vdn');

describe('string', function() {
  it('default', function() {
    const deFault = 'why this?';
    const schemaOne = vdn.string().default();
    const schemaTwo = vdn.string().default(deFault);
 
    assert.deepEqual(schemaOne.toObject(), {
      type: 'string',
      default: undefined,
    });
 
    assert.deepEqual(schemaTwo.toObject(), {
      type: 'string',
      default: deFault,
    });
  });

  it('digits', function() {
    const schemaOne = vdn.string().digits();
    const schemaTwo = vdn.string().digits(false);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'string',
      digits: true,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'string',
      digits: false,
    });
  });

  it('email', function() {
    const schemaOne = vdn.string().email();
    const schemaTwo = vdn.string().email(false);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'string',
      email: true,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'string',
      email: false,
    });
  });

  it('hex', function() {
    const schemaOne = vdn.string().hex();
    const schemaTwo = vdn.string().hex(false);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'string',
      hex: true,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'string',
      hex: false,
    });
  });

  it('length', function() {
    const length = 55;
    const schemaOne = vdn.string().length();
    const schemaTwo = vdn.string().length(length);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'string',
      length: undefined,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'string',
      length: length,
    });
  });

  it('maxLength', function() {
    const maxLength = 4;
    const schemaOne = vdn.string().maxLength();
    const schemaTwo = vdn.string().maxLength(maxLength);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'string',
      maxLength: undefined,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'string',
      maxLength: maxLength,
    });
  });

  it('minLength', function() {
    const minLength = 1;
    const schemaOne = vdn.string().minLength();
    const schemaTwo = vdn.string().minLength(minLength);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'string',
      minLength: undefined,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'string',
      minLength: minLength,
    });
  });

  it('notEmpty', function() {
    const schemaOne = vdn.string().notEmpty();
    const schemaTwo = vdn.string().notEmpty(false);

    assert.deepEqual(schemaOne.toObject(), {
      type: 'string',
      notEmpty: true,
    });

    assert.deepEqual(schemaTwo.toObject(), {
      type: 'string',
      notEmpty: false,
    });
  });
});
