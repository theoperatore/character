import Immutable from 'immutable';
import { createStore, combineReducers } from 'redux';
import { character } from 'state/reducers';
import defaultCharacter from '../defaultCharacter';

test('update basic character info', () => {
  const initialState = Immutable.fromJS(defaultCharacter);
  const store = createStore(combineReducers({ character}), { character: initialState });

  const before = store.getState().character.get('charInfo');

  store.dispatch({
    type: 'BASIC_INFO_EDIT',
    data: {
      class: "test",
      level: 100,
      background: "cool bg",
      race: "person",
      alignment: "usually good",
    }
  });

  let after = store.getState().character.get('charInfo');

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
