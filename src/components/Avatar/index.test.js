import React from 'react';
import { shallow } from 'enzyme';
import Avatar from './index';

test('<Avatar /> renders image and text', () => {
  expect(shallow(<Avatar src="imgsrc" altText="AP" />)).toMatchSnapshot();
});

test('<Avatar /> renders image and icon', () => {
  expect(
    shallow(<Avatar src="imgsrc" altText="AP" icon={<p>some icon</p>} />)
  ).toMatchSnapshot();
});

test('<Avatar /> renders size and circle', () => {
  expect(
    shallow(
      <Avatar
        circle
        size={64}
        src="imgsrc"
        altText="AP"
        icon={<p>some icon</p>}
      />
    )
  ).toMatchSnapshot();
});
