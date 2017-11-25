import { List, Map } from 'immutable';

// TODO: Write v3 character transition to include:
// - every class charge MUST also have `featureId` referencing the feature
//   it is tied to.

// This is difficult because a user can:
// - create a class charge when creating a feature
// - remove a class charge while editing an existing feature
// - edit a class charge while editing an exiting feature
// - create a class charge when editing an existing feature
// - delete a class charge when deleting a feature
export default function charFeaturesReducer(state, action) {
  switch (action.type) {
    case 'FEATURE_CREATE': {
      const partialStateFeat = state.update(
        'charFeatures',
        List(),
        charFeatures => charFeatures.push(Map(action.data.feature))
      );

      if (action.data.classCharge) {
        return partialStateFeat.update(
          'charClassCharges',
          List(),
          charClassCharges =>
            charClassCharges.push(Map(action.data.classCharge))
        );
      }

      return partialStateFeat;
    }

    case 'FEATURE_EDIT': {
      const currentFeatureIdx = state
        .get('charFeatures')
        .findIndex(f => f.get('id') === action.data.feature.id);

      if (currentFeatureIdx === -1) return state;

      const currentFeature = state.getIn(['charFeatures', currentFeatureIdx]);

      // we're adding a new class charge if the action has a classChargesId
      // and the current feature does not have a classChargesId
      const isAddingClassCharge = Boolean(
        !currentFeature.get('classChargesId') &&
          action.data.feature.classChargesId
      );

      // we're removing an existing class charge if the action does not have a classChargesId
      // and the existing current feature does have a classChargesId
      const isRemovingClassCharge = Boolean(
        currentFeature.get('classChargesId') &&
          !action.data.feature.classChargesId
      );

      const partial = state.updateIn(
        ['charFeatures', currentFeatureIdx],
        feature => feature.merge(action.data.feature)
      );

      if (isAddingClassCharge) {
        return partial.update('charClassCharges', List(), charges =>
          charges.push(Map(action.data.classCharge))
        );
      }

      if (isRemovingClassCharge) {
        return partial.update('charClassCharges', List(), charges =>
          charges.filter(
            charge => charge.get('id') !== currentFeature.get('classChargesId')
          )
        );
      }

      // edit existing class charge, if applicable.
      return partial.update('charClassCharges', List(), charges => {
        const idx = charges.findIndex(
          charge => charge.get('id') === action.data.classCharge.id
        );
        if (idx === -1) return charges;

        return charges.update(idx, charge =>
          charge.merge(action.data.classCharge)
        );
      });
    } // end case

    case 'FEATURE_DELETE': {
      return state
        .update('charFeatures', List(), feats =>
          feats.filter(f => f.get('id') !== action.data.feature.id)
        )
        .update('charClassCharges', List(), charges =>
          charges.filter(
            c => c.get('id') !== action.data.feature.classChargesId
          )
        );
    } // end case
  } // end switch
}
