import { createState } from 'state';
import {
  createContainer,
  editContainer,
  deleteContainer,
  createItem,
} from './actions';

test('Has default backback with default character', () => {
  const store = createState();
  const containers = store
    .getState()
    .character.getIn(['charEquipment', 'containers']);
  expect(containers.size).toEqual(1);
  expect(containers.get(0).get('name')).toEqual('Backpack');
  expect(containers.get(0).get('default')).toEqual(true);
});

test('Can create container', () => {
  const store = createState();
  store.dispatch(
    createContainer({
      id: 'some-id',
      name: 'My new container',
    })
  );

  const containers = store
    .getState()
    .character.getIn(['charEquipment', 'containers']);
  expect(containers.size).toEqual(2);
  expect(containers.get(1).get('name')).toEqual('My new container');
});

test('Can edit container', () => {
  const store = createState();
  store.dispatch(
    createContainer({
      id: 'some-id',
      name: 'My new container',
    })
  );
  store.dispatch(
    editContainer({
      id: 'some-id',
      name: 'New name',
    })
  );

  const containers = store
    .getState()
    .character.getIn(['charEquipment', 'containers']);
  expect(containers.size).toEqual(2);
  expect(containers.get(1).get('name')).toEqual('New name');
});

test('Cannot edit unknown container', () => {
  const store = createState();
  store.dispatch(
    createContainer({
      id: 'some-id',
      name: 'My new container',
    })
  );
  store.dispatch(
    editContainer({
      id: 'some-other-id-that-is-not-good',
      name: 'New name',
    })
  );

  const containers = store
    .getState()
    .character.getIn(['charEquipment', 'containers']);
  expect(containers.size).toEqual(2);
  expect(containers.get(1).get('name')).toEqual('My new container');
});

test('Can delete container', () => {
  const store = createState();
  store.dispatch(
    createContainer({
      id: 'some-id',
      name: 'My new container',
    })
  );
  store.dispatch(
    deleteContainer({
      id: 'some-id',
    })
  );

  const containers = store
    .getState()
    .character.getIn(['charEquipment', 'containers']);
  expect(containers.size).toEqual(1);
});

test('Cannot delete unknown container', () => {
  const store = createState();
  store.dispatch(
    createContainer({
      id: 'some-id',
      name: 'My new container',
    })
  );
  store.dispatch(
    deleteContainer({
      id: 'some-unknown-id',
    })
  );

  const containers = store
    .getState()
    .character.getIn(['charEquipment', 'containers']);
  expect(containers.size).toEqual(2);
  expect(containers.get(1).get('name')).toEqual('My new container');
});

test('Cannot delete default container', () => {
  const store = createState();
  store.dispatch(
    createContainer({
      id: 'some-id',
      name: 'My new container',
    })
  );
  store.dispatch(
    deleteContainer({
      id: 'default-backpack',
    })
  );

  const containers = store
    .getState()
    .character.getIn(['charEquipment', 'containers']);
  expect(containers.size).toEqual(2);
  expect(containers.get(1).get('name')).toEqual('My new container');
});

test('Deleting a container with items moves the items to the Backpack', () => {
  const store = createState();
  const mockItem = {
    id: 'my-item',
    name: 'Some Item',
    desc: 'A really cool item I want to keep around',
  };

  store.dispatch(
    createContainer({
      id: 'some-id',
      name: 'My new container',
    })
  );

  store.dispatch(createItem({ id: 'some-id' }, mockItem));

  const prevContainerItems = store
    .getState()
    .character.getIn(['charEquipment', 'containers', 1, 'items']);
  expect(prevContainerItems.size).toEqual(1);
  expect(prevContainerItems.get(0)).toEqual('my-item');

  store.dispatch(
    deleteContainer({
      id: 'some-id',
    })
  );

  const containers = store
    .getState()
    .character.getIn(['charEquipment', 'containers']);
  const backpackItems = store
    .getState()
    .character.getIn(['charEquipment', 'containers', 0, 'items']);
  expect(containers.size).toEqual(1);
  expect(backpackItems.get(0)).toEqual('my-item');
});
