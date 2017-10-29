import Immutable from 'immutable';
import { createState } from 'state';
import defaultCharacter from '../defaultCharacter';

test('Create proficiency', () => {
  const initialState = Immutable.fromJS(defaultCharacter);
  const store = createState({ character: initialState });

  store.dispatch({
    type: 'PROFICIENCY_CREATE',
    data: {
      name: 'test',
      desc: 'test desc',
      id: 'prof1',
    },
  });

  let after = store
    .getState()
    .character.getIn(['charOtherProficiencies', 'proficiencies']);

  expect(after.size).toEqual(1);
  expect(after.getIn([0, 'name'])).toEqual('test');
});

test('Delete proficiency', () => {
  const initialState = Immutable.fromJS(defaultCharacter);
  const store = createState({ character: initialState });

  store.dispatch({
    type: 'PROFICIENCY_CREATE',
    data: {
      name: 'test',
      desc: 'test desc',
      id: 'prof1',
    },
  });

  let before = store
    .getState()
    .character.getIn(['charOtherProficiencies', 'proficiencies']);

  store.dispatch({
    type: 'PROFICIENCY_DELETE',
    data: {
      id: 'prof1',
    },
  });

  let after = store
    .getState()
    .character.getIn(['charOtherProficiencies', 'proficiencies']);

  expect(before.size).toEqual(1, 'has prof before');
  expect(after.size).toEqual(0, 'item got deleted');
});
