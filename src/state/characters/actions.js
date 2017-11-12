import { loadCharacters as loadCharactersApi } from 'api';

export const LOAD_CHARACTERS = 'LOAD_CHARACTERS';
export const loadCharacters = userId => dispatch => {
  dispatch({ type: LOAD_CHARACTERS });

  return loadCharactersApi(userId)
    .then(characters => dispatch({ type: LOAD_CHARACTERS, characters }))
    .catch(error => dispatch({ type: LOAD_CHARACTERS, error }));
};
