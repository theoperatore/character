import { createState } from 'state';
import { editDefenses } from './actions';

let store;
beforeEach(() => {
  store = createState();
});

test('can edit defenses', () => {
  const mockDefenses = {
    initiativeBonus: 5,
    armorClass: 10,
    speed: '10ft',
    maxHp: 100,
  };
  store.dispatch(editDefenses(mockDefenses));

  const maxHp = store.getState().character.getIn(['charHitPoints', 'maximum']);
  const currHp = store.getState().character.getIn(['charHitPoints', 'current']);
  const speed = store.getState().character.getIn(['charSpeed', 'score']);
  const ac = store.getState().character.getIn(['charArmorClass', 'score']);
  const init = store.getState().character.getIn(['charInitiative', 'score']);

  expect(maxHp).toEqual(100);
  expect(currHp).toEqual(100);
  expect(speed).toEqual('10ft');
  expect(ac).toEqual(10);
  expect(init).toEqual(5);
});
