import Immutable from 'immutable';
import { createStore, combineReducers } from 'redux';
import { character } from 'state/reducers';
import defaultCharacter from '../defaultCharacter';

test('Update character traits', () => {
  const initialState = Immutable.fromJS(defaultCharacter);
  const store = createStore(combineReducers({ character}), { character: initialState });

  let before = store.getState().character.get('charTraits');

  store.dispatch({
    type: 'TRAIT_EDIT',
    data: {
      id: 'flaws',
      desc: 'A really cool flaw',
    }
  });

  let after = store.getState().character.get('charTraits');

  expect(before.get('flaws')).not.toEqual(after.get('flaws'), 'flaws should have changed');
  expect(after.get('flaws')).toEqual('A really cool flaw', 'update is correct');
  expect(before.get('personalityTraits')).toEqual(after.get('personalityTraits'), 'personality should have not changed');
  expect(before.get('ideals')).toEqual(after.get('ideals'), 'ideals should have not changed');
  expect(before.get('bonds')).toEqual(after.get('bonds'), 'bonds should have not changed');

});
