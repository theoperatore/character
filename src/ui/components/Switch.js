'use strict';

var React = require('react/addons');
var classnames = require('classnames');

module.exports = React.createClass({
  displayName : "Switch",


  getDefaultProps : function() {
    return ({
      active : false
    })
  },


  render : function() {
    var { active, ...others } = this.props;
    
    var cssContainer = classnames({
      'switch-container' : true,
      'switch-active' : active
    });

    var cssContent = classnames({
      'switch-content' : true,
      'switch-active' : active
    });

    return (
      <span className={cssContainer} {...others}>
        <span className={cssContent}></span>
      </span>
    );
  }
})