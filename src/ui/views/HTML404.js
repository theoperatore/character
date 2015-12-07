"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName : "404",
  render : function() {
    return (
      <div className="container">
        <h1>Page Not Found!</h1>
      </div>
    );
  }
})