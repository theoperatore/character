import React from 'react';
import { shallow } from 'enzyme';
import Button from './index';

test('<Button /> renders defaults', () => {
  expect(shallow(<Button>heyo</Button>)).toMatchSnapshot();
});

test('<Button /> renders size sm', () => {
  expect(shallow(<Button size="sm">small</Button>)).toMatchSnapshot();
});

test('<Button /> renders size lg', () => {
  expect(shallow(<Button size="lg">large</Button>)).toMatchSnapshot();
});

test('<Button /> renders pill', () => {
  expect(shallow(<Button variant="pill">Pill</Button>)).toMatchSnapshot();
});

test('<Button /> renders bare', () => {
  expect(shallow(<Button variant="bare">Bare</Button>)).toMatchSnapshot();
});
