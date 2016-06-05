'use strict';

export function editAbilityScores({ str, con, dex, wis, int, cha }) {
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

export function editProficiencyBonus({ base, bonus }) {
  return {
    type: 'PROFICIENCY_BONUS_EDIT',
    data: {
      base,
      bonus,
    },
  };
}