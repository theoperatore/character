import React from 'react';
import { shallow } from 'enzyme';
import AppLayout from './index';

test('<AppLayout /> renders', () => {
  expect(shallow(<AppLayout
    nav={<h1>heyo</h1>}
    body={<p>my body</p>}
  />)).toMatchSnapshot();
});

test('<AppLayout /> renders horizontal', () => {
  expect(shallow(<AppLayout
    horizontal
    nav={<h1>heyo</h1>}
    body={<p>my body</p>}
  />)).toMatchSnapshot();
});
