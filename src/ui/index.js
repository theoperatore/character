"use strict";

import FastClick from 'fastclick';
import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import debug from 'debug';
import Router from './router/Router';
import db from '../api';

import Landing from './views/Landing';
import App from './views/App';
import Login from './views/Login';
import User from './views/User';
// import StyleGuide from './views/StyleGuide';
import HTML404 from './views/HTML404';

import { createCharacterState } from './state';


///////////////////////////////////////////////////////////////////////////////
//
// Load dummy data
//
///////////////////////////////////////////////////////////////////////////////
import { characters as dummyCharacters } from '../dummy-data/dummy-characters';
///////////////////////////////////////////////////////////////////////////////

let log = debug('app:router');
let stateLog = debug('app:state');
let mount = document.querySelector('#mount');
let subscribedStateChange = null;

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

  // remove any previous event listeners on state change
  if (subscribedStateChange) {
    subscribedStateChange();
  }

  let characterUID = params.uid;
  let loadedCharacter = Immutable.fromJS(dummyCharacters[characterUID].character_data);
  let loadedPreferences = Immutable.fromJS(dummyCharacters[characterUID].preference_data);

  let store = createCharacterState(loadedCharacter, loadedPreferences);
  let { character, preferences } = store.getState();

  function updateState(action) {
    stateLog(action);
    store.dispatch(action);
  }

  subscribedStateChange = store.subscribe(function rerender() {
    let { character, preferences } = store.getState();
    ReactDOM.render(<App character={character} preferences={preferences} updateState={updateState}/>, mount);
  });

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

  ReactDOM.render(<App character={character} preferences={preferences} updateState={updateState}/>, mount);
})

// user
Router.get('/profile/(:id)', (params) => {
  // if (!db.ref.getAuth()) {
  //   Router.nav('/login');
  //   return;
  // }

  log(`routing to profile view: `, params);

  // remove any previous event listeners on state change
  if (subscribedStateChange) {
    subscribedStateChange();
  }

  ReactDOM.render(<User id={params.id} />, mount);
})

// login
Router.get('/login/(:id)', (params) => {
  var user = db.ref.getAuth();

  // remove any previous event listeners on state change
  if (subscribedStateChange) {
    subscribedStateChange();
  }

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

  // remove any previous event listeners on state change
  if (subscribedStateChange) {
    subscribedStateChange();
  }

  ReactDOM.render(<HTML404 />, mount);
})

// start routing!
Router.init();

// set up auth listnen
// db.ref.onAuth((auth) => {
//   if (!auth) {
//     Router.nav('/login');
//   }
// })
