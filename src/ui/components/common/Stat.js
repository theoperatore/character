'use strict';

var React = require('react/addons');
var classnames = require('classnames');

module.exports = React.createClass({
  displayName : "Stat",


  getDefaultProps : function() {
    return ({
      title : 'stat',
      subtitle : '',
      score : 0,
      background : false,
      trained : false
    })
  },


  shouldComponentUpdate : function(nextProps) {
    return (
      nextProps.score !== this.props.score ||
      nextProps.title !== this.props.title ||
      nextProps.trained !== this.props.trained ||
      nextProps.subtitle !== this.props.subtitle
    );
  },


  render : function() {
    var css = classnames({
      'stat-content' : true,
      'stat-background' : this.props.background,
      'bg-blue' : this.props.background,
      'text-blue' : this.props.background,
      'stat-trained' : this.props.trained
    });


    return (
      <div className="stat-container">
        <div className="stat-title">
          <p>{this.props.title}</p>
        </div>
        <div className={css}>
          <p>{this.props.score}</p>
        </div>
        <div className="stat-subtitle">
          <p>{this.props.subtitle}</p>
        </div>
      </div>
    )
  }
})