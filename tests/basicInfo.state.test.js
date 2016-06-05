'use strict';

import test from 'tape';
import Immutable from 'immutable';
import { createStore, combineReducers } from 'redux';
import { character } from '../src/ui/Character/state/reducers';
import defaultCharacter from '../src/data/defaultCharacter';

test('Update basic character info', t => {
  t.plan(12);

  const initialState = Immutable.fromJS(defaultCharacter);
  const store = createStore(combineReducers({ character}), { character: initialState });

  let before = store.getState().character.get('charInfo');

  store.dispatch({
    type: 'BASIC_INFO_EDIT',
    data: {
      class: "test",
      level: 100,
      background: "cool bg",
      race: "person",
      alignment: "usually good",
    }
  });

  let after = store.getState().character.get('charInfo');

  t.equals(before.get('class'), '-', 'default class is empty string');
  t.equals(before.get('level'), 1, 'default level is 1');
  t.equals(before.get('background'), '-', 'default background is empty string');
  t.equals(before.get('race'), '-', 'default race is empty string');
  t.equals(before.get('alignment'), '-', 'default alignment is empty string');
  t.equals(before.get('xp'), 0, 'default xp is 0');

  t.equals(after.get('class'), 'test', 'class is updated');
  t.equals(after.get('level'), 100, 'level is updated');
  t.equals(after.get('background'), 'cool bg', 'background is updated');
  t.equals(after.get('race'), 'person', 'race is updated');
  t.equals(after.get('alignment'), 'usually good', 'alignment is updated');
  t.equals(after.get('xp'), 0, 'xp is still 0');

});