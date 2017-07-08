import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmail, signOut } from '../state/actions';

export default class Landing extends Component {
  static displayName = 'Landing';

  loginTestUser() {
    // this.props.dispatch(signInWithEmail('test@test.com', 'pcTest'));
  }

  // componentDidMount() {
  //   this.props.dispatch(signOut());
  // },

  render() {
    let style = {
      "maxWidth" : 225,
      "padding" : 5
    }

    return (
      <div style={style}>
        <h1>Pocket Character</h1>
        <hr />
        <Link to="/app">Sign In</Link>
      </div>
    )
  }
}
