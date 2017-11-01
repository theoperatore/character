import firebase from 'firebase';

const _loadUser = (error, data, isAuthenticating) => ({
  type: 'LOAD_USER',
  data,
  error,
  isAuthenticating,
});

export const authenticateUser = () => dispatch => {
  dispatch(_loadUser(null, null, true));

  const off = firebase.auth().onAuthStateChanged(
    user => {
      off();
      if (user) {
        dispatch(
          _loadUser(null, {
            displayName: user.displayName,
            profileImg: user.photoURL,
            uid: user.uid,
          })
        );
      } else {
        dispatch(_loadUser());
      }
    },
    err => {
      dispatch(_loadUser(err.message));
    }
  );
};
