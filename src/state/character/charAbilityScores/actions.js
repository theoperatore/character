import invariant from 'invariant';

export const editAbilityScores = scores => dispatch => {
  invariant(
    typeof scores.str === 'number',
    'Ability score `str` must be number'
  );
  invariant(
    typeof scores.dex === 'number',
    'Ability score `dex` must be number'
  );
  invariant(
    typeof scores.con === 'number',
    'Ability score `con` must be number'
  );
  invariant(
    typeof scores.wis === 'number',
    'Ability score `wis` must be number'
  );
  invariant(
    typeof scores.int === 'number',
    'Ability score `int` must be number'
  );
  invariant(
    typeof scores.cha === 'number',
    'Ability score `cha` must be number'
  );

  dispatch({
    type: 'ABILITY_SCORE_EDIT',
    data: scores,
  });
};
