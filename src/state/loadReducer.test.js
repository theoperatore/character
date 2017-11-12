import loadReducer from './loadReducer';

test('loadReducer returns isLoading', () => {
  const mockAction = { type: 'test' };
  expect(loadReducer(mockAction).isLoading).toEqual(true);
});

test('loadReducer returns error', () => {
  const mockAction = { type: 'test', error: { message: 'me' } };
  expect(loadReducer(mockAction).error).toEqual('me');
});

test('loadReducer returns data', () => {
  const mockAction = { type: 'test', some: 'data' };
  expect(loadReducer(mockAction).some).toEqual('data');
  expect(loadReducer(mockAction).type).toEqual(undefined);
});
