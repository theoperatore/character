import loadReducer from '../loadReducer';
import { LOAD_USER } from './actions';

export function user(state = null, action) {
  switch (action.type) {
    case LOAD_USER:
      return loadReducer(action);
    default:
      return state;
  }
}