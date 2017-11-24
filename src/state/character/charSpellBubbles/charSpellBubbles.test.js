import { createState } from 'state';
import {
  createSpellAttackBubble,
  editSpellAttackBubble,
  deleteSpellAttackBubble,
} from './actions';

test('Can create a non-proficient spell attack bonus', () => {
  const store = createState();
  const mockSpellAttack = {
    abil: 'cha',
    prof: false,
    name: 'cool spell attack',
    id: 'someId',
    bonus: 5,
  };
  store.dispatch(createSpellAttackBubble(mockSpellAttack));
  const spellAttack = store.getState().character.getIn(['charSpellBubbles', 0]);
  expect(spellAttack.toJS()).toEqual({
    ...mockSpellAttack,
    score: 5,
  });
});

test('Can create a proficient spell attack bonus', () => {
  const store = createState();
  const mockSpellAttack = {
    abil: 'cha',
    prof: true,
    name: 'cool spell attack',
    id: 'someId',
    bonus: 5,
  };
  store.dispatch(createSpellAttackBubble(mockSpellAttack));
  const spellAttack = store.getState().character.getIn(['charSpellBubbles', 0]);
  expect(spellAttack.toJS()).toEqual({
    ...mockSpellAttack,
    score: 5,
  });
});

test('can edit a spell attack bonus (non-proficient)', () => {
  const store = createState();
  const mockSpellAttack = {
    abil: 'cha',
    prof: false,
    name: 'cool spell attack',
    id: 'someId',
    bonus: 5,
  };
  store.dispatch(createSpellAttackBubble(mockSpellAttack));
  store.dispatch(
    editSpellAttackBubble({
      ...mockSpellAttack,
      bonus: 10,
    })
  );
  const spellAttack = store.getState().character.getIn(['charSpellBubbles', 0]);
  expect(spellAttack.toJS()).toEqual({
    ...mockSpellAttack,
    bonus: 10,
    score: 10,
  });
});

test('can edit a spell attack bonus (proficient)', () => {
  const store = createState();
  const mockSpellAttack = {
    abil: 'cha',
    prof: true,
    name: 'cool spell attack',
    id: 'someId',
    bonus: 5,
  };
  store.dispatch(createSpellAttackBubble(mockSpellAttack));
  store.dispatch(
    editSpellAttackBubble({
      ...mockSpellAttack,
      bonus: 10,
    })
  );
  const spellAttack = store.getState().character.getIn(['charSpellBubbles', 0]);
  expect(spellAttack.toJS()).toEqual({
    ...mockSpellAttack,
    bonus: 10,
    score: 10,
  });
});

test('Trying to edit an unknown spell bubble does not change anything', () => {
  const store = createState();
  const mockSpellAttack = {
    abil: 'cha',
    prof: true,
    name: 'cool spell attack',
    id: 'someId',
    bonus: 5,
  };
  store.dispatch(createSpellAttackBubble(mockSpellAttack));
  store.dispatch(
    editSpellAttackBubble({
      ...mockSpellAttack,
      id: 'someother-id',
      bonus: 10,
    })
  );

  const spellAttack = store.getState().character.getIn(['charSpellBubbles', 0]);
  expect(spellAttack.toJS()).toEqual({
    ...mockSpellAttack,
    score: 5,
  });
});

test('Can delete spell attack bonus', () => {
  const store = createState();
  const mockSpellAttack = {
    abil: 'cha',
    prof: true,
    name: 'cool spell attack',
    id: 'someId',
    bonus: 5,
  };

  store.dispatch(createSpellAttackBubble(mockSpellAttack));
  store.dispatch(deleteSpellAttackBubble(mockSpellAttack));

  const spellAttack = store.getState().character.get('charSpellBubbles');
  expect(spellAttack.size).toEqual(0);
});
