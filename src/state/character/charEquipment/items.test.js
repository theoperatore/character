import { createState } from 'state';
import {
  createItem,
  moveItem,
  editItem,
  deleteItem,
  createContainer,
} from './actions';

test('Can create an item', () => {
  const store = createState();
  const container = { id: 'default-backpack' };
  const mockItem = {
    id: 'some-item',
    name: 'My item',
    desc: 'A really cool item!',
  };

  store.dispatch(createItem(container, mockItem));
  const allItems = store
    .getState()
    .character.getIn(['charEquipment', 'allItems']);
  const backpackItems = store
    .getState()
    .character.getIn(['charEquipment', 'containers', 0, 'items']);
  expect(allItems.get('some-item').toJS()).toEqual(mockItem);
  expect(backpackItems.get(0)).toEqual('some-item');
});

test('Cannot create an item in unknown container', () => {
  const store = createState();
  const container = { id: 'different-backpack' };
  const mockItem = {
    id: 'some-item',
    name: 'My item',
    desc: 'A really cool item!',
  };

  store.dispatch(createItem(container, mockItem));
  const allItems = store
    .getState()
    .character.getIn(['charEquipment', 'allItems']);
  const backpackItems = store
    .getState()
    .character.getIn(['charEquipment', 'containers', 0, 'items']);
  expect(allItems.get('some-item')).toEqual(undefined);
  expect(backpackItems.size).toEqual(0);
});

test('Can edit an item', () => {
  const store = createState();
  const container = { id: 'default-backpack' };
  const mockItem = {
    id: 'some-item',
    name: 'My item',
    desc: 'A really cool item!',
  };
  const editedItem = {
    id: 'some-item',
    name: 'Another Item',
    desc: 'The same, but now different!',
  };

  store.dispatch(createItem(container, mockItem));
  store.dispatch(editItem(container, editedItem));
  const allItems = store
    .getState()
    .character.getIn(['charEquipment', 'allItems']);
  const backpackItems = store
    .getState()
    .character.getIn(['charEquipment', 'containers', 0, 'items']);
  expect(allItems.get('some-item').toJS()).toEqual(editedItem);
  expect(backpackItems.get(0)).toEqual('some-item');
});

test('Can move an item', () => {
  const store = createState();
  const container = { id: 'default-backpack' };
  const newContainer = { id: 'new-container', name: 'Napsack' };
  const mockItem = {
    id: 'some-item',
    name: 'My item',
    desc: 'A really cool item!',
  };
  store.dispatch(createContainer(newContainer));
  store.dispatch(createItem(container, mockItem));
  store.dispatch(moveItem(container, newContainer, mockItem));
  const allItems = store
    .getState()
    .character.getIn(['charEquipment', 'allItems']);
  const backpackItems = store
    .getState()
    .character.getIn(['charEquipment', 'containers', 0, 'items']);
  const napsackItems = store
    .getState()
    .character.getIn(['charEquipment', 'containers', 1, 'items']);
  expect(allItems.get('some-item').toJS()).toEqual(mockItem);
  expect(backpackItems.size).toEqual(0);
  expect(napsackItems.size).toEqual(1);
  expect(napsackItems.get(0)).toEqual('some-item');
});

test('Cannot move an item to unknown container', () => {
  const store = createState();
  const container = { id: 'default-backpack' };
  const notRealContainer = { id: 'not-real-container' };
  const mockItem = {
    id: 'some-item',
    name: 'My item',
    desc: 'A really cool item!',
  };
  store.dispatch(createItem(container, mockItem));
  store.dispatch(moveItem(container, notRealContainer, mockItem));
  const allItems = store
    .getState()
    .character.getIn(['charEquipment', 'allItems']);
  const backpackItems = store
    .getState()
    .character.getIn(['charEquipment', 'containers', 0, 'items']);
  expect(backpackItems.size).toEqual(1);
});

test('Cannot move an item from an unknown container', () => {
  const store = createState();
  const container = { id: 'default-backpack' };
  const fromContainer = { id: 'not-real-container' };
  const mockItem = {
    id: 'some-item',
    name: 'My item',
    desc: 'A really cool item!',
  };
  store.dispatch(createItem(container, mockItem));
  store.dispatch(moveItem(fromContainer, container, mockItem));
  const allItems = store
    .getState()
    .character.getIn(['charEquipment', 'allItems']);
  const backpackItems = store
    .getState()
    .character.getIn(['charEquipment', 'containers', 0, 'items']);
  expect(backpackItems.size).toEqual(1);
});

test('Can delete an item', () => {
  const store = createState();
  const container = { id: 'default-backpack' };
  const mockItem = {
    id: 'some-item',
    name: 'My item',
    desc: 'A really cool item!',
  };

  store.dispatch(createItem(container, mockItem));
  store.dispatch(deleteItem(container, mockItem));
  const allItems = store
    .getState()
    .character.getIn(['charEquipment', 'allItems']);
  const backpackItems = store
    .getState()
    .character.getIn(['charEquipment', 'containers', 0, 'items']);

  // the item stays around, but doesn't get added to any packs.
  expect(allItems.get('some-item').toJS()).toEqual(mockItem);
  expect(backpackItems.size).toEqual(0);
});

test('Cannot delete an item from an unknown container', () => {
  const store = createState();
  const container = { id: 'default-backpack' };
  const unknownContainer = { id: 'something-else' };
  const mockItem = {
    id: 'some-item',
    name: 'My item',
    desc: 'A really cool item!',
  };

  store.dispatch(createItem(container, mockItem));
  store.dispatch(deleteItem(unknownContainer, mockItem));
  const allItems = store
    .getState()
    .character.getIn(['charEquipment', 'allItems']);
  const backpackItems = store
    .getState()
    .character.getIn(['charEquipment', 'containers', 0, 'items']);

  // the item stays around, but doesn't get added to any packs.
  expect(allItems.get('some-item').toJS()).toEqual(mockItem);
  expect(backpackItems.size).toEqual(1);
});
