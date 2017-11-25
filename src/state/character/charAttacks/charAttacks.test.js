import { createState } from 'state';
import { createAttack, editAttack, deleteAttack } from './actions';

test('Can create attack', () => {
  const store = createState();
  const mockAttack = {
    id: 'some-atk',
    name: 'My attack',
    desc: 'It hurts you',
  };
  store.dispatch(createAttack(mockAttack));

  const attacks = store.getState().character.get('charAttacks');
  expect(attacks.size).toEqual(1);
  expect(attacks.get(0).toJS()).toEqual(mockAttack);
});

test('Can edit attack', () => {
  const store = createState();
  const mockAttack = {
    id: 'some-atk',
    name: 'My attack',
    desc: 'It hurts you',
  };
  const updatedAttack = {
    ...mockAttack,
    name: 'Different attack',
  };
  store.dispatch(createAttack(mockAttack));
  store.dispatch(editAttack(updatedAttack));

  const attacks = store.getState().character.get('charAttacks');
  expect(attacks.size).toEqual(1);
  expect(attacks.get(0).toJS()).toEqual(updatedAttack);
});

test('Cannot edit unknown attack', () => {
  const store = createState();
  const mockAttack = {
    id: 'some-atk',
    name: 'My attack',
    desc: 'It hurts you',
  };
  const updatedAttack = {
    ...mockAttack,
    name: 'Different attack',
    id: 'some-other-attack',
  };
  store.dispatch(createAttack(mockAttack));
  store.dispatch(editAttack(updatedAttack));

  const attacks = store.getState().character.get('charAttacks');
  expect(attacks.size).toEqual(1);
  expect(attacks.get(0).toJS()).toEqual(mockAttack);
});

test('Can delete attack', () => {
  const store = createState();
  const mockAttack = {
    id: 'some-atk',
    name: 'My attack',
    desc: 'It hurts you',
  };
  store.dispatch(createAttack(mockAttack));
  store.dispatch(deleteAttack(mockAttack));

  const attacks = store.getState().character.get('charAttacks');
  expect(attacks.size).toEqual(0);
});
