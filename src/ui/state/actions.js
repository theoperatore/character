'use strict';

import { db, ref } from '../../api';

export function signInWithEmail(email, password) {
  return dispatch => {
    dispatch({ type: 'USER_AUTHENTICATING' });

    db.auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        let profileData = {
          displayName: user.displayName,
          profileImg: user.photoURL,
          uid: user.uid,
        }

        dispatch({
          type: 'USER_AUTHENTICATED',
          data: {
            profileData,
          }
        });
      })
      .catch(error => {
        dispatch({
          type: 'USER_AUTHENTICATION_ERROR',
          data: {
            error,
          }
        })
      });
  }
}

export function loadUser() {
  return dispatch => {
    dispatch({ type: 'USER_LOADING_PROFILE' });

    let off = db.auth().onAuthStateChanged(user => {
      off();
      if (user) {
        let profileData = {
          displayName: user.displayName,
          profileImg: user.photoURL,
          uid: user.uid,
        }

        dispatch({
          type: 'USER_LOADED_PROFILE',
          data: {
            profileData,
          }
        })
      }
      else {
        dispatch({ type: 'USER_NOT_SIGNED_IN' });
      }
    })
  }
}

export function signOut() {
  return dispatch => {
    dispatch({ type: 'USER_SIGNING_OUT' });

    db.auth().signOut().then(() => {
      dispatch({ type: 'USER_SIGN_OUT' });
    });
  }
}

export function getCharactersForUser(userId) {
  return dispatch => {
    dispatch({ type: 'CHARACTER_LIST_LOAD' });

    ref
      .child(`users/${userId}`)
      .once('value')
      .then(snapshot => snapshot.val())
      .then(userData => {
        dispatch({
          type: 'CHARACTER_LIST_LOADED',
          data: {
            characters: userData.characters,
          },
        });
      })
      .catch(error => {
        dispatch({
          type: 'CHARACTER_LIST_LOAD_ERROR',
          data: {
            error: {
              code: error.code,
              message: error.message,
            }
          }
        });
      });
  }
}

function loadCharacterData(charId) {
  return new Promise((resolve, reject) => {
    ref
      .child(`characters/${charId}`)
      .once('value')
      .then(snapshot => snapshot.val())
      .then(charData => resolve(charData))
      .catch(error => reject(error));
  })
}

function loadCharacterPreferences(charId) {
  return new Promise((resolve, reject) => {
    ref
      .child(`preferences/${charId}`)
      .once('value')
      .then(snapshot => snapshot.val())
      .then(prefData => resolve(prefData))
      .catch(error => reject(error));
  })
}

export function loadCharacter(charId) {
  return dispatch => {
    dispatch({ type: 'CHARACTER_LOAD' });

    Promise.all([
      loadCharacterData(charId),
      loadCharacterPreferences(charId),
    ])
    .then(data => {
      dispatch({
        type: 'CHARACTER_LOADED',
        data: {
          character: data[0],
          preferences: data[1],
        }
      });
    })
    .catch(error => {
      dispatch({
        type: 'CHARACTER_LOAD_ERROR',
        data: {
          error
        },
      });
    });
  }
}