import invariant from 'invariant';

export const addWealth = data => dispatch => {
  invariant(
    typeof data.wealthType === 'string',
    'Add wealth `wealthType` must be a string'
  );
  invariant(
    typeof data.value === 'number',
    'Add wealth `value` must be a number'
  );

  dispatch({
    type: 'WEALTH_EDIT',
    data: {
      ...data,
      actionType: 'add',
    },
  });
};

export const subtractWealth = data => dispatch => {
  invariant(
    typeof data.wealthType === 'string',
    'Subtract wealth `wealthType` must be a string'
  );
  invariant(
    typeof data.value === 'number',
    'Subtract wealth `value` must be a number'
  );

  dispatch({
    type: 'WEALTH_EDIT',
    data: {
      ...data,
      actionType: 'subtract',
    },
  });
};

export const createContainer = data => dispatch => {
  invariant(
    typeof data.id === 'string',
    'Create container requires `id` to be a string'
  );

  invariant(
    typeof data.name === 'string',
    'Create container requires `name` to be a string'
  );

  dispatch({
    type: 'EQUIPMENT_CONTAINER_CREATE',
    data,
  });
};

export const editContainer = data => dispatch => {
  invariant(
    typeof data.id === 'string',
    'Edit container requires `id` to be a string'
  );

  invariant(
    typeof data.name === 'string',
    'Edit container requires `name` to be a string'
  );

  dispatch({
    type: 'EQUIPMENT_CONTAINER_EDIT',
    data,
  });
};

export const deleteContainer = data => dispatch => {
  invariant(
    typeof data.id === 'string',
    'Delete container requires `id` to be a string'
  );

  dispatch({
    type: 'EQUIPMENT_CONTAINER_DELETE',
    data,
  });
};

export const createItem = (container, item) => dispatch => {
  invariant(
    typeof container.id === 'string',
    'Create items requires `id` of container to be a string'
  );

  invariant(
    typeof item.id === 'string',
    'Create items requires `id` of item to be a string'
  );

  invariant(
    typeof item.name === 'string',
    'Create items requires `name` of item to be a string'
  );

  invariant(
    typeof item.desc === 'string',
    'Create items requires `desc` of item to be a string'
  );

  dispatch({
    type: 'EQUIPMENT_ITEM_CREATE',
    data: {
      item,
      container,
    },
  });
};

export const editItem = (container, item) => dispatch => {
  invariant(
    typeof container.id === 'string',
    'Create items requires `id` of container to be a string'
  );

  invariant(
    typeof item.id === 'string',
    'Create items requires `id` of item to be a string'
  );

  invariant(
    typeof item.name === 'string',
    'Create items requires `name` of item to be a string'
  );

  invariant(
    typeof item.desc === 'string',
    'Create items requires `desc` of item to be a string'
  );

  dispatch({
    type: 'EQUIPMENT_ITEM_EDIT',
    data: {
      item,
      container,
    },
  });
};

export const moveItem = (fromContainer, container, item) => dispatch => {
  invariant(
    typeof fromContainer.id === 'string',
    'Create items requires `id` of source container to be a string'
  );

  invariant(
    typeof container.id === 'string',
    'Create items requires `id` of destination container to be a string'
  );

  invariant(
    typeof item.id === 'string',
    'Create items requires `id` of item to be a string'
  );

  dispatch({
    type: 'EQUIPMENT_ITEM_MOVE',
    data: {
      item,
      container,
      fromContainer,
    },
  });
};

export const deleteItem = (container, item) => dispatch => {
  invariant(
    typeof container.id === 'string',
    'Create items requires `id` of container to be a string'
  );

  invariant(
    typeof item.id === 'string',
    'Create items requires `id` of item to be a string'
  );

  dispatch({
    type: 'EQUIPMENT_ITEM_DELETE',
    data: {
      item,
      container,
    },
  });
};
