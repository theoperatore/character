'use strict';

import { fromJS, Map } from 'immutable';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import debug from 'debug';
import { preferences, character, user, status, route } from './reducers';

import defaultCharacter from '../../data/defaultCharacter';
import defaultPreferences from '../../data/defaultPreferences';

const DEFAULT_CHARACTER = fromJS(defaultCharacter);
const DEFAULT_PREFERENCES = fromJS(defaultPreferences);

const actionLog = debug('pc:redux');

const logger = store => next => action => {
  actionLog('dispatching: %o', action);
  let result = next(action)
  let newState = store.getState();
  actionLog('new state: %o %o %o', newState.character.toJS(), newState.user.toJS(), newState.status.toJS());
  return result
}

export function createState(defaults = {}) {
  let initialState = Object.assign({}, defaults, {
    character: defaults.character || DEFAULT_CHARACTER,
    preferences: defaults.preferences || DEFAULT_PREFERENCES,
  })

  return createStore(
    combineReducers({
      character,
      preferences,
      user,
      status,
      route,
    }),
    initialState,
    applyMiddleware(reduxThunk, logger));
}