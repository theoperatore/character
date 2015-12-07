'use strict';

var React = require('react');
var log = require('debug')('logs:component');
var d3 = require('d3');

module.exports = React.createClass({
  displayName : "HPBar",


  getDefaultProps : function() {
    return ({
      width : "100%",
      height : 50
    })
  },


  renderBars : function() {
    var mount = React.findDOMNode(this);
    var width = mount.getBoundingClientRect().width;
    var g = d3.select(mount).select('g.hp-bar-container');
    var hpBar = g.select('rect.hp-bar-hp');
    var tmpBar = g.select('rect.hp-bar-tmp');
    var hpLabel = g.select('text.hp-bar-hp-label');
    var tmpLabel = g.select('text.hp-bar-tmp-label');
    var xscale = d3.scale.linear();
    var xlscale = d3.scale.linear();
    var data = {};

    data.current = this.props.data.get('current');
    data.maximum = this.props.data.get('maximum');
    data.temporary = this.props.data.get('temporary');
    data.percent = Math.floor((data.current / data.maximum) * 100);

    xscale.domain([0, data.maximum]);
    xscale.range([0, width]);
    xlscale.domain([0, data.maximum]);
    xlscale.range([30, (width / 2)]);

    hpBar
      .attr('fill', () => {
        if (data.percent <= 25) {
          return '#d9534f';
        }
        else if (data.percent <= 50) {
          return '#f0ad4e';
        }
        else {
          return '#5cb85c';
        }
      })
      .transition()
      .duration(450)
      .attr('width', xscale(data.current));

    tmpBar
      .transition()
      .duration(450)
      .attr('width', xscale(data.temporary));

    hpLabel
      .transition()
      .duration(450)
      .attr('y', '2em')
      .attr('x', () => xlscale(data.current))
      .attr('text-anchor', 'middle')
      .text(data.current + " / " + data.maximum);

    tmpLabel
      .transition()
      .duration(450)
      .attr('y', '2em')
      .attr('x', 25)
      .attr('text-anchor', 'end')
      .text(() => {
        return (data.temporary === 0) ? "" : data.temporary;
      })
  },


  componentDidMount : function() {
    this.renderBars();
  },


  componentDidUpdate : function() {
    log('updating hpbar');
    this.renderBars();
  },


  shouldComponentUpdate : function(nextProps) {
    return this.props.data !== nextProps.data;
  },


  render : function() {
    var { height, width, ...others } = this.props;

    return (
      <svg width={width} height={height} {...others}>
        <g className="hp-bar-container">
          <rect height={height} rx={"3px"} ry={"3px"} width={width} className="hp-bar-outline"></rect>
          <rect height={height} rx={"3px"} ry={"3px"} width={0} className="hp-bar-hp"></rect>
          <text className="hp-bar-hp-label"></text>
          <rect height={height} rx={"3px"} ry={"3px"} width={0} className="hp-bar-tmp"></rect>
          <text className="hp-bar-tmp-label"></text>
        </g>
      </svg>
    )
  }
})
