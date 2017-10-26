import { createStore, combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';
import { character } from 'state/reducers';
import { characters } from './testUtils/dummy-data/dummy-characters';

function editAbilityScores({ str, con, dex, wis, int, cha }) {
  return {
    type: 'ABILITY_SCORE_EDIT',
    data: {
      str,
      con,
      dex,
      wis,
      int,
      cha,
    },
  };
}

test('Updating ability scores will update relevant stats', () => {
  const store = createStore(combineReducers({ character }), { character: fromJS(characters.ralf.character_data) });
  store.dispatch({
    type: 'ABILITY_SCORE_EDIT',
    data: {
      str: 18, // mod 4
      dex: 16, // mod 3
      con: 14, // mod 2
      int: 12, // mod 1
      wis: 10, // mod 0
      cha:  9, // mod -1
    },
  });

  const after = store.getState().character;

  // got correct mods
  expect(after.getIn(['charAbilities', 'str', 'mod'])).toEqual(4, 'str mod is correct');
  expect(after.getIn(['charAbilities', 'dex', 'mod'])).toEqual(3, 'dex mod is correct');
  expect(after.getIn(['charAbilities', 'con', 'mod'])).toEqual(2, 'con mod is correct');
  expect(after.getIn(['charAbilities', 'int', 'mod'])).toEqual(1, 'int mod is correct');
  expect(after.getIn(['charAbilities', 'wis', 'mod'])).toEqual(0, 'wis mod is correct');
  expect(after.getIn(['charAbilities', 'cha', 'mod'])).toEqual(-1, 'cha mod is correct');

  // attack bubbles updated
  expect(after.getIn(['charAttackBubbles', 0, 'score'])).toEqual(4, 'str attack bubble got updated');
  expect(after.getIn(['charAttackBubbles', 1, 'score'])).toEqual(4, 'cha proficient (4) attack bubble got updated');

  // spell bubbles updated
  expect(after.getIn(['charSpellBubbles', 0, 'score'])).toEqual(-1, 'cha spell bubble got updated');

  // spell save DC updated
  expect(after.getIn(['charSpellSaveDC', 'score'])).toEqual(12, 'spell save dc (8 + 4 + wis) got updated');

  // initiative updated
  expect(after.getIn(['charInitiative', 'score'])).toEqual(3, 'initiative got updated');

  // saving throws updated
  expect(after.getIn(['charSavingThrows', 'str', 'score'])).toEqual(4, 'str saving throw is correct');
  expect(after.getIn(['charSavingThrows', 'dex', 'score'])).toEqual(3, 'dex saving throw is correct');
  expect(after.getIn(['charSavingThrows', 'con', 'score'])).toEqual(2, 'con saving throw is correct');
  expect(after.getIn(['charSavingThrows', 'int', 'score'])).toEqual(5, 'int saving throw (prof) is correct');
  expect(after.getIn(['charSavingThrows', 'wis', 'score'])).toEqual(0, 'wis saving throw is correct');
  expect(after.getIn(['charSavingThrows', 'cha', 'score'])).toEqual(3, 'cha saving throw (prof) is correct');

  // skills updated
  expect(after.getIn(['charSkills', 0, 'score'])).toEqual(3, 'Acrobatics got updated');
  expect(after.getIn(['charSkills', 1, 'score'])).toEqual(0, 'Animal Handling got updated');
  expect(after.getIn(['charSkills', 2, 'score'])).toEqual(5, 'Arcana got updated');
  expect(after.getIn(['charSkills', 3, 'score'])).toEqual(4, 'Athletics got updated');
  expect(after.getIn(['charSkills', 4, 'score'])).toEqual(-1, 'Deception got updated');
  expect(after.getIn(['charSkills', 5, 'score'])).toEqual(5, 'History got updated');
  expect(after.getIn(['charSkills', 6, 'score'])).toEqual(0, 'Insight got updated');
  expect(after.getIn(['charSkills', 7, 'score'])).toEqual(-1, 'Intimidation got updated');
  expect(after.getIn(['charSkills', 8, 'score'])).toEqual(1, 'Investigation got updated');
  expect(after.getIn(['charSkills', 9, 'score'])).toEqual(0, 'Medicine got updated');
  expect(after.getIn(['charSkills', 10, 'score'])).toEqual(5, 'Nature got updated');
  expect(after.getIn(['charSkills', 11, 'score'])).toEqual(0, 'Perception got updated');
  expect(after.getIn(['charSkills', 12, 'score'])).toEqual(-1, 'Performance got updated');
  expect(after.getIn(['charSkills', 13, 'score'])).toEqual(3, 'Persuasion got updated');
  expect(after.getIn(['charSkills', 14, 'score'])).toEqual(5, 'Religion got updated');
  expect(after.getIn(['charSkills', 15, 'score'])).toEqual(3, 'Sleight of Hand got updated');
  expect(after.getIn(['charSkills', 16, 'score'])).toEqual(3, 'Stealth got updated');
  expect(after.getIn(['charSkills', 17, 'score'])).toEqual(0, 'Survival got updated');

  // passive perception updated
  expect(after.getIn(['charPassivePerception', 'score'])).toEqual(10, 'Passive Perception got updated');
});
