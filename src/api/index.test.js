import { db, ref, storage } from './index';

jest.mock('firebase', () => ({
  initializeApp: () => ({
    database: () => ({ ref: () => 'mockDatabaseRef' }),
    storage: () => ({ ref: () => 'mockStorageRef' }),
  }),
}));

test('Api configures firebase', () => {
  expect(db).toBeDefined();
  expect(ref).toEqual('mockDatabaseRef');
  expect(storage).toEqual('mockStorageRef');
});
