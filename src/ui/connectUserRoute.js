import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import { loadUser } from './state/actions';

const log = debug('pc:user');

export default function connectUserRoute(Route) {
  return class ConnectedUserRoute extends Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
    }

    componentDidMount() {
      let user = this.props.state.user;
      let status = this.props.state.status;
      if (!user.get('uid') && !status.get('userLoadingProfile')) {
        log('trying to load user...');
        this.props.dispatch(loadUser());
      }
    }

    render() {
      return <Route
        {...this.props}
      />
    }
  }
}
