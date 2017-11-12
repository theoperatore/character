import React from 'react';
import { shallow } from 'enzyme';
import LoadingIndicator from './index';

test('<LoadingIndicator /> renders', () => {
  expect(shallow(<LoadingIndicator />)).toMatchSnapshot();
});

test('<LoadingIndicator /> renders in the center', () => {
  expect(shallow(<LoadingIndicator center />)).toMatchSnapshot();
});
