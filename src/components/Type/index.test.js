import React from 'react';
import { shallow } from 'enzyme';
import Type from './index';

test('<Type /> renders normal copy', () => {
  expect(shallow(<Type>normal</Type>)).toMatchSnapshot();
});

test('<Type /> renders subtext', () => {
  expect(shallow(<Type variant="subtext">subtext</Type>)).toMatchSnapshot();
});

test('<Type /> renders body', () => {
  expect(shallow(<Type variant="body">body</Type>)).toMatchSnapshot();
});

test('<Type /> renders heading-1', () => {
  expect(shallow(<Type variant="heading-1">heading-1</Type>)).toMatchSnapshot();
});

test('<Type /> renders heading-2', () => {
  expect(shallow(<Type variant="heading-2">heading-2</Type>)).toMatchSnapshot();
});

test('<Type /> renders display-1', () => {
  expect(shallow(<Type variant="display-1">display-1</Type>)).toMatchSnapshot();
});

test('<Type /> renders display-2', () => {
  expect(shallow(<Type variant="display-2">display-2</Type>)).toMatchSnapshot();
});
