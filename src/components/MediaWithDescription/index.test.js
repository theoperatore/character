import React from 'react';
import { shallow } from 'enzyme';
import MediaWithDescription from './index';

test('<MediaWithDescription /> renders', () => {
  expect(shallow(<MediaWithDescription
    media={<div>media</div>}
    description={<div>description</div>}
  />)).toMatchSnapshot();
});
