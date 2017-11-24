import { Map, List } from 'immutable';
import { createState } from 'state';
import {
  createAttackBubble,
  editAttackBubble,
  deleteAttackBubble,
} from './actions';

test('Immutable default character', () => {
  const store = createState();
  let state = store.getState();

  expect(Map.isMap(state.character)).toEqual(true);
  expect(List.isList(state.character.get('charAttackBubbles'))).toEqual(true);
  expect(state.character.get('charAttackBubbles').size).toEqual(0);
  expect(state.character.get('charSpellBubbles').size).toEqual(0);
});

test('Creating attack bubble (non-proficient)', () => {
  const store = createState();

  const mockAttackBubble = {
    abil: 'str',
    prof: false,
    name: 'Test Attack Bonus',
    id: 'test-attack-bonus',
    bonus: 0,
  };
  store.dispatch(createAttackBubble(mockAttackBubble));
  const charAttackBubbles = store.getState().character.get('charAttackBubbles');

  expect(charAttackBubbles.get(0).toJS()).toEqual({
    ...mockAttackBubble,
    score: 0,
  });
});

test('Creating attack bubble (proficient)', () => {
  const store = createState();

  const mockAttackBubble = {
    abil: 'str',
    prof: true,
    name: 'Test Attack Bonus',
    id: 'test-attack-bonus',
    bonus: 0,
  };
  store.dispatch(createAttackBubble(mockAttackBubble));
  const charAttackBubbles = store.getState().character.get('charAttackBubbles');

  expect(charAttackBubbles.get(0).toJS()).toEqual({
    ...mockAttackBubble,
    score: 0,
  });
});

test('Updating existing attack bubble (non-proficient)', () => {
  const store = createState();

  const mockAttackBubble = {
    abil: 'str',
    prof: false,
    name: 'Test Attack Bonus',
    id: 'test-attack-bonus',
    bonus: 0,
  };
  store.dispatch(createAttackBubble(mockAttackBubble));
  store.dispatch(
    editAttackBubble({
      ...mockAttackBubble,
      bonus: 5,
    })
  );

  const charAttackBubbles = store.getState().character.get('charAttackBubbles');
  expect(charAttackBubbles.get(0).toJS()).toEqual({
    ...mockAttackBubble,
    bonus: 5,
    score: 5,
  });
});

test('Updating existing attack bubble (proficient)', () => {
  const store = createState();

  const mockAttackBubble = {
    abil: 'str',
    prof: true,
    name: 'Test Attack Bonus',
    id: 'test-attack-bonus',
    bonus: 0,
  };
  store.dispatch(createAttackBubble(mockAttackBubble));
  store.dispatch(
    editAttackBubble({
      ...mockAttackBubble,
      bonus: 5,
    })
  );

  const charAttackBubbles = store.getState().character.get('charAttackBubbles');
  expect(charAttackBubbles.get(0).toJS()).toEqual({
    ...mockAttackBubble,
    bonus: 5,
    score: 5,
  });
});

test('Trying to edit an attack bubble that does not exist wont update', () => {
  const store = createState();

  const mockAttackBubble = {
    abil: 'str',
    prof: true,
    name: 'Test Attack Bonus',
    id: 'test-attack-bonus',
    bonus: 0,
  };
  store.dispatch(createAttackBubble(mockAttackBubble));
  store.dispatch(
    editAttackBubble({
      ...mockAttackBubble,
      id: 'some-other-id-name',
      bonus: 5,
    })
  );

  const charAttackBubbles = store.getState().character.get('charAttackBubbles');
  expect(charAttackBubbles.get(0).toJS()).toEqual({
    ...mockAttackBubble,
    score: 0,
  });
});

test('Can delete attack bonus', () => {
  const store = createState();

  const mockAttackBubble = {
    abil: 'str',
    prof: true,
    name: 'Test Attack Bonus',
    id: 'test-attack-bonus',
    bonus: 0,
  };

  store.dispatch(createAttackBubble(mockAttackBubble));
  store.dispatch(deleteAttackBubble(mockAttackBubble));

  const charAttackBubbles = store.getState().character.get('charAttackBubbles');
  expect(charAttackBubbles.size).toEqual(0);
});
