'use strict';

import test from 'tape';
import { createStore, combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';
import { character } from '../src/ui/state/reducers';
import { editAbilityScores } from './testUtils/testActionCreators';
import { characters } from '../src/dummy-data/dummy-characters';

test('Updating ability scores will update relevant stats', t => {
  const store = createStore(combineReducers({ character }), { character: fromJS(characters.ralf.character_data) });

  t.plan(36);

  store.dispatch(editAbilityScores({
    str: 18, // mod 4
    dex: 16, // mod 3
    con: 14, // mod 2
    int: 12, // mod 1
    wis: 10, // mod 0
    cha:  9, // mod -1
  }));

  let after = store.getState().character;

  // got correct mods
  t.equal(after.getIn(['charAbilities', 'str', 'mod']), 4, 'str mod is correct');
  t.equal(after.getIn(['charAbilities', 'dex', 'mod']), 3, 'dex mod is correct');
  t.equal(after.getIn(['charAbilities', 'con', 'mod']), 2, 'con mod is correct');
  t.equal(after.getIn(['charAbilities', 'int', 'mod']), 1, 'int mod is correct');
  t.equal(after.getIn(['charAbilities', 'wis', 'mod']), 0, 'wis mod is correct');
  t.equal(after.getIn(['charAbilities', 'cha', 'mod']), -1, 'cha mod is correct');

  // attack bubbles updated
  t.equal(after.getIn(['charAttackBubbles', 0, 'score']), 4, 'str attack bubble got updated');
  t.equal(after.getIn(['charAttackBubbles', 1, 'score']), 4, 'cha proficient (4) attack bubble got updated');

  // spell bubbles updated
  t.equal(after.getIn(['charSpellBubbles', 0, 'score']), -1, 'cha spell bubble got updated');

  // spell save DC updated
  t.equal(after.getIn(['charSpellSaveDC', 'score']), 12, 'spell save dc (8 + 4 + wis) got updated');

  // initiative updated
  t.equal(after.getIn(['charInitiative', 'score']), 3, 'initiative got updated');

  // saving throws updated
  t.equal(after.getIn(['charSavingThrows', 'str', 'score']), 4, 'str saving throw is correct');
  t.equal(after.getIn(['charSavingThrows', 'dex', 'score']), 3, 'dex saving throw is correct');
  t.equal(after.getIn(['charSavingThrows', 'con', 'score']), 2, 'con saving throw is correct');
  t.equal(after.getIn(['charSavingThrows', 'int', 'score']), 5, 'int saving throw (prof) is correct');
  t.equal(after.getIn(['charSavingThrows', 'wis', 'score']), 0, 'wis saving throw is correct');
  t.equal(after.getIn(['charSavingThrows', 'cha', 'score']), 3, 'cha saving throw (prof) is correct');

  // skills updated
  t.equal(after.getIn(['charSkills', 0, 'score']), 3, 'Acrobatics got updated');
  t.equal(after.getIn(['charSkills', 1, 'score']), 0, 'Animal Handling got updated');
  t.equal(after.getIn(['charSkills', 2, 'score']), 5, 'Arcana got updated');
  t.equal(after.getIn(['charSkills', 3, 'score']), 4, 'Athletics got updated');
  t.equal(after.getIn(['charSkills', 4, 'score']), -1, 'Deception got updated');
  t.equal(after.getIn(['charSkills', 5, 'score']), 5, 'History got updated');
  t.equal(after.getIn(['charSkills', 6, 'score']), 0, 'Insight got updated');
  t.equal(after.getIn(['charSkills', 7, 'score']), -1, 'Intimidation got updated');
  t.equal(after.getIn(['charSkills', 8, 'score']), 1, 'Investigation got updated');
  t.equal(after.getIn(['charSkills', 9, 'score']), 0, 'Medicine got updated');
  t.equal(after.getIn(['charSkills', 10, 'score']), 5, 'Nature got updated');
  t.equal(after.getIn(['charSkills', 11, 'score']), 0, 'Perception got updated');
  t.equal(after.getIn(['charSkills', 12, 'score']), -1, 'Performance got updated');
  t.equal(after.getIn(['charSkills', 13, 'score']), 3, 'Persuasion got updated');
  t.equal(after.getIn(['charSkills', 14, 'score']), 5, 'Religion got updated');
  t.equal(after.getIn(['charSkills', 15, 'score']), 3, 'Sleight of Hand got updated');
  t.equal(after.getIn(['charSkills', 16, 'score']), 3, 'Stealth got updated');
  t.equal(after.getIn(['charSkills', 17, 'score']), 0, 'Survival got updated');

  // passive perception updated
  t.equal(after.getIn(['charPassivePerception', 'score']), 10, 'Passive Perception got updated');
});