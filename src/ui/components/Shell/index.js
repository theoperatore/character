"use strict";

var React = require('react/addons');
var log = require('debug')('logs:component');
var d3 = require('d3');

module.exports = React.createClass({
  displayName : "Shell",


  getDefaultProps : function() {
    return ({
      height: 500,
      width: "100%",
      sort : false,
      duration : 350,
      bonus : 4
    })
  },


  renderShell : function() {
    var mount = d3.select(React.findDOMNode(this));
    var g = mount.select('g');

    var layout = d3.layout.pie()
      .value(function(d) { return scale(d.score); })
      .padAngle( 1 * Math.PI / 180 )

    if (!this.props.sort) {
      layout.sort(null);
    }

    var maxScore = 0;
    var data = this.props.data.toJS().map(function(skill) {
      var out = {};

      // needs refactor to just use data values, should not know about
      // trained or anything else.
      // When in real use, should have data calculated automatically
      out.score = skill.score;
      out.name = skill.name;
      out.abil = skill.mod;

      maxScore = Math.max(maxScore, out.score);

      return out;
    })

    var width = mount[0][0].getBoundingClientRect().width;
    var height = mount[0][0].getBoundingClientRect().height;
    var outerRadius = this.props.outerRadius || (width < height) ? (width / 2) - 5 : (height / 2) - 5;
    var innerRadius = this.props.innerRadius || outerRadius * 0.33333;
    var scale = d3.scale.linear().range([45, 60]).domain([0, maxScore]);

    var arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(function(d) {
        return outerRadius * (d.value / 60);
      })

    g.attr('transform', 'translate(' + width / 2 + "," + height / 2 + ")");

    var path = g.selectAll('path').data(layout(data));


    path.enter()
      .append('path')
      .attr('class', 'shell-sections')
      .attr('fill', function(d) {
        if (d.data.score >=0 && d.data.score < 4) {
          return '#f2dede';
        }
        else if (d.data.score >= 4 && d.data.score < 7) {
          return '#fcf8e3';
        }
        else {
          return '#dff0d8';
        }
      })
      .attr('stroke', function(d) {
        if (d.data.score >=0 && d.data.score < 4) {
          return '#ebccd1';
        }
        else if (d.data.score >= 4 && d.data.score < 7) {
          return '#faebcc';
        }
        else {
          return '#d6e9c6';
        }
      })

    path.attr('fill', function(d) {
        if (d.data.score >=0 && d.data.score < 4) {
          return '#f2dede';
        }
        else if (d.data.score >= 4 && d.data.score < 7) {
          return '#fcf8e3';
        }
        else {
          return '#dff0d8';
        }
      })
      .attr('stroke', function(d) {
        if (d.data.score >=0 && d.data.score < 4) {
          return '#ebccd1';
        }
        else if (d.data.score >= 4 && d.data.score < 7) {
          return '#faebcc';
        }
        else {
          return '#d6e9c6';
        }
      })

    path.exit().remove();

    path.transition()
      .duration(this.props.duration)
      .attrTween('d', function(d) {
        var i = d3.interpolate(d.startAngle, d.endAngle);

        return function(t) {
          d.endAngle = i(t);
          return arc(d);
        }
      })

    var nameText = g.select('text.hovered-text-name')
      .text('Skills');

    var scoreText = g.select('text.hovered-text-score')
      .text('');

    var abilText = g.select('text.hovered-abil-text')
      .text('');

    var labels = g.selectAll('text.label').data(layout(data));

    labels.attr('fill', function(d) {
        if (d.data.score >=0 && d.data.score < 4) {
          return '#a94442';
        }
        else if (d.data.score >= 4 && d.data.score < 7) {
          return '#8a6d3b';
        }
        else {
          return '#3c763d';
        }
      })
      .attr('transform', function(d) {
        var a = (d.startAngle + d.endAngle) * (90 / Math.PI) - 90;
        a = a > 90 ? a- 180 : a;
        var c = arc.centroid(d);

        return 'translate(' + c + ') rotate(' + a + ')';
      })
      .text(function(d) { return d.data.name; });

    labels.enter()
      .append('text')
      .attr('class', 'label')
      .attr('fill', function(d) {
        if (d.data.score >=0 && d.data.score < 4) {
          return '#a94442';
        }
        else if (d.data.score >= 4 && d.data.score < 7) {
          return '#8a6d3b';
        }
        else {
          return '#3c763d';
        }
      })
      .attr('text-anchor', 'middle')
      .attr('transform', function(d) {
        var a = (d.startAngle + d.endAngle) * (90 / Math.PI) - 90;
        a = a > 90 ? a- 180 : a;
        var c = arc.centroid(d);

        return 'translate(' + c + ') rotate(' + a + ')';
      })
      .text(function(d) { return d.data.name; });

    labels.exit().remove();

    function startInspectSkill(d) {
      nameText.text(d.data.name)
      scoreText.text(d.data.score)
      abilText.text("(" + d.data.abil + ")");

      d3.select(this).attr('stroke', 'rgba(66, 139, 202, 1)').attr('style', 'stroke-width: 1px');

      d3.event.preventDefault();
      d3.event.stopPropagation();
    }

    function stopInspectSkill() {
      d3.select(this).attr('stroke', 'rgba(66, 139, 202, 0)');

      d3.event.preventDefault();
      d3.event.stopPropagation();
    }

    function startInspectLabelSkill(d,i) {
      nameText.text(d.data.name);
      scoreText.text(d.data.score);
      abilText.text("(" + d.data.abil + ")");

      d3.select(path[0][i])
        .attr('stroke', 'rgba(66, 139, 202, 1)').attr('style', 'stroke-width: 1px');

      d3.event.preventDefault();
      d3.event.stopPropagation();
    }

    function stopInspectLabelSkill(d,i) {
      d3.select(path[0][i])
        .attr('stroke', 'rgba(66, 139, 202, 0)');

      d3.event.preventDefault();
      d3.event.stopPropagation();
    }

    path.on('touchstart', startInspectSkill);
    path.on('touchend',  stopInspectSkill);
    path.on('mouseover', startInspectSkill);
    path.on('mouseleave', stopInspectSkill);

    labels.on('touchstart', startInspectLabelSkill)
    labels.on('touchend', stopInspectLabelSkill)
    labels.on('mouseover', startInspectLabelSkill);
    labels.on('mouseleave', stopInspectLabelSkill);
  },


  componentDidMount : function() {
    var mount = d3.select(React.findDOMNode(this));
    var g = mount.append('g').attr('class', 'shell-component');
    g.append('text')
      .attr('class', 'hovered-text-name')
      .attr('dy', '-1.45em')
      .attr('text-anchor', 'middle')
      .text('Skills');

    g.append('text')
      .attr('class', 'hovered-text-score')
      .attr('dy', '0.45em')
      .attr('text-anchor', 'middle')

    g.append('text')
      .attr('class', 'hovered-abil-text')
      .attr('dy', '2.9em')
      .attr('text-anchor', 'middle')

    this.renderShell();
  },

  componentDidUpdate : function() {
    log('updating shell');
    this.renderShell();
  },

  shouldComponentUpdate : function(nextProps) {
    return (nextProps.data !== this.props.data ||
            nextProps.sort !== this.props.sort);
  },


  render : function() {
    var { height, width } = this.props;

    return (
      <svg height={height} width={width}></svg>
    );
  }
})
