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


  handleSubmit : function() {
    var email = React.findDOMNode(this.refs['input-login']).value;
    var valid = this.validateEmail(email);

    if (!valid) {
      this.setState({ message : "Invalid email address format!" });
      return;
    }

    localStorage.setItem("__cm_character_app_email__", email);
    this.setState({ btnVal : "Sending...", disabled : true });

    // login user
    db.login(email).then((msg) => {
      this.setState({ btnVal : "Sent", message : "Check your email!", messageType : "success" });
    }).catch((err) => {
      this.setState({ btnVal : "Submit", disabled : false, message : err.message, messageType : "alert" });
      console.error(err);
    });
    
  },


  render : function() {
    return (
      <section className="login-page">
        <div className="grid">
          <div className="row">
            <div className="col-xs-12 col-sm-4 col-sm-offset-4">
              <div className="login-content">
                <h1 className="login-title">Authenticate</h1>
                <Message type={this.state.messageType} message={this.state.message} />
                <input className="login-input" ref="input-login" type="text" onFocus={this.clearMessage} placeholder="Email Address" />
                <button className="login-btn" disabled={this.state.disabled} onClick={this.handleSubmit}>{this.state.btnVal}</button>
                <section className="login-container-description">
                  <ol className="login-list">
                    <li>Enter your email address</li>
                    <li>Get sent an email</li>
                    <li>Click the link in the email</li>
                    <li>Party! Because you're all set to rock!</li>
                  </ol>
                  <p className="login-text-description">Do this any time you need to log into your account.</p>
                </section>
              </div>
            </div>
          </div>
        </div>
        <section className="footer-container">
          <div className="footer-content">
            <p className="footer-text-description">Designed by the ClockworkMonocle team | &copy;2015</p>
          </div>
        </section>
      </section>
    );
  }
})