'use strict';

var React = require('react/addons');
var cn = require('classnames');

module.exports = React.createClass({
  displayName : 'Button',


  getDefaultProps : function() {
    return ({
      size : 'sm'
    })
  },


  render : function() {
    return (
      <button>{this.props.children}</button>
    )
  }
})
