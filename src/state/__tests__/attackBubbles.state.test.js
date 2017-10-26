import { createStore, combineReducers } from 'redux';
import { Map, List } from 'immutable';
import { character } from 'state/reducers';

test('Immutable default character', () => {
  const store = createStore(combineReducers({ character }));
  let state = store.getState();

  expect(Map.isMap(state.character)).toEqual(true, 'character should be an Immutable Map');
  expect(List.isList(state.character.get('charAttackBubbles'))).toEqual(true, 'attack bubbles should be an Immutable List');
  expect(state.character.get('charAttackBubbles').size).toEqual(0, 'starts with no attack bubbles');
  expect(state.character.get('charSpellBubbles').size).toEqual(0, 'starts with no spell bubbles');
});

test('Adding attack bubble', () => {
  const store = createStore(combineReducers({ character }));
  const dispatch = store.dispatch;

  dispatch({
    type: 'ATTACK_BONUS_CREATE',
    data: {
      abil : 'str',
      prof : true,
      name : 'Test Attack Bonus',
      id: 'test-attack-bonus',
      bonus: 0,
    }
  });

  let charAttackBubbles = store.getState().character.get('charAttackBubbles');

  expect(charAttackBubbles.size).toEqual(1, 'contains a new item');
  expect(charAttackBubbles.getIn([0, 'id'])).toEqual('test-attack-bonus', 'contains the correct id');
  expect(charAttackBubbles.getIn([0, 'abil'])).toEqual('str', 'contains correct ability mod');
  expect(charAttackBubbles.getIn([0, 'prof'])).toEqual(true, 'contains correct proficiency');
  expect(charAttackBubbles.getIn([0, 'name'])).toEqual('Test Attack Bonus', 'contains correct name');
  expect(charAttackBubbles.getIn([0, 'bonus'])).toEqual(0, 'contains correct bonus');
  expect(charAttackBubbles.getIn([0, 'score'])).toEqual(0, 'contains correct score');

  dispatch({
    type: 'ATTACK_BONUS_CREATE',
    data: {
      abil : 'wis',
      prof : false,
      name : 'Test Attack Bonus 2',
      id: 'test-attack-bonus-2',
      bonus: 1,
    }
  });

  charAttackBubbles = store.getState().character.get('charAttackBubbles');

  expect(charAttackBubbles.size).toEqual(2, 'contains both items');
  expect(charAttackBubbles.getIn([1, 'id'])).toEqual('test-attack-bonus-2', 'contains the correct id');
  expect(charAttackBubbles.getIn([1, 'abil'])).toEqual('wis', 'contains correct ability mod');
  expect(charAttackBubbles.getIn([1, 'prof'])).toEqual(false, 'contains correct proficiency');
  expect(charAttackBubbles.getIn([1, 'name'])).toEqual('Test Attack Bonus 2', 'contains correct name');
  expect(charAttackBubbles.getIn([1, 'bonus'])).toEqual(1, 'contains correct bonus');
  expect(charAttackBubbles.getIn([1, 'score'])).toEqual(1, 'contains correct score');
  expect(charAttackBubbles.getIn([0, 'id'])).toEqual('test-attack-bonus', 'retains pushed order');
});

test('Updating existing attack bubble', () => {
  const store = createStore(combineReducers({ character }));

  store.dispatch({
    type: 'ATTACK_BONUS_CREATE',
    data: {
      abil : 'str',
      prof : true,
      name : 'Test Attack Bonus',
      id: 'test-attack-bonus',
      bonus: 0,
    }
  });

  const beforeEdit = store.getState().character.getIn(['charAttackBubbles', 0]);

  store.dispatch({
    type: 'ATTACK_BONUS_EDIT',
    data: {
      abil : 'str',
      prof : false,
      name : 'Not Proficient Test Attack Bonus',
      id: 'test-attack-bonus',
      bonus: 10,
    }
  });

  const afterEdit = store.getState().character.getIn(['charAttackBubbles', 0]);

  expect(beforeEdit.get('id')).toEqual(afterEdit.get('id'), 'id should remain the same');
  expect(beforeEdit.get('score')).toEqual(0, 'score starts at 0');
  expect(afterEdit.get('score')).toEqual(10, 'score updates to 10');
  expect(beforeEdit.get('prof')).not.toEqual(afterEdit.get('prof'), 'updated prof should take effect');
  expect(beforeEdit.get('name')).not.toEqual(afterEdit.get('name'), 'updated name should take effect');
});

