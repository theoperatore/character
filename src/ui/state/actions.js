'use strict';

import { fromJS } from 'immutable';
import uuid from 'node-uuid';
import { db, ref } from '../../api';
import defaultCharacter from '../../data/defaultCharacter';
import defaultPreferences from '../../data/defaultPreferences';

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

export function updateUserProfile(newProfileName, imagePath) {
  return dispatch => {
    dispatch({ type: 'USER_LOADING_PROFILE' });

    let newProfile = {
      displayName: newProfileName,
    };

    if (imagePath) {
      newProfile.photoURL = imagePath;
    }

    db
      .auth().currentUser
      .updateProfile(newProfile)
      .then(() => {
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
            characters: userData.characters || [],
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

function createCharacterInList(charId, newCharacter) {
  return new Promise((resolve, reject) => {
    ref
      .child(`characters/${charId}`)
      .update(newCharacter)
      .then(() => resolve())
      .catch(error => reject(error));
  })
}

function createPreferencesForCharacter(charId, newPreferences) {
  return new Promise((resolve, reject) => {
    ref
      .child(`preferences/${charId}`)
      .update(newPreferences)
      .then(() => resolve())
      .catch(error => reject(error));
  })
}

function associateCharacterWithUser(userId, charId, newCharacterMetaData) {
  return new Promise((resolve, reject) => {
    ref
      .child(`users/${userId}/characters/${charId}`)
      .update(newCharacterMetaData)
      .then(() => resolve())
      .catch(error => reject(error));
  })
}

export function createCharacter(userId, newCharName) {
  return dispatch => {
    dispatch({ type: 'CHARACTER_CREATING' });

    let charId = uuid.v1();
    let newCharacter = fromJS(defaultCharacter);

    newCharacter = newCharacter
      .set('charName', newCharName)
      .set('charId', charId)
      .toJS();

    let metaData = {
      characterClass: newCharacter.charInfo.class,
      characterId: charId,
      characterLevel: newCharacter.charInfo.level,
      characterName: newCharName,
      createdOn: Date.now()
    }

    associateCharacterWithUser(userId, charId, metaData)
    .then(() => createCharacterInList(charId, newCharacter))
    .then(() => createPreferencesForCharacter(charId, defaultPreferences))
    .then(() => {
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
    })
    .catch(error => {
      // rollback any changes
      ref
        .child(`characters/${charId}`)
        .remove();

      ref
        .child(`preferences/${charId}`)
        .remove();

      ref
        .child(`users/${userId}/characters/${charId}`)
        .remove();


      dispatch({
        type: 'CHARACTER_CREATE_ERROR',
        data: {
          error,
        }
      })
    })
  }
}

export function deleteCharacter(userId, charId) {
  return dispatch => {
    dispatch({ type: 'CHARACTER_DELETING' });

    ref
      .child(`users/${userId}/characters/${charId}`)
      .remove()
      .then(() => {
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
      })
  }
}