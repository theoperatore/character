import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Landing from './Landing/Landing';
import Login from './Login/Login';
import App from './App';

export default class Root extends Component {
  render() {
    const { dispatch, state } = this.props;

    return (<BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Landing dispatch={dispatch} state={state}/> }
        />

        <Route
          exact
          path="/login"
          render={() => <Login dispatch={dispatch} state={state} />}
        />

        <Route
          path="/app"
          render={matchProps => <App dispatch={dispatch} state={state} match={matchProps.match}/>}
        />

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>);
  }
}
