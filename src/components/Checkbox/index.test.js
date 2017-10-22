import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from './index';

test('<Checkbox /> renders without label', () => {
  expect(shallow(<Checkbox />)).toMatchSnapshot();
});

test('<Checkbox /> renders with label', () => {
  expect(shallow(<Checkbox label="Heyo" />)).toMatchSnapshot();
});
