import React from 'react';
import DocumentTitle from 'react-document-title';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import Login from './Login';

export function App({ store }) {
  return (
    <DocumentTitle title="D&D 5e Character">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route
              path="/profile"
              exact
              render={/* istanbul ignore next */ () => (
                <h1>This one is profile</h1>
              )}
            />
            <Route
              path="/app"
              render={/* istanbul ignore next */ () => <h1>This one is app</h1>}
            />
            <Route
              render={/* istanbul ignore next */ () => <Redirect to="/app" />}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    </DocumentTitle>
  );
}

App.propTypes = {
  store: Provider.propTypes.store,
};

export default App;
