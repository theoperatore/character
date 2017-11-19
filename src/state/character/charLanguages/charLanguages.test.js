import { fromJS } from 'immutable';
import { createState } from 'state';
import defaultCharacter from 'state/defaultCharacter';
import { createLanguage, editLanguage, deleteLanguage } from './actions';

test('can create language', () => {
  const store = createState();

  const mockLanguage = {
    id: 'lang1',
    name: 'Common',
    desc: 'everyone knows common...',
  };
  store.dispatch(createLanguage(mockLanguage));
  const langs = store
    .getState()
    .character.getIn(['charOtherProficiencies', 'languages']);
  expect(langs.size).toEqual(1);
  expect(langs.get(0).toJS()).toEqual(mockLanguage);
});

test('can create language (from no languages in character)', () => {
  const store = createState({
    character: fromJS({
      ...defaultCharacter,
      charOtherProficiencies: {},
    }),
  });

  const mockLanguage = {
    id: 'lang1',
    name: 'Common',
    desc: 'everyone knows common...',
  };
  store.dispatch(createLanguage(mockLanguage));
  const langs = store
    .getState()
    .character.getIn(['charOtherProficiencies', 'languages']);
  expect(langs.size).toEqual(1);
  expect(langs.get(0).toJS()).toEqual(mockLanguage);
});

test('can edit language', () => {
  const store = createState();

  const mockLanguage = {
    id: 'lang1',
    name: 'Common',
    desc: 'everyone knows common...',
  };

  const mockEdit = {
    id: 'lang1',
    name: 'Gnomish',
    desc: 'everyone knows common, but not Gnomish',
  };

  store.dispatch(createLanguage(mockLanguage));
  store.dispatch(editLanguage(mockEdit));
  const langs = store
    .getState()
    .character.getIn(['charOtherProficiencies', 'languages']);
  expect(langs.size).toEqual(1);
  expect(langs.get(0).toJS()).toEqual(mockEdit);
});

test('does not edit language if id is not found', () => {
  const store = createState();

  const mockLanguage = {
    id: 'lang1',
    name: 'Common',
    desc: 'everyone knows common...',
  };

  const mockEdit = {
    id: 'lang3',
    name: 'Gnomish',
    desc: 'everyone knows common, but not Gnomish',
  };

  store.dispatch(createLanguage(mockLanguage));
  store.dispatch(editLanguage(mockEdit));
  const langs = store
    .getState()
    .character.getIn(['charOtherProficiencies', 'languages']);
  expect(langs.size).toEqual(1);
  expect(langs.get(0).toJS()).toEqual(mockLanguage);
});

test('can delete language', () => {
  const store = createState();

  const mockLanguage = {
    id: 'lang1',
    name: 'Common',
    desc: 'everyone knows common...',
  };

  store.dispatch(createLanguage(mockLanguage));
  store.dispatch(deleteLanguage('lang1'));
  const langs = store
    .getState()
    .character.getIn(['charOtherProficiencies', 'languages']);
  expect(langs.size).toEqual(0);
});
