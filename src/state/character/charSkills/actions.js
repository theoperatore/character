import invariant from 'invariant';

export const editSkill = skill => dispatch => {
  invariant(
    typeof skill.name === 'string',
    'Skill actions must have a string `name`'
  );

  invariant(
    typeof skill.bonus === 'number',
    'Skill actions must have a number `bonus`'
  );

  invariant(
    typeof skill.trained === 'boolean',
    'Sill actions must have a boolean `trained`'
  );

  dispatch({
    type: 'SKILL_EDIT',
    data: skill,
  });
};
