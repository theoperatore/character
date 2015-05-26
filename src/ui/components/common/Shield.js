'use strict';

var React = require('react/addons');
var d3 = require('d3');

module.exports = React.createClass({
  displayName : "Shield",


  getDefaultProps : function() {
    return ({
      width : '100%',
      height : 300
    });
  },


  renderShield : function() {
    var mount = React.findDOMNode(this);
    var width = mount.getBoundingClientRect().width;
    var height = mount.getBoundingClientRect().height;
    var g = d3.select(mount).select('g.shield-container');
    var bgRect = g.select('rect.bg-rect');
    var bgStripe = g.select('rect.bg-stripe');
    var bgCircle = g.select('circle.bg-circle');
    var scoreCircle = g.select('circle.score-circle');
    var textAc = g.select('text.text-ac');
    var textInit = g.select('text.text-init');
    var textSpeed = g.select('text.text-speed');
    var textHitdice = g.select('text.text-hitdice');
    var labelAc = g.select('text.label-ac');
    var labelInit = g.select('text.label-init');
    var labelSpeed = g.select('text.label-speed');
    var labelHitdice = g.select('text.label-hitdice');
    var bgcw = (width / 2) - 100;
    var bgch = (height / 2) - 100;
    var centerx = (width / 2);
    var centery = (height / 2);

    bgRect
      .attr('x', bgcw)
      .attr('y', bgch)
      .attr('width', 200)
      .attr('height', 200)
      .attr('transform', 'rotate(45, ' + centerx + ',' + centery + ')');

    bgStripe
      .attr('x', centerx - 5)
      .attr('y', centery - 150)
      .attr('width', 10)
      .attr('height', 150)
      .attr('fill', '#fff');

    bgCircle
      .attr('cx', centerx)
      .attr('cy', centery)
      .attr('r', 55)
      .attr('fill', '#fff')

    scoreCircle
      .attr('cx', centerx)
      .attr('cy', centery)
      .attr('r', 50);

    textAc
      .attr('x', centerx)
      .attr('y', centery + 15)
      .attr('text-anchor', 'middle')
      .attr('font-size', '24pt')
      .attr('fill', '#fff')
      .text(this.props.data.get('hitDiceCurrent'))

    textHitdice
      .attr('x', centerx)
      .attr('y', centery + 100)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .text(this.props.data.get('hitDiceCurrent') + "d8")

    textSpeed
      .attr('x', centerx + 90)
      .attr('y', centery + 10)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .text(this.props.data.get('hitDiceCurrent'))

    textInit
      .attr('x', centerx - 90)
      .attr('y', centery + 10)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .text(this.props.data.get('hitDiceCurrent'))

    labelAc
      .attr('x', centerx)
      .attr('y', centery)
      .attr('dy', '-1.45em')
      .attr('fill', '#fff')
      .attr('text-anchor', 'middle')
      .text('AC')

    labelHitdice
      .attr('x', centerx)
      .attr('y', centery + 90)
      .attr('dy', '-0.75em')
      .attr('fill', '#fff')
      .attr('text-anchor', 'middle')
      .text('Hit Dice')

    labelSpeed
      .attr('x', centerx + 90)
      .attr('y', centery)
      .attr('dy', '-0.75em')
      .attr('fill', '#fff')
      .attr('text-anchor', 'middle')
      .text('Speed')

    labelInit
      .attr('x', centerx - 90)
      .attr('y', centery)
      .attr('dy', '-0.75em')
      .attr('fill', '#fff')
      .attr('text-anchor', 'middle')
      .text('Init')

  },


  componentDidMount : function() {
    this.renderShield();
  },


  componentDidUpdate : function() {
    console.log('updating shield');
    this.renderShield();
  },


  shouldComponentUpdate : function(nextProps) {
    return this.props.data !== nextProps.data;
  },


  render : function() {
    return (
      <svg width={this.props.width} height={this.props.height}>
        <g className="shield-container">
          <rect className="bg-rect"></rect>
          <rect className="bg-stripe"></rect>
          <circle className="bg-circle"></circle>
          <circle className="score-circle"></circle>
          <text className="text-ac"></text>
          <text className="text-init"></text>
          <text className="text-speed"></text>
          <text className="text-hitdice"></text>
          <text className="label-ac"></text>
          <text className="label-init"></text>
          <text className="label-speed"></text>
          <text className="label-hitdice"></text>
        </g>
      </svg>
    )
  }
})