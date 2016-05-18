'use strict';

import Immutable from 'immutable';

import defaultCharacter from '../data/defaultCharacter';
import defaultPreferences from '../data/defaultPreferences';

const DEFAULT_CHARACTER = Immutable.fromJS(defaultCharacter);
const DEFAULT_PREFERENCES = Immutable.fromJS(defaultPreferences);

export function character(state = DEFAULT_CHARACTER, action) {
  switch (action.type) {

    // info
    case 'BASIC_INFO_EDIT':
      break;
    case 'TRAIT_EDIT':
      break;
    case 'PROFICIENCY_EDIT':
      break;
    case 'PROFICIENCY_DELETE':
      break;
    case 'PROFICIENCY_CREATE':
      break;
    case 'LANGUAGE_EDIT':
      break;
    case 'LANGUAGE_DELETE':
      break;
    case 'LANGUAGE_CREATE':
      break;

    // features
    case 'FEATURE_CREATE':
      break;
    case 'FEATURE_EDIT':
      break;
    case 'FEATURE_DELETE':
      break;

    // ability
    case 'SKILL_EDIT':
      break;
    case 'ABILITY_SCORE_EDIT':
      break;
    case 'PROFICIENCY_BONUS_EDIT':
      break;

    // defenses
    case 'SAVING_THROW_EDIT':
      break;
    case 'HIT_POINTS_EDIT':
      break;
    case 'DEFENSES_EDIT':
      break;
    case 'RESISTANCES_CREATE':
      break;
    case 'RESISTANCES_EDIT':
      break;
    case 'RESISTANCES_DELETE':
      break;
    case 'LONG_REST':
      break;
    case 'SHORT_REST':
      break;

    // attacks
    case 'CLASS_CHARGE_USE':
      break;
    case 'ATTACK_EDIT':
      break;
    case 'ATTACK_DELETE':
      break;
    case 'ATTACK_CREATE':
      break;

    // spells
    case 'SPELL_SLOTS_EDIT':
      break;
    case 'SPELL_DC_EDIT':
      break;
    case 'SPELL_EDIT':
      break;
    case 'SPELL_DELETE':
      break;
    case 'SPELL_CREATE':
      break;

    // equipments
    case 'EQUIPMENT_ITEM_CREATE':
      break;
    case 'EQUIPMENT_ITEM_EDIT':
      break;
    case 'EQUIPMENT_ITEM_DELETE':
      break;
    case 'EQUIPMENT_CONTAINER_CREATE':
      break;
    case 'EQUIPMENT_CONTAINER_EDIT':
      break;
    case 'EQUIPMENT_CONTAINER_DELETE':
      break;
    case 'MONEY_EDIT':
      break;

    // attack bonuses
    case 'ATTACK_BONUS_CREATE':
      return state.update('charAttackBubbles', charAttackBubbles => {
        let score = state.getIn(['charAbilities', action.data.abil, 'mod']) + action.data.bonus;

        score += action.data.prof
          ? state.getIn(['charProficiencyBonus', 'score'])
          : 0;

        let newBubble = Immutable.Map(Object.assign({}, action.data, { score }));
        return charAttackBubbles.push(newBubble);
      });
      
    case 'ATTACK_BONUS_EDIT':
      return state.update('charAttackBubbles', charAttackBubbles => {
        let idx = charAttackBubbles.findIndex(bubble => bubble.get('id') === action.data.id);
        return charAttackBubbles.update(idx, bubble => {
          let score = state.getIn(['charAbilities', action.data.abil, 'mod']) + action.data.bonus;

          score += action.data.prof
            ? state.getIn(['charProficiencyBonus', 'score'])
            : 0;

          return bubble.merge(action.data, { score });
        });
      });
      
    case 'ATTACK_BONUS_DELETE':
      return state.update('charAttackBubbles', charAttackBubbles => {
        return charAttackBubbles.filter(bubble => bubble.get('id') !== action.data.id);
      });

    // spell attack bonuses
    case 'SPELL_ATTACK_BONUS_CREATE':
      return state.update('charSpellBubbles', charSpellBubbles => {
        let score = state.getIn(['charAbilities', action.data.abil, 'mod']) + action.data.bonus;

        score += action.data.prof
          ? state.getIn(['charProficiencyBonus', 'score'])
          : 0;

        let newSpellBubble = Immutable.Map(Object.assign({}, action.data, { score }));
        return charSpellBubbles.push(newSpellBubble);
      });

    case 'SPELL_ATTACK_BONUS_EDIT':
      return state.update('charSpellBubbles', charSpellBubbles => {
        let idx = charSpellBubbles.findIndex(bubble => bubble.get('id') === action.data.id);
        return charSpellBubbles.update(idx, bubble => {
          let score = state.getIn(['charAbilities', action.data.abil, 'mod']) + action.data.bonus;

          score += action.data.prof
            ? state.getIn(['charProficiencyBonus', 'score'])
            : 0;

          return bubble.merge(action.data, { score });
        });
      });

    case 'SPELL_ATTACK_BONUS_DELETE':
      return state.update('charSpellBubbles', charSpellBubbles => {
        return charSpellBubbles.filter(bubble => bubble.get('id') !== action.data.id);
      });

    default:
      return state;
  }
}

export function preferences(state = DEFAULT_PREFERENCES, action) {
  switch (action.type) {
    case 'TOGGLE_SPELL_DC':
      break;
    default:
      return state;
  }
}