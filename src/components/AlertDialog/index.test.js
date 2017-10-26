import React from 'react';
import { shallow } from 'enzyme';
import AlertDialog from './index';

jest.mock('../Modal', () => 'Modal-Mock');

test('<AlertDialog /> does not render', () => {
  expect(shallow(<AlertDialog active message="yo?" onConfirm={() => {}}/>)).toMatchSnapshot();
});
