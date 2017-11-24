import { Map, List, fromJS } from 'immutable';
import { createState } from 'state';
import { characters } from 'state/testingData/dummy-characters';
import { editProficiencyBonus } from './actions';

test('Updating Proficiency Bonus will update relevant stats', () => {
  const store = createState({
    character: fromJS(characters.ralf.character_data),
  });
  store.dispatch(
    editProficiencyBonus({
      base: 7,
      bonus: 1,
    })
  );

  const after = store.getState().character;

  // proficiency got updated
  expect(after.getIn(['charProficiencyBonus', 'base'])).toEqual(7);
  expect(after.getIn(['charProficiencyBonus', 'bonus'])).toEqual(1);
  expect(after.getIn(['charProficiencyBonus', 'score'])).toEqual(8);

  // skills updated
  expect(after.getIn(['charSkills', 0, 'score'])).toEqual(5);
  expect(after.getIn(['charSkills', 1, 'score'])).toEqual(3);
  expect(after.getIn(['charSkills', 2, 'score'])).toEqual(12);
  expect(after.getIn(['charSkills', 3, 'score'])).toEqual(2);
  expect(after.getIn(['charSkills', 4, 'score'])).toEqual(5);
  expect(after.getIn(['charSkills', 5, 'score'])).toEqual(12);
  expect(after.getIn(['charSkills', 6, 'score'])).toEqual(3);
  expect(after.getIn(['charSkills', 7, 'score'])).toEqual(5);
  expect(after.getIn(['charSkills', 8, 'score'])).toEqual(4);
  expect(after.getIn(['charSkills', 9, 'score'])).toEqual(3);
  expect(after.getIn(['charSkills', 10, 'score'])).toEqual(12);
  expect(after.getIn(['charSkills', 11, 'score'])).toEqual(3);
  expect(after.getIn(['charSkills', 12, 'score'])).toEqual(5);
  expect(after.getIn(['charSkills', 13, 'score'])).toEqual(13);
  expect(after.getIn(['charSkills', 14, 'score'])).toEqual(12);
  expect(after.getIn(['charSkills', 15, 'score'])).toEqual(5);
  expect(after.getIn(['charSkills', 16, 'score'])).toEqual(5);
  expect(after.getIn(['charSkills', 17, 'score'])).toEqual(3);

  // saving throws updated
  expect(after.getIn(['charSavingThrows', 'str', 'score'])).toEqual(2);
  expect(after.getIn(['charSavingThrows', 'dex', 'score'])).toEqual(5);
  expect(after.getIn(['charSavingThrows', 'con', 'score'])).toEqual(3);
  expect(after.getIn(['charSavingThrows', 'int', 'score'])).toEqual(12);
  expect(after.getIn(['charSavingThrows', 'wis', 'score'])).toEqual(3);
  expect(after.getIn(['charSavingThrows', 'cha', 'score'])).toEqual(13);

  // attack bubbles updated
  expect(after.getIn(['charAttackBubbles', 0, 'score'])).toEqual(2);
  expect(after.getIn(['charAttackBubbles', 1, 'score'])).toEqual(14);

  // spell bubbles updated
  expect(after.getIn(['charSpellBubbles', 0, 'score'])).toEqual(5);

  // spell save DC updated
  expect(after.getIn(['charSpellSaveDC', 'score'])).toEqual(19);

  // passive perception updated
  expect(after.getIn(['charPassivePerception', 'score'])).toEqual(13);
});
