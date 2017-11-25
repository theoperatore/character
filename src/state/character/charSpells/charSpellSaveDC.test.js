import { createState } from 'state';
import { editSpellSaveDC } from './actions';

test('Can edit spell save DC', () => {
  const store = createState();
  store.dispatch(
    editSpellSaveDC({
      abil: 'wis',
      bonus: 5,
      base: 8,
    })
  );

  const spellSave = store.getState().character.get('charSpellSaveDC');
  expect(spellSave.get('score')).toEqual(13);
});
