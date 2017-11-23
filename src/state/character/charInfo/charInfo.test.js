import { fromJS } from 'immutable';
import { createState } from 'state';
import defaultCharacter from 'state/defaultCharacter';
import { editBasicInfo } from './actions';

test('update basic character info', () => {
  const store = createState();

  const before = store.getState().character.get('charInfo');
  const mockInfo = {
    class: 'test',
    level: 100,
    background: 'cool bg',
    race: 'person',
    alignment: 'usually good',
  };

  store.dispatch(editBasicInfo(mockInfo));

  const after = store.getState().character.get('charInfo');

  expect(before.get('class')).toEqual('-');
  expect(before.get('level')).toEqual(1);
  expect(before.get('background')).toEqual('-');
  expect(before.get('race')).toEqual('-');
  expect(before.get('alignment')).toEqual('-');
  expect(before.get('xp')).toEqual(0);

  expect(after.get('class')).toEqual('test');
  expect(after.get('level')).toEqual(100);
  expect(after.get('background')).toEqual('cool bg');
  expect(after.get('race')).toEqual('person');
  expect(after.get('alignment')).toEqual('usually good');
  expect(after.get('xp')).toEqual(0);
});

test('updating character level also updates hit dice', () => {
  const store = createState();
  const newInfo = {
    level: 100,
  };

  store.dispatch(editBasicInfo(newInfo));
  const hitDiceMax = store
    .getState()
    .character.getIn(['charHitPoints', 'charHitDiceMaximum']);
  const hitDiceCur = store
    .getState()
    .character.getIn(['charHitPoints', 'charHitDiceCurrent']);

  expect(hitDiceMax).toEqual(hitDiceCur);
  expect(hitDiceMax).toEqual(100);
  expect(hitDiceCur).toEqual(100);
});

test('Can update info from blank data', () => {
  const store = createState({
    character: fromJS({}),
  });

  const mockInfo = {
    class: 'test',
    level: 100,
    background: 'cool bg',
    race: 'person',
    alignment: 'usually good',
  };

  store.dispatch(editBasicInfo(mockInfo));

  const after = store.getState().character.get('charInfo');
  expect(after.toJS()).toEqual(mockInfo);
});
