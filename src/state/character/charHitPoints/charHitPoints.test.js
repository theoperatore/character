import { fromJS } from 'immutable';
import { createState } from 'state';
import { characters } from 'state/testingData/dummy-characters';
import { healCharacter, damageCharacter, tempHpCharacter } from './actions';

let store;
beforeEach(() => {
  store = createState({ character: fromJS(characters.ralf.character_data) });
});

test('can receive temp hp', () => {
  store.dispatch(tempHpCharacter(100));
  const hps = store.getState().character.getIn(['charHitPoints', 'temporary']);
  expect(hps).toEqual(100);
});

test('can receive healing', () => {
  store.dispatch(damageCharacter(10));
  store.dispatch(healCharacter(5));
  const hps = store.getState().character.getIn(['charHitPoints', 'current']);
  expect(hps).toEqual(21);
});

test('can receive damage', () => {
  store.dispatch(damageCharacter(10));
  const hps = store.getState().character.getIn(['charHitPoints', 'current']);
  expect(hps).toEqual(16);
});

test('healing starts at 0', () => {
  store.dispatch(damageCharacter(100));
  store.dispatch(healCharacter(5));
  const hps = store.getState().character.getIn(['charHitPoints', 'current']);
  expect(hps).toEqual(5);
});

test('healing cannot heal above max hp', () => {
  store.dispatch(healCharacter(500));
  const hps = store.getState().character.getIn(['charHitPoints', 'current']);
  const max = store.getState().character.getIn(['charHitPoints', 'maximum']);
  expect(hps).toEqual(max);
});

test('damage received takes away temporary hp first', () => {
  store.dispatch(tempHpCharacter(100));
  store.dispatch(damageCharacter(50));
  const tempHps = store
    .getState()
    .character.getIn(['charHitPoints', 'temporary']);
  const currHps = store
    .getState()
    .character.getIn(['charHitPoints', 'current']);
  const max = store.getState().character.getIn(['charHitPoints', 'maximum']);
  expect(tempHps).toEqual(50);
  expect(currHps).toEqual(max);
});
