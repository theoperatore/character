"use strict";

var expect = require('chai').expect;

describe('Given my bananas', function() {
  it('expect them to be green', function() {
    var bananas = 'green';
    
    expect(bananas).to.equal('green');
  })
})