test('Updating existing attack bubbles mid-list', () => {
  const store = createStore(combineReducers({ character }));

  store.dispatch({
    type: 'ATTACK_BONUS_CREATE',
    data: {
      abil : 'str',
      prof : true,
      name : 'Test Attack Bonus',
      id: 'test-attack-bonus-1',
      bonus: 0,
    }
  });

  store.dispatch({
    type: 'ATTACK_BONUS_CREATE',
    data: {
      abil : 'str',
      prof : true,
      name : 'Test Attack Bonus',
      id: 'test-attack-bonus-2',
      bonus: 0,
    }
  });

  store.dispatch({
    type: 'ATTACK_BONUS_CREATE',
    data: {
      abil : 'str',
      prof : true,
      name : 'Test Attack Bonus',
      id: 'test-attack-bonus-3',
      bonus: 0,
    }
  });

  store.dispatch({
    type: 'ATTACK_BONUS_EDIT',
    data: {
      abil : 'con',
      prof : false,
      name : 'Updated',
      id: 'test-attack-bonus-2',
      bonus: 0,
    }
  });

  let charAttackBubbles = store.getState().character.get('charAttackBubbles');

  expect(charAttackBubbles.size).toEqual(3, 'should have 3 elements');
  expect(charAttackBubbles.getIn([0, 'name'])).toEqual('Test Attack Bonus', 'first element name should not have changed');
  expect(charAttackBubbles.getIn([1, 'name'])).toEqual('Updated', 'second attack bonus should be updated');
});

test('Deleting attack bubbles', () => {
  const store = createStore(combineReducers({ character }));

  store.dispatch({
    type: 'ATTACK_BONUS_CREATE',
    data: {
      abil : 'str',
      prof : true,
      name : 'Test Attack Bonus',
      id: 'test-attack-bonus',
      bonus: 0,
    }
  });

  let beforeDelete = store.getState().character.get('charAttackBubbles');

  store.dispatch({
    type: 'ATTACK_BONUS_DELETE',
    data: {
      id: 'test-attack-bonus',
    }
  });

  let afterDelete = store.getState().character.get('charAttackBubbles');

  expect(beforeDelete.size).toEqual(1, 'Item is in store');
  expect(afterDelete.size).toEqual(0, 'Item has been deleted');

  store.dispatch({
    type: 'ATTACK_BONUS_CREATE',
    data: {
      abil : 'str',
      prof : true,
      name : 'Test Attack Bonus',
      id: 'test-attack-bonus-1',
      bonus: 0,
    }
  });

  store.dispatch({
    type: 'ATTACK_BONUS_CREATE',
    data: {
      abil : 'str',
      prof : true,
      name : 'Test Attack Bonus',
      id: 'test-attack-bonus-2',
      bonus: 0,
    }
  });

  store.dispatch({
    type: 'ATTACK_BONUS_CREATE',
    data: {
      abil : 'str',
      prof : true,
      name : 'Test Attack Bonus',
      id: 'test-attack-bonus-3',
      bonus: 0,
    }
  });

  beforeDelete = store.getState().character.get('charAttackBubbles');

  store.dispatch({
    type: 'ATTACK_BONUS_DELETE',
    data: {
      id: 'test-attack-bonus-2',
    }
  });

  afterDelete = store.getState().character.get('charAttackBubbles');

  expect(beforeDelete.size).toEqual(3, 'contains 3 items');
  expect(afterDelete.size).toEqual(2, 'an item got deleted');
  expect(afterDelete.getIn([0, 'id'])).toEqual('test-attack-bonus-1', 'first item is correct after delete');
  expect(afterDelete.getIn([1, 'id'])).toEqual('test-attack-bonus-3', 'second item is correct after delete');
});

