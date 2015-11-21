'use strict';

var React = require('react/addons');
var classnames = require('classnames');

module.exports = React.createClass({
  displayName : "Tab",


  handleClick : function(ev) {
    this.props._handleClick(this.props.idx);
  },


  render : function() {
    var { active } = this.props;
    var css = classnames({
      'tab-container' : true,
      'active' : active
    });

    return (
      <div className={css} onClick={this.handleClick}>
        <a>{this.props.children}</a>
      </div>
    );
  }
})