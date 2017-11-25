import invariant from 'invariant';

export const createAttack = data => dispatch => {
  invariant(typeof data.id === 'string', 'Create Attack `id` must be a string');

  invariant(
    typeof data.name === 'string',
    'Create Attack `name` must be a string'
  );

  invariant(
    typeof data.desc === 'string',
    'Create Attack `desc` must be a string'
  );

  dispatch({
    type: 'ATTACK_CREATE',
    data,
  });
};

export const editAttack = data => dispatch => {
  invariant(typeof data.id === 'string', 'Edit Attack `id` must be a string');

  invariant(
    typeof data.name === 'string',
    'Edit Attack `name` must be a string'
  );

  invariant(
    typeof data.desc === 'string',
    'Edit Attack `desc` must be a string'
  );

  dispatch({
    type: 'ATTACK_EDIT',
    data,
  });
};

export const deleteAttack = data => dispatch => {
  invariant(typeof data.id === 'string', 'Delete Attack `id` must be a string');

  dispatch({
    type: 'ATTACK_DELETE',
    data,
  });
};
