'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  displayName : "Icon",

  render : function() {
    return (<span className={this.props.icon}></span>);
  }
})