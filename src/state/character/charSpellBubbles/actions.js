import invariant from 'invariant';

const checkObject = data => {
  invariant(
    typeof data.abil === 'string',
    'Spell Attack bonus `abil` must be a string'
  );
  invariant(
    typeof data.prof === 'boolean',
    'Spell Attack bonus `prof` must be a boolean'
  );
  invariant(
    typeof data.name === 'string',
    'Spell Attack bonus `name` must be a string'
  );
  invariant(
    typeof data.id === 'string',
    'Spell Attack bonus `id` must be a string'
  );
  invariant(
    typeof data.bonus === 'number',
    'Spell Attack bonus `bonus` must be a number'
  );

  return true;
};

export const createSpellAttackBubble = data => dispatch =>
  checkObject(data) &&
  dispatch({
    type: 'SPELL_ATTACK_BONUS_CREATE',
    data,
  });

export const editSpellAttackBubble = data => dispatch =>
  checkObject(data) &&
  dispatch({
    type: 'SPELL_ATTACK_BONUS_EDIT',
    data,
  });

export const deleteSpellAttackBubble = data => dispatch => {
  invariant(
    typeof data.id === 'string',
    'Spell Attack bonus `id` must be a string'
  );

  dispatch({
    type: 'SPELL_ATTACK_BONUS_DELETE',
    data,
  });
};
