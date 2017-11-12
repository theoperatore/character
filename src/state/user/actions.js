import { loadUserProfile } from 'api';

export const LOAD_USER = 'LOAD_USER';
export const authenticateUser = () => dispatch => {
  dispatch({ type: LOAD_USER });

  return loadUserProfile()
    .then(profile => dispatch({ type: LOAD_USER, profile }))
    .catch(error => dispatch({ type: LOAD_USER, error }));
};
