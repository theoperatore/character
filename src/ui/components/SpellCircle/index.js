'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

module.exports = React.createClass({
  displayName : 'SpellCircle',


  getInitialState : function() {
    return ({

      // 0 - 8 are levels 1-9, 9 is cantrips?
      selected : 9
    })
  },


  getDefaultProps : function() {
    return ({
      width : '100%',
      height : 500,
      onSpellSlotSelect : () => {}
    })
  },


  shouldComponentUpdate : function(nextProps, nextState) {
    return (this.props.data !== nextProps.data ||
            this.state.selected !== nextState.selected);
  },


  componentDidUpdate : function() {
    this.redraw();
  },


  // need an 'init' because the pie layout should be in the center of the
  // containing svg element
  componentDidMount : function() {
    var mount = ReactDOM.findDOMNode(this);
    var height = mount.getBoundingClientRect().height;
    var width = mount.getBoundingClientRect().width;
    var svg = d3.select(mount);

    svg.append('g')
      .attr('class', 'spellcircle-container')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2 - 60) + ')');

    svg.append('g')
      .attr('class', 'spellcircle-cantrips-container');

    svg.append('g')
      .attr('class', 'spellcircle-labels')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2 - 60) + ')');;

    // actually draw it
    this.redraw();
  },


  redraw : function() {
    var mount = ReactDOM.findDOMNode(this);
    var height = mount.getBoundingClientRect().height;
    var width = mount.getBoundingClientRect().width;
    var g = d3.select(mount).select('g.spellcircle-container');
    var lg = d3.select(mount).select('g.spellcircle-labels');
    var cg = d3.select(mount).select('g.spellcircle-cantrips-container');
    var data = [];
    var dataCantrip;
    var outerRadius;
    var innerRadius;
    var paths;
    var layout;
    var arc;
    var cantrips;
    var labels;
    var cantripLabel;

    dataCantrip = this.props.data.toJS().slice(0, 1);
    this.props.data.toJS().forEach((d) => {
      var slots = parseInt(d.slots, 10);
      var used = parseInt(d.used, 10);

      if (slots > 0) {
        data.push({
          value : slots - used + 10,
          name : d.name,
          slots : slots,
          used : used,
          selected : false
        })
      }
    })

    // initialize radii
    outerRadius = (width > height) ? (height / 2) - 60 : (width / 2) - 5;
    innerRadius = 5;

    cg.attr('transform', `translate(${width / 2 - outerRadius}, ${2 * outerRadius + 30})`)

    layout = d3.layout.pie()
      .value((d) => d.value)
      .padAngle((d) => 3 * Math.PI / 180)
      .sort(null);

    arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius((d) => outerRadius * (d.data.value / (d.data.slots + 10)));

    paths = g.selectAll('paths.spellcircle-section').data(layout(data));
    labels = lg.selectAll('text.spellcircle-label').data(layout(data));
    cantrips = cg.selectAll('rect.spellcircle-cantrips').data(dataCantrip);
    cantripLabel = cg.selectAll('text.spellcircle-label').data(dataCantrip);

    // Entering
    paths.enter()
      .append('path')
      .attr('class', 'spellcircle-section')
      .attr('style', 'stroke-width: 2px')
      .attr('fill', '#d9edf7')
      .attr('d', arc);

    labels.enter()
      .append('text')
      .attr('class', 'spellcircle-label')
      .attr('text-anchor', 'middle')
      .text((d) => d.data.name)
      .attr('fill', '#31708f')
      .attr('dy', '0.35em')
      .attr('transform', (d) => {
        var a = (d.startAngle + d.endAngle) * (90 / Math.PI) - 90;
        var c = arc.centroid(d);
        a = a > 90 ? a - 180 : a;

        return `translate(${c})rotate(${a})`;
      });

    cantrips.enter()
      .append('rect')
      .attr('class', 'spellcircle-cantrips')
      .attr('width', outerRadius * 2)
      .attr('height', '60px')
      .attr('fill', '#d9edf7')
      .attr('style', 'stroke-width: 2px');

    cantripLabel.enter()
      .append('text')
      .attr('class', 'spellcircle-label')
      .attr('text-anchor', 'middle')
      .text('Cantrips')
      .attr('fill', '#31708f')
      .attr('dy', '0.35em')
      .attr('transform', `translate(${outerRadius}, 30)`);

    // Updating
    paths
      .attr('stroke', (d, i) => {
        return i === this.state.selected ? '#31708f' : '#d9edf7';
      })
      .attr('d', arc);

    labels
      .text((d) => d.data.name)
      .attr('transform', (d) => {
        var a = (d.startAngle + d.endAngle) * (90 / Math.PI) - 90;
        var c = arc.centroid(d);
        a = a > 90 ? a - 180 : a;

        return `translate(${c})rotate(${a})`;
    });

    cantrips
      .attr('stroke', (d) => {
        return this.state.selected === 9 ? '#31708f' : '#d9edf7';
      });


    // Exiting
    paths.exit().remove();
    labels.exit().remove();
    cantrips.exit().remove();

    // Event handlers
    var me = this;
    function handleSelect(d, i) {
      me.props.onSpellSlotSelect(d,i);
      me.setState({ selected : i });
    }

    function handleCantripsSelect(d) {
      me.props.onSpellSlotSelect(d, 9);
      me.setState({ selected : 9 });
    }

    labels.on('click', handleSelect);
    paths.on('click', handleSelect);
    cantrips.on('click', handleCantripsSelect);
  },


  render : function() {
    return (
      <svg width={this.props.width} height={this.props.height}></svg>
    )
  }
})
