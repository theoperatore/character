///////////////////////////////////////////////////////////////////////////////
//
// Might be deprecated when a real server is installed. But could always use
// firebase in addition to the web server; web server only used for serving
// app and not worrying about db stuff
//
///////////////////////////////////////////////////////////////////////////////


import Firebase from 'firebase';

const db = Firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const ref = db.database().ref();
const storage = db.storage().ref();

export { db, ref, storage }
