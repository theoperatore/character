import { createState } from 'state';
import { editSpellSlots } from './actions';

test('Can edit spell slots', () => {
  const store = createState();
  const slots = new Array(10).fill(1).map((_, idx) => ({
    max: idx + 1,
    curr: idx + 1,
  }));

  store.dispatch(editSpellSlots(slots));
  const spellSlots = store
    .getState()
    .character.get('charSpells')
    .map(spell => spell.get('slots'));
  const spellSlotsUsed = store
    .getState()
    .character.get('charSpells')
    .map(spell => spell.get('used'));
  expect(spellSlots.toJS()).toEqual(slots.map(s => s.max));
  expect(spellSlotsUsed.toJS()).toEqual(slots.map(s => s.max - s.curr));
});
