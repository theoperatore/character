import React from 'react';
import { shallow } from 'enzyme';
import ConfirmationDialog from './index';

jest.mock('../Modal', () => 'Modal-Mock');

test('<ConfirmationDialog /> renders', () => {
  expect(shallow(<ConfirmationDialog
    active
    title="test-dialog"
    body={<p>yo</p>}
    controls={[
      <p key="a">a</p>,
      <p key="b">b</p>,
    ]}
    onDismiss={() => {}}
  />)).toMatchSnapshot();
});
