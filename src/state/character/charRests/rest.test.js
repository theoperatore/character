import { fromJS } from 'immutable';
import { createState } from 'state';
import { characters } from 'state/testingData/dummy-characters';
import { damageCharacter } from 'state/character/charHitPoints/actions';
import { takeLongRest, takeShortRest } from './actions';

let store;
let mockHitDiceId;
beforeEach(() => {
  const character = fromJS(characters.ralf.character_data);
  store = createState({ character });
  store.dispatch(damageCharacter(20)); // 6 current hp
  mockHitDiceId = store
    .getState()
    .character.getIn(['charHitPoints', 'hitDice', 0]);
});

test('Taking a long rest restores the stuff', () => {
  const data = {
    hitDiceId: mockHitDiceId,
  };
  store.dispatch(takeLongRest(data));

  const currHp = store.getState().character.getIn(['charHitPoints', 'current']);
  const maxHp = store.getState().character.getIn(['charHitPoints', 'maximum']);

  const currHitDice = store
    .getState()
    .character.getIn([
      'charHitPoints',
      'hitDiceDefinitions',
      mockHitDiceId,
      'current',
    ]);

  // ralf only has one as of writing
  const currClassCharge = store
    .getState()
    .character.getIn(['charClassCharges', 0, 'current']);
  const maxClassCharge = store
    .getState()
    .character.getIn(['charClassCharges', 0, 'charges']);

  // spell slots
  const slotsUsedLength = store
    .getState()
    .character.get('charSpells')
    .map(spells => spells.get('used'))
    .filter(used => used > 0).size;

  expect(currHp).toEqual(maxHp);
  expect(currHitDice).toEqual(7);
  expect(currClassCharge).toEqual(maxClassCharge);
  expect(slotsUsedLength).toEqual(0);
});

test('Taking a short rest regains hp and uses hit dice', () => {
  const data = {
    hitDiceId: mockHitDiceId,
    hpRegained: 4,
    numHitDiceUsed: 1,
  };
  store.dispatch(takeShortRest(data));

  const currHp = store.getState().character.getIn(['charHitPoints', 'current']);
  const currHitDice = store
    .getState()
    .character.getIn([
      'charHitPoints',
      'hitDiceDefinitions',
      mockHitDiceId,
      'current',
    ]);

  expect(currHp).toEqual(10);
  expect(currHitDice).toEqual(0);
});
