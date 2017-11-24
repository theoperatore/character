import invariant from 'invariant';

const checkObject = data => {
  invariant(
    typeof data.abil === 'string',
    'Attack bonus `abil` must be a string'
  );
  invariant(
    typeof data.prof === 'boolean',
    'Attack bonus `prof` must be a boolean'
  );
  invariant(
    typeof data.name === 'string',
    'Attack bonus `name` must be a string'
  );
  invariant(typeof data.id === 'string', 'Attack bonus `id` must be a string');
  invariant(
    typeof data.bonus === 'number',
    'Attack bonus `bonus` must be a number'
  );

  return true;
};

export const createAttackBubble = data => dispatch =>
  checkObject(data) &&
  dispatch({
    type: 'ATTACK_BONUS_CREATE',
    data,
  });

export const editAttackBubble = data => dispatch =>
  checkObject(data) &&
  dispatch({
    type: 'ATTACK_BONUS_EDIT',
    data,
  });

export const deleteAttackBubble = data => dispatch => {
  invariant(typeof data.id === 'string', 'Attack bonus `id` must be a string');

  dispatch({
    type: 'ATTACK_BONUS_DELETE',
    data,
  });
};
