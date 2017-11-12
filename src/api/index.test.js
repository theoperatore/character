import { loadCharacters, loadCharacter, loadUserProfile } from './index';

jest.mock('firebase', () => ({
  app: () => ({
    database: () => ({
      ref: () => ({
        child: () => ({
          once: () => Promise.resolve({ val: () => Promise.resolve('hey') }),
        }),
      }),
    }),
  }),
}));

test('api can load characters', async () => {
  const expected = 'hey';
  const output = await loadCharacters('someuserId');
  expect(output).toEqual(expected);
});

test('api can load a  character', async () => {
  const expected = 'hey';
  const output = await loadCharacter('someuserId');
  expect(output).toEqual(expected);
});

test('api can load user profile correctly', async () => {
  const mockUser = {
    displayName: 'testname',
    photoURL: 'testimg',
    uid: 'testuserid',
  };

  require('firebase').auth = () => ({
    onAuthStateChanged: fn => {
      setTimeout(() => {
        fn(mockUser);
      }, 100);
      return function off() {};
    },
  });

  const profile = await loadUserProfile();
  expect(profile.displayName).toEqual(mockUser.displayName);
  expect(profile.profileImg).toEqual(mockUser.photoURL);
  expect(profile.userId).toEqual(mockUser.uid);
});

test('api can load user profile correctly when a user is logged out', async () => {
  require('firebase').auth = () => ({
    onAuthStateChanged: fn => {
      setTimeout(() => {
        fn();
      }, 100);
      return function off() {};
    },
  });

  const profile = await loadUserProfile();
  expect(profile).toEqual(undefined);
});

test('api can handles user profile when error', async () => {
  const mockError = {
    message: 'testerror',
  };

  require('firebase').auth = () => ({
    onAuthStateChanged: (fn, errFn) => {
      setTimeout(() => {
        errFn(mockError);
      }, 100);
      return function off() {};
    },
  });

  let profile;
  let error;
  try {
    profile = await loadUserProfile();
  } catch (err) {
    error = err;
  }

  expect(profile).toEqual(undefined);
  expect(error).toEqual(mockError);
});
