import firebase from 'firebase';

export const loadUserProfile = () =>
  new Promise((resolve, reject) => {
    const off = firebase.auth().onAuthStateChanged(
      user => {
        off();
        return user
          ? resolve({
              displayName: user.displayName,
              profileImg: user.photoURL,
              userId: user.uid,
            })
          : resolve();
      },
      err => reject(err)
    );
  });

// always create a new ref to the db to ensure
// that firebase has had time to initialize itself.
export const loadCharacters = userId =>
  firebase
    .app()
    .database()
    .ref()
    .child(`/users/${userId}/characters`)
    .once('value')
    .then(snapshot => snapshot.val());

export const loadCharacter = characterId =>
  firebase
    .app()
    .database()
    .ref()
    .child(`/characters/${characterId}`)
    .once('value')
    .then(snapshot => snapshot.val());
