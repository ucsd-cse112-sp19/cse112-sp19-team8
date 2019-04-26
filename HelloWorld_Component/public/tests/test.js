// index.spec.js

const expect = require('chai').expect
const server = require('../../server');

describe('test', function() {
  it('should return a string', function() {
    expect('ci with travis').to.equal('ci with travis');
    console.log("test worked!");
  });
});

/* describe('test', () => {
    it('should return a string', () => {
      expect('ci with travis').to.equal('ci with tra');
      console.log("test worked!");
    });
  }); */ 