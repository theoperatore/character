import React, { PureComponent } from 'react';
import DocumentTitle from 'react-document-title';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Redirect, Route} from 'react-router-dom';

import Showcase from './Showcase';

export default class App extends PureComponent {
  static propTypes = {
    store: Provider.propTypes.store,
  };

  render() {
    const { store } = this.props;

    return (
      <DocumentTitle title="D&D 5e Character">
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route
                path="/login"
                exact
                render={() => <h1>Login to your stuff</h1>}
              />
              <Route
                path="/profile"
                exact
                render={() => <h1>This one is profile</h1>}
              />
              <Route
                path="/app"
                render={() => <h1>This one is app</h1>}
              />
              <Route
                path="/showcase"
                exact
                component={Showcase}
              />
              <Route render={() => <Redirect to='/showcase' />} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </DocumentTitle>
    );
  }
}
