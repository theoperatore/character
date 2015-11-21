'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  displayName : "Icon",

  render : function() {
    var { icon, ...others } = this.props;

    return (<span {...others} className={icon}></span>);
  }
})