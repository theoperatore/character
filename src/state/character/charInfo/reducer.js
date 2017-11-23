import { Map } from 'immutable';

export default function charInfoReducer(state, action) {
  return state
    .update('charInfo', Map(), charInfo => charInfo.merge(action.data))
    .updateIn(['charHitPoints', 'charHitDiceMaximum'], () => action.data.level)
    .updateIn(['charHitPoints', 'charHitDiceCurrent'], () => action.data.level);
}
