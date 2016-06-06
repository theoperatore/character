"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../router/Router';
import Message from '../components/Message';
import Icon from '../components/Icon';
import firebase from 'firebase';

export default React.createClass({
  displayName: "Login",

  getInitialState() {
    return ({
      message : "",
      messageType : "alert",
      disabled : false,
      loading: true,
    })
  },

  componentWillMount() {
    let isRedirected = sessionStorage.getItem('__pocket_character_login__');
    
    if (isRedirected === 'LOGIN') {
      this.setState({ loading: true });
      firebase.auth().getRedirectResult()
        .then(result => {
          if (result.user) {
            Router.nav('#/profile');
            sessionStorage.setItem('__pocket_character_login__', false);
            return;  
          }

          this.setState({ loading: false });
          sessionStorage.setItem('__pocket_character_login__', false);
        })
        .catch(err => {
          this.setState({ message: err.message, loading: false })
        })
    }
    else {
      this.setState({ loading: false });
    }
  },

  googleLogin() {
    if (this.state.disabled || this.state.loading) return;

    this.setState({ disabled: true })

    sessionStorage.setItem('__pocket_character_login__', 'LOGIN');
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    
    firebase.auth()
      .signInWithRedirect(provider)
      .catch(err => {
        console.error(err);
        this.setState({ err: err.message })
      });
  },

  render() {
    return (
      <div className="login-page">
        <div className="login-content">
          <h1 className="login-title ml3"><Icon icon='fa fa-user-secret'/></h1>
          <p>Who are you?</p>
          <div className="login-input-group">
            <Message type={this.state.messageType} message={this.state.message} />
            {
              this.state.loading
              ? <p>Loading...</p>
              : <div className='mt3'>
                  <div
                    className='login-google'
                    disabled={this.state.disabled}
                    onClick={this.googleLogin}
                  ></div>
                </div>
            }
          </div>
          <p className="login-subtext"><small>&copy;2016 - ClockworkMonocle</small></p>
        </div>
      </div>
    );
  }
})