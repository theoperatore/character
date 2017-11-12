export function loadReducer({ error, type, ...datas }) {
  if (error) {
    return { error: error.message };
  }

  // if there are no extra things, must be loading...
  if (Object.keys(datas).length === 0) {
    return { isLoading: true };
  }

  // otherwise return the collection from the action
  return datas;
}

export default loadReducer;
