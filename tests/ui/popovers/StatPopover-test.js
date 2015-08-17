'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var StatPopover = require(process.cwd() + '/src/ui/popovers/StatPopover');

var popover;

var onStatChange;
var onCheckboxChange;
var label = 'StatLabel';
var title = 'StatTitle';
var checked = false;
var stat = '10';

describe('StatPopover', function() {
  beforeEach(function() {

    onStatChange = sinon.spy();
    onCheckboxChange = sinon.spy();

    popover = TestUtils.renderIntoDocument(
      <StatPopover title={title}
                   label={label}
                   stat={stat}
                   checked={checked}
                   onStatChange={onStatChange}
                   onCheckboxChange={onCheckboxChange}>
      </StatPopover>
    );
  })

  it('should display the correct title and label', function() {
    var titleEl = TestUtils.findRenderedDOMComponentWithTag(popover, 'h4');
    var labelEl = TestUtils.findRenderedDOMComponentWithClass(popover, 'input-group-label-block');

    expect(titleEl.getDOMNode().textContent).to.equal(title);
    expect(labelEl.getDOMNode().textContent).to.equal(label);
  })

  it('should have inputs initialized with the correct values', function() {
    var inputs = TestUtils.scryRenderedDOMComponentsWithTag(popover, 'input');

    expect(inputs.length).to.equal(2);
    expect(inputs[0].getDOMNode().value).to.equal(stat);
    expect(inputs[0].props.placeholder).to.equal(stat);
    expect(inputs[1].getDOMNode().checked).to.be.false;
  })

  it('should call onChange functions when values have changed', function() {
    var inputs = TestUtils.scryRenderedDOMComponentsWithTag(popover, 'input');

    TestUtils.Simulate.change(inputs[0].getDOMNode(), {target: { value: 15}});
    TestUtils.Simulate.change(inputs[1].getDOMNode(), {target: { value: true}});

    expect(onStatChange).to.be.calledWith(15);
    expect(onCheckboxChange).to.be.calledWith(true);
  })
})
