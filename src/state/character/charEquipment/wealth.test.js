import { createState } from 'state';
import { addWealth, subtractWealth } from './actions';

test('Can add wealth', () => {
  const store = createState();
  store.dispatch(
    addWealth({
      wealthType: 'gp',
      value: 100,
    })
  );

  const gold = store
    .getState()
    .character.getIn(['charEquipment', 'money', 'gp']);
  expect(gold).toEqual(100);
});

test('Can subtract wealth', () => {
  const store = createState();
  store.dispatch(
    addWealth({
      wealthType: 'gp',
      value: 100,
    })
  );
  store.dispatch(
    subtractWealth({
      wealthType: 'gp',
      value: 100,
    })
  );

  const gold = store
    .getState()
    .character.getIn(['charEquipment', 'money', 'gp']);
  expect(gold).toEqual(0);
});

test('Cannot do anything else to wealth', () => {
  const store = createState();
  store.dispatch({
    type: 'WEALTH_EDIT',
    data: {
      wealthType: 'gold',
      actionType: 'multiply',
      value: 2,
    },
  });

  const gold = store
    .getState()
    .character.getIn(['charEquipment', 'money', 'gp']);
  expect(gold).toEqual(0);
});
