import { fromJS } from 'immutable';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import { preferences, character } from './reducers';
import { characters } from './characters/reducer';
import { user } from './user/reducer';

import defaultCharacter from './defaultCharacter';
import defaultPreferences from './defaultPreferences';

const DEFAULT_CHARACTER = fromJS(defaultCharacter);
const DEFAULT_PREFERENCES = fromJS(defaultPreferences);

export function createState(defaults = {}) {
  let initialState = Object.assign({}, defaults, {
    character: defaults.character || DEFAULT_CHARACTER,
    preferences: defaults.preferences || DEFAULT_PREFERENCES,
  });

  return createStore(
    combineReducers({
      character,
      characters,
      preferences,
      user,
      // status,
    }),
    initialState,
    /* istanbul ignore next */ process.env.NODE_ENV !== 'production' &&
      composeWithDevTools(applyMiddleware(reduxThunk)),
    /* istanbul ignore next */ process.env.NODE_ENV === 'production' &&
      applyMiddleware(reduxThunk)
  );
}
