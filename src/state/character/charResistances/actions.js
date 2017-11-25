import invariant from 'invariant';

export const createResistance = resistance => dispatch => {
  invariant(
    typeof resistance.id === 'string',
    'Create Resistance `id` must be a string'
  );

  invariant(
    typeof resistance.name === 'string',
    'Create Resistance `name` must be a string'
  );

  invariant(
    typeof resistance.desc === 'string',
    'Create Resistance `desc` must be a string'
  );

  dispatch({
    type: 'RESISTANCES_CREATE',
    data: resistance,
  });
};

export const editResistance = resistance => dispatch => {
  invariant(
    typeof resistance.id === 'string',
    'Edit Resistance `id` must be a string'
  );

  invariant(
    typeof resistance.name === 'string',
    'Edit Resistance `name` must be a string'
  );

  invariant(
    typeof resistance.desc === 'string',
    'Edit Resistance `desc` must be a string'
  );

  dispatch({
    type: 'RESISTANCES_EDIT',
    data: resistance,
  });
};

export const deleteResistance = resistance => dispatch => {
  invariant(
    typeof resistance.id === 'string',
    'Delete Resistance `id` must be a string'
  );

  dispatch({
    type: 'RESISTANCES_DELETE',
    data: resistance,
  });
};
