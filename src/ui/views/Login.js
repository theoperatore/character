"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../router/Router';
import Message from '../components/Message';
import db from '../../api';

export default React.createClass({
  displayName : "Login",


  getInitialState : function() {
    return ({
      btnVal : "Submit",
      message : "",
      messageType : "alert",
      disabled : false
    })
  },


  componentWillMount : function() {
    var email;
    var newuser;

    // if there is a token, then use it to authenticate
    if (this.props.token) {
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

        return db.once('/users/' + db.ref.getAuth().uid);
      }).then((snapshot) => {
        var user = snapshot.val();

        if (!user) throw new Error("Cannot read from user");

        Router.nav('/user/' + user['profile_name']);

      }).catch((err) => {
        this.setState({ message : err.message, messageType : "alert", btnVal : "Submit", disabled : false });
      })
    }
  },


  // regex from : http://stackoverflow.com/a/46181/3780697
  validateEmail : function(email) {
    var regx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    return regx.test(email);
  },


  handleSubmit : function() {
    var email = ReactDOM.findDOMNode(this.refs['input-login']).value;
    var valid = this.validateEmail(email);

    if (!valid) {
      this.setState({ message : "Invalid email address format!" });
      return;
    }

    localStorage.setItem("__cm_character_app_email__", email);
    this.setState({ btnVal : "working...", disabled : true });

    // login user
    db.login(email).then((msg) => {
      this.setState({ btnVal : "Success", message : "Check your email!", messageType : "success", disabled : true });
    }).catch((err) => {
      this.setState({ btnVal : "Submit", disabled : false, message : err.message, messageType : "alert" });
      console.error(err);
    });
    
  },


  render : function() {
    return (
      <div className="login-page">
        <div className="login-content">
          <h1 className="login-title">A</h1>
          <p>authenticate</p>
          <div className="login-input-group">
            <Message type={this.state.messageType} message={this.state.message} />
            <input className="login-input" disabled={this.state.disabled} ref="input-login" type="email" placeholder="Email Address" />
            <button className="login-btn" disabled={this.state.disabled} onClick={this.handleSubmit}>{this.state.btnVal}</button>
          </div>
          <p className="login-subtext"><small>&copy;2016 - ClockworkMonocle</small></p>
        </div>
      </div>
    );
  }
})