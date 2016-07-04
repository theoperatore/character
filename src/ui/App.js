'use strict';

import React from 'react';

import Landing from './Landing/Landing';
import Character from './Character/Character';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import HTML404 from './NotFound/HTML404';
import { ROUTE_LANDING, ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_CHARACTER } from './routes';

export default React.createClass({
  display: 'App',

  render() {
    let route = this.props.state.route.get('route');
    let { dispatch, state } = this.props;

    switch (route) {
      case ROUTE_LANDING:
        return <Landing dispatch={dispatch} state={state}/>;
      case ROUTE_LOGIN:
        return <Login dispatch={dispatch} state={state}/>;
      case ROUTE_PROFILE:
        return <Profile dispatch={dispatch} state={state} />;
      case ROUTE_CHARACTER:
        return <Character dispatch={dispatch} state={state}/>;
      default:
        return <HTML404 dispatch={dispatch} state={state}/>;
    }
  },
});
