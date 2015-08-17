'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Button = require(process.cwd() + '/src/ui/components/Button');

describe('Button', function() {
  var button;
  var callback;

  beforeEach(function() {
    callback = sinon.spy();
    button = TestUtils.renderIntoDocument(<Button id='testButton' style='red' size='sm' onClick={callback}/>).getDOMNode();
  })

  it('should have style red with size small', function() {
    expect(button.className).to.equal('button button-sm button-rd');
  })

  it('should call a callback function once when clicked', function() {
    TestUtils.Simulate.click(button);
    expect(callback).to.be.called.once;
  })
})
