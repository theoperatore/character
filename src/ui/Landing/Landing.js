'use strict';

import React from 'react';
import { db, ref } from '../../api';
import { signInWithEmail, signOut } from '../state/actions';
import { ROUTE_PROFILE } from '../routes';
import Router from '../router/Router';

export default React.createClass({
  displayName: 'Landing',

  loginTestUser() {
    // this.props.dispatch(signInWithEmail('test@test.com', 'pcTest'));
  },

  navigateToProfile() {
    Router.nav(ROUTE_PROFILE);
  },

  componentDidMount() {
    this.props.dispatch(signOut());
  },

  render() {
    let style = {
      "maxWidth" : 225,
      "padding" : 5
    }

    let isSignedIn = this.props.state.status.get('userSignedIn');
    let isAuthenticating = this.props.state.status.get('userAuthenticating');
    let authErrorMsg = this.props.state.status.getIn(['userAuthenticationError', 'message']);

    return (
      <div style={style}>
        <h1>Pocket Character</h1>
        <hr />
        {
          isSignedIn
          ? <button
              onClick={this.navigateToProfile}
            >Go to Profile</button>
          : <button 
              onClick={this.loginTestUser}
              disabled={isAuthenticating}
            >{isAuthenticating ? 'Signing In...' : 'Test Authenticate'}</button>
        }
        <hr />
        <p style={{ display: 'none' }} disabled={true} className='link'>Sign In</p>
        <hr />
        <p className='text-red'>{authErrorMsg}</p>
      </div>
    )
  }
})