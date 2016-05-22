'use strict';

import test from 'tape';
import Immutable from 'immutable';
import { createStore, combineReducers } from 'redux';
import { character } from '../src/ui/state/reducers';
import defaultCharacter from '../src/ui/data/defaultCharacter';

test('Creating feature with a class charge updates both attributes', t => {
  t.plan(4);
  const initialState = Immutable.fromJS(defaultCharacter);
  const store = createStore(combineReducers({ character}), { character: initialState });

  store.dispatch({
    type: 'FEATURE_CREATE',
    data: {
      feature: {
        id: 'feat-1',
        name: 'test feat',
        desc: 'some test feat',
        type: 'ATTACK',
        classChargesId: 'charge-1',
      },
      classCharge: {
        id: 'charge-1',
        name: 'test charges',
        charges: 10,
        current: 10,
      },
    },
  });

  let afterFeats = store.getState().character.get('charFeatures');
  let afterChrgs = store.getState().character.get('charClassCharges');

  t.equal(afterFeats.size, 1, 'has one new feature');
  t.equal(afterChrgs.size, 1, 'has one new charge');
  t.equal(afterChrgs.getIn([0, 'id']), 'charge-1', 'charge has correct id');
  t.equal(afterFeats.getIn([0, 'classChargesId']), 'charge-1', 'feat has correct id');
})

test('Editing a feature with a class charge to remove a class charge, removes the charge', t => {
  t.plan(2);
  const initialState = Immutable.fromJS(defaultCharacter);
  const store = createStore(combineReducers({ character}), { character: initialState });

  store.dispatch({
    type: 'FEATURE_CREATE',
    data: {
      feature: {
        id: 'feat-1',
        name: 'test feat',
        desc: 'some test feat',
        type: 'ATTACK',
        classChargesId: 'charge-1',
      },
      classCharge: {
        id: 'charge-1',
        name: 'test charges',
        charges: 10,
        current: 10,
      },
    },
  });

  store.dispatch({
    type: 'FEATURE_EDIT',
    data: {
      feature: {
        id: 'feat-1',
        classChargesId: 'charge-1',
      },
    },
  });

  let afterFeats = store.getState().character.get('charFeatures');
  let afterChrgs = store.getState().character.get('charClassCharges');

  t.equals(afterChrgs.size, 0, 'removed charge');
  t.equals(afterFeats.getIn([0, 'classChargesId']), undefined, 'removed class charge id from feature');
})