import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';


const config = {
  apiKey: 'process.env.REACT_APP_FIREBASE_API_KEY',
  authDomain: 'process.env.REACT_APP_FIREBASE_AUTH_DOMAIN',
  projectId: 'process.env.REACT_APP_FIREBASE_PROJECT_ID',
  storageBucket: 'process.env.REACT_APP_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'process.env.REACT_APP_FIREBASE_APP_ID',
};
const app = initializeApp(config);

class Firebase {
  constructor() {
    this.auth = getAuth(app);
    this.db = getFirestore(app);
   
  }

  /*** Authentication  ***/
  doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => sendPasswordResetEmail(this.auth, email);

  /*** Database ***/
  user = uid => this.db.collection('users').doc(uid);
  users = () => this.db.collection('users');

  addActivity = (uid, activity) => {
    const ref = this.db.collection('users').doc(uid).collection('activities');
    ref.add(activity);
  };

  updateActivity = (uid, activityId, activity) => {
    const ref = this.db.collection('users').doc(uid).collection('activities').doc(activityId);
    ref.set(activity, { merge: true });
  };
}

export const mainFirebase = new Firebase()
export default Firebase;
