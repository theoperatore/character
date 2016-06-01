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
import HTML404 from './views/HTML404';

import { createCharacterState } from './state';
import defaultPreferences from './data/defaultPreferences';

let log = debug('app:router');
let stateLog = debug('app:state');
let saveLog = debug('app:save');
let mount = document.querySelector('#mount');
let subscribedStateChange = null;

new FastClick(document.body);


// default route
Router.get('/', () => {
  ReactDOM.render(<Landing />, mount);
})


function loadCharacter(id) {
  return db.ref.child(`characters/${id}`).once('value').then(snapshot => {
    log('got character info: %o', snapshot.val());
    return snapshot.val();
  });
}

function renderApp({ loadedCharacter, loadedPreferences, characterId }) {
  let store = createCharacterState(loadedCharacter, loadedPreferences);
  let { character, preferences } = store.getState();

  function updateState(action) {
    stateLog(action);

    // db.ref.child(`actions/${characterId}`).push(action);

    store.dispatch(action);
  }

  subscribedStateChange = store.subscribe(function rerender() {
    let { character, preferences } = store.getState();

    let characterToSave = character.toJS();

    // save character to DB?
    db.ref.child(`characters/${characterId}`)
      .set(characterToSave)
      .then(() => {
        saveLog('saved new character state: %o', characterToSave);
      })
      .catch(err => {
        console.error(err);
      });

    db.ref.child(`users/${db.ref.getAuth().uid}/characters/${characterId}`)
      .update({
        characterClass: characterToSave.charInfo.class,
        characterLevel: characterToSave.charInfo.level,
      });

    ReactDOM.render(<App character={character} preferences={preferences} updateState={updateState}/>, mount);
  });

  ReactDOM.render(<App character={character} preferences={preferences} updateState={updateState}/>, mount);
}

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

  let characterId = params.uid;

  loadCharacter(characterId)
    .then(characterData => {
      if (!characterData) {
        // do something cool like tell the user
      }

      return {
        loadedCharacter: Immutable.fromJS(characterData),
        loadedPreferences: Immutable.fromJS(defaultPreferences),
        characterId,
      };
    })
    .then(renderApp)
    .catch(err => {
      console.error(err);
    })
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
