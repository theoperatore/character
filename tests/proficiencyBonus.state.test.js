'use strict';

import test from 'tape';
import { createStore, combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';
import { character } from '../src/ui/Character/state/reducers';
import { editProficiencyBonus } from './testUtils/testActionCreators';
import { characters } from '../src/dummy-data/dummy-characters';

test('Updating Proficiency Bonus will update relevant stats', t => {
  const store = createStore(combineReducers({ character }), { character: fromJS(characters.ralf.character_data) });

  t.plan(32);

  store.dispatch(editProficiencyBonus({
    base: 7,
    bonus: 1
  }));

  let after = store.getState().character;

  // proficiency got updated
  t.equal(after.getIn(['charProficiencyBonus', 'base']), 7, 'updated base pb')
  t.equal(after.getIn(['charProficiencyBonus', 'bonus']), 1, 'updated bonus pb')
  t.equal(after.getIn(['charProficiencyBonus', 'score']), 8, 'updated pb score')

  // skills updated
  t.equal(after.getIn(['charSkills', 0, 'score']), 5, 'Acrobatics stayed the same');
  t.equal(after.getIn(['charSkills', 1, 'score']), 3, 'Animal Handling stayed the same');
  t.equal(after.getIn(['charSkills', 2, 'score']), 12, 'Arcana (prof) got updated');
  t.equal(after.getIn(['charSkills', 3, 'score']), 2, 'Athletics stayed the same');
  t.equal(after.getIn(['charSkills', 4, 'score']), 5, 'Deception stayed the same');
  t.equal(after.getIn(['charSkills', 5, 'score']), 12, 'History (prof) got updated');
  t.equal(after.getIn(['charSkills', 6, 'score']), 3, 'Insight stayed the same');
  t.equal(after.getIn(['charSkills', 7, 'score']), 5, 'Intimidation stayed the same');
  t.equal(after.getIn(['charSkills', 8, 'score']), 4, 'Investigation stayed the same');
  t.equal(after.getIn(['charSkills', 9, 'score']), 3, 'Medicine stayed the same');
  t.equal(after.getIn(['charSkills', 10, 'score']), 12, 'Nature (prof) got updated');
  t.equal(after.getIn(['charSkills', 11, 'score']), 3, 'Perception stayed the same');
  t.equal(after.getIn(['charSkills', 12, 'score']), 5, 'Performance stayed the same');
  t.equal(after.getIn(['charSkills', 13, 'score']), 13, 'Persuasion (prof) got updated');
  t.equal(after.getIn(['charSkills', 14, 'score']), 12, 'Religion (prof) got updated');
  t.equal(after.getIn(['charSkills', 15, 'score']), 5, 'Sleight of Hand stayed the same');
  t.equal(after.getIn(['charSkills', 16, 'score']), 5, 'Stealth stayed the same');
  t.equal(after.getIn(['charSkills', 17, 'score']), 3, 'Survival stayed the same');

  // saving throws updated
  t.equal(after.getIn(['charSavingThrows', 'str', 'score']), 2, 'str saving throw is correct');
  t.equal(after.getIn(['charSavingThrows', 'dex', 'score']), 5, 'dex saving throw is correct');
  t.equal(after.getIn(['charSavingThrows', 'con', 'score']), 3, 'con saving throw is correct');
  t.equal(after.getIn(['charSavingThrows', 'int', 'score']), 12, 'int saving throw (prof) is correct');
  t.equal(after.getIn(['charSavingThrows', 'wis', 'score']), 3, 'wis saving throw is correct');
  t.equal(after.getIn(['charSavingThrows', 'cha', 'score']), 13, 'cha saving throw (prof) is correct');

  // attack bubbles updated
  t.equal(after.getIn(['charAttackBubbles', 0, 'score']), 2, 'str attack bubble stayed same');
  t.equal(after.getIn(['charAttackBubbles', 1, 'score']), 14, 'cha proficient (8) attack bubble got updated');

  // spell bubbles updated
  t.equal(after.getIn(['charSpellBubbles', 0, 'score']), 5, 'cha spell bubble stayed same');

  // spell save DC updated
  t.equal(after.getIn(['charSpellSaveDC', 'score']), 19, 'spell save dc (8 + 4 + wis) got updated');

  // passive perception updated
  t.equal(after.getIn(['charPassivePerception', 'score']), 13, 'Passive Perception stayed the same');
});