import { fromJS } from 'immutable';
import { createState } from 'state';
import defaultCharacter from 'state/defaultCharacter';
import {
  createProficiency,
  editProficiency,
  deleteProficiency,
} from './actions';

test('Create proficiency', () => {
  const store = createState();

  const mockProf = {
    name: 'test',
    desc: 'test desc',
    id: 'prof1',
  };
  store.dispatch(createProficiency(mockProf));

  let after = store
    .getState()
    .character.getIn(['charOtherProficiencies', 'proficiencies']);

  expect(after.size).toEqual(1);
  expect(after.getIn([0]).toJS()).toEqual(mockProf);
});

test('can create proficiency (from no languages in character)', () => {
  const store = createState({
    character: fromJS({
      ...defaultCharacter,
      charOtherProficiencies: {},
    }),
  });

  const mockProf = {
    name: 'test',
    desc: 'test desc',
    id: 'prof1',
  };
  store.dispatch(createProficiency(mockProf));

  let after = store
    .getState()
    .character.getIn(['charOtherProficiencies', 'proficiencies']);

  expect(after.size).toEqual(1);
  expect(after.getIn([0]).toJS()).toEqual(mockProf);
});

test('Delete proficiency', () => {
  const store = createState();

  const mockProf = {
    name: 'test',
    desc: 'test desc',
    id: 'prof1',
  };
  store.dispatch(createProficiency(mockProf));

  let before = store
    .getState()
    .character.getIn(['charOtherProficiencies', 'proficiencies']);

  store.dispatch(deleteProficiency('prof1'));

  let after = store
    .getState()
    .character.getIn(['charOtherProficiencies', 'proficiencies']);

  expect(before.size).toEqual(1);
  expect(after.size).toEqual(0);
});

test('Can edit other proficiencies', () => {
  const store = createState();

  const mockProf = {
    name: 'test',
    desc: 'test desc',
    id: 'prof1',
  };
  const newProf = {
    name: 'something else',
    desc: 'a thing',
    id: 'prof1',
  };
  store.dispatch(createProficiency(mockProf));
  store.dispatch(editProficiency(newProf));

  const profs = store
    .getState()
    .character.getIn(['charOtherProficiencies', 'proficiencies']);
  expect(profs.getIn([0]).toJS()).toEqual(newProf);
});

test('Can edit other proficiencies error', () => {
  const store = createState();

  const mockProf = {
    name: 'test',
    desc: 'test desc',
    id: 'prof1',
  };
  const newProf = {
    name: 'something else',
    desc: 'a thing',
    id: 'prof2', // different id should not allow editing...
  };
  store.dispatch(createProficiency(mockProf));
  store.dispatch(editProficiency(newProf));

  const profs = store
    .getState()
    .character.getIn(['charOtherProficiencies', 'proficiencies']);
  expect(profs.getIn([0]).toJS()).toEqual(mockProf);
});
