'use strict';

import test from 'tape';
import Immutable from 'immutable';
import { createStore, combineReducers } from 'redux';
import { character } from '../src/ui/state/reducers';
import defaultCharacter from '../src/data/defaultCharacter';

test('Create proficiency', t => {
  t.plan(2);

  const initialState = Immutable.fromJS(defaultCharacter);
  const store = createStore(combineReducers({ character}), { character: initialState });

  store.dispatch({
    type: 'PROFICIENCY_CREATE',
    data: {
      name: 'test',
      desc: 'test desc',
      id: 'prof1',
    }
  });

  let after = store.getState().character.getIn(['charOtherProficiencies', 'proficiencies']);

  t.equal(after.size, 1);
  t.equal(after.getIn([0, 'name']), 'test');

});

test('Delete proficiency', t => {
  t.plan(2);

  const initialState = Immutable.fromJS(defaultCharacter);
  const store = createStore(combineReducers({ character}), { character: initialState });

  store.dispatch({
    type: 'PROFICIENCY_CREATE',
    data: {
      name: 'test',
      desc: 'test desc',
      id: 'prof1',
    }
  });

  let before = store.getState().character.getIn(['charOtherProficiencies', 'proficiencies']);

  store.dispatch({
    type: 'PROFICIENCY_DELETE',
    data: {
      id: 'prof1',
    }
  });

  let after = store.getState().character.getIn(['charOtherProficiencies', 'proficiencies']);

  t.equal(before.size, 1, 'has prof before');
  t.equal(after.size, 0, 'item got deleted');
});