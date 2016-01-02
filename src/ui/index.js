"use strict";

import FastClick from 'fastclick';
import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';
import Router from './router/Router';
import db from '../api';

import Landing from './views/Landing';
import App from './views/App';
import Login from './views/Login';
import User from './views/User';
//import StyleGuide from './views/StyleGuide';
import HTML404 from './views/HTML404';

let log = debug('app:router');
let mount = document.querySelector('#mount');

new FastClick(document.body);

// default route
Router.get('/', () => {
  ReactDOM.render(<Landing />, mount);
})

// view a character
Router.get('/user/(:id)/character/(:uid)', (params) => {
  // if (!db.ref.getAuth()) {
  //   Router.nav('/login');
  //   return;
  // }
  log(`routing to character view: `, params);
  ReactDOM.render(<App characterUID={params.uid} user={params.id} />, mount);
})

// user
Router.get('/profile/(:id)', (params) => {
  // if (!db.ref.getAuth()) {
  //   Router.nav('/login');
  //   return;
  // }

  log(`routing to profile view: `, params);
  ReactDOM.render(<User id={params.id} />, mount);
})

// login
Router.get('/login/(:id)', (params) => {
  var user = db.ref.getAuth();

  // if the user is already logged in, then redirect to profile page
  if (user) {
    db.once('/users/' + user.uid).then((snapshot) => {
      var u = snapshot.val();
      Router.nav('/profile/' + u['profile_name']);
    })
  }
  else {
    ReactDOM.render(<Login token={params.id} />, mount);
  }
})

// Not found
Router.get('*', () => {
  ReactDOM.render(<HTML404 />, mount);
})

// style guide
// Router.get('/style', () => {
//   ReactDOM.render(<StyleGuide />, mount);
// })

// start routing!
Router.init();



// set up auth listnen
// db.ref.onAuth((auth) => {
//   if (!auth) {
//     Router.nav('/login');
//   }
// })

window.messages = require('debug');
