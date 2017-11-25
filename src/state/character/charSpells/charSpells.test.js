import { createState } from 'state';
import {
  createSpell,
  editSpell,
  deleteSpell,
  prepareSpell,
  unprepareSpell,
  castSpell,
} from './actions';

test('Can create a spell', () => {
  const store = createState();
  const mockSpell = {
    id: 'some-spell',
    name: 'Chill Touch',
    desc: 'some long description',
    cast: '1 action',
    range: '120 ft/ 24 sq',
    cmp: 'V,S',
    dur: 'Instant',
    prepared: false,
  };
  store.dispatch(createSpell(1, mockSpell));
  const spells = store.getState().character.getIn(['charSpells', 1, 'spells']);
  expect(spells.size).toEqual(1);
  expect(spells.get(0).toJS()).toEqual(mockSpell);
});

test('Can edit a spell', () => {
  const store = createState();
  const mockSpell = {
    id: 'some-spell',
    name: 'Chill Touch',
    desc: 'some long description',
    cast: '1 action',
    range: '120 ft/ 24 sq',
    cmp: 'V,S',
    dur: 'Instant',
    prepared: false,
  };
  const updatedSpell = {
    ...mockSpell,
    name: 'Something other than Chill Touch',
  };
  store.dispatch(createSpell(1, mockSpell));
  store.dispatch(editSpell(1, updatedSpell));
  const spells = store.getState().character.getIn(['charSpells', 1, 'spells']);
  expect(spells.size).toEqual(1);
  expect(spells.get(0).toJS()).toEqual(updatedSpell);
});

test('Cannot edit an unknown spell', () => {
  const store = createState();
  const mockSpell = {
    id: 'some-spell',
    name: 'Chill Touch',
    desc: 'some long description',
    cast: '1 action',
    range: '120 ft/ 24 sq',
    cmp: 'V,S',
    dur: 'Instant',
    prepared: false,
  };
  const updatedSpell = {
    ...mockSpell,
    name: 'Something other than Chill Touch',
    id: 'some-other-spell-id',
  };
  store.dispatch(createSpell(1, mockSpell));
  store.dispatch(editSpell(1, updatedSpell));
  const spells = store.getState().character.getIn(['charSpells', 1, 'spells']);
  expect(spells.size).toEqual(1);
  expect(spells.get(0).toJS()).toEqual(mockSpell);
});

test('Can delete a spell', () => {
  const store = createState();
  const mockSpell = {
    id: 'some-spell',
    name: 'Chill Touch',
    desc: 'some long description',
    cast: '1 action',
    range: '120 ft/ 24 sq',
    cmp: 'V,S',
    dur: 'Instant',
    prepared: false,
  };
  store.dispatch(createSpell(1, mockSpell));
  store.dispatch(deleteSpell(1, mockSpell));
  const spells = store.getState().character.getIn(['charSpells', 1, 'spells']);
  expect(spells.size).toEqual(0);
});

test('Can prepare a spell', () => {
  const store = createState();
  const mockSpell = {
    id: 'some-spell',
    name: 'Chill Touch',
    desc: 'some long description',
    cast: '1 action',
    range: '120 ft/ 24 sq',
    cmp: 'V,S',
    dur: 'Instant',
    prepared: false,
  };
  store.dispatch(createSpell(1, mockSpell));
  store.dispatch(prepareSpell(1, mockSpell));
  const spells = store.getState().character.getIn(['charSpells', 1, 'spells']);
  expect(spells.size).toEqual(1);
  expect(spells.getIn([0, 'prepared'])).toEqual(true);
});

test('Cannot prepare an unknown spell', () => {
  const store = createState();
  const mockSpell = {
    id: 'some-spell',
    name: 'Chill Touch',
    desc: 'some long description',
    cast: '1 action',
    range: '120 ft/ 24 sq',
    cmp: 'V,S',
    dur: 'Instant',
    prepared: false,
  };
  store.dispatch(createSpell(1, mockSpell));
  store.dispatch(prepareSpell(1, { id: 'some-ither-spell' }));
  const spells = store.getState().character.getIn(['charSpells', 1, 'spells']);
  expect(spells.size).toEqual(1);
  expect(spells.getIn([0, 'prepared'])).toEqual(false);
});

test('Can unprepare a spell', () => {
  const store = createState();
  const mockSpell = {
    id: 'some-spell',
    name: 'Chill Touch',
    desc: 'some long description',
    cast: '1 action',
    range: '120 ft/ 24 sq',
    cmp: 'V,S',
    dur: 'Instant',
    prepared: false,
  };
  store.dispatch(createSpell(1, mockSpell));
  store.dispatch(prepareSpell(1, mockSpell));
  store.dispatch(unprepareSpell(1, mockSpell));
  const spells = store.getState().character.getIn(['charSpells', 1, 'spells']);
  expect(spells.size).toEqual(1);
  expect(spells.getIn([0, 'prepared'])).toEqual(false);
});

test('Cannot unprepare an unknown spell', () => {
  const store = createState();
  const mockSpell = {
    id: 'some-spell',
    name: 'Chill Touch',
    desc: 'some long description',
    cast: '1 action',
    range: '120 ft/ 24 sq',
    cmp: 'V,S',
    dur: 'Instant',
    prepared: false,
  };
  store.dispatch(createSpell(1, mockSpell));
  store.dispatch(prepareSpell(1, mockSpell));
  store.dispatch(unprepareSpell(1, { id: 'something-else' }));
  const spells = store.getState().character.getIn(['charSpells', 1, 'spells']);
  expect(spells.size).toEqual(1);
  expect(spells.getIn([0, 'prepared'])).toEqual(true);
});

test('Can cast a spell', () => {
  const store = createState();
  const mockSpell = {
    id: 'some-spell',
    name: 'Chill Touch',
    desc: 'some long description',
    cast: '1 action',
    range: '120 ft/ 24 sq',
    cmp: 'V,S',
    dur: 'Instant',
    prepared: false,
  };
  store.dispatch(createSpell(1, mockSpell));
  store.dispatch(castSpell(1, 3));
  const spellLevel = store.getState().character.getIn(['charSpells', 1]);
  expect(spellLevel.get('used')).toEqual(3);
});
