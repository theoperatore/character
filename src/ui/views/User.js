"use strict";

var React = require('react/addons');

module.exports = React.createClass({
  displayName : "User",
  render : function() {
    return (<h1>{this.props.id}</h1>);
  }
})