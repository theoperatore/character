"use strict";

var React = require('react/addons');
var Router = require('../router/Router');
var Message = require('../components/Message');
var db = require('../../api');

module.exports = React.createClass({
  displayName : "Login",


  getInitialState : function() {
    return ({
      btnVal : "Log in",
      message : "",
      messageType : "alert",
      disabled : false
    })
  },


  componentWillMount : function() {
    var email;
    var newuser;

    if (db.ref.getAuth()) {
      Router.nav("/user");
    }
    else if (this.props.token) {
      email = localStorage.getItem("__cm_character_app_email__");
      newuser = localStorage.getItem("__cm_character_app_new_user__");
      this.setState({ btnVal : "Authenticating...", disabled : true });

      db.auth(email, this.props.token).then((auth) => {
        if (newuser) {
          var query = "/users/" + auth.uid;
          var user = {};

          user['profile_name'] = email.split("@")[0];
          user['signup_date'] = +new Date;

          return db.update(query, user);
        }
      }).then(() => {
        localStorage.removeItem("__cm_character_app_email__");
        localStorage.removeItem("__cm_character_app_new_user__");
        Router.nav('/user');
      }).catch((err) => {
        this.setState({ message : err.message, messageType : "alert", btnVal : "Log in", disabled : false });
      })
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
    var valid = this.validateEmail(email);
    var pass = this.generatePass();

    if (!valid) {
      this.setState({ message : "Invalid email address format!" });
      return;
    }

    localStorage.setItem("__cm_character_app_email__", email);
    this.setState({ btnVal : "Sending...", disabled : true });

    // assume a new user;
    db.create(email, pass).then((auth) => {

      localStorage.setItem("__cm_character_app_new_user__", "new_user_times_yeah");
      return db.token(email);
    }).catch((err) => {
      if (err.code === "EMAIL_TAKEN") {
        return db.token(email);
      }

      throw new Error(err);
    }).then((msg) => {
      this.setState({ btnVal : "Sent", message : "Check your email!", messageType : "success" });
    }).catch((err) => {
      this.setState({ btnVal : "Submit", disabled : false, message : err.message, messageType : "alert" });
      console.error(err);
    });
  },


  render : function() {

    return (
      <div className="login-container">
        <h1 className="login-title">Authenticate</h1>
        <Message type={this.state.messageType} message={this.state.message} />
        <input ref="input-login" type="text" className="login-input-email-address" onFocus={this.clearMessage} placeholder="Email Address" />
        <button disabled={this.state.disabled} onClick={this.handleSubmit}>{this.state.btnVal}</button>
      </div>
    );
  }
})