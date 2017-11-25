import invariant from 'invariant';

export const editDefenses = data => dispatch => {
  invariant(
    typeof data.armorClass === 'number',
    'Edit defenses `armorClass` must be a number'
  );

  invariant(
    typeof data.initiativeBonus === 'number',
    'Edit defenses `initiativeBonus` must be a number'
  );

  invariant(
    typeof data.speed === 'string',
    'Edit defenses `speed` must be a string'
  );

  invariant(
    typeof data.maxHp === 'number',
    'Edit defenses `maxHp` must be a number'
  );

  dispatch({
    type: 'DEFENSES_EDIT',
    data,
  });
};
