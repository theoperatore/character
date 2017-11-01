import React from 'react';
import { shallow } from 'enzyme';
import { ProtectedRoute } from './index';

test('<ProtectedRoute /> renders', () => {
  expect(shallow(<ProtectedRoute user={{}} />)).toMatchSnapshot();
});
