import { fromJS } from 'immutable';
import { createState } from 'state';
import defaultCharacter from 'state/defaultCharacter';
import { editSavingThrow } from './actions';

test('Can edit non proficient saving throw', () => {
  const store = createState();

  store.dispatch(
    editSavingThrow({
      ability: 'str',
      bonus: 5,
      proficient: false,
    })
  );

  const savingThrow = store
    .getState()
    .character.getIn(['charSavingThrows', 'str']);
  expect(savingThrow.get('score')).toEqual(5);
});

test('Can edit a proficient saving throw', () => {
  const store = createState({
    character: fromJS({
      ...defaultCharacter,
      charProficiencyBonus: {
        ...defaultCharacter.charProficiencyBonus,
        score: 2,
      },
    }),
  });

  store.dispatch(
    editSavingThrow({
      ability: 'str',
      bonus: 5,
      proficient: true,
    })
  );

  const savingThrow = store
    .getState()
    .character.getIn(['charSavingThrows', 'str']);
  expect(savingThrow.get('score')).toEqual(7);
});
