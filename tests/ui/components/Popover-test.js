'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Popover = require(process.cwd() + '/src/ui/components/Popover');

var component;

describe('Popover', function() {
  beforeEach(function() {
    var Mock = React.createClass({
      render : function() {
        return <h1>POPOVER MOCK</h1>
      }
    })

    component = TestUtils.renderIntoDocument(
      <Popover popover={<Mock />}>
        <div className="mock">MOCK</div>
      </Popover>
    );
  })

  it('should not show the popover by default', function() {
    var popover = TestUtils.findRenderedDOMComponentWithClass(component, 'popover-popover-container');

    expect(popover.getDOMNode().className).to.not.contain('popover-active');
  })

  it('should render a popover when activated', function() {
    var popover = TestUtils.findRenderedDOMComponentWithClass(component, 'popover-popover-container');
    var content = TestUtils.findRenderedDOMComponentWithClass(component, 'popover-content-container');

    TestUtils.Simulate.click(content);

    expect(popover.getDOMNode().className).to.contain('popover-active');
  })
})
