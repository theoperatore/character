import React, { Component, Children } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './components/Loading';

import { loadUser } from './state/actions';

export default class UserProvider extends Component {
  componentDidMount() {
    this.props.dispatch(loadUser());
  }

  render() {
    const { children, state } = this.props;
    const { user, status } = state;

    if (status.get('userAuthenticating')) {
      return <Loading isLoading />;
    }

    if (!status.get('userSignedIn')) {
      return <Redirect to="/login" />;
    }

    return Children.only(children);
  }
}
