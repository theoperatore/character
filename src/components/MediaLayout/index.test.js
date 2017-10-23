import React from 'react';
import { shallow } from 'enzyme';
import MediaLayout from './index';

test('<MediaLayout /> renders', () => {
  expect(shallow(<MediaLayout
    media={<div>media</div>}
    description={<div>description</div>}
  />)).toMatchSnapshot();
});
