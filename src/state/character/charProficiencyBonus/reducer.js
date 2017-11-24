import { List } from 'immutable';

const ABILITY_SCORE_KEYS = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
export default function charProficiencyBonusReducer(state, action) {
  const newProficiencyBonus =
    Number(action.data.base) + Number(action.data.bonus);

  // proficiency
  const partial = state
    .update('charProficiencyBonus', bonus => {
      return bonus
        .set('base', action.data.base)
        .set('bonus', action.data.bonus)
        .set('score', action.data.base + action.data.bonus);
    })
    // skills
    .update('charSkills', charSkills => {
      return charSkills.map(skill => {
        let newScore =
          skill.get('bonus') +
          state.getIn(['charAbilities', skill.get('mod'), 'mod']);

        newScore += skill.get('trained') ? newProficiencyBonus : 0;

        return skill.set('score', newScore);
      });
    })
    // saving throws
    .update('charSavingThrows', charSavingThrows => {
      return ABILITY_SCORE_KEYS.reduce((outSavingThrows, abilKey) => {
        let newScore = state.getIn(['charAbilities', abilKey, 'mod']);

        newScore += outSavingThrows.getIn([abilKey, 'proficient'])
          ? newProficiencyBonus
          : 0;

        return outSavingThrows.setIn([abilKey, 'score'], newScore);
      }, charSavingThrows);
    })
    // attack bubbles
    .update('charAttackBubbles', List(), charAttackBubbles => {
      return charAttackBubbles.map(bubble => {
        let newScore =
          state.getIn(['charAbilities', bubble.get('abil'), 'mod']) +
          bubble.get('bonus');

        newScore += bubble.get('prof') ? newProficiencyBonus : 0;

        return bubble.set('score', newScore);
      });
    })
    // spell bubbles
    .update('charSpellBubbles', List(), charSpellBubbles => {
      return charSpellBubbles.map(bubble => {
        let newScore =
          state.getIn(['charAbilities', bubble.get('abil'), 'mod']) +
          bubble.get('bonus');

        newScore += bubble.get('prof') ? newProficiencyBonus : 0;

        return bubble.set('score', newScore);
      });
    })
    // spell save dc
    .update('charSpellSaveDC', spellSaveDC => {
      const score =
        state.getIn(['charAbilities', spellSaveDC.get('abil'), 'mod']) +
        spellSaveDC.get('base') +
        spellSaveDC.get('bonus') +
        newProficiencyBonus;
      return spellSaveDC.set('score', score);
    });

  // passive perception
  return partial.updateIn(['charPassivePerception'], pp => {
    const perceptionSkill = partial
      .get('charSkills')
      .find(itm => itm.get('name') === 'Perception');
    const newScore =
      pp.get('base') + pp.get('bonus') + perceptionSkill.get('score');

    return pp.set('score', newScore);
  });
}
