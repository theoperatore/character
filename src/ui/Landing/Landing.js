'use strict';

import React from 'react';
import Link from '../router/Link';
import Router from '../router/Router';
import { db, ref } from '../../api';

export default React.createClass({
  displayName: 'Landing',

  getInitialState() {
    return ({
      disabled: false,
      msg: ''
    })
  },

  loginTestUser() {
    this.setState({ disabled: true });

    db.auth()
      .signInWithEmailAndPassword('test@test.com', 'pcTest')
      .then(user => {
        if (user) {
          Router.nav('#/profile');
        }
        else {
          this.setState({ disabled: false, msg: 'Something went wrong...' });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ disabled: false, msg: err.message });
      });
  },

  render() {
    var style = {
      "maxWidth" : 225,
      "padding" : 5
    }

    return (
      <div style={style}>
        <h1>Pocket Character</h1>
        <hr />
        <button 
          onClick={this.loginTestUser}
          disabled={this.state.disabled}
        >{this.state.disabled ? 'Signing In...' : 'Test Authenticate'}</button>
        <hr />
        <Link disabled={true} className='link' href='/login'>Sign In</Link>
        <hr />
        <p className='text-red'>{this.state.msg}</p>
      </div>
    )
  }
})