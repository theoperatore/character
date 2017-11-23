import invariant from 'invariant';

export const createFeature = (feature, classCharge) => dispatch => {
  if (classCharge) {
    invariant(
      typeof classCharge.featureId === 'string',
      'Creating a feature with class charge requires `featureId` to be a string'
    );

    invariant(
      classCharge.featureId === feature.id,
      'Class charge `featureId` must equal the feauture id'
    );

    invariant(
      feature.classChargesId === classCharge.id,
      "A feature's `classChargesId` must match the class charge `id`"
    );
  }

  dispatch({
    type: 'FEATURE_CREATE',
    data: {
      feature,
      classCharge,
    },
  });
};

export const editFeature = (feature, classCharge) => dispatch => {
  if (classCharge) {
    invariant(
      typeof classCharge.featureId === 'string',
      'Creating a feature with class charge requires `featureId` to be a string'
    );

    invariant(
      classCharge.featureId === feature.id,
      'Class charge `featureId` must equal the feauture id'
    );

    invariant(
      feature.classChargesId === classCharge.id,
      "A feature's `classChargesId` must match the class charge `id`"
    );
  }

  dispatch({
    type: 'FEATURE_EDIT',
    data: {
      feature,
      classCharge,
    },
  });
};

export const deleteFeature = feature => dispatch =>
  dispatch({
    type: 'FEATURE_DELETE',
    data: {
      feature,
    },
  });
