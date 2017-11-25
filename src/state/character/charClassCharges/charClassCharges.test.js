import { createState } from 'state';
import { createFeature } from '../charFeatures/actions';
import { incrementClassCharge, decrementClassCharge } from './actions';

let store;
beforeEach(() => {
  store = createState();

  const mockFeature = {
    id: 'some-feature',
    classChargesId: 'some-charges',
  };
  const mockCharges = {
    id: 'some-charges',
    charges: 10,
    current: 5,
    featureId: 'some-feature',
  };
  store.dispatch(createFeature(mockFeature, mockCharges));
});

test('Adds one to class charge', () => {
  store.dispatch(incrementClassCharge('some-charges'));
  const current = store
    .getState()
    .character.getIn(['charClassCharges', 0, 'current']);
  expect(current).toEqual(6);
});

test('Subs one to class charge', () => {
  store.dispatch(decrementClassCharge('some-charges'));
  const current = store
    .getState()
    .character.getIn(['charClassCharges', 0, 'current']);
  expect(current).toEqual(4);
});

test('Adding does not go beyond bounds', () => {
  store.dispatch(incrementClassCharge('some-charges'));
  store.dispatch(incrementClassCharge('some-charges'));
  store.dispatch(incrementClassCharge('some-charges'));
  store.dispatch(incrementClassCharge('some-charges'));
  store.dispatch(incrementClassCharge('some-charges'));
  store.dispatch(incrementClassCharge('some-charges'));
  store.dispatch(incrementClassCharge('some-charges'));
  store.dispatch(incrementClassCharge('some-charges'));
  store.dispatch(incrementClassCharge('some-charges'));
  store.dispatch(incrementClassCharge('some-charges'));
  const current = store
    .getState()
    .character.getIn(['charClassCharges', 0, 'current']);
  expect(current).toEqual(10);
});

test('Subtracting does not go beyond bounds', () => {
  store.dispatch(decrementClassCharge('some-charges'));
  store.dispatch(decrementClassCharge('some-charges'));
  store.dispatch(decrementClassCharge('some-charges'));
  store.dispatch(decrementClassCharge('some-charges'));
  store.dispatch(decrementClassCharge('some-charges'));
  store.dispatch(decrementClassCharge('some-charges'));
  store.dispatch(decrementClassCharge('some-charges'));
  store.dispatch(decrementClassCharge('some-charges'));
  store.dispatch(decrementClassCharge('some-charges'));
  store.dispatch(decrementClassCharge('some-charges'));
  const current = store
    .getState()
    .character.getIn(['charClassCharges', 0, 'current']);
  expect(current).toEqual(0);
});

test('Cannot edit unknown class charge', () => {
  store.dispatch(decrementClassCharge('something'));
  store.dispatch(incrementClassCharge('something'));
  const current = store
    .getState()
    .character.getIn(['charClassCharges', 0, 'current']);
  expect(current).toEqual(5);
});
