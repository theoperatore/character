import loadReducer from '../loadReducer';
import { LOAD_CHARACTERS } from './actions';

export function characters(state = null, action) {
  switch (action.type) {
    case LOAD_CHARACTERS:
      return loadReducer(action);
    default:
      return state;
  }
}
