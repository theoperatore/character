"use strict";

var React = require('react/addons');
var Link = require('../router/Link');

module.exports = React.createClass({
  displayName : "App",
  render : function() {
    return (
      <div className="container">
        <h1>Character</h1>
        <p><Link href="#/style">Style Guide</Link></p>
        <p><Link href="#/user">User</Link></p>
        <p><Link href="#/login">Log In</Link></p>
      </div>
    );
  }
})