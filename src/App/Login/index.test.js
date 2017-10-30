import React from 'react';
import { shallow } from 'enzyme';
import Login from './index';

jest.mock('firebase');
jest.mock('firebaseui');

test('<Login /> renders', () => {
  expect(shallow(<Login />)).toMatchSnapshot();
});
