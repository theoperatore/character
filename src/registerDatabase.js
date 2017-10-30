import Firebase from 'firebase';

export default function registerDatabase() {
  Firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    messagingStorageId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  });
}
