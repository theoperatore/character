import { createState } from 'state';
import { Map, List, fromJS } from 'immutable';
import { characters } from 'state/testingData/dummy-characters';
import { editAbilityScores } from './actions';

test('Updating ability scores will update relevant stats', () => {
  const store = createState({
    character: fromJS(characters.ralf.character_data),
  });
  store.dispatch(
    editAbilityScores({
      str: 18, // mod 4
      dex: 16, // mod 3
      con: 14, // mod 2
      int: 12, // mod 1
      wis: 10, // mod 0
      cha: 9, // mod -1
    })
  );

  const after = store.getState().character;

  // got correct mods
  expect(after.getIn(['charAbilities', 'str', 'mod'])).toEqual(4);
  expect(after.getIn(['charAbilities', 'dex', 'mod'])).toEqual(3);
  expect(after.getIn(['charAbilities', 'con', 'mod'])).toEqual(2);
  expect(after.getIn(['charAbilities', 'int', 'mod'])).toEqual(1);
  expect(after.getIn(['charAbilities', 'wis', 'mod'])).toEqual(0);
  expect(after.getIn(['charAbilities', 'cha', 'mod'])).toEqual(-1);

  // attack bubbles updated
  expect(after.getIn(['charAttackBubbles', 0, 'score'])).toEqual(4);
  expect(after.getIn(['charAttackBubbles', 1, 'score'])).toEqual(4);

  // spell bubbles updated
  expect(after.getIn(['charSpellBubbles', 0, 'score'])).toEqual(-1);

  // spell save DC updated
  expect(after.getIn(['charSpellSaveDC', 'score'])).toEqual(12);

  // initiative updated
  expect(after.getIn(['charInitiative', 'score'])).toEqual(3);

  // saving throws updated
  expect(after.getIn(['charSavingThrows', 'str', 'score'])).toEqual(4);
  expect(after.getIn(['charSavingThrows', 'dex', 'score'])).toEqual(3);
  expect(after.getIn(['charSavingThrows', 'con', 'score'])).toEqual(2);
  expect(after.getIn(['charSavingThrows', 'int', 'score'])).toEqual(5);
  expect(after.getIn(['charSavingThrows', 'wis', 'score'])).toEqual(0);
  expect(after.getIn(['charSavingThrows', 'cha', 'score'])).toEqual(3);

  // skills updated
  expect(after.getIn(['charSkills', 0, 'score'])).toEqual(3);
  expect(after.getIn(['charSkills', 1, 'score'])).toEqual(0);
  expect(after.getIn(['charSkills', 2, 'score'])).toEqual(5);
  expect(after.getIn(['charSkills', 3, 'score'])).toEqual(4);
  expect(after.getIn(['charSkills', 4, 'score'])).toEqual(-1);
  expect(after.getIn(['charSkills', 5, 'score'])).toEqual(5);
  expect(after.getIn(['charSkills', 6, 'score'])).toEqual(0);
  expect(after.getIn(['charSkills', 7, 'score'])).toEqual(-1);
  expect(after.getIn(['charSkills', 8, 'score'])).toEqual(1);
  expect(after.getIn(['charSkills', 9, 'score'])).toEqual(0);
  expect(after.getIn(['charSkills', 10, 'score'])).toEqual(5);
  expect(after.getIn(['charSkills', 11, 'score'])).toEqual(0);
  expect(after.getIn(['charSkills', 12, 'score'])).toEqual(-1);
  expect(after.getIn(['charSkills', 13, 'score'])).toEqual(3);
  expect(after.getIn(['charSkills', 14, 'score'])).toEqual(5);
  expect(after.getIn(['charSkills', 15, 'score'])).toEqual(3);
  expect(after.getIn(['charSkills', 16, 'score'])).toEqual(3);
  expect(after.getIn(['charSkills', 17, 'score'])).toEqual(0);

  // passive perception updated
  expect(after.getIn(['charPassivePerception', 'score'])).toEqual(10);
});
