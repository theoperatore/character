'use strict';

import { createStore, combineReducers } from 'redux';
import { preferences, character } from './reducers';

export function createCharacterState(defaultCharacter, defaultPreferences) {
  let initialState = {
    character: defaultCharacter,
    preferences: defaultPreferences,
  }

  return createStore(combineReducers({
    character,
    preferences,
  }), initialState);
}