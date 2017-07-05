'use strict';

var React = require('react');
var classnames = require('classnames');

module.exports = class extends React.Component {
  static displayName = "Tab";

  handleClick = (ev) => {
    this.props._handleClick(this.props.idx);
  };

  render() {
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
}