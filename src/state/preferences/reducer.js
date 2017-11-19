import { fromJS } from 'immutable';
import defaultPreferences from 'state/defaultPreferences';
import {
  TOGGLE_SPELLS_PANE,
  TOGGLE_ATTACK_PANE,
  SET_CLASS_CHARGES,
} from './actions';

const DEFAULT_PREFERENCES = fromJS(defaultPreferences);

export function preferences(state = DEFAULT_PREFERENCES, action) {
  switch (action.type) {
    // preferences loaded from BE
    case 'CHARACTER_LOADED':
      return fromJS(action.data.preferences);

    case TOGGLE_SPELLS_PANE:
      return state.updateIn(
        ['Spells', 'display'],
        display => !state.getIn(['Spells', 'display'])
      );
    case TOGGLE_ATTACK_PANE:
      return state.updateIn(
        ['Attacks', 'display'],
        display => !state.getIn(['Attacks', 'display'])
      );
    case SET_CLASS_CHARGES:
      switch (action.data) {
        case 'ATTACK_ONLY':
          return state.update('classCharges', charges => 'ATTACK_ONLY');
        case 'SPELLS_ONLY':
          return state.update('classCharges', charges => 'SPELLS_ONLY');
        case 'BOTH':
          return state.update('classCharges', charges => 'BOTH');
        default:
          return state;
      }
    default:
      return state;
  }
}
