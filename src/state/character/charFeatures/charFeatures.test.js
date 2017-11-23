import { createState } from 'state';
import { createFeature, editFeature, deleteFeature } from './actions';

test('Creating/Editing features and class charges must have correct mapping', () => {
  const mockFeature = {
    id: 'feat-1',
    classChargesId: 'class-charges-1',
  };
  const wrongClassChargeFeature = {
    id: 'feat-1',
    classChargesId: 'does-not-exist',
  };
  const mockCharge = {
    id: 'class-charge-1',
    featureId: 'feat-1',
  };
  const incompleteClassCharge = {
    id: 'class-charges-1',
  };
  const wrongClassCharge = {
    id: 'class-charges-1',
    featureId: 'some-other-feature',
  };
  expect(
    createFeature(mockFeature, incompleteClassCharge)
  ).toThrowErrorMatchingSnapshot();
  expect(
    editFeature(mockFeature, incompleteClassCharge)
  ).toThrowErrorMatchingSnapshot();
  expect(
    createFeature(mockFeature, wrongClassCharge)
  ).toThrowErrorMatchingSnapshot();
  expect(
    editFeature(mockFeature, wrongClassCharge)
  ).toThrowErrorMatchingSnapshot();
  expect(
    createFeature(wrongClassChargeFeature, mockCharge)
  ).toThrowErrorMatchingSnapshot();
  expect(
    editFeature(wrongClassChargeFeature, mockCharge)
  ).toThrowErrorMatchingSnapshot();
});

test('Can create a feature without a class charge', () => {
  const store = createState();
  const mockFeature = {
    id: 'feat-1',
    name: 'test feat',
    desc: 'some test feat',
    type: 'ATTACK',
  };

  store.dispatch(createFeature(mockFeature));
  const features = store.getState().character.get('charFeatures');
  const classCharges = store.getState().character.get('charClassCharges');
  expect(features.size).toEqual(1);
  expect(features.get(0).toJS()).toEqual(mockFeature);
  expect(classCharges.size).toEqual(0);
});

test('Creating feature with a class charge updates both attributes', () => {
  const store = createState();

  const mockFeature = {
    id: 'feat-1',
    name: 'test feat',
    desc: 'some test feat',
    type: 'ATTACK',
    classChargesId: 'charge-1',
  };

  const mockClassCharge = {
    id: 'charge-1',
    name: 'test charges',
    charges: 10,
    current: 10,
    featureId: 'feat-1',
  };

  store.dispatch(createFeature(mockFeature, mockClassCharge));

  let afterFeats = store.getState().character.get('charFeatures');
  let afterChrgs = store.getState().character.get('charClassCharges');

  expect(afterFeats.size).toEqual(1);
  expect(afterChrgs.size).toEqual(1);
  expect(afterChrgs.getIn([0, 'id'])).toEqual('charge-1');
  expect(afterChrgs.getIn([0, 'featureId'])).toEqual('feat-1');
  expect(afterFeats.getIn([0, 'classChargesId'])).toEqual('charge-1');
});

test('Can delete a feature', () => {
  const store = createState();

  const mockFeature = {
    id: 'feat-1',
    name: 'test feat',
    desc: 'some test feat',
    type: 'ATTACK',
  };

  store.dispatch(createFeature(mockFeature));
  store.dispatch(deleteFeature({ id: 'feat-1' }));
  const features = store.getState().character.get('charFeatures');
  expect(features.size).toEqual(0);
});

test('Deleting a feature deletes the corresponding class charge', () => {
  const store = createState();

  const mockFeature = {
    id: 'feat-1',
    name: 'test feat',
    desc: 'some test feat',
    type: 'ATTACK',
    classChargesId: 'charge-1',
  };

  const mockClassCharge = {
    id: 'charge-1',
    name: 'test charges',
    charges: 10,
    current: 10,
    featureId: 'feat-1',
  };

  store.dispatch(createFeature(mockFeature, mockClassCharge));
  store.dispatch(deleteFeature({ id: 'feat-1', classChargesId: 'charge-1' }));
  const charges = store.getState().character.get('charClassCharges');
  const features = store.getState().character.get('charFeatures');
  expect(charges.size).toEqual(0);
  expect(features.size).toEqual(0);
});

