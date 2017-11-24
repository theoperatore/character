import invariant from 'invariant';

export const editSavingThrow = data => dispatch => {
  invariant(
    typeof data.ability === 'string',
    'Saving Throw `ability` must be a string'
  );
  invariant(
    typeof data.bonus === 'number',
    'Saving Throw `bonus` must be a number'
  );
  invariant(
    typeof data.proficient === 'boolean',
    'Saving Throw `proficient` must be a boolean'
  );

  dispatch({
    type: 'SAVING_THROW_EDIT',
    data,
  });
};
