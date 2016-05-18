'use strict';

import test from 'tape';
import Immutable from 'immutable';
import { createStore, combineReducers } from 'redux';
import { character } from '../src/ui/state/reducers';
import defaultCharacter from '../src/ui/data/defaultCharacter';

test('Update character traits', t => {
  t.plan(5);

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

  t.notEqual(before.get('flaws'), after.get('flaws'), 'flaws should have changed');
  t.equal(after.get('flaws'), 'A really cool flaw', 'update is correct');
  t.equal(before.get('personalityTraits'), after.get('personalityTraits'), 'personality should have not changed');
  t.equal(before.get('ideals'), after.get('ideals'), 'ideals should have not changed');
  t.equal(before.get('bonds'), after.get('bonds'), 'bonds should have not changed');

});