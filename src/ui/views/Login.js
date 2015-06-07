"use strict";

var React = require('react/addons');
var db = require('../../api');

module.exports = React.createClass({
  displayName : "Login",
  render : function() {
    return (
      <div className="container">
        <h1>Log In</h1>
      </div>
    );
  }
})