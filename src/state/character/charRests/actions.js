import invariant from 'invariant';

export const takeLongRest = data => dispatch => {
  invariant(
    typeof data.hitDiceId === 'string',
    'Taking long rest `hitDiceId` must be a string'
  );

  dispatch({
    type: 'LONG_REST',
    data,
  });
};

export const takeShortRest = data => dispatch => {
  invariant(
    typeof data.hitDiceId === 'string',
    'Taking short rest `hitDiceId` must be a string'
  );

  invariant(
    typeof data.hpRegained === 'number',
    'Taking short rest `hpRegained` must be a number'
  );

  invariant(
    typeof data.numHitDiceUsed === 'number',
    'Taking short rest `numHitDiceUsed` must be a number'
  );

  dispatch({
    type: 'SHORT_REST',
    data,
  });
};
