import React from 'react';
import { shallow } from 'enzyme';
import Select from './index';

test('<Select /> renders', () => {
  expect(shallow(<Select />)).toMatchSnapshot();
});

test('<Select /> renders with children', () => {
  const mount = shallow(<Select><option>1</option><option>2</option></Select>);
  expect(mount).toMatchSnapshot();
  expect(mount.find('option').length).toEqual(2);
});

test('<Select /> renders label', () => {
  expect(shallow(<Select label="my select box" />)).toMatchSnapshot();
});
