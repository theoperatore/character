import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class ProtectedRoute extends Component {
  render() {
    const { state, ...routeProps } = this.props;
    const { status, user } = state;

    return user.get('uid') && status.get('userSignedIn')
      ? <Route {...routeProps} />
      : <Redirect to="/login" />
  }
}
