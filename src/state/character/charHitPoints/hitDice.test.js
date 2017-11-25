import { createState } from 'state';
import { createHitDice, editHitDice, deleteHitDice } from './actions';

let store;
beforeEach(() => {
  store = createState();
});

test('can create hit dice rule', () => {
  store.dispatch(createHitDice());
  const hd = store.getState().character.getIn(['charHitPoints', 'hitDice']);
  const hdd = store
    .getState()
    .character.getIn(['charHitPoints', 'hitDiceDefinitions']);
  expect(hd.size).toEqual(2);
  expect(hdd.getIn([hd.get(1), 'type'])).toEqual('d4');
  expect(hdd.getIn([hd.get(1), 'current'])).toEqual(1);
  expect(hdd.getIn([hd.get(1), 'maximum'])).toEqual(1);
});

test('can edit hit dice rule', () => {
  store.dispatch(createHitDice());
  const tmpHd = store.getState().character.getIn(['charHitPoints', 'hitDice']);
  const tmpHdd = store
    .getState()
    .character.getIn(['charHitPoints', 'hitDiceDefinitions']);

  const updatedHitDice = {
    ...tmpHdd.get(tmpHd.get(1)).toJS(),
    type: 'd8',
    current: 2,
    maximum: 4,
  };

  store.dispatch(editHitDice(updatedHitDice));

  const hd = store.getState().character.getIn(['charHitPoints', 'hitDice']);
  const hdd = store
    .getState()
    .character.getIn(['charHitPoints', 'hitDiceDefinitions']);

  expect(hd.size).toEqual(2);
  expect(hdd.getIn([hd.get(1), 'type'])).toEqual('d8');
  expect(hdd.getIn([hd.get(1), 'current'])).toEqual(2);
  expect(hdd.getIn([hd.get(1), 'maximum'])).toEqual(4);
});

test('can delete hit dice rule and definition', () => {
  const defaultHitDice = {
    id: 'hit-dice-0',
  };
  store.dispatch(deleteHitDice(defaultHitDice));
  const hd = store.getState().character.getIn(['charHitPoints', 'hitDice']);
  const hdd = store
    .getState()
    .character.getIn(['charHitPoints', 'hitDiceDefinitions']);
  expect(hd.size).toEqual(0);
  const keys = Object.keys(hdd.toJS()).filter(key => hdd.get(key)).length;
  expect(keys).toEqual(0);
});
