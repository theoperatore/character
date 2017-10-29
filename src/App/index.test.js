import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

test('<App /> renders', () => {
  const mockStore = {
    getState() {},
    subscribe() {},
    dispatch() {},
  };

  expect(shallow(<App store={mockStore} />)).toMatchSnapshot();
});
