import Firebase from 'firebase';

const db = Firebase.initializeApp({
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,

});

const ref = db.database().ref();
const storage = db.storage().ref();

export { db, ref, storage }
