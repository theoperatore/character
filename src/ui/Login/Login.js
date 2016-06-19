"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../router/Router';
import Message from '../components/Message';
import Icon from '../components/Icon';
import firebase from 'firebase';
import { signOut } from '../state/actions';

export default React.createClass({
  displayName: "Login",

  getInitialState() {
    return ({
      messageType : "alert",
      disabled: false,
    })
  },

  handleProviderSearch() {
    // first get providers for email address
    // if password, navigate to password entry page
    // if federated provider, then log in via redirect
  },

  componentDidMount() {
    this.props.dispatch(signOut());
  },

  googleLogin() {
    if (this.props.isLoading || this.state.disabled) return;

    this.setState({ disabled: true })

    sessionStorage.setItem('__pocket_character_redirect_login__', 'LOGIN');
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
          <div className='login-input-group'>
            <input
              className='login-input'
              type='email'
              placeholder='email address'
            />
            <button
              className='login-btn'
              onClick={this.handleProviderSearch}
              disabled={this.props.isLoading || this.state.disabled}
            >Sign In</button>
            <hr />
          </div>
          <div className="login-input-group">
            <Message type={this.state.messageType} message={this.state.error} />
            {
              this.props.isLoading
              ? <p>Loading...</p>
              : <div className='mt3'>
                  <div
                    className='login-google'
                    disabled={this.props.isLoading || this.state.disabled}
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