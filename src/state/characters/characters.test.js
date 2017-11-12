import { createState } from 'state';
import { loadCharacters } from './actions';

let store;
beforeEach(() => {
  store = createState();
});

test('loads user characters', async () => {
  const mockId = 'testid';
  const mockCharacters = {
    displayName: 'testname',
    profileImg: 'testprofileimg',
    userId: 'testuserid',
  };

  require('api').loadCharacters = () => Promise.resolve(mockCharacters);

  const promise = store.dispatch(loadCharacters(mockId));
  expect(store.getState().characters.isLoading).toEqual(true);
  await promise;
  expect(store.getState().characters.characters).toEqual(mockCharacters);
});

test('loads characters profile when error', async () => {
  const mockId = 'testid';
  const mockError = {
    message: 'testerror',
  };

  require('api').loadCharacters = () => Promise.reject(mockError);

  const promise = store.dispatch(loadCharacters(mockId));
  expect(store.getState().characters.isLoading).toEqual(true);
  await promise;
  expect(store.getState().characters.error).toEqual(mockError.message);
});
