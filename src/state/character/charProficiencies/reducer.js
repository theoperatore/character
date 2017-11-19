import { List, Map } from 'immutable';

export default function charProficienciesReducer(state, action) {
  switch (action.type) {
    case 'PROFICIENCY_EDIT':
      return state.updateIn(
        ['charOtherProficiencies', 'proficiencies'],
        proficiencies => {
          const idx = proficiencies.findIndex(
            prof => prof.get('id') === action.data.id
          );
          if (idx === -1) return proficiencies;
          return proficiencies.update(idx, prof => prof.merge(action.data));
        }
      );

    case 'PROFICIENCY_DELETE':
      return state.updateIn(
        ['charOtherProficiencies', 'proficiencies'],
        proficiencies =>
          proficiencies.filter(prof => prof.get('id') !== action.data.id)
      );

    case 'PROFICIENCY_CREATE':
      return state.updateIn(
        ['charOtherProficiencies', 'proficiencies'],
        proficiencies =>
          proficiencies
            ? proficiencies.push(Map(action.data))
            : List([Map(action.data)])
      );
  }
}
