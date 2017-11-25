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

export const deathSaveSuccessAdd = () => ({
  type: 'DEATH_SAVES_SUCCESS_ADD',
});

export const deathSaveFailureAdd = () => ({
  type: 'DEATH_SAVES_FAILURE_ADD',
});

export const createHitDice = () => ({
  type: 'HIT_DICE_CREATE',
});

export const editHitDice = data => dispatch => {
  invariant(typeof data.id === 'string', 'Edit hit dice `id` must be a string');

  invariant(
    typeof data.type === 'string',
    'Edit hit dice `type` must be a string'
  );

  invariant(
    typeof data.current === 'number',
    'Edit hit dice `current` must be a number'
  );

  invariant(
    typeof data.maximum === 'number',
    'Edit hit dice `maximum` must be a number'
  );

  dispatch({
    type: 'HIT_DICE_EDIT',
    data,
  });
};

export const deleteHitDice = data => dispatch => {
  invariant(typeof data.id === 'string', 'Edit hit dice `id` must be a string');

  dispatch({
    type: 'HIT_DICE_DELETE',
    data,
  });
};
