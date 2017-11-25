import invariant from 'invariant';

// id: 'ralf-cantrip-0',
// name: 'Chill Touch',
// desc: 'some long description',
// cast: '1 action',
// range: '120 ft/ 24 sq',
// cmp: 'V,S',
// dur: 'Instant',
// prepared: false,
export const createSpell = (level, spell) => dispatch => {
  invariant(typeof level === 'number', 'Creat spell `level` must be a number');

  invariant(typeof spell.id === 'string', 'Creat spell `id` must be a string');

  invariant(
    typeof spell.name === 'string',
    'Creat spell `name` must be a string'
  );

  invariant(
    typeof spell.desc === 'string',
    'Creat spell `desc` must be a string'
  );

  invariant(
    typeof spell.cast === 'string',
    'Creat spell `cast` must be a string'
  );

  invariant(
    typeof spell.range === 'string',
    'Creat spell `range` must be a string'
  );

  invariant(
    typeof spell.dur === 'string',
    'Creat spell `dur` must be a string'
  );

  invariant(
    typeof spell.cmp === 'string',
    'Creat spell `cmp` must be a string'
  );

  invariant(
    typeof spell.prepared === 'boolean',
    'Creat spell `prepared` must be a boolean'
  );

  dispatch({
    type: 'SPELL_CREATE',
    data: {
      spell,
      level,
    },
  });
};

export const editSpell = (level, spell) => dispatch => {
  invariant(typeof level === 'number', 'Creat spell `level` must be a number');

  invariant(typeof spell.id === 'string', 'Creat spell `id` must be a string');

  invariant(
    typeof spell.name === 'string',
    'Creat spell `name` must be a string'
  );

  invariant(
    typeof spell.desc === 'string',
    'Creat spell `desc` must be a string'
  );

  invariant(
    typeof spell.cast === 'string',
    'Creat spell `cast` must be a string'
  );

  invariant(
    typeof spell.range === 'string',
    'Creat spell `range` must be a string'
  );

  invariant(
    typeof spell.dur === 'string',
    'Creat spell `dur` must be a string'
  );

  invariant(
    typeof spell.cmp === 'string',
    'Creat spell `cmp` must be a string'
  );

  invariant(
    typeof spell.prepared === 'boolean',
    'Creat spell `prepared` must be a boolean'
  );

  dispatch({
    type: 'SPELL_EDIT',
    data: {
      spell,
      level,
    },
  });
};

export const deleteSpell = (level, spell) => dispatch => {
  invariant(typeof level === 'number', 'Creat spell `level` must be a number');

  invariant(typeof spell.id === 'string', 'Creat spell `id` must be a string');

  dispatch({
    type: 'SPELL_DELETE',
    data: {
      spell,
      level,
    },
  });
};

export const prepareSpell = (level, spell) => dispatch => {
  invariant(typeof level === 'number', 'Creat spell `level` must be a number');

  invariant(typeof spell.id === 'string', 'Creat spell `id` must be a string');

  dispatch({
    type: 'SPELL_PREPARE',
    data: {
      spell,
      level,
    },
  });
};

export const unprepareSpell = (level, spell) => dispatch => {
  invariant(typeof level === 'number', 'Creat spell `level` must be a number');

  invariant(typeof spell.id === 'string', 'Creat spell `id` must be a string');

  dispatch({
    type: 'SPELL_UNPREPARE',
    data: {
      spell,
      level,
    },
  });
};

export const castSpell = (level, slotsUsed) => dispatch => {
  invariant(typeof level === 'number', 'Creat spell `level` must be a number');

  invariant(
    typeof slotsUsed === 'number',
    'Creat spell `slotsUsed` must be a number'
  );

  dispatch({
    type: 'SPELL_CAST',
    data: {
      level,
      slotsUsed,
    },
  });
};

export const editSpellSaveDC = data => dispatch => {
  invariant(
    typeof data.abil === 'string',
    'Spell Save DC requires `abil` to be a string'
  );

  invariant(
    typeof data.bonus === 'number',
    'Spell Save DC requires `bonus` to be a number'
  );

  invariant(
    typeof data.base === 'number',
    'Spell Save DC requires `base` to be a number'
  );

  dispatch({
    type: 'SPELL_DC_EDIT',
    data,
  });
};

// TODO: might have to change this up...
// expects an array of objects { max, curr }...
export const editSpellSlots = slots => dispatch => {
  dispatch({
    type: 'SPELL_SLOTS_EDIT',
    data: {
      slots,
    },
  });
};
