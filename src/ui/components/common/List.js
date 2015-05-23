"use strict";

var React = require('react/addons');

class List extends React.Component {
  render() {
    var { className, ...other } = this.props;
    
    return (
      <ul {...other} className={"list " + className}>
        {this.props.children}
      </ul>
    );
  }
}

module.exports = List;