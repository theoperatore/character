'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName : "Icon",

  render : function() {
    var { icon, ...others } = this.props;

    return (<span {...others} className={`icon ${icon}`}></span>);
  }
})