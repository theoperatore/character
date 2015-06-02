'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  render : function() {
    var href = "#" + this.props.href.replace("#", "");

    return (
      <a href={href}>{this.props.children}</a>
    );
  }
})