'use strict';

var React = require('react');
var classnames = require('classnames');

module.exports = React.createClass({
  displayName : "Tab",


  handleClick : function(ev) {
    this.props._handleClick(this.props.idx);
  },


  render : function() {
    var { active, className } = this.props;
    var css = classnames({
      'tab-container' : true,
      'active' : active
    });

    return (
      <div className={`${css} ${ className ? className: ''}`} onClick={this.handleClick}>
        <span>{this.props.children}</span>
      </div>
    );
  }
})