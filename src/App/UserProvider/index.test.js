import React from 'react';
import { shallow } from 'enzyme';
import { UserProvider } from './index';

test('<UserProvider /> renders loading when loading user', () => {
  expect(
    shallow(
      <UserProvider
        user={{ isAuthenticating: true }}
        authenticateUser={() => {}}
      >
        <span>hey</span>
      </UserProvider>
    )
  ).toMatchSnapshot();
});

test('<UserProvider /> renders children when user is loaded', () => {
  expect(
    shallow(
      <UserProvider
        user={{ isAuthenticating: false }}
        authenticateUser={() => {}}
      >
        <span>hey</span>
      </UserProvider>
    )
  ).toMatchSnapshot();
});

test('<UserProvider /> renders error if problem loading user', () => {
  expect(
    shallow(
      <UserProvider
        user={{ error: 'Something went wrong...' }}
        authenticateUser={() => {}}
      >
        <span>hey</span>
      </UserProvider>
    )
  ).toMatchSnapshot();
});
