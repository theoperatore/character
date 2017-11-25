import invariant from 'invariant';

export const healCharacter = value => dispatch => {
  invariant(
    typeof value === 'number',
    'Heal character `value` must be a number'
  );

  dispatch({
    type: 'HIT_POINTS_HEAL',
    data: {
      value,
    },
  });
};

export const damageCharacter = value => dispatch => {
  invariant(
    typeof value === 'number',
    'Damage character `value` must be a number'
  );

  dispatch({
    type: 'HIT_POINTS_DAMAGE',
    data: {
      value,
    },
  });
};

export const tempHpCharacter = value => dispatch => {
  invariant(
    typeof value === 'number',
    'TempHp character `value` must be a number'
  );

  dispatch({
    type: 'HIT_POINTS_TEMP',
    data: {
      value,
    },
  });
};
