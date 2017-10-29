import React from 'react';
import { shallow, mount } from 'enzyme';
import Modal from './index';

jest.mock('react-dom', () => ({
  ...require.requireActual('react-dom'),
  createPortal: children => <div className="portal-mock">{children}</div>,
}));

test('<Modal /> renders default portal when active', () => {
  const testModal = (
    <Modal active onDismiss={() => {}}>
      <div>Heyo</div>
    </Modal>
  );
  expect(shallow(testModal)).toMatchSnapshot();
});

test('<Modal /> renders top portal when active', () => {
  const testModal = (
    <Modal active from="top" onDismiss={() => {}}>
      <div>from top</div>
    </Modal>
  );
  expect(shallow(testModal)).toMatchSnapshot();
});

test('<Modal /> renders bottom portal when active', () => {
  const testModal = (
    <Modal active from="bottom" onDismiss={() => {}}>
      <div>from bottom</div>
    </Modal>
  );
  expect(shallow(testModal)).toMatchSnapshot();
});

test('<Modal /> renders left portal when active', () => {
  const testModal = (
    <Modal active from="left" onDismiss={() => {}}>
      <div>from left</div>
    </Modal>
  );
  expect(shallow(testModal)).toMatchSnapshot();
});

test('<Modal /> renders right portal when active', () => {
  const testModal = (
    <Modal active from="right" onDismiss={() => {}}>
      <div>from right</div>
    </Modal>
  );
  expect(shallow(testModal)).toMatchSnapshot();
});

test('<Modal /> renders nothing when not active', () => {
  const testModal = (
    <Modal onDismiss={() => {}}>
      <div>not rendered</div>
    </Modal>
  );
  expect(shallow(testModal)).toMatchSnapshot();
});

test('<Modal /> renders active css', () => {
  window.setTimeout = fn => fn();
  const testModal = (
    <Modal onDismiss={() => {}}>
      <div>some cool modal body</div>
    </Modal>
  );

  const wrapper = mount(testModal);
  expect(wrapper.find('div.modal_overlay').exists()).toEqual(false);
  wrapper.setProps({ active: true });
  expect(wrapper.find('div.modal_overlay').exists()).toEqual(true);
  wrapper.update();
  expect(wrapper.find('div.modal_overlay--enter').exists()).toEqual(true);
});

test('<Modal /> opens and closes', () => {
  window.setTimeout = fn => fn();
  const testModal = (
    <Modal onDismiss={() => {}}>
      <div>some cool modal body</div>
    </Modal>
  );

  const wrapper = mount(testModal);
  expect(wrapper.find('div.modal_overlay').exists()).toEqual(false);
  wrapper.setProps({ active: true });
  expect(wrapper.find('div.modal_overlay').exists()).toEqual(true);
  wrapper.update();
  expect(wrapper.find('div.modal_overlay--enter').exists()).toEqual(true);
  wrapper.setProps({ active: false });
  wrapper.update();
  expect(wrapper.find('div.modal_overlay--enter').exists()).toEqual(false);
  expect(wrapper.find('div.modal_overlay').exists()).toEqual(false);
});

test('<Modal /> does nothing if given other props', () => {
  window.setTimeout = fn => fn();
  const testModal = (
    <Modal onDismiss={() => {}}>
      <div>some cool modal body</div>
    </Modal>
  );

  const wrapper = mount(testModal);
  expect(wrapper.find('div.modal_overlay').exists()).toEqual(false);
  wrapper.setProps({ active: true });
  expect(wrapper.find('div.modal_overlay').exists()).toEqual(true);
  wrapper.update();
  wrapper.setProps({ active: true });
  wrapper.update();
  expect(wrapper.find('div.modal_overlay').exists()).toEqual(true);
  expect(wrapper.find('div.modal_overlay--enter').exists()).toEqual(true);
});

test('<Modal /> invokes onDismiss when clicking on overlay', () => {
  const dismissMock = jest.fn();
  const testModal = (
    <Modal active onDismiss={dismissMock}>
      <div>some cool modal body</div>
    </Modal>
  );

  const wrapper = mount(testModal);
  expect(wrapper.find('div.modal_overlay').exists()).toEqual(true);
  wrapper.find('div.modal_overlay').simulate('click');
  expect(dismissMock.mock.calls.length).toEqual(1);
});

test('<Modal /> invokes onDismiss when pressing ESC key', () => {
  const dismissMock = jest.fn();
  const testModal = (
    <Modal onDismiss={dismissMock}>
      <div>some cool modal body</div>
    </Modal>
  );

  const wrapper = mount(testModal);
  wrapper.instance().handleEsc({ keyCode: 27 });
  expect(dismissMock.mock.calls.length).toEqual(1);
  wrapper.unmount();
});
