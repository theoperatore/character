'use strict';

import test from 'tape';
import { createStore, combineReducers } from 'redux';
import { Map, List } from 'immutable';
import { character } from '../src/ui/state/reducers';


test('Immutable default character', t => {
  t.plan(4);

  const store = createStore(combineReducers({ character }));
  let state = store.getState();

  t.equal(Map.isMap(state.character), true, 'character should be an Immutable Map');
  t.equal(List.isList(state.character.get('charAttackBubbles')), true, 'attack bubbles should be an Immutable List');
  t.equal(state.character.get('charAttackBubbles').size, 0, 'starts with no attack bubbles');
  t.equal(state.character.get('charSpellBubbles').size, 0, 'starts with no spell bubbles');
});

test('Adding attack bubble', t => {
  t.plan(15);

  const store = createStore(combineReducers({ character }));
  let dispatch = store.dispatch;

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

  t.equal(charAttackBubbles.size, 1, 'contains a new item');
  t.equal(charAttackBubbles.getIn([0, 'id']), 'test-attack-bonus', 'contains the correct id');
  t.equal(charAttackBubbles.getIn([0, 'abil']), 'str', 'contains correct ability mod');
  t.equal(charAttackBubbles.getIn([0, 'prof']), true, 'contains correct proficiency');
  t.equal(charAttackBubbles.getIn([0, 'name']), 'Test Attack Bonus', 'contains correct name');
  t.equal(charAttackBubbles.getIn([0, 'bonus']), 0, 'contains correct bonus');
  t.equal(charAttackBubbles.getIn([0, 'score']), 0, 'contains correct score');

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
  
  t.equal(charAttackBubbles.size, 2, 'contains both items');
  t.equal(charAttackBubbles.getIn([1, 'id']), 'test-attack-bonus-2', 'contains the correct id');
  t.equal(charAttackBubbles.getIn([1, 'abil']), 'wis', 'contains correct ability mod');
  t.equal(charAttackBubbles.getIn([1, 'prof']), false, 'contains correct proficiency');
  t.equal(charAttackBubbles.getIn([1, 'name']), 'Test Attack Bonus 2', 'contains correct name');
  t.equal(charAttackBubbles.getIn([1, 'bonus']), 1, 'contains correct bonus');
  t.equal(charAttackBubbles.getIn([1, 'score']), 1, 'contains correct score');
  t.equal(charAttackBubbles.getIn([0, 'id']), 'test-attack-bonus', 'retains pushed order');
});

test('Updating existing attack bubble', t => {
  t.plan(5);
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

  let beforeEdit = store.getState().character.getIn(['charAttackBubbles', 0]);

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

  let afterEdit = store.getState().character.getIn(['charAttackBubbles', 0]);

  t.equal(beforeEdit.get('id'), afterEdit.get('id'), 'id should remain the same');
  t.equal(beforeEdit.get('score'), 0, 'score starts at 0');
  t.equal(afterEdit.get('score'), 10, 'score updates to 10');
  t.notEqual(beforeEdit.get('prof'), afterEdit.get('prof'), 'updated prof should take effect');
  t.notEqual(beforeEdit.get('name'), afterEdit.get('name'), 'updated name should take effect');
});

test('Updating existing attack bubbles mid-list', t => {
  t.plan(3);

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

  t.equal(charAttackBubbles.size, 3, 'should have 3 elements');
  t.equal(charAttackBubbles.getIn([0, 'name']), 'Test Attack Bonus', 'first element name should not have changed');
  t.equal(charAttackBubbles.getIn([1, 'name']), 'Updated', 'second attack bonus should be updated');
});

test('Deleting attack bubbles', t => {
  t.plan(6);

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

  t.equals(beforeDelete.size, 1, 'Item is in store');
  t.equals(afterDelete.size, 0, 'Item has been deleted');

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

  t.equals(beforeDelete.size, 3, 'contains 3 items');
  t.equals(afterDelete.size, 2, 'an item got deleted');
  t.equals(afterDelete.getIn([0, 'id']), 'test-attack-bonus-1', 'first item is correct after delete');
  t.equals(afterDelete.getIn([1, 'id']), 'test-attack-bonus-3', 'second item is correct after delete');
});

test('Creating Spell Attack Bonuses', t => {
  t.plan(5);
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

  t.equals(beforeCreate.size, 0, 'empty by default');
  t.equals(afterCreate.size, 1, 'contains new item');
  t.equals(afterCreate.getIn([0, 'id']), 'spell-attack-1', 'item has correct id');
  t.equals(afterCreate.getIn([0, 'name']), 'test-data', 'item has correct name');
  t.equals(afterCreate.getIn([0, 'score']), 10, 'score gets updated from bonus');
});

test('Editing Spell Attack Bonuses', t => {
  t.plan(5);
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

  t.equals(afterEdit.getIn([1, 'id']), 'spell-attack-2', 'id still exists');
  t.equals(afterEdit.getIn([1, 'name']), 'some name', 'name got updated correctly');
  t.equals(afterEdit.getIn([0, 'id']), 'spell-attack-1', 'id of first item is unchanged');
  t.equals(afterEdit.getIn([2, 'id']), 'spell-attack-3', 'id of third item is unchanged');
  t.equals(afterEdit.getIn([1, 'score']), 10, 'score gets updated');
});

test('Deleting Spell Attack Bonuses', t => {
  t.plan(4);
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

  t.equals(afterDelete.getIn([1, 'id']), 'spell-attack-3', 'got correct item id');
  t.equals(afterDelete.getIn([1, 'name']), 'test-data-3', 'got correct item name');
  t.equals(afterDelete.getIn([0, 'id']), 'spell-attack-1', 'id of first item is unchanged');
  t.equals(afterDelete.size, 2, 'correct number of items after delete');
});

