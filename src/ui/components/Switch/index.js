'use strict';

var React = require('react');
var classnames = require('classnames');

module.exports = React.createClass({
  displayName : "Switch",


  getDefaultProps : function() {
    return ({
      active : false,
      width : 1
    })
  },


  render : function() {
    var { active, ...others } = this.props;

    var cssContainer = classnames({
      'switch-container' : true,
      'switch-width-2' : this.props.width === 2,
      'switch-width-3' : this.props.width === 3,
      'switch-width-4' : this.props.width === 4,
      'switch-width-10' : this.props.width === 10,
      'switch-width-sm' : this.props.width === 'sm'
    });

    var cssOuter = classnames({
      'switch-outer' : true,
      'switch-active' : active
    })

    var cssContent = classnames({
      'switch-content' : true,
      'switch-active' : active
    });

    return (
      <div className={cssContainer} {...others}>
        <span className={cssOuter}>
          <span className={cssContent}></span>
        </span>
      </div>
    );
  }
})
