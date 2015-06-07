'use strict';

var React = require('react/addons');
var Link = require('../router/Link');

module.exports = React.createClass({
  render : function() {
    return (
      <div className="container">
        <h1>Do the things!</h1>
        <p><Link href="#/style">Style Guide</Link></p>
        <p><Link href="#/user/ralf">User: Ralf</Link></p>
        <p><Link href="#/character/ralf">Character: Ralf</Link></p>
        <p><Link href="#/login">Log In</Link></p>
      </div>
    )
  }
})