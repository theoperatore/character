import { createState } from 'state';
import { authenticateUser } from './actions';

let store;
beforeEach(() => {
  store = createState();
});

test('loads user profile', async () => {
  const mockProfile = {
    displayName: 'testname',
    profileImg: 'testprofileimg',
    userId: 'testuserid',
  };

  require('api').loadUserProfile = () => Promise.resolve(mockProfile);

  const promise = store.dispatch(authenticateUser());
  expect(store.getState().user.isLoading).toEqual(true);
  await promise;
  expect(store.getState().user.profile).toEqual(mockProfile);
});

test('loads user profile when error', async () => {
  const mockError = {
    message: 'testerror',
  };

  require('api').loadUserProfile = () => Promise.reject(mockError);

  const promise = store.dispatch(authenticateUser());
  expect(store.getState().user.isLoading).toEqual(true);
  await promise;
  expect(store.getState().user.error).toEqual(mockError.message);
});
