"use strict";

import FastClick from 'fastclick';
import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import debug from 'debug';
import Router from './router/Router';
import { db, ref } from '../api';

import Landing from './Landing/Landing';
import App from './Character/Character';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import HTML404 from './NotFound/HTML404';

import { createCharacterState } from './Character/state';
import defaultPreferences from '../data/defaultPreferences';

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
  return ref.child(`characters/${id}`).once('value').then(snapshot => {
    log('got character info: %o', snapshot.val());
    return snapshot.val();
  });
}

function loadPreferences(id) {
  return ref.child(`preferences/${id}`).once('value').then(snapshot => {
    log('got character preferences: %o', snapshot.val());
    return snapshot.val();
  });
}

function renderApp({ loadedCharacter, loadedPreferences, characterId }) {
  let store = createCharacterState(loadedCharacter, loadedPreferences);
  let { character, preferences } = store.getState();

  function updateState(action) {
    stateLog(action);

    // cannot saved undefined values to firebase...
    let cleanedAction = Object.assign({}, action, {
      data: Object.keys(action.data).reduce((out, key) => {
        if (action[key]) {
          out[key] = action[key];
        }

        return out;
      }, {})
    });

    ref.child(`actions/${characterId}`).push(cleanedAction);

    store.dispatch(action);
  }

  subscribedStateChange = store.subscribe(function rerender() {
    let { character, preferences } = store.getState();

    let characterToSave = character.toJS();
    let preferencesToSave = preferences.toJS();
    let user = db.auth().currentUser;

    if (user) {
      // save character to DB?
      ref.child(`characters/${characterId}`)
        .set(characterToSave)
        .then(() => {
          saveLog('saved new character state: %o', characterToSave);
        })
        .catch(err => {
          console.error(err);
        });

      ref.child(`preferences/${characterId}`)
        .set(preferencesToSave)
        .then(() => {
          saveLog('saved new character preferences: %o', preferencesToSave)
        })
        .catch(err => {
          console.log(err);
        });

      ref.child(`users/${user.uid}/characters/${characterId}`)
        .update({
          characterClass: characterToSave.charInfo.class,
          characterLevel: characterToSave.charInfo.level,
        })
        .catch(err => {
          console.error(err);
        });

      ReactDOM.render(<App character={character} preferences={preferences} updateState={updateState}/>, mount);
    }
  });

  ReactDOM.render(<App character={character} preferences={preferences} updateState={updateState}/>, mount);
}

// view a character
Router.get('/character/(:uid)', (params) => {
  log(`routing to character view: `, params);

  // remove any previous event listeners on state change
  if (subscribedStateChange) {
    subscribedStateChange();
  }

  let characterId = params.uid;

  Promise.all([
    loadCharacter(characterId),
    loadPreferences(characterId)
  ]).then(characterData => {
      if (!characterData[0]) {
        throw new Error(`[CharacterLoadError] cannot find character with id: ${characterId}`);
      }

      return {
        loadedCharacter: Immutable.fromJS(characterData[0]),
        loadedPreferences: Immutable.fromJS(characterData[1] || defaultPreferences),
        characterId,
      };
    })
    .then(renderApp)
    .catch(err => {
      console.error(err);
    })
})

// user
Router.get('/profile', (params) => {
  // if (!db.ref.getAuth()) {
  //   Router.nav('/login');
  //   return;
  // }

  log(`routing to profile view`);

  // remove any previous event listeners on state change
  if (subscribedStateChange) {
    subscribedStateChange();
  }

  ReactDOM.render(<Profile/>, mount);
})

// login
Router.get('/login/(:id)', (params) => {
  var user = db.auth().currentUser;

  // remove any previous event listeners on state change
  if (subscribedStateChange) {
    subscribedStateChange();
  }

  // if the user is already logged in, then redirect to profile page
  if (user) {
    ref.once('/users/' + user.uid).then((snapshot) => {
      var u = snapshot.val();
      Router.nav('/profile');
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
