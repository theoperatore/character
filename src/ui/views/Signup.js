"use strict";

var React = require('react/addons');
var Router = require('../router/Router');
var Message = require('../components/Message');
var db = require('../../api');

module.exports = React.createClass({
  displayName : "Signup",


  getInitialState : function() {
    return ({
      btnVal : "Create",
      message : "",
      messageType : "alert",
      disabled : false
    })
  },


  componentWillMount : function() {
    var auth = db.ref.getAuth();

    if (auth) {
      Router.nav("/user");
    }
  },


  clearMessage : function() {
    this.setState({ message : "" });
  },


  // regex from : http://stackoverflow.com/a/46181/3780697
  validateEmail : function(email) {
    var regx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    return regx.test(email);
  },


  generatePass : function() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var pass = "";

    for (var i = 0; i < 32; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }

    return pass;
  },


  handleSubmit : function() {
    var email = React.findDOMNode(this.refs['input-login']).value;
    var passed = this.validateEmail(email);
    var password;

    if (!passed) {
      this.setState({ message : "Invalid email address format!" });
      return;
    }

    password = this.generatePass();

    localStorage.setItem("__cm_character_app_email__", email);
    localStorage.setItem("__cm_character_app_new_user__", "new_user");
    this.setState({ btnVal : "Creating...", disabled : true });

    // start create user times
    db.create(email, password).then((auth) => {
      return db.token(email);
    }).then((msg) => {
      this.setState({ message : "Check your email!", messageType : "success", btnVal : "Created" });
    }).catch((err) => {
      this.setState({ message : err.message, messageType : "alert", btnVal : "Create", disabled : false });
    })
  },


  render : function() {

    return (
      <div className="container">
        <h1>Create Account</h1>
        <Message type={this.state.messageType} message={this.state.message} />
        <input ref="input-login" type="text" className="input-email-address" onFocus={this.clearMessage} placeholder="Email Address" />
        <button disabled={this.state.disabled} onClick={this.handleSubmit}>{this.state.btnVal}</button>
      </div>
    );
  }
})