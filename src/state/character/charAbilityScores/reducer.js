import { List } from 'immutable';

export default function charAbilityScoresReducer(state, action) {
  const proficiencyBonus = state.getIn(['charProficiencyBonus', 'score']);
  const abilityScoreKeys = Object.keys(action.data);
  const abilityScoreMods = abilityScoreKeys.reduce((obj, key) => {
    obj[key] = Math.floor((action.data[key] - 10) / 2);
    return obj;
  }, {});

  const partial = state
    .update('charAbilities', charAbilities => {
      return abilityScoreKeys.reduce((outAbil, abilKey) => {
        return outAbil
          .setIn([abilKey, 'score'], action.data[abilKey])
          .setIn([abilKey, 'mod'], abilityScoreMods[abilKey]);
      }, charAbilities);
    })
    .update('charAttackBubbles', List(), charAttackBubbles => {
      return charAttackBubbles.map(bubble => {
        let newScore =
          abilityScoreMods[bubble.get('abil')] + bubble.get('bonus');

        newScore += bubble.get('prof') ? proficiencyBonus : 0;

        return bubble.set('score', newScore);
      });
    })
    .update('charSpellBubbles', List(), charSpellBubbles => {
      return charSpellBubbles.map(bubble => {
        let newScore =
          abilityScoreMods[bubble.get('abil')] + bubble.get('bonus');

        newScore += bubble.get('prof') ? proficiencyBonus : 0;

        return bubble.set('score', newScore);
      });
    })
    .update('charSpellSaveDC', charSpellSaveDC => {
      const newScore =
        charSpellSaveDC.get('base') +
        charSpellSaveDC.get('bonus') +
        abilityScoreMods[charSpellSaveDC.get('abil')] +
        proficiencyBonus;
      return charSpellSaveDC.set('score', newScore);
    })
    .update('charInitiative', charInitiative => {
      const newScore = charInitiative.get('bonus') + abilityScoreMods.dex;
      return charInitiative.set('score', newScore);
    })
    .update('charSavingThrows', charSavingThrows => {
      return abilityScoreKeys.reduce((outSavingThrows, abilKey) => {
        let newScore = abilityScoreMods[abilKey];

        newScore += outSavingThrows.getIn([abilKey, 'proficient'])
          ? proficiencyBonus
          : 0;

        return outSavingThrows.setIn([abilKey, 'score'], newScore);
      }, charSavingThrows);
    })
    .update('charSkills', charSkills => {
      return charSkills.map(skill => {
        let newScore = skill.get('bonus') + abilityScoreMods[skill.get('mod')];

        newScore += skill.get('trained') ? proficiencyBonus : 0;

        return skill.set('score', newScore);
      });
    });

  return partial.update('charPassivePerception', pp => {
    const perception = partial
      .get('charSkills')
      .find(s => s.get('name') === 'Perception');
    const newScore = pp.get('base') + pp.get('bonus') + perception.get('score');
    return pp.set('score', newScore);
  });
}
