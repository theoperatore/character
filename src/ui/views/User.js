"use strict";

var React = require('react/addons');
var db = require('../../api');
var Router = require('../router/Router');

module.exports = React.createClass({
  displayName : "User",


  logout : function() {
    db.ref.unauth();
    Router.nav('/login');
  },
  

  render : function() {
    return (
      <div className="container">
        <h1>{this.props.id || "No user logged in"}</h1>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
})