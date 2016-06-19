'use strict';

import React from 'react';
import debug from 'debug';
import { loadUser } from './state/actions';

const log = debug('pc:user');

export default function connectUserRoute(Route) {
  return React.createClass({

    propTypes: {
      dispatch: React.PropTypes.func.isRequired,
      state: React.PropTypes.object.isRequired,      
    },

    componentDidMount() {
      let user = this.props.state.user;
      let status = this.props.state.status;
      if (!user.get('uid') && !status.get('userLoadingProfile')) {
        log('trying to load user...');
        this.props.dispatch(loadUser());
      }
    },

    render() {
      return <Route
        {...this.props}
      />
    }
  })
}