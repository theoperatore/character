import invariant from 'invariant';

export const incrementClassCharge = id => dispatch => {
  invariant(
    typeof id === 'string',
    'Increment class charge `id` must be a string'
  );

  dispatch({
    type: 'CLASS_CHARGE_INCREMENT',
    data: {
      id,
    },
  });
};

export const decrementClassCharge = id => dispatch => {
  invariant(
    typeof id === 'string',
    'Decrement class charge `id` must be a string'
  );

  dispatch({
    type: 'CLASS_CHARGE_DECREMENT',
    data: {
      id,
    },
  });
};
