import React from 'react';
import { shallow } from 'enzyme';
import Icon from './index';

test('<Icon /> renders hippo icon', () => {
  const mount = shallow(<Icon name="beer" />);
  expect(mount.find('.icon-beer').length).toEqual(1);
  expect(mount).toMatchSnapshot();
});

test('<Icon /> renders font awesome icon', () => {
  const mount = shallow(<Icon name="arrow-up" />);
  expect(mount.find('.fa.fa-arrow-up').length).toEqual(1);
  expect(mount).toMatchSnapshot();
});
