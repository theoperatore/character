import invariant from 'invariant';

export const editProficiencyBonus = baseAndBonus => dispatch => {
  invariant(
    typeof baseAndBonus.base === 'number',
    'Proficiency Bonus actions must have `base` as a number'
  );
  invariant(
    typeof baseAndBonus.bonus === 'number',
    'Proficiency Bonus actions must have `bonus` as a number'
  );

  dispatch({
    type: 'PROFICIENCY_BONUS_EDIT',
    data: baseAndBonus,
  });
};
