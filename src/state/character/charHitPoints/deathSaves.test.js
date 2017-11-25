import { createState } from 'state';
import { deathSaveSuccessAdd, deathSaveFailureAdd } from './actions';

test('can increment successes', () => {
  const store = createState();
  store.dispatch(deathSaveSuccessAdd());
  const successes = store
    .getState()
    .character.getIn(['charHitPoints', 'deathSaves', 'successes']);
  expect(successes).toEqual(1);
});

test('can increment failures', () => {
  const store = createState();
  store.dispatch(deathSaveFailureAdd());
  const failures = store
    .getState()
    .character.getIn(['charHitPoints', 'deathSaves', 'failures']);
  expect(failures).toEqual(1);
});
