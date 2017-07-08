import FastClick from 'fastclick';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import { createState } from './state';
import { loadUser } from './state/actions';

import Root from './Root';

let mount = document.querySelector('#mount');
new FastClick(document.body);

// create state
let store = createState();

store.subscribe(() => {
  let state = store.getState();
  let dispatch = store.dispatch;

  ReactDOM.render(<Root dispatch={dispatch} state={state}/>, mount);
});

ReactDOM.render(<Root dispatch={store.dispatch} state={store.getState()}/>, mount);
