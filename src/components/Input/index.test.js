import React from 'react';
import { shallow } from 'enzyme';
import Input from './index';

test('<Input /> renders text by default', () => {
  expect(shallow(<Input />)).toMatchSnapshot();
});
