'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Panel = require(process.cwd() + '/src/ui/components/Panel');

describe('Panel', function() {
  var renderer;
  var Child;

  beforeEach(function() {
    Child = React.createClass({
      render : function() {
        return <div className='mocked-child'></div>
      }
    });

    renderer = TestUtils.createRenderer();
    renderer.render(<Panel header='dummy'><Child /></Panel>);
  })

  it('should render corretly', function() {
    var panel = renderer.getRenderOutput();

    expect(panel.type).to.equal('div');
    expect(panel.props.children.length).to.equal(2);
  })

  it('should be active on first click', function() {
    var panel = renderer.getRenderOutput();
    panel.props.children[0].props.onClick();

    panel = renderer.getRenderOutput();

    expect(panel.props.children[0].props.className).to.contain('panel-active');
    expect(panel.props.children[1].props.className).to.contain('panel-active');
  })
})
