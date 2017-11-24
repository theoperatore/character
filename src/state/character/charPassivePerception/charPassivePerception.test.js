import { createState } from 'state';
import { editPassivePerception } from './actions';

test('Can edit passive perception bonus', () => {
  const store = createState();
  store.dispatch(editPassivePerception(5));
  const pp = store
    .getState()
    .character.getIn(['charPassivePerception', 'score']);
  expect(pp).toEqual(15);
});
