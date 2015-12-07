'use strict';

var React = require('react');
var log = require('debug')('logs:component');
var d3 = require('d3');

module.exports = React.createClass({
  displayName : "MoneyChart",


  getDefaultProps : function() {
    return ({
      width : "100%",
      height: 150,
      data : {}
    })
  },


  init : function() {
    var mount = d3.select(React.findDOMNode(this));
    var g = mount.append('g');
    var labels = g.append('g').attr('class', 'labels');
  },


  renderMoney : function() {
    var mount = React.findDOMNode(this);
    var svg = d3.select(mount);
    var g = svg.select('g');
    var width = mount.getBoundingClientRect().width;
    var height = mount.getBoundingClientRect().height;
    var xscale = d3.scale.ordinal();
    var yscale = d3.scale.linear();
    var xaxis = d3.svg.axis();
    var data = [];
    var bars;
    var labels;
    var scores;

    xscale.rangeRoundBands([0, width], 0.01);
    yscale.range([0, (height - 50)]);

    // immutable.js; format data for d3 use
    this.props.data.forEach((v, k) => {
      data.push({
        name : k,
        amount : v
      })
    })

    xscale.domain(data.map((d) => d.name ));
    yscale.domain([0, d3.max(data, (d) => d.amount)]);
    xaxis.scale(xscale).orient('bottom');

    bars = g.selectAll('rect.monies-bar').data(data);

    bars.enter()
      .append('rect')
      .attr('class', 'monies-bar')
      .attr('x', (d) => xscale(d.name))
      .attr('y', height - 25)
      .attr('fill', '#dff0d8')
      .attr('width', xscale.rangeBand())
      .attr('height', 0)
      .transition()
      .duration(400)
      .ease('bounce')
      .attr('y', (d) => (height - 25) - yscale(d.amount) )
      .attr('height', (d) => yscale(d.amount) )

    bars
      .attr('x', (d) => xscale(d.name))
      .attr('y', height - 25)
      .attr('fill', '#dff0d8')
      .attr('width', xscale.rangeBand())
      .attr('height', 0)
      .transition()
      .duration(400)
      .ease('bounce')
      .attr('height', (d) => yscale(d.amount) )
      .attr('y', (d) => (height - 25) - yscale(d.amount) );

    bars.exit().remove();

    labels = g.select('g.labels')
      .attr('transform', 'translate(0,' + (height - 25) + ")")
      .call(xaxis);

    scores = g.selectAll('text.scores').data(data);

    scores.enter()
      .append('text')
      .attr('class', 'scores')
      .attr('text-anchor', 'middle')
      .attr('x', (d,i) => xscale(d.name) + xscale.rangeBand() / 2)
      .attr('y', (d) => (height - 35) - yscale(d.amount))
      .text((d) => d.amount)

    scores
      .attr('x', (d,i) => xscale(d.name) + xscale.rangeBand() / 2)
      .attr('y', (d) => (height - 35) - yscale(d.amount))
      .text((d) => d.amount)

    scores.exit().remove();

  },


  componentDidMount : function() {
    this.init();
    this.renderMoney();
  },


  componentDidUpdate : function() {
    log('updating money');
    this.renderMoney();
  },


  shouldComponentUpdate : function(nextProps, nextState) {
    return (this.props.data !== nextProps.data);
  },


  render : function() {
    return (
      <svg width={this.props.width} height={this.props.height}></svg>
    )
  }
})
