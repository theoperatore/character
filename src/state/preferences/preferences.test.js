import { createState } from 'state';
import defaultPreferences from 'state/defaultPreferences';
import { toggleAttackPane, toggleSpellsPane, setClassCharges } from './actions';

test('loads preferences initial', () => {
  const store = createState();
  store.dispatch({
    type: 'CHARACTER_LOADED',
    data: {
      character: {},
      preferences: defaultPreferences,
    },
  });

  expect(store.getState().preferences.toJS()).toEqual(defaultPreferences);
});

test('can toggle attacks pane to show', () => {
  const store = createState();
  store.dispatch(toggleAttackPane());
  expect(store.getState().preferences.getIn(['Attacks', 'display'])).toEqual(
    false
  );
  store.dispatch(toggleAttackPane());
  expect(store.getState().preferences.getIn(['Attacks', 'display'])).toEqual(
    true
  );
});

test('can toggle spells pane to show', () => {
  const store = createState();
  store.dispatch(toggleSpellsPane());
  expect(store.getState().preferences.getIn(['Spells', 'display'])).toEqual(
    false
  );
  store.dispatch(toggleSpellsPane());
  expect(store.getState().preferences.getIn(['Spells', 'display'])).toEqual(
    true
  );
});

test('can set class charges to appear on attack pane', () => {
  const store = createState();
  store.dispatch(setClassCharges('ATTACK_ONLY'));
  expect(store.getState().preferences.get('classCharges')).toEqual(
    'ATTACK_ONLY'
  );
});

test('can set class charges to appear on spells pane', () => {
  const store = createState();
  store.dispatch(setClassCharges('SPELLS_ONLY'));
  expect(store.getState().preferences.get('classCharges')).toEqual(
    'SPELLS_ONLY'
  );
});

test('can set class charges to appear on both panes', () => {
  const store = createState();
  store.dispatch(setClassCharges('BOTH'));
  expect(store.getState().preferences.get('classCharges')).toEqual('BOTH');
});

test('setting class chargest to an unknown type will not change value', () => {
  const store = createState();
  store.dispatch(setClassCharges('BOTH'));
  store.dispatch(setClassCharges('something not real'));
  expect(store.getState().preferences.get('classCharges')).toEqual('BOTH');
});
