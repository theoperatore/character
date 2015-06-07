"use strict";

var React = require('react/addons');

module.exports = React.createClass({
  displayName : "App",
  render : function() {
    return (
      <div className="container">
        <h1>Character</h1>
        <p>{this.props.character}</p>
      </div>
    );
  }
})