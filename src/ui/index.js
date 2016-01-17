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
// import StyleGuide from './views/StyleGuide';
import HTML404 from './views/HTML404';


///////////////////////////////////////////////////////////////////////////////
//
// Load dummy data
//
///////////////////////////////////////////////////////////////////////////////
import { characters as dummyCharacters } from '../dummy-data/dummy-characters';
///////////////////////////////////////////////////////////////////////////////

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

  let characterUID = params.uid;
  let character = dummyCharacters[characterUID].character_data;
  let preference = dummyCharacters[characterUID].preference_data;

  // /users/id/character/pushID must be the same pushId as /characters/pushID
  // in order to write
  //
  // also need to give each entry an id to help with updating character state
  // if (this.props.characterUID !== 'noload') {
  //   db.once('characters/' + this.props.characterUID).then((snap) => {
  //     var character = snap.val();
  //     var data;
  //     var preferences;

  //     data = JSON.parse(character.character_data);
  //     preferences = JSON.parse(character.preference_data);

  //     data = Immutable.fromJS(data);
  //     preferences = Immutable.fromJS(preferences);

  //     data = this.state.character.mergeDeep(data);

  //     // TODO: remove
  //     window.characterjs = data.toJS();
  //     window.character = data;
  //     window.preferences = preferences.toJS();

  //     this.setState({ character : data, preferences : preferences, loading : false });
  //   }).catch((err) => {
  //     error(err.message);
  //     error('using blank character');
  //     this.setState({ loading : false });
  //   })
  // }
  // else {
  //   this.setState({ loading : false });
  // }

  ReactDOM.render(<App character_data={character} preferences_data={preference} onNewState={handleNewState}/>, mount);
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


function handleNewState(newState, event) {
  log('got new root state:', newState, event);
}


window.messages = require('debug');
