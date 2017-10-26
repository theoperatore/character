import Immutable from 'immutable';
import { createStore, combineReducers } from 'redux';
import { character } from 'state/reducers';
import defaultCharacter from '../defaultCharacter';

test('Creating feature with a class charge updates both attributes', () => {
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

  expect(afterFeats.size).toEqual(1, 'has one new feature');
  expect(afterChrgs.size).toEqual(1, 'has one new charge');
  expect(afterChrgs.getIn([0, 'id'])).toEqual('charge-1', 'charge has correct id');
  expect(afterFeats.getIn([0, 'classChargesId'])).toEqual('charge-1', 'feat has correct id');
})

test('Editing a feature with a class charge to remove a class charge, removes the charge', () => {
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
      },
      classChargeId: 'charge-1',
      removeClassCharge: true,
    },
  });

  let afterFeats = store.getState().character.get('charFeatures');
  let afterChrgs = store.getState().character.get('charClassCharges');

  expect(afterChrgs.size).toEqual(0, 'removed charge');
  expect(afterFeats.getIn([0, 'classChargesId'])).toEqual(undefined, 'removed class charge id from feature');
})
