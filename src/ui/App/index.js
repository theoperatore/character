import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute';
import UserProvider from '../UserProvider';
import Profile from '../Profile/Profile';
import Character from '../Character/Character';

export default class App extends Component {
  render() {
    const { state, dispatch, match } = this.props;
    return (<UserProvider state={state} dispatch={dispatch}>
      <Switch>
        <ProtectedRoute
          state={state}
          exact
          path={`${match.url}/profile`}
          render={() => <Profile state={state} dispatch={dispatch} />}
        />

        <ProtectedRoute
          state={state}
          exact
          path={`${match.url}/character/:characterId`}
          render={matchProps => <Character
            state={state}
            dispatch={dispatch}
            characterId={matchProps.match.params.characterId}
          />}
        />

        <Route render={() => <Redirect to={`${match.url}/profile`} />} />
      </Switch>
    </UserProvider>);
  }
}
