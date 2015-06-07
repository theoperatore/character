"use strict";

var React = require('react/addons');

module.exports = React.createClass({
  displayName : "User",
  render : function() {
    return (
      <div className="container">
        <h1>{this.props.id || "No user logged in"}</h1>
      </div>
    );
  }
})