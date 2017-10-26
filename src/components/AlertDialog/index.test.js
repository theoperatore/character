import React from 'react';
import { shallow } from 'enzyme';
import AlertDialog from './index';

test('<AlertDialog /> does not render', () => {
  expect(shallow(<AlertDialog active message="yo?" onConfirm={() => {}}/>)).toMatchSnapshot();
});
