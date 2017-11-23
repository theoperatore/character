import { List, Map } from 'immutable';

export default function charLanguagesReducer(state, action) {
  switch (action.type) {
    case 'LANGUAGE_EDIT':
      return state.updateIn(
        ['charOtherProficiencies', 'languages'],
        languages => {
          const idx = languages.findIndex(
            lang => lang.get('id') === action.data.id
          );
          if (idx === -1) return languages;
          return languages.update(idx, lang => lang.merge(action.data));
        }
      );

    case 'LANGUAGE_DELETE':
      return state.updateIn(
        ['charOtherProficiencies', 'languages'],
        languages => languages.filter(lang => lang.get('id') !== action.data.id)
      );

    case 'LANGUAGE_CREATE':
      return state.updateIn(
        ['charOtherProficiencies', 'languages'],
        List(),
        languages => languages.push(Map(action.data))
      );
  }
}
