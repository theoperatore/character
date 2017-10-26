import { createStore, combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';
import { character } from 'state/reducers';
import { characters } from './testUtils/dummy-data/dummy-characters';

function editProficiencyBonus({ base, bonus }) {
  return {
    type: 'PROFICIENCY_BONUS_EDIT',
    data: {
      base,
      bonus,
    },
  };
}

test('Updating Proficiency Bonus will update relevant stats', () => {
  const store = createStore(combineReducers({ character }), { character: fromJS(characters.ralf.character_data) });
  store.dispatch({
    type: 'PROFICIENCY_BONUS_EDIT',
    data: {
      base: 7,
      bonus: 1
    },
  });

  let after = store.getState().character;

  // proficiency got updated
  expect(after.getIn(['charProficiencyBonus', 'base'])).toEqual(7, 'updated base pb')
  expect(after.getIn(['charProficiencyBonus', 'bonus'])).toEqual(1, 'updated bonus pb')
  expect(after.getIn(['charProficiencyBonus', 'score'])).toEqual(8, 'updated pb score')

  // skills updated
  expect(after.getIn(['charSkills', 0, 'score'])).toEqual(5, 'Acrobatics stayed the same');
  expect(after.getIn(['charSkills', 1, 'score'])).toEqual(3, 'Animal Handling stayed the same');
  expect(after.getIn(['charSkills', 2, 'score'])).toEqual(12, 'Arcana (prof) got updated');
  expect(after.getIn(['charSkills', 3, 'score'])).toEqual(2, 'Athletics stayed the same');
  expect(after.getIn(['charSkills', 4, 'score'])).toEqual(5, 'Deception stayed the same');
  expect(after.getIn(['charSkills', 5, 'score'])).toEqual(12, 'History (prof) got updated');
  expect(after.getIn(['charSkills', 6, 'score'])).toEqual(3, 'Insight stayed the same');
  expect(after.getIn(['charSkills', 7, 'score'])).toEqual(5, 'Intimidation stayed the same');
  expect(after.getIn(['charSkills', 8, 'score'])).toEqual(4, 'Investigation stayed the same');
  expect(after.getIn(['charSkills', 9, 'score'])).toEqual(3, 'Medicine stayed the same');
  expect(after.getIn(['charSkills', 10, 'score'])).toEqual(12, 'Nature (prof) got updated');
  expect(after.getIn(['charSkills', 11, 'score'])).toEqual(3, 'Perception stayed the same');
  expect(after.getIn(['charSkills', 12, 'score'])).toEqual(5, 'Performance stayed the same');
  expect(after.getIn(['charSkills', 13, 'score'])).toEqual(13, 'Persuasion (prof) got updated');
  expect(after.getIn(['charSkills', 14, 'score'])).toEqual(12, 'Religion (prof) got updated');
  expect(after.getIn(['charSkills', 15, 'score'])).toEqual(5, 'Sleight of Hand stayed the same');
  expect(after.getIn(['charSkills', 16, 'score'])).toEqual(5, 'Stealth stayed the same');
  expect(after.getIn(['charSkills', 17, 'score'])).toEqual(3, 'Survival stayed the same');

  // saving throws updated
  expect(after.getIn(['charSavingThrows', 'str', 'score'])).toEqual(2, 'str saving throw is correct');
  expect(after.getIn(['charSavingThrows', 'dex', 'score'])).toEqual(5, 'dex saving throw is correct');
  expect(after.getIn(['charSavingThrows', 'con', 'score'])).toEqual(3, 'con saving throw is correct');
  expect(after.getIn(['charSavingThrows', 'int', 'score'])).toEqual(12, 'int saving throw (prof) is correct');
  expect(after.getIn(['charSavingThrows', 'wis', 'score'])).toEqual(3, 'wis saving throw is correct');
  expect(after.getIn(['charSavingThrows', 'cha', 'score'])).toEqual(13, 'cha saving throw (prof) is correct');

  // attack bubbles updated
  expect(after.getIn(['charAttackBubbles', 0, 'score'])).toEqual(2, 'str attack bubble stayed same');
  expect(after.getIn(['charAttackBubbles', 1, 'score'])).toEqual(14, 'cha proficient (8) attack bubble got updated');

  // spell bubbles updated
  expect(after.getIn(['charSpellBubbles', 0, 'score'])).toEqual(5, 'cha spell bubble stayed same');

  // spell save DC updated
  expect(after.getIn(['charSpellSaveDC', 'score'])).toEqual(19, 'spell save dc (8 + 4 + wis) got updated');

  // passive perception updated
  expect(after.getIn(['charPassivePerception', 'score'])).toEqual(13, 'Passive Perception stayed the same');
});