test('Can edit a feature with new name and description', () => {
  const store = createState();
  const mockFeature = {
    id: 'feat-1',
    name: 'test feat',
    desc: 'some test feat',
    type: 'ATTACK',
  };
  const mockUpdatedFeature = {
    ...mockFeature,
    name: 'new name!',
    desc: 'Another test for editing',
    type: 'PASSIVE',
  };
  store.dispatch(createFeature(mockFeature));
  store.dispatch(editFeature(mockUpdatedFeature));
  const features = store.getState().character.get('charFeatures');
  expect(features.size).toEqual(1);
  expect(features.get(0).toJS()).toEqual(mockUpdatedFeature);
});

test('Editing a feature that does not exist does nothing', () => {
  const store = createState();
  const mockFeature = {
    id: 'feat-1',
    name: 'test feat',
    desc: 'some test feat',
    type: 'ATTACK',
  };
  const mockUpdatedFeature = {
    id: 'feat-2',
    name: 'new name!',
    desc: 'Another test for editing',
    type: 'PASSIVE',
  };
  store.dispatch(createFeature(mockFeature));
  store.dispatch(editFeature(mockUpdatedFeature));
  const features = store.getState().character.get('charFeatures');
  expect(features.size).toEqual(1);
  expect(features.get(0).toJS()).toEqual(mockFeature);
});

test('Editng a feature init without CC will have a class charge', () => {
  const store = createState();
  const mockFeature = {
    id: 'feat-1',
    name: 'test feat',
    desc: 'some test feat',
    type: 'ATTACK',
  };
  const mockUpdatedFeature = {
    id: 'feat-1',
    name: 'new name!',
    desc: 'Another test for editing',
    type: 'ATTACK',
    classChargesId: 'charge-1',
  };
  const mockClassCharge = {
    id: 'charge-1',
    name: 'test charges',
    charges: 10,
    current: 10,
    featureId: 'feat-1',
  };

  store.dispatch(createFeature(mockFeature));
  store.dispatch(editFeature(mockUpdatedFeature, mockClassCharge));
  const features = store.getState().character.get('charFeatures');
  const charges = store.getState().character.get('charClassCharges');

  expect(features.size).toEqual(1);
  expect(features.get(0).toJS()).toEqual(mockUpdatedFeature);
  expect(charges.size).toEqual(1);
  expect(charges.get(0).toJS()).toEqual(mockClassCharge);
});

test('Editng a CC feature will update the feature and class charge', () => {
  const store = createState();
  const mockFeature = {
    id: 'feat-1',
    name: 'test feat',
    desc: 'some test feat',
    type: 'ATTACK',
    classChargesId: 'charge-1',
  };
  const mockClassCharge = {
    id: 'charge-1',
    name: 'test charges',
    charges: 10,
    current: 10,
    featureId: 'feat-1',
  };
  const mockUpdatedFeature = {
    ...mockFeature,
    type: 'PASSIVE',
  };
  const mockUpdatedClassCharge = {
    ...mockClassCharge,
    name: 'other class charge test name',
  };

  store.dispatch(createFeature(mockFeature, mockClassCharge));
  store.dispatch(editFeature(mockUpdatedFeature, mockUpdatedClassCharge));
  const features = store.getState().character.get('charFeatures');
  const charges = store.getState().character.get('charClassCharges');

  expect(features.size).toEqual(1);
  expect(features.get(0).toJS()).toEqual(mockUpdatedFeature);
  expect(charges.size).toEqual(1);
  expect(charges.get(0).toJS()).toEqual(mockUpdatedClassCharge);
});

test('Editing a CC feature to remove a class charge, removes the charge', () => {
  const store = createState();

  const mockFeature = {
    id: 'feat-1',
    name: 'test feat',
    desc: 'some test feat',
    type: 'ATTACK',
    classChargesId: 'charge-1',
  };
  const mockClassCharge = {
    id: 'charge-1',
    name: 'test charges',
    charges: 10,
    current: 10,
    featureId: 'feat-1',
  };
  const mockUpdatedFeature = {
    ...mockFeature,
    classChargesId: undefined,
  };

  store.dispatch(createFeature(mockFeature, mockClassCharge));
  store.dispatch(editFeature(mockUpdatedFeature));

  const features = store.getState().character.get('charFeatures');
  const charges = store.getState().character.get('charClassCharges');

  expect(charges.size).toEqual(0);
  expect(features.getIn([0, 'classChargesId'])).toEqual(undefined);
  expect(features.get(0).toJS()).toEqual(mockUpdatedFeature);
});
