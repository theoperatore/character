export const TOGGLE_SPELLS_PANE = 'TOGGLE_SPELLS_PANE';
export const toggleSpellsPane = () => ({ type: TOGGLE_SPELLS_PANE });

export const TOGGLE_ATTACK_PANE = 'TOGGLE_ATTACK_PANE';
export const toggleAttackPane = () => ({ type: TOGGLE_ATTACK_PANE });

export const SET_CLASS_CHARGES = 'SET_CLASS_CHARGES';
export const setClassCharges = data => ({
  type: SET_CLASS_CHARGES,
  data, // ATTACK_ONLY, SPELLS_ONLY, BOTH,
});
