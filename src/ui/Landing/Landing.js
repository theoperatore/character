'use strict';

import React from 'react';
import { signInWithEmail, signOut } from '../state/actions';
import { ROUTE_LOGIN } from '../routes';
import Router from '../router/Router';

export default React.createClass({
  displayName: 'Landing',

  loginTestUser() {
    // this.props.dispatch(signInWithEmail('test@test.com', 'pcTest'));
  },

  componentDidMount() {
    this.props.dispatch(signOut());
  },

  render() {
    let style = {
      "maxWidth" : 225,
      "padding" : 5
    }

    return (
      <div style={style}>
        <h1>Pocket Character</h1>
        <hr />
        <p className='link' onClick={() => Router.nav(ROUTE_LOGIN)}>Sign In</p>
      </div>
    )
  }
})