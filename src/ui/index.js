'use strict';

import FastClick from 'fastclick';
import React from 'react';
import ReactDOM from 'react-dom';

import { initRouter } from './createRouter';
import { createState } from './state';
import { loadUser } from './state/actions';

import App from './App';

let mount = document.querySelector('#mount');
new FastClick(document.body);

// create state
let store = createState();

// start the router and handle routing to initial url
initRouter(store.dispatch);

store.subscribe(() => {
  let state = store.getState();
  let dispatch = store.dispatch;

  ReactDOM.render(<App dispatch={dispatch} state={state}/>, mount);
})

ReactDOM.render(<App dispatch={store.dispatch} state={store.getState()}/>, mount);