test('Creating Spell Attack Bonuses', () => {
  const store = createStore(combineReducers({ character }));

  let beforeCreate = store.getState().character.get('charSpellBubbles');

  store.dispatch({
    type: 'SPELL_ATTACK_BONUS_CREATE',
    data: {
      id: 'spell-attack-1',
      name: 'test-data',
      abil: 'wis',
      bonus: 10,
    }
  });

  let afterCreate = store.getState().character.get('charSpellBubbles');

  expect(beforeCreate.size).toEqual(0, 'empty by default');
  expect(afterCreate.size).toEqual(1, 'contains new item');
  expect(afterCreate.getIn([0, 'id'])).toEqual('spell-attack-1', 'item has correct id');
  expect(afterCreate.getIn([0, 'name'])).toEqual('test-data', 'item has correct name');
  expect(afterCreate.getIn([0, 'score'])).toEqual(10, 'score gets updated from bonus');
});

test('Editing Spell Attack Bonuses', () => {
  const store = createStore(combineReducers({ character }));

  store.dispatch({
    type: 'SPELL_ATTACK_BONUS_CREATE',
    data: {
      id: 'spell-attack-1',
      name: 'test-data',
      abil: 'wis',
      bonus: 0,
    }
  });

  store.dispatch({
    type: 'SPELL_ATTACK_BONUS_CREATE',
    data: {
      id: 'spell-attack-2',
      name: 'test-data',
      abil: 'wis',
      bonus: 0,
    }
  });

  store.dispatch({
    type: 'SPELL_ATTACK_BONUS_CREATE',
    data: {
      id: 'spell-attack-3',
      name: 'test-data',
      abil: 'wis',
      bonus: 0,
    }
  });

  store.dispatch({
    type: 'SPELL_ATTACK_BONUS_EDIT',
    data: {
      id: 'spell-attack-2',
      name: 'some name',
      abil: 'wis',
      bonus: 10,
    }
  });

  let afterEdit = store.getState().character.get('charSpellBubbles');

  expect(afterEdit.getIn([1, 'id'])).toEqual('spell-attack-2', 'id still exists');
  expect(afterEdit.getIn([1, 'name'])).toEqual('some name', 'name got updated correctly');
  expect(afterEdit.getIn([0, 'id'])).toEqual('spell-attack-1', 'id of first item is unchanged');
  expect(afterEdit.getIn([2, 'id'])).toEqual('spell-attack-3', 'id of third item is unchanged');
  expect(afterEdit.getIn([1, 'score'])).toEqual(10, 'score gets updated');
});

test('Deleting Spell Attack Bonuses', () => {
  const store = createStore(combineReducers({ character }));

  store.dispatch({
    type: 'SPELL_ATTACK_BONUS_CREATE',
    data: {
      id: 'spell-attack-1',
      name: 'test-data-1',
      abil: 'wis',
    }
  });

  store.dispatch({
    type: 'SPELL_ATTACK_BONUS_CREATE',
    data: {
      id: 'spell-attack-2',
      name: 'test-data',
      abil: 'wis',
    }
  });

  store.dispatch({
    type: 'SPELL_ATTACK_BONUS_CREATE',
    data: {
      id: 'spell-attack-3',
      name: 'test-data-3',
      abil: 'wis',
    }
  });

  store.dispatch({
    type: 'SPELL_ATTACK_BONUS_DELETE',
    data: {
      id: 'spell-attack-2',
    }
  });

  let afterDelete = store.getState().character.get('charSpellBubbles');

  expect(afterDelete.getIn([1, 'id'])).toEqual('spell-attack-3', 'got correct item id');
  expect(afterDelete.getIn([1, 'name'])).toEqual('test-data-3', 'got correct item name');
  expect(afterDelete.getIn([0, 'id'])).toEqual('spell-attack-1', 'id of first item is unchanged');
  expect(afterDelete.size).toEqual(2, 'correct number of items after delete');
});
