import { createState } from 'state';
import { editTraits } from './actions';

test('Update character traits', () => {
  const store = createState();

  const before = store.getState().character.get('charTraits');

  store.dispatch(editTraits('flaws', 'A really cool flaw'));

  const after = store.getState().character.get('charTraits');

  expect(before.get('flaws')).not.toEqual(after.get('flaws'));
  expect(after.get('flaws')).toEqual('A really cool flaw');
  expect(before.get('personalityTraits')).toEqual(
    after.get('personalityTraits')
  );
  expect(before.get('ideals')).toEqual(after.get('ideals'));
  expect(before.get('bonds')).toEqual(after.get('bonds'));
